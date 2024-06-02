import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from '../../components/Onboarding';
import Home from '../Home';
import { ActivityIndicator } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import Login from './Login';
import { useNavigation } from '@react-navigation/native';

const Loading = () => {
    <View>
        <ActivityIndicator size='large' />
    </View>
}

const LandingPage = () => {
    const [loading, setLoading] = useState(true);
    const [viewedOnboarding, setViewedOnboarding] = useState(false);
    const navigation = useNavigation();

    const checkOnboarding = async () => {
        try {
            const value = await AsyncStorage.getItem('@viewedOnboarding');

            if (value !== null) {
                setViewedOnboarding(true);
            }
        } catch {
            console.error('AsyncStorage Error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkOnboarding();
    }, [])

    return (
        <View style={styles.container}>
            {loading ? <Loading /> : viewedOnboarding ? <Login /> : <Onboarding navigation={navigation} />}
            <StatusBar style='auto' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LandingPage;