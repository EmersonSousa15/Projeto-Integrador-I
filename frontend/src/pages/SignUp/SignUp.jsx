import React, { useState } from "react";
import Banner from '../../assets/LivrosCaindo.png'
import LogoBook from "../../assets/LogoBook.svg";
import { FaRegUser } from "react-icons/fa6";
import { IoBriefcase } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";

const MainPage = ({ onPageChange, optionClick }) => {
    const [selectedButton, setSelectedButton] = useState('buttonFisica');
    const navigate = useNavigate();

    const optionHandleClick = (button) => {
        setSelectedButton(button);
    };

    const handleContinueClick = () => {
        selectedButton === 'buttonFisica' ? onPageChange('fpage'): onPageChange('jpage');
    };

    return (
        <>
        <h3 style={{ marginBottom: '8px' }}>Cadastro</h3>
        <h2 style={{ fontWeight: 'bold' }} >Bem-vindo ao nosso portal de compra e venda de livros!</h2>
        <h2>Para continuar, por favor, selecione o tipo de conta que você deseja criar:</h2>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '70px', justifyContent: 'center', padding: '10px 0 10px 0'}}>
            <button onClick={() =>  optionHandleClick('buttonFisica')}
                    style={{
                        backgroundColor: selectedButton === 'buttonFisica' ? 'white' : '#D9D9D9',
                        borderColor: selectedButton === 'buttonFisica' ? '#069C56' : '#D9D9D9',
                        width: '180px',
                        color: selectedButton === 'buttonFisica' ? '#069C56' : 'black',
                        fontSize: '16px'
                    }}>
            <FaRegUser size={17} style={{ marginRight: '6px'}}/>Pessoa Física</button>
            <button onClick={() => optionHandleClick('buttonJuridica')}
                        style={{
                            backgroundColor: selectedButton === 'buttonJuridica' ? 'white' : '#D9D9D9',
                            borderColor: selectedButton === 'buttonJuridica' ? '#069C56' : '#D9D9D9',
                            width: '180px',
                            color: selectedButton === 'buttonJuridica' ? '#069C56' : 'black',
                            fontSize: '16px'
                            }}>
            <IoBriefcase size={17} style={{ marginRight: '6px'}}/>Pessoa Jurídica</button>
        </div>
        {selectedButton === 'buttonFisica' ? (
            <h2>Se você é um <span style={{color:'#069C56'}}>indivíduo</span>, esta opção é para você. Com uma conta de pessoa física, você poderá tanto comprar quanto vender livros no nosso site.</h2>
        ) : (
            <h2>Se você está representando uma <span style={{color:'#069C56'}}>empresa</span>, escolha esta opção. Com uma conta de pessoa jurídica, você poderá vender livros, mas não terá a opção de comprar.</h2>
        )}
              
        <h2>Escolha a opção que melhor se encaixa nas suas necessidades e aproveite a nossa plataforma!</h2>
        <button onClick={handleContinueClick} style={{marginTop: '14px'}}>Continuar</button>
        <h1 style={{marginTop: '8px'}}>Já tem uma conta?  <u onClick={() => navigate('/login')}>Faça login aqui</u></h1>
        </>
    );
};

const FisicaPage = ({ onPageChange }) => {
    const [changePage, setChangePage] = useState(true);
    
    return(
        changePage ? (
            <div style={{paddingTop:'40px'}}>
                <div className="inputs">
                        <div className="input">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" />   
                        </div> 
                        <div className="input">
                            <label htmlFor="senha">Senha</label>
                            <input type="password" id="senha"/>   
                        </div> 
                </div>
                <div style={{ display: "flex", flexDirection: "row" , justifyContent: "space-between", paddingTop:'139px' }}>
                    <button onClick={() => onPageChange('main')} style={{width:'140px', gap:'4px', }}><IoIosArrowRoundForward size={30} style={{ transform: "rotate(180deg)" }}/>Anterior</button>
                    <button onClick={() => setChangePage(false)} style={{width:'140px', gap:'4px'}}>Próximo<IoIosArrowRoundForward size={30}/></button>
                </div>
            </div>
        ):(
            <div style={{paddingTop:'40px'}}>
                <div className="inputs">
                        <div className="input">
                            <label htmlFor="name">Nome e Sobrenome</label>
                            <input type="name" id="name" />   
                        </div> 
                        <div className="input">
                            <label htmlFor="cpf">CPF</label>
                            <input type="cpf" id="cpf" placeholder="123.456.789-01"/>   
                        </div> 
                        <div className="input">
                            <label htmlFor="telefone">Telefone</label>
                            <input type="number" id="telefone" placeholder="(11) 99999-9999"/>   
                        </div> 
                </div>
                <div style={{ display: "flex", flexDirection: "row" , justifyContent: "space-between", paddingTop:'40px' }}>
                    <button onClick={() => setChangePage(true)} style={{width:'140px', gap:'4px', }}><IoIosArrowRoundForward size={30} style={{ transform: "rotate(180deg)" }}/>Anterior</button>
                    <button style={{width:'140px', gap:'4px'}}>Cadastrar</button>
                </div>
            </div>
        )
    );
};

