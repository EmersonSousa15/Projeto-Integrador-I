import React from 'react'
import { useNavigate } from 'react-router-dom';
import { LiaEditSolid } from "react-icons/lia";
import './EditCard.css'

const EditCard = ({card}) => {
    const navigate = useNavigate();
    return (
        <div className="edit-card-container">
            <img className="book-image" src={card.linkImagem} alt={card.title}/>
            <div className="book-info">
                <div className="book-data">
                    <h1>{card.nomeLivro}</h1>
                    <h2>{card.nomeAutor}</h2>
                </div>
                <LiaEditSolid style={{color:'#FF980E'}} size={33} onClick={() => navigate(`/editarlivro/${card.idLivro}`)}/>
            </div>
        </div>
    )
}

export default EditCard