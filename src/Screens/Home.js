import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import items from '../AppData/ItemData';
const { width, height } = Dimensions.get('window');
import { useIsFocused } from '@react-navigation/native'
const Home = ({ navigation }) => {
    const [originalArray,setOriginalArray]=useState([]);
    const [searchedArray, setSearchedArray] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedOrder, setSelectedOrder] = useState([]);
    let [numberOfItems, setNumberOfItems] = useState(null);
    const isFocused = useIsFocused()
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
    const addedItems = (item,index) => {
        setSearchedArray((item)=>{
            item[index].addedQuantity=item[index].addedQuantity+1;
            item[index].isSelect=true;
            return item
        })
        if(item.addedQuantity==1){
            setSelectedOrder([...selectedOrder, item]);
        }
        else{
            setSelectedOrder((seletedOrder) =>
                seletedOrder.map((foodObj) => {
                    if (foodObj.name === item.name) {
                        foodObj.addedQuantity=foodObj.addedQuantity;
                    }
                    return foodObj;
                })
            );
        }
        numberOfItems++;
        setNumberOfItems(numberOfItems);
        console.log(selectedOrder.length);
    }
    const handleAmountOfDishes=(item,index)=>{
        if(item.addedQuantity>1){
            setSelectedOrder((seletedOrder) =>
                seletedOrder.map((foodObj) => {
                    if (foodObj.name === item.name) {
                        foodObj.addedQuantity=foodObj.addedQuantity;
                    }
                    return foodObj;
                })
            );
        }
        else if( item.addedQuantity==1){
            setSearchedArray((item)=>{
                item[index].isSelect=false;
                return item
            })
            let filteredArray=selectedOrder.filter((orderItem)=>{
                return orderItem.id!==item.id
            })
            setSelectedOrder([...filteredArray]);
        }
        setSearchedArray((item)=>{
            item[index].addedQuantity=item[index].addedQuantity-1;
            return item
        })
        numberOfItems--;
        setNumberOfItems(numberOfItems);
    }
    useEffect(() => {
        modifyItemsArray()
        setSelectedOrder([]);
    }, [isFocused])
    const modifyItemsArray=()=>{
        console.log('l');
        let newModifiedArray=[]
        items.forEach((item)=>{
            newModifiedArray.push({...item,isSelect:false,addedQuantity:0})
        })
        setNumberOfItems(null)
        setOriginalArray(newModifiedArray);
        setSearchedArray(newModifiedArray);
    }
    return (
        <View style={styles.container}>
            <Text style={{ color: "#137EFF", fontWeight: "600", padding: 15, fontSize: 25, backgroundColor: "white", borderBottomRightRadius: 20, borderBottomLeftRadius: 20, elevation: 10 }}>Welcome ! User</Text>
            <View style={styles.inputContainer}>
                <FontAwesome name='search' color={'#6BB5FF'} size={22} />
                <TextInput style={{ color: "black", fontWeight: "bold" }} placeholder='Search...' placeholderTextColor={'black'} onChangeText={searchKey => searchData(searchKey)} />
            </View>
            <Text style={{ color: "#137EFF", fontWeight: "bold", textAlign: "left", fontSize: 25, paddingHorizontal: 10 }}>
                All Orders
            </Text>
            {
                originalArray.length===0?null:
                <FlatList
                    numColumns={2}
                    data={searchedArray}
                    renderItem={({item,index}) => (
                        <View style={styles.itemContainer} key={item.id}>
                            <Image
                                source={{ uri: item.image }}
                                style={{ width: '95%', height: 80, resizeMode: "contain", borderRadius: 10 }}
                            />
                            <View style={{ width: '95%', paddingVertical: 10 }}>
                                <Text style={{ color: "#137EFF", fontWeight: "bold", textAlign: "left", fontSize: 13 }}>
                                    {item.name}
                                </Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-around", margin: 10 }}>
                                    <Text style={{ color: "#137EFF", fontWeight: "500", textAlign: "left", fontSize: 12 }}>
                                        {item.quantity}
                                    </Text>
                                    <Text style={{ color: "#137EFF", fontWeight: "500", textAlign: "left", fontSize: 12 }}>
                                        for
                                    </Text>
                                    <Text style={{ color: "#137EFF", fontWeight: "500", textAlign: "left", fontSize: 12 }}>
                                        {item.price}
                                    </Text>
                                </View>
                            </View>
                            {
                                item.addedQuantity>0?
                                <View style={{flexDirection:"row",justifyContent: 'space-around',width:"100%",alignItems: 'center',height: 35,}}>
                                    <TouchableOpacity style={styles.smallButtonBody} onPress={()=>handleAmountOfDishes(item,index)}>
                                        <Text style={styles.smallButtons}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.smallButtons}>{item.addedQuantity}</Text>
                                    <TouchableOpacity style={styles.smallButtonBody} onPress={() => addedItems(item,index)}>
                                        <Text style={styles.smallButtons}>+</Text>
                                    </TouchableOpacity>
                                </View>:
                                <TouchableOpacity style={styles.buttonBody}
                                    onPress={() => addedItems(item,index)}
                                >
                                    <Text style={{ fontSize: 15, fontWeight: "700",color: "#28CDA9" }}>Add</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            }
            {
                selectedOrder.length === 0 ? null :
                    <TouchableOpacity style={styles.cartButton}
                        onPress={()=>navigation.navigate("ProductDetials", { selectedOrderArray: selectedOrder })}
                    >
                        <Text style={{ color: "white", fontWeight: "600", fontSize: 15 }}>Proceed to cart : {numberOfItems}</Text>
                    </TouchableOpacity>
            } 
        </View>
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
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 5,
        borderColor: "#28CDA9"
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
    },
    smallButtons:{
        color:"black",
        fontWeight:"bold",
        fontSize:20,
    },
    smallButtonBody:{
        backgroundColor:"white",
        height:25,
        width:25,
        alignItems:"center",
        justifyContent: 'center',
        elevation:5,
        borderRadius:2
    }
})
export default Home;