import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, FlatList, View, Dimensions, TouchableOpacity, RefreshControl } from 'react-native';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
function Orders() {
  const [allOrderArray, setallOrderArray] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    data();
  }, []);
  const data = async () => {
    setRefreshing(true);
    await fetch(`https://ordermanagementserver-production.up.railway.app/allOrder`, {
      method: "GET",
      headers: {
        'Content-Type': 'application.json'
      },
    }).then((res) => res.json()).then((data) => {
      const NewData = data;
      setallOrderArray(NewData)
      console.log(allOrderArray)
      setRefreshing(false);
    })
      .catch((e) => {
        console.log(e);
        setRefreshing(false);
      })
  }
  return (
    <ScrollView style={styles.MainView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={data} />
      }
    >
      <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 20 }}>
        <Text style={{ fontSize: 20, color: "black", fontFamily: "Ubuntu-Bold" }}>All Order Details</Text>
      </View>
      {
        allOrderArray.length == 0 ? null :
          <FlatList
            inverted
            data={allOrderArray}
            keyExtractor={item => item._id}
            renderItem={({ item, index }) => (
              <View style={styles.itemCard}>
                <Text style={[styles.basicText, { fontSize: 20 }]}>
                  Order ID : {item._id}
                </Text>
                <Text style={[styles.basicText, { fontSize: 15, marginVertical: 5 }]}>
                  Order by : {item.name}
                </Text>
                <Text style={[styles.basicText, { fontSize: 15, }]}>
                  Contect Number : {item.phone}
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", }}>
                  {/* <Text style={[styles.dynamicTextStyle,item.payment?{backgroundColor:"rgba(5,140,0,0.50)",}:{backgroundColor:"rgba(217,0,4,0.5)",}]}>
                  Payment {item.payment?"Done":"Pending"}
                </Text> */}
                  <Text style={[styles.dynamicTextStyle, item.prepared ? { backgroundColor: "rgba(5,140,0,0.50)", } : { backgroundColor: "rgba(217,0,4,0.5)", }]}>
                    Order {item.prepared ? "Done" : "Pending"}
                  </Text>
                </View>
                <ScrollView
                  horizontal={true}
                  style={{ margin: 10 }}
                  showsHorizontalScrollIndicator={false}
                >
                  {
                    item.order.map((order) => (
                      <View style={{ margin: 10, backgroundColor: "white", elevation: 5, padding: 10, borderRadius: 5, paddingVertical: 15 }}>
                        <Text style={[styles.dishCardText, { fontSize: 20 }]}>{order.dishName}</Text>
                        <Text style={styles.dishCardText}>{order.amount}</Text>
                        <Text style={styles.dishCardText}>{order.price} Rs</Text>
                      </View>
                    ))
                  }
                </ScrollView>
                <Text style={{ color: "black", fontWeight: "700", fontSize: 20, }}>
                  Total amount : {item.totalAmount} Rs
                </Text>
              </View>
            )}
          />
      }
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: "white",
  },
  //mine
  itemCard: {
    width: windoWidth - 30,
    backgroundColor: "white",
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    elevation: 20,
    margin: 10,
    borderRadius: 10
  },
  basicText: {
    color: "black",
    fontWeight: "700"
  },
  dynamicTextStyle: {
    color: "white",
    fontWeight: "700",
    fontSize: 13,
    padding: 10,
    marginTop: 15,
    borderRadius: 5,
    width: '40%',
    textAlign: "center"
  },
  dishCardText: {
    color: "black",
    fontWeight: "500",
    fontSize: 15
  }
});
export default Orders