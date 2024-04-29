import { useState, useEffect } from 'react';


import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ButtonSearch, ContainerButton, ContainerHeaderHome, ContainerHome, ContainerSearch, ContainerTable, LeftTitle, RightTitle } from './HomeStyled';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';




export default function Home() {
  const baseUrl = "http://localhost:5020/api/Produtos/usuarioIdProdutos?usuarioId=660f3988f53e5653efaf5441";
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
    <>
      <ContainerHome>
        <br />
        <br />
        <ContainerHeaderHome>
          <div>
            <LeftTitle style={{paddingLeft:"20px", fontSize:"30px"}}>ESTOQUE DE PRODUTOS</LeftTitle>
          </div>
          <div>
            <RightTitle style={{paddingLeft:"20px", fontSize:"30px"}}>VALOR: </RightTitle>
          </div>

        </ContainerHeaderHome>
        <br />

        <ContainerButton>
          <ContainerSearch>
            <input type="text" placeholder="PROCURAR" />
            <ButtonSearch>
              <FontAwesomeIcon icon={faSearch} />
            </ButtonSearch>
          </ContainerSearch>
          <Link to='/as'>
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
