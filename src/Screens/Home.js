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
const { width, height } = Dimensions.get('window');


const Home = ({ navigation }) => {
    const {userId}=useContext(GlobalVariable)
    const [originalArray, setOriginalArray] = useState([]);
    const [searchedArray, setSearchedArray] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedOrder, setSelectedOrder] = useState([]);
    let [numberOfItems, setNumberOfItems] = useState(null);
    const [showModal,setShowModal]=useState(false);
    const [selectedFoodObject,setSelectedFoodObject]=useState('');
    const [selectedIndex,setSelectedIndex]=useState('')
    const [selectedQuatntitType,setSelectedQuantityType]=useState('full')
    const isFocused = useIsFocused()
    const [isEnabled, setIsEnabled] = useState(false);
    const handleAddons = () => {
        setSearchedArray((item) => {
            item[selectedIndex].setAddon = !item[selectedIndex].setAddon;
            return item
        })
        setIsEnabled(previousState => !previousState)
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

    const handleHalfFull=(item,index)=>{
        if(!item.isSelect && item.isHalf){
            setShowModal(true);
            setSelectedFoodObject(item)
            setSelectedIndex(index)
        }
    }
    const manageHalyFullPlates=(quantityString)=>{
        if(quantityString==='half'){
            setSelectedQuantityType('half');
            setSearchedArray((item) => {
                item[selectedIndex].showIsHalf = true;
                return item
            })
        }
        else {
            setSelectedQuantityType('full');
            setSearchedArray((item) => {
                item[selectedIndex].showIsHalf = false;
                return item
            })
        }
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
        setShowModal(false)
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
        getAllFoodItems()
        setSelectedFoodObject('')
        setSelectedIndex('');
        setSelectedQuantityType('full')
        setSelectedOrder([]);
        updateFCMToken();
    }, [])
    const updateFCMToken=async()=>{
        let FCMToken=await messaging().getToken();
        firestore().collection('Users').doc(userId.uid).update({
            UserFcmToken: FCMToken
        })
    }

    const getAllFoodItems=()=>{
        fetch("https://ordermanagementserver-production.up.railway.app/getfood")
        .then((res)=>res.json())
        .then((data)=>{
            modifyItemsArray(data)
        })
        .catch((e)=>{
            console.log(e);
        })
    }
    const modifyItemsArray = (items) => {
        let newModifiedArray = []
        items.forEach((item) => {
            newModifiedArray.push({ ...item, isSelect: false, addedQuantity: 0 ,showIsHalf:false,setAddon:false})
        })
        setNumberOfItems(null)
        setOriginalArray(newModifiedArray);
        setSearchedArray(newModifiedArray);
    }
    const convertData=(foodItemsArray)=>{
        let newItemArray=[];
        foodItemsArray.forEach((items)=>{
            newItemArray.push({
                id:items._id,
                name:items.foodName,
                isHalfSelected:items.showIsHalf,
                halfQuantity:items.halfQaunt,
                halfPrice:items.halfPrice,
                fullprice:items.fullPrice,
                fullQuantity:items.fullQuant,
                addedQuantity:items.addedQuantity,
                addonsSelected:items.setAddon,
                addonsName:items.nameAddon,
                addonsPrice:items.priceAddon,
                foodImage:items.foodImg
            })
        })
        setIsEnabled(false)
        // console.log(newItemArray);
        navigation.navigate("ProductDetials", { selectedOrderArray: newItemArray });
    }
    return (
        <View style={styles.container}>
            <HomeHeader/>
            <View style={styles.inputContainer}>
                <FontAwesome name='search' color={'#6BB5FF'} size={22} />
                <TextInput style={{ color: "black", fontWeight: "bold" }} placeholder='Search...' placeholderTextColor={'black'} onChangeText={searchKey => searchData(searchKey)} />
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
                                setNumberOfAddings={handleHalfFull}
                                setRemoveListner={handleAmountOfDishes}
                            />
                        )}
                        keyExtractor={item => item._id}
                        ListFooterComponent={
                            <Modal visible={showModal} animationType='slide' transparent={true}>
                                <View style={styles.modeOuter}>
                                    <View style={styles.innnerModel}>
                                    <TouchableOpacity style={styles.modalCloseButton} onPress={()=>{
                                        manageHalyFullPlates('full')
                                        setShowModal(false)
                                    }}>
                                        <FontAwesome name='close' color={'#6BB5FF'} size={22} />
                                    </TouchableOpacity>
                                    <View style={{flexDirection: 'row',justifyContent:"space-evenly",alignItems: 'center',width: '100%',marginVertical:20}}>
                                        <TouchableOpacity 
                                            onPress={()=>manageHalyFullPlates("half")}
                                            style={[
                                                {elevation:10,padding:15,borderRadius:10},
                                                selectedQuatntitType==='half'?{backgroundColor:'#28CDA9'}:{backgroundColor:'white'}
                                            ]}
                                        > 
                                            <Text style={[
                                                {fontWeight:"bold",fontSize:25},
                                                selectedQuatntitType==='half'?{color:'white'}:{color:"black"}
                                            ]}>
                                                Half
                                            </Text>
                                            <Text style={[
                                                {fontWeight:"bold",fontSize:15},
                                                selectedQuatntitType==='half'?{color:'white'}:{color:"black"}
                                            ]}>
                                                {selectedFoodObject.halfPrice} Rs
                                            </Text>
                                            <Text style={[
                                                {fontWeight:"bold",fontSize:15},
                                                selectedQuatntitType==='half'?{color:'white'}:{color:"black"}
                                            ]}>
                                                {selectedFoodObject.halfQaunt}
                                            </Text>
                                        </TouchableOpacity>
                                        <Text style={{color:"black",fontWeight:"bold"}}>Select Quantity</Text>
                                        <TouchableOpacity 
                                            onPress={()=>manageHalyFullPlates("full")}
                                            style={[
                                                {elevation:10,padding:15,borderRadius:10},
                                                selectedQuatntitType==='full'?{backgroundColor:'#28CDA9'}:{backgroundColor:"white"}
                                            ]}
                                        >
                                            <Text style={[
                                                {fontWeight:"bold",fontSize:25},
                                                selectedQuatntitType==='full'?{color:'white'}:{color:'black'}
                                            ]}>
                                                Full
                                            </Text>
                                            <Text style={[
                                                {fontWeight:"bold",fontSize:15},
                                                selectedQuatntitType==='full'?{color:'white'}:{color:'black'}
                                            ]}>
                                                {selectedFoodObject.fullPrice} Rs
                                            </Text>
                                            <Text style={[
                                                {fontWeight:"bold",fontSize:15},
                                                selectedQuatntitType==='full'?{color:'white'}:{color:'black'}
                                            ]}>
                                                {selectedFoodObject.fullQuant}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        selectedFoodObject.isAddon?
                                        <View style={{flexDirection: 'column',width:'100%'}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',padding:10}}>
                                                <Switch
                                                    trackColor={{false: '#767577', true: '#81b0ff'}}
                                                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                                    ios_backgroundColor="#3e3e3e"
                                                    onValueChange={handleAddons}
                                                    value={isEnabled}
                                                />
                                                    <Text style={{color:"black",fontWeight:'700'}}>
                                                        {isEnabled?"Addons Added":"Addons"}
                                                    </Text>
                                            </View>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingHorizontal:30,paddingVertical:10}}>
                                                <Text style={{color:"black",fontWeight:'700'}}>
                                                        {selectedFoodObject.nameAddon} 
                                                    </Text>
                                                    <Text style={{color:"black",fontWeight:'700'}}>
                                                        {selectedFoodObject.priceAddon} Rs
                                                    </Text>
                                            </View>
                                        </View>
                                        :null
                                        }
                                    <ContinueButtonHome
                                        title={"Continue..."}
                                        onpress={()=>addedItems(selectedFoodObject, selectedIndex)}
                                    />
                                    </View>
                                </View>
                            </Modal>
                        }
                    />
            }
            {
                selectedOrder.length === 0 ? null :
                <ContinueButtonHome
                    title={`Proceed to cart : ${numberOfItems}`}
                    onpress={()=>convertData(selectedOrder)}
                />

            }
        </View>

    )
}

export default Home;