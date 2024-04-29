import styled from "styled-components";

export const ContainerHeader = styled.header`
  list-style-type: none;
  background-color: #5871fb;
`;

export const ContainerMenuHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;

  span {
    margin: 0 50px;
    color: rgb(33, 25, 70);
    size: 130px;
    font-weight: 1000;
  }

  li {
    margin-right: 20px;
  }
`;

export const ContainerMenu = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #fff8e7;


  span {
    margin: 0 50px;
    color: rgb(33, 25, 70);
    size: 130px;
    font-weight: 1000;
  }
`


export const DropDownMenu = styled.ul`
  display: none;
  position: absolute;
  background-color: #ffffff;
  min-width: 200px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  list-style: none;
  color: black;

  a {
    color: #000000;
    margin-left: 10px;
  }

  a:hover {
    color: #000000;
    text-decoration: underline;
  }
`

export const ButtonsHeader = styled.li`
  
  
  position: relative; 

  &:hover ${DropDownMenu} {
    display: block; 
  }

  a {
    font-size: larger;
    color: rgb(196, 196, 196);
    text-decoration: none;
    font-weight: 500;
    display: flex;
    align-items: center;
    text-align: right;
  }

  a:hover {
    color: black;
    text-decoration: underline;
  }
`;



export const ButtonsMenu = styled.li`


  a {
    font-size: larger;
    color: rgb(196, 196, 196);
    text-decoration: none;
    font-weight: 500;
  }

  a:hover {
    color: #000000;
    text-decoration: underline;
  }
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-right: 5px;
  }
`;

export const LogoImage = styled.img`
  width: 400px;
  height: auto;
  margin-right: 300px;
`;
