import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import AddProduto from './pages/Produtos/AddProduto';
import EditProduto from './pages/Produtos/EditProduto';
import Profile from './pages/Profile';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5871fb',
        },
        headerTintColor: '#ffffff', 
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="AddProduto"
        component={AddProduto}
        options={{ title: 'ADICIONAR PRODUTO' }}
      />
      <Stack.Screen
        name="EditProduto"
        component={EditProduto}
        options={{ title: 'EDITAR PRODUTO' }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'CONFIGURAÇÃO DE PERFIL' }}
      />
    </Stack.Navigator>
  );
};

export default Main;
