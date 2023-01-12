// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Screens/Home';
import ProductDetials from './src/Screens/ProductDetails';
import ProductForm from './src/Screens/ProductForm';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductDetials" component={ProductDetials} />
        <Stack.Screen name="ProductForm" component={ProductForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;