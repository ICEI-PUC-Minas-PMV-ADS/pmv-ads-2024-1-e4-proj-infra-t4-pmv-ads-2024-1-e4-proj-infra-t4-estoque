import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { TextInput, Snackbar, Text } from 'react-native-paper';

export default function EditFornecedor() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [formData, setFormData] = useState({
    codigoFornecedor: "",
    nome: "",
    email: "",
    cnpjCpf: "",
  });

  const [errorVisible, setErrorVisible] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.nome || !formData.email || !formData.cnpjCpf) {
      setErrorVisible(true);
      return;
    }

    try {
      await axios.put(`https://localhost:44398/api/Fornecedores/${id}`, formData);
      console.log("Dados do fornecedor atualizados com sucesso!");
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
        console.error("Erro ao buscar dados do fornecedor:", error);
      }
    };

    fetchFornecedorData();
  }, [id]);

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
              label="Código do Fornecedor"
              value={formData.codigoFornecedor}
              editable={false}
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
            />
            <TextInput
              label="Nome *"
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
              label="Email *"
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
              label="CNPJ/CPF *"
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
              placeholder="Digite o CNPJ/CPF do fornecedor"
            />
            <TouchableOpacity style={styles.salvarButton} onPress={handleSubmit}>
              <Text style={styles.salvarButtonText}>SALVAR E FINALIZAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Snackbar
        visible={errorVisible}
        onDismiss={() => setErrorVisible(false)}
        duration={3000}
        action={{
          label: 'Fechar',
          onPress: () => setErrorVisible(false),
        }}
        style={{ position: 'top' }}
      >
        Preencha todos os campos obrigatórios.
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
    marginTop: 20
  },
  salvarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
