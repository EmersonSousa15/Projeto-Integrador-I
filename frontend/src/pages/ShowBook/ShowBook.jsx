import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";
import "./ShowBook.css";
import Footer from '../../assets/Footer.jpg';
import httpCliente from "../../services/httpCliente";

export const ShowBook = () => {
    const { id } = useParams();
    const [isInCart, setIsInCart] = useState(false);
    const [isOutOfStock, setIsOutOfStock] = useState(false);


    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await httpCliente.get(`http://127.0.0.1:5000/buscarlivro/${id}`, {
                })

                console.log(response);
                
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchBook();

    }, [])

    const teste = {
        id: 1,
        title: "The Dreaming Arts",
        author: "Tom Maloney",
        image: "https://th.bing.com/th/id/R.d76a3f2f396bfbe4bd7f93aef0473028?rik=hlzCPj6pqyINRQ&pid=ImgRaw&r=0",
        description: "Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history...",
        price: "100.00",
        editor: "Pearson",
        seller: "Fernanda Scarcela",
        isbn: "123456789123",
        genre: "Romance",
        state: "Novo",
        stock: 1
    };

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const bookInCart = cart.find(item => item.id === teste.id);
        setIsInCart(!!bookInCart);
        setIsOutOfStock(teste.stock <= 0);
    }, []);

    const addToCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (!cart.some(item => item.id === teste.id)) {
            cart.push(teste);
            localStorage.setItem('cart', JSON.stringify(cart));
            setIsInCart(true);
        }
    };

    return (
        <div className="showbook-container">
            <NavBar />
            <div className="showbook-content">
                <img className="book-image" src={teste.image} alt={teste.title} />
                <div className="showbook-info">
                    <div className="description">
                        <h1 style={{ fontWeight: '200', fontStyle: 'italic' }}>{teste.title}</h1>
                        <h3 style={{ color: '#FF681E' }}>{teste.author}</h3>
                        <div style={{ marginTop: '20px', fontSize: '16px' }}>{teste.description}</div>
                    </div>
                    <div style={{ marginTop: '6%', marginLeft: '10%', width: '50%' }}>
                        <h1 style={{ color: '#069C56', fontStyle: 'italic' }}>R$ {teste.price}</h1>
                        <div>
                            <p style={{ marginTop: '4%', fontWeight: 'bold' }}>Editora:</p>
                            <p>{teste.editor}</p>

                            <p style={{ marginTop: '4%', fontWeight: 'bold' }}>Vendedor:</p>
                            <p>{teste.seller}</p>

                            <p style={{ marginTop: '4%', fontWeight: 'bold' }}>ISBN:</p>
                            <p>{teste.isbn}</p>

                            <p style={{ marginTop: '4%', fontWeight: 'bold' }}>Gênero:</p>
                            <p>{teste.genre}</p>

                            <p style={{ marginTop: '4%', fontWeight: 'bold' }}>Estado:</p>
                            <p>{teste.state}</p>

                            <p style={{ marginTop: '4%' }}>Entregue pelos <span style={{ fontWeight: 'bold' }}>correios</span></p>

                            <div
                                className={`addCart ${isOutOfStock || isInCart ? 'disabled' : ''}`}
                                onClick={!isOutOfStock && !isInCart ? addToCart : undefined}
                            >
                                {isOutOfStock ? 'Esgotado' : isInCart ? 'Já no carrinho' : 'Adicionar ao carrinho'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img src={Footer} alt="footer" />
        </div>
    );
};

export default ShowBook;
