import React from "react";
import { useParams } from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";
import "./ShowBook.css";

export const ShowBook = () => {
    const { id } = useParams();

    const teste =
    { id: 1, title: "The Dreaming Arts", author: "Tom Maloney", 
      image: "https://th.bing.com/th/id/R.d76a3f2f396bfbe4bd7f93aef0473028?rik=hlzCPj6pqyINRQ&pid=ImgRaw&r=0", 
      description: "Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history. Now, the commanding general—also known as her tough-as-talons mother—has ordered Violet to join the hundreds of candidates striving to become the elite of Navarre: dragon riders. But when you’re smaller than everyone else and your body is brittle, death is only a heartbeat away...because dragons don’t bond to “fragile” humans. They incinerate them. With fewer dragons willing to bond than cadets, most would kill Violet to better their own chances of success. The rest would kill her just for being her mother’s daughter—like Xaden Riorson, the most powerful and ruthless wingleader in the Riders Quadrant. ", 
      price: "100.00", 
      editor: "Pearson", 
      seller: "Fernanda Scarcela", 
      isbn: "123456789123",
      genre: "Romance",
      state: "Novo"
    }    
    return(
        <div className="showbook-container">
            <NavBar/>
            <div className= "showbook-content">
                <img className="book-image" src={teste.image} alt={teste.title}/>
                <div className="showbook-info">
                    <div className="description">
                        <h1 style={{ fontWeight: '200', fontStyle: 'italic'}} >{teste.title}</h1>
                        <h3 style={{ color: '#FF681E'}}>{teste.author}</h3>
                        <div style={{ marginTop: '20px', fontSize: '16px'}}>{teste.description}</div>
                    </div>
                    <div style={{marginTop: '6%', marginLeft: '10%', width:'50%'}}>
                        <h1 style={{ color: '#069C56', fontStyle: 'italic'}}> R$ {teste.price}</h1>
                        <div>
                            <p style={{marginTop: '4%', fontWeight: 'bold'}}>Editora:</p>
                            <p>{teste.editor}</p>

                            <p style={{marginTop: '4%', fontWeight: 'bold'}}>Vendedor:</p>
                            <p>{teste.seller}</p>

                            <p style={{marginTop: '4%', fontWeight: 'bold'}}>ISBN:</p>
                            <p>{teste.isbn}</p>

                            <p style={{marginTop: '4%', fontWeight: 'bold'}}>Gênero:</p>
                            <p>{teste.genre}</p>

                            <p style={{marginTop: '4%', fontWeight: 'bold'}}>Estado:</p>
                            <p>{teste.state}</p>

                            <p style={{ marginTop: '4%'}} >Entregue pelos <span style={{fontWeight:'bold'}}>correios</span></p>

                            <div className="addCart">Adicionar ao carrinho</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowBook