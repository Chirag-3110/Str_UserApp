// In App.js in a new project

import React ,{useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

function App() {

  useEffect(()=>{
    requestUserPermission()
    NotificationListner()
  },[])
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  return (
    <>
     <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="login">
            {
              user==null?
              <>
                {/* <Stack.Screen name="Splash" component={Splash} /> */}
                <Stack.Screen name="login" component={SignIn} />
                <Stack.Screen name="signup" component={SignUp} />
                <Stack.Screen name="forgotpass" component={ForgotPass} />
              </>
                :
              <>
                <Stack.Screen name="bottomtab" component={Bottomtab}/>
                <Stack.Screen name="ProductDetials" component={ProductDetials} />
                <Stack.Screen name="ProductForm" component={ProductForm} />
                <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
              </>
            }
          </Stack.Navigator>
      </NavigationContainer>
      <InternetCheck/>
     </>
  
  );
}

export default App;