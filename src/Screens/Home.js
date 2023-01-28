import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    Switch,
    TextInput,
    Dimensions,
    Image,
    Modal,
    FlatList,
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { GlobalVariable } from '../../App';
import FoodCard from '../components/FoodCard';
import HomeHeader from '../components/HomeHeader';
import ContinueButtonHome from '../components/ContinueButtonHome';
import styles from '../styles/HomeStyle';
import Lottie from 'lottie-react-native';
import items from '../AppData/ItemData';
const { width, height } = Dimensions.get('window');



const Home = ({ navigation }) => {
    const { userId } = useContext(GlobalVariable)
    const [originalArray, setOriginalArray] = useState([]);
    const [searchedArray, setSearchedArray] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedOrder, setSelectedOrder] = useState([]);
    let [numberOfItems, setNumberOfItems] = useState(null);
    const isFocused = useIsFocused()
    
    const handleAddons = (index) => {
        setSearchedArray((item) => {
            item[index].setAddon = !item[index].setAddon;
            return item
        })
    }

    const searchData = (searchItem) => {
        setSearch(searchItem);
        if (search != "") {
            const searchedOrders = originalArray.filter((filteredOrders) => {
                return Object.values(filteredOrders)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchItem.toLowerCase());
            });
            setSearchedArray(searchedOrders);
        } else {
            setSearchedArray(originalArray);
        }
    };
    const getHalfFullVlaue=(index,halySelctor)=>{
        setSearchedArray((item) => {
            item[index].showIsHalf=halySelctor
            return item
        })
    }
    const addedItems = (item, index) => {
        setSearchedArray((item) => {
            item[index].addedQuantity = item[index].addedQuantity + 1;
            item[index].isSelect = true;
            return item
        })
        if (item.addedQuantity == 1) {
            setSelectedOrder([...selectedOrder, item]);
        }
        else {
            setSelectedOrder((seletedOrder) =>
                seletedOrder.map((foodObj) => {
                    if (foodObj.foodName === item.foodName) {
                        foodObj.addedQuantity = foodObj.addedQuantity;
                    }
                    return foodObj;
                })
            );
        }
        numberOfItems++;
        setNumberOfItems(numberOfItems);
    }
    const handleAmountOfDishes = (item, index) => {
        if (item.addedQuantity > 1) {
            setSelectedOrder((seletedOrder) =>
                seletedOrder.map((foodObj) => {
                    if (foodObj.foodName === item.foodName) {
                        foodObj.addedQuantity = foodObj.addedQuantity;
                    }
                    return foodObj;
                })
            );
        }
        else if (item.addedQuantity == 1) {
            setSearchedArray((item) => {
                item[index].isSelect = false;
                return item
            })
            let filteredArray = selectedOrder.filter((orderItem) => {
                return orderItem._id !== item._id
            })
            setSelectedOrder([...filteredArray]);
        }
        setSearchedArray((item) => {
            item[index].addedQuantity = item[index].addedQuantity - 1;
            return item
        })
        numberOfItems--;
        setNumberOfItems(numberOfItems);
    }


    useEffect(() => {
            setSelectedOrder([]);
            getAllFoodItems()
            updateFCMToken();
        if(!isFocused){
            setNumberOfItems(null);
            setSearchedArray([])
            setOriginalArray([]);
            setSelectedOrder([])
        }
    }, [isFocused])
    const updateFCMToken = async () => {
        let FCMToken = await messaging().getToken();
        firestore().collection('Users').doc(userId.uid).update({
            UserFcmToken: FCMToken
        })
    }

    const getAllFoodItems = () => {
        modifyItemsArray(items)
    }
    const modifyItemsArray = (items) => {
        let newModifiedArray = []
        items.forEach((item) => {
            newModifiedArray.push({ ...item, isSelect: false, addedQuantity: 0, showIsHalf: false, setAddon: false })
        })
        setNumberOfItems(null)
        setOriginalArray(newModifiedArray);
        setSearchedArray(newModifiedArray);
    }
    const convertData = (foodItemsArray) => {
        let newItemArray = [];
        foodItemsArray.forEach((items) => {
            newItemArray.push({
                id: items._id,
                name: items.foodName,
                isHalfSelected: items.showIsHalf,
                halfQuantity: items.halfQaunt,
                halfPrice: items.halfPrice,
                fullprice: items.fullPrice,
                fullQuantity: items.fullQuant,
                addedQuantity: items.addedQuantity,
                addonsSelected: items.setAddon,
                addonsName: items.nameAddon,
                addonsPrice: items.priceAddon,
                foodImage: items.foodImg
            })
        })
        navigation.navigate("ProductDetials", { selectedOrderArray: newItemArray });
    }
    return (
        <View style={styles.container}>
            <HomeHeader />
            <View style={styles.inputContainer}>
                <FontAwesome name='search' color={'#6BB5FF'} size={22} />
                <TextInput style={{ color: "black", fontWeight: "bold", width: width / 1.5 }} placeholder='Search...' placeholderTextColor={'black'} onChangeText={searchKey => searchData(searchKey)} />
            </View>
            <Text style={{ color: "#137EFF", fontWeight: "bold", textAlign: "left", fontSize: 25, paddingHorizontal: 10 }}>
                All Orders
            </Text>
            {
                searchedArray.length === 0 ? <View style={{ width: width, height: height, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                    <Lottie source={require('../lottieFiles/59301-burger-loader.json')} autoPlay loop style={{ width: width, height: 400, }} />
                </View> :
                    <FlatList
                        numColumns={2}
                        data={searchedArray}
                        renderItem={({ item, index }) => (
                            <FoodCard
                                foodItem={item}
                                itemIndex={index}
                                setAddedListen={addedItems}
                                setNumberOfAddings={addedItems}
                                setRemoveListner={handleAmountOfDishes}
                                showHalfFullModal={getHalfFullVlaue}
                                handleAddons={handleAddons}
                            />
                        )}
                        keyExtractor={item => item._id}
                    />
            }
            {
                selectedOrder.length === 0 ? null :
                    <ContinueButtonHome
                        title={`Proceed to cart : ${numberOfItems}`}
                        onpress={() => convertData(selectedOrder)}
                    />

            }
        </View>

    )
}

export default Home;