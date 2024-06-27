import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './AddBook.css'
// React Form
import { useForm, Controller } from 'react-hook-form';

const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm({mode: 'onChange'});
    const [ stateButton, setStateButton ] = useState('Novo');
    const [imgLink, setImgLink] = useState(''); // Estado para armazenar o link da imagem

    /* Envia os dados do formulário */
    const onSubmit = (data) => {
        data.price = parseFloat(data.price);
        data.inventory = parseInt(data.inventory);
        data.state = stateButton;
        console.log(data);
    };

    const stateHandleClick = (button) => {
        setStateButton(button);
    };

    // Função para atualizar o link da imagem
    const handleImgLinkChange = (e) => {
        setImgLink(e.target.value);
    };

    // Funções para formatação do ISBN
    const handleIsbnChange = (e) => {
        const { value } = e.target;
        const formattedValue = formatIsbn(value);
        setValue('isbn', formattedValue, { shouldValidate: true });
    };

    const formatIsbn = (value) => {
        // Remove non-numeric characters
        const cleanValue = value.replace(/\D/g, '');
        // Format ISBN with dashes
        const formattedValue = cleanValue
            .slice(0, 13)
            .replace(/(\d{3})(\d{0,2})(\d{0,5})(\d{0,2})(\d{0,1})/, (match, p1, p2, p3, p4, p5) => {
                let result = '';
                if (p1) result += p1;
                if (p2) result += '-' + p2;
                if (p3) result += '-' + p3;
                if (p4) result += '-' + p4;
                if (p5) result += '-' + p5;
                return result;
            });
        return formattedValue;
    };

    return (
        <div className="addBook-container">
            <NavBar />
            <div className="addBook-content">
                <form style={{ display:'flex', flexDirection:'column' }} onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ display:'flex', flexDirection:'row' }}>
                        <div className="img-preview">
                            <div className="img-upload">
                                {imgLink && <img src={imgLink} alt="Book Preview" style={{ width: '100%', height: '100%'}} />}
                            </div>

                            {/* Link da Imagem */}
                            <div className="input" style={{width:'280px', marginTop:'14px'}}>
                                <label htmlFor="linkImg">Link da Imagem</label>
                                <input type="url"
                                    {...register('linkImg', { 
                                        required: 'Este campo é obrigatório.',
                                        onChange: handleImgLinkChange // Atualiza o link da imagem quando o valor muda
                                    })}  
                                    className={errors.linkImg? 'error' : ''}
                                />
                                {errors.linkImg && <p className='error-p'>{errors.linkImg.message}</p>}
                            </div>

                        </div>
                        <div className="form-inputs">
                            <div className="inputs-category" style={{marginTop:'38px'}}>
                                <h3>Informações do produto</h3>
                                <p>Por favor, preencha os campos abaixo com as informações precisas do livro. Certifique-se de inserir os dados corretamente.</p>
                            </div>

                            {/* Nome do Livro */}
                            <div style={{marginTop:'20px', display: 'flex', gap:'30px'}}> {/*Primeira row*/}
                                <div className="input" style={{width:'280px'}}>
                                    <label htmlFor="bookName">Nome do Livro</label>
                                    <input type="name" 
                                        {...register('bookName', { 
                                            required: 'Este campo é obrigatório.',
                                        })}  
                                        className={errors.bookName ? 'error' : ''}
                                    />
                                    {errors.bookName && <p className='error-p'>{errors.bookName.message}</p>}
                                </div>

                                {/* Nome do Autor */}
                                <div className="input" style={{width:'280px'}}>
                                    <label htmlFor="authorName">Nome do Autor</label>
                                    <input type="name" 
                                        {...register('authorName', { 
                                            required: 'Este campo é obrigatório.',
                                        })}  
                                        className={errors.authorName ? 'error' : ''}
                                    />
                                    {errors.authorName && <p className='error-p'>{errors.authorName.message}</p>}
                                </div>

                            </div>
                            
                            <div style={{marginTop:'70px', display: 'flex', gap:'30px'}}> {/*Segunda row*/}
                                {/* ISBN */}
                                <div className="input" style={{width:'280px'}}>
                                    <label htmlFor="isbn">ISBN</label>
                                    <input
                                        {...register('isbn', { 
                                            required: 'Este campo é obrigatório.',
                                            minLength: { value: 17, message: 'Número de ISBN incompleto.' }
                                        })}
                                        type="text"
                                        onChange={handleIsbnChange}
                                        className={errors.isbn ? 'error' : ''}
                                    />
                                    {errors.isbn && <p className="error-p">{errors.isbn.message}</p>}
                                </div>

                                {/* Editora*/}
                                <div className="input" style={{width:'280px'}}>
                                    <label htmlFor="publisher">Editora</label>
                                    <input type="name" 
                                        {...register('publisher', { 
                                            required: 'Este campo é obrigatório.',
                                        })}  
                                        className={errors.publisher ? 'error' : ''}
                                    />
                                    {errors.publisher && <p className='error-p'>{errors.publisher.message}</p>}
                                </div>

                            </div>

                            <div style={{marginTop:'64px', display: 'flex', gap:'30px'}}> {/*Terceira row*/}
                                {/* Gênero */}
                                <div style={{ width: '280px', marginTop:'16px' }}>
                                    <select className={`input-select ${errors.genre ? 'error' : ''}`} {...register('genre', { required: 'Selecione um gênero.' })}>
                                        <option value="">Selecione um gênero</option>
                                        <option value="romance">Romance</option>
                                        <option value="terror">Terror</option>
                                        <option value="aventura">Aventura</option>
                                    </select>
                                    {errors.genre && <p className="error-p">{errors.genre.message}</p>}
                                </div>
                                
                                {/*Botões */}
                                <div style={{ display:'flex', flexDirection:'column' }}>
                                    <p style={{ marginBottom:'12px', fontFamily:'Inter, sans-serif' , fontSize: '12px', color: '#504f4f', marginLeft:'8px' }}>Selecione um estado:</p>
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center'}}>
                                        <button type="button" onClick={() =>  stateHandleClick('Novo')}
                                            style={{
                                                border: '1px solid',
                                                borderColor: '#069C56',
                                                width: '100px',
                                                color: stateButton === 'Novo' ? 'white' : '#069C56',
                                                backgroundColor: stateButton === 'Novo' ? '#069C56' : 'white',
                                                fontSize: '14px',
                                                marginLeft: '8px'
                                            }}>
                                            Novo
                                        </button>
                                        <button type="button" onClick={() => stateHandleClick('Usado')}
                                            style={{
                                                border: '1px solid',
                                                borderColor: '#069C56',
                                                width: '100px',
                                                color: stateButton === 'Usado' ? 'white' : '#069C56',
                                                backgroundColor: stateButton === 'Usado' ? '#069C56' : 'white',
                                                fontSize: '14px',
                    
                                            }}>
                                        Usado
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div style={{marginTop:'432px', display: 'flex', gap:'30px', position: 'absolute'}}> {/*Quarta row*/}
                                {/* Preço */}
                                <div className="input" style={{width:'280px'}}>
                                    <label htmlFor="price">Preço</label>
                                    <input type="number"  step="0.01"
                                        {...register('price', { 
                                            required: 'Este campo é obrigatório.',
                                            min: { value: 0, message: 'O preço não pode ser negativo.' }
                                        })}  
                                        className={errors.price ? 'error' : ''}
                                    />
                                    {errors.price && <p className='error-p'>{errors.price.message}</p>}
                                </div>
                            
                                {/* Estoque */}
                                <div className="input" style={{width:'280px'}}>
                                    <label htmlFor="inventory">Estoque</label>
                                    <input type="number"
                                        {...register('inventory', { 
                                            required: 'Este campo é obrigatório.',
                                            min: { value: 0, message: 'O preço não pode ser negativo.' }
                                        })}  
                                        className={errors.inventory? 'error' : ''}
                                    />
                                    {errors.inventory && <p className='error-p'>{errors.inventory.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Descrição */}
                    <div className="input" style={{ display:'flex', flexDirection:'column', width:'920px', height:'130px', marginTop: '50px', marginLeft:'30px'}}>
                        <label htmlFor="description">Descrição</label>
                        <textarea style={{ height:'180px', padding:'28px 10px 10px', fontSize: '16px', fontFamily: 'Inter, sans-serif' }}
                            {...register('description', {
                               required: 'Este campo é obrigatório.',
                            })}
                            className={errors.description ? 'error' : ''}
                             rows="4"
                        />
                        {errors.description && <p className='error-p'>{errors.description.message}</p>}
                    </div>

                    <button className="submit-button" style={{marginTop: '40px'}}>Cadastrar Livro</button>
                </form>
            </div>
        </div>
    );
}

export default AddBook;
