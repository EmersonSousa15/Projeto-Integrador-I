import React, { useState, useRef } from "react";
import '../NavBar/NavBar.css'
import { FaChevronDown } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { TfiBook } from "react-icons/tfi";


const NavBar = () => {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();

    const handleAccountMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setShowSubMenu(true);
    };

    const handleAccountMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowSubMenu(false);
        }, 100);
    };

    const handleCartClick = () => {
        navigate('/carrinho');
    };

    const bookClick = () => {
        navigate('/opcoes');
    };

    const heartClick = () => {
        navigate('/favoritos');
    };

    const logoClick = () => {
        navigate('/');
    };

    const signUpClick = () => {
        navigate('/signup');
    };

    const logInClick = () => {
        navigate('/login');
    };
    
    return (
        <>
            <div className="freteGratis">
                <p>* Frete grátis para todo Brasil * Frete grátis para todo Brasil  * Frete grátis para todo Brasil
                    * Frete grátis para todo Brasil * Frete grátis para todo Brasil * Frete grátis para todo Brasil
                    * Frete grátis para todo Brasil * Frete grátis para todo Brasil
                </p>
            </div>

            <header className="navbar">
                <div className="container-logo">
                    <p className="nav-logo" onClick={logoClick} >Estante<br/>Virtual</p>
                </div>

                <div className="search-box">
                    <input type="text" placeholder="" />
                    <IoSearchOutline style={{ color: "#fff" }} />
                </div>

                <div className="right-side">
                    <TfiBook className="book" size={25} onClick={bookClick}/>
                    <CiHeart className="heart" size={33} onClick={heartClick} />
                    <div className="submenu-container" onMouseEnter={handleAccountMouseEnter} onMouseLeave={handleAccountMouseLeave}>
                        <VscAccount size={25} className="account-icon" style={{ color: "#fff" }} />
                        <p className="welcome">Olá, usuário</p>
                        {showSubMenu &&
                            <ul className="submenu">
                                <li onClick={logInClick}><span>Log in</span></li>
                                <li onClick={signUpClick}>Sign up</li>
                                <li>Minha conta</li>
                            </ul>
                        }
                        <FaChevronDown className="chevron"/>

                    </div>

                    <BsCart3 className="cart-icon" size={25} onClick={handleCartClick} />
                </div>
            </header>
        </>
    );
}

export default NavBar