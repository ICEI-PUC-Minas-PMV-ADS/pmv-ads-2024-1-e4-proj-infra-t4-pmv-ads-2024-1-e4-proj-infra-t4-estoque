import React, { useState } from "react";
import { BottomNavigation, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Produtos from "../pages/Produtos/Produtos";
import Admin from "./Admin";
import Fornecedores from "./Fornecedores/Fornecedores";

const Home = () => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "produtos", title: "Produtos", icon: "archive-outline" },
    { key: "fornecedores", title: "Fornecedores", icon: "forwardburger" },
    { key: "admin", title: "Administração", icon: "chart-bar-stacked" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    produtos: Produtos,
    fornecedores: Fornecedores,
    admin: Admin,
  });

  const renderIcon = ({ route, focused, color }) => {
    const { icon } = route;
    return <Icon name={icon} size={24} color={color} />;
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderIcon={renderIcon}
    />
  );
};

export default Home;
