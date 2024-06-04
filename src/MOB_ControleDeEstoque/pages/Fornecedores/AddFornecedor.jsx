import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { TextInput, Text, Snackbar } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function AddFornecedor() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    codigoFornecedor: "",
    nome: "",
    email: "",
    cnpjCpf: "",
    usuarioId: ""
  });
  const [errorVisible, setErrorVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        setFormData(prevFormData => ({ ...prevFormData, usuarioId: userId }));
      }
    };
    getUserId();
  }, []);

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
    if (!formData.nome || !formData.email || !formData.cnpjCpf) {
      setErrorVisible(true);
      return;
    }

    try {
      await axios.post(`https://controledeestoqueapi.azurewebsites.net/api/Fornecedores/`, formData);
      setSnackbarMessage('Fornecedor salvo com sucesso!');
      setSnackbarVisible(true);
      setTimeout(() => {
        navigation.navigate("Fornecedores", { userId: formData.usuarioId });
      }, 2000);
    } catch (error) {
      console.error("Erro ao adicionar fornecedor:", error);
      setSnackbarMessage('Ocorreu um erro ao salvar o fornecedor.');
      setSnackbarVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.Quadrado}>
            <TextInput
              label="Nome do Fornecedor *"
              value={formData.nome}
              onChangeText={(value) => handleChange("nome", value)}
              style={styles.InputPadrao}
              theme={{
                colors: {
                  primary: '#5871fb',
                  underlineColor: 'transparent',
                  background: '#ffffff',
                  placeholder: '#a9a9a9',
                  text: '#000000',
                },
              }}
              mode="outlined"
              placeholder="Digite o nome do fornecedor"
            />
            <TextInput
              label="Email do Fornecedor *"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              style={styles.InputPadrao}
              theme={{
                colors: {
                  primary: '#5871fb',
                  underlineColor: 'transparent',
                  background: '#ffffff',
                  placeholder: '#a9a9a9',
                  text: '#000000',
                },
              }}
              mode="outlined"
              placeholder="Digite o email do fornecedor"
            />
            <TextInput
              label="CNPJ/CPF do Fornecedor *"
              value={formData.cnpjCpf}
              onChangeText={(value) => handleChange("cnpjCpf", value)}
              style={styles.InputPadrao}
              theme={{
                colors: {
                  primary: '#5871fb',
                  underlineColor: 'transparent',
                  background: '#ffffff',
                  placeholder: '#a9a9a9',
                  text: '#000000',
                },
              }}
              mode="outlined"
              placeholder="Digite o CNPJ ou CPF do fornecedor"
            />
            <TouchableOpacity style={styles.salvarButton} onPress={handleSubmit}>
            <Text style={styles.salvarButtonText}>SALVAR E FINALIZAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Snackbar
      visible={snackbarVisible}
      onDismiss={() => setSnackbarVisible(false)}
      duration={3000}
      action={{
        label: 'Fechar',
        onPress: () => setSnackbarVisible(false),
      }}
      style={{ position: 'top' }}
    >
      {snackbarMessage}
    </Snackbar>

    </KeyboardAvoidingView>
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
  InputPadrao: {
    color: 'black',
    marginBottom: 20,
  },
  salvarButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  salvarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
