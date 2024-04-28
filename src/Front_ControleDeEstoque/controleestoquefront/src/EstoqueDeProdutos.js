import React, { useState, useEffect } from 'react';
import './EstoqueDeProdutos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function EstoqueDeProdutos() {

  const baseUrl = "https://localhost:44398/api/Produtos/usuarioIdProdutos?usuarioId=660f3988f53e5653efaf5441";
  const [data, setData] = useState([]);

  const produtoGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    produtoGet();
  });

  return (
    <div style={{ background: "#5871FB" }}>
      <div className="EstoqueDeProdutos">
        <br />
        <br />
        <div className="header">
          <h3 className="left-title">ESTOQUE DE PRODUTOS</h3>
          <h3 className="right-title">VALOR: </h3>
        </div>
        <br />

        <div className="button-container">
          <div className="search-container">
            <input type="text" placeholder="PROCURAR" />
            <button className="searchButton">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <button className="addButton">ADICIONAR NOVO PRODUTO</button>
        </div>
        <br />

        <div className="table-container">
          <table className='table table-bordered'>
            <thead style={{ backgroundColor: '#f8f9fc' }}>
              <tr>
                <th>ID</th>
                <th>NOME DO PRODUTO</th>
                <th>QUANTIDADE</th>
                <th>CATEGORIA</th>
                <th>CÓDIGO PRODUTO</th>
                <th>LOCALIZAÇÃO</th>
                <th>VALOR TOTAL</th>
                <th>EDITAR</th>
              </tr>
            </thead>
            <tbody>
              {data.map(produto => (
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.quantidade}</td>
                  <td>{produto.categoria}</td>
                  <td>{produto.codigoProduto}</td>
                  <td>{produto.localizacao}</td>
                  <td>{produto.valor}</td>
                  <td><button className="addButton">EDITAR</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <footer></footer>
      </div>
    </div>
  );
}

export default EstoqueDeProdutos;
