// import {
//   ActivityIndicator,
//   Dimensions,
//   FlatList,
//   RefreshControl,
//   ImageBackground,
//   ScrollView,
//   Platform,
// } from 'react-native';
// import HomeDeviceList from '../../components/HomeDeviceList';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Entypo';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Feather from 'react-native-vector-icons/Feather';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import LinearGradient from 'react-native-linear-gradient';
// import React, {useContext, useEffect, useRef, useState} from 'react';
// import {UserContext} from '../../Context/UserContext';
// import {useIsFocused} from '@react-navigation/native';
// import InternetConnectionChecker from '../../Context/InternetConnectionChecker';
// import MCDModulHome from './MCDModulHome';
// import NotificationModuleWrapper from '../../components/NotificationInterfaceModule/NotificationModuleWrapper';
// import {mobileEndPoint} from '../../Context/API';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   GEGBodyCopy,
//   GEGBold,
//   GEGHeadline,
// } from '../../comman-compnent/FontFamily';

// const renderDevicesItem = (itsemData, props) => {
//   console.log(itsemData.item.alldata, 'itsemData.item.alldata.params');
//   const deviceType = itsemData.item.alldata.params;
//   // console.log(deviceType ?deviceType:deviceType.WM.timeinhr,"shubham")
//   return (
//     <>
//       {/* <HomeDeviceList
//         {...props}
//         data={itsemData}
//         id={itsemData.item.alldata.id}
//         Type={itsemData.item.alldata.params}
//         // device={itsemData.item.alldata.params.AC.Name ? itsemData.item.alldata.params.AC.Name:'null'}
//         device={
//           itsemData.item.alldata.params.AC &&
//           itsemData.item.alldata.params.AC.Name
//             ? itsemData.item.alldata.params.AC.Name
//             : 'null'
//         }
//         onLineDevice={itsemData.item.alldata.status.connectivity.connected}
//         switchs={
//           itsemData.item.alldata.params.AC &&
//           itsemData.item.alldata.params.AC.Power
//             ? itsemData.item.alldata.params.AC.Power
//             : 'null'
//         }
//         temperature={
//           itsemData.item.alldata.params.AC &&
//           itsemData.item.alldata.params.AC.Temperature
//             ? itsemData.item.alldata.params.AC.Temperature
//             : 'null'
//         }
//       /> */}
//       <HomeDeviceList
//         {...props}
//         data={itsemData}
//         id={itsemData.item.alldata.id}
//         timestamp={itsemData.item.alldata.status.connectivity.timestamp}
//         Type={deviceType}
//         mode={
//           deviceType.AC && typeof deviceType.AC.Mode !== 'undefined'
//             ? deviceType.AC.Mode
//             : deviceType.WM && typeof deviceType.WM.Mode !== 'undefined'
//             ? deviceType.WM.Mode
//             : deviceType.Refrigerator &&
//               typeof deviceType.Refrigerator.Mode !== 'undefined'
//             ? deviceType.Refrigerator.Mode
//             : 'null'
//         }
//         timeinhr={
//           deviceType.AC && typeof deviceType.AC.timeinhr !== 'undefined'
//             ? deviceType.AC.timeinhr
//             : deviceType.WM && typeof deviceType.WM.timeinhr !== 'undefined'
//             ? deviceType.WM.timeinhr
//             : deviceType.Refrigerator &&
//               typeof deviceType.Refrigerator.timeinhr !== 'undefined'
//             ? deviceType.Refrigerator.timeinhr
//             : 'null'
//         }
//         timeinmin={
//           deviceType.AC && typeof deviceType.AC.timeinmin !== 'undefined'
//             ? deviceType.AC.timeinmin
//             : deviceType.WM && typeof deviceType.WM.timeinmin !== 'undefined'
//             ? deviceType.WM.timeinmin
//             : deviceType.Refrigerator &&
//               typeof deviceType.Refrigerator.timeinmin !== 'undefined'
//             ? deviceType.Refrigerator.timeinmin
//             : 'null'
//         }
//         timepercent={
//           deviceType.AC && typeof deviceType.AC.timepercent !== 'undefined'
//             ? deviceType.AC.timepercent
//             : deviceType.WM && typeof deviceType.WM.timepercent !== 'undefined'
//             ? deviceType.WM.timepercent
//             : deviceType.Refrigerator &&
//               typeof deviceType.Refrigerator.timepercent !== 'undefined'
//             ? deviceType.Refrigerator.timepercent
//             : 'null'
//         }
//         device={
//           deviceType.AC && typeof deviceType.AC.Name !== 'undefined'
//             ? deviceType.AC.Name
//             : deviceType.WM && typeof deviceType.WM.Name !== 'undefined'
//             ? deviceType.WM.Name
//             : deviceType.Refrigerator &&
//               typeof deviceType.Refrigerator.Name !== 'undefined'
//             ? deviceType.Refrigerator.Name
//             : 'null'
//         }
//         onLineDevice={itsemData.item.alldata.status.connectivity.connected}
//         switchs={
//           deviceType.AC && typeof deviceType.AC.Power !== 'undefined'
//             ? deviceType.AC.Power
//             : deviceType.WM && typeof deviceType.WM.Power !== 'undefined'
//             ? deviceType.WM.Power
//             : deviceType.Refrigerator &&
//               typeof deviceType.Refrigerator.Power !== 'undefined'
//             ? deviceType.Refrigerator.Power
//             : 'null'
//         }
//         temperature={
//           deviceType.AC && typeof deviceType.AC.Temperature !== 'undefined'
//             ? deviceType.AC.Temperature
//             : deviceType.WM && typeof deviceType.WM.Temperature !== 'undefined'
//             ? deviceType.WM.Temperature
//             : deviceType.Refrigerator &&
//               typeof deviceType.Refrigerator.Freezer_Temp !== 'undefined'
//             ? deviceType.Refrigerator.Freezer_Temp
//             : 'null'
//         }
//         runing={
//           deviceType.AC && typeof deviceType.AC.wmrunning !== 'undefined'
//             ? deviceType.AC.wmrunning
//             : deviceType.WM && typeof deviceType.WM.wmrunning !== 'undefined'
//             ? deviceType.WM.wmrunning
//             : deviceType.Refrigerator &&
//               typeof deviceType.Refrigerator.Fridge_Temp !== 'undefined'
//             ? deviceType.Refrigerator.Fridge_Temp
//             : 'null'
//         }
//       />
//     </>
//   );
// };

