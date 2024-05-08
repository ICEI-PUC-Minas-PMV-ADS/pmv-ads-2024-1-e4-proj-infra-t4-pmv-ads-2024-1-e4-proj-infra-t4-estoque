import styled from 'styled-components';

export const StyledSquareContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledSquare = styled.div`
  width: 300px;
  height: 120px;
  margin: 20px;
  padding: 10px 20px;
  font-size: 16px;
  border: none; 
  border-radius: 10px;
  color: white;
  background-color: ${props => props.bgColor || '#5555c2'};

`;

export const SquareHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
`;

export const StyledButton = styled.button`
  margin: 20px;
  padding: 10px 20px;
  font-size: 16px;
  border: none; 
  border-radius: 10px;
  cursor: pointer;
  color: white;
  background: linear-gradient(265.27deg, #0000 20.55%, #55a0c2 94.17%);
  background-color: #55a0c2;
  transition: all 0.2s ease-in-out;
    
  &:hover {
    background-color: #5555c2;
  }
`;

export const ContainerADM = styled.div`
  background-color: #5871FB;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  padding: 20px;
  margin-top: 150px;
`;

export const ContainerHeaderADM = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 40px;
  color: white;
  width: 100%;
`;

export const ContainerButton = styled.div`
  background-color: #FFF8E7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  width: 100%;
`;

export const ContainerSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  input {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;

export const LeftTitle = styled.h3`
  margin: 0;
  padding-left: 20px;
  padding-bottom: 20px;
`;

export const CenterAlign = styled.div`
display: flex;
justify-content: center;
`;

export const ChartStyled = styled.div`
width: 100%;
height: 100%;
margin: 10px;
background-color: white;
border-radius: 10px;
padding: 10px;
`;

export const AllCharts = styled.div`
display: flex;
justify-content: center;
`;

export const ContainerTable = styled.div`
  padding: 20px;
  background-color: #FFF8E7;
  height: 605px; 
  overflow-y: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
  }

  th,
  td {
    padding: 10px;
    color: black;
  }
`;

export const ContainerrHome = styled.div`
  .logo {
    height: 40vmin;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .logo {
      animation: spin infinite 20s linear;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
