import styled, { css } from "styled-components";

const mobileBreakpoint = "768px";


export const ContainerHeader = styled.header`
  list-style-type: none;
  background-color: #5871fb;
  min-width: 100%;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;

  @media only screen and (max-width: ${mobileBreakpoint}) {
    min-width: auto;
  }
`;

export const ContainerMenuHeader = styled.div`
  max-width: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  background-color: #5871fb;
  padding-top: 11rem;
 

  span {
    margin: 0 1rem;
    color: #000000;
    font-size: 1.2rem;
    font-weight: 1000;
  }

  li {
    margin-right: 2rem;
  }

  @media only screen and (max-width: ${mobileBreakpoint}) {
    min-width: auto;
  }
`;

export const ContainerMenu = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  background-color: #fff8e7;
  min-width: 100%;

  span {
    margin: 0 1rem;
    color: #ffffffF;
    font-size: 1.2rem;
    font-weight: 1000;
  }

  @media only screen and (max-width: ${mobileBreakpoint}) {
    min-width: auto;
  }
`;

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

  li {
    flex-direction: row-reverse;
  }

  a:hover {
    color: #000000;
    text-decoration: underline;
  }

  @media only screen and (max-width: ${mobileBreakpoint}) {
    display: block;
    position: static;
    box-shadow: none;
  }
`;

export const ButtonsHeader = styled.li`
  position: relative;
  cursor: pointer;

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
    color: #000000;
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
  max-width: 250px;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;


  @media only screen and (max-width: ${mobileBreakpoint}) {
    width: 100%;
    margin-right: 0;
  }
`;
