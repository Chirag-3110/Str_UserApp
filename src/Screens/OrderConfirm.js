import React, { useEffect } from 'react'
import { View, Dimensions } from 'react-native'
import Lottie from 'lottie-react-native';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;

function OrderConfirm({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Home")
        }, 3000);
    }, [])
    return (
        <View style={{ width: windoWidth, height: windoHeight, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
            <Lottie source={require('../lottieFiles/10470-confirm.json')} autoPlay loop style={{ width: windoWidth, height: 400, }} />
        </View>
    )
}

export default OrderConfirm