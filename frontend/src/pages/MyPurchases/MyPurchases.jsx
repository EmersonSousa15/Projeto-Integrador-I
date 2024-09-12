import React, { useEffect, useState } from "react";
import './MyPurchases.css';
import NavBar from "../../components/NavBar/NavBar";
import Icon from "../../assets/vendas.png";
import Footer from "../../assets/Footer.jpg";

const MyPurchases = () => {
    return (
        <div className="mypurchases-container">
            <NavBar />
            <div className="mypurchases-content">
                <div className="mypurchases-title">
                    <img src={Icon} alt="icon" style={{ width: '34px' }} />
                    Minhas vendas
                </div>
                    <div className="mypurchases-items">
                        <div className="mypurchases-columns">
                            <span>Informações do produto</span>
                            <span>Quantidade</span>
                            <span>Preço</span>
                            <span>Total</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                            <img src={Icon} alt="Book Preview" style={{ width: '56px', height: '76px', borderRadius: '6px' }} />
                            <div style={{ margin: 'auto' }}>
                                <p style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '16px', width: '90px', textAlign: 'left' }}>3</p>
                                <p style={{ color: 'gray', marginTop: '6px' }}>3</p>
                            </div>
                        </div>
                            <p>R$ 3</p>
                            <p style={{ fontWeight: 'bold' }}>R$ 3</p>
                    </div>
            </div>
            <img src={Footer} alt="footer" />
        </div>
    );
};

export default MyPurchases;
