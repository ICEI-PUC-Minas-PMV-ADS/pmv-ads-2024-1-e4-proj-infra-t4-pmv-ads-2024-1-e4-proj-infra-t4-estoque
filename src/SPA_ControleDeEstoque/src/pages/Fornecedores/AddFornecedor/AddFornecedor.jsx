import axios from "axios";
import {
  ContainerFornecedor,
  ContainerHeaderFornecedor,
  ContainerButton,
  ContainerForm,
} from "./AddFornecedorStyled";
import { useState } from "react";
import { Button } from "../../../components/Button/Button";

export default function AddFornecedor() {
  const [formData, setFormData] = useState({
    codigoFornecedor: "",
    nome: "",
    email: "",
    cnpjCpf: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5020/api/Fornecedores", formData);
      // Adicionou com sucesso, você pode redirecionar para a página de fornecedores ou exibir uma mensagem de sucesso
      console.log("Fornecedor adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar fornecedor:", error);
    }
  };

  return (
    <ContainerFornecedor>
      <ContainerHeaderFornecedor>
              <h2 style={{ fontSize:"40px"}}>Novo Fornecedor</h2>
      </ContainerHeaderFornecedor>

      <ContainerForm>
        <h6>Informação Básica</h6>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Código do Fornecedor: </label>
            <input
              type="text"
              name="codigoFornecedor"
              value={formData.codigoFornecedor}
              onChange={handleChange}
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
  );
}
