import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Filmes from "../../assets/Filmes.jpg"
import "./Home.css";
import Card from "../../components/Card/Card";
import { getBooks } from "../../services/books/getBooks";

export const Home = () => {

  const [livros, setLivros] = useState({});
  /*const teste =
  {
    id: 1, title: "The Dreaming Arts", author: "Tom Maloney",
    image: "https://th.bing.com/th/id/R.d76a3f2f396bfbe4bd7f93aef0473028?rik=hlzCPj6pqyINRQ&pid=ImgRaw&r=0"
  }*/

  useEffect(() => {
    const fetchBooks = (async () => {
      const books = (await getBooks());
      setLivros(books);
    })

    fetchBooks();
    
  }, [])

  console.log(livros[0]);
    
  return (
    <div className="inicio-container">
      <div className="welcome-container">
        <NavBar />
      </div>

      <div className="cards-container" style={{ marginTop: '40px' }}>

        {livros.data &&
          livros.data.map((livro) => {
            <Card card={livro} />
          })
        }

      </div>
      <img src={Filmes} alt="Livros que viraram filmes" className="filmes-image" />
      <h2>Livros que viraram filmes</h2>

    </div>

  )
}

export default Home