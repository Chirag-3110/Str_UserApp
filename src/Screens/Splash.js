import React, { useEffect } from 'react'
import { View, Dimensions } from 'react-native'
import Lottie from 'lottie-react-native';
// import { navigate } from '@react-navigation/routers/lib/typescript/src/CommonActions';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;

function Splash({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("bottomtab")
        }, 2000);
    }, [])

    return (
        <View style={{ width: windoWidth, height: windoHeight, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
            <Lottie source={require('../lottieFiles/90351-food-app.json')} autoPlay loop style={{ width: windoWidth, height: 400, }} />
        </View>
    )
}

export default Splash