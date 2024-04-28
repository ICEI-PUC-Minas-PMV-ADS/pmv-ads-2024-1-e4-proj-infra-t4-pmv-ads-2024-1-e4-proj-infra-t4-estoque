import React, { useState } from 'react';
import './Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ControleDeEstoqueLogo from '../assets/ControleDeEstoqueLogo.jpg'

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='menuCompleto'>
      <div className='headerMenu'>
        <li className='logoControle'>
          <a>
            <img src={ControleDeEstoqueLogo} alt="Logo Controle de Estoque" className="logoImage" />
          </a>
        </li>
        <li className='botoesHeader'><a href='#'>ENVIAR FEEDBACK</a></li>
        <span>|</span>
        <li className='botoesHeader'><a href="#">NOME DA EMPRESA LOGADA</a></li>
        <span>|</span>
        <li className='botoesHeader'>
          <div className='menu-item' onClick={toggleDropdown}>
            <a href="#">EMPRESA@EMPRESA.COM.BR</a>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          {isOpen && (
            <ul className="dropdown-menu"><li><a href="#">CONFIGURAÇÃO DO PERFIL</a></li></ul>
          )}
        </li>
      </div>

      <div className="menu">
        <li className="botoesMenu"><a href="{EstoqueDeProdutos}">ESTOQUE DE PRODUTOS</a></li>
        <span>|</span>
        <li className="botoesMenu"><a href="#">ADMINISTRAÇÃO</a></li>
        <span>|</span>
        <li className="botoesMenu"><a href="#">FORNECEDORES</a></li>
      </div>

    </div>
  );
};

export default Menu;
