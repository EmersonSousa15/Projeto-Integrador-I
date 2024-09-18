import httpCliente from "../httpCliente";


export const getSales = async (email) => {
    
    try {
        const response = await httpCliente.post('http://127.0.0.1:5000/listarvendas',{
            email
        });

        return response.data;
 
    } catch (error) {
        if (error.response?.status === 409) {
            return({message: error.response?.data?.message, code: error.response?.data?.code})
        }else{
            console.error(error.message);
        }
    }
};