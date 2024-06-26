import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import CardsContainer from "../../components/CardContainer/CardContainer";
import Banner from '../../assets/Favoritos.jpg'
import "./Favoritos.css";
import CardEdit from "../../components/CardEdit/CardEdit";

export const Favoritos = () => {
    const favoritos = [
        { id: 1, title: "Livro 1", author: "Autor 1", image: "https://th.bing.com/th/id/R.d860ecaf0370da0d5c4e06571e1770ba?rik=thSVE%2bn9V9iqTw&riu=http%3a%2f%2fimagens.elivrosgratis.com%2fcapas%2fcrime-e-castigo-fiodor-dostoievski.jpg&ehk=8m3hTGueNkzGwmfXsO7SEMTzdZ9FNk0NbvCcWtuA%2bY4%3d&risl=&pid=ImgRaw&r=0", color:"red"},
        { id: 2, title: "Livro 2", author: "Autor 2", image: "https://th.bing.com/th/id/R.d860ecaf0370da0d5c4e06571e1770ba?rik=thSVE%2bn9V9iqTw&riu=http%3a%2f%2fimagens.elivrosgratis.com%2fcapas%2fcrime-e-castigo-fiodor-dostoievski.jpg&ehk=8m3hTGueNkzGwmfXsO7SEMTzdZ9FNk0NbvCcWtuA%2bY4%3d&risl=&pid=ImgRaw&r=0", color:"red"},
        { id: 1, title: "Livro 1", author: "Autor 1", image: "https://th.bing.com/th/id/R.d860ecaf0370da0d5c4e06571e1770ba?rik=thSVE%2bn9V9iqTw&riu=http%3a%2f%2fimagens.elivrosgratis.com%2fcapas%2fcrime-e-castigo-fiodor-dostoievski.jpg&ehk=8m3hTGueNkzGwmfXsO7SEMTzdZ9FNk0NbvCcWtuA%2bY4%3d&risl=&pid=ImgRaw&r=0", color:"red"},
        { id: 2, title: "Livro 2", author: "Autor 2", image: "https://th.bing.com/th/id/R.d860ecaf0370da0d5c4e06571e1770ba?rik=thSVE%2bn9V9iqTw&riu=http%3a%2f%2fimagens.elivrosgratis.com%2fcapas%2fcrime-e-castigo-fiodor-dostoievski.jpg&ehk=8m3hTGueNkzGwmfXsO7SEMTzdZ9FNk0NbvCcWtuA%2bY4%3d&risl=&pid=ImgRaw&r=0", color:"red"},
        { id: 1, title: "Livro 1", author: "Autor 1", image: "https://th.bing.com/th/id/R.d860ecaf0370da0d5c4e06571e1770ba?rik=thSVE%2bn9V9iqTw&riu=http%3a%2f%2fimagens.elivrosgratis.com%2fcapas%2fcrime-e-castigo-fiodor-dostoievski.jpg&ehk=8m3hTGueNkzGwmfXsO7SEMTzdZ9FNk0NbvCcWtuA%2bY4%3d&risl=&pid=ImgRaw&r=0", color:"red"},
        { id: 2, title: "Livro 2", author: "Autor 2", image: "https://th.bing.com/th/id/R.d860ecaf0370da0d5c4e06571e1770ba?rik=thSVE%2bn9V9iqTw&riu=http%3a%2f%2fimagens.elivrosgratis.com%2fcapas%2fcrime-e-castigo-fiodor-dostoievski.jpg&ehk=8m3hTGueNkzGwmfXsO7SEMTzdZ9FNk0NbvCcWtuA%2bY4%3d&risl=&pid=ImgRaw&r=0", color:"red"},
        { id: 1, title: "Livro 1", author: "Autor 1", image: "https://th.bing.com/th/id/R.d860ecaf0370da0d5c4e06571e1770ba?rik=thSVE%2bn9V9iqTw&riu=http%3a%2f%2fimagens.elivrosgratis.com%2fcapas%2fcrime-e-castigo-fiodor-dostoievski.jpg&ehk=8m3hTGueNkzGwmfXsO7SEMTzdZ9FNk0NbvCcWtuA%2bY4%3d&risl=&pid=ImgRaw&r=0", color:"red"},
      
    ];

  return (
    <div className="fav-container">
      <NavBar/>
      <img src = { Banner } alt = "Minhas vendas" className="banner"/>
      <CardsContainer className = "book-container" cards={favoritos} />
      <CardEdit id="1" title="Livro 1" author="Autor 1" image="https://th.bing.com/th/id/R.d860ecaf0370da0d5c4e06571e1770ba?rik=thSVE%2bn9V9iqTw&riu=http%3a%2f%2fimagens.elivrosgratis.com%2fcapas%2fcrime-e-castigo-fiodor-dostoievski.jpg&ehk=8m3hTGueNkzGwmfXsO7SEMTzdZ9FNk0NbvCcWtuA%2bY4%3d&risl=&pid=ImgRaw&r=0"/>
    </div>
    
  )
}

export default Favoritos