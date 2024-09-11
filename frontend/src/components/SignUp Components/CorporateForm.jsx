import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { PageChange } from '../../contexts/pageChange';
import { useContext } from 'react';
import { userRegister } from '../../services/users/userRegister.js';
import { useNavigate } from 'react-router-dom';
import { RegisterUserInfoLogin, UIUsername, UIUserTelephone} from './UserForm';

const CorporationForm = () => {
    const { count, setCount } = useContext(PageChange);
    const { register, handleSubmit, formState: { errors }, setError, trigger, watch, setValue } = useForm({ mode: 'onChange' });
    const [changePage, setChangePage] = useState(true);
    const navigate = useNavigate();

    const handleFinalSubmit = async (data) => {
        const { confirmPassword, ...formData } = data; // Remove o campo confirmPassword dos dados
        formData.identity = 'juridica'; // Adiciona o campo identity com o valor 'juridica'

        const registerResponse = await userRegister(formData, setChangePage)

        if (registerResponse === 200) {
            navigate('/login')
        } else {
            if (registerResponse.code === 'EMAIL_ALREADY_EXISTS') {
                setChangePage(true)
                setError('email', { type: registerResponse.code, message: registerResponse.message})
            }else{
                setError('cnpj', { type: registerResponse.code, message: registerResponse.message})
            }

        }
    };

    //Formatação CNPJ
    const formatCNPJ = (value) => {
        // Remove tudo que não é dígito
        const cleanedValue = value.replace(/\D/g, '');
        // Aplica a máscara
        const formattedValue = cleanedValue
            .slice(0, 14) // Limita o tamanho máximo do CPF
            .replace(/(\d{2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/, (match, p1, p2, p3, p4, p5) => {
                let result = '';
                if (p1) result += p1;
                if (p2) result += '.' + p2;
                if (p3) result += '.' + p3;
                if (p4) result += '.' + p4;
                if (p5) result += '-' + p5;
                return result;
            });

        return formattedValue;
    };

    const handleCNPJChange = (e) => {
        const formattedValue = formatCNPJ(e.target.value);
        setValue('cnpj', formattedValue, { shouldValidate: true });
    };

    return (
        <form onSubmit={handleSubmit(handleFinalSubmit)}>
            <div style={{ paddingTop: '20px' }}>
                <div className="inputs">
                    {changePage &&
                        <RegisterUserInfoLogin
                            register={register}
                            trigger={trigger}
                            errors={errors}
                            watch={watch}
                            setCount={setValue}
                            setChangePage={setChangePage}
                        />
                    }
                    {!changePage &&
                        <>
                            {/* Nome */}
                            <UIUsername register={register} errors={errors} />

                            {/* CNPJ */}
                            <div className="input">
                                <label htmlFor="cnpj">CNPJ</label>
                                <input
                                    type="text"
                                    {...register('cnpj', {
                                        required: { value: true, message: 'Este campo é obrigatório.' },
                                        minLength: { value: 18, message: 'Informação incompleta.' }
                                    })}
                                    onChange={handleCNPJChange}
                                    className={errors.cnpj ? 'error' : ''}
                                />
                                {errors.cnpj && <p className='error-p'>{errors.cnpj.message}</p>}
                            </div>

                            {/* Telefone */}
                            <UIUserTelephone register={register} errors={errors} setValue={setValue} />

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

export default CorporationForm;