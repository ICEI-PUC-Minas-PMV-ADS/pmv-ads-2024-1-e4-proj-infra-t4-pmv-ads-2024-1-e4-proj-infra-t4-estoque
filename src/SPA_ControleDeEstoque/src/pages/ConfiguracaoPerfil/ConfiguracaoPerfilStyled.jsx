import styled from "styled-components";

export const ContainerConfiguracaoPerfil = styled.header`
  min-height: 100vh;
  width: 100%;
  background-color: #5871fb;
  display: flex;
  flex-direction: column;
  justify-content: start;
  font-size: calc(10px + 2vmin);
  color: white;
  padding: 40px;
  align-items: center;
  overflow-y: hidden;
`;

export const ContainerForm = styled.div`
  background-color: #fff8e7;
  width: 55%;
  color: black;
  display: flex;
  flex-direction: column;
  padding: 3rem; 
  margin-top: 30px;
  justify-content: start;

  h6 {
    margin-bottom: 5px;
    font-weight: 400;
    font-size: 35px;
  }

`;

export const ContainerButton = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: flex-end; 
`;

export const LeftTitle = styled.h3`
  margin: 0;
  font-size: 30px; 
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  flex: 2; 
  text-align: left; 
  margin-right: 50px; 
  font-size: 25px;
  
`;

export const Input = styled.input`
  flex: 3; 
  width: 100%; 
  font-size: 20px;
  padding: 5px;
`;

export const InputPassword = styled.input`
  flex: 3; 
  width: 100%; 
  font-size: 20px;
  padding: 5px;
`;
