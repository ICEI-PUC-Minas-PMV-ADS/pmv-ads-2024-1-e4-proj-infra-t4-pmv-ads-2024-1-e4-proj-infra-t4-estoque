import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = "http://localhost:5173";

export async function getFornecedores() {
    try {
        const response = await axios.get(`${baseURL}/api/Fornecedores/usuarioIdFornecedores?usuarioId=${Cookies.get("usuarioId")}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
        throw error; 
    }
}
