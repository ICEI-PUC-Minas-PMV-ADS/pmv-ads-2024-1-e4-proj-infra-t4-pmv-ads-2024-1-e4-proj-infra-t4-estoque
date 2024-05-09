import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ContainerFornecedor, ContainerHeaderFornecedor, ContainerButton, ContainerForm } from "./EditFornecedorStyled";
import { Button } from "../../../components/Button/Button";
import Header from "../../../components/Header/Header";

export default function EditFornecedor() {
  const { id } = useParams();
  const [data] = useState([]);
  const userId =    localStorage.getItem('userId', data.userId);
  const navigate = useNavigate(); // Obtendo a função navigate
  const [formData, setFormData] = useState({
    codigoFornecedor: "",
    nome: "",
    email: "",
    cnpjCpf: "",
  });

  useEffect(() => {
    const fetchFornecedorData = async () => {
      try {
        const response = await axios.get(`https://localhost:44398/api/Fornecedores/${id}`);
        const fornecedorData = response.data;
        setFormData(fornecedorData);
      } catch (error) {
        console.error("Erro ao buscar dados do fornecedor:", error);
      }
    };

    fetchFornecedorData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:44398/api/Fornecedores/${id}`, formData);
      navigate(`/fornecedores/${userId}`); // Navegando para a página de fornecedores após salvar
    } catch (error) {
      console.error("Erro ao editar fornecedor:", error);
    }
  };

  return (
    <>
    <Header/>
    <ContainerFornecedor>
      <ContainerHeaderFornecedor>
        <h2 style={{ fontSize:"40px"}}>Editar Fornecedor</h2>
      </ContainerHeaderFornecedor>
      <ContainerForm>
        <h6>Informação Básica</h6>
        <form onSubmit={handleSubmit}>
       
          <div>
            <label>Nome: </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
             
            />
          </div>
          <div>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
             
            />
          </div>
          <div>
            <label>CNPJ/CPF: </label>
            <input
              type="text"
              name="cnpjCpf"
              value={formData.cnpjCpf}
              onChange={handleChange}
           
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
