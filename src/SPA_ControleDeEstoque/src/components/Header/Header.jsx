import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import ControleDeEstoqueLogo2 from "../../assets/ControleDeEstoqueLogo2.png";
import {
  ButtonsHeader,
  ButtonsMenu,
  ContainerHeader,
  ContainerMenu,
  ContainerMenuHeader,
  DropDownMenu,
  LogoImage,
  MenuItem,
} from "./HeaderStyled";
import EnviarFeedbackModal from "../../pages/EnviarFeedBack/EnviarFeedBack";
import { Link } from "react-router-dom";
import { getDadosUsuario } from "../../services/configuracaoPerfilService";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModalFeedBack = () => {
    setIsOpenModal(!isOpenModal);
  };

  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    async function getNomeUsuario() {
      try {
        const response = await getDadosUsuario();
        setNomeUsuario(response.data.nome);
      } catch (error) {
        console.error("Erro ao obter dados do usuário:", error);
      }
    }

    getNomeUsuario();
  }, []);

  return (
    <ContainerHeader>
      <ContainerMenuHeader>
        <li className="logoControle">
          <a>
            <LogoImage
              src={ControleDeEstoqueLogo2}
              alt="Logo Controle de Estoque"
            />
          </a>
        </li>
        <ButtonsHeader>
          <a onClick={toggleModalFeedBack}>ENVIAR FEEDBACK</a>
        </ButtonsHeader>
        {isOpenModal && <EnviarFeedbackModal />}
        <span>|</span>
        <ButtonsHeader>
          <a>{nomeUsuario ? nomeUsuario : "NOME DA EMPRESA LOGADA"}</a>
        </ButtonsHeader>
        <span>|</span>
        <ButtonsHeader>
          <MenuItem onClick={toggleDropdown}>
            <a>EMPRESA@EMPRESA.COM.BR</a>
            <FontAwesomeIcon icon={faCaretDown} />
          </MenuItem>
          {isOpen && (
            <DropDownMenu>
              <li>
                <Link to="/ConfiguracaoPerfil">
                  <a>CONFIGURAÇÃO DO PERFIL</a>
                </Link>{" "}
              </li>
            </DropDownMenu>
          )}
        </ButtonsHeader>
      </ContainerMenuHeader>
      <ContainerMenu>
        <Link to="/">
          <ButtonsMenu>
            <a>ESTOQUE DE PRODUTOS</a>
          </ButtonsMenu>
        </Link>{" "}
        <span>|</span>
        <ButtonsMenu>
          <Link to="/Admin">
            <a href="#">ADMINISTRAÇÃO</a>
          </Link>{" "}
        </ButtonsMenu>
        <span>|</span>
        <Link to="/fornecedores">
          <ButtonsMenu>
            <a>FORNECEDORES</a>
          </ButtonsMenu>
        </Link>
      </ContainerMenu>
    </ContainerHeader>
  );
}
