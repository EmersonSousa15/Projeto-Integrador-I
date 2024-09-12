import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import CardsContainer from "../../components/CardContainer/CardContainer";
import Banner from '../../assets/Favoritos.jpg'
import Footer from '../../assets/Footer.jpg'
import "./MyBooks.css";

export const Favoritos = () => {
    const favoritos = [
        { id: 1, title: "The Dreaming Arts", author: "Tom Maloney", image: "https://th.bing.com/th/id/R.d76a3f2f396bfbe4bd7f93aef0473028?rik=hlzCPj6pqyINRQ&pid=ImgRaw&r=0"},
        { id: 2, title: "The Dreaming Arts", author: "Tom Maloney", image: "https://th.bing.com/th/id/R.d76a3f2f396bfbe4bd7f93aef0473028?rik=hlzCPj6pqyINRQ&pid=ImgRaw&r=0"},
        { id: 1, title: "The Dreaming Arts", author: "Tom Maloney", image: "https://th.bing.com/th/id/R.d76a3f2f396bfbe4bd7f93aef0473028?rik=hlzCPj6pqyINRQ&pid=ImgRaw&r=0"},
        { id: 2, title: "The Dreaming Arts", author: "Tom Maloney", image: "https://th.bing.com/th/id/R.d76a3f2f396bfbe4bd7f93aef0473028?rik=hlzCPj6pqyINRQ&pid=ImgRaw&r=0"},
        { id: 1, title: "The Dreaming Arts", author: "Tom Maloney", image: "https://th.bing.com/th/id/R.d76a3f2f396bfbe4bd7f93aef0473028?rik=hlzCPj6pqyINRQ&pid=ImgRaw&r=0"},
        { id: 1, title: "The Dreaming Arts", author: "Tom Maloney", image: "https://th.bing.com/th/id/R.d76a3f2f396bfbe4bd7f93aef0473028?rik=hlzCPj6pqyINRQ&pid=ImgRaw&r=0"},
        { id: 1, title: "The Dreaming Arts", author: "Tom Maloney", image: "https://th.bing.com/th/id/R.d76a3f2f396bfbe4bd7f93aef0473028?rik=hlzCPj6pqyINRQ&pid=ImgRaw&r=0"}
    ];

    const teste = { id: 1, title: "Livro 1", author: "Autor 1", image: "https://th.bing.com/th/id/R.d860ecaf0370da0d5c4e06571e1770ba?rik=thSVE%2bn9V9iqTw&riu=http%3a%2f%2fimagens.elivrosgratis.com%2fcapas%2fcrime-e-castigo-fiodor-dostoievski.jpg&ehk=8m3hTGueNkzGwmfXsO7SEMTzdZ9FNk0NbvCcWtuA%2bY4%3d&risl=&pid=ImgRaw&r=0"};

  return (
    <div className="fav-container">
      <NavBar/>
      <img src = { Banner } alt = "Minhas vendas" className="banner"/>
      <CardsContainer cards={favoritos} option={0}/>
      <img src={Footer} alt="footer"/>
    </div>
    
  )
}

export default Favoritos