// const {width, height} = Dimensions.get('screen');
// const isLargeScreen = width > 768;
// function HomeScreen(props) {
//   const {navigation} = props;
//   const isFocused = useIsFocused();
//   const {user, acFeature, fetchAll} = useContext(UserContext);
//   const [refresh, setRefresh] = useState(false);

//   const [visible, setVisible] = useState(false);

//   const [shouldShow, setShouldShow] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const pressHandler = () => {
//     console.log('hello');
//     // navigation.navigate('WMBottomSheet');
//     navigation.navigate('AddDevice');
//   };

//   const openDropDown = () => {
//     setShouldShow(!shouldShow);
//   };
//   const pullme = React.useCallback(() => {
//     setRefresh(true);
//     setTimeout(() => {
//       fetchAll();
//       setRefresh(false);
//     }, 1000);
//   }, []);

//   // useEffect(() => {
//   //   const intervalId = setInterval(() => {
//   //     // Prevent multiple refreshes at the same time
//   //     if (!isRefreshing.current && !isRefreshing) {
//   //       isRefreshing.current = true;  // Mark refreshing as true
//   //       fetchAll()
//   //         .then(() => {
//   //           isRefreshing.current = false;
//   //           setIsRefreshing(false);
//   //         })
//   //         .catch((error) => {
//   //           console.error('Error during refresh:', error);
//   //           isRefreshing.current = false;
//   //           setIsRefreshing(false);
//   //         });

//   //       setIsRefreshing(true);
//   //     }
//   //   }, 1000);
//   //   return () => clearInterval(intervalId);
//   // }, [isRefreshing, fetchAll]);

//   // const callMobileEndPoint = async deviceToken => {
//   //   const platform = Platform.OS === "APNS" // For iOS, APNS, for Android, GCM
//   //   console.log('Platform:', platform);
//   //   console.log('Device Token:', deviceToken);

