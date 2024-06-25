import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom';
//Icons
import { FaRegUser } from "react-icons/fa6";
import { IoBriefcase } from "react-icons/io5";
//Context
import { PageChange } from '../../contexts/pageChange';
import { useContext } from 'react';

const Option = () => {
    const {count, setCount} = useContext(PageChange);
    const [selectedButton, setSelectedButton] = useState('Individual');
    const navigate = useNavigate();

    const optionHandleClick = (button) => {
        setSelectedButton(button);
    };

    const handleContinueClick = () => {
        selectedButton === 'Individual' ? setCount(1): setCount(2);
    };

    return (
        <>
            <h3 style={{ marginBottom: '8px' }}>Cadastro</h3>
            <h2 style={{ fontWeight: 'bold' }} >Bem-vindo ao nosso portal de compra e venda de livros!</h2>
            <h2>Para continuar, por favor, selecione o tipo de conta que você deseja criar:</h2>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '70px', justifyContent: 'center', padding: '10px 0 10px 0'}}>
                <button onClick={() =>  optionHandleClick('Individual')}
                        style={{
                            backgroundColor: selectedButton === 'Individual' ? 'white' : '#D9D9D9',
                            borderColor: selectedButton === 'Individual' ? '#069C56' : '#D9D9D9',
                            width: '180px',
                            color: selectedButton === 'Individual' ? '#069C56' : 'black',
                            fontSize: '16px'
                        }}>
                    <FaRegUser size={17} style={{ marginRight: '6px'}}/> Pessoa Física
                </button>
                <button onClick={() => optionHandleClick('Corporate')}
                            style={{
                                backgroundColor: selectedButton === 'Corporate' ? 'white' : '#D9D9D9',
                                borderColor: selectedButton === 'Corporate' ? '#069C56' : '#D9D9D9',
                                width: '180px',
                                color: selectedButton === 'Corporate' ? '#069C56' : 'black',
                                fontSize: '16px'
                                }}>
                <IoBriefcase size={17} style={{ marginRight: '6px'}}/>Pessoa Jurídica
                </button>
            </div>

            {selectedButton === 'Individual' ? (
                <h2>Se você é um <span style={{color:'#069C56'}}>indivíduo</span>, esta opção é para você. Com uma conta de pessoa física, você poderá tanto comprar quanto vender livros no nosso site.</h2>
            ) : (
                <h2>Se você está representando uma <span style={{color:'#069C56'}}>empresa</span>, escolha esta opção. Com uma conta de pessoa jurídica, você poderá vender livros, mas não terá a opção de comprar.</h2>
            )}
                
            <h2>Escolha a opção que melhor se encaixa nas suas necessidades e aproveite a nossa plataforma!</h2>
            <button onClick={handleContinueClick} style={{marginTop: '14px'}}>Continuar</button>
            <h1 style={{marginTop: '8px'}}>Já tem uma conta?  <u style ={{fontSize: 15}} onClick={() => navigate('/login')}>Faça login aqui</u></h1>
        </>
  )
}

export default Option