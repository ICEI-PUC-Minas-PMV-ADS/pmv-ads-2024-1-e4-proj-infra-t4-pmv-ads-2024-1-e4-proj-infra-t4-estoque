import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = "http://localhost:5173";

export async function enviarFeedback(body) {
  try {
    const token = Cookies.get("token");
    const usuarioId = Cookies.get("usuarioId");
    const response = await axios.post(`${baseURL}/EnviarFeedBack`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Usuario-Id': usuarioId,
      },
    });
    console.log("Feedback enviado com sucesso:", response.data);
    return response;
  } catch (error) {
    console.error("Erro ao enviar feedback:", error);
    throw error;
  }
}
