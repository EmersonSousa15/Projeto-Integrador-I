import React from "react";
import Banner from '../../assets/LivrosCaindo.png'
import LogoBook from "../../assets/LogoBook.svg";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();

  /*arrow function*/
  const logoClick = () => {
    navigate('/');
  };

  const contaClick = () => {
    navigate('/signup');
  };

  return(
    <div className="login-container">
        <div className="content-side">
            <div className="logo" onClick={logoClick}>
                <img src = { LogoBook } alt = "Logo" className="logoBook" style={{ width: '56px', height: '70px' }} />
                <span>
                    <h2>Estante</h2>
                    <h2>Virtual</h2>
                </span>
            </div>
            <div className="page-content">
              <h3>Log in</h3>
              <div className="inputs">
                  <div className="emailInput">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" />   
                  </div> 
                  <div className="senhaInput">
                      <label htmlFor="senha">Senha</label>
                      <input type="password" id="senha"/>   
                  </div> 
              </div>
              <u>Esqueci minha senha</u>
              <button>Entrar</button>
              <h1>Não tem uma conta?  <u onClick={contaClick}>Cadastre-se aqui</u></h1>
            </div>
        </div>
        <div className="img-side">
            <img src = { Banner } alt = "Livros Caindo" className="books"/>
        </div>
    </div>
  )
}

export default Login