import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ContainerFornecedor,
  ContainerHeaderFornecedor,
  ContainerButton,
  ContainerForm,
} from "./AddFornecedorStyled";
import { Button } from "../../../components/Button/Button";
import Header from "../../../components/Header/Header";

const getUserIdFromLocalStorage = () => {
  return localStorage.getItem("userId") || "";
};

export default function AddFornecedor() {
  const navigate = useNavigate();
  const [data] = useState([]);
  const userId =    localStorage.getItem('userId', data.userId);
  const [formData, setFormData] = useState({
    codigoFornecedor: "",
    nome: "",
    email: "",
    cnpjCpf: "",
    usuarioId: getUserIdFromLocalStorage() // Obtém userId do localStorage ao definir o estado inicial
  });

  const generateFornecedorCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nome" || name === "email" || name === "cnpjCpf") {
      const codigoFornecedor = generateFornecedorCode();
      setFormData({ ...formData, [name]: value, codigoFornecedor: codigoFornecedor });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://localhost:44398/api/Fornecedores/`, formData);
     
      navigate(`/fornecedores/${userId}`);
    } catch (error) {
      console.error("Erro ao adicionar fornecedor:", error);
    }
  };

  return (
    <>
      <Header />
      <ContainerFornecedor>
        <ContainerHeaderFornecedor>
          <h2 style={{ fontSize: "40px" }}>Novo Fornecedor</h2>
        </ContainerHeaderFornecedor>

        <ContainerForm>
          <h6>Informação Básica</h6>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "none" }}>
              <label>Código do Fornecedor: </label>
              <input
                type="text"
                name="codigoFornecedor"
                value={formData.codigoFornecedor}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div>
              <label>Nome: <span>*</span></label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email: <span>*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>CNPJ/CPF: <span>*</span></label>
              <input
                type="text"
                name="cnpjCpf"
                value={formData.cnpjCpf}
                onChange={handleChange}
                required
              />
            </div>
            <ContainerButton>
              <Button text="Salvar" type="submit"></Button>
            </ContainerButton>
          </form>
        </ContainerForm>
      </ContainerFornecedor>
    </>
  );
}