//   //   const token = await AsyncStorage.getItem('AccessToken');
//   //   console.log('AccessToken:', token);

//   //   try {
//   //     // Call the API to register the device endpoint
//   //     const response = await mobileEndPoint(
//   //       "APNS",
//   //       token,
//   //       deviceToken
//   //     );

//   //     console.log('API response in Home:', response.data);
//   //     console.log('Response status:', response.status);
//   //     console.log('Full response:', response);

//   //     // Check if the response contains platform endpoint details
//   //     if (
//   //       response.data &&
//   //       response.data.platform_endpoints &&
//   //       response.data.platform_endpoints.length > 0
//   //     ) {
//   //       const platformData = response.data.platform_endpoints[0];
//   //       const platformApplicationArn = platformData.platform_application_arn;
//   //       const platformEndpointArn = platformData.platform_endpoint_arn;

//   //       // Save Platform ARN details in AsyncStorage
//   //       await AsyncStorage.setItem(
//   //         'PlatformApplicationArn',
//   //         platformApplicationArn,
//   //       );
//   //       await AsyncStorage.setItem('PlatformEndpointArn', platformEndpointArn);

//   //       console.log('Platform Application ARN stored:', platformApplicationArn);
//   //       console.log('Platform Endpoint ARN stored:', platformEndpointArn);

//   //       // Now, store the device token in AsyncStorage
//   //       await AsyncStorage.setItem('deviceToken', deviceToken);
//   //       console.log('Device Token stored in AsyncStorage:', deviceToken);
//   //     } else {
//   //       console.log('No platform endpoint data found in the response.');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error calling mobileEndPoint:', error.message);
//   //   }
//   // };

//   const callMobileEndPoint = async deviceToken => {
//     const platform = Platform.OS === 'APNS'; // Ensure platform type is set correctly
//     console.log('Platform:', platform);
//     console.log('Device Token:', deviceToken);

//     const token = await AsyncStorage.getItem('AccessToken');
//     console.log('AccessToken:', token);

//     try {
//       // Call the API to register the device endpoint
//       const response = await mobileEndPoint('APNS', token, deviceToken);

//       console.log('API response in Homennnnnn:', response.data);
//       console.log('Response status:', response.status);
//       console.log('Full response:', response);

//       // Check if the response contains platform endpoint ARN directly
//       if (response.data && response.data.platform_endpoint_arn) {
//         const platformEndpointArn = response.data.platform_endpoint_arn;

//         // Save Platform ARN details in AsyncStorage
//         await AsyncStorage.setItem('PlatformEndpointArn', platformEndpointArn);
//         console.log('Platform Endpoint ARN stored:', platformEndpointArn);

//         // Now, store the device token in AsyncStorage
//         await AsyncStorage.setItem('deviceToken', deviceToken);
//         console.log('Device Token stored in AsyncStorage:', deviceToken);
//       } else {
//         console.log('No platform endpoint ARN found in the response.');
//       }
//     } catch (error) {
//       console.error('Error calling mobileEndPoint:', error.message);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       if (isFocused) {
//         await fetchAll();
//         try {
//           console.log('before fetching');
//           let deviceToken = await NotificationModuleWrapper.getDeviceToken();
//           console.log(deviceToken, 'deviceTokendeviceToken');
//           callMobileEndPoint(deviceToken);
//         } catch (err) {
//           console.log(err);
//         }
//       }
//       setLoading(false);
//     };

//     fetchData();
//   }, [isFocused]);

//   useEffect(() => {
//     if (acFeature.length > 0) {
//       setVisible(acFeature);
//     } else {
//       setVisible(false);
//     }
//   }, [acFeature]);

//   return (
//     <SafeAreaView
//     style={{
//       flex: 1,
//       backgroundColor: '#F1F1ED',
//       paddingTop: 14,
//       // paddingStart: 6,
//       // paddingEnd: 6,
//     }}>
//        {/* <ImageBackground
//       source={require('../../assets/washingmashine/homebackgroundimage.png')}
//       style={{ flex: 1,height:300,width:"100%"}}
//       resizeMode="cover"
//     > */}
//     <View style={styles.viewStyle}>
//       <View style={{}}>
//         <Text style={styles.welcome}>Welcome Home</Text>
//       </View>
//       <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//         <View style={{paddingVertical: 2}}>
//           <Text style={styles.name}>
//             {user.full_name ? user.full_name : 'user'}{' '}
//           </Text>
//         </View>

