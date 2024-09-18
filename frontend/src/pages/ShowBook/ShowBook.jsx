import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";
import "./ShowBook.css";
import Footer from '../../assets/Footer.jpg';
import httpCliente from "../../services/httpCliente";
import { useUserContext } from "../../Context/UserContext";

export const ShowBook = () => {
    const { id } = useParams();
    const [isInCart, setIsInCart] = useState(false);
    const [isOutOfStock, setIsOutOfStock] = useState(false);
    const [book, setBook] = useState(null);
    const { userData } = useUserContext();

    const isJuridica = userData.identity === 'juridica';


    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await httpCliente.get(`http://127.0.0.1:5000/buscarlivro/${id}`)
                console.log(response);

                setBook(response.data.livros[0]);

            } catch (error) {
                console.error(error.message);
            }
        }

        fetchBook();

    }, [])

    useEffect(() => {
        if (book) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const bookInCart = cart.find(item => item.idLivro === book.idLivro);
            setIsInCart(!!bookInCart);
            setIsOutOfStock(book.estoqueLivro <= 0);
        }
    }, [book]);

    const addToCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log(cart);


        if (!cart.some(item => item.idLivro === book.idLivro)) {
            cart.push(book);
            localStorage.setItem('cart', JSON.stringify(cart));
            setIsInCart(true);
        }
    };


    return (
        <div className="showbook-container">
            <NavBar />
            {book &&
                <div className="showbook-content">
                    <img className="book-image" src={book.linkImagem} alt={book.nomeLivro} />
                    <div className="showbook-info">
                        <div className="description">
                            <h1 style={{ fontWeight: '200', fontStyle: 'italic' }}>{book.nomeLivro}</h1>
                            <h3 style={{ color: '#FF681E' }}>{book.nomeAutor}</h3>
                            <div style={{ marginTop: '20px', fontSize: '16px' }}>{book.descricaoLivro}</div>
                        </div>
                        <div style={{ marginTop: '6%', marginLeft: '10%', width: '50%' }}>
                            <h1 style={{ color: '#069C56', fontStyle: 'italic' }}>R$ {book.precoLivro}</h1>
                            <div>
                                <p style={{ marginTop: '4%', fontWeight: 'bold' }}>Editora:</p>
                                <p>{book.editoraLivro}</p>

                                <p style={{ marginTop: '4%', fontWeight: 'bold' }}>Vendedor:</p>
                                <p>{book.nomeVendedor}</p>

                                <p style={{ marginTop: '4%', fontWeight: 'bold' }}>ISBN:</p>
                                <p>{book.isbn}</p>

                                <p style={{ marginTop: '4%', fontWeight: 'bold' }}>Gênero:</p>
                                <p>{book.generoLivro}</p>

                                <p style={{ marginTop: '4%', fontWeight: 'bold' }}>Estado:</p>
                                <p>{book.estadoLivro}</p>

                                <p style={{ marginTop: '4%' }}>Entregue pelos <span style={{ fontWeight: 'bold' }}>correios</span></p>

                                {!isJuridica && (
                                    <div
                                        className={`addCart ${isOutOfStock || isInCart ? 'disabled' : ''}`}
                                        onClick={!isOutOfStock && !isInCart ? addToCart : undefined}
                                    >
                                        {isOutOfStock ? 'Esgotado' : isInCart ? 'Já no carrinho' : 'Adicionar ao carrinho'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }
            <img src={Footer} alt="footer" />
        </div>
    );
};

export default ShowBook;
