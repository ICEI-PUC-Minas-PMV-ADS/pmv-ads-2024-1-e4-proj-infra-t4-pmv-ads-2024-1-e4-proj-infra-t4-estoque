import React from "react";
import Header from "../components/Header";
import { Text, StyleSheet } from "react-native";

export default function Title({title}) {
  return (
    <>
      
          <Text style={styles.title}>{title}</Text>
    </>
  );
}


const styles = StyleSheet.create({


    title: {
    
        color: '#5871fb',
        fontSize: 30,
        margin: 20
        
      
    
    },
    
    
    });