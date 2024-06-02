import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Produtos() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const produtoGet = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');

        if (userId) {
          const response = await axios.get(`https://controledeestoqueapi.azurewebsites.net/api/Produtos/usuarioIdProdutos?usuarioId=${userId}`);
          setData(response.data);
          setFilteredData(response.data);
          console.log('User ID:', userId);
        } else {
          console.error('User id não encontrado');
        }
      } catch (error) {
        console.log('Erro ao buscar produtos:', error);
      }
    };

    produtoGet();
  }, []);

  const apagarProduto = async (idProduto) => {
    try {
      if (!idProduto) {
        console.error('Ocorreu um erro ao tentar acessar o id do produto.');
        return;
      }

      const response = await axios.delete(`https://controledeestoqueapi.azurewebsites.net/api/Produtos/${idProduto}`);

      console.log("Produto removido com sucesso!", response.data);

      produtoGet();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  const handleSearch = () => {
    if (searchQuery === "") {
      setFilteredData(data);
      return;
    }

    const newData = data.filter(item => {
      const itemName = item.nome.toLowerCase();
      const search = searchQuery.toLowerCase();
      return itemName.includes(search);
    });
    setFilteredData(newData);
  };


  return (
    <>
      <Header />
      <View style={styles.container}>
        <Title title="ESTOQUE DE PRODUTOS" />
        <View style={styles.Quadrado}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
              placeholder="Pesquisar..."
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                handleSearch(); 
              }}
              style={styles.searchInput}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddProduto')}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.header}>CÓDIGO</Text>
              <Text style={styles.header}>NOME</Text>
              <Text style={styles.header}>TOTAL</Text>
              <Text style={styles.header}>EDIT</Text>
              <Text style={styles.header}>DELETE</Text>
            </View>
            {filteredData.length === 0 ? (
              <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
            ) : (
              filteredData.map((item) => (
                <View key={item.id} style={styles.row}>
                  <Text style={[styles.cell, styles.alignCenter]}>{item.codigoProduto}</Text>
                  <Text style={[styles.cell, styles.alignCenter]}>{item.nome}</Text>
                  <Text style={[styles.cell, styles.alignCenter]}>{item.valorFormatado}</Text>
                  <TouchableOpacity
                    style={styles.editButtonContainer}
                    onPress={() => navigation.navigate('EditProduto', { produtoId: item.id })}
                  >
                    <Text style={styles.editButton}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.editButtonContainer}
                    onPress={() => apagarProduto(item.id)}
                  >
                    <Text style={styles.editButtonDelete}>Deletar</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: 30,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 10,
    marginRight: 80
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 20
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
  editButtonDelete: {
    color: '#ff0000',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});
