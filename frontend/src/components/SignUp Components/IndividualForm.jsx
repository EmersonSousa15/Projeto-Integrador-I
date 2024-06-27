import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { PageChange } from '../../contexts/pageChange';

const IndividualForm = () => {
    const {count, setCount} = useContext(PageChange);
    const { register, handleSubmit, formState: { errors }, trigger, watch, setValue } = useForm({mode: 'onChange'});
    const [changePage, setChangePage] = useState(true);

    const handleNextPage = async () => {
        const result = await trigger(["confirmPassword", "email", "password"]);
        if (result) {
            setChangePage(false);
        }
    };

    const onSubmit = (data) => {
        const { confirmPassword, ...formData } = data;
        formData.identity = 'juridica';
        console.log(formData);
    };

    //Formatação CPF
    const formatCPF = (value) => {
        // Remove tudo que não é dígito
        const cleanedValue = value.replace(/\D/g, '');
        // Aplica a máscara
        const formattedValue = cleanedValue
            .slice(0, 11) // Limita o tamanho máximo do CPF
            .replace(/(\d{3})(\d{0,3})(\d{0,3})(\d{0,2})/, (match, p1, p2, p3, p4) => {
                let result = '';
                if (p1) result += p1;
                if (p2) result += '.' + p2;
                if (p3) result += '.' + p3;
                if (p4) result += '-' + p4;
                return result;
            });

        return formattedValue;
    };

    const handleCPFChange = (e) => {
        const formattedValue = formatCPF(e.target.value);
        setValue('cpf', formattedValue, { shouldValidate: true });
    };

    //Formatação Telefone
    const formatTelephone = (value) => {
        const cleanedValue = value.replace(/\D/g, '');

        const formattedValue = cleanedValue
            .slice(0, 10)
            .replace(/(\d{2})(\d{0,4})(\d{0,4})/, (match, p1, p2, p3) => {
                let result = '';
                if (p1) result += '(' + p1;
                if (p2) result += ') ' + p2;
                if (p3) result += '-' + p3;
                return result;
            });
            
        return formattedValue;
    }

    const handleTelephoneChange = (e) => {
        const formattedValue = formatTelephone(e.target.value);
        setValue('telephone', formattedValue, { shouldValidate: true });
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
                                        required: {value: true, message:'Este campo é obrigatório.'},
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
                                    {...register('password', { 
                                        required: 'Este campo é obrigatório.',
                                        minLength: { value:6 , message: 'Deve conter no mínimo 6 caracteres.' } 
                                    })} 
                                    className={errors.password ? 'error' : ''}
                                />
                                {errors.password && <p className='error-p'>{errors.password.message}</p>}
                            </div>

                            {/* Confirmação de Senha */}
                            <div className="input">
                                <label htmlFor="confirmPassword">Confirmação de Senha</label>
                                <input type="password" 
                                    {...register('confirmPassword', { 
                                        required: {value: true, message:'Este campo é obrigatório.'}, 
                                        validate: (value) => value === watch('password') || 'As senhas não coincidem.',
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
                                    {...register('name', { required: {value: true, message:'Este campo é obrigatório.'}})} 
                                    className={errors.name ? 'error' : ''}
                                />
                                {errors.name && <p className='error-p'>{errors.name.message}</p>}
                            </div>
                            {/* CPF */}
                            <div className="input">
                                <label htmlFor="cpf">CPF</label>
                                <input
                                    type="text"
                                    {...register('cpf', {
                                        required: { value: true, message: 'Este campo é obrigatório.' },
                                        minLength: { value: 14, message: 'Informação incompleta.' }
                                    })}
                                    onChange={handleCPFChange}
                                    className={errors.cpf ? 'error' : ''}
                                />
                                {errors.cpf && <p className='error-p'>{errors.cpf.message}</p>}
                            </div>
                            {/* Telefone */}
                            <div className="input">
                                <label htmlFor="telephone">Telefone</label>
                                <input
                                    type="tel"
                                    {...register('telephone', {
                                        required: { value: true, message: 'Este campo é obrigatório.' },
                                        minLength: { value: 14, message: 'Número de celular incompleto.' }
                                    })}
                                    onChange={handleTelephoneChange}
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
