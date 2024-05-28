import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Text } from "react-native";
import { TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Profile() {
  const [data, setData] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
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
              label="Nome da empresa"
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
            />

            <TextInput
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
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

            <TextInputMask
              type={'cnpj'}
              label="CNPJ"
              value={cnpj}
              onChangeText={setCnpj}
              style={styles.InputPadrao}
              customTextInput={TextInput}
              customTextInputProps={{
                label: 'CNPJ',
                mode: 'outlined',
                theme: {
                  colors: {
                    primary: '#5871fb',
                    underlineColor: 'transparent',
                    background: '#ffffff',
                    placeholder: '#a9a9a9',
                    text: '#000000',
                  },
                },
              }}
            />

            <View style={styles.passwordContainer}>
              <TextInput
                label="Nova Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={[styles.InputSenha, { flex: 1 }]}
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
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.iconButton}
              >
                <Icon name={showPassword ? "visibility" : "visibility-off"} size={24} color="#5871fb" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.salvarButton} onPress={handleSubmit}>
              <Text style={styles.salvarButtonText}>SALVAR E FINALIZAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    marginBottom: 300,
  },
  InputPadrao: {
    fontSize: 16,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  InputSenha: {
    fontSize: 16, 
    height: 40,
    width: 250,
  },
  iconButton: {
    marginLeft: 10,
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
