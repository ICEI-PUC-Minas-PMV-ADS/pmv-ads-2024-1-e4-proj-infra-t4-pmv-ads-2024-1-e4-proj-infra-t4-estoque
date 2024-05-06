import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = "http://localhost:5173";

export function getDadosUsuario() {
  try {
    const response = axios.get(`${baseURL}/api/Auth/usuarioIdDados?usuarioId=${Cookies.get("usuarioId")}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export function updateDadosUsuario(nome, email, cnpj, newPassword) {
  try {
    const body = {
      newUserName: nome,
      newEmail: email,
      newCnpj: cnpj,
      newPassword: newPassword
    };

    const response = axios.put(`${baseURL}/api/Auth/editUsuario/${Cookies.get("usuarioId")}`, body, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
