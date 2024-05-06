import axios from 'axios'
import Cookies from 'js-cookie'

const baseURL = "http://localhost:5173"

export function getAllProdutos(body) {
    try {
  
      const response = axios.post(`${baseURL}/api/Produtos/${Cookies.get("usuarioId")}`, body, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return response;
      
    } catch (error) {
      console.log(error)
    }
  }