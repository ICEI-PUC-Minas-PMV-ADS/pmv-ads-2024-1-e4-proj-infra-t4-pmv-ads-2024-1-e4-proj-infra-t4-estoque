import styled from 'styled-components';

export const StyledButton = styled.button`
  margin: 20px;
  padding: 10px 20px;
  font-size: 16px;
  border: none; 
  border-radius: 10px;
  cursor: pointer;
  color: white;
  background-color: ${props => props.bgColor || '#5555c2'};

  &:hover {
    background-color: ${props => props.hoverColor || '#5555c2'};
  }
`;

export const ContainerADM = styled.div`
  background-color: #5871FB;
  min-height: 100vh;
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
  font-size: 30px;
  margin: 0;
  padding-left: 20px;
  padding-bottom: 45px;
`;

export const ContainerTable = styled.div`
  padding: 20px;
  background-color: #FFF8E7;
  height: calc(100vh - 200px); 
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
