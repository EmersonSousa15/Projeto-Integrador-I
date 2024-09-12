import React, { useState, useRef } from "react";
import '../NavBar/NavBar.css'
import { FaChevronDown } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { TfiBook } from "react-icons/tfi";
import Logo from '../../assets/LogoBook.png'
import { useUserContext } from "../../Context/UserContext";


const NavBar = () => {
    const [activeSubMenu, setActiveSubMenu] = useState(null); // null, 'account', 'book'
    const timeoutRef = useRef(null);
    const navigate = useNavigate();
    const {userData} = useUserContext();

    const handleMouseEnter = (submenu) => {
        clearTimeout(timeoutRef.current);
        setActiveSubMenu(submenu);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveSubMenu(null);
        }, 100);
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
        <div style={{marginTop:'1.5%'}}>  
            <header className="navbar">
                <div className="container-logo" style={{ display: 'flex', gap: '8px', alignItems:'center', justifyContent:'center' }}>
                    <img src={Logo} alt="Logo" className="logoBook" style={{ width: '40px', height: '40px' }} />
                    <p className="nav-logo" style={{ alignContent:'center'}} onClick={logoClick}>Estante Virtual</p>
                </div>

                <div className="search-box">
                    <input type="text" placeholder="" />
                    <IoSearchOutline style={{ color: "#fff" }} />
                </div>
                

                <div className="right-side">
                    <div 
                        className="submenu-container" 
                        onMouseEnter={() => handleMouseEnter('book')} 
                        onMouseLeave={handleMouseLeave}
                    >
                        <TfiBook className="book" size={25} />
                        {activeSubMenu === 'book' &&
                            <ul className="book-submenu">
                                <li onClick={() => navigate('/cadastrarlivro')}>Cadastrar Livro</li>
                                <li onClick={() => navigate('/meuslivros')}>Meus Livros</li>
                                <li onClick={() => navigate('/minhascompras')}>Minhas Compras</li>
                                <li onClick={() => navigate('/minhasvendas')}>Minhas Vendas</li>  
                            </ul>
                        }
                    </div>

                    <CiHeart className="heart" size={33} onClick={heartClick} />
                    
                    <div 
                        className="submenu-container" 
                        onMouseEnter={() => handleMouseEnter('account')} 
                        onMouseLeave={handleMouseLeave}
                    >
                        <VscAccount size={25} className="account-icon" style={{ color: "#fff" }} />
                        <p className="welcome">Olá, {userData.nomeUsuario != "" ? userData.nomeUsuario : 'Usuário'}</p>
                        {activeSubMenu === 'account' &&
                            <ul className="submenu">
                                <li onClick={logInClick}><span>Log in</span></li>
                                <li onClick={signUpClick}>Sign up</li>
                                <li onClick={() => navigate('/minhaconta')}>Minha conta</li>
                            </ul>
                        }
                        <FaChevronDown className="chevron"/>
                    </div>

                    
                    <BsCart3 className="cart-icon" size={25} onClick={() => navigate('/carrinho')} />
                </div>
            </header>
        </div>
    );
}

export default NavBar;
