import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { useForm } from 'react-hook-form';
import SemCapa from '../../assets/SemCapa.jpg';
import Footer from '../../assets/Footer.jpg';
import httpCliente from '../../services/httpCliente';
import './EditBook.css';
import { useParams } from 'react-router-dom';
import { deleteBook } from '../../services/books/deleteBook.js';
import { bookUpdate } from '../../services/books/bookUpdate.js';
import { useUserContext } from '../../Context/UserContext.jsx';

export const EditBook = () => {
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm({ mode: 'onChange' });
    const [stateButton, setStateButton] = useState('Novo');
    const {id} = useParams('id');
    const [book, setBook] = useState({});
    const [flag, setFlag] = useState('');
    const {userData} = useUserContext();
    
    // Fetch book data from API
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await httpCliente.get(`http://127.0.0.1:5000/buscarlivro/${id}`);
                console.log(response);
                setBook(response.data.livros[0]);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchBook();
    }, [id]);

    

    // Initialize form fields with book data
    useEffect(() => {
        if (book) {
            setValue("descricaoLivro", book.descricaoLivro);
            setValue("editoraLivro", book.editoraLivro);
            setValue("estadoLivro", book.estadoLivro);
            setValue("estoqueLivro", book.estoqueLivro);
            setValue("generoLivro", book.generoLivro);
            setValue("idLivro", book.idLivro);
            setValue("idVendedor", book.idVendedor);
            setValue("isbn", book.isbn);
            setValue("linkImagem", book.linkImagem);
            setValue("nomeAutor", book.nomeAutor);
            setValue("nomeLivro", book.nomeLivro);
            setValue("nomeVendedor", book.nomeVendedor);
            setValue("precoLivro", book.precoLivro);
        }
    }, [book, setValue]);

    // Handle form submission
    const onSubmit = (data, event) => {
        data.precoLivro = parseFloat(data.precoLivro);
        data.estoqueLivro = parseInt(data.estoqueLivro);
        data.estadoLivro = stateButton;
        console.log(data);

        if (flag == 'save') {
            // Botão "Salvar Alterações" foi clicado
            saveUpdates(data);
        } else if (flag == 'delete') {      
            // Botão "Excluir Conta" foi clicado
            deleteAccount(data);
        } else {
            console.error('Botão não identificado');
        }
    };


    const saveUpdates = async (data) => {

        console.log(data);

        const response = await bookUpdate({...data, email: userData.email});
        if (response.code === 200) {
            

            alert('Livro atualizado com sucesso!')
        } else {
            console.log(response)
        }
    }

    const deleteAccount = async (data) => {
        const response = await deleteBook({...data, email: userData.email});
        if (response.code === 200) {
            navigate('/')
            alert('Livro deletado com sucesso!')
        } else {
            console.log(response)
        }
    }

    // Handle button state change
    const stateHandleClick = (button) => {
        setStateButton(button);
    };

    // Update link image
    const handleImgLinkChange = (e) => {
        setValue('linkImagem', e.target.value);
    };

    // Format ISBN
    const handleIsbnChange = (e) => {
        const { value } = e.target;
        const formattedValue = formatIsbn(value);
        setValue('isbn', formattedValue, { shouldValidate: true });
    };

    const formatIsbn = (value) => {
        const cleanValue = value.replace(/\D/g, '');
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
        <div className="editBook-container">
            <NavBar />
            <div className="editBook-content">
                <div className="img-preview">
                    {!book.linkImagem && <img src={SemCapa} alt="Book Preview" style={{ width: '100%', height: '100%', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px', maxWidth: '333.4px' }} />}
                    {book.linkImagem && <img src={book.linkImagem} alt="Book Preview" style={{ height: '100%', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px', maxWidth: '333.4px' }} />}
                </div>

                <div className="form-inputs">
                    <div className="inputs-category">
                        <h3>Informações do produto</h3>
                        <p>Por favor, preencha os campos abaixo com as informações precisas do livro. Certifique-se de inserir os dados corretamente.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>             
                        {/* Link da Imagem */}
                        <div className="input" style={{ width: '100%', marginTop: '14px' }}>
                            <label htmlFor="linkImagem">Link da Imagem</label>
                            <input type="url"
                                {...register('linkImagem', { 
                                    required: 'Este campo é obrigatório.',
                                    onChange: handleImgLinkChange // Atualiza o link da imagem quando o valor muda
                                })}  
                                className={errors.linkImagem ? 'error' : ''}
                            />
                            {errors.linkImagem && <p className='error-p'>{errors.linkImagem.message}</p>}
                        </div>

                        {/* Nome do Livro */}
                        <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'space-between', gap: '30px' }}> {/*Primeira row*/}
                            <div className="input" style={{ width: '280px' }}>
                                <label htmlFor="nomeLivro">Nome do Livro</label>
                                <input type="text" 
                                    {...register('nomeLivro', { 
                                        required: 'Este campo é obrigatório.',
                                    })}  
                                    className={errors.nomeLivro ? 'error' : ''}
                                />
                                {errors.nomeLivro && <p className='error-p'>{errors.nomeLivro.message}</p>}
                            </div>

                            {/* Nome do Autor */}
                            <div className="input" style={{ width: '280px' }}>
                                <label htmlFor="nomeAutor">Nome do Autor</label>
                                <input type="text" 
                                    {...register('nomeAutor', { 
                                        required: 'Este campo é obrigatório.',
                                    })}  
                                    className={errors.nomeAutor ? 'error' : ''}
                                />
                                {errors.nomeAutor && <p className='error-p'>{errors.nomeAutor.message}</p>}
                            </div>
                        </div>
                                
                        <div style={{ marginTop: '70px', justifyContent: 'space-between', display: 'flex', gap: '30px' }}> {/*Segunda row*/}
                            {/* ISBN */}
                            <div className="input" style={{ width: '280px' }}>
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

                            {/* Editora */}
                            <div className="input" style={{ width: '280px' }}>
                                <label htmlFor="editoraLivro">Editora</label>
                                <input type="text" 
                                    {...register('editoraLivro', { 
                                        required: 'Este campo é obrigatório.',
                                    })}  
                                    className={errors.editoraLivro ? 'error' : ''}
                                />
                                {errors.editoraLivro && <p className='error-p'>{errors.editoraLivro.message}</p>}
                            </div>
                        </div>

                        <div style={{ marginTop: '64px', display: 'flex', gap: '30px' }}> {/*Terceira row*/}
                            {/* Gênero */}
                            <div style={{ width: '280px', marginTop: '16px' }}>
                                <select className={`input-select ${errors.generoLivro ? 'error' : ''}`} {...register('generoLivro', { required: 'Selecione um gênero.' })}>
                                    <option value="">Selecione um gênero</option>
                                    <option value="romance">Romance</option>
                                    <option value="terror">Terror</option>
                                    <option value="aventura">Aventura</option>
                                </select>
                                {errors.generoLivro && <p className="error-p">{errors.generoLivro.message}</p>}
                            </div>
                                    
                            {/* Botões */}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <p style={{ marginBottom: '12px', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#504f4f', marginLeft: '8px' }}>Selecione um estado:</p>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                                    <button type="button" onClick={() => stateHandleClick('Novo')}
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

                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '30px', marginTop: '20px' }}> {/*Quarta row*/}
                            {/* Preço */}
                            <div className="input" style={{ width: '280px' }}>
                                <label htmlFor="precoLivro">Preço</label>
                                <input type="number" step="0.01"
                                    {...register('precoLivro', { 
                                        required: 'Este campo é obrigatório.',
                                        min: { value: 0, message: 'O preço não pode ser negativo.' }
                                    })}  
                                    className={errors.precoLivro ? 'error' : ''}
                                />
                                {errors.precoLivro && <p className='error-p'>{errors.precoLivro.message}</p>}
                            </div>
                                
                            {/* Estoque */}
                            <div className="input" style={{ width: '280px' }}>
                                <label htmlFor="estoqueLivro">Estoque</label>
                                <input type="number"
                                    {...register('estoqueLivro', { 
                                        required: 'Este campo é obrigatório.',
                                        min: { value: 0, message: 'O estoque não pode ser negativo.' }
                                    })}  
                                    className={errors.estoqueLivro ? 'error' : ''}
                                />
                                {errors.estoqueLivro && <p className='error-p'>{errors.estoqueLivro.message}</p>}
                            </div>
                        </div>
                        
                        {/* Descrição */}
                        <div className="input" style={{ height: '130px', marginTop: '70px' }}>
                            <label htmlFor="descricaoLivro">Descrição</label>
                            <textarea style={{ height: '180px', padding: '28px 10px 10px', fontSize: '16px', fontFamily: 'Inter, sans-serif' }}
                                {...register('descricaoLivro', {
                                required: 'Este campo é obrigatório.',
                                })}
                                className={errors.descricaoLivro ? 'error' : ''}
                                rows="4"
                            />
                            {errors.descricaoLivro && <p className='error-p'>{errors.descricaoLivro.message}</p>}
                        </div>
                        
                        <div style={{ display: 'flex', gap: '10%', justifyContent: 'center' }}>
                            <button className="submit-button1" style={{ marginTop: '20px', height: '40px', width: '240px', borderRadius: '10px' }} name='save' type='submit' onClick={() => setFlag('save')}>Salvar Alterações</button>
                            <button className="submit-button2" style={{ marginTop: '20px', height: '40px', width: '240px', borderRadius: '10px' }} name='delete' type="submit" onClick={() => setFlag('delete')}>Excluir Livro</button>
                        </div>
                        
                    </form>
                </div>
            </div>
            <img src={Footer} alt="footer"/>
        </div>
    )
}

export default EditBook;
