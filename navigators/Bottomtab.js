import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../src/Screens/Home';
import Orders from '../src/Screens/Orders';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
const Tab = createBottomTabNavigator();

const Bottomtab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: false,
        showIcon: false,
        tabBarStyle: [{
          position: "absolute",
          // bottom: 5,
          // left: 3,
          // right: 3,
          elevation: 3,
          backgroundColor: "#ffffff",
          height: 55,
          zIndex: 1,
          borderRadius: 5,
          // borderWidth: 1,
          borderTopWidth: 1,
          borderTopColor: "black"
          // shadowColor: '#28CDA9',
        },],

      }}>

      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons name="menu-book" color={focused ? '#047BD5' : 'black'} size={22} />
            <Text style={{ color: focused ? '#047BD5' : 'black', fontFamily: "SourceSansPro-Regular" }}>Menu</Text>
          </View>
        )
      }} />
      <Tab.Screen name="Orders" component={Orders} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons name="fastfood" color={focused ? '#047BD5' : 'black'} size={22} />
            <Text style={{ color: focused ? '#047BD5' : 'black', fontFamily: "SourceSansPro-Regular" }}>Orders</Text>
          </View>
        )
      }} />
    </Tab.Navigator>
  )
}

export default Bottomtab

const styles = StyleSheet.create({})