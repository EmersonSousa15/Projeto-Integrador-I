import React, { useEffect, useState } from "react";
import './Cart.css';
import NavBar from "../../components/NavBar/NavBar";
import Icon from "../../assets/Cart.png";
import Qtd from "../../assets/Quantidade.png";
import Delete from "../../assets/Delete.png";
import Footer from "../../assets/Footer.jpg";
import Mastercard from "../../assets/Mastercard.png";

const Cart = () => {
    const [livros, setLivros] = useState([]);

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
        return livros.reduce((total, livro) => total + parseFloat(livro.price.replace('R$ ', '').replace(',', '.')), 0).toFixed(2);
    };

    return (
        <div className="cart-container">
            <NavBar />
            <div className="cart-content">
                <div className="cart-title">
                    <img src={Icon} alt="icon" style={{ width: '26px' }} />
                    Meu carrinho
                </div>
                {livros.length === 0 ? (
                    <div className="empty-cart-message" style={{margin:'auto', marginTop:'40px', marginBottom:'40px'}}>
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
                                        <img src={livro.image} alt="Book Preview" style={{ width: '56px', height: '76px', borderRadius: '6px' }} />
                                        <div style={{ margin: 'auto' }}>
                                            <p style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '16px', width: '90px', textAlign: 'left' }}>{livro.title}</p>
                                            <p style={{ color: 'gray', marginTop: '6px' }}>{livro.author}</p>
                                        </div>
                                    </div>
                                    <img src={Qtd} alt="Quantidade" style={{ width: '90px', height: '30px' }} />
                                    <p>R$ {livro.price}</p>
                                    <p style={{ fontWeight: 'bold' }}>R$ {livro.price}</p>
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
                                    <p style={{ fontSize: '14px', marginTop: '20px', marginLeft: '6px' }}>Maria Fernanda Aquino Freitas Scarcela</p>
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '70px', marginTop: '4px' }}>
                                        <p style={{ fontSize: '14px', marginTop: '6px', marginLeft: '6px' }}>8764 4743 8438 4883</p>
                                        <img src={Mastercard} alt="footer" />
                                    </div>
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
                            <button>Finalizar Compra</button>
                        </div>
                    </div>
                )}
            </div>
            <img src={Footer} alt="footer" />
        </div>
    );
};

export default Cart;
