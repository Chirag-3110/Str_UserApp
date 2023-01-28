import React,{useEffect, useState} from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    Switch
} from 'react-native';
import styles from '../styles/PriceCardStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ContinueButtonHome from './ContinueButtonHome';
import PriceCard from './PriceCard';
import AddonSelector from './AddonsSelector';

const FoodCard=(props)=>{
    const [item,setItem]=useState(props.foodItem)
    const [isEnabled, setIsEnabled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedQuatntitType, setSelectedQuantityType] = useState('full')

    const handleAddons = () => {
        props.handleAddons(props.itemIndex)
        setIsEnabled(previousState => !previousState)
    }

    const setSelected=(item)=>{
        props.setAddedListen(item,props.itemIndex);
    }

    const setSelectedForPuls=(item,index)=>{
        props.setNumberOfAddings(item,index);
        setShowModal(false)
    }
    const manageHalyFullPlates = (quantityString) => {
        if (quantityString === 'half') {
            setSelectedQuantityType('half');
            props.showHalfFullModal(props.itemIndex,true)
        }
        else {
            setSelectedQuantityType('full');
            props.showHalfFullModal(props.itemIndex,false)
        }
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
                    onPress={() => {
                        if(item.isHalf){
                            setShowModal(true)   
                        }                
                        else{
                            setSelectedForPuls(item, props.itemIndex)
                        }
                    }}
                >
                    <Text style={{ fontSize: 15, fontWeight: "700", color: "#28CDA9" }}>Add</Text>
                </TouchableOpacity>
            }
            <Modal visible={showModal} animationType='slide' transparent={true}>
                <View style={styles.modeOuter}>
                    <View style={styles.innnerModel}>
                        <TouchableOpacity style={styles.modalCloseButton} onPress={() => {
                            setShowModal(false)
                        }}>
                            <FontAwesome name='close' color={'#6BB5FF'} size={22} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: "space-evenly", alignItems: 'center', width: '100%', marginVertical: 20 }}>
                            <PriceCard
                                onpress={() => manageHalyFullPlates("half")}
                                selectedType={selectedQuatntitType}
                                foodQtyType={'half'}
                                foodObjPrice={item.halfPrice}
                                foodObjQut={item.halfQaunt}
                            />
                            <Text style={{ color: "black", fontWeight: "bold" }}>Select Quantity</Text>
                            <PriceCard
                                onpress={() => manageHalyFullPlates("full")}
                                selectedType={selectedQuatntitType}
                                foodQtyType={'full'}
                                foodObjPrice={item.fullPrice}
                                foodObjQut={item.fullQuant}
                            />
                        </View>
                        {
                            item.isAddon ?
                            <AddonSelector
                                value={isEnabled}
                                nameAddon={item.nameAddon}
                                priceAddons={item.priceAddon}
                                handleAddons={handleAddons}
                            />:null
                        }
                        <ContinueButtonHome
                            title={"Continue..."}
                            onpress={() => setSelectedForPuls(item, props.itemIndex)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
} 
export default FoodCard;