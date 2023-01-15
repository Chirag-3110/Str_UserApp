// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Screens/Home';
import ProductDetials from './src/Screens/ProductDetails';
import ProductForm from './src/Screens/ProductForm';
import OrderConfirm from './src/Screens/OrderConfirm';
import Splash from './src/Screens/Splash';
import messaging from '@react-native-firebase/messaging';
import { requestUserPermission,NotificationListner } from './src/utils/Notifications';
const Stack = createNativeStackNavigator();

function App() {

  React.useEffect(()=>{
    requestUserPermission()
    NotificationListner()
  },[])
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductDetials" component={ProductDetials} />
        <Stack.Screen name="ProductForm" component={ProductForm} />
        <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;