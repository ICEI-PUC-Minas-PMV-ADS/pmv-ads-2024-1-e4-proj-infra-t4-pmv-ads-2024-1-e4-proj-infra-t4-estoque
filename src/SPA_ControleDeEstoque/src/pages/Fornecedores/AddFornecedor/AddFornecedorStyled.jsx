import styled from "styled-components";

const mobileBreakpoint = "710px";

export const ContainerFornecedor = styled.header`
  background-color: #5871fb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  justify-content: start;
  font-size: calc(10px + 2vmin);
  color: white;
  padding: 20px;
  align-items: center;
  padding-top: 210px;

  @media only screen and (max-width: ${mobileBreakpoint}) {
    padding-top: 120px;
    justify-content: start;
  }
`;

export const ContainerHeaderFornecedor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 40px;
  color: white;
  width: 100%;
  margin-top: 20px;
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
    width: 100%;
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
  justify-content: end;
`;
