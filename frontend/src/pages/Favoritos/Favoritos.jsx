import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import CardsContainer from "../../components/CardContainer/CardContainer";
import Banner from '../../assets/Favoritos.jpg';
import Footer from '../../assets/Footer.jpg';
import "./Favoritos.css";

export const Favoritos = () => {
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const storedFavoritos = JSON.parse(window.localStorage.getItem('Favoritos')) || [];
        setFavoritos(storedFavoritos); // Define os favoritos no estado
    }, []);

    return (
        <div className="fav-container">
            <NavBar />
            {favoritos.length === 0 ? (  
                <p style={{margin:'auto'}}className="no-favorites">Não há favoritos</p> 
            ) : (
              <>
                <img src={Banner} alt="Minhas vendas" className="banner" />
                <CardsContainer cards={favoritos} option={1} /> 
              </>
            )}
            
            <img src={Footer} alt="footer" />
        </div>
    );
};

export default Favoritos;
