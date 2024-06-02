import React, { useState } from 'react';
import { Alert, StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            const response = await fetch('https://controledeestoqueapi.azurewebsites.net/api/Auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName, cnpj, email, password, confirmPassword })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('User created successfully');
            loginLink();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            <Text style={{ color: '#075eec' }}>Controle de Estoque</Text>
                        </Text>

                        <Text style={styles.subtitle}>
                            Cadastre-se para obter acesso aos recursos
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Nome completo</Text>

                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                keyboardType="default"
                                onChangeText={setName}
                                placeholder="João da Silva"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                value={userName} />
                        </View>

                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>E-mail</Text>

                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                keyboardType="email-address"
                                onChangeText={setEmail}
                                placeholder="joao@exemplo.com"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                value={email} />
                        </View>

                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Cnpj</Text>

                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                keyboardType="numeric"
                                onChangeText={setCnpj}
                                placeholder="12.345.678/9012-34"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                value={cnpj} />
                        </View>

                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Senha</Text>

                            <TextInput
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                onChangeText={setPassword}
                                placeholder="Deve possuir no mínimo 8 caracteres e conter letras e números"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                secureTextEntry={true}
                                value={password} />
                        </View>

                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Confirme sua senha</Text>

                            <TextInput
                                autoCorrect={false}

                                clearButtonMode="while-editing"
                                onChangeText={setConfirmPassword}
                                placeholder="********"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                secureTextEntry={true}
                                value={confirmPassword} />

                        </View>

                        <View style={styles.formAction}>
                            <TouchableOpacity
                                onPress={handleRegister}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>Criar conta</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                    style={{ marginTop: 'auto' }}>
                    <Text style={styles.formFooter}>
                        Já possuí uma conta?{' '}
                        <Text style={{ textDecorationLine: 'underline' }}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    title: {
        fontSize: 31,
        fontWeight: '700',
        color: '#1D2A32',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 36,
    },
    headerImg: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginBottom: 36,
    },
    form: {
        marginBottom: 24,
        paddingHorizontal: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    formAction: {
        marginTop: 4,
        marginBottom: 16,
    },
    formLink: {
        fontSize: 16,
        fontWeight: '600',
        color: '#075eec',
        textAlign: 'center',
    },
    formFooter: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
        letterSpacing: 0.15,
    },
    input: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
    },
    inputControl: {
        height: 50,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
        borderWidth: 1,
        borderColor: '#C9D3DB',
        borderStyle: 'solid',
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#075eec',
        borderColor: '#075eec',
    },
    btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },
});

export default Register;