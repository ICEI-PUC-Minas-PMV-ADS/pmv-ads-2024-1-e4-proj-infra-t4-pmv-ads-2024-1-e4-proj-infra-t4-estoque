import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { BsGridFill, BsPeopleFill, BsPersonFill, BsGearFill, BsChatDotsFill } from "react-icons/bs"; // Importando os ícones do Bootstrap Icons
import ControleDeEstoqueLogo2 from "../../assets/ControleDeEstoqueLogo2.png";
import axios from "axios";

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

  const [nomeUsuario, setNomeUsuario] = useState("");
  const userId =    localStorage.getItem('userId', data.userId);

  useEffect(() => {
    async function getNomeUsuario() {
      try {
        const response = await axios.post(`http://localhost:5020/api/Auth/usuarioIdDados?usuarioId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
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
            <a>
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
        <Link to={`/home/${userId}`}>
          <ButtonsMenu>
            <a>ESTOQUE DE PRODUTOS</a>
          </ButtonsMenu>
        </Link>{" "}
        <span>|</span>
        <ButtonsMenu>
          <Link to={`/Admin/${userId}`}>
            <a style={{ fontSize: '18px'}}>ADMINISTRAÇÃO</a>
          </Link>{" "}
        </ButtonsMenu>
        <span>|</span>
        <Link to={`/fornecedores/${userId}`}>
          <ButtonsMenu>
            <a>FORNECEDORES</a>
          </ButtonsMenu>
        </Link>
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
              <Link style={{ textDecoration: "none", color: "#5871fb" }} to="/Admin">
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
  );
}