//         <View
//           style={{
//             alignItems: 'center',

//             flexDirection: 'row',

//             justifyContent: 'space-between',
//           }}>
//           <TouchableOpacity
//             onPress={() => {
//               // navigation.navigate('SetTimeAlerts');
//               pullme();
//             }}
//             style={{
//               height: 40,
//               width: 40,
//               borderRadius: 8,
//               backgroundColor: '#fff',
//               borderWidth: 1,

//               borderColor: '#CFCFCF',
//               // backgroundColor: 'red',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             <MaterialIcons
//               name="loop"
//               width={25}
//               height={25}
//               color="#810055"
//               size={20}
//             />
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={pressHandler}
//             style={{
//               height: 40,
//               width: 40,
//               borderRadius: 8,
//               backgroundColor: '#fff',
//               borderWidth: 1,
//               marginLeft: 10,
//               borderColor: '#CFCFCF',
//               // backgroundColor: 'red',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             <AntDesign
//               name="plus"
//               width={25}
//               height={25}
//               color="#810055"
//               size={20}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
    
//     {!visible && (
//       <>
//         <View style={styles.container}>
//           <View style={styles.imageContainer}>
//             <Image
//               source={require('../../assets/Infoimg.png')}
//               style={styles.background}
//             />
//           </View>

//           {/* <View style={styles.locationInfo}>
//             <Ionicons
//               name="location"
//               size={25}
//               color="#64bbf5"
//               style={styles.locationIcon}
//             />
//             <Text style={styles.locationText}>
//               For better service & device performance{'\n'}kindly enable
//               location
//             </Text>
//           </View> */}

//           {/* <TouchableOpacity
//             style={styles.buttonContainer}
//             onPress={pressHandler}>
//             <LinearGradient
//               colors={['#64bbf5', '#0c98f5']}
//               style={styles.appButtonContainer}>
//               <Text style={styles.appButtonText}>Add Device</Text>
//             </LinearGradient>
//           </TouchableOpacity> */}
//           <TouchableOpacity
//             style={styles.buttonContainer}
//             onPress={pressHandler}>
//             <LinearGradient
//               colors={['#810055', '#810055']}
//               style={styles.appButtonContainer}>
//               <Text style={styles.appButtonText}>Add Devices</Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>
//       </>
//     )}

//     {visible && (
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginTop: 20,
//           marginBottom: 20,
//           marginHorizontal: 10,
//         }}>
//         <View>
//           <Text
//             style={{
//               color: '#454545',
//               fontWeight: '500',
//               fontWeight: '500',
//               fontSize: 14,
//             }}>
//             All Devices
//           </Text>
//         </View>

//         <View style={{}}>
//           <MCDModulHome {...props} />
//         </View>
//       </View>
//     )}
//     <FlatList
//       bounces={false}
//       data={visible ? acFeature : []}
//       keyExtractor={(item, index) =>
//         item && item.id ? item.id.toString() : index.toString()
//       }
//       renderItem={itemData => renderDevicesItem(itemData, props)}
//       refreshControl={
//         <RefreshControl
//           refreshing={refresh}
//           onRefresh={pullme}
//           colors={['#4285f4', '#34a853', '#fbbc05', '#ea4335']} // Set the colors for the loading indicator
//           progressBackgroundColor="#fff" // Set the background color behind the loading indicator
//           size={Platform.OS === 'ios' ? 'large' : 'small'} // Set the size of the loading indicator
//         />
//       }
//       showsVerticalScrollIndicator={false}
//     />
//     {loading ? (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <ActivityIndicator size="large" color="#4BB6E8" />
//       </View>
//     ) : (
//       ''
//     )}
//    {/* </ImageBackground> */}
//   </SafeAreaView>

//   );
// }

// export default HomeScreen;

// const styles = StyleSheet.create({
//   welcome: {
//     color: '#000000',
//     fontSize: 20,
//     alignItems: 'center',
//     fontFamily: GEGHeadline,
//     marginTop: 14,
//   },

