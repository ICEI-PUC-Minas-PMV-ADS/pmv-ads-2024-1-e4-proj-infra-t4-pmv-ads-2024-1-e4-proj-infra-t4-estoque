import React, { useState, useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from "react-native";
import { TextInput, Snackbar, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Title from "../../components/Title";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddProduto(onSubmit) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valorUnidade, setValorUnidade] = useState("");
  const [total, setTotal] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [categoria, setCategoria] = useState(0);
  const [estado, setEstado] = useState(0);
  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);
  const [errorVisible, setErrorVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigation = useNavigation();

  const categorias = [
    { value: 0, label: 'Sem Categoria' },
    { value: 1, label: 'Roupa' },
    { value: 2, label: 'Sapato' },
    { value: 3, label: 'Cosmético' },
    { value: 4, label: 'Alimento' },
    { value: 5, label: 'Eletrônico' },
    { value: 6, label: 'Eletrodoméstico' },
  ];

  const estados = [
    { value: 0, label: 'Produtos em boas condições' },
    { value: 1, label: 'Produto danificado' },
    { value: 2, label: 'Produto vencido' },
    { value: 3, label: 'Produto reembolsado' },
    { value: 4, label: 'Produto obsoleto' },
    { value: 5, label: 'Produto vendido - FINALIZADO' },
  ];

  const formatCurrency = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    let formattedValue = numericValue.replace(/\D/g, "");
    formattedValue = (formattedValue / 100).toFixed(2).replace(".", ",");
    formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+,)/g, "$1.");

    return formattedValue;
  };

  const handleValorUnidadeChange = (value) => {
    const formattedValue = formatCurrency(value);
    setValorUnidade(formattedValue);
  };

  const handleQuantidadeChange = (value) => {
    setQuantidade(value);
    calculateTotal(valorUnidade, value);
  };

  const calculateTotal = (valor, quantidade) => {
    const numericValue = valor.replace(/[^0-9]/g, "");
    const valorFloat = parseFloat(numericValue.replace(",", "."));

    const total = valorFloat * parseInt(quantidade);
    const formattedTotal = formatCurrency(total.toString());
    setTotal(formattedTotal);
  };

  const pegandoDados = async () => {
    const userId = await AsyncStorage.getItem('userId');
    try {
      const response = await axios.get(`https://controledeestoqueapi.azurewebsites.net/api/Fornecedores/usuarioIdFornecedores?usuarioId=${userId}`);
      setFornecedores(response.data);
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error);
    }
  };

  useEffect(() => {
    pegandoDados();
  }, []);

  const generateProdutoCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!nome || !descricao || !quantidade || !valorUnidade) {
      setErrorVisible(true);
      return;
    }
  
    try {
      const userId = await AsyncStorage.getItem('userId');
  
      if (!userId) {
        console.error('User ID not found in AsyncStorage');
        return;
      }
  
      const codigoProduto = generateProdutoCode(); 
  
      console.log("Dados a serem enviados para a API:", {
        codigoProduto,
        nome,
        descricao,
        quantidade: parseInt(quantidade),
        valorUnidade: parseFloat(valorUnidade),
        localizacao,
        estadoProduto: estado,
        categoria,
        fornecedorId: fornecedorSelecionado,
        dataDeCriacao: new Date(),
        usuarioId: userId,
      });
  
      const response = await axios.post('https://controledeestoqueapi.azurewebsites.net/api/Produtos', {
        codigoProduto,
        nome,
        descricao,
        quantidade: parseInt(quantidade),
        valorUnidade: parseFloat(valorUnidade),
        localizacao,
        estadoProduto: estado,
        categoria,
        fornecedorId: fornecedorSelecionado,
        dataDeCriacao: new Date(),
        usuarioId: userId,
      });
  
      console.log("Dados do produto enviados com sucesso!", response.data);
  
      setSnackbarMessage('Produto salvo com sucesso!');
      setSnackbarVisible(true);
  
      setTimeout(() => {
        navigation.navigate('Home', { userId: userId });
      }, 3000);
    } catch (error) {
      console.error("Ocorreu um erro ao enviar os dados do produto:", error);
  
      setSnackbarMessage('Ocorreu um erro ao salvar o produto.');
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
              label="Nome do produto *"
              value={nome}
              onChangeText={setNome}
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
              placeholder="Digite o nome do produto"
            />
            <TextInput
              label="Descrição do produto *"
              value={descricao}
              onChangeText={setDescricao}
              style={[styles.InputPadrao, styles.InputDescricao]}
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
              multiline={true}
              numberOfLines={6}
              placeholder="Digite a descrição do produto"
            />
            <View style={styles.InputsLinkados}>
              <TextInput
                label="Quantidade *"
                value={quantidade}
                onChangeText={setQuantidade}
                style={styles.InputMenor}
                keyboardType="numeric"
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
                label="Valor por unidade *"
                value={valorUnidade}
                onChangeText={handleValorUnidadeChange}
                style={styles.InputMenor}
                keyboardType="numeric"
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
            </View>
            <TextInput
              label="Localização"
              value={localizacao}
              onChangeText={setLocalizacao}
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
              placeholder="Digite a localização"
            />

            <Text style={styles.radioLabel}>Selecione uma categoria:</Text>
            <Picker
              selectedValue={categoria}
              style={styles.picker}
              onValueChange={(newCategoria) => setCategoria(newCategoria)}
            >
              {categorias.map(categoria => (
                <Picker.Item key={categoria.value} label={categoria.label} value={categoria.value} />
              ))}
            </Picker>

            <Text style={styles.radioLabel}>Selecione um estado do produto:</Text>
            <Picker
              selectedValue={estado}
              style={styles.picker}
              onValueChange={(newEstado) => setEstado(newEstado)}
            >
              {estados.map(estado => (
                <Picker.Item key={estado.value} label={estado.label} value={estado.value} />
              ))}
            </Picker>

            <Text style={styles.radioLabel}>Escolha na lista de fornecedores:</Text>
            <Picker
              selectedValue={fornecedorSelecionado}
              style={styles.picker}
              onValueChange={(itemValue) => setFornecedorSelecionado(itemValue)}
            >
              <Picker.Item label="Selecione..." value={null} />
              {Array.isArray(fornecedores) && fornecedores.map(fornecedor => (
                <Picker.Item key={fornecedor.id} label={fornecedor.nome} value={fornecedor.id} />
              ))}
            </Picker>
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
  InputDescricao: {
    textAlignVertical: 'top',
  },
  InputMenor: {
    color: 'black',
    marginBottom: 20,
    height: 40,
    width: 130,
  },
  InputsLinkados: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
    marginTop: 30,
    fontWeight: 'bold',
  },
  borda: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
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
