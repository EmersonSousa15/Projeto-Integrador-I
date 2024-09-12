import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import NavBar from "../../components/NavBar/NavBar";
import Icon from "../../assets/minhacontapng.png";
import Footer from '../../assets/Footer.jpg'
import "./MyAccount.css";
import { useUserContext } from '../../Context/UserContext';

export const MyAccount = () => {
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm({ mode: 'onChange' });
    const { userData } = useUserContext();

    const onSubmit = (data) => {
        const { confirmPassword, ...formData } = data; // Remove o campo confirmPassword dos dados
        formData.identity = 'juridica';
        console.log(formData);
    };

    const formatCEP = (value) => {
        // Remove tudo que não é dígito
        const cleanedValue = value.replace(/\D/g, '');
        // Aplica a máscara
        const formattedValue = cleanedValue
            .slice(0,8) // Limita o tamanho máximo do CPF
            .replace(/(\d{5})(\d{0,3})/, (match, p1, p2) => {
                let result = '';
                if (p1) result += p1;
                if (p2) result += '-' + p2;
                return result;
            });

        return formattedValue;
    };

    const handleCEPChange = (e) => {
        const formattedValue = formatCEP(e.target.value);
        setValue('cep', formattedValue, { shouldValidate: true });
    };

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

    const handleCPFChange = (e, fieldName) => {
        const formattedValue = formatCPF(e.target.value);
        setValue(fieldName, formattedValue, { shouldValidate: true });
    };

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
        <div className="account-container">
            <NavBar />
            <div className="account-content">
                <div className='minha-conta'>
                    <img src={Icon} alt="icon" />
                    Minha Conta
                </div>
                <div className="account-form">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <h3>Informações da conta</h3>
                        <hr className="divider" />

                        <div className='client-info' style={{ marginTop: '3%' }}>
                            {/* Nome */}
                            <div className="input">
                                <label htmlFor="name">Nome e Sobrenome</label>
                                <input style={{ width: '100%' }} type="text"
                                    {...register('name', { required: { value: true, message: 'Este campo é obrigatório.' } })}
                                    className={errors.name ? 'error' : ''}
                                    
                                    value={userData? userData.nomeUsuario : ''}
                                />
                                {errors.name && <p className='error-p'>{errors.name.message}</p>}
                            </div>

                            {/* CPF */}
                            <div className="input">
                                <label htmlFor="cpf">CPF</label>
                                <input style={{ width: '100%' }}
                                    type="text"
                                    {...register('cpf', {
                                        required: { value: true, message: 'Este campo é obrigatório.' },
                                        minLength: { value: 14, message: 'Informação incompleta.' }
                                    })}
                                    onChange={(e) => handleCPFChange(e, 'cpf')}
                                    className={errors.cpf ? 'error' : ''}
                                    value={userData ? userData.cpf : ''}
                                />
                                {errors.cpf && <p className='error-p'>{errors.cpf.message}</p>}
                            </div>
                        </div>

                        <div className='client-info'>
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
                                    
                                    value={userData ? userData.emailUsuario : ''}
                                />
                                {errors.email && <p className='error-p'>{errors.email.message}</p>}
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
                                    
                                    value={userData? userData.telefoneUsuario : ''}
                                />
                                {errors.telephone && <p className='error-p'>{errors.telephone.message}</p>}
                            </div>
                        </div>

                        <h3>Endereço</h3>
                        <hr className="divider" />

                        {/* CEP */}
                        <div className="input" style={{ marginTop: '3%' }}>
                            <label htmlFor="cep">CEP</label>
                            <input style={{ width: '30%' }} type="text"
                                {...register('cep', {
                                    minLength: { value: 8, message: 'Informação incompleta.' }
                                })}
                                onChange={handleCEPChange}
                                className={errors.cep ? 'error' : ''}
                            />
                            {errors.cep && <p className='error-p'>{errors.cep.message}</p>}
                        </div>
                        
                        <div className='client-info' style={{ marginTop: '3%' }}>
                            {/* Rua */}
                            <div className="input">
                                <label htmlFor="street">Rua</label>
                                <input style={{ width: '100%' }} type="text"
                                    {...register('street')}
                                    className={errors.street ? 'error' : ''}
                                />
                                {errors.street && <p className='error-p'>{errors.street.message}</p>}
                            </div>

                            {/* Número */}
                            <div className="input">
                                <label htmlFor="residenceNumber">Número</label>
                                <input style={{ width: '100%' }}
                                    type="text"
                                    {...register('residenceNumber', {
                                        pattern: { value: /^[0-9]*$/, message: 'Apenas números são permitidos.' }
                                    })}
                                    className={errors.residenceNumber ? 'error' : ''}
                                />
                                {errors.residenceNumber && <p className='error-p'>{errors.residenceNumber.message}</p>}
                            </div>
                        </div>

                        <div className='client-info'>
                            {/* Complemento */}
                            <div className="input">
                                <label htmlFor="adicional">Complemento</label>
                                <input type="text"
                                    {...register('adicional')}
                                    className={errors.adicional ? 'error' : ''}
                                />
                                {errors.adicional && <p className='error-p'>{errors.adicional.message}</p>}
                            </div>

                            {/* Bairro */}
                            <div className="input">
                                <label htmlFor="neighborhood">Bairro</label>
                                <input
                                    type="text"
                                    {...register('neighborhood')}
                                    className={errors.neighborhood ? 'error' : ''}
                                />
                                {errors.neighborhood && <p className='error-p'>{errors.neighborhood.message}</p>}
                            </div>
                        </div>

                        <div className='client-info'>
                            {/* Cidade */}
                            <div className="input">
                                <label htmlFor="city">Cidade</label>
                                <input type="text"
                                    {...register('city')}
                                    className={errors.city ? 'error' : ''}
                                />
                                {errors.city && <p className='error-p'>{errors.city.message}</p>}
                            </div>

                            {/* Estado */}
                            <div className="input">
                                <label htmlFor="state">Estado</label>
                                <input
                                    type="text"
                                    {...register('state')}
                                    className={errors.state ? 'error' : ''}
                                />
                                {errors.state && <p className='error-p'>{errors.state.message}</p>}
                            </div>
                        </div>

                        <h3>Conta Bancária</h3>
                        <hr className="divider" />

                        <div className='client-info' style={{ marginTop: '3%' }}>
                            {/* Nome do Titular */}
                            <div className="input">
                                <label htmlFor="accountHolder">Nome do Titular</label>
                                <input style={{ width: '100%' }} type="text"
                                    {...register('accountHolder')}
                                    className={errors.accountHolder ? 'error' : ''}
                                />
                                {errors.accountHolder && <p className='error-p'>{errors.accountHolder.message}</p>}
                            </div>

                            {/* CPF do Titular */}
                            <div className="input">
                                <label htmlFor="accountCPF">CPF do Titular</label>
                                <input style={{ width: '100%' }}
                                    type="text"
                                    {...register('accountCPF', {
                                        minLength: { value: 14, message: 'Informação incompleta.' }
                                    })}
                                    onChange={(e) => handleCPFChange(e, 'accountCPF')}
                                    className={errors.accountCPF ? 'error' : ''}
                                />
                                {errors.accountCPF && <p className='error-p'>{errors.accountCPF.message}</p>}
                            </div>
                        </div>

                        <div className='client-info'>
                            {/* Código do Banco */}
                            <div className="input">
                                <label htmlFor="accountCode">Código do Banco </label>
                                <input type="text"
                                    {...register('accountCode', {
                                        pattern: { value: /^[0-9]*$/, message: 'Apenas números são permitidos.' }
                                    })}
                                    className={errors.accountCode ? 'error' : ''}
                                />
                                {errors.accountCode && <p className='error-p'>{errors.accountCode.message}</p>}
                            </div>

                            {/* Agência */}
                            <div className="input">
                                <label htmlFor="agencyNumber">Agência</label>
                                <input
                                    type="text"
                                    {...register('agencyNumber', {
                                        pattern: { value: /^[0-9]*$/, message: 'Apenas números são permitidos.' },
                                        maxLength: { value: 9, message: 'Apenas 9 números são permitidos.' }
                                    })}
                                    className={errors.agencyNumber ? 'error' : ''}
                                />
                                {errors.agencyNumber && <p className='error-p'>{errors.agencyNumber.message}</p>}
                            </div>

                            {/* Número da Conta */}
                            <div className="input">
                                <label htmlFor="accountNumber">Número da Conta</label>
                                <input
                                    type="text"
                                    {...register('accountNumber', {
                                        pattern: { value: /^[0-9]*$/, message: 'Apenas números são permitidos.' }
                                    })}
                                    className={errors.accountNumber ? 'error' : ''}
                                />
                                {errors.accountNumber && <p className='error-p'>{errors.accountNumber.message}</p>}
                            </div>
                        </div>                       



                        <h3>Cartão de Crédito</h3>
                        <hr className="divider" />

                        <div className='client-info' style={{ marginTop: '3%' }}>
                            {/* Nome no Cartão */}
                            <div className="input">
                                <label htmlFor="cardName">Nome no Cartão</label>
                                <input style={{ width: '100%' }} type="text"
                                    {...register('cardName')}
                                    className={errors.cardName ? 'error' : ''}
                                />
                                {errors.cardName && <p className='error-p'>{errors.cardName.message}</p>}
                            </div>

                            {/* Número do Cartão */}
                            <div className="input">
                                <label htmlFor="cardNumber">Número do Cartão</label>
                                <input style={{ width: '100%' }}
                                    type="text"
                                    {...register('cardNumber', {
                                        minLength: { value: 14, message: 'Informação incompleta.' }
                                    })}
                                    className={errors.cardNumber ? 'error' : ''}
                                />
                                {errors.cardNumber && <p className='error-p'>{errors.cardNumber.message}</p>}
                            </div>
                        </div>

                        <div className='client-info' style={{ marginTop: '3%' }}>
                            {/* Data de Validade */}
                            <div className="input">
                                <label htmlFor="cardExpireDate">Validade</label>
                                <input style={{ width: '100%' }} type="text"
                                    {...register('cardExpireDate')}
                                    className={errors.cardExpireDate ? 'error' : ''}
                                />
                                {errors.cardExpireDate && <p className='error-p'>{errors.cardExpireDate.message}</p>}
                            </div>

                            {/* CVV */}
                            <div className="input">
                                <label htmlFor="cardCVV">CVV</label>
                                <input style={{ width: '100%' }}
                                    type="text"
                                    {...register('cardCVV', {
                                        maxLength: { value: 3, message: 'Apenas são permitidos 3 números.' },
                                        pattern: { value: /^[0-9]*$/, message: 'Apenas números são permitidos.' }
                                    })}
                                    className={errors.cardCVV ? 'error' : ''}
                                />
                                {errors.cardCVV && <p className='error-p'>{errors.cardCVV.message}</p>}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10%', justifyContent: 'center' }}>
                            <button className="submit-button1" style={{ marginTop: '20px', height: '40px', width: '280px', borderRadius: '10px' }}>Salvar Alterações</button>
                            <button className="submit-button2" style={{ marginTop: '20px', height: '40px', width: '280px', borderRadius: '10px' }} type="button" >Excluir Conta</button>
                        </div>
                    </form>
                </div>
            </div>
            <img src={Footer} alt="footer"/>
        </div>
    )
}

export default MyAccount;
