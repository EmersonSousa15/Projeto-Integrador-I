import React, { useEffect, useState } from "react";
import './Cart.css';
import NavBar from "../../components/NavBar/NavBar";
import Icon from "../../assets/Cart.png";
import Qtd from "../../assets/Quantidade.png";
import Delete from "../../assets/Delete.png";
import Footer from "../../assets/Footer.jpg";
import Mastercard from "../../assets/Mastercard.png";
import { useUserContext } from "../../Context/UserContext";
import { useNavigate } from 'react-router-dom';
import { cartRegister } from "../../services/sales/cartRegister";

const Cart = () => {
    const [livros, setLivros] = useState([]);
    const [queue, setQueue] = useState([]); // Fila para processar as compras
    const [processing, setProcessing] = useState(false); // Controla se a fila está sendo processada
    const { userData } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setLivros(storedCart);
    }, []);

    const handleDelete = (index) => {
        const updatedCart = [...livros];
        updatedCart.splice(index, 1);

        setLivros(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const calculateTotal = () => {
        return livros.reduce((total, livro) => total + parseFloat(livro.precoLivro.replace('R$ ', '').replace(',', '.')), 0).toFixed(2);
    };

    const buyClick = () => {
        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        const formatTime = (date) => {
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        };

        const now = new Date();
        const formattedDate = formatDate(now);
        const formattedTime = formatTime(now);

        const cartData = {
            date: formattedDate,
            time: formattedTime,
            livros: livros.map(livro => ({
                idLivro: livro.idLivro,
                idVendedor: livro.idVendedor,
                precoLivro: livro.precoLivro,
            })),
            emailComprador: userData.email
        };

        if (userData.email === '') {
            navigate('/signup');
        } else if (userData.accountNumber === null || userData.state === null) {
            navigate('/minhaconta');
        } else {
            // Adiciona a compra à fila
            setQueue(prevQueue => [...prevQueue, cartData]);
        }
    };

    // Função para processar a fila
    const processQueue = async () => {
        if (queue.length > 0 && !processing) {
            setProcessing(true);
            const [nextOrder, ...remainingQueue] = queue;

            try {
                await cartRegister(nextOrder); // Registra a compra
                console.log('Compra registrada com sucesso!');
            } catch (error) {
                console.error('Erro ao registrar compra:', error);
            }

            // Atualiza a fila
            setQueue(remainingQueue);
            setProcessing(false);
        }
    };

    // UseEffect para monitorar a fila
    useEffect(() => {
        processQueue(); // Processa a fila sempre que houver itens
    }, [queue, processing]);

    return (
        <div className="cart-container">
            <NavBar />
            <div className="cart-content">
                <div className="cart-title">
                    <img src={Icon} alt="icon" style={{ width: '26px' }} />
                    Meu carrinho
                </div>
                {livros.length === 0 ? (
                    <div className="empty-cart-message" style={{ margin: 'auto', marginTop: '40px', marginBottom: '40px' }}>
                        <p>Seu carrinho está vazio!</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '20px 20px 80px 20px' }}>
                        <div className="cart-left">
                            <div className="cart-columns">
                                <span>Informações do produto</span>
                                <span>Quantidade</span>
                                <span>Preço</span>
                                <span>Total</span>
                            </div>

                            {livros.map((livro, index) => (
                                <div key={index} className="cart-items">
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                        <img src={livro.linkImagem} alt="Book Preview" style={{ width: '56px', height: '76px', borderRadius: '6px' }} />
                                        <div style={{ margin: 'auto' }}>
                                            <p style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '16px', width: '90px', textAlign: 'left' }}>{livro.nomeLivro}</p>
                                            <p style={{ color: 'gray', marginTop: '6px' }}>{livro.nomeAutor}</p>
                                        </div>
                                    </div>
                                    <img src={Qtd} alt="Quantidade" style={{ width: '90px', height: '30px' }} />
                                    <p>R$ {livro.precoLivro}</p>
                                    <p style={{ fontWeight: 'bold' }}>R$ {livro.precoLivro}</p>
                                    <img
                                        src={Delete}
                                        alt="delete"
                                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                        onClick={() => handleDelete(index)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="div-right" style={{ marginRight: '30px' }}>
                            <div className="cart-right" style={{ padding: '16px', marginRight: '20px' }}>
                                <p style={{ color: '#FF681E', fontWeight: 'bold', fontSize: '20px', marginTop: '6px' }}>Detalhes da compra</p>
                                <div style={{ padding: '6px', border: '1px solid black', borderRadius: '12px', borderColor: '#FF681E', height: '108px', marginTop: '20px' }}>
                                    <p style={{ fontSize: '14px', marginTop: '4px', fontWeight: 'bold', marginLeft: '6px' }}>Detalhes do cartão</p>
                                    {userData.numbercard ?
                                        <>
                                            <p style={{ fontSize: '14px', marginTop: '20px', marginLeft: '6px' }}>{userData.numbercard}</p>
                                            <div style={{ display: 'flex', flexDirection: 'row', gap: '70px', marginTop: '4px' }}>
                                                <p style={{ fontSize: '14px', marginTop: '6px', marginLeft: '6px' }}>{userData.accountNumber}</p>
                                                <img src={Mastercard} alt="footer" />
                                            </div>
                                        </>
                                        :
                                        <>
                                            <p style={{ fontSize: '14px', marginTop: '4px', marginLeft: '6px' }}>Nenhum cartão cadastrado</p>
                                            <div style={{ display: 'flex', flexDirection: 'row', gap: '70px', marginTop: '4px' }}>
                                                <img src={Mastercard} alt="footer" />
                                            </div>
                                        </>
                                    }
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '40px' }}>
                                        <p style={{ fontSize: '14px' }}>Subtotal</p>
                                        <p>R$ {calculateTotal()}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '6px' }}>
                                        <p style={{ fontSize: '14px' }}>Frete</p>
                                        <p>R$ 0,00</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '6px' }}>
                                        <p style={{ fontSize: '14px' }}>Total</p>
                                        <p>R$ {calculateTotal()}</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => buyClick()}>Finalizar Compra</button>
                        </div>
                    </div>
                )}
            </div>
            <img src={Footer} alt="footer" />
        </div>
    );
};

export default Cart;
