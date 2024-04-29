import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ControleDeEstoqueLogo from '../../assets/ControleDeEstoqueLogo.jpg'
import { ButtonsHeader, ButtonsMenu, ContainerHeader, ContainerMenu, ContainerMenuHeader, DropDownMenu, LogoImage, MenuItem } from './HeaderStyled';

export default function Header () {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ContainerHeader>
      <ContainerMenuHeader>
        <li className='logoControle'>
          <a>
            <LogoImage src={ControleDeEstoqueLogo} alt="Logo Controle de Estoque"/>
          </a>
        </li>
        <ButtonsHeader><a href='#'>ENVIAR FEEDBACK</a></ButtonsHeader>
        <span>|</span>
        <ButtonsHeader><a href="#">NOME DA EMPRESA LOGADA</a></ButtonsHeader>
        <span>|</span>
        <ButtonsHeader>
          <MenuItem onClick={toggleDropdown}>
            <a href="#">EMPRESA@EMPRESA.COM.BR</a>
            <FontAwesomeIcon icon={faCaretDown} />
          </MenuItem>
          {isOpen && (
            <DropDownMenu><li><a href="#">CONFIGURAÇÃO DO PERFIL</a></li></DropDownMenu>
          )}
        </ButtonsHeader>
      </ContainerMenuHeader>

      <ContainerMenu >
        <ButtonsMenu><a href="{EstoqueDeProdutos}">ESTOQUE DE PRODUTOS</a></ButtonsMenu>
        <span>|</span>
        <ButtonsMenu><a href="#">ADMINISTRAÇÃO</a></ButtonsMenu>
        <span>|</span>
        <ButtonsMenu><a href="#">FORNECEDORES</a></ButtonsMenu>
      </ContainerMenu>

    </ContainerHeader>
  );
}

