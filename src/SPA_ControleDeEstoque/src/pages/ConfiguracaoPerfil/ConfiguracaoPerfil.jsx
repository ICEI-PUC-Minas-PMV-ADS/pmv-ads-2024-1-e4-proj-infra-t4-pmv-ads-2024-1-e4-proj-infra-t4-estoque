import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '../../components/Button/Button';
import BotaoMostrarSenha from '../../components/BotaoMostrarSenha/BotaoMostrarSenha';
import Swal from 'sweetalert2';
import InputMask from 'react-input-mask';
import Cookies from 'js-cookie';

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
import Header from "../../components/Header/Header";
import { BsDeviceHddFill } from "react-icons/bs";

export default function ConfiguracaoPerfil() {
  const [senhaAtualVisivel, toggleSenhaAtualVisivel] = useState(false);
  const [data] = useState([]);
  const userId = localStorage.getItem('userId', data.userId);

  const [formData, setFormData] = useState({
    newUserName: "",
    newEmail: "",
    newCnpj: "",
    newPassword: "",
    userId: `${userId}`
  });

  useEffect(() => {
    const getDadosUsuario = async () => {
      try {
        const response = await axios.get(`https://localhost:44398/api/Auth/usuarioIdDados?usuarioId=${userId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
          }
        });
        const userData = response.data;
        const { fullName, email, cnpj } = userData;
        setFormData({
          newUserName: fullName,
          newEmail: email,
          newCnpj: cnpj,
          newPassword: "",
          userId: `${userId}`
        });
      } catch (error) {
        console.error("Ocorreu um erro ao obter os dados do usuário:", error);
      }
    };

    getDadosUsuario();
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

    if ((formData.newPassword) &&
      (formData.newPassword.length < 8 || !/\d/.test(formData.newPassword) || !/[A-Z]/.test(formData.newPassword) || !/[^a-zA-Z0-9]/.test(formData.newPassword))) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'A senha atual deve ter no mínimo 8 caracteres, pelo menos um número, uma letra maiúscula e um símbolo.'
      });
      return;
    }

    try {
      await axios.put(
        `https://localhost:44398/api/Auth/editUsuario`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });

      Toast.fire({
        icon: "success",
        title: "Editado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao editar os dados do usuário:", error);

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });

      Toast.fire({
        icon: "error",
        title: "Ocorreu um erro ao editar!",
      });
    }
    setTimeout(() => {
      window.location.reload();
    }, 3050);
  };

  return (
    <>
      <Header />
      <ContainerConfiguracaoPerfil>
        <LeftTitle>MEU PERFIL</LeftTitle>
        <ContainerForm>
          <h6 style={{ fontSize: "30px" }}> Gerencie sua conta </h6>
          <hr />
          <br />
          <form onSubmit={handleSubmit}>
            <FormItem>
              <Label htmlFor="newUserName">Nome da Empresa:</Label>
              <Input
                type="text"
                id="newUserName"
                name="newUserName"
                value={formData.newUserName}
                onChange={handleChange}
              />
            </FormItem>

            <FormItem>
              <Label htmlFor="newEmail">E-mail:</Label>
              <Input
                type="email"
                id="newEmail"
                name="newEmail"
                value={formData.newEmail}
                onChange={handleChange}
              />
            </FormItem>

            <FormItem>
              <Label htmlFor="newCnpj">CNPJ:</Label>
              <InputMask
                mask="99.999.999/9999-99"
                maskChar="_"
                type="text"
                id="newCnpj"
                name="newCnpj"
                value={formData.newCnpj}
                onChange={handleChange}
                style={{
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
    </>
  );
}
