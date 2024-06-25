import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { PageChange } from '../../contexts/pageChange';
import { useContext } from 'react';
import validator from 'validator';

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
    const password = watch('password'); // Define password here
    const email = watch('email'); // Define email here

    const validatePasswordConfirmation = () => {
        return password === confirmPassword || 'As senhas não coincidem.';
    };

    const validateEmail = () => {
        return validator.isEmail(email) || 'Email inválido.';
    };

    const onSubmit = (data) => {
        const { confirmPassword, ...formData } = data; // Remove o campo confirmPassword dos dados
        formData.identity = 'juridica'; // Adiciona o campo identity com o valor 'juridica'
        console.log(formData); // Aqui você pode enviar os dados para um servidor ou processá-los conforme necessário
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
                                    {...register('email', { 
                                        required: 'Este campo é obrigatório.',
                                        validate: validateEmail 
                                    })}  
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
                            {/* Confirmação de Senha */}
                            <div className="input">
                                <label htmlFor="confirmPassword">Confirmação de Senha</label>
                                <input type="password" 
                                    {...register('confirmPassword', { 
                                        required: 'Este campo é obrigatório.', 
                                        validate: validatePasswordConfirmation 
                                    })} 
                                    className={errors.confirmPassword ? 'error' : ''}
                                />
                                {errors.confirmPassword && <p className='error-p'>{errors.confirmPassword.message}</p>}
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
                                    {...register('name', { required: 'Este campo é obrigatório.' })} 
                                    className={errors.name ? 'error' : ''}
                                />
                                {errors.name && <p className='error-p'>{errors.name.message}</p>}
                            </div>
                            {/* CPF */}
                            <div className="input">
                                <label htmlFor="cpf">CPF</label>
                                <input type="text" 
                                    {...register('cpf', { required: 'Este campo é obrigatório.' })} 
                                    placeholder="123.456.789-01" 
                                    className={errors.cpf ? 'error' : ''}
                                />
                                {errors.cpf && <p className='error-p'>{errors.cpf.message}</p>}
                            </div>
                            {/* Telefone */}
                            <div className="input">
                                <label htmlFor="telephone">Telefone</label>
                                <input type="tel" 
                                    {...register('telephone', { required: 'Este campo é obrigatório.' })} 
                                    placeholder="(XX) XXXXX-XXXX" 
                                    className={errors.telephone ? 'error' : ''}
                                />
                                {errors.telephone && <p className='error-p'>{errors.telephone.message}</p>}
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
