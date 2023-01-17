import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Dimensions, TouchableOpacity } from 'react-native';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
function Orders() {
  const [allOrderArray, setallOrderArray] = useState([]);
  useEffect(() => {
    data();
  }, [allOrderArray]);
  const data = async () => {
    await fetch(`https://ordermanagementserver-production.up.railway.app/allOrder`, {
      method: "GET",
      headers: {
        'Content-Type': 'application.json'
      },
    }).then((res) => res.json()).then((data) => {
      const NewData = data;
      setallOrderArray(NewData)
    })
  }
  return (
    <ScrollView style={styles.MainView}>
      <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 20 }}>
        <Text style={{ fontSize: 20, color: "black", fontFamily: "Ubuntu-Bold" }}>All Order Details</Text>
      </View>
      {
        allOrderArray.length == 0 ? null :
          allOrderArray.map((item) => (
            item.prepared == false ?
              <View style={[styles.BoxView,]} key={item._id}>
                <View>
                  <Text style={{ fontSize: 16, color: "black", fontFamily: "Ubuntu-Bold", marginVertical: 10, marginHorizontal: 10 }}>Item Details</Text>
                  {
                    item.order.map((value) => (
                      <>
                        <Text key={value._id} style={{ fontSize: 20, color: "black", margin: 5, fontFamily: "Ubuntu-Regular" }}>dishName: {value.dishName} - ({value.amount})</Text>
                        <Text style={{ fontSize: 20, color: "black", margin: 5, fontFamily: "Ubuntu-Regular" }}>price: {value.price}</Text>
                      </>
                    ))
                  }
                </View>
                <View>
                  <Text style={{ fontSize: 20, color: "green", margin: 10, fontFamily: "Ubuntu-Medium" }}>Order By: {item.name}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 20, color: "green", margin: 10, fontFamily: "Ubuntu-Medium" }}>Order ID: {item._id}</Text>
                </View>
                <View>
                  <Text style={[styles.TextPrice, { marginHorizontal: 10 }]}>Phone :{item.phone}</Text>
                </View>
                <View>
                  <Text style={[styles.TextPrice, { marginHorizontal: 10, marginVertical: 20 }]}>Address :{item.address}</Text>
                </View>
                <View style={styles.DetailView}>
                </View>
              </View>
              : <View style={[styles.BoxView, { backgroundColor: "#E6F8D5" }]} key={item._id}>
                <View>
                  {/* <Text style={{ fontSize: 17, color: "black", alignSelf: "center", fontFamily: "Ubuntu-Bold" }}>Order Details:</Text> */}
                  <Text style={{ fontSize: 16, color: "black", fontFamily: "Ubuntu-Bold", marginVertical: 10, marginHorizontal: 10 }}>Item Details</Text>
                  {
                    item.order.map((value) => (
                      <>
                        <Text key={value._id} style={{ fontSize: 20, color: "black", margin: 5, fontFamily: "Ubuntu-Regular" }}>dishName: {value.dishName} - ({value.amount})</Text>
                        {/* <Text style={{ fontSize: 20, color: "black", margin: 5, fontFamily: "Ubuntu-Regular" }}>quantity: {value.amount}</Text> */}
                        <Text style={{ fontSize: 20, color: "black", margin: 5, fontFamily: "Ubuntu-Regular" }}>price: {value.price}</Text>
                      </>
                    ))
                  }
                </View>
                <View>
                  <Text style={{ fontSize: 20, color: "green", margin: 10, fontFamily: "Ubuntu-Medium" }}>Order By: {item.name}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 20, color: "green", margin: 10, fontFamily: "Ubuntu-Medium" }}>Order ID: {item._id}</Text>
                </View>
                <View>
                  <Text style={[styles.TextPrice, { marginHorizontal: 10 }]}>Phone :{item.phone}</Text>
                </View>
                <View>
                  <Text style={[styles.TextPrice, { marginHorizontal: 10, marginVertical: 20 }]}>Address :{item.address}</Text>
                </View>
                <View style={styles.DetailView}>
                  {/* <Text style={styles.TextPrice}>Amount :{item.totalAmount}</Text>
                               <TouchableOpacity style={styles.Amount}>
                                   <Text style={{ color: "green", fontSize: 20, fontWeight: "600" }}>Ok</Text>
                               </TouchableOpacity> */}
                </View>
                {/* <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                               <TouchableOpacity style={styles.OrderReadyView}>
                                   <Text style={styles.OrderReadyText}>Ready</Text>
                               </TouchableOpacity>
                               <TouchableOpacity style={[styles.OrderReadyView, { backgroundColor: "red", borderColor: "white" }]}>
                                   <Text style={[styles.OrderReadyText, { color: "white" }]}>Cancel</Text>
                               </TouchableOpacity>
                           </View> */}
              </View>
          ))
      }
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  MainView: {
    backgroundColor: "white",
    width: windoWidth,
    height: windoHeight
  },
  BoxView: {
    marginHorizontal: 10,
    marginVertical: 7,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FEF8FB"
  },
  DetailView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 10
  },
  Amount: {
    borderWidth: 1,
    padding: 6,
    borderRadius: 4,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderColor: "green"
  },
  TextPrice: {
    fontSize: 20,
    fontFamily: "Ubuntu-Medium",
    color: "black"
  },
  OrderReadyView: {
    borderRadius: 4,
    paddingVertical: 7,
    marginVertical: 20,
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 6,
    width: windoWidth / 2.5,
    borderColor: "#09A124",
    borderWidth: 1
  },
  OrderReadyText: {
    fontSize: 15,
    color: "green"
  }
});
export default Orders