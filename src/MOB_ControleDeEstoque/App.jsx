import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./main";

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#5871fb" barStyle="light-content" />
      <Main />
    </NavigationContainer>
  );
};

export default App;
