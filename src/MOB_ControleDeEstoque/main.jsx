import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import AddProduto from './pages/Produtos/AddProduto';
import EditProduto from './pages/Produtos/EditProduto';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (

    <Stack.Navigator initialRouteName="Home">
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
        options={{ title: 'Adicionar Produto' }}
      />
      <Stack.Screen
        name="EditProduto"
        component={EditProduto}
        options={{ title: 'Editar Produto' }}
      />
    </Stack.Navigator>

  );
};

export default Main;
