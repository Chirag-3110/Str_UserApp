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
import { requestUserPermission,NotificationListner } from './src/utils/Notifications';
import Bottomtab from './navigators/Bottomtab';
import InternetCheck from './src/utils/InternetError';
import SignIn from './src/Screens/Auth/Login';
import SignUp from './src/Screens/Auth/Signup';
import ForgotPass from './src/Screens/Auth/forgotPass';

const Stack = createNativeStackNavigator();

function App() {

  React.useEffect(()=>{
    requestUserPermission()
    NotificationListner()
  },[])
  return (
    <>
     <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="login" component={SignIn} />
            <Stack.Screen name="signup" component={SignUp} />
            <Stack.Screen name="forgotpass" component={ForgotPass} />
            <Stack.Screen name="bottomtab" component={Bottomtab}/>
            <Stack.Screen name="ProductDetials" component={ProductDetials} />
            <Stack.Screen name="ProductForm" component={ProductForm} />
            <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
          </Stack.Navigator>
      </NavigationContainer>
      <InternetCheck/>
     </>
  
  );
}

export default App;