import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    await getFCMToken();
  }
}

const getFCMToken=async()=>{
    let fcmtoken=await AsyncStorage.getItem("fcmtoken");
    console.log(fcmtoken,'toen');
    if(!fcmtoken){
        try {
          let FCMToken=await messaging().getToken();
          if(FCMToken){
              AsyncStorage.setItem("fcmtoken",FCMToken);
          }
        } catch (error) {
            console.log(error);
        }
    }
}

export const NotificationListner=()=>{
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });
      messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
      messaging().onMessage(async remoteMessage=>{
        console.log("Message in foregroung",remoteMessage);
      })

}