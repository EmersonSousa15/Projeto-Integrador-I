import React, { useState } from "react";
import '../NavBar/NavBar.css'
import { BsCart3 } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { IoSearchOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from 'react-router-dom'; 
import { CiHeart } from "react-icons/ci";


const NavBar = () => {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const navigate = useNavigate();

    const handleAccountMouseEnter = () => {
        setShowSubMenu(true);
    };

    const handleAccountMouseLeave = () => {
        setShowSubMenu(false);
    };

    const handleCartClick = () => {
        navigate('/carrinho');
    };

    const heartClick = () => {
        navigate('/favoritos');
    };

    const logoClick = () => {
        navigate('/');
    };

    return(
        <>
            <div className="freteGratis">
                    <p>* Frete grátis para todo Brasil * Frete grátis para todo Brasil  * Frete grátis para todo Brasil 
                    * Frete grátis para todo Brasil * Frete grátis para todo Brasil * Frete grátis para todo Brasil 
                    </p>
            </div>
            <header className="navbar">

                <p className="nav-logo" onClick={logoClick} >Estante Virtual</p>  

                <div className="search-box">
                    <input type="text" placeholder="" />
                    <IoSearchOutline style={{ color: "#fff"}} />
                </div>

                <div className="right-side">
                    <CiHeart className="heart" size={33} onClick={heartClick}/>
                    <div className="submenu-container"onMouseEnter={handleAccountMouseEnter} onMouseLeave={handleAccountMouseLeave}>
                        <VscAccount size={25} className="account-icon" style={{ color: "#fff" }}/>
                        <p className="welcome">Olá, usuário</p>
                        {showSubMenu && 
                            <ul className="submenu">
                                <li>Log<span>in</span></li>
                                <li>Sign<span>in</span></li>
                            </ul>
                        }
                        
                    </div>
                    
                    <BsCart3 className="cart-icon" size={25} onClick={handleCartClick} />
                </div>   
            </header>
        </>
    );
}

export default NavBar