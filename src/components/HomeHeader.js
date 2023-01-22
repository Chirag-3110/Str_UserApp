import React,{useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
const HomeHeader=()=>{

    const logOut=()=>{
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    }
    return(
        <View style={{ padding: 15, backgroundColor: "white", borderBottomRightRadius: 20, borderBottomLeftRadius: 20, elevation: 10,flexDirection:"row",justifyContent:"space-between" }}>
            <Text style={{color: "#137EFF", fontWeight: "600",fontSize: 25,}}>Welcome</Text>
            <TouchableOpacity 
                onPress={logOut}
                style={styles.logOutButton}
            >
                <Text style={{color: "#137EFF", fontWeight: "600", fontSize: 15,}}>LogOut</Text>
            </TouchableOpacity>
        </View>
    )
} 
const styles=StyleSheet.create({
    logOutButton:{
        backgroundColor:"white",
        elevation:5,
        alignItems: 'center',
        justifyContent: 'center',
        width:100,
        borderRadius:5
    },
})
export default HomeHeader;