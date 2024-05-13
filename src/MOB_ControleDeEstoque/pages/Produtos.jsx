import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import axios from "axios";
import Header from "../components/Header";
import Title from "../components/Title";

export default function Produtos() {
  const [data, setData] = useState([]);

  const produtoGet = async () => {
    try {
      const response = await axios.get(
        `https://localhost:44398/api/Produtos/usuarioIdProdutos?usuarioId=474de96f-117e-41f3-a658-8931bda38b07`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    produtoGet();
  }, []);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Title title="Produtos"/>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.header}>Nome do Produto</Text>
            <Text style={styles.header}>Quantidade</Text>
            <Text style={styles.header}>Código do Produto</Text>
            <Text style={styles.header}>Valor</Text>
          </View>
          {data.map(item => (
            <View key={item.id} style={styles.row}>
              <Text>{item.nome}</Text>
              <Text>{item.quantidade}</Text>
              <Text>{item.codigoProduto}</Text>
              <Text>{item.valor}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({

  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 5,
  },
  header: {
    fontWeight: "bold",
  },
});
