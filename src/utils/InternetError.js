import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated, Easing, Modal, TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get('window');
import NetInfo from "@react-native-community/netinfo";
const InternetCheck = () => {
    const [isNetOn, setIsnetOn] = useState();
    const [showModel, setShowModel] = useState(false);
    useEffect(() => {
        setShowModel(false);
        checkforNet();
    }, [isNetOn])
    const checkforNet = () => {
        setShowModel(true)
        NetInfo.addEventListener(state => {
            setIsnetOn(state.isConnected);
            setShowModel(!state.isConnected)
        });
    }
    return (
        <Modal visible={showModel} animationType='slide' transparent={true}>
            <View style={styles.modeOuter}>
                <View style={[styles.innnerModel,isNetOn?{backgroundColor:"green"}:{backgroundColor:"red"}]}>
                    <Text style={{color: "white", fontWeight: "bold", fontSize: 15, textAlign: "center", fontFamily: "SourceSansPro-Bold" }}>
                        {
                            "Oops! Internet not Connected"
                        }
                    </Text>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: "space-evenly",
        backgroundColor: "red"
    },
    animatedBox: {
        width: width / 3,
        height: width / 3,
        backgroundColor: "skyblue",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 15,
    },
    modeOuter: {
        // backgroundColor: '#000000aa',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    innnerModel: {
        backgroundColor: 'white',
        // height: height / 4,
        borderRadius: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: width,
        padding:10,
    },
    button: {
        backgroundColor: '#70BBFF',
        width: '70%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    }
})
export default InternetCheck