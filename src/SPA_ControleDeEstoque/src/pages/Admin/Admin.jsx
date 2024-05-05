import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ContainerADM, StyledButton, ContainerHeaderADM, LeftTitle, ContainerTable } from './AdminStyled'
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2'
import { Button } from '../../components/Button/Button';


export default function Admin() {

  const baseUrl = "http://localhost:5020/api/Produtos/usuarioIdProdutos?usuarioId=b72d1cb4-31c7-479c-81cc-fa4c4c35892e";
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

  const generatePdf = async () => {
    try {
      await axios.get("http://localhost:5020/api/PdfGen/Gerar/663051cdc173bb91ef22c563");
    } catch (error) {
      console.error("Error generating PDF", error);
    }
  };

  return (
    <>
      <ContainerADM>
        <br />
        <br />
        <ContainerHeaderADM>
          <div>
          <LeftTitle>ADMINISTRAÇÃO</LeftTitle>
          </div>
        </ContainerHeaderADM>
  
        <ContainerTable>

            <StyledButton>  DADOS GERAIS DO ESTOQUE </StyledButton>
            <StyledButton>  VER PRODUTOS ZERADOS </StyledButton>
            <StyledButton>  VER PRODUTOS COM ESTOQUE MINIMO </StyledButton>
            
            <div className='Chart'>
              <Bar data={{
                labels: data.map((produto) => produto.nome),
                datasets : [
                  {
                    label: 'Quantidade', 
                    data: data.map((produto) => produto.quantidade),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                  }
                ]
              }}/>
            </div>
            <div>
            <StyledButton  onClick={generatePdf}> GERAR METODO DE RELATÓRIO </StyledButton>
            
            </div>
        </ContainerTable>
        <footer></footer>
      </ContainerADM>
    </>
  );
}
