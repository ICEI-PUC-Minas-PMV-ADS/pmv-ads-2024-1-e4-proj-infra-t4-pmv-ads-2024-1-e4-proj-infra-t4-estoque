import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import axios from "axios";
import Header from "../components/Header";
import Title from "../components/Title";

export default function Admin() {
  const [data, setData] = useState([]);

  const adminGet = async () => {
    try {
      const userId = 1; // Substitua pelo userId real
      const response = await axios.get(`https://localhost:44398/api/Produtos/usuarioIdProdutos?usuarioId=${userId}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    adminGet();
  }, []);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Title title="ADMINISTRACAO" />
        <View style={styles.Quadrado}>
          <View style={styles.retangulo1}>
            <Text style={styles.headerText}>DADOS GERAIS</Text>
            <Text style={styles.contentText}>
              <Text style={styles.boldText}>{data.length}</Text> Produtos Registrados
            </Text>
            <Text style={styles.contentText}>
              <Text style={styles.boldText}>{data.reduce((total, produto) => total + produto.quantidade, 0)}</Text> Itens no Estoque
            </Text>
          </View>
          <View style={styles.retangulo2}>
            <Text style={styles.headerText}>ESTOQUE MÍNIMO</Text>
            <Text style={styles.contentText}>
              <Text style={styles.boldText}>{data.filter(produto => produto.quantidade < 20).length}</Text> Produtos com Estoque Baixo
            </Text>
          </View>
          <View style={styles.retangulo3}>
            <Text style={styles.headerText}>ESTOQUE ZERADO</Text>
            <Text style={styles.contentText}>
              <Text style={styles.boldText}>{data.filter(produto => produto.quantidade === 0).length}</Text> Produtos com Estoque Zerado
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#5871fb',
  },
  Quadrado: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  retangulo1: {
    width: '100%',
    height: 100,
    backgroundColor: "#0a4eb1",
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  retangulo2: {
    width: '100%',
    height: 100,
    backgroundColor: "#e8c743",
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  retangulo3: {
    width: '100%',
    height: 100,
    backgroundColor: "#f5535e",
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  contentText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
});
