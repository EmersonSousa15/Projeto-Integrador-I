import React, { useContext, useState } from "react";
import "./SignUp.css";
//Navegação das pags
import { useNavigate } from 'react-router-dom';
//Imagens
import Banner from '../../assets/LivrosCaindo.png'
import LogoBook from "../../assets/LogoBook.svg";
//Context
import { PageChange } from "../../Context/pageChange";
import CorporateForm from "../../components/SignUp Components/CorporateForm";
import IndividualForm from "../../components/SignUp Components/IndividualForm";
import Option from "../../components/SignUp Components/Option";

const SignUp = () => {
    const {count} = useContext(PageChange);
    const navigate = useNavigate();

    const renderComponent = () => {
        switch (count) {
            case 0:
                return <Option />;
            case 1:
                return <IndividualForm />;
            case 2:
                return <CorporateForm />;
            default:
                return;
        }
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
                {renderComponent()}
            </div>    

        </div>

        <div className="img-side">
            <img src = { Banner } alt = "Livros Caindo" className="books"/>
        </div>
        
    </div>
  )
}

export default SignUp;
