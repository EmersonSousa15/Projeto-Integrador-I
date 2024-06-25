import React, { useState, useContext } from 'react';
// React Form
import { useForm, Controller } from 'react-hook-form';
// Icons
import { IoIosArrowRoundForward } from 'react-icons/io';
// Context
import { PageChange } from '../../contexts/pageChange';
// Validator
import InputMask from 'react-input-mask';

const CorporateForm = () => {
    const { count, setCount } = useContext(PageChange);
    const { register, handleSubmit, formState: { errors }, trigger, watch, control } = useForm();
    const [changePage, setChangePage] = useState(true);

    /* Função para deixar ir para a próxima página se não houver erro nos inputs */
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
        formData.identity = 'juridica';
        console.log(formData);
    };

    return (
        <form className="corporate-container" onSubmit={handleSubmit(onSubmit)}>
            <div style={{ paddingTop: '20px' }}>
                <div className="inputs">
                    {changePage &&
                        <>
                            <div className="input">
                                <label htmlFor="email">Email</label>
                                <input type="email" 
                                    {...register('email', { 
                                        required: 'Este campo é obrigatório.',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'E-mail inválido.',
                                        },
                                    })}  
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <p className='error-p'>{errors.email.message}</p>}
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
                                    {...register('confirmPassword', { 
                                        required: true, 
                                        validate: validatePasswordConfirmation
                                    })} 
                                    className={errors.confirmPassword ? 'error' : ''}
                                />
                                {errors.confirmPassword &&<p className='error-p'>{errors.confirmPassword.message}</p>}
                            </div>
                            {/* Botões */}
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: '24px' }}>
                                <button type="button" onClick={() => setCount(0)} style={{ width: '140px', gap: '4px' }}>
                                    <IoIosArrowRoundForward size={30} style={{ transform: 'rotate(180deg)' }} /> Anterior
                                </button>
                                <button type="button" onClick={handleNextPage} style={{ width: '140px', gap: '4px' }}>
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
                                <Controller
                                    name="cnpj"
                                    control={control}
                                    rules={{ required: 'Este campo é obrigatório.',
                                            minLength: {value: 19, message: 'Informação incompleta.'}}}
                                    render={({ field }) => (
                                        <InputMask
                                            {...field}
                                            mask="99.999.9999/9999-99"
                                            maskChar={null}
                                            alwaysShowMask={false}
                                        >
                                            {(inputProps) => <input {...inputProps} type="text" className={errors.cnpj ? 'error' : ''} />}
                                        </InputMask>
                                    )}
                                />
                                {errors.cnpj && <p className='error-p'>{errors.cnpj.message}</p>}
                            </div>
                            {/* Telefone */}
                            <div className="input">
                                <label htmlFor="telephone">Telefone</label>
                                <Controller
                                    name="telephone"
                                    control={control}
                                    rules={{ 
                                        required: 'Este campo é obrigatório.', 
                                        minLength: {value: 19, message: 'Número de celular incompleto.'}}}
                                    render={({ field }) => (
                                        <InputMask
                                            {...field}
                                            mask="+55 (99) \99999-9999"
                                            maskChar={null}
                                            alwaysShowMask={false}
                                        >
                                            {(inputProps) => <input {...inputProps} type="tel" className={errors.telephone ? 'error' : ''} />}
                                        </InputMask>
                                    )}
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
}

export default CorporateForm;
