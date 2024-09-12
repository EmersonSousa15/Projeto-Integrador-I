import React, { createContext, useContext, useState } from 'react';

// Criação do contexto
const BookContext = createContext();

// Provedor do contexto para envolver o app
export const BookProvider = ({ children }) => {
  const [bookDetails, setBookDetails] = useState({
    descricaoLivro: "teste",
    editoraLivro: "renova",
    estadoLivro: "Novo",
    estoqueLivro: 1222,
    generoLivro: "aventura",
    idLivro: 2,
    idVendedor: 52,
    isbn: "111-11-11111-11-1",
    linkImagem: "https://a-static.mlcdn.com.br/800x560/livro-finais-violentos-capa-dura/lgolfinho/9788550822136/22aa360d4bab25ed14138a397114f060.jpg",
    nomeAutor: "julio",
    nomeLivro: "hitas e suas aventuras",
    nomeVendedor: "sousa",
    precoLivro: "12121.00"
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
