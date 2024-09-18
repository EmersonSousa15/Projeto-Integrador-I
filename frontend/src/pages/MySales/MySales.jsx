import React, { useState, useEffect } from "react";
import './MySales.css';
import NavBar from "../../components/NavBar/NavBar";
import Icon from "../../assets/vendas.jpg";
import Toggle from "../../assets/toggle.jpg";
import Footer from "../../assets/Footer.jpg";
import { useForm } from 'react-hook-form';
import { useUserContext } from "../../Context/UserContext";
import { getSales } from "../../services/sales/getSales";

const MySales = () => {
    const [openItems, setOpenItems] = useState([]);
    const { register, handleSubmit } = useForm();
    const [filteredDates, setFilteredDates] = useState([]);
    const { userData } = useUserContext();
    const [items, setItems] = useState([]);

    // Função para converter data no formato dd/MM/yyyy para um objeto Date
    const convertStringToDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    // Função que será chamada ao submeter o formulário
    const onSubmit = (data) => {
        const start = new Date(data.startDate); // Data inicial do input
        const end = new Date(data.endDate); // Data final do input

        const filtered = items.filter((item) => {
            const saleDate = convertStringToDate(item.data); // Converter a data da venda para objeto Date
            return saleDate >= start && saleDate <= end;
        });

        setFilteredDates(filtered);
    };

    useEffect(() => {
        const fetchSales = async () => {
            const response = await getSales(userData.email);
            console.log(response);
            
            if (response) {
                setItems(response.vendas);
            } else {
                setItems([]); // Define um array vazio se não houver vendas
            }
        };

        fetchSales();
    }, [userData.email]);

    const toggleOpen = (index) => {
        if (openItems.includes(index)) {
            setOpenItems(openItems.filter(item => item !== index));
        } else {
            setOpenItems([...openItems, index]);
        }
    };

    const displayedItems = filteredDates.length > 0 ? filteredDates : items;

    return (
        <div className="mysales-container">
            <NavBar />
            <div className="mysales-content">
                <div className="mysales-title">
                    <img src={Icon} alt="icon" style={{ width: '34px' }} />
                    Minhas Vendas
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>De:</label>
                    <input type="date" {...register('startDate', { required: true })} />
                    
                    <label>Até:</label>
                    <input type="date" {...register('endDate', { required: true })} />
                    
                    <button type="submit">Filtrar</button>
                </form>
                <div className="mysales-columns">
                    <div className="mysales-header-content">
                        <span>ID da venda</span>
                        <span style={{ marginLeft: '50px' }}>Data</span>
                        <span style={{ marginLeft: '70px' }}>Informações do cliente</span>
                        <span style={{ marginLeft: '14px' }}>Pagamento</span>
                        <span style={{ marginLeft: '28px' }}>Rastreamento</span>
                        <span style={{ marginLeft: '14px' }}>Lucro</span>
                    </div>
                </div>
                {displayedItems.map((item, index) => (
                    <div className={`mysales-items ${openItems.includes(index) ? 'open' : ''}`} key={item.id}>
                        <div className="mysales-information">
                            <div className="mysales-information-content">
                                <p>#{item.id}</p>
                                <div style={{ margin: 'auto' }}>
                                    <p>{item.data}</p>
                                    <p>{item.hora}</p>
                                </div>
                                <div>
                                    <p>{item.nomeCliente}</p>
                                    <p>{item.email}</p>
                                    <p>{item.telefone}</p>
                                </div>
                                <p style={{ color: '#069C56', fontStyle: 'italic' }}>Efetuado</p>
                                <p style={{ marginLeft: '54px' }}>AA12345786BR</p>
                                <p style={{ color: '#069C56' }}>R$ {item.livros.reduce((count, livro) => count + parseFloat(livro.price), 0).toFixed(2)}</p>
                            </div>
                            <img
                                src={Toggle}
                                alt="toggle"
                                style={{ width: '20px', height: '20px', margin: 'auto' }}
                                className={openItems.includes(index) ? 'rotated' : ''}
                                onClick={() => toggleOpen(index)}
                            />
                        </div>
                        <div className={`mysales-details ${openItems.includes(index) ? 'open' : ''}`}>
                            {item.livros.map((livro, livroIndex) => (
                                <div key={livroIndex} className="mysales-products">
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                        <img
                                            src={livro.image}
                                            alt="Book Preview"
                                            style={{ width: '66px', height: '86px', borderRadius: '6px', cursor: 'pointer' }}
                                        />
                                        <div style={{ margin: 'auto' }}>
                                            <p style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '14px', width: '170px' }}>{livro.title}</p>
                                            <p style={{ color: 'gray', marginTop: '6px', fontSize: '12px' }}>{livro.author}</p>
                                            <p style={{ color: 'green', marginTop: '6px', fontSize: '12px' }}>R$ {livro.price}</p>
                                            <p style={{ marginTop: '6px', fontSize: '12px' }}>Qtde: {livro.quantidade}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <img src={Footer} alt="footer" />
        </div>
    );
};

export default MySales;