//   name: {
//     color: '#810055',
//     fontSize: 26,
//     alignItems: 'center',
//     fontFamily: GEGHeadline,
//   },

//   btn: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: 'bold',
//   },

//   viewStyle: {
//     paddingHorizontal: 10,
//   },

//   container: {
//     padding: isLargeScreen ? 20 : 10,
//     marginTop: 50,
//   },
//   imageContainer: {
//     borderRadius: 10,
//     marginHorizontal: 10,
//     alignItems: 'center',
//   },
//   background: {
//     width: '100%',
//     height: isLargeScreen ? 500 : 400,
//     borderRadius: 10,
//     resizeMode: 'contain',
//   },
//   locationInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 20,
//     marginLeft: 20,
//   },
//   locationIcon: {
//     marginLeft: 20,
//   },
//   locationText: {
//     fontSize: isLargeScreen ? 16 : 12,
//     color: '#525968',
//     marginLeft: 20,
//   },
//   buttonContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 50,
//     width: '100%',
//   },
//   appButtonContainer: {
//     width: '90%',
//     paddingVertical: isLargeScreen ? 20 : 15,
//     borderRadius: 25,
//     backgroundColor: '#810055',
//   },
//   appButtonText: {
//     fontSize: isLargeScreen ? 18 : 16,
//     color: '#fff',
//     // fontWeight: 'bold',
//     fontFamily: GEGBold,
//     paddingVertical: 3,
//     textAlign: 'center',
//   },
// });


import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  ImageBackground,
  ScrollView,
  Platform,
  Button,
} from 'react-native';
import HomeDeviceList from '../../components/HomeDeviceList';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {UserContext} from '../../Context/UserContext';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import InternetConnectionChecker from '../../Context/InternetConnectionChecker';
import MCDModulHome from './MCDModulHome';
import NotificationModuleWrapper from '../../components/NotificationInterfaceModule/NotificationModuleWrapper';
import {mobileEndPoint} from '../../Context/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GEGBodyCopy,
  GEGBold,
  GEGHeadline,
} from '../../comman-compnent/FontFamily';
 