const JuridicaPage = ({ onPageChange }) => {
    const [changePage, setChangePage] = useState(true);
    
    return(
        changePage ? (
            <div style={{paddingTop:'40px'}}>
                <div className="inputs">
                    <div className="input">
                        <label htmlFor="name">Nome Fantasia</label>
                        <input type="name" id="fantasyname" />   
                    </div> 
                    <div className="input">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" />   
                    </div> 
                    <div className="input">
                        <label htmlFor="senha">Senha</label>
                        <input type="password" id="senha"/>   
                    </div> 
                </div>
                <div style={{ display: "flex", flexDirection: "row" , justifyContent: "space-between", paddingTop:'40px' }}>
                    <button onClick={() => onPageChange('main')} style={{width:'140px', gap:'4px', }}><IoIosArrowRoundForward size={30} style={{ transform: "rotate(180deg)" }}/>Anterior</button>
                    <button onClick={() => setChangePage(false)} style={{width:'140px', gap:'4px'}}>Próximo<IoIosArrowRoundForward size={30}/></button>
                </div>
            </div>
        ):(
            <div style={{paddingTop:'40px'}}>
                <div className="inputs">
                        <div className="input">
                            <label htmlFor="name">Razão Social</label>
                            <input type="name" id="name" />   
                        </div> 
                        <div className="input">
                            <label htmlFor="cnpj">CNPJ</label>
                            <input type="cnpj" id="cnpj" placeholder="12.345.678/1234-56"/>   
                        </div> 
                        <div className="input">
                            <label htmlFor="telefone">Telefone</label>
                            <input type="number" id="telefone" placeholder="(11) 99999-9999"/>   
                        </div> 
                </div>
                <div style={{ display: "flex", flexDirection: "row" , justifyContent: "space-between", paddingTop:'40px' }}>
                    <button onClick={() => setChangePage(true)} style={{width:'140px', gap:'4px', }}><IoIosArrowRoundForward size={30} style={{ transform: "rotate(180deg)" }}/>Anterior</button>
                    <button style={{width:'140px', gap:'4px'}}>Cadastrar</button>
                </div>
            </div>
        )
    );
};

const SignUp = () => {
    const [currentPage, setCurrentPage] = useState('main');
    const [selectedButton, setSelectedButton] = useState('buttonFisica');
    const navigate = useNavigate();

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const optionHandleClick = (button) => {
        setSelectedButton(button);
    };

    return(
    <div className="signup-container">
        <div className="content-side">
            <div className="logo" onClick={() => navigate('/')}>
                <img src = { LogoBook } alt = "Logo" className="logoBook" style={{ width: '56px', height: '70px' }} />
                <span>
                    <h2>Estante</h2>
                    <h2>Virtual</h2>
                </span>
            </div>
            <div className="page-content">
                {currentPage === 'main' && <MainPage onPageChange={handlePageChange} optionClick={optionHandleClick}/>}
                {currentPage === 'fpage' && <FisicaPage onPageChange={handlePageChange} />}
                {currentPage === 'jpage' && <JuridicaPage onPageChange={handlePageChange} />}
            </div>
        </div>
        <div className="img-side">
            <img src = { Banner } alt = "Livros Caindo" className="books"/>
        </div>
    </div>
  )
}

export default SignUp;
