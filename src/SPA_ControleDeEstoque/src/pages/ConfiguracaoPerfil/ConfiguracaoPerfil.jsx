import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '../../components/Button/Button';
import BotaoMostrarSenha from '../../components/BotaoMostrarSenha/BotaoMostrarSenha';
import Swal from 'sweetalert2';
import { getDadosUsuario, updateDadosUsuario } from '../../services/configuracaoPerfilService';
import InputMask from 'react-input-mask';

import {
  ContainerConfiguracaoPerfil,
  ContainerButton,
  ContainerForm,
  LeftTitle,
  FormItem,
  Label,
  Input,
  InputPassword,
} from "./ConfiguracaoPerfilStyled";

export default function ConfiguracaoPerfil() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cnpj: "",
    newPassword: ""
  });

  const [senhaAtualVisivel, toggleSenhaAtualVisivel] = useState(false);

  useEffect(() => {
    const getDadosUsuarios = async () => {
      try {
        const response = await getDadosUsuario();
        const userData = response.data;
        setFormData(userData);
      } catch (error) {
        console.error("Ocorreu um erro ao obter os dados do usuário:", error);
      }
    };

    getDadosUsuarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleSenhaAtualVisibility = () => {
    toggleSenhaAtualVisivel((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome && !formData.email && !formData.cnpj && !formData.newPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha pelo menos um dos campos.'
      });
      return;
    }

    if ((formData.oldPassword || formData.newPassword) &&
      (formData.newPassword.length < 8 || !/\d/.test(formData.newPassword) || !/[A-Z]/.test(formData.newPassword) || !/[^a-zA-Z0-9]/.test(formData.newPassword))) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'A senha atual deve ter no mínimo 8 caracteres, pelo menos um número, uma letra maiúscula e um símbolo.'
      });
      return;
    }

    try {
      await updateDadosUsuario(formData.nome, formData.email, formData.oldPassword, formData.newPassword);
      console.log("Alteração feita com sucesso!");
    } catch (error) {
      console.error("Ocorreu um erro ao realizar a alteração:", error);
    }
  };

  return (
    <ContainerConfiguracaoPerfil>
      <LeftTitle>MEU PERFIL</LeftTitle>
      <ContainerForm>
        <h6 style={{ fontSize: "30px" }}> Gerencie sua conta </h6>
        <hr />
        <br />
        <form onSubmit={handleSubmit}>
          <FormItem>
            <Label htmlFor="nome">Nome da Empresa:</Label>
            <Input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <Label htmlFor="email">E-mail:</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <Label htmlFor="cnpj">CNPJ:</Label>
            <InputMask
              mask="99.999.999/9999-99"
              maskChar="_"
              type="text"
              id="cnpj"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              style={{
                flex: '3',
                width: '100%',
                fontSize: '20px',
                padding: '5px'
              }}
            />
          </FormItem>


          <FormItem>
            <Label htmlFor="newPassword">Senha nova:</Label>
            <InputPassword
              type={senhaAtualVisivel ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <BotaoMostrarSenha
              senhaVisivel={senhaAtualVisivel}
              togglePasswordVisibility={toggleSenhaAtualVisibility}
            />
          </FormItem>
          <ContainerButton>
            <Button style={{ justifyContent: "flex-end" }} text="ALTERAR" type="submit"></Button>
          </ContainerButton>
        </form>
      </ContainerForm>
    </ContainerConfiguracaoPerfil>
  );
}
