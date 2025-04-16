// import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     GetFCMToken();
//   }
// }
// async function GetFCMToken() {
//   let fcmtoken = await AsyncStorage.getItem('fcmtoken');
//   console.log(fcmtoken, 'old token');
//   if (!fcmtoken) {
//     try {
//       let fcmtoken = messaging().getToken();
//       if (fcmtoken) {
//         await AsyncStorage.setItem("fcmtoken",fcmtoken);
//       } else {
//       }
//     } catch (err) {
//         console.log(err,"error in fcmtoken");
//     }
//   }
// }
// export const NotificationLister = () => {
//     messaging().onNotificationOpenedApp(remoteMessage=>{
//         console.log('Notifiction caused app to open for backgraoud state:',remoteMessage.notification);
//     });
//     messaging().getInitialNotification().then(remoteMessage=>{
//         if(remoteMessage){
//             console.log("Notification caued app to open from quit state:",remoteMessage.notification);
//         }
//     });
//     messaging().onMessage(async remoteMessage=>{
//         console.log("Notification on froground state....",remoteMessage);
//     });

// };
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    await registerForRemoteMessages();  // Register the device first
    await GetFCMToken();  // Then try to get the token
  }
}

async function registerForRemoteMessages() {
  try {
    await messaging().registerDeviceForRemoteMessages();
    console.log("Device registered for remote messages");
  } catch (error) {
    console.log("Error registering for remote messages:", error);
  }
}

async function GetFCMToken() {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  console.log(fcmtoken, 'old token');
  if (!fcmtoken) {
    try {
      const newToken = await messaging().getToken();  // Get the FCM token
      if (newToken) {
        await AsyncStorage.setItem("fcmtoken", newToken);  // Save the token
        console.log('New token saved:', newToken);
      }
    } catch (err) {
      console.log(err, "error in fcmtoken");
    }
  }
}

export const NotificationLister = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification caused app to open from background state:', remoteMessage.notification);
  });

  messaging().getInitialNotification().then(remoteMessage => {
    if (remoteMessage) {
      console.log("Notification caused app to open from quit state:", remoteMessage.notification);
    }
  });

  messaging().onMessage(async remoteMessage => {
    console.log("Notification on foreground state....", remoteMessage);
  });
};
