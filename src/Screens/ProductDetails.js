import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, Pressable, Modal, TextInput, TouchableOpacity, RefreshControl, Image, ImageBackground, ImageComponent, ScrollView } from 'react-native';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const DATA = [
    {
        id: 1,
        Image: "https://t3.ftcdn.net/jpg/03/98/52/84/360_F_398528484_ra3Tom42wvihhQfbCXtMqVORILZeUZ5B.jpg",
        Desc: "Veg Momos",
        Price: "200/-"
    },
    {
        id: 2,
        Image: "https://thumbs.dreamstime.com/b/veg-fried-momo-topped-cheese-sauce-served-over-rustic-wooden-background-selective-focus-224001969.jpg",
        Desc: "Cheese Veg Momos",
        Price: "200/-"
    },
    {
        id: 3,
        Image: "https://images.herzindagi.info/image/2019/Mar/cheese-corn-momos-main.jpg",
        Desc: "non-Veg Momo",
        Price: "200/-"
    },
    {
        id: 4,
        Image: "https://foodsfactory.co.in/Fastfood/upload/images/6640-2022-08-27.JPG",
        Desc: "CheesyVegMomo",
        Price: "200/-"
    },
    {
        id: 4,
        Image: "https://foodsfactory.co.in/Fastfood/upload/images/6640-2022-08-27.JPG",
        Desc: "CheesyVegMomo",
        Price: "200/-"
    },
    {
        id: 4,
        Image: "https://foodsfactory.co.in/Fastfood/upload/images/6640-2022-08-27.JPG",
        Desc: "CheesyVegMomo",
        Price: "200/-"
    },
    {
        id: 4,
        Image: "https://foodsfactory.co.in/Fastfood/upload/images/6640-2022-08-27.JPG",
        Desc: "CheesyVegMomo",
        Price: "200/-"
    },
]
const ProductDetials = ({navigation}) => {
    const [counter, setcounter] = useState(1);
    const Increment = () => {
        setcounter(counter + 1)
    }
    const Decrement = () => {
        setcounter(counter - 1)
    }

    return (
        <View style={styles.MainView}>
            <View style={styles.TopView}>
                <Text style={styles.TopViewText}>Cart</Text>
            </View>
            <ScrollView style={styles.MiddleView}>
                {
                    DATA.map((item, index) => (
                        <>
                            <View style={styles.ProInfoBox}>
                                <Image source={{ uri: item.Image }} style={styles.ProImage} />
                                <View style={styles.ProductDescPrice}>
                                    <Text style={styles.DescText}>{item.Desc}</Text>
                                    <Text style={styles.PriceText}>Price : {item.Price}</Text>
                                </View>
                                <View style={styles.QuantityView}>
                                    <View style={styles.MainPSView}>
                                        <TouchableOpacity style={{ justifyContent: "center" }} onPress={Decrement}>
                                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/9146/9146915.png" }} style={styles.IconPlus} />
                                        </TouchableOpacity>
                                        <View>
                                            <Text>{counter}</Text>
                                        </View>
                                        <TouchableOpacity style={{ justifyContent: "center" }} onPress={Increment}>
                                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/9312/9312231.png" }} style={styles.IconPlus} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </>
                    ))
                }
            </ScrollView>
            <View style={styles.BottomView}>
                <View>
                    <Text style={styles.TotalPriceText}>Total Price :900</Text>
                </View>
                <TouchableOpacity style={styles.PayNowBtn}>
                    <Text style={styles.PayNowBtnText} onPress={()=>{navigation.navigate("ProductForm")}}>Pay now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    MainView: {
        height: windoHeight,
        width: windoWidth,
        backgroundColor: "white"
    },
    TopView: {
        width: windoWidth,
        height: windoHeight / 13,
        // borderWidth: 1,
        justifyContent: 'center',
        alignItems: "center",
        // backgroundColor: "#FEF93B"
    },
    TopViewText: {
        fontSize: 22,
        color: "black",
        fontWeight: "700"
    },
    MiddleView: {
        height: windoHeight / 1.3,
        paddingTop: 10,
        // borderWidth: 1
    },
    BottomView: {
        height: windoHeight / 8,
        // borderWidth: 1,
        // justifyContent: "center",
        // alignItems: "center"
    },
    ProImage: {
        width: 80,
        height: 70,
        borderRadius: 8
    },
    ProInfoBox: {
        display: "flex",
        flexDirection: "row",
        // borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 0.3,
        borderBottomColor: "grey",
        alignContent: "center"
    },
    ProductDescPrice: {
        width: windoWidth / 2.5,
        // borderWidth: 1,
        marginHorizontal: 5,
        justifyContent: "flex-start"
    },
    DescText: {
        fontSize: 17,
        color: "black",
        marginLeft: 4
        // alignSelf: "center"
    },
    PriceText: {
        fontSize: 17,
        fontWeight: "800",
        color: "black",
        // alignSelf: "center",
        marginLeft: 5,
        marginVertical: 4
    },
    QuantityText: {
        fontSize: 15,
        color: "green",
        fontWeight: "700",
        alignSelf: "center",
    },
    QuantityView: {
        // borderWidth: 1,

        width: 80,
        justifyContent: "center",
        // alignItems: "center",
        // textAlign: "center",
        // alignSelf: "center"
    },
    TotalPriceText: {
        fontSize: 17,
        color: "black",
        alignSelf: "center",
        fontWeight: "700",
        marginVertical: 10
    },
    PayNowBtn: {
        backgroundColor: "#28CDA9",
        // borderWidth: 1,
        marginHorizontal: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        paddingVertical: 8
    },
    PayNowBtnText: {
        fontSize: 16,
        color: "white",
        fontWeight: "700"
    },
    IconPlus: {
        width: 20,
        height: 20
    },
    MainPSView: {
        display: "flex",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#28CDA9",
        borderRadius: 9,
        padding: 5,
        justifyContent: "space-between"

    }

})
export default ProductDetials;