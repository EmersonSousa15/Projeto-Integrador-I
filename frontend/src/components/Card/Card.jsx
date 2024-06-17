import React, { useState } from "react";
import './Card.css'
import { useNavigate } from 'react-router-dom'; 
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

const Card = ({ title, author, image, color }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    const bookClick = () => {
        navigate('/livro');
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const buyBookClass = `buy-book ${color}`;
    const heartBookClass = `heart-book ${color}`;

    return(
        <div className="book-container">
            <img className="book-img" src={image} alt={title}/>
            <div className="book-info">
                <h1>{title}</h1>
                <h2>{author}</h2>
            </div>
            <div className="options">
                <button className={buyBookClass} onClick={bookClick}>Comprar</button>
                {isFavorite ? (
                    <IoMdHeart className={heartBookClass} size={33} onClick={toggleFavorite} />
                ) : (
                    <IoIosHeartEmpty className={heartBookClass} size={33} onClick={toggleFavorite} />
                )}
            </div>
        </div>
    );
}

export default Card;
