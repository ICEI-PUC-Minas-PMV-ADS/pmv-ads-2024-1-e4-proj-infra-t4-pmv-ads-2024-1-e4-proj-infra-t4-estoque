import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import AddProduto from "./pages/Produtos/AddProduto";
import EditProduto from "./pages/Produtos/EditProduto";
import AddFornecedor from "./pages/Fornecedores/AddFornecedor";
import EditFornecedor from "./pages/Fornecedores/EditFornecedor";

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
        options={{
          title: "Adicionar Produto",
          headerStyle: { backgroundColor: "#5871fb" },
          headerTintColor: "#fff",  
        }}
      />
      <Stack.Screen
        name="EditProduto"
        component={EditProduto}
        options={{
          title: "Editar Produto",
          headerStyle: { backgroundColor: "#5871fb" },
          headerTintColor: "#fff",  
        }}
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
          headerStyle: { backgroundColor: "#5871fb" },
          headerTintColor: "#fff",  
        }}
      />
      <Stack.Screen
        name="EditFornecedor"
        component={EditFornecedor}
        options={{
          title: "Editar Fornecedor",
          headerStyle: { backgroundColor: "#5871fb" },
          headerTintColor: "#fff", 
        }}
      />
    </Stack.Navigator>
  );
};

export default Main;
