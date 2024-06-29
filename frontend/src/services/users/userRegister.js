import httpCliente from "../httpCliente";


export const userRegister = async (userData, setChangePage) => {
    // Implementar a chamada para o backend para registrar o usuário

    try {
        const response = await httpCliente.post('http://127.0.0.1:5000/register', {
            ...userData,
        });
        console.log(response);

        if(response.status === 200){
            return response.status
        }
 
    } catch (error) {
        if (error.response?.status === 409) {
            if(error.response?.data?.code === "EMAIL_ALREADY_EXISTS") {
                setChangePage(true)
                return([error.response?.data?.message, error.response?.data?.code, "email"])

            }else if(error.response?.data?.code === "CPF_ALREADY_EXISTS") {
                return([error.response?.data?.message, error.response?.data?.code, "cpf"])

            }else if(error.response?.data?.code === "CNPJ_ALREADY_EXISTS") {
                return([error.response?.data?.message,error.response?.data?.code, "cnpj"])
            }
        }
    }
};