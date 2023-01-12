import React, { useEffect } from 'react';
import {
    View,
    Text, StyleSheet, TextInput, TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ProductForm = () => {

    return (
        <View style={styles.body}>

            {/* <Text style={styles.heading}>Product Form</Text> */}
            <Text style={styles.heading}>Enter Details</Text>

            <View style={styles.form}>

                <Text style={styles.label}>Email</Text>
                <View style={styles.container}>
                    <MaterialCommunityIcons name='email' color={'#28CDA9'} size={22} />
                    <TextInput style={{ marginLeft: 7 }} placeholder='Email' />
                </View>
                <View style={{ marginVertical: 10, }}>

                    <Text style={styles.label}>Name</Text>
                    <View style={styles.container}>
                        <Ionicons name='person' color={'#28CDA9'} size={22} />
                        <TextInput style={{ marginLeft: 7 }} placeholder='Name' />
                    </View>
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.label}>Address</Text>
                    <View style={styles.container}>
                        <Ionicons name='ios-location-sharp' color={'#28CDA9'} size={22} />
                        <TextInput style={{ marginLeft: 7 }} placeholder='Address' />
                    </View>
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.label}>Phone Number</Text>
                    <View style={styles.container}>
                        <MaterialCommunityIcons name='phone' color={'#28CDA9'} size={22} />
                        <TextInput style={{ marginLeft: 7 }} placeholder='Phone Number' />
                    </View>
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.label}>Preparation Instructions</Text>
                    <View style={styles.container}>
                        <Ionicons name='basket-sharp' color={'#28CDA9'} size={22} />
                        <TextInput style={{ marginLeft: 7 }} placeholder='Preparation Instructions' />
                    </View>
                </View>

            </View>

            <TouchableOpacity style={styles.submitbtn}>
                <Text style={styles.submittext}>Pay Now</Text>
            </TouchableOpacity>
        </View>
    )
}
export default ProductForm;
const styles = StyleSheet.create({
    body: {
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: "white",
        flex: 1
    },
    heading: {
        color: "black",
        fontSize: 30,
        fontWeight: "700"
    },
    subheading: {
        color: "grey",
        fontSize: 18,
        marginVertical: 10
    },
    form: {
        marginVertical: 20,
        marginBottom: 20
    },
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: "grey,"
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
        borderRadius: 8
    },
    submittext: {
        fontSize: 16,
        color: "white",
        fontWeight: "700"
    },
})