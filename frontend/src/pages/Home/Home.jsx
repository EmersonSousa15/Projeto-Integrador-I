import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Card from "../../components/Card/Card";
import Filmes from "../../assets/Filmes.jpg"
import Banner from "../../assets/Banner Minhas Vendas.png"
import "./Home.css";

export const Home = () => {
  return (
    <div className="inicio-contaienr">
      <NavBar/>
      <div className="cards-container">
        <Card color="orange"/> <Card color="orange"/> <Card color="orange"/> <Card color="orange"/> <Card color="orange"/> <Card color="orange"/>
      </div>
      <img src = {Filmes} alt = "Livros que viraram filmes" className="filmes-image"/>
      <h2>Livros que viraram filmes</h2>
      <img src = { Banner } alt = "Minhas vendas"
      className="banner"/>
      <Card/>

    </div>
    
  )
}

export default Home