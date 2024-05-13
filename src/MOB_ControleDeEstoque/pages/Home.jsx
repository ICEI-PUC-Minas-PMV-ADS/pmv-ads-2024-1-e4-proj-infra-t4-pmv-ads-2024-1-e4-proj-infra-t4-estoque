import React, { useState } from "react";
import { BottomNavigation, Text } from "react-native-paper";

import Fornecedores from "./Fornecedores";
import Produtos from "./Produtos";
import Admin from "./Admin";

const Home = () => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "produtos", title: "Produtos", icon: "gas-station" },
    { key: "fornecedores", title: "Fornecedores", icon: "calculator" },
    { key: "admin", title: "Administração", icon: "admin" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    produtos: Produtos,
    fornecedores: Fornecedores,
    admin: Admin,
  });

  return (
    <>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
};

export default Home;
