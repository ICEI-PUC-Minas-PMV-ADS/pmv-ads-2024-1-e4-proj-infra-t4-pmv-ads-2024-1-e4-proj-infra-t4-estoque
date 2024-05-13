import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';


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
      </Stack.Navigator>
   
  );
};

export default Main;
