import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import Lottie from 'lottie-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import items from '../AppData/ItemData';
const { width, height } = Dimensions.get('window');
const Home = ({ navigation }) => {
    const [searchedArray, setSearchedArray] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedOrder, setSelectedOrder] = useState([]);
    let [numberOfItems, setNumberOfItems] = useState(null);
    const searchData = (searchItem) => {
        setSearch(searchItem);
        if (search != "") {
            const searchedOrders = items.filter((filteredOrders) => {
                return Object.values(filteredOrders)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchItem.toLowerCase());
            });
            setSearchedArray(searchedOrders);
        } else {
            setSearchedArray(items);
        }
    };
    const addedItems = (item) => {
        setSelectedOrder([...selectedOrder, item]);
        numberOfItems++;
        setNumberOfItems(numberOfItems);
    }
    useEffect(() => {
        setSearchedArray(items)
    }, [])
    return (
        <ScrollView style={styles.container}>
            <Text style={{ color: "#137EFF", fontWeight: "600", padding: 15, fontSize: 25, backgroundColor: "white", borderBottomRightRadius: 20, borderBottomLeftRadius: 20, elevation: 10 }}>Welcome ! User</Text>
            <View style={styles.inputContainer}>
                <FontAwesome name='search' color={'#6BB5FF'} size={22} />
                <TextInput style={{ color: "black", fontWeight: "bold" }} placeholder='Search...' placeholderTextColor={'black'} onChangeText={searchKey => searchData(searchKey)} />
            </View>
            <Text style={{ color: "#137EFF", fontWeight: "bold", textAlign: "left", fontSize: 25, paddingHorizontal: 10 }}>
                All Orders
            </Text>
            <View style={{ flexWrap: "wrap", flexDirection: "row", alignSelf: "center", width, justifyContent: 'center', }}>
                {
                    searchedArray.map((val) => (
                        <View style={styles.itemContainer} key={val.id}>
                            <Image
                                source={{ uri: val.image }}
                                style={{ width: '95%', height: 80, resizeMode: "contain", borderRadius: 10 }}
                            />
                            <View style={{ width: '95%', paddingVertical: 10 }}>
                                <Text style={{ color: "#137EFF", fontWeight: "bold", textAlign: "left", fontSize: 13 }}>
                                    {val.name}
                                </Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-around", margin: 10 }}>
                                    <Text style={{ color: "#137EFF", fontWeight: "500", textAlign: "left", fontSize: 12 }}>
                                        {val.quantity}
                                    </Text>
                                    <Text style={{ color: "#137EFF", fontWeight: "500", textAlign: "left", fontSize: 12 }}>
                                        for
                                    </Text>
                                    <Text style={{ color: "#137EFF", fontWeight: "500", textAlign: "left", fontSize: 12 }}>
                                        {val.price}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.buttonBody}
                                onPress={() => addedItems(val)}
                            >
                                <Text style={{ color: "black", fontSize: 15, fontWeight: "700", color: "#28CDA9" }}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View>
            {
                selectedOrder.length === 0 ? null :
                    <TouchableOpacity style={styles.cartButton}
                        onPress={() => navigation.navigate("ProductDetials", { selectedOrderArray: selectedOrder })}
                    >
                        <Text style={{ color: "white", fontWeight: "600", fontSize: 15 }}>Proceed to cart : {numberOfItems}</Text>
                    </TouchableOpacity>
            }
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: "white",
        margin: 10,
        borderRadius: 5,
        elevation: 10
    },
    itemContainer: {
        width: width / 2.3,
        borderRadius: 10,
        margin: 10,
        alignSelf: "center",
        alignItems: 'center',
        padding: 10,
        elevation: 5,
        paddingVertical: 20,
        backgroundColor: "white",
        marginTop: 10
    },
    buttonBody: {
        width: '90%',
        height: 35,
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#28CDA9",
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 5
    },
    cartButton: {
        width: width - 20,
        height: 45,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "#28CDA9",
        alignSelf: "center",
        margin: 25,
        borderRadius: 5
    }
})
export default Home;