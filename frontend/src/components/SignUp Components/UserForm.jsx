import React from "react"
import { IoIosArrowRoundForward } from 'react-icons/io';

export const RegisterUserInfoLogin = ({register, trigger, errors, watch, setCount, setChangePage}) => {

    const handleNextPage = async () => {
        const result = await trigger(["confirmPassword", "email", "password"]);
        if (result) {
            setChangePage(false);
        }
    };

    return (
        <>
            {/* Email */}
            <div className="input">
                <label htmlFor="email">Email</label>
                <input type="email"
                    {...register('email', {
                        required: { value: true, message: 'Este campo é obrigatório.' },
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'E-mail inválido.',
                        }
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
                        minLength: { value: 6, message: 'Deve conter no mínimo 6 caracteres.' }
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
                        required: { value: true, message: 'Este campo é obrigatório.' },
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
    )
}


export const UIUsername = ({register, errors}) => {

    return (
        <div className="input">
            <label htmlFor="name">Nome e Sobrenome</label>
            <input type="text"
                {...register('name', { required: { value: true, message: 'Este campo é obrigatório.' } })}
                className={errors.name ? 'error' : ''}
            />
            {errors.name && <p className='error-p'>{errors.name.message}</p>}
        </div>
    )
}


export const UIUserTelephone = ({register, errors, setValue}) => {

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
    )
}