import React, { createContext, useContext, useState } from 'react';

// Criação do contexto
const BookContext = createContext();

// Provedor do contexto para envolver o app
export const BookProvider = ({ children }) => {
  const [bookDetails, setBookDetails] = useState({
    descricaoLivro: "",
    editoraLivro: "",
    estadoLivro: "",
    estoqueLivro: 0,
    generoLivro: "",
    idLivro: 0,
    idVendedor: 0,
    isbn: "",
    linkImagem: "",
    nomeAutor: "",
    nomeLivro: "",
    nomeVendedor: "",
    precoLivro: ""
  });

  return (
    <BookContext.Provider value={{ bookDetails, setBookDetails }}>
      {children}
    </BookContext.Provider>
  );
};

// Custom Hook para usar o contexto
export const useBook = () => {
  return useContext(BookContext);
};