const renderDevicesItem = (itsemData, props) => {
  console.log(itsemData.item.alldata, 'itsemData.item.alldata.params');
  const deviceType = itsemData.item.alldata.params;
  console.log(deviceType, '.......deeeeee');
 
  // console.log(deviceType ?deviceType:deviceType.WM.timeinhr,"shubham")
  return (
    <>
      {/* <HomeDeviceList
        {...props}
        data={itsemData}
        id={itsemData.item.alldata.id}
        Type={itsemData.item.alldata.params}
        // device={itsemData.item.alldata.params.AC.Name ? itsemData.item.alldata.params.AC.Name:'null'}
        device={
          itsemData.item.alldata.params.AC &&
          itsemData.item.alldata.params.AC.Name
            ? itsemData.item.alldata.params.AC.Name
            : 'null'
        }
        onLineDevice={itsemData.item.alldata.status.connectivity.connected}
        switchs={
          itsemData.item.alldata.params.AC &&
          itsemData.item.alldata.params.AC.Power
            ? itsemData.item.alldata.params.AC.Power
            : 'null'
        }
        temperature={
          itsemData.item.alldata.params.AC &&
          itsemData.item.alldata.params.AC.Temperature
            ? itsemData.item.alldata.params.AC.Temperature
            : 'null'
        }
      /> */}
      <HomeDeviceList
        {...props}
        data={itsemData}
        id={itsemData.item.alldata.id}
        timestamp={itsemData.item.alldata.status.connectivity.timestamp}
        Type={deviceType}
        mode={
          deviceType.AC && typeof deviceType.AC.Mode !== 'undefined'
            ? deviceType.AC.Mode
            : deviceType.WM && typeof deviceType.WM.Mode !== 'undefined'
            ? deviceType.WM.Mode
            : deviceType.Refrigerator &&
              typeof deviceType.Refrigerator.Mode !== 'undefined'
            ? deviceType.Refrigerator.Mode
            : 'null'
        }
        timeinhr={
          deviceType.AC && typeof deviceType.AC.timeinhr !== 'undefined'
            ? deviceType.AC.timeinhr
            : deviceType.WM && typeof deviceType.WM.timeinhr !== 'undefined'
            ? deviceType.WM.timeinhr
            : deviceType.Refrigerator &&
              typeof deviceType.Refrigerator.timeinhr !== 'undefined'
            ? deviceType.Refrigerator.timeinhr
            : 'null'
        }
        timeinmin={
          deviceType.AC && typeof deviceType.AC.timeinmin !== 'undefined'
            ? deviceType.AC.timeinmin
            : deviceType.WM && typeof deviceType.WM.timeinmin !== 'undefined'
            ? deviceType.WM.timeinmin
            : deviceType.Refrigerator &&
              typeof deviceType.Refrigerator.timeinmin !== 'undefined'
            ? deviceType.Refrigerator.timeinmin
            : 'null'
        }
        timepercent={
          deviceType.AC && typeof deviceType.AC.timepercent !== 'undefined'
            ? deviceType.AC.timepercent
            : deviceType.WM && typeof deviceType.WM.timepercent !== 'undefined'
            ? deviceType.WM.timepercent
            : deviceType.Refrigerator &&
              typeof deviceType.Refrigerator.timepercent !== 'undefined'
            ? deviceType.Refrigerator.timepercent
            : 'null'
        }
        device={
          deviceType.AC && typeof deviceType.AC.Name !== 'undefined'
            ? deviceType.AC.Name
            : deviceType.WM && typeof deviceType.WM.Name !== 'undefined'
            ? deviceType.WM.Name
            : deviceType.Refrigerator &&
              typeof deviceType.Refrigerator.Name !== 'undefined'
            ? deviceType.Refrigerator.Name
            : 'null'
        }
        onLineDevice={itsemData.item.alldata.status.connectivity.connected}
        switchs={
          deviceType.AC && typeof deviceType.AC.Power !== 'undefined'
            ? deviceType.AC.Power
            : deviceType.WM && typeof deviceType.WM.Power !== 'undefined'
            ? deviceType.WM.Power
            : deviceType.Refrigerator &&
              typeof deviceType.Refrigerator.Power !== 'undefined'
            ? deviceType.Refrigerator.Power
            : 'null'
        }
        temperature={
          deviceType.AC && typeof deviceType.AC.Temperature !== 'undefined'
            ? deviceType.AC.Temperature
            : deviceType.WM && typeof deviceType.WM.Temperature !== 'undefined'
            ? deviceType.WM.Temperature
            : deviceType.Refrigerator &&
              typeof deviceType.Refrigerator.Freezer_Temp !== 'undefined'
            ? deviceType.Refrigerator.Freezer_Temp
            : 'null'
        }
        runing={
          deviceType.AC && typeof deviceType.AC.wmrunning !== 'undefined'
            ? deviceType.AC.wmrunning
            : deviceType.WM && typeof deviceType.WM.wmrunning !== 'undefined'
            ? deviceType.WM.wmrunning
            : deviceType.Refrigerator &&
              typeof deviceType.Refrigerator.Fridge_Temp !== 'undefined'
            ? deviceType.Refrigerator.Fridge_Temp
            : 'null'
        }
      />
    </>
  );
};
 
