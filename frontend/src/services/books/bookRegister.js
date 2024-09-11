import httpCliente from "../httpCliente";


export const bookRegister = async (book) => {
    
    try {
        const response = await httpCliente.post('http://127.0.0.1:5000/cadastrarlivro', {
            ...book,
        });

        console.log(response);

        if(response.status === 200){
            return response.status
        }
 
    } catch (error) {
        if (error.response?.status === 409) {
            return({message: error.response?.data?.message, code: error.response?.data?.code})
        }else{
            console.error(error.message);
        }
    }
};