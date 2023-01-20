import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const ProductDetials = ({ route, navigation }) => {
    const { selectedOrderArray } = route.params;
    const [finalArray, setfinalArray] = useState([])
    let TP = 0;
    useEffect(() => {
        finalArray.push(...selectedOrderArray)
        CalCuTotalPrice();
    }, [])
    const [counter, setcounter] = useState(1);
    const [TotalPriceFinal, setTotalPriceFinal] = useState(0)
    const Increment = () => {
        setcounter(counter + 1)
    }
    const Decrement = () => {
        setcounter(counter - 1)
    }
    const CalCuTotalPrice = () => {
        console.log("i am called in calc")
        for (i = 0; i < finalArray.length; i++) {
            // console.log(finalArray[i])
            IntegerAmount1 = parseInt(finalArray[i].addedQuantity)
            console.log(IntegerAmount1, "I am quanitty");

            IntegerAmount = parseInt(finalArray[i].price)
            console.log("IntAMourt", IntegerAmount)
            TP = TP + (IntegerAmount * IntegerAmount1);
        }
        const lastAmount = TP
        setTotalPriceFinal(lastAmount)
    }
    const DeleteItem = (id) => {
        if (finalArray.length === 1) {
            navigation.navigate("Home")
            return;
        }
        const newArr = finalArray.filter((obj) => obj.id !== id);
        // console.log("i am hello", newArr)
        setfinalArray(newArr)
        for (i = 0; i < newArr.length; i++) {
            IntegerAmount = parseInt(newArr[i].price)
            console.log("IntAMourt", IntegerAmount)
            TP = TP + IntegerAmount
        }
        const lastAmount = TP
        setTotalPriceFinal(lastAmount)
    }
    return (
        <View style={styles.MainView}>
            <View style={styles.TopView}>
                <Text style={styles.TopViewText}>Cart</Text>
            </View>
            <ScrollView style={styles.MiddleView}>
                {
                    finalArray.map((item, index) => (
                        <>
                            <View key={item.id} style={styles.ProInfoBox}>
                                <Image source={{ uri: item.image }} style={styles.ProImage} />
                                <View style={styles.ProductDescPrice}>
                                    <Text style={styles.DescText}>{item.name}-{item.addedQuantity}</Text>
                                    <Text style={styles.PriceText}>Price : {item.price}</Text>
                                </View>
                                <View style={styles.QuantityView}>
                                    <View style={[styles.MainPSView, { justifyContent: "center", alignItems: "center", backgroundColor: "#28CDA9" }]}>
                                        {/* <TouchableOpacity style={{ justifyContent: "center" }} onPress={Decrement}>
                                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/9146/9146915.png" }} style={styles.IconPlus} />
                                        </TouchableOpacity>
                                        <View>
                                            <Text>{counter}</Text>
                                        </View>
                                        <TouchableOpacity style={{ justifyContent: "center" }} onPress={Increment}>
                                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/9312/9312231.png" }} style={styles.IconPlus} />
                                        </TouchableOpacity> */}
                                        <TouchableOpacity onPress={() => { DeleteItem(item.id) }}>
                                            <Text style={{ textAlign: "center", color: "white" }}>Delete</Text>
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
                    <Text style={styles.TotalPriceText}>Total Price :{TotalPriceFinal}</Text>
                </View>
                <TouchableOpacity style={styles.PayNowBtn} onPress={() => { navigation.navigate("ProductForm", { finalProducts: finalArray, totalAmt: TotalPriceFinal }) }}>
                    <Text style={styles.PayNowBtnText}
                    >Add Instruction</Text>
                </TouchableOpacity>
            </View>
        </View >
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
        fontFamily: "Ubuntu-Bold"
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
        marginLeft: 4,
        fontFamily: "Ubuntu-Medium"
        // alignSelf: "center"
    },
    PriceText: {
        fontSize: 17,
        color: "black",
        // alignSelf: "center",
        marginLeft: 5,
        marginVertical: 4,
        fontFamily: "Ubuntu-Bold"
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
        fontFamily: "Ubuntu-Bold",
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