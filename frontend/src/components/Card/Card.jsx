import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import './Card.css';

const Card = ({ card }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    console.log(card);
    

    useEffect(() => {
        const favoritos = JSON.parse(window.localStorage.getItem('Favoritos')) || [];
        

        const cardExists = favoritos.some(fav => fav.idLivro === card.idLivro);
        
        if (cardExists) {
            setIsFavorite(true)
        } else {
            setIsFavorite(false)
        }
    }, [card.idLivro])

    const toggleFavorite = () => {
        let favoritos = JSON.parse(window.localStorage.getItem('Favoritos')) || [];

        if (!isFavorite) {
    
            const cardExists = favoritos.some(fav => fav.idLivro === card.idLivro);
            if (!cardExists) {
                favoritos.push(card);
                window.localStorage.setItem('Favoritos', JSON.stringify(favoritos));
                setIsFavorite(true)
            }
        } else {
    
            const updatedFavoritos = favoritos.filter(fav => fav.idLivro !== card.idLivro);
            window.localStorage.setItem('Favoritos', JSON.stringify(updatedFavoritos));
            setIsFavorite(false)
        }
    };

    return (
        <div className="card-container">
            <img 
                className="book-image" 
                src={card.linkImagem} 
                alt={card.nomeLivro} 
                onClick={() => navigate(`/livro/${card.idLivro}`)}
            />
            <div className="book-info">
                <div className="book-data">
                    <h1>{card.nomeLivro}</h1>
                    <h2>{card.nomeAutor}</h2>
                </div>
                {/* Renderiza o coração com base no estado de isFavorite */}
                {isFavorite ? (
                    <IoMdHeart className="filled-heart" size={33} onClick={toggleFavorite} />
                ) : (
                    <IoIosHeartEmpty className="unfilled-heart" size={33} onClick={toggleFavorite} />
                )}
            </div>
        </div>
    );
};

export default Card;
