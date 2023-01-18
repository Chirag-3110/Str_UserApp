import React, { useState, useEffect, useRef } from "react";
import { View, Text, ActivityIndicator, TextInput, Dimensions, TouchableOpacity, Animated, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const windowWidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height
import styles from "./style";
import Lottie from 'lottie-react-native';
const SignUp = ({ navigation }) => {

    const [loading,setLoading]=useState(false)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('');
    const [Cpassword, setCpassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    useEffect(() => {
        showPopUp();
    }, [])
    const position = new Animated.ValueXY({ x: 0, y: -windowheight });
    const subTextposition = new Animated.ValueXY({ x: 0, y: -windowheight });
    const showPopUp = () => {
        Animated.timing(subTextposition, {
            toValue: { x: 0, y: -windowheight / 300 },
            duration: 1000,
            useNativeDriver: true
        }).start(() => {
            Animated.timing(position, {
                toValue: { x: 0, y: -windowheight / 300 },
                duration: 500,
                useNativeDriver: true
            }).start();
        });
    }
    return (
        <View style={styles.container}>
            <View>
                <Animated.Text style={[
                    styles.MainText,
                    {
                        transform: [
                            { translateX: position.x },
                            { translateY: position.y }
                        ]
                    }
                ]}>Sign Up</Animated.Text>
                <Animated.Text style={[
                    styles.MainText,
                    {
                        fontSize: 25,
                        marginLeft: 30,
                        transform: [
                            { translateX: subTextposition.x },
                            { translateY: subTextposition.y }
                        ]
                    }
                ]}>Connect With Us</Animated.Text>
                <Lottie
                    source={require('../../lottieFiles/105639-signup.json')} autoPlay={true} loop={true}
                    style={{ width: windowWidth, height: windowWidth - 50, resizeMode: "contain" }}
                />
            </View>
            <View style={{ alignItems: "center", width: "100%" }}>
                <View>
                    <View style={[
                        { flexDirection: 'row', alignItems: "center" },
                        styles.customInput
                    ]}
                    >
                        <FontAwesome name="user" size={25} color={"grey"} />
                        <TextInput
                            style={{ flex: 1, fontWeight: "bold", fontSize: 15, color: "black", paddingLeft: 10,fontFamily:"SourceSansPro-Bold"}}
                            placeholder="Email"
                            placeholderTextColor={"grey"}
                            onChangeText={value => { setemail(value) }}
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
                            style={{ flex: 1, fontWeight: "bold", fontSize: 15, color: "black", paddingLeft: 10,fontFamily:"SourceSansPro-Bold" }}
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
                <View style={{ marginTop: 10 }}>
                    <View style={[
                        { flexDirection: 'row', alignItems: "center" },
                        styles.customInput
                    ]}
                    >
                        <FontAwesome name="lock" size={25} color={"grey"} />
                        <TextInput
                            style={{ flex: 1, fontWeight: "bold", fontSize: 15, color: "black", paddingLeft: 10,fontFamily:"SourceSansPro-Bold" }}
                            placeholder={"Confirm Password"}
                            placeholderTextColor={"grey"}
                            secureTextEntry={showPassword}
                            onChangeText={value => { setCpassword(value) }}
                            autoCapitalize={true}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.btnContainer}>
                    {
                        loading?
                        <ActivityIndicator size={25} color={"white"}/>:
                        <Text style={[styles.btnText,{fontFamily:"SourceSansPro-Bold"}]}>
                            Create Account
                        </Text>
                    }
                </TouchableOpacity>
                <View style={styles.bottomText}>
                    <Text style={[styles.subText, { color: "black", fontWeight: "bold", marginRight: 10,fontFamily:"SourceSansPro-Bold" }]}>Already have an account?</Text>
                    <Text style={[styles.subText, { color: "blue", fontWeight: "bold" ,fontFamily:"SourceSansPro-Bold"}]} onPress={() => navigation.navigate("login")}>Log In</Text>
                </View>
            </View>
        </View>
    )
}
export default SignUp;