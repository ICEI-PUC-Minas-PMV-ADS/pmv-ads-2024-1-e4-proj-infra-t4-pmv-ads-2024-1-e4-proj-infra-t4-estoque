import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ContainerADM, StyledSquare, StyledButton, ContainerHeaderADM, LeftTitle, ContainerTable, StyledSquareContainer, CenterAlign, SquareHeader, ChartStyled, AllCharts } from './AdminStyled';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import Header from '../../components/Header/Header';
import Cookies from 'js-cookie';

export default function Admin() {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem('userId', data.userId);

  const adminGet = async () => {
    try {
      const response = await axios.get(`https://localhost:44398/api/Produtos/usuarioIdProdutos?usuarioId=${userId}`);
      console.log(response)
        setData(response.data);
      } catch (error) {	
        console.error(error);
      }
  };

  useEffect(() => {
    adminGet();
  }, []);

  const generatePdf = async () => {
    try {
      const response = await axios.get(`https://localhost:44398/api/PDFGen/usuarioId?usuarioId=${userId}`, {
        responseType: 'arraybuffer'
      });
      console.log(response.data);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Relatório_de_Inventário.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {	
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <ContainerADM>
        <br />
        <br />
        <ContainerHeaderADM>
          <div>
            <LeftTitle style={{ fontSize: "30px" }}>ADMINISTRAÇÃO</LeftTitle>
          </div>
        </ContainerHeaderADM>

        <ContainerTable>
          <StyledSquareContainer>

          <StyledSquare style={{ backgroundColor: "#0a4eb1" }}>
              <SquareHeader>
                <div>DADOS GERAIS</div>
              </SquareHeader>
              <div> <strong>{data.length}</strong> Produtos Registrados</div>
              <div> <strong>{data.reduce((total, produto) => total + produto.quantidade, 0)}</strong> Itens no Estoque</div>
            </StyledSquare>

            <StyledSquare style={{ backgroundColor: "#e8c743" }}>
            <SquareHeader>
              <div>ESTOQUE MÍNIMO</div>
            </SquareHeader>
            <div> <strong>{data.filter(produto => produto.quantidade < 20).length}</strong> Produtos com Estoque Baixo </div>
          </StyledSquare>

          <StyledSquare style={{ backgroundColor: "#f5535e" }}>
          <SquareHeader>
            <div>ESTOQUE ZERADO</div>
          </SquareHeader>
          <div> <strong>{data.filter(produto => produto.quantidade === 0).length}</strong> Produtos com Estoque Zerado</div>
        </StyledSquare>

          </StyledSquareContainer>

          <AllCharts>
          <ChartStyled>
          <div className='Chart'>
            <Bar data={{
              labels: data.map((produto) => produto.nome),
              datasets: [
                {
                  label: 'Quantidade',
                  data: data.map((produto) => produto.quantidade),
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                }
              ]
            }} />
          </div>
          </ChartStyled>

          <ChartStyled>
            <div className='Chart'>
              <Line data={{
                labels: Array.from({ length: 12 }, (_, i) => {
                  return new Date(2024, i, 1).toLocaleString('default', { month: 'short' });
                }),
                datasets: [
                  {
                    label: 'Entrada',
                    data: Array.from({ length: 12 }, (_, i) => { 
                      return data.filter(produto => new Date(produto.dataDeCriacao).getMonth() === i).reduce((total, produto) => total + produto.quantidade, 0);
                    }),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                  }
                ]
              }} />
            </div>
          </ChartStyled>
          </AllCharts>

            <CenterAlign>
              <div>
                <StyledButton onClick={generatePdf}>GERAR METODO DE RELATÓRIO</StyledButton>
              </div>
          </CenterAlign>
        </ContainerTable>
        <footer></footer>
      </ContainerADM>
    </>
  );
}
