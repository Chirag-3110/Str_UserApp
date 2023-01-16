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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import items from '../AppData/ItemData';
const { width, height } = Dimensions.get('window');
const Home = ({ navigation }) => {
    const [allOrder,setAllorders]=useState([])
    const [searchedArray, setSearchedArray] = useState([]);
    let [mangingSearchArray,setManagingSearchArray]=useState([]);
    const [search, setSearch] = useState("");
    const [selectedOrder, setSelectedOrder] = useState([]);
    let [numberOfItems, setNumberOfItems] = useState(null);
    const searchData = (searchItem) => {
        setSearch(searchItem);
        if (searchItem != "") {
            const searchedOrders = mangingSearchArray.filter((filteredOrders) => {
                return Object.values(filteredOrders)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchItem.toLowerCase());
            });
            setManagingSearchArray(searchedOrders);
        } else {
            setManagingSearchArray(allOrder);
        }
    };
    const addedItems = (item,index) => {
        console.log(item.addedQuantity);
        if(item.addedQuantity<1){
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
        setManagingSearchArray((item)=>{
            item[index].addedQuantity=item[index].addedQuantity+1;
            item[index].isSelect=true;
            return item
        })
        numberOfItems++;
        setNumberOfItems(numberOfItems);
    }
    const handleAmountOfDishes=(item,index)=>{
        setManagingSearchArray((item)=>{
            item[index].addedQuantity=item[index].addedQuantity-1;
            return item
        })
        if(item.addedQuantity>1){
            setSelectedOrder((seletedOrder) =>
                seletedOrder.map((foodObj) => {
                    if (foodObj.name === item.name) {
                        foodObj.addedQuantity=item.addedQuantity;
                    }
                    return foodObj;
                })
            );
        }
        else if(item.addedQuantity==1){
            setManagingSearchArray((item)=>{
                item[index].isSelect=false;
                return item
            })
            let filteredArray=selectedOrder.filter((orderItem)=>{
                return orderItem.id!==item.id
            })
            setSelectedOrder([...filteredArray]);
        }
        console.log(item.addedQuantity);
        numberOfItems--;
        setNumberOfItems(numberOfItems);
    }
    useEffect(() => {
        modifyItemsArray()
    }, [])
    const modifyItemsArray=()=>{
        let newModifiedArray=[]
        items.forEach((item)=>{
            newModifiedArray.push({...item,isSelect:false,addedQuantity:0})
        })
        setAllorders(newModifiedArray);
        setManagingSearchArray(newModifiedArray);
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
            <ScrollView>
                <View style={{ flexWrap: "wrap", flexDirection: "row", alignSelf: "center", width, justifyContent: 'center', }}>
                    {
                        mangingSearchArray.length===0?null:
                        mangingSearchArray.map((val,index) => (
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
                                {
                                    val.addedQuantity>0?
                                    <View style={{flexDirection:"row",justifyContent: 'space-around',width:"100%",alignItems: 'center',height: 35,}}>
                                        <TouchableOpacity style={styles.smallButtonBody} onPress={()=>handleAmountOfDishes(val,index)}>
                                            <Text style={styles.smallButtons}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.smallButtons}>{val.addedQuantity}</Text>
                                        <TouchableOpacity style={styles.smallButtonBody} onPress={() => addedItems(val,index)}>
                                            <Text style={styles.smallButtons}>+</Text>
                                        </TouchableOpacity>
                                    </View>:
                                    <TouchableOpacity style={styles.buttonBody}
                                        onPress={() => addedItems(val,index)}
                                    >
                                        <Text style={{ fontSize: 15, fontWeight: "700",color: "#28CDA9" }}>Add</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
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