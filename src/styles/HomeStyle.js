import {Dimensions, StyleSheet} from 'react-native';
const { width, height } = Dimensions.get('window');
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
    radioButtonOut:{
        width:20,
        height:20,
        borderRadius:20/2,
        backgroundColor:"white",
        alignItems:"center",
        justifyContent: 'center',
        elevation:10,
        alignSelf:"flex-end"
    },
    
})
export default styles;