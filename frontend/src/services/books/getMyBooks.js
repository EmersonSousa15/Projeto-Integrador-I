import httpCliente from "../httpCliente";


export const getMyBooks = async (data) => {

    try {
        const response = await httpCliente.post('http://127.0.0.1:5000/pegarlivro', {
            ...data
        })


        console.log(response);
        
        return{data: response.data.livros, code: response.status};
 
    } catch (error) {
        if (error.response?.status === 409) {
            return({message: error.response?.data?.message, code: error.response?.data?.code})
        }else{
            console.error(error.message);
        }
    }
};