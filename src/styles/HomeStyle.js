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
    modeOuter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#000000aa"
    },
    innnerModel: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom:0,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        padding:5,
        backgroundColor:"white",
        height:height/2.5,
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    modalCloseButton:{
        width:35,
        height:35,
        backgroundColor:"white",
        elevation:10,
        borderRadius:35/2,
        alignItems: 'center',
        justifyContent: 'center',
        position:"absolute",
        top:15,
        right: 15,
    }
})
export default styles;