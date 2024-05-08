import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = "http://localhost:5173";

export async function getProdutoId() {
    try {
  
        const response = axios.post(`${baseURL}/AddProduto/${Cookies.get("usuarioId")}`, body, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        return response;
        
      } catch (error) {
        console.log(error)
      }
     
    }