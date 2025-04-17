// // import 'react-native-reanimated';
// import 'react-native-gesture-handler';
// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// // // Register background handler
// // messaging().setBackgroundMessageHandler(async remoteMessage => {
// //   console.log('Message handled in the background!', remoteMessage);
// // });
// AppRegistry.registerComponent(appName, () => App);


import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';  // Ensure this matches the app name in app.json
import App from './App';
 
AppRegistry.registerComponent(appName, () => App);