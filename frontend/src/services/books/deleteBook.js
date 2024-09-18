import httpCliente from '../httpCliente';

export const deleteBook = async (data) => {
    try {

        console.log(data);
        
        const response = await httpCliente.post('http://127.0.0.1:5000/apagarlivro', {
            ...data
        })

        console.log(response);
        
        

        return { message: response.data.message, code: response.status, data: response.data}

    } catch (error) {
        if (error.response) {
            return { message: error.response.data.error, code: error.response.status }

        }
    }
}
