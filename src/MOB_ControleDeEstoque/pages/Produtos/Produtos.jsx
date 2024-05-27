import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import AddProduto from "./AddProduto";
import Title from "../../components/Title";

export default function Produtos() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();


  const produtoGet = async () => {
    try {
      const response = await axios.get(`https://localhost:44398/api/Produtos/usuarioIdProdutos?usuarioId=474de96f-117e-41f3-a658-8931bda38b07`);
      setData(response.data);
      console.log(response.data)
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
        <View style={styles.titleContainer}>
          <Title title="Produtos" />
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddProduto')}>
            <Text style={styles.addButtonText}>Adicionar Produto</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.header}>Código do Produto</Text>
            <Text style={styles.header}>Nome do Produto</Text>
            <Text style={styles.header}>Quantidade</Text>
            <Text style={styles.header}>Edit</Text>
          </View>
          {data.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
          ) : (
            data.map((item) => (
              <View key={item.id} style={styles.row}>
                <Text style={[styles.cell, styles.alignCenter]}>{item.codigoProduto}</Text>
                <Text style={[styles.cell, styles.alignCenter]}>{item.nome}</Text>
                <Text style={[styles.cell, styles.alignCenter]}>{item.quantidade}</Text>
                <TouchableOpacity
                  style={styles.editButtonContainer}
                  onPress={() => navigation.navigate('EditProduto', { produtoId: item.id })}
                >
                  <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: 'hidden',
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  header: {
    fontWeight: "bold",
    flex: 1,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
  },
  alignCenter: {
    textAlign: 'center',
  },
  editButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});
