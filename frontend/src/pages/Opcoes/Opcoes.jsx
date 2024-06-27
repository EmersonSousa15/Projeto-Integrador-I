import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { CiBookmark } from "react-icons/ci";
import { GiReceiveMoney } from "react-icons/gi";
import { PiShoppingBagLight } from "react-icons/pi";
import { BsBookmarkPlus } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import "./Opcoes.css";

export const Opcoes = () => {
    const navigate = useNavigate();
  return (
    <div className="opcoes-container">
      <NavBar/>
      <div className="buttons">
        <button><CiBookmark size={50} /> Meus Livros </button>
        <button><GiReceiveMoney size={50}/> Minhas Vendas </button>
        <button onClick={() => navigate('/cadastrarlivro')}> <BsBookmarkPlus size={42}/> Cadastrar Livros </button>
        <button><PiShoppingBagLight size={50}/> Meus Pedidos </button>
      </div>
      
    </div>
  )
}

export default Opcoes