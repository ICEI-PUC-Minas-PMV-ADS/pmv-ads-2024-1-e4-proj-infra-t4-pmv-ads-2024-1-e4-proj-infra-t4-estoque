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
      const response = await axios.get(`https://localhost:44398/api/PdfGen/usuarioIdDados?usuarioId=${userId}`);
      setData(response.data);
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
              <div> </div>
              <div>X PRODUTOS CADASTRADOS</div>
              <div>X ITENS REGISTRADOS</div>
            </StyledSquare>

            <StyledSquare style={{ backgroundColor: "#e8c743" }}>
            <SquareHeader>
            <div>ESTOQUE MÍNIMO</div>
            </SquareHeader>
            <div></div>
              <div>X PRODUTOS COM ESTOQUE BAIXO</div>
            </StyledSquare>

            <StyledSquare style={{ backgroundColor: "#f5535e" }}>
            <SquareHeader>
            <div>ESTOQUE ZERADO</div>
            </SquareHeader>
            <div></div>
              <div>X PRODUTOS FORA DO ESTOQUE</div>
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
              labels: data.map((produto) => produto.nome),
              datasets: [
                {
                  label: ['Entrada'],
                  data: [12, 19, 3, 5, 2, 3],
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
                {
                  label: ['Saída'],
                  data: [2, 3, 5, 2, 3, 12],
                  backgroundColor: 'rgba(13, 80, 80, 0.2)',
                  borderColor: '#116363',
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
