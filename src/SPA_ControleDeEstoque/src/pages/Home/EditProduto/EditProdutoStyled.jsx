import styled from "styled-components";

export const ContainerProduto = styled.header`
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
  padding-top: 250px;
`;

export const ContainerForm = styled.div`
  background-color: #fff8e7;
  width: 70%;
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
  justify-content: space-between;
`;

export const LeftTitle = styled.h3`
  margin: 0;
  font-size: 30px; 
`;

export const FormItem = styled.div`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  flex: 3; 
  margin-bottom: 10px;
  text-align: left; 
  margin-right: 50px; 
  font-weight: bold;
  font-size: 25px;
  
`;

export const Input = styled.input`
  flex: 3; 
  width: 80%; 
  font-size: 20px;
  padding: 5px;
`;

export const TextAreaDescricao = styled.textarea`
  flex: 3; 
  width: 100%; 
  font-size: 20px;
  padding: 10px;
  resize: none;
`;

export const FormItemMenores = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const LabelMenor = styled.label`
  margin-bottom: 5px;
  text-align: left;
  margin-right: 10px;
  font-size: 25px;
  font-weight: bold;
`;

export const InputMenor = styled.input`
  width: 150px; 
  font-size: 20px;
  padding: 5px;
`;

export const Note = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;

export const FormItemCategoriaEstado = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 15px;
`;

export const Select = styled.select`
  width: 30%;
  font-size: 20px;
  padding: 5px;
  margin-right: 100px;
`;

