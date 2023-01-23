import React,{useState} from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
const {width,height}=Dimensions.get('window');

const FoodCard=(props)=>{
    const [item,setItem]=useState(props.foodItem)

    const setSelected=(item)=>{
        props.setAddedListen(item,props.itemIndex);
    }

    const setSelectedForPuls=(item,index)=>{
        props.setNumberOfAddings(item,index);
    }

    
    return(
        <View style={styles.itemContainer} key={item._id}> 
            <Image
                source={{ uri: item.foodImg }}
                style={{ width: '95%', height: 80, resizeMode: "contain", borderRadius: 10 }}
            />
            <View style={{ width: '95%', paddingVertical: 10 }}>
                <Text style={{ color: "#137EFF", fontWeight: "bold", textAlign: "left", fontSize: 13 }}>
                    {item.foodName}
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10 }}>
                    <Text style={{ color: "#137EFF", fontWeight: "500", textAlign: "left", fontSize: 12 }}>
                        {item.showIsHalf?item.halfQaunt:item.fullQuant}
                    </Text>
                    <Text style={{ color: "#137EFF", fontWeight: "500", textAlign: "left", fontSize: 12 }}>
                        {item.showIsHalf?item.halfPrice:item.fullPrice} Rs
                    </Text>
                </View>
            </View>
            {
                item.addedQuantity > 0 ?
                <View style={{ flexDirection: "row", justifyContent: 'space-around', width: "100%", alignItems: 'center', height: 35, }}>
                    <TouchableOpacity style={styles.smallButtonBody} 
                        onPress={() => props.setRemoveListner(item,props.itemIndex)}
                    >
                        <Text style={styles.smallButtons}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.smallButtons}>{item.addedQuantity}</Text>
                    <TouchableOpacity style={styles.smallButtonBody} 
                        onPress={() => setSelected(item)
                    }>
                        <Text style={styles.smallButtons}>+</Text>
                    </TouchableOpacity>
                </View> :
                <TouchableOpacity style={styles.buttonBody}
                    onPress={() => setSelectedForPuls(item,props.itemIndex)}
                >
                    <Text style={{ fontSize: 15, fontWeight: "700", color: "#28CDA9" }}>Add</Text>
                </TouchableOpacity>
            }
        </View>
    )
} 
const styles=StyleSheet.create({
    itemContainer: {
        width: width / 2.3,
        borderRadius: 10,
        margin: 10,
        alignSelf: "center",
        alignItems: 'center',
        padding: 10,
        elevation: 5,
        // paddingVertical: 20,
        backgroundColor: "white",
        marginTop: 10
    },
    smallButtons: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
    },
    smallButtonBody: {
        backgroundColor: "white",
        height: 25,
        width: 25,
        alignItems: "center",
        justifyContent: 'center',
        elevation: 5,
        borderRadius: 2
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
})
export default FoodCard;