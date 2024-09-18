import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Filmes from "../../assets/Filmes.jpg";
import "./Home.css";
import Footer from '../../assets/Footer.jpg';
import Banner from '../../assets/BannerHome.jpg'
import BannerFrete from '../../assets/BannerFrete.jpg'
import Card from "../../components/Card/Card";
import { ListaEncadeada } from "../Home/ListaEncadeada"; 
import { getBooks} from '../../services/books/getBooks';

export const Home = () => {
  const [livros, setLivros] = useState(new ListaEncadeada()); 


  useEffect(() => {
    const fetchBooks = (async () => {
      const books = (await getBooks());

      const listaLivros = new ListaEncadeada();

      books.forEach((livro) => {
        listaLivros.adicionar(livro);
      });  

      setLivros(listaLivros);
    })

    fetchBooks();

  }, [])


  const renderizarLivros = (noAtual) => {
    if (!noAtual) {
      return null;
    }

    return (
      <React.Fragment key={noAtual.valor.idLivro}>
        <Card key={noAtual.valor.idLivro} card={noAtual.valor} />
        {renderizarLivros(noAtual.proximo)}  {/* Renderiza o próximo nó recursivamente */}
      </React.Fragment>
    );
  };

  return (
    <div className="inicio-container">
      <div className="welcome-container">
        <NavBar />
      </div>

      <img src={ BannerFrete } alt='banner' style={{width: '80%', margin:'auto', marginTop:'40px'}}></img>

      <div style={{color:'#069C56', fontSize:'20px', fontStyle:'italic', borderBottom:'1px solid', width:'80%', margin:'auto', marginTop:'40px'}}>Melhores Livros</div>

      <div className="cards-container" style={{ marginTop: '40px', marginLeft:'110px' }}>
        {livros.estaVazia() ? (
          <h1 style={{ margin: 'auto', letterSpacing: '5px' }}>SEM LIVROS CADASTRADOS!</h1>
        ) : (
          renderizarLivros(livros.getCabeca())
        )}
      </div>

      <img src={Footer} alt="footer" />
    </div>
  );
};

export default Home;