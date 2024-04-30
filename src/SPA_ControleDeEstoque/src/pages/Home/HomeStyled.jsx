import styled from "styled-components"

export const ContainerHome = styled.header`

 
  background-color: #5871FB;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  padding: 20px;
  

`

export const ContainerHeaderHome = styled.div`

 
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 40px;
  color: white;
  width: 100%;




`



export const ContainerButton = styled.div`
    
    
 
    background-color: #FFF8E7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
    width: 100%;
    

    
  
`


export const ContainerSearch = styled.div`


  display: flex;
  align-items: center;
  justify-content: flex-start;

input {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}




`


export const ButtonSearch = styled.button`
  background-color: #4e73df;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px;
  margin-left: 5px;

`
export const LeftTitle = styled.h3`
 
  margin: 0;


`

export const RightTitle = styled.h3`
 
 margin: 0;
  margin-right: 100px;


`


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
  border: 1px solid #ddd;
  color: black;
}

`

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












`