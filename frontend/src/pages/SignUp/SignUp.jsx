import React, { useState } from "react";
import Banner from '../../assets/LivrosCaindo.png'
import LogoBook from "../../assets/LogoBook.svg";
import { FaRegUser } from "react-icons/fa6";
import { IoBriefcase } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";

export const SignUp = () => {
    const [content, setContent] = useState();
    const [option, setOption] = useState(true);
    const navigate = useNavigate();

    const optionHandleClick = () => {
        setOption(!option);
    }

    const continueHandleClick = () => {
        if (option) {
            setContent(<h2>Render Pessoa Fisica Content</h2>);
        } else {
            setContent(<h2>Render Pessoa Juridica Content</h2>);
        }
    }

    return(
    <div className="sigup-container">
        <div className="content-side">
            <div className="logo" onClick={() => navigate('/')}>
                <img src = { LogoBook } alt = "Logo" className="logoBook" style={{ width: '56px', height: '70px' }} />
                <span>
                    <h2>Estante</h2>
                    <h2>Virtual</h2>
                </span>
            </div>
            <div className="page-content">
                <h3 style={{ marginBottom: '20px' }}>Cadastro</h3>
                <h2 style={{ fontWeight: 'bold' }} >Bem-vindo ao nosso portal de compra e venda de livros!</h2>
                <h2>Para continuar, por favor, selecione o tipo de conta que você deseja criar:</h2>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '70px', justifyContent: 'center', padding: '10px 0 10px 0'}}>
                    <button style={{ width: '180px'}} onClick={optionHandleClick}><FaRegUser size={20} style={{ marginRight: '6px'}}/>Pessoa Juridica</button>
                    <button style={{ width: '180px'}} onClick={optionHandleClick}><IoBriefcase size={20} style={{ marginRight: '6px'}}/>Pessoa Fisica</button>
                </div>
              {option ? (
                  <h2>Se você é um indivíduo, esta opção é para você. Com uma conta de pessoa física, você poderá tanto comprar quanto vender livros no nosso site.</h2>
              ) : (
                  <h2>Se você está representando uma empresa, escolha esta opção. Com uma conta de pessoa jurídica, você poderá vender livros, mas não terá a opção de comprar.</h2>
              )}
              
              <h2>Escolha a opção que melhor se encaixa nas suas necessidades e aproveite a nossa plataforma!</h2>
              <button style={{marginTop: '20px'}} onClick={continueHandleClick}>Continuar</button>
              <h1>Já tem uma conta?  <u onClick={ () => navigate('/login')}>Faça login aqui</u></h1>
            </div>
        </div>
        <div className="img-side">
            <img src = { Banner } alt = "Livros Caindo" className="books"/>
        </div>
    </div>
  )
}

export default SignUp