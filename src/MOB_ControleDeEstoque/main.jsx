import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from './pages/Profile';
import Home from "./pages/Home";
import AddProduto from "./pages/Produtos/AddProduto";
import EditProduto from "./pages/Produtos/EditProduto";
import AddFornecedor from "./pages/Fornecedores/AddFornecedor";
import EditFornecedor from "./pages/Fornecedores/EditFornecedor";
import LandingPage from "./pages/Start/LandingPage";
import Login from "./pages/Start/Login";
import Register from "./pages/Start/Register";
import Produtos from './pages/Produtos/Produtos';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="LandingPage">
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
        }}
      />
       <Stack.Screen
        name="Produtos"
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

      <Stack.Screen
        name="Fornecedores"
        component={Home}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="AddFornecedor"
        component={AddFornecedor}
        options={{
          title: "Adicionar Fornecedor",
         
        }}
      />
      <Stack.Screen
        name="EditFornecedor"
        component={EditFornecedor}
        options={{
          title: "Editar Fornecedor",
       
        }}
      />
    </Stack.Navigator>
  );
};

export default Main;
