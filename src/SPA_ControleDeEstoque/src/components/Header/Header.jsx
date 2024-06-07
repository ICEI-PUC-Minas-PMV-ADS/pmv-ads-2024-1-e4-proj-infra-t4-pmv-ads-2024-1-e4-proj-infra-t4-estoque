import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { BsGridFill, BsPeopleFill, BsPersonFill, BsGearFill, BsChatDotsFill } from "react-icons/bs";
import ControleDeEstoqueLogo2 from "../../assets/ControleDeEstoqueLogo2.png";
import axios from "axios";
import Cookies from 'js-cookie'; // Adicione esta linha

import {
  ButtonsHeader,
  ButtonsMenu,
  ContainerButtonsHeader,
  ContainerHeader,
  ContainerLogo,
  ContainerMenu,
  ContainerMenuDrop,
  ContainerMenuHeader,
  ContainerMenuHeaderTablet,
  ContainerMenuMobile,
  DropDownMenu,
  LogoImage,
  MenuItem,
} from "./HeaderStyled";
import EnviarFeedbackModal from "../../pages/EnviarFeedBack/EnviarFeedBack";
import { Link } from "react-router-dom";

// Restante do seu código...



export default function Header() {
  const [data] = useState([]);
  const token = localStorage.getItem('token', data.token);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModalFeedBack = () => {
    setIsOpenModal(!isOpenModal);
  };

  const [formData, setFormData] = useState({
    newUserName: "",
    newEmail: ""
  });

  const [nomeUsuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");

  const userId = localStorage.getItem('userId', data.userId);

  useEffect(() => {
    async function getDadosUsuario() {
      try {
        const response = await axios.get(`https://controledeestoqueapi.azurewebsites.net/api/Auth/usuarioIdDados?usuarioId=${userId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
          }
        });
        const userData = response.data;
        const { fullName, email, cnpj } = userData;
        setFormData({
          newUserName: fullName,
          newEmail: email,
        });
        setNomeUsuario(fullName);
        setEmail(email);
      } catch (error) {
        console.error("Ocorreu um erro ao obter os dados do usuário:", error);
      }
    };

    getDadosUsuario();
  }, []);

  return (
    <>
      <ContainerHeader>
        <ContainerMenuHeader>
          <li className="logoControle">
            <a href={`/home/${userId}`}>
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
          <ButtonsHeader>
            <a>{nomeUsuario ? nomeUsuario.toUpperCase() : "NOME DA EMPRESA LOGADA"}</a>
          </ButtonsHeader>

          <ButtonsHeader>
            <MenuItem onClick={toggleDropdown}>
              <a>{email ? email.toUpperCase() : "EMPRESA@EMPRESA.COM.BR"}</a>
              <FontAwesomeIcon icon={faCaretDown} />
            </MenuItem>
            {isOpen && (
              <DropDownMenu>
                <li>
                  <Link to={`/ConfiguracaoPerfil/${userId}`}>
                    <a>CONFIGURAÇÃO DO PERFIL</a>
                  </Link>{" "}
                </li>
              </DropDownMenu>
            )}
          </ButtonsHeader>
        </ContainerMenuHeader>

        <ContainerMenuHeaderTablet>
          <ContainerLogo>
            <li className="logoControle">
              <a href="/home/:userId">
                <LogoImage
                  src={ControleDeEstoqueLogo2}
                  alt="Logo Controle de Estoque"
                />
              </a>
            </li>
          </ContainerLogo>

          <ContainerMenuDrop onClick={toggleMenu}>
            <i className="bi bi-list"></i>
          </ContainerMenuDrop>

          <ContainerButtonsHeader>
            <ButtonsHeader>
              <a onClick={toggleModalFeedBack}>ENVIAR FEEDBACK</a>
            </ButtonsHeader>
            {isOpenModal && <EnviarFeedbackModal />}

            <ButtonsHeader>
              <a>{nomeUsuario ? nomeUsuario : "NOME DA EMPRESA LOGADA"}</a>
            </ButtonsHeader>

            <ButtonsHeader>
              <MenuItem onClick={toggleDropdown}>
                <a>EMPRESA@EMPRESA.COM.BR</a>
                <FontAwesomeIcon icon={faCaretDown} />
              </MenuItem>
              {isOpen && (
                <DropDownMenu>
                  <li>
                    <Link to={`/ConfiguracaoPerfil/${userId}`}>
                      <a>CONFIGURAÇÃO DO PERFIL</a>
                    </Link>{" "}
                  </li>
                </DropDownMenu>
              )}
            </ButtonsHeader>
          </ContainerButtonsHeader>
        </ContainerMenuHeaderTablet>

        <ContainerMenu>
          <ButtonsMenu>
            <Link to={`/home/${userId}`}>
              <a>ESTOQUE DE PRODUTOS</a>
            </Link>{" "}
          </ButtonsMenu>

          <ButtonsMenu>
            <Link to={`/Admin/${userId}`}>
              <a>ADMINISTRAÇÃO</a>
            </Link>{" "}
          </ButtonsMenu>

          <ButtonsMenu>
            <Link to={`/fornecedores/${userId}`}>
              <a>FORNECEDORES</a>
            </Link>
          </ButtonsMenu>
        </ContainerMenu>

        {isMenuOpen && (
          <ContainerMenuMobile>
            <ul>
              <li>
                <Link style={{ textDecoration: "none", color: "#5871fb" }} to={`/home/${userId}`}>
                  <BsGridFill style={{ marginRight: "5px" }} /> Estoque de Produtos
                </Link>
              </li>
              <li>
                <Link style={{ textDecoration: "none", color: "#5871fb" }} to={`/admin/${userId}`}>
                  <BsPeopleFill style={{ marginRight: "5px" }} /> Administração
                </Link>
              </li>
              <li>
                <Link style={{ textDecoration: "none", color: "#5871fb" }} to={`/fornecedores/${userId}`}>
                  <BsPersonFill style={{ marginRight: "5px" }} /> Fornecedores
                </Link>
              </li>
              <li>
                <Link
                  style={{ textDecoration: "none", color: "#5871fb" }}
                  to={`/ConfiguracaoPerfil/${userId}`}
                >
                  <BsGearFill style={{ marginRight: "5px" }} /> Configuração de Perfil
                </Link>
              </li>
              <li>
                <Link
                  style={{ textDecoration: "none", color: "#5871fb" }}
                  onClick={toggleModalFeedBack}
                >
                  <BsChatDotsFill style={{ marginRight: "5px" }} /> Enviar Feedback
                </Link>
              </li>
            </ul>
          </ContainerMenuMobile>
        )}
      </ContainerHeader>
    </>
  );
}
