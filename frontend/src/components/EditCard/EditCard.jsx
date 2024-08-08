import React from 'react'
import { useNavigate } from 'react-router-dom';
import { LiaEditSolid } from "react-icons/lia";
import './EditCard.css'

const EditCard = ({id, title, author, image}) => {
    const navigate = useNavigate();
    return (
        <div className="edit-card-container">
            <img className="book-image" src={image} alt={title}/>
            <div className="book-info">
                <div className="book-data">
                    <h1>{title}</h1>
                    <h2>{author}</h2>
                </div>
                <LiaEditSolid style={{color:'#FF980E'}} size={33} onClick={() => navigate('/editarlivro')}/>
            </div>
        </div>
    )
}

export default EditCard