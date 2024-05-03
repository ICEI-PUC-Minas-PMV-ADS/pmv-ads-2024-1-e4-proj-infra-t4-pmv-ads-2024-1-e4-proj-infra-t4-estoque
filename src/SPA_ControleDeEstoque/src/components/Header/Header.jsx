import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import ControleDeEstoqueLogo from "../../assets/ControleDeEstoqueLogo.jpg";
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

export default function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModalFeedBack = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <ContainerHeader>
      <ContainerMenuHeader>
        <li className="logoControle">
          <a>
            <LogoImage
              src={ControleDeEstoqueLogo}
              alt="Logo Controle de Estoque"
            />
          </a>
        </li>
        <ButtonsHeader>
          <a onClick={toggleModalFeedBack} >ENVIAR FEEDBACK</a>
        </ButtonsHeader>
        {isOpenModal && <EnviarFeedbackModal />}
        <span>|</span>
        <ButtonsHeader>
          <a>NOME DA EMPRESA LOGADA</a>
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
          <a href="#">ADMINISTRAÇÃO</a>
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
