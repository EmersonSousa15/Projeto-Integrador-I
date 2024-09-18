import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import CardsContainer from "../../components/CardContainer/CardContainer";
import Card from "../../components/Card/Card";
import Banner from '../../assets/Favoritos.jpg'
import Footer from '../../assets/Footer.jpg'
import { getMyBooks } from "../../services/books/getMyBooks";
import { useUserContext } from '../../Context/UserContext';
import "./MyBooks.css";

export const MyBooks = () => {
  const { userData } = useUserContext();
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    const fetchMyBooks = async () => {
      console.log(userData);

      const response = await getMyBooks(userData);

      if (response.code === 200) {
        const livros = response.data;

        setLivros(livros);
      } else {
        console.error("Falha ao carregar os livros favoritos");
      }


    }
    fetchMyBooks();
    console.log(livros);

  }, [])

  return (
    <div className="fav-container">
      <NavBar />
      <img src={Banner} alt="Minhas vendas" className="banner" />
      <CardsContainer cards={livros} option={0}/>
      <img src={Footer} alt="footer" />
    </div>

  )
}

export default MyBooks