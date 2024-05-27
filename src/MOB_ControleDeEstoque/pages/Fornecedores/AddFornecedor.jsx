import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, Button } from "react-native";

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
    <View>
      <View>
        <Text style={{ fontSize: 40 }}>Novo Fornecedor</Text>
      </View>

      <View>
        <Text>Informação Básica</Text>
        <View>
          <View style={{ display: "none" }}>
            <Text>Código do Fornecedor: </Text>
            <TextInput
              value={formData.codigoFornecedor}
              editable={false}
            />
          </View>
          <View>
            <Text>Nome: <Text>*</Text></Text>
            <TextInput
              value={formData.nome}
              onChangeText={(value) => handleChange("nome", value)}
              required
            />
          </View>
          <View>
            <Text>Email: <Text>*</Text></Text>
            <TextInput
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              required
            />
          </View>
          <View>
            <Text>CNPJ/CPF: <Text>*</Text></Text>
            <TextInput
              value={formData.cnpjCpf}
              onChangeText={(value) => handleChange("cnpjCpf", value)}
              required
            />
          </View>
          <View>
            <Button title="Salvar" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </View>
  );
}
