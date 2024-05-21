import React, { useState } from "react";
import './Card.css'
import { useNavigate } from 'react-router-dom'; 
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";


const Card = () => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    const bookClick = () => {
        navigate('/livro');
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return(
        <div className="book-container" >
            <img className="book-img" src={"https://th.bing.com/th/id/R.d860ecaf0370da0d5c4e06571e1770ba?rik=thSVE%2bn9V9iqTw&riu=http%3a%2f%2fimagens.elivrosgratis.com%2fcapas%2fcrime-e-castigo-fiodor-dostoievski.jpg&ehk=8m3hTGueNkzGwmfXsO7SEMTzdZ9FNk0NbvCcWtuA%2bY4%3d&risl=&pid=ImgRaw&r=0"} alt="livro"/>
            <div className = "book-info">
                <h1>Nome do livro</h1>
                <h2>Autor</h2>
            </div>
            <div className="options">
                <button className="buy-book" onClick={bookClick}>Comprar</button>
                {isFavorite ? (
                    <IoMdHeart className="heart-filled" size={33} onClick={toggleFavorite} />
                ) : (
                    <IoIosHeartEmpty className="heart-book" size={33} onClick={toggleFavorite} />
                )}
            </div>
        </div>
    );
}

export default Card