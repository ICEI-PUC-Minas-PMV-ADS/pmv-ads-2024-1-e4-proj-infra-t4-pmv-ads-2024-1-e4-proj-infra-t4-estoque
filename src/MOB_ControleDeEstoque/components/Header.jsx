import React from 'react'
import { Appbar } from "react-native-paper";
import { StyleSheet} from 'react-native';


export default function Header() {

    
  return (
    
      <Appbar.Header style={styles.header}>
          
       
    <Appbar.Content color='white' title="Controle de Estoque" />
    <Appbar.Action icon="menu" color='white' size={35} />
          
          
  
  </Appbar.Header>
  )
}


const styles = StyleSheet.create({


    header: {
    
       backgroundColor:'#5871fb',
      
    
    },
    
    
    });
