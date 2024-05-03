import axios from "axios"


const baseURL = "http://localhost:5020"

export function getFornecedores() {
    try {
        const response = axios.get(`${baseURL}/api/Fornecedores/`)
        return response
    } catch (error) {
        console.log(error);
    }
}