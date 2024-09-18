import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { PageChange } from '../../Context/pageChange';
import { userRegister } from '../../services/users/userRegister';
import { useNavigate } from 'react-router-dom'
import { RegisterUserInfoLogin, UIUserTelephone, UIUsername } from './UserForm';

const IndividualForm = () => {
    const { count, setCount } = useContext(PageChange);
    const { register, handleSubmit, formState: { errors }, setError, trigger, watch, setValue } = useForm({ mode: 'onChange' });
    const [changePage, setChangePage] = useState(true);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { confirmPassword, ...formData } = data;
        formData.identity = 'fisica';
        const registerResponse = await userRegister(formData, setChangePage)
        
        if (registerResponse.code === 200) {
            navigate('/login')
        } else {
            if (registerResponse.code === 'EMAIL_ALREADY_EXISTS') {
                setChangePage(true)
                setError('email', { type: registerResponse.code, message: registerResponse.message})
            }else{
                setError('cpf', { type: registerResponse.code, message: registerResponse.message})
            }

        }
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                            <UIUserTelephone register={register} errors={errors} setValue={setValue} />

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