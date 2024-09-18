import React, { useEffect, useState } from "react";
import './MyPurchases.css';
import NavBar from "../../components/NavBar/NavBar";
import Icon from "../../assets/vendas.jpg";
import Toggle from "../../assets/toggle.jpg";
import Footer from "../../assets/Footer.jpg";
import { useNavigate } from 'react-router-dom';
import { getPurchases } from "../../services/sales/getPurchases";
import { useUserContext } from "../../Context/UserContext";

const MyPurchases = () => {
    const [openItems, setOpenItems] = useState([]);
    const { userData } = useUserContext();
    const [items, setItems] = useState(null);
    const navigate = useNavigate();

    const toggleOpen = (index) => {
        if (openItems.includes(index)) {
            setOpenItems(openItems.filter(item => item !== index));
        } else {
            setOpenItems([...openItems, index]);
        }
    };

    useEffect(() => {
        const fetchPurchases = async () => {
            const response = await getPurchases(userData.email);
            console.log(response);
            
            if (response) {
                setItems(response);

            } else {
                setItems([]); // Set to an empty array if there are no purchases
            }
        };

        fetchPurchases();

    }, [userData.email]);

    return (
        <div className="mypurchases-container">
            <NavBar />
            <div className="mypurchases-content">
                <div className="mypurchases-title">
                    <img src={Icon} alt="icon" style={{ width: '34px' }} />
                    Meus pedidos
                </div>
                <div className="mypurchases-columns">
                    <div className="mypurchases-header-content">
                        <span>ID do pedido</span>
                        <span>Data</span>
                        <span>Endereço de entrega</span>
                        <span>Pagamento</span>
                        <span>Rastreamento</span>
                        <span>Total</span>
                    </div>
                </div>
                {items == null || items.length === 0 ? (
                    <h1 style={{ textAlign: "center", margin: "50px" }}>SEM PEDIDOS</h1>
                ) : (
                    items.map((item, index) => (
                        <div className={`mypurchases-items ${openItems.includes(index) ? 'open' : ''}`} key={item.id}>
                            <div className="mypurchases-information">
                                <div className="mypurchases-information-content">
                                    <p>#{++index}</p>
                                    <p>{item.data}</p>
                                    <div>
                                        <p>{item.rua}, {item.numero}</p>
                                        <p>{item.cep}</p>
                                    </div>
                                    <div>
                                        <p>{item.numeroCartao}</p>
                                        <p>{item.nomeCartao}</p>
                                    </div>
                                    <p>AA12345786BR</p>
                                    <p style={{ color: '#069C56' }}>R$ {item.livros.reduce((count, livro) => count + parseFloat(livro.price), 0).toFixed(2)}</p>
                                </div>
                                <img
                                    src={Toggle}
                                    alt="toggle"
                                    style={{ width: '20px', height: '20px' }}
                                    className={openItems.includes(index) ? 'rotated' : ''}
                                    onClick={() => toggleOpen(index)}
                                />
                            </div>

                            <div className={`mypurchases-details ${openItems.includes(index) ? 'open' : ''}`}>
                                {items[0].livros.map((livro, livroIndex) => (
                                    <div key={livroIndex} className="mypurchases-products">
                                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                            <img 
                                                src={livro.image} 
                                                alt="Book Preview" 
                                                style={{ width: '66px', height: '86px', borderRadius: '6px', cursor: 'pointer' }} 
                                                onClick={() => navigate(`/${livro.id}`)} 
                                            />
                                            <div style={{ margin: 'auto' }}>
                                                <p style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '14px', width: '170px' }}>{livro.title}</p>
                                                <p style={{ color: 'gray', marginTop: '6px', fontSize: '12px' }}>{livro.author}</p>
                                                <p style={{ color: 'green', marginTop: '6px', fontSize: '12px' }}>R$ {livro.price}</p>
                                                <p style={{ marginTop: '6px', fontSize: '12px' }}>Qtde: {livro.quantidade}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <img src={Footer} alt="footer" />
        </div>
    );
};

export default MyPurchases;
