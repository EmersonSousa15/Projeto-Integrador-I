import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; 
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import './Card.css'

const Card = ({card}) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="card-container">
            <img className="book-image" src={card.image} alt={card.title} onClick={() => navigate(`/${card.id}`)} />
            <div className="book-info">
                <div className="book-data">
                    <h1>{card.title}</h1>
                    <h2>{card.author}</h2>
                </div>
                {isFavorite ? (
                        <IoMdHeart className="filled-heart" size={33} onClick={toggleFavorite} />
                    ) : (
                        <IoIosHeartEmpty className="unfilled-heart" size={33} onClick={toggleFavorite} />
                )}
            </div>
        </div>
    )
}

export default Card