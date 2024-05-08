import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ButtonSearch, ContainerButton, ContainerHeaderHome, ContainerHome, ContainerSearch, ContainerTable, LeftTitle, RightTitle } from './HomeStyled';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { getAllProdutos } from '../../services/homeService';

import Header from '../../components/Header/Header';

export default function Home() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const produtoGet = async () => {
    try {
      const response = await getAllProdutos();
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getEstadoProdutoNome = (estadoProduto) => {
    switch (estadoProduto) {
      case 0:
        return 'Produtos em boas condições';
      case 1:
        return 'Produto danificado';
      case 2:
        return 'Produto vencido';
      case 3:
        return 'Produto reembolsado';
      case 4:
        return 'Produto obsoleto';
      default:
        return '';
    }
  };

  const getCategoriaNome = (categoria) => {
    switch (categoria) {
      case 0:
        return 'Sem Categoria';
      case 1:
        return 'Roupa';
      case 2:
        return 'Sapato';
      case 3:
        return 'Cosmético';
      case 4:
        return 'Alimento';
      case 5:
        return 'Eletrônico';
      case 6:
        return 'Eletrodoméstico';
      default:
        return '';
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    produtoGet();
  }, []);

  return (
    <>
      <Header />
      <ContainerHome>
        <br />
        <br />
        <ContainerHeaderHome>
          <div>
            <LeftTitle>ESTOQUE DE PRODUTOS</LeftTitle>
          </div>
        </ContainerHeaderHome>
        <br />

        <ContainerButton>
          <ContainerSearch>
            <input type="text" placeholder="PROCURAR" value={searchTerm} onChange={handleSearch} />
            <ButtonSearch>
              <FontAwesomeIcon icon={faSearch} />
            </ButtonSearch>
          </ContainerSearch>
          <Link to='/AddProduto'>
            <Button style={{ justifyContent: "flex-end" }} text="ADICIONAR PRODUTO" type="button"></Button>
          </Link>
        </ContainerButton>
        <br />
        <ContainerTable>
          <table className='table table-bordered'>
            <thead style={{ backgroundColor: '#f8f9fc' }}>
              <tr>
                <th>ID</th>
                <th>NOME DO PRODUTO</th>
                <th>QUANTIDADE</th>
                <th>CATEGORIA</th>
                <th>ESTADO DO PRODUTO</th>
                <th>CÓDIGO PRODUTO</th>
                <th>LOCALIZAÇÃO</th>
                <th>VALOR UNIDADE</th>
                <th>VALOR TOTAL</th>
                <th>EDITAR</th>
              </tr>
            </thead>
            <tbody>
              {data.filter(produto => {
                if (searchTerm === '') {
                  return true;
                } else {
                  return (
                    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    produto.quantidade.toString().includes(searchTerm.toLowerCase()) ||
                    getCategoriaNome(produto.categoria).toLowerCase().includes(searchTerm.toLowerCase()) ||
                    getEstadoProdutoNome(produto.estadoProduto).toLowerCase().includes(searchTerm.toLowerCase()) ||
                    produto.codigoProduto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    produto.localizacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    produto.valor.toString().includes(searchTerm.toLowerCase()) ||
                    produto.valorUnidade.toString().includes(searchTerm.toLowerCase())
                  );
                }
              }).map(produto => (
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.quantidade}</td>
                  <td>{getCategoriaNome(produto.categoria)}</td>
                  <td>{getEstadoProdutoNome(produto.estadoProduto)}</td>
                  <td>{produto.codigoProduto}</td>
                  <td>{produto.localizacao}</td>
                  <td>{produto.valor}</td>
                  <td>{produto.valorUnidade}</td>
                  <td><Button text='Editar' type='button' /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </ContainerTable>
        <footer></footer>
      </ContainerHome>
    </>
  );
}
