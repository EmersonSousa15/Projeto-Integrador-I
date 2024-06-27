import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
//Icons
import { IoIosArrowRoundForward } from 'react-icons/io';
//Context
import { PageChange } from '../../contexts/pageChange';
import { useContext } from 'react';
import { userRegister } from '../../services/users/userRegister';

const IndividualForm = () => {
    const {count, setCount} = useContext(PageChange);
    const { register, handleSubmit, formState: { errors }, trigger, watch } = useForm();
    const [changePage, setChangePage] = useState(true);

    const handleNextPage = async () => {
        const result = await trigger(["confirmPassword", "email", "password"]);
        if (result) {
            setChangePage(false);
        }
    };

    const confirmPassword = watch('confirmPassword');
    const password = watch('password'); 

    const validatePasswordConfirmation = () => {
        return password === confirmPassword || 'As senhas não coincidem.';
    };

    const onSubmit = (data) => {
        data.type_person = 'fisica';
        const { confirmPassword, ...formData } = data; // Remove o campo confirmPassword dos dados
        userRegister(formData)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                                    {...register('password', { required: true})} 
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
                            {/* Nome e Sobrenome */}
                            <div className="input">
                                <label htmlFor="name">Nome e Sobrenome</label>
                                <input type="text" 
                                    {...register('name', { required: true })} 
                                    className={errors.name ? 'error' : ''}
                                />
                                {errors.name?.type === 'required' && <p className='error-p'>Este campo é obrigatório.</p>}
                            </div>
                            {/* CPF */}
                            <div className="input">
                                <label htmlFor="cpf">CPF</label>
                                <input type="text" 
                                    {...register('cpf', { required: true })} 
                                    placeholder="123.456.789-01" 
                                    className={errors.cpf ? 'error' : ''}
                                />
                                {errors.cpf?.type === 'required' && <p className='error-p'>Este campo é obrigatório.</p>}
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
};

export default IndividualForm;
