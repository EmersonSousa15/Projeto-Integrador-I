import httpCliente from "../httpCliente";

export const userRegister = async (userData) => {
    // Implementar a chamada para o backend para registrar o usuário
    console.log(userData);
    try {
        const response = httpCliente.post('http://127.0.0.1:5000/register', {
            ...userData,
        });

        const data = (await response).data;

        
    } catch (error) {
        console.error('Error:', error.response?.data?.message || error.message);
    }
};