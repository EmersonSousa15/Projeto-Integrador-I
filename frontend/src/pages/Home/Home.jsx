import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Card from "../../components/Card/Card";
import Filmes from "../../assets/Filmes.jpg"
import Banner from "../../assets/Banner Minhas Vendas.png"
import "./Home.css";

export const Home = () => {
  return (
    <div className="inicio-container">
      <div className="welcome-container">
        <NavBar/>
        <div style={{display:'flex', flexDirection:'row',  justifyContent: 'space-between', height:'400px'}}>
          <h2>OS MELHORES LIVROS PARA VOCÊ</h2>
          <img style={{ marginRight:'150px'}} src = "https://cdn3d.iconscout.com/3d/premium/thumb/reading-book-3025706-2526904.png" alt = "Homem lendo"/>
        </div>
      </div>
      
      <div className="cards-container" style={{marginTop:'40px'}}>
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