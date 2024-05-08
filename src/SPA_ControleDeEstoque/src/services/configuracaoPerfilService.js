import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = "http://localhost:5173";

export function getConfiguracaoPerfilUser(body) {
  try {

    const response = axios.post(`${baseURL}/ConfiguracaoPerfil/${Cookies.get("usuarioId")}`, body, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response;

  } catch (error) {
    console.log(error)
  }
}
