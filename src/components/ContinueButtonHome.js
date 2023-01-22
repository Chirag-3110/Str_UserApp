import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window');
const ContinueButtonHome=(props)=>{

    return(
        <TouchableOpacity style={styles.cartButton}
            onPress={props.onpress}
        >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 15 }}>{props.title}</Text>
        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    cartButton: {
        width: width - 20,
        height: 40,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "#28CDA9",
        alignSelf: "center",
        marginBottom: 3,
        borderRadius: 5,
    },
})

export default ContinueButtonHome;