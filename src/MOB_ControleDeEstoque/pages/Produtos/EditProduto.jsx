import React, { useState, useEffect } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import axios from "axios";
import Header from "../../components/Header";
import Title from "../../components/Title";

export default function EditProduto() {
  const [data, setData] = useState([]);

  // const produtoGet = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://localhost:44398/api/Produtos/usuarioIdProdutos?usuarioId=474de96f-117e-41f3-a658-8931bda38b07`
  //     );
  //     setData(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   produtoGet();
  // }, []);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Title title="Editar Produto" />
        <TextInput/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
  },
});
