import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, Image, ScrollView, Animated, ActivityIndicator } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Lottie from 'lottie-react-native';
import styles from "./style";
import auth from '@react-native-firebase/auth';

const SignIn = ({ navigation }) => {

    useEffect(() => {
        showPopUp();
    }, [])
    const [loading, setLoading] = useState(false);
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    const position = new Animated.ValueXY({ x: 0, y: -windowheight });
    const showPopUp = () => {
        Animated.timing(position, {
            toValue: { x: 0, y: -windowheight / 200 },
            duration: 1000,
            useNativeDriver: true
        }).start(() => {
            Animated.timing(position, {
                toValue: { x: windowWidth / 4, y: 0 },
                duration: 1000,
                useNativeDriver: true
            }).start();
        });
    }
    const login = () => {
        try {
            if (email === '')
                throw "Enter email"
            if (password === '')
                throw "Enter Password"
            setLoading(true)
            auth().signInWithEmailAndPassword(email, password)
                .catch((error) => {
                    if (error.code === 'auth/invalid-email') {
                        alert("Invalid Email")
                    }
                    if (error.code === 'auth/wrong-password') {
                        alert("Incorrect Password")
                    }
                    if (error.code === 'auth/user-not-found') {
                        alert("user not exists")
                    }
                    setLoading(false);
                })
        } catch (error) {
            setLoading(false);
            alert(error);
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ alignItems: "flex-start", justifyContent: 'center' }}>
                <Animated.Text style={[
                    styles.MainText,
                    {
                        fontFamily: "SourceSansPro-Bold",
                        transform: [
                            { translateX: position.x },
                            { translateY: position.y }
                        ]
                    }
                ]}>Sign In</Animated.Text>
                <Lottie
                    source={require('../../lottieFiles/124956-login.json')} autoPlay={true} loop={false}
                    style={{ width: windowWidth, resizeMode: "contain" }}
                />
            </View>
            <View style={{ alignItems: "center", }}>
                <View>
                    <View style={[
                        { flexDirection: 'row', alignItems: "center" },
                        styles.customInput
                    ]}
                    >
                        <FontAwesome name="user" size={25} color={"grey"} />
                        <TextInput
                            style={{ flex: 1, fontWeight: "bold", fontSize: 15, color: "black", paddingLeft: 10, }}
                            placeholder={"Email"}
                            placeholderTextColor={"grey"}
                            onChangeText={value => { setemail(value) }}
                            autoCapitalize={true}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={[
                        { flexDirection: 'row', alignItems: "center" },
                        styles.customInput
                    ]}
                    >
                        <FontAwesome name="lock" size={25} color={"grey"} />
                        <TextInput
                            style={{ flex: 1, fontWeight: "bold", fontSize: 15, color: "black", paddingLeft: 10, }}
                            placeholder={"Password"}
                            placeholderTextColor={"grey"}
                            secureTextEntry={showPassword}
                            onChangeText={value => { setpassword(value) }}
                            autoCapitalize={true}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} >
                            {
                                showPassword ?
                                    <FontAwesome name="eye" size={25} color={"grey"} /> :
                                    <FontAwesome name="eye-slash" size={25} color={"grey"} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <TouchableOpacity
                    style={{ width: "100%", alignItems: "center", marginTop: 10 }}
                    onPress={() => navigation.navigate("forgotpass")}
                >
                    <Text style={{
                        color: "black",
                        fontWeight: "bold",
                    }}>
                        Forgot Password ?
                    </Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={[styles.btnContainer, { marginVertical: 10 }]} onPress={login}>
                    {
                        loading ?
                            <ActivityIndicator color={'white'} size={30} /> :
                            <Text style={[styles.btnText,]}>
                                Login
                            </Text>
                    }
                </TouchableOpacity>
                <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "black", }}>Don't Have an Account ? </Text>
                    <Text
                        style={{ fontSize: 15, fontWeight: "bold", color: "#28CDA9", }}
                        onPress={() => navigation.navigate("signup")}
                    >
                        Create Account
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default SignIn;