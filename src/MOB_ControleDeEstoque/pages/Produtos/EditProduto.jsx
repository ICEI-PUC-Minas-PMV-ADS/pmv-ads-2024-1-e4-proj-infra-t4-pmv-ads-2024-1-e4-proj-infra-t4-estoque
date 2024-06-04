import React, { useState, useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from "react-native";
import { TextInput, Snackbar, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProduto() {
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
  const [codigoProduto, setCodigoProduto] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

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

  const route = useRoute();
  const navigation = useNavigation();
  const { produtoId } = route.params;

  const formatCurrency = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    let formattedValue = numericValue.replace(/\D/g, "");
    formattedValue = (formattedValue / 100).toFixed(2).replace(".", ",");
    formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+,)/g, "$1.");

    return formattedValue;
  };

  const handleValorUnidadeChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setValorUnidade(numericValue);
    calculateTotal(numericValue, quantidade);
  };

  const handleQuantidadeChange = (value) => {
    setQuantidade(value);
    calculateTotal(valorUnidade, value);
  };

  const calculateTotal = (valor, quantidade) => {
    const valorFloat = parseFloat(valor.replace(",", "."));
    const total = valorFloat * parseInt(quantidade);
    const formattedTotal = formatCurrency(total.toString());
    setTotal(formattedTotal);
  };

  const pegandoDados = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await axios.get(`https://controledeestoqueapi.azurewebsites.net/api/Fornecedores/usuarioIdFornecedores?usuarioId=${userId}`);
      setFornecedores(response.data);
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error);
    }
  };

  const buscarProduto = async () => {
    try {
      const response = await axios.get(`https://controledeestoqueapi.azurewebsites.net/api/Produtos/${produtoId}`);
      const produto = response.data;
      setNome(produto.nome);
      setDescricao(produto.descricao);
      setQuantidade(produto.quantidade.toString());
      setValorUnidade(produto.valorUnidade.toString());
      setLocalizacao(produto.localizacao);
      setCategoria(produto.categoria);
      setEstado(produto.estadoProduto);
      setFornecedorSelecionado(produto.fornecedorId);
      setCodigoProduto(produto.codigoProduto);
      calculateTotal(produto.valorUnidade.toString(), produto.quantidade.toString());
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
    }
  };

  useEffect(() => {
    pegandoDados();
    buscarProduto();
  }, []);

  const handleSubmit = async () => {
    if (!nome || !descricao || !quantidade || !valorUnidade) {
      setErrorVisible(true);
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      await axios.put(`https://controledeestoqueapi.azurewebsites.net/api/Produtos/${produtoId}`, {
        nome: nome,
        descricao: descricao,
        quantidade: parseInt(quantidade),
        valorUnidade: parseFloat(valorUnidade.replace(",", ".")),
        localizacao: localizacao,
        estadoProduto: estado,
        categoria: categoria,
        fornecedorId: fornecedorSelecionado,
        codigoProduto: codigoProduto,
        dataDeCriacao: new Date(),
        usuarioId: userId
      });
      console.log("Dados do produto atualizados com sucesso!");
      setTimeout(() => {
        navigation.navigate("Produtos", { userId: userId });
      }, 2000);
    } catch (error) {
      console.error("Ocorreu um erro ao atualizar os dados do produto:", error);
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
                onChangeText={handleQuantidadeChange}
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
                value={formatCurrency(valorUnidade)}
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

            <Text style={styles.radioLabel}>Selecione um fornecedor:</Text>
            <Picker
              selectedValue={fornecedorSelecionado}
              style={styles.picker}
              onValueChange={(itemValue) => setFornecedorSelecionado(itemValue)}
            >
              {fornecedores.map(fornecedor => (
                <Picker.Item key={fornecedor.id} label={fornecedor.nome} value={fornecedor.id} />
              ))}
            </Picker>

            <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
              <Text style={styles.textoBotao}>Salvar alterações</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Snackbar
        visible={errorVisible}
        onDismiss={() => setErrorVisible(false)}
        duration={3000}
        style={{ backgroundColor: 'red' }}
      >
        Por favor, preencha todos os campos obrigatórios.
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  Quadrado: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    maxWidth: 500,
  },
  InputPadrao: {
    marginBottom: 10,
  },
  InputDescricao: {
    height: 100,
  },
  InputsLinkados: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  InputMenor: {
    flex: 1,
    marginHorizontal: 5,
  },
  radioLabel: {
    marginTop: 15,
    marginBottom: 5,
    color: '#a9a9a9',
  },
  picker: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#5871fb',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
