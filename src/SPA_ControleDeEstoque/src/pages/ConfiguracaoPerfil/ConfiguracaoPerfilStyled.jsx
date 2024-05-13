import styled from "styled-components";

const mobileBreakpoint = "710px";


export const ContainerConfiguracaoPerfil = styled.header`
background-color: #5871fb;
min-height: 100vh;
display: flex;
flex-direction: column;

justify-content: start;
font-size: calc(10px + 2vmin);
color: white;
padding: 20px;
align-items: center;
padding-top: 250px;

@media only screen and (max-width: ${mobileBreakpoint}) {
  margin-top: 78px;
  padding-top: 120px;
  justify-content: start;
}
`;

export const ContainerForm = styled.div`
background-color: #fff8e7;
color: black;
display: flex;
flex-direction: column;
padding: 2rem;
margin-top: 30px;
justify-content: start;

h6 {
  margin-bottom: 5px;
  font-weight: 400;
  font-size: 35px;
}

span {
  color: #d31414;
  font-weight: bold;
}

div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
  align-items: center;
}

label {
  font-size: 25px;
}
`;

export const ContainerButton = styled.div`
padding-top: 20px;
display: flex;
justify-content: inital;
`;

export const LeftTitle = styled.h3`
margin: 0;
`;

export const FormItem = styled.div`
display: flex;
flex-direction: column; /
margin-bottom: 15px;
`;

export const Label = styled.label`
margin-bottom: 5px;
margin-top: 10px;
font-weight: bold;
font-size: 25px;
`;

export const Input = styled.input`
font-size: 20px;
padding: 5px;
width: 100%;
`;

export const InputPassword = styled.input`
font-size: 20px;
padding: 5px;
display: flex;
width: 93%;
`;
