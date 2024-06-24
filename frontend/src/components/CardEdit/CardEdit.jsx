import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { IoIosHeartEmpty } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import './CardEdit.css'

const CardEdit = ({ title, author, image}) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    const bookClick = () => {
        navigate('/livro');
    };

    return(
        <div className="bookedit-container">
            <img className="book-img" src={image} alt={title}/>
            <div className="book-info">
                <h1>{title}</h1>
                <h2>{author}</h2>
            </div>
            <div className="options">
                <button onClick={bookClick}>Editar</button>
                <CiTrash size={36} style={{color: '#FF681E', cursor:'pointer', marginLeft: '4px'}}/>
            </div>
        </div>
    );
}

export default CardEdit;
