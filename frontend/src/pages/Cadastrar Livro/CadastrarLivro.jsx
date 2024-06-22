import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import LogoBook from "../../assets/LogoBook.svg";
import "./CadastrarLivro.css";

export const CadastrarLivro = () => {
  return (
    <div className="inicio-container">
      <NavBar/>
      <div className="content">
        <div className="titulo">
          <img src = { LogoBook } alt = "Logo" className="logoBook" style={{ width: '56px', height: '70px' }} />
          <span>
            <h2>Cadastrar</h2>
            <h2>Livro</h2>
          </span>
        </div>
        <form className="formulario">
          <>
            <div className="foto-book">
            
            </div>
            <div className="inputs">
              <div className="nomeInput">
                <label htmlFor="nomeLivro">Nome do Livro</label>
                <input type="text" id="nomeLivro" />   
              </div> 
              <div className="nomeInput">
                <label htmlFor="nomeAutor">Nome do Autor</label>
                <input type="text" id="nomeAutor" />   
              </div>
              <div className="nomeInput">
                <label htmlFor="editora">Editora</label>
                <input type="text" id="editora" />   
              </div>
              <div className="nomeInput">
                <label htmlFor="linkImagem">Link da Imagem</label>
                <input type="text" id="linkImagem" />   
              </div>
              div
            </div>
          </>

        </form>
      </div>
      
    </div>
  )
}

export default CadastrarLivro