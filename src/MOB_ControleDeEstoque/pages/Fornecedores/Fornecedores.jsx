import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { Ionicons } from '@expo/vector-icons';

export default function Fornecedores() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();

  const fornecedoresGet = async () => {
    try {
      const response = await axios.get(`https://localhost:44398/api/Fornecedores/usuarioIdFornecedores?usuarioId=474de96f-117e-41f3-a658-8931bda38b07`);
      setData(response.data);
      setFilteredData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fornecedoresGet();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const newData = data.filter(item => 
      item.nome.toLowerCase().includes(query.toLowerCase()) ||
      item.cnpjCpf.toLowerCase().includes(query.toLowerCase()) ||
      item.codigoFornecedor.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(newData);
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Title title="FORNECEDORES" />
        <View style={styles.Quadrado}>
          <View style={styles.buttonsContainer}>
            <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
            <TextInput
              placeholder="Pesquisar..."
              value={searchQuery}
              onChangeText={handleSearch}
              style={styles.searchInput}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddFornecedor')}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.header}>CÓDIGO</Text>
              <Text style={styles.header}>NOME</Text>
              <Text style={styles.header}>CNPJ</Text>
              <Text style={styles.header}>EDIT</Text>
            </View>
            {filteredData.length === 0 ? (
              <Text style={styles.emptyText}>Nenhum fornecedor cadastrado.</Text>
            ) : (
              filteredData.map((item) => (
                <View key={item.id} style={styles.row}>
                  <Text style={[styles.cell, styles.alignCenter]}>{item.codigoFornecedor}</Text>
                  <Text style={[styles.cell, styles.alignCenter]}>{item.nome}</Text>
                  <Text style={[styles.cell, styles.alignCenter]}>{item.cnpjCpf}</Text>
                  <TouchableOpacity
                    style={styles.editButtonContainer}
                    onPress={() => navigation.navigate('EditFornecedor', { id: item.id })}
                  >
                    <Text style={styles.editButton}>Edit</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
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
  searchIcon: {
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
    marginRight: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
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
