
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const PriceCard=(props)=>{

    return(
        <TouchableOpacity
            onPress={props.onpress}
            style={[
                {elevation:10,padding:15,borderRadius:10},
                props.selectedType===props.foodQtyType?{backgroundColor:'#28CDA9'}:{backgroundColor:'white'}
            ]}
        > 
            <Text style={[
                {fontWeight:"bold",fontSize:25},
                props.selectedType===props.foodQtyType?{color:'white'}:{color:"black"}
            ]}>
                {props.foodQtyType}
            </Text>
            <Text style={[
                {fontWeight:"bold",fontSize:15},
                props.selectedType===props.foodQtyType?{color:'white'}:{color:"black"}
            ]}>
                {props.foodObjPrice} Rs
            </Text>
            <Text style={[
                {fontWeight:"bold",fontSize:15},
                props.selectedType===props.foodQtyType?{color:'white'}:{color:"black"}
            ]}>
                {props.foodObjQut}
            </Text>
        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({

})
export default PriceCard;