import styled from "styled-components";

const mobileBreakpoint = "710px";
const desktopSmallBreakpoint = "1200px";


export const ContainerFornecedor = styled.header`
  background-color: #5871fb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  padding: 20px;

  @media only screen and (max-width: ${desktopSmallBreakpoint}) {
    justify-content: start;
  }
  @media only screen and (max-width: ${desktopSmallBreakpoint}) {
    padding-top: 220px;
    justify-content: start;
  }

  @media only screen and (max-width: ${mobileBreakpoint}) {
    padding-top: 178px;
    justify-content: start;
  }
`;

export const ContainerHeaderFornecedor = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 40px;
  padding-bottom: 20px;
  color: white;
  width: 100%;
`;

export const ContainerButton = styled.div`
  background-color: #fff8e7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  width: 100%;

  i {
    display: none;
  }

  @media only screen and (max-width: ${desktopSmallBreakpoint}) {
    button {
      padding: 10px;
    }

    @media only screen and (max-width: ${mobileBreakpoint}) {
      input {
        max-width: 100px;
      }

      i {
        display: block;
        font-size: 35px;
        color: #18368f;
      }
      .button-add-desktop {
        display: none;
      }
    }
  }
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

export const ButtonSearch = styled.button`
  background-color: #4e73df;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px;
  margin-left: 5px;
`;
export const LeftTitle = styled.h3`
  margin: 0;
`;

export const RightTitle = styled.h3`
  margin: 0;
  margin-right: 100px;
`;

export const ContainerTable = styled.div`
  padding: 20px;
  background-color: #fff8e7;

  overflow-y: auto;

  i {
    display: none;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
  }

  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    color: black;
  }

  th {
    background-color: #e8e8e8;
  }

  @media only screen and (max-width: ${desktopSmallBreakpoint}) {
    th {
      font-size: 16px;
    }

    td {
      font-size: 13px;
    }

    button {
      padding: 5px;
      font-size: 10px;
    }
  }

  @media only screen and (max-width: ${mobileBreakpoint}) {
    display: none;
  }
`;

export const ContainerTableMobile = styled.table`
  padding: 20px;
  background-color: #fff8e7;

  overflow-y: auto;
  display: none;

  i {
    display: none;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
  }

  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    color: black;
  }

  th {
    background-color: #e8e8e8;
  }

  @media only screen and (max-width: ${mobileBreakpoint}) {
    .button-edit-desktop {
      display: none; // Oculta o botão de edição no desktop
    }

    display: flex;

    i {
      display: block;
      color: #18368f;
      font-size: 18px;
    }

    th {
      font-size: 14px;
    }

    td {
      font-size: 11px;
    }

    padding: 10px;
  }
`;

export const ContainerrHome = styled.header`
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
