import styled from "styled-components";

const mobileBreakpoint = "710px";
const desktopSmallBreakpoint = "1200px"
const tabletBreakpoint = "980px";

export const ContainerHeader = styled.header`
  list-style-type: none;
  background-color: #5871fb;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  top: 0px;

  @media only screen and (max-width: ${tabletBreakpoint}) {
 display: flex;
 flex-direction: column;
 

 
  }
`;

export const ContainerMenuHeader = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #5871fb;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;

 

  span {
    margin: 0 1rem;
    color: #000000;
    font-size: 1.2rem;
    font-weight: 1000;
  }

  li {
    margin-right: 2rem;
  }



  @media only screen and (max-width: ${tabletBreakpoint}) {
   
   display: none;
  
   
 
   
  }


  
`;

export const ContainerMenu = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  background-color: #8395fe;
  min-width: 100%;
  justify-content: start;
  padding: 1.2rem;
  justify-content: space-evenly;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);


  span {
    margin: 0 1rem;
    color: #fffffF;
    font-size: 1.2rem;
    font-weight: 1000;
  }

  @media only screen and (max-width: ${tabletBreakpoint}) {

  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}


  @media only screen and (max-width: ${mobileBreakpoint}) {
   
   display: none;
   
 
   
  }
`;

export const DropDownMenu = styled.ul`
  display: none;
  position: absolute;
  background-color: #ffffff;
  min-width: 200px;
  box-shadow: 0 8px 16px 0 rgba(60, 60, 60, 0.242);
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
    color: #333333;
    text-decoration: none;
  }

  @media only screen and (max-width: ${mobileBreakpoint}) {

  }
`;

export const ButtonsHeader = styled.li`
  position: relative;
  cursor: pointer;

  &:hover ${DropDownMenu} {
    display: block;
  }

  a {
    font-size: 19px;
    color: rgb(196, 196, 196);
    text-decoration: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    text-align: right;
  }

  @media only screen and (max-width: ${desktopSmallBreakpoint}) {
   
    

    a{
      font-size: 16px;
    }

   
  }

  a:hover {
    text-shadow: 2px 2px 2px #373737ee;
    text-decoration: none;

  }
`;

export const ButtonsMenu = styled.li`
  a {
    font-size: 17px;
    color: rgb(72, 72, 72);
    text-decoration: none;
    font-weight: 500;
    padding-left: 1rem;
    padding-right: 1rem;
    align-items: center;
  }

  a:hover {
    color: #484848;
    text-shadow: 1px 1px 1px #4a4a4a6b;
  }

  @media only screen and (max-width: ${desktopSmallBreakpoint}) {
   
    a{
      font-size: 15px;
    }

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
  cursor: pointer;

  @media only screen and (max-width: ${mobileBreakpoint}) {
   
 
    
   max-width: 150px;
    
   
  }



`;


export const ContainerMenuHeaderTablet = styled.div`

display: none;


@media only screen and (max-width: ${tabletBreakpoint}) {
   
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 35px;
  
 }

 @media only screen and (max-width: ${mobileBreakpoint}) {
   

   flex-direction: row;
  
 
   
  }


`

export const ContainerLogo = styled.div`
display: flex;
margin: auto;




`

export const ContainerButtonsHeader = styled.div`

display: flex;
flex-direction: row;
margin: auto;

@media only screen and (max-width: ${mobileBreakpoint}) {
   
   display: none;
   
 
   
  }

a{
  padding: 0px 20px;
 
}

`

export const ContainerMenuDrop = styled.div`

display: none;

@media only screen and (max-width: ${mobileBreakpoint}) {
   
   display: flex;
   
   i{
    color: white;
    font-size: 40px;
   }
 
   
  }

`

export const ContainerMenuMobile = styled.div`


display: flex;
justify-content: start;
align-items: start;
background-color: white;
color: #5871fb;
position: relative;
height: 100vh;

ul{
  margin: 20px;
}

a{
  display: flex;
  gap: 5px;
  align-items: center;
}

li{
  padding: 15px;
  list-style: none;
  font-size: 25px;
  text-decoration: none;
}

`