const {width, height} = Dimensions.get('screen');
const isLargeScreen = width > 768;
function HomeScreen(props) {
  const {navigation} = props;
  const isFocused = useIsFocused();
  const {user, acFeature, fetchAll} = useContext(UserContext);
  const [refresh, setRefresh] = useState(false);
 
  const [visible, setVisible] = useState(false);
 
  const [shouldShow, setShouldShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
 
  const pressHandler = () => {
    console.log('hello');
    // navigation.navigate('WMBottomSheet');
    navigation.navigate('AddDevice');
  };
 
  const openDropDown = () => {
    setShouldShow(!shouldShow);
  };
  const pullme = React.useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      fetchAll();
      setRefresh(false);
    }, 1000);
  }, []);
 
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     // Prevent multiple refreshes at the same time
  //     if (!isRefreshing.current && !isRefreshing) {
  //       isRefreshing.current = true;  // Mark refreshing as true
  //       fetchAll()
  //         .then(() => {
  //           isRefreshing.current = false;
  //           setIsRefreshing(false);
  //         })
  //         .catch((error) => {
  //           console.error('Error during refresh:', error);
  //           isRefreshing.current = false;
  //           setIsRefreshing(false);
  //         });
 
  //       setIsRefreshing(true);
  //     }
  //   }, 1000);
  //   return () => clearInterval(intervalId);
  // }, [isRefreshing, fetchAll]);
 
  // const callMobileEndPoint = async deviceToken => {
  //   const platform = Platform.OS === "APNS" // For iOS, APNS, for Android, GCM
  //   console.log('Platform:', platform);
  //   console.log('Device Token:', deviceToken);
 
  //   const token = await AsyncStorage.getItem('AccessToken');
  //   console.log('AccessToken:', token);
 
  //   try {
  //     // Call the API to register the device endpoint
  //     const response = await mobileEndPoint(
  //       "APNS",
  //       token,
  //       deviceToken
  //     );
 
  //     console.log('API response in Home:', response.data);
  //     console.log('Response status:', response.status);
  //     console.log('Full response:', response);
 
  //     // Check if the response contains platform endpoint details
  //     if (
  //       response.data &&
  //       response.data.platform_endpoints &&
  //       response.data.platform_endpoints.length > 0
  //     ) {
  //       const platformData = response.data.platform_endpoints[0];
  //       const platformApplicationArn = platformData.platform_application_arn;
  //       const platformEndpointArn = platformData.platform_endpoint_arn;
 
  //       // Save Platform ARN details in AsyncStorage
  //       await AsyncStorage.setItem(
  //         'PlatformApplicationArn',
  //         platformApplicationArn,
  //       );
  //       await AsyncStorage.setItem('PlatformEndpointArn', platformEndpointArn);
 
  //       console.log('Platform Application ARN stored:', platformApplicationArn);
  //       console.log('Platform Endpoint ARN stored:', platformEndpointArn);
 
  //       // Now, store the device token in AsyncStorage
  //       await AsyncStorage.setItem('deviceToken', deviceToken);
  //       console.log('Device Token stored in AsyncStorage:', deviceToken);
  //     } else {
  //       console.log('No platform endpoint data found in the response.');
  //     }
  //   } catch (error) {
  //     console.error('Error calling mobileEndPoint:', error.message);
  //   }
  // };
 
  const callMobileEndPoint = async deviceToken => {
    const platform = Platform.OS === 'APNS'; // Ensure platform type is set correctly
    console.log('Platform:', platform);
    console.log('Device Token:', deviceToken);
 
    const token = await AsyncStorage.getItem('AccessToken');
    console.log('AccessToken:', token);
 
    try {
      // Call the API to register the device endpoint
      const response = await mobileEndPoint('APNS', token, deviceToken);
 
      console.log('API response in Homennnnnn:', response.data);
      console.log('Response status:', response.status);
      console.log('Full response:', response);
 
      // Check if the response contains platform endpoint ARN directly
      if (response.data && response.data.platform_endpoint_arn) {
        const platformEndpointArn = response.data.platform_endpoint_arn;
 
        // Save Platform ARN details in AsyncStorage
        await AsyncStorage.setItem('PlatformEndpointArn', platformEndpointArn);
        console.log('Platform Endpoint ARN stored:', platformEndpointArn);
 
        // Now, store the device token in AsyncStorage
        await AsyncStorage.setItem('deviceToken', deviceToken);
        console.log('Device Token stored in AsyncStorage:', deviceToken);
      } else {
        console.log('No platform endpoint ARN found in the response.');
      }
    } catch (error) {
      console.error('Error calling mobileEndPoint:', error.message);
    }
  };
 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (isFocused) {
        await fetchAll();
        try {
          console.log('before fetching');
          let deviceToken = await NotificationModuleWrapper.getDeviceToken();
          console.log(deviceToken, 'deviceTokendeviceToken');
          callMobileEndPoint(deviceToken);
        } catch (err) {
          console.log(err);
        }
      }
      setLoading(false);
    };
 
    fetchData();
  }, [isFocused]);
 
  useEffect(() => {
    if (acFeature.length > 0) {
      setVisible(acFeature);
    } else {
      setVisible(false);
    }
  }, [acFeature]);
 
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 14,
        // paddingStart: 6,
        // paddingEnd: 6,
      }}>
      <View style={styles.viewStyle}>
        <View style={{}}>
          <Text style={styles.welcome}>Welcome Home</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{paddingVertical: 2}}>
            <Text style={styles.name}>
              {user.full_name ? user.full_name : 'user'}{' '}
            </Text>
          </View>
 
          <View
            style={{
              alignItems: 'center',
 
              flexDirection: 'row',
 
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('SetTimeAlerts');
                pullme();
              }}
              style={{
                height: 40,
                width: 40,
                borderRadius: 8,
                backgroundColor: '#fff',
                borderWidth: 1,
 
                borderColor: '#CFCFCF',
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialIcons
                name="loop"
                width={25}
                height={25}
                color="#810055"
                size={20}
              />
            </TouchableOpacity>
 
            <TouchableOpacity
              onPress={pressHandler}
              style={{
                height: 40,
                width: 40,
                borderRadius: 8,
                backgroundColor: '#fff',
                borderWidth: 1,
                marginLeft: 10,
                borderColor: '#CFCFCF',
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AntDesign
                name="plus"
                width={25}
                height={25}
                color="#810055"
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
 
      {!visible && (
        <>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/Infoimg.png')}
                style={styles.background}
              />
            </View>
 
            {/* <View style={styles.locationInfo}>
              <Ionicons
                name="location"
                size={25}
                color="#64bbf5"
                style={styles.locationIcon}
              />
              <Text style={styles.locationText}>
                For better service & device performance{'\n'}kindly enable
                location
              </Text>
            </View> */}
 
            {/* <TouchableOpacity
            style={styles.buttonContainer}
            onPress={pressHandler}>
            <LinearGradient
              colors={['#64bbf5', '#0c98f5']}
              style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Add Device</Text>
            </LinearGradient>
          </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={pressHandler}>
              <LinearGradient
                colors={['#810055', '#810055']}
                style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Add Devices</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      )}
 
      {visible && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20,
            marginHorizontal: 10,
          }}>
          <View>
            <Text
              style={{
                color: '#454545',
                fontWeight: '500',
                fontWeight: '500',
                fontSize: 14,
              }}>
              All Devices
            </Text>
          </View>
 
          <View style={{}}>
            <MCDModulHome {...props} />
          </View>
        </View>
      )}
      <FlatList
        bounces={false}
        data={visible ? acFeature : []}
        keyExtractor={(item, index) =>
          item && item.id ? item.id.toString() : index.toString()
        }
        renderItem={itemData => renderDevicesItem(itemData, props)}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={pullme}
            colors={['#4285f4', '#34a853', '#fbbc05', '#ea4335']} // Set the colors for the loading indicator
            progressBackgroundColor="#fff" // Set the background color behind the loading indicator
            size={Platform.OS === 'ios' ? 'large' : 'small'} // Set the size of the loading indicator
          />
        }
        showsVerticalScrollIndicator={false}
      />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#810055" />
        </View>
      ) : (
        ''
      )}
    </SafeAreaView>
  );
}
 
export default HomeScreen;
 
const styles = StyleSheet.create({
  welcome: {
    color: '#000000',
    fontSize: 20,
    alignItems: 'center',
    fontWeight: '400',
    marginTop: 14,
  },
 
  name: {
    color: '#454545',
 
    fontSize: 28,
    alignItems: 'center',
    fontWeight: 'bold',
  },
 
  btn: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
 
  viewStyle: {
    paddingHorizontal: 10,
  },
 
  container: {
    padding: isLargeScreen ? 20 : 10,
  },
  imageContainer: {
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: isLargeScreen ? 500 : 400,
    borderRadius: 10,
    resizeMode: 'contain',
    marginTop:40
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginLeft: 20,
  },
  locationIcon: {
    marginLeft: 20,
  },
  locationText: {
    fontSize: isLargeScreen ? 16 : 12,
    color: '#525968',
    marginLeft: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    width: '100%',
  },
  appButtonContainer: {
    width: '90%',
    paddingVertical: isLargeScreen ? 20 : 15,
    borderRadius: 26,
  },
  appButtonText: {
    fontSize: isLargeScreen ? 18 : 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});