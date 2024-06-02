import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Button, View, Image, Text, TouchableOpacity, TextInput, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {

    const clearOnboarding = async () => {
        try {
            await AsyncStorage.removeItem('@viewedOnboarding');
        } catch {
            console.error('AsyncStorage Error');
        }
    }

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://controledeestoqueapi.azurewebsites.net/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.acessToken) {
                await AsyncStorage.setItem('acessToken', data.acessToken);
                await AsyncStorage.setItem('userId', data.userId);
                console.log('Login successful');
                navigation.navigate('Home', { userId: data.userId });
            } else {
                console.error('Invalid login credentials');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={styles.header}>
                        <Image
                            alt="Logo"
                            resizeMode="contain"
                            style={styles.headerImg}
                            source={require('../../assets/logoM.png')} />

                        <Text style={styles.title}>
                            <Text style={{ color: '#2d48df' }}>Controle de Estoque</Text>
                        </Text>

                        <Text style={styles.subtitle}>
                            Obtenha acesso a todos os recursos do aplicativo
                        </Text>
                    </View>

                    <View style={styles.form}>
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
                            <Text style={styles.inputLabel}>Senha</Text>

                            <TextInput
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                onChangeText={setPassword}
                                placeholder="********"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                secureTextEntry={true}
                                value={password} />
                        </View>

                        <View style={styles.formAction}>
                            <TouchableOpacity
                                onPress={handleSubmit}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>Logar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.formLink}>Esqueceu sua senha?</Text>
                    </View>
                </KeyboardAwareScrollView>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Register');
                    }}
                    style={{ marginTop: 'auto' }}>
                    <Text style={styles.formFooter}>
                        Não possuí uma conta?{' '}
                        <Text style={{ textDecorationLine: 'underline' }}>Cadastrar</Text>
                    </Text>
                </TouchableOpacity>

                {/* <Button title="Botao de teste para resetar Onboarding" onPress={clearOnboarding} /> */}
                <TouchableOpacity />
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
        width: 110,
        height: 110,
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
        color: '#2d48df',
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
        backgroundColor: '#2d48df',
        borderColor: '#2d48df',
    },
    btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },
});

export default Login;