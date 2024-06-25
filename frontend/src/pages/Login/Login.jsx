import React from "react";
import Banner from '../../assets/LivrosCaindo.png'
import LogoBook from "../../assets/LogoBook.svg";
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { useForm } from 'react-hook-form';

export const Login = () => {
  const { register, handleSubmit, formState: { errors }, trigger, watch, control } = useForm();
  const navigate = useNavigate();

  /*arrow function*/
  const logoClick = () => {
    navigate('/');
  };

  const contaClick = () => {
    navigate('/signup');
  };

  /* Printa no console os dados enviados */
  const onSubmit = (data) => {
    console.log(data);
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className= "inputs" style={{paddingTop: '40px'}}>
                  {/* Email */}
                  <div className="input">
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                      {...register('email', { required: 'Este campo é obrigatório.'})}  
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <p className='error-p'>{errors.email.message}</p>}
                  </div>
                  {/* Senha */}
                  <div className="input">
                    <label htmlFor="password">Senha</label>
                    <input type="password" 
                      {...register('password', { required: 'Este campo é obrigatório.'})} 
                      className={errors.password ? 'error' : ''}
                    />
                     {errors.password && <p className='error-p'>{errors.password.message}</p>}
                  </div>
                  <u style={{marginTop: '0px', alignSelf:'flex-end'}}>Esqueci minha senha</u>
                  <button type="submit" style={{marginTop: '32px', alignSelf:'center'}}>Entrar</button>
                </div>
              </form>
              <h1 style={{marginTop: '8px'}}>Não tem uma conta?  <u onClick={contaClick}>Cadastre-se aqui</u></h1>
            </div>
        </div>
        <div className="img-side">
            <img src = { Banner } alt = "Livros Caindo" className="books"/>
        </div>
    </div>
  )
}

export default Login