import axios from 'axios'
import Cookies from 'js-cookie'

const baseURL = "http://localhost:5020"

export function createFornecedor(body) {
    try {
  
      const response = axios.post(`${baseURL}/addFornecedor/${Cookies.get("usuarioId")}`, body, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return response;
      
    } catch (error) {
      console.log(error)
    }
   
  }