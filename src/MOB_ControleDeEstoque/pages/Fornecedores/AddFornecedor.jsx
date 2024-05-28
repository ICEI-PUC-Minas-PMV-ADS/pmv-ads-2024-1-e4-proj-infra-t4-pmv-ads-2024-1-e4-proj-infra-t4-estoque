import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function AddFornecedor() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    codigoFornecedor: "",
    nome: "",
    email: "",
    cnpjCpf: "",
    usuarioId: "474de96f-117e-41f3-a658-8931bda38b07"
  });

  const generateFornecedorCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleChange = (name, value) => {
    if (name === "nome" || name === "email" || name === "cnpjCpf") {
      const codigoFornecedor = generateFornecedorCode();
      setFormData({ ...formData, [name]: value, codigoFornecedor: codigoFornecedor });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`https://localhost:44398/api/Fornecedores/`, formData);
      setTimeout(() => {
        navigation.navigate("Fornecedores", { userId: "474de96f-117e-41f3-a658-8931bda38b07" });
      }, 2000); 
    } catch (error) {
      console.error("Erro ao adicionar fornecedor:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>Novo Fornecedor</Text>
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
