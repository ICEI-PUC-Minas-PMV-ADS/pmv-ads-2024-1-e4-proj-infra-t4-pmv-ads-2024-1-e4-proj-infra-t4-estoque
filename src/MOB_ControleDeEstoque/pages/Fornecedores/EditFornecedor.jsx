import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function EditFornecedor() {
  const route = useRoute();
  const { id } = route.params;

  const [formData, setFormData] = useState({
    codigoFornecedor: "",
    nome: "",
    email: "",
    cnpjCpf: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`https://localhost:44398/api/Fornecedores/${id}`, formData);
      setTimeout(() => {
        navigation.navigate("Fornecedores", { userId: "474de96f-117e-41f3-a658-8931bda38b07" });
      }, 2000); 
    } catch (error) {
      console.error("Erro ao editar fornecedor:", error);
    }
  };

  useEffect(() => {
    const fetchFornecedorData = async () => {
      try {
        const response = await axios.get(`https://localhost:44398/api/Fornecedores/${id}`);
        const fornecedorData = response.data;
        setFormData(fornecedorData);
      } catch (error) {
        console.log(id);
        console.error("Erro ao buscar dados do fornecedor:", error);
      }
    };

    fetchFornecedorData();
  }, [id]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>Editar Fornecedor</Text>
      </View>

      <View>
        <Text style={styles.subHeaderText}>Informação Básica</Text>
        <View>
          <View style={styles.hiddenField}>
            <Text>Código do Fornecedor: </Text>
            <TextInput
              value={formData.codigoFornecedor}
              editable={false}
              style={styles.input}
            />
          </View>
          <View style={styles.field}>
            <Text>Nome: <Text>*</Text></Text>
            <TextInput
              value={formData.nome}
              onChangeText={(value) => handleChange("nome", value)}
              required
              style={styles.input}
            />
          </View>
          <View style={styles.field}>
            <Text>Email: <Text>*</Text></Text>
            <TextInput
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              required
              style={styles.input}
            />
          </View>
          <View style={styles.field}>
            <Text>CNPJ/CPF: <Text>*</Text></Text>
            <TextInput
              value={formData.cnpjCpf}
              onChangeText={(value) => handleChange("cnpjCpf", value)}
              required
              style={styles.input}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Salvar" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5"
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "start",
    color: "#333"
  },
  subHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#666"
  },
  hiddenField: {
    display: "none"
  },
  field: {
    marginBottom: 20
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff"
  },
  buttonContainer: {
    marginTop: 20
  }
});
