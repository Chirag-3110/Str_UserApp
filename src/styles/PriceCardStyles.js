import { StyleSheet,Dimensions } from "react-native";
const {width,height}=Dimensions.get('window');
const styles=StyleSheet.create({
    itemContainer: {
        width: width / 2.3,
        borderRadius: 10,
        margin: 10,
        alignSelf: "center",
        alignItems: 'center',
        padding: 10,
        elevation: 5,
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
    modeOuter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"transparent"
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
        padding: 20,
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
        alignSelf:"flex-end",
        margin:5
    }
})
export default styles;