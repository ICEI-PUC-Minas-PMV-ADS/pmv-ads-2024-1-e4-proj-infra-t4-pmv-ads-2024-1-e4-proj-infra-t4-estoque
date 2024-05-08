import axios from 'axios'
import Cookies from 'js-cookie'

const baseURL = "http://localhost:5173"

export function getProdutosUsers(body) {
  try {
  
    const response = axios.post(`${baseURL}/home/${Cookies.get("usuarioId")}`, body, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response;
    
  } catch (error) {
    console.log(error)
  }
 
}
