import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import './Card.css';

const Card = ({ card }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    // useEffect para verificar se o card já está nos favoritos quando o componente é montado
    useEffect(() => {
        const favoritos = JSON.parse(window.localStorage.getItem('Favoritos')) || [];
        const cardExists = favoritos.some(fav => fav.idUsuario === card.idUsuario);
        if (cardExists) {
            setIsFavorite(true); // Define o estado como true se o card já for favorito
        }
    }, [card.idUsuario]);

    // Função para adicionar/remover favoritos e sincronizar com o localStorage
    const toggleFavorite = () => {
        let favoritos = JSON.parse(window.localStorage.getItem('Favoritos')) || [];

        if (!isFavorite) {
            // Se o card não for favorito, adiciona
            const cardExists = favoritos.some(fav => fav.idUsuario === card.idUsuario);
            if (!cardExists) {
                favoritos.push(card);
                window.localStorage.setItem('Favoritos', JSON.stringify(favoritos));
                setIsFavorite(true); // Atualiza o estado para favorito
            }
        } else {
            // Se o card for favorito, remove
            const updatedFavoritos = favoritos.filter(fav => fav.idUsuario !== card.idUsuario);
            window.localStorage.setItem('Favoritos', JSON.stringify(updatedFavoritos));
            setIsFavorite(false); // Atualiza o estado para não favorito
        }
    };

    const handleClick = () => {
        navigate(`/livro/${card.idLivro}`); // Navega para a página do livro clicado
    }

    return (
        <div className="card-container" onClick={() => handleClick()}>
            <img 
                className="book-image" 
                src={card.linkImagem} 
                alt={card.nomeLivro} 
                onClick={() => navigate(`/${card.idLivro}`)}
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
