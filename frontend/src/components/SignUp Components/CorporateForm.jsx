import React, { useState, useContext } from 'react';
// React Form
import { useForm } from 'react-hook-form';
// Icons
import { IoIosArrowRoundForward } from 'react-icons/io';
// Context
import { PageChange } from '../../contexts/pageChange';

const CorporateForm = () => {
    const { count, setCount } = useContext(PageChange);
    const { register, handleSubmit, formState: { errors }, trigger, watch } = useForm();
    const [changePage, setChangePage] = useState(true);

    /* Funçao para deixar ir pra próxima página se não houver erro nos inputs */
    const handleNextPage = async () => {
        const result = await trigger(["confirmPassword", "email", "password"]);
        console.log(result);
        if (result) {
            setChangePage(false);
        }
    };

    /* Observa as mudanças das entradas */
    const confirmPassword = watch('confirmPassword');
    const password = watch('password'); 

    /* Se as senhas não são iguais imprime essa mensagem de erro */
    const validatePasswordConfirmation = (value) => {
        return password === confirmPassword || 'As senhas não coincidem.';
    };

    /* Printa no console os dados enviados */
    const onSubmit = (data) => {
        const { confirmPassword, ...formData } = data; // Remove o campo confirmPassword dos dados
        console.log(formData);
    };

    return (
        <form className="corporate-container" onSubmit={handleSubmit(onSubmit)}>
            <div style={{ paddingTop: '20px' }}>
                <div className="inputs">
                    {changePage &&
                        <>
                            {/* Email */}
                            <div className="input"> 
                                <label htmlFor="email">Email</label>
                                <input type="email" 
                                    {...register('email', { required: true })} 
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email?.type === 'required' && <p className='error-p'>Este campo é obrigatório.</p>}
                            </div>
                            {/* Senha */}
                            <div className="input">
                                <label htmlFor="password">Senha</label>
                                <input type="password" 
                                    {...register('password', { required: true })} 
                                    className={errors.password ? 'error' : ''}
                                />
                                {errors.password?.type === 'required' && <p className='error-p'>Este campo é obrigatório.</p>}
                            </div>
                            {/* Confirmação de Senha */}
                            <div className="input">
                                <label htmlFor="confirmPassword">Confirmação de Senha</label>
                                <input type="password" 
                                    {...register('confirmPassword', { required: true, validate: validatePasswordConfirmation})} 
                                    className={errors.confirmPassword ? 'error' : ''}
                                />
                                {errors.confirmPassword?.type === 'required' && <p className='error-p'>Este campo é obrigatório.</p>}
                                {errors.confirmPassword?.type === 'validate' && <p className='error-p'>{errors.confirmPassword.message}</p>}
                            </div>
                            {/* Botões */}
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: '24px' }}>
                                <button type="button" onClick={() => setCount(0)} style={{ width: '140px', gap: '4px' }}>
                                    <IoIosArrowRoundForward size={30} style={{ transform: 'rotate(180deg)' }} /> Anterior
                                </button>
                                <button onClick={handleNextPage} style={{ width: '140px', gap: '4px' }}>
                                    Próximo <IoIosArrowRoundForward size={30} />
                                </button>
                            </div>
                        </>
                    }
                    {!changePage &&
                        <>
                            {/* Nome Fantasia */}
                            <div className="input">
                                <label htmlFor="businessName">Nome Fantasia</label>
                                <input type="text" 
                                    {...register('businessName', { required: true })} 
                                    className={errors.businessName ? 'error' : ''}
                                />
                                {errors.businessName?.type === 'required' && <p className='error-p'>Este campo é obrigatório.</p>}
                            </div>
                            {/* CNPJ */}
                            <div className="input">
                                <label htmlFor="cnpj">CNPJ</label>
                                <input type="text"
                                    {...register('cnpj', { required: true })} 
                                    placeholder="00.000.000/0000-00" 
                                    className={errors.cnpj ? 'error' : ''}
                                />
                                {errors.cnpj?.type === 'required' && <p className='error-p'> Este campo é obrigatório.</p>}
                            </div>
                            {/* Telefone */}
                            <div className="input">
                                <label htmlFor="telephone">Telefone</label>
                                <input type="tel" 
                                    {...register('telephone', { required: true })} 
                                    placeholder="(XX) XXXXX-XXXX" 
                                    className={errors.telephone ? 'error' : ''}
                                />
                                {errors.telephone?.type === 'required' && <p className='error-p'>Este campo é obrigatório.</p>}
                            </div>
                            {/* Botões */}
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: '24px' }}>
                                <button type="button" onClick={() => setChangePage(true)} style={{ width: '140px', gap: '4px' }}>
                                    <IoIosArrowRoundForward size={30} style={{ transform: 'rotate(180deg)' }} /> Anterior
                                </button>
                                <button type="submit" style={{ width: '140px', gap: '4px' }}>
                                    Cadastrar
                                </button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </form>
    );
}

export default CorporateForm;
