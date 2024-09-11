import httpCliente from "../httpCliente";


export const getBooks = async () => {
    
    try {
        const response = await httpCliente.get('http://127.0.0.1:5000/mostrarlivros');

        return response.data.data;
 
    } catch (error) {
        if (error.response?.status === 409) {
            return({message: error.response?.data?.message, code: error.response?.data?.code})
        }else{
            console.error(error.message);
        }
    }
};