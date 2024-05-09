import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { Button } from "../../../components/Button/Button";
import { useParams } from 'react-router-dom';
import {
  ContainerProduto,
  ContainerButton,
  ContainerForm,
  LeftTitle,
  FormItem,
  Label,
  FormItemMenores,
  LabelMenor,
  TextAreaDescricao,
  InputMenor,
  FormItemCategoriaEstado,
  Note,
  Select,
  Input
} from "./EditProdutoStyled";
import Header from "../../../components/Header/Header";

export default function EditProduto() {
  const { id } = useParams();
  const [data] = useState([]);
  const userId =    localStorage.getItem('userId', data.userId);
  const [formData, setFormData] = useState({
    nomeProduto: "",
    descricaoProduto: "",
    quantidade: "",
    valorPorUnidade: "",
    estadoProduto: "",
    localizacao: "",
    fornecedor: "",
  });

  const [fornecedores, setFornecedores] = useState([]);
  const [valorTotal, setValorTotal] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    pegandoDados();
  }, []);

  async function pegandoDados() {
    try {

      // Requisição para obter os fornecedores do usuário logado
      const fornecedoresData = await axios.get(`https://localhost:44398/api/Fornecedores/usuarioIdFornecedores?usuarioId=${userId}`);
      setFornecedores(fornecedoresData.data);

      const produtoData = await axios.get(`https://localhost:44398/api/Produtos/${id}`);
      setFormData({
        nomeProduto: produtoData.data.nome,
        descricaoProduto: produtoData.data.descricao,
        quantidade: produtoData.data.quantidade.toString(),
        valorPorUnidade: produtoData.data.valorUnidade.toString(),
        estadoProduto: produtoData.data.estadoProduto.toString(),
        localizacao: produtoData.data.localizacao,
        fornecedor: produtoData.data.fornecedorId,
      });
    } catch (error) {
      console.error("Erro ao buscar dados do produto:", error);
    }
  }

  function mascara(valor) {
    var valorAlterado = valor.value;
    valorAlterado = valorAlterado.replace(/\D/g, ""); // Remove todos os não dígitos
    valorAlterado = valorAlterado.replace(/(\d+)(\d{2})$/, "$1,$2"); // Adiciona a parte de centavos
    valorAlterado = valorAlterado.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Adiciona pontos a cada três dígitos
    valor.value = valorAlterado;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "quantidade") {
      if (value !== "") {
        document.getElementById("valorPorUnidade").removeAttribute("disabled");
      } else {
        setFormData({ ...formData, valorPorUnidade: "" });
        document.getElementById("valorPorUnidade").setAttribute("disabled", true);
      }
    }

    const quantidade = parseFloat(name === "quantidade" ? value : formData.quantidade);
    const valorPorUnidade = parseFloat(name === "valorPorUnidade" ? value.replace(",", ".") : formData.valorPorUnidade.replace(",", "."));

    if (!isNaN(quantidade) && !isNaN(valorPorUnidade)) {
      const total = quantidade * valorPorUnidade;
      setValorTotal(total.toFixed(2));
    } else {
      setValorTotal("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nomeProduto || !formData.descricaoProduto || !formData.quantidade || !formData.valorPorUnidade) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha todos os campos obrigatórios.'
      });
      return;
    }

    try {
      // Requisição para atualizar os dados do produto
      await axios.put(`https://localhost:44398/api/Produtos/${id}`, {
        nome: formData.nomeProduto,
        descricao: formData.descricaoProduto,
        quantidade: parseInt(formData.quantidade),
        valorUnidade: parseFloat(formData.valorPorUnidade.replace(",", ".")),
        localizacao: formData.localizacao,
        estadoProduto: parseInt(formData.estadoProduto),
        categoria: parseInt(formData.categoria),
        fornecedorId: formData.fornecedor,
        usuarioId: userId
      });
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Dados do produto atualizados com sucesso.'
      });
    } catch (error) {
      console.error("Ocorreu um erro ao atualizar os dados do produto:", error);
    }
  };

  return (
    <>
    <Header/>
    <ContainerProduto>
      <LeftTitle>EDIÇÃO DE PRODUTO</LeftTitle>
      <ContainerForm>
        <h6 style={{ fontSize: "30px" }}> Informações do Produto </h6>
        <hr />
        <br />
        <form onSubmit={handleSubmit}>
          <FormItem>
            <Label htmlFor="nomeProduto">Nome do Produto: <span style={{ color: "red" }}>*</span></Label>
            <br />
            <Input
              type="text"
              id="nomeProduto"
              name="nomeProduto"
              value={formData.nomeProduto}
              onChange={handleChange}
              maxLength={250}
              placeholder="Insira o nome do produto..."
            />
          </FormItem>

          <FormItem>
            <Label htmlFor="descricaoProduto">Descrição do Produto: <span style={{ color: "red" }}>*</span></Label>
            <TextAreaDescricao
              type="text"
              id="descricaoProduto"
              name="descricaoProduto"
              value={formData.descricaoProduto}
              onChange={handleChange}
              rows={5}
              placeholder="Insira a descrição do produto..."
            />
          </FormItem>

          <Note>NOTA: Para habilitar o campo "Valor por unidade" deve inserir a quantidade.</Note>
          <FormItemMenores>
            <LabelMenor htmlFor="quantidade">Quantidade: <span style={{ color: "red" }}>*</span></LabelMenor>
            <InputMenor
              type="number"
              id="quantidade"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleChange}
              placeholder="0"
            />

            <LabelMenor htmlFor="valorPorUnidade">Valor por Unidade: <span style={{ color: "red" }}>*</span></LabelMenor>
            <InputMenor
              type="text"
              id="valorPorUnidade"
              name="valorPorUnidade"
              value={formData.valorPorUnidade}
              onChange={handleChange}
              placeholder="0,00"
              onInput={(e) => mascara(e.target)}
              disabled
            />

            <LabelMenor htmlFor="valorTotal">Valor Total:</LabelMenor>
            <InputMenor
              type="text"
              id="valorTotal"
              name="valorTotal"
              value={`R$ ${valorTotal}`}
              disabled
            />
          </FormItemMenores>

          <FormItemCategoriaEstado>
            <Label htmlFor="categoria">Categoria:</Label>
            <br />
            <Select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            >
              <option value="0">Sem Categoria</option>
              <option value="1">Roupa</option>
              <option value="2">Sapato</option>
              <option value="3">Cosmético</option>
              <option value="4">Alimento</option>
              <option value="5">Eletrônico</option>
              <option value="6">Eletrodoméstico</option>
            </Select>

            <Label htmlFor="estadoProduto">Estado do Produto:</Label>
            <br />
            <Select
              id="estadoProduto"
              name="estadoProduto"
              value={formData.estadoProduto}
              onChange={handleChange}
            >
              <option value="0">Produtos em boas condições</option>
              <option value="1">Produto danificado</option>
              <option value="2">Produto vencido</option>
              <option value="3">Produto reembolsado</option>
              <option value="4">Produto obsoleto</option>
            </Select>
          </FormItemCategoriaEstado>

          <FormItem>
            <Label htmlFor="localizacao">Localização:</Label>
            <br />
            <Input
              type="text"
              id="localizacao"
              name="localizacao"
              value={formData.localizacao}
              onChange={handleChange}
              placeholder="Insira a localização do produto..."
            />
          </FormItem>

          <FormItem>
            <Label htmlFor="fornecedor">Escolha na lista de fornecedores:</Label>
            <br />
            <select
              id="fornecedor"
              name="fornecedor"
              value={formData.fornecedor}
              onChange={handleChange}
              style={{
                width: '40%',
                fontSize: '20px',
                padding: '5px'
              }}
            >
              <option value="">Selecione...</option>
              {fornecedores.map((fornecedor) => (
                <option key={fornecedor.id} value={fornecedor.nome}>{fornecedor.nome}</option>
              ))}
            </select>
          </FormItem>

          <ContainerButton>
            <Button
              style={{ marginLeft: "10px" }}
              text="Novo Fornecedor"
              type="button"
              onClick={() => navigate('/addFornecedor/' + Cookies.get("usuarioId"))} // Navegar para a rota desejada
            />
            <Button style={{ justifyContent: "flex-end" }} text="ATUALIZAR" type="submit"></Button>
          </ContainerButton>
        </form>
      </ContainerForm>
    </ContainerProduto>
    </>
  );
}
