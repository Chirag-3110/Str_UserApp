import React, { useEffect, useState } from 'react';
import {
    View,
    Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const ProductForm = ({ navigation, route }) => {
    const [fcmToken, setfcmToken] = useState(null);
    const { finalProducts, totalAmt } = route.params;
    const [userSelectedOrders, setUsersSelectedOreders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [allUsersToken, setAllUsersToken] = useState([])
    useEffect(() => {
        setUsersSelectedOreders(finalProducts)
        getFcmToken()
        getAllUsers()
    }, [])
    const getAllUsers = () => {
        firestore().collection('Users').get()
            .then(querySnapShot => {
                const user = querySnapShot._docs.map((token) => {
                    return token._data.UserFcmToken
                })
                setAllUsersToken(user)
            })
            .catch((e) => {
                console.log(e);
            })
    }
    const notificationHandler = () => {
        fetch('https://ordermanagementnotification-production.up.railway.app/triggerNotification', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                tokens: allUsersToken,
                notificationBody: "New Order is recieved"
            })
        })
            .then((res) => res.json())
            .then((data) => console.log(data.message))
            .catch((e) => {
                console.log(e);
            })
    }
    const getFcmToken = async () => {
        const cloudToken = await AsyncStorage.getItem("fcmtoken");
        setfcmToken(cloudToken)
    }
    const checkForDetails = () => {
        try {
            if (name === null)
                throw "Please enter name";
            placeOrderForConfirmation()
        } catch (error) {
            alert(error);
        }
    }
    const placeOrderForConfirmation = () => {
        let finalArrayProducts = [];
        userSelectedOrders.forEach((value) => {
            finalArrayProducts.push({
                dishName: value.name,
                amount: value.addedQuantity,
                price: value.price
            })
        })
        const orderData = {
            storeNumber: "1",
            name: name,
            phone: phone,
            address: "no address",
            order: finalArrayProducts,
            totalAmount: totalAmt,
            FCM_Token: fcmToken
        }
        try {
            setLoading(true);
            fetch("https://ordermanagementserver-production.up.railway.app/orderTaken", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            })
                .then((res) => res.json())
                .then((response) => {
                    console.log(response)
                    notificationHandler();
                    navigation.navigate("OrderConfirm")
                    setLoading(false)

                })
                .catch((e) => {
                    console.log(e);
                    setLoading(false)
                })
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    return (
        <ScrollView style={styles.body}>
            <Text style={styles.heading}>Enter Details</Text>
            <View style={styles.form}>

                <View style={{ marginVertical: 10, }}>
                    <Text style={styles.label}>Name</Text>
                    <View style={styles.container}>
                        <Ionicons name='person' color={'#28CDA9'} size={22} />
                        <TextInput style={{ marginLeft: 7, color: "black" }} placeholderTextColor="black" placeholder='Name'
                            onChangeText={name => setName(name)}
                        />
                    </View>
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.label}>Phone Number</Text>
                    <View style={styles.container}>
                        <MaterialCommunityIcons name='phone' color={'#28CDA9'} size={22} />
                        <TextInput style={{ marginLeft: 7, color: "black" }} placeholderTextColor="black" placeholder='Phone Number'
                            onChangeText={phone => setPhone(phone)}
                            keyboardType={"number-pad"}
                        />
                    </View>
                </View>



            </View>

            <TouchableOpacity style={styles.submitbtn} onPress={checkForDetails}>
                {
                    loading ?
                        <ActivityIndicator size={25} color="white" /> :
                        <Text style={styles.submittext}>Pay Now</Text>
                }
            </TouchableOpacity>
        </ScrollView>
    )
}
export default ProductForm;
const styles = StyleSheet.create({
    body: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "white",
        flex: 1,
    },
    heading: {
        color: "black",
        fontSize: 30,
        // fontWeight: "700",
        fontFamily: "Ubuntu-Bold"
    },
    subheading: {
        color: "grey",
        fontSize: 18,
        marginVertical: 10,
        fontFamily: "Ubuntu-Bold"
    },
    form: {
        marginVertical: 20,
        // marginBottom: 20,
    },
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: "grey,",
        fontFamily: "Ubuntu-Medium"
    },
    container: {
        height: 55,
        backgroundColor: "#F0F0F0",
        flexDirection: "row",
        paddingHorizontal: 15,
        borderWidth: 0.5,
        borderRadius: 5,
        alignItems: "center"
    },
    submitbtn: {
        height: 45,
        width: "100%",
        backgroundColor: "#28CDA9",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginBottom: 40
    },
    submittext: {
        fontSize: 16,
        color: "white",
        fontWeight: "700",
    },
})