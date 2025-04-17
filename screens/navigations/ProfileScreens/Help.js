// import React, {useEffect, useRef, useState} from 'react';

// import EvilIcons from 'react-native-vector-icons/EvilIcons';

// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {
//   SafeAreaView,
//   LayoutAnimation,
//   StyleSheet,
//   View,
//   Text,
//   ScrollView,
//   UIManager,
//   TouchableOpacity,
//   Platform,
//   TextInput,
//   Animated,
//   FlatList,
//   Pressable,
//   ActivityIndicator
// } from 'react-native';

// import Ionicons from 'react-native-vector-icons/FontAwesome5';

// import {downloadFile, getDownloadPermissionAndroid} from './downloadFile';

// import RNFetchBlob from 'rn-fetch-blob';
// import Modal from 'react-native-modal';



// const ExpandableComponent = ({item, bodyText}) => {
//   const [showContent, setShowContent] = useState(false);
//   const animationController = useRef(new Animated.Value(0)).current;

//   const toggleItem = () => {
//     const config = {
//       duration: 300,
//       toValue: showContent ? 0 : 1,
//       useNativeDriver: true,
//     };
//     Animated.timing(animationController, config).start();
//     setShowContent(!showContent);
//   };

//   const arrowTransform = animationController.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '90deg'],
//   });

//   return (
//     <View style={{zIndex: 0, flex: 1}}>
//       <TouchableOpacity activeOpacity={0.8} onPress={toggleItem} style={styles.header}>
//         <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'}}>
//           <View style={{width: '95%'}}>
//             <Text style={styles.headerText}>{item.category_name}</Text>
//           </View>
//           <View style={{width: '3%'}}>
//             <Animated.View style={{transform: [{rotateZ: arrowTransform}]}}>
//               <Ionicons name="angle-right" size={20} color="#838383" />
//             </Animated.View>
//           </View>
//         </View>
//       </TouchableOpacity>
//       {showContent && (
//         <View style={{paddingHorizontal: 8, marginBottom: 5}}>
//           <Text style={{color: '#000000', lineHeight: 22, letterSpacing: 0.6, fontWeight: '500'}}>
//             {bodyText}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };

// function Help({navigation}) {
//   const [listDataSource, setListDataSource] = useState(CONTENT);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [downloadProgress, setDownloadProgress] = useState(0);
  

//   const fileUrl = 'https://privacypolicygodrejsmartlife.s3.ap-south-1.amazonaws.com/GODREJ+AC+USER+MANUAL.pdf';
//   const AppUserManual = 'https://privacypolicygodrejsmartlife.s3.ap-south-1.amazonaws.com/Godrej+Smart+Life+App+User+Manual.pdf';

//   if (Platform.OS === 'android') {
//     UIManager.setLayoutAnimationEnabledExperimental(true);
//   }

//   const onSearch = text => {
//     if (text !== '') {
//       let userData = listDataSource.filter(item => {
//         return item.category_name.toLowerCase().indexOf(text.toLowerCase()) > -1;
//       });
//       setListDataSource(userData);
//     } else {
//       setListDataSource(CONTENT);
//     }
//   };

//   const handleDownload = async (url) => {
//     console.log("Starting download...");
//     setModalVisible(true);
//     if (Platform.OS === 'android') {
//       const granted = await getDownloadPermissionAndroid();
//       if (granted) {
//         RNFetchBlob.config({fileCache: true})
//           .fetch('GET', url)
//           .progress({count: 10}, (received, total) => {
//             setDownloadProgress(Math.floor((received / total) * 100));
//           })
//           .then(res => {
//             console.log('Download complete: ', res.path());
//             setModalVisible(false);
//           })
//           .catch(err => {
//             console.error('Download error on Android: ', err);
//             setModalVisible(false);
//           });
//       } else {
//         console.log("Permission denied");
//         setModalVisible(false);
//       }
//     } else {
//       RNFetchBlob.config({fileCache: true})
//         .fetch('GET', url)
//         .progress({count: 10}, (received, total) => {
//           setDownloadProgress(Math.floor((received / total) * 100));
//         })
//         .then(res => {
//           console.log('Download complete: ', res.path());
//           RNFetchBlob.ios.previewDocument(res.path());
//           setModalVisible(false);
//         })
//         .catch(err => {
//           console.error('Download error on iOS: ', err);
//           setModalVisible(false);
//         });
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Pressable
//           style={{height: 50, width: 50, borderRadius: 100, alignItems: 'center', justifyContent: 'center'}}
//           onPress={() => navigation.goBack()}>
//           <AntDesign name="arrowleft" size={24} color="black" />
//         </Pressable>
//         <Text style={{fontSize: 18, color: 'black', fontWeight: '500', justifyContent: 'center'}}>
//           Help Guide
//         </Text>
//       </View>
//       <View style={styles.innerContainer}>
//         <View style={styles.cardLayout}>
//           <TouchableOpacity onPress={() => handleDownload(fileUrl)}>
//             <Text style={styles.textProduct}>Product User Manual</Text>
//           </TouchableOpacity>
//           <View style={styles.menuline} />
//           <TouchableOpacity onPress={() => handleDownload(AppUserManual)}>
//             <Text style={styles.textApp}>App User Manual</Text>
//           </TouchableOpacity>
//         </View>
//         <View>
//           <View style={{width: '100%', height: 40, borderRadius: 10, borderWidth: 0.5, borderColor: '#000', marginTop: 10, paddingLeft: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
//             <EvilIcons name="search" width={20} height={20} color="#000" size={20} />
//             <TextInput
//               style={{paddingHorizontal: 10}}
//               placeholder="Search here"
//               placeholderTextColor="#000"
//               onChangeText={text => onSearch(text)}
//             />
//           </View>
//           <View style={{paddingVertical: 10, paddingBottom: 100}}>
//             <FlatList
//               data={listDataSource}
//               keyExtractor={item => item.id.toString()}
//               renderItem={({item}) => (
//                 <ExpandableComponent
//                   key={item.category_name}
//                   bodyText={item.body}
//                   item={item}
//                 />
//               )}
//             />
//           </View>
//         </View>
//       </View>
//       <Modal isVisible={isModalVisible}>
//       <View style={styles.modalContent}>
//         <Text style={styles.modalText}>Downloading... {downloadProgress}%</Text>
//         <ActivityIndicator size="large" color="#4BB6E8" />
//       </View>
//     </Modal>
//     </SafeAreaView>
//   );
// }

// export default Help;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     backgroundColor: '#ffffff',
//   },
//   innerContainer: {
//     flex: 1,
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     paddingBottom: 50,
//   },

//   textStyle: {
//     fontSize: 16,

//     color: 'black',

//     fontWeight: 'bold',
//   },

//   textLayout: {
//     flex: 1,

//     marginStart: 10,

//     justifyContent: 'center',
//   },

//   textProduct: {
//     fontSize: 14,

//     color: '#4BB6E8',

//     padding: 8,

//     flex: 1,
//   },

//   textApp: {
//     fontSize: 14,

//     color: '#4BB6E8',

//     padding: 8,

//     flex: 1,
//   },

//   layoutTop: {
//     flexDirection: 'row',

//     marginStart: 12,

//     marginEnd: 12,

//     marginTop: 12,
//   },

//   cardLayout: {
//     height: 50,

//     padding: 8,

//     backgroundColor: 'white',

//     borderRadius: 4,

//     justifyContent: 'space-between',

//     shadowColor: 'gray',

//     shadowOffset: {width: 0, height: 0},

//     shadowOpacity: 0.6,

//     shadowRadius: 8,

//     elevation: 8,

//     flexDirection: 'row',
//   },

//   menuline: {
//     height: 22,

//     width: 0.5,

//     backgroundColor: '#d4d4d4',

//     margin: 8,
//   },

//   titleText: {
//     flex: 1,

//     fontSize: 22,

//     fontWeight: 'bold',
//   },

//   header: {
//     padding: 10,
//     borderRadius: 10,
//     backgroundColor: '#F3F3F3',
//     marginBottom: 10,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: '#E1EEDD',
//   },

//   headerText: {
//     fontSize: 16,
//     fontWeight: '500',
//   },

//   separator: {
//     height: 0.5,

//     backgroundColor: '#808080',

//     width: '95%',

//     marginLeft: 16,

//     marginRight: 16,
//   },

//   text: {
//     fontSize: 16,

//     color: '#606070',

//     padding: 10,
//   },

//   content: {
//     paddingLeft: 10,

//     paddingRight: 10,

//     backgroundColor: '#fff',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 20,
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//     elevation: 5, // Add elevation for shadow on Android
//     shadowColor: '#000', // Add shadow properties for iOS
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   modalText: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
// });

// //Dummy content to show

// //You can also use dynamic data by calling webservice

// const CONTENT = [
//   {
//     id: 0,

//     category_name: 'How to add a new device ?',

//     body: `Download the "Godrej Smart Life" mobile app from Google Play. Sign up and create your login to add smart appliance \n\nSTEP 1:\n\n- Turn the device ON\n\n- Please ensure the Wi-Fi is switched on and in range\n\n- Ensure the existing Wi-Fi is connected to your smart phone or your phone internet is ON\n\nSTEP 2:\n\n- Login into the Godrej Smart Life App\n\n- Click on add device button or \"+\" icon to begin the device registration process\n\n- Allow camera, bluetooth and location permission \n\n\- Select device Air Conditioner\n\n- Enter Product serial number manually or scan serial number QR code ( 16-digit IDU serial number ) and verify\n\n- Scan IOT QR code and pair for auto configure\n\n- Select Wi-Fi name and enter Wi-Fi Password and then click on connect button\n\n- After finish auto configuration steps click on connect button\n\n- Congratulations, now you can use your new appliance.\n`,
//   },

//   {
//     id: 1,

//     category_name:
//       'Can I use a Godrej smart appliance without an internet connection? i.e. using the appliance hotspot?',

//     body: `No. Internet connectivity is necessary to use this appliance.`,
//   },

//   {
//     id: 2,

//     category_name: 'How many Godrej smart appliance can I add to an account?',

//     body: `As many as you like! There's no limit on the number of Godrej smart appliance that can be added to an account.`,
//   },

//   {
//     id: 3,

//     category_name:
//       'Is the Godrej smart appliance compatible with a 5GHz router?',

//     body: `No, Godrej smart appliance are compatible with a 2.4GHz router only.`,
//   },

//   {
//     id: 4,

//     category_name:
//       'What is the recommended bandwidth for Godrej smart appliance to function properly?',

//     body: `The recommended upload speed is at least 1 Mbps per Godrej smart appliance in your home. The Godrej Smart Life app adjust mode and other feature.`,
//   },

//   {
//     id: 5,

//     category_name:
//       'Can I connect the Godrej smart appliance to the internet via an ethernet cable?',

//     body: `Godrej smart appliance are only Wi-Fi enabled.`,
//   },

//   {
//     id: 6,

//     category_name: 'How to reset my Godrej smart appliance?',

//     body: `Please follow the steps below: - \nSet temperature on 31 from remote, press and hold the remote Wi-Fi button (about 5sec), until you hear the beep sound. \nThe smart Appliance will reboot to complete the reset.`,
//   },

//   {
//     id: 7,

//     category_name:
//       'What should I do if the smart appliance stops working after I change the Wi-Fi name/password or switch to a new router?',

//     body: `The smart appliance cannot automatically recognize a new Wi-Fi name or password. So, any changes will disconnect it from the router. You will need to reset and reconfigure the smart appliance accordingly. If a new router shares the same 2.4G Wi-Fi name, password and security mode as your old router, the smart appliance should be able connected to it automatically. If not, please reset and reconfigure the same."`,
//   },

//   {
//     id: 8,

//     category_name: 'What if I forgot Godrej Smart Life app login details?',

//     body: 'You can reset your password using forget password option on login screen.',
//   },

//   {
//     id: 9,

//     category_name: 'Can I share smart Appliance with my friends and family?',

//     body: `To share your appliance with your friends and family click on share option and enter register email address or mobile number and share."`,
//   },

//   {
//     id: 10,

//     category_name: 'Can I edit or change my profile picture in Smart Life app?',

//     body: `Yes, go to the profile option and click on edit option, upload and capture pic and save change."`,
//   },
// ];





// // import React, { useState, useEffect } from 'react';
// // import { View, Text, TextInput, Button, Alert, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// // import SelectDropdown from 'react-native-select-dropdown';

// // const Help = () => {
// //   const [selectedSSID, setSelectedSSID] = useState(null);
// //   const [password, setPassword] = useState('');
// //   const [saveCredentials, setSaveCredentials] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   // Dummy Wi-Fi network list
// //   const ssidList = [
// //     { id: 1, ssid: 'Network1' },
// //     { id: 2, ssid: 'Network2' },
// //     { id: 3, ssid: 'Network3' },
// //   ];

// //   useEffect(() => {
// //     const loadCredentials = async () => {
// //       try {
// //         setLoading(true); // Show loader while loading credentials
// //         const savedSSID = await AsyncStorage.getItem('ssid');
// //         const savedPassword = await AsyncStorage.getItem('password');
// //         if (savedSSID && savedPassword) {
// //           setSelectedSSID(savedSSID);
// //           setPassword(savedPassword);
// //           setSaveCredentials(true);
// //         }
// //       } catch (error) {
// //         Alert.alert('Error', 'Failed to load credentials.');
// //       } finally {
// //         setLoading(false); // Hide loader
// //       }
// //     };
// //     loadCredentials();
// //   }, []);

// //   const transformedSSIDList = ssidList.map((item) => ({
// //     ...item,
// //     ssid: item.ssid.toUpperCase(), // Example of transformation
// //   }));

// //   const handleLogin = () => {
// //     if (!selectedSSID || !password) {
// //       Alert.alert('Error', 'Please select a Wi-Fi network and enter the password.');
// //       return;
// //     }

// //     setLoading(true); // Show loader during login process

// //     // Simulate API request
// //     setTimeout(() => {
// //       setLoading(false); // Hide loader after "login"
// //       Alert.alert('Logged In', 'You have successfully logged in!');
// //     }, 2000); // Adjust this delay as needed for your real API request
// //   };

// //   const handleCheckboxPress = async () => {
// //     try {
// //       if (!saveCredentials) {
// //         await AsyncStorage.setItem('ssid', selectedSSID);
// //         await AsyncStorage.setItem('password', password);
// //         Alert.alert('Success', 'Wi-Fi credentials saved successfully!');
// //       } else {
// //         await AsyncStorage.removeItem('ssid');
// //         await AsyncStorage.removeItem('password');
// //         setSelectedSSID(null);  // Reset selectedSSID to null when unchecking
// //         setPassword('');
// //         Alert.alert('Notice', 'Wi-Fi credentials have been removed.');
// //       }
// //       setSaveCredentials(!saveCredentials);
// //     } catch (error) {
// //       Alert.alert('Error', 'Failed to update credentials.');
// //     }
// //   };

// //   const getDefaultIndex = () => {
// //     return transformedSSIDList.findIndex((item) => item.ssid === selectedSSID);
// //   };

// //   return (
// //     <View style={{ flex: 1 }}>
// //       {/* Overlay for loading state */}
// //       {loading && (
// //         <View style={styles.overlay}>
// //           <ActivityIndicator size="large" color="#64bbf5" />
// //         </View>
// //       )}

// //       <View style={styles.container}>
// //         <Text style={styles.label}>Select Wi-Fi Network:</Text>
// //         <SelectDropdown
// //           data={transformedSSIDList}
// //           defaultValueByIndex={getDefaultIndex()}
// //           onSelect={(selectedItem, index) => {
// //             setSelectedSSID(selectedItem.ssid);
// //           }}
// //           defaultButtonText="Select Wi-Fi Network"
// //           buttonTextAfterSelection={(selectedItem) => selectedItem.ssid}
// //           rowTextForSelection={(item) => item.ssid}
// //         />

// //         <Text style={styles.label}>Password:</Text>
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Enter Wi-Fi password"
// //           value={password}
// //           onChangeText={setPassword}
// //           secureTextEntry
// //         />

// //         <View style={styles.checkboxContainer}>
// //           <Pressable onPress={handleCheckboxPress}>
// //             <MaterialCommunityIcons
// //               name={saveCredentials ? 'checkbox-marked' : 'checkbox-blank-outline'}
// //               size={22}
// //               color={saveCredentials ? '#8BBD54' : '#9c9a9a'}
// //             />
// //           </Pressable>
// //           <Text style={styles.checkboxLabel}>Save Wi-Fi Credentials</Text>
// //         </View>
// //         <Button title="Connect" onPress={handleLogin} />
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     padding: 20,
// //   },
// //   label: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     marginBottom: 8,
// //   },
// //   input: {
// //     height: 40,
// //     borderColor: '#ccc',
// //     borderWidth: 1,
// //     marginBottom: 12,
// //     paddingHorizontal: 10,
// //   },
// //   checkboxContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 12,
// //   },
// //   checkboxLabel: {
// //     marginLeft: 8,
// //     fontSize: 16,
// //   },
// //   overlay: {
// //     position: 'absolute',
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     bottom: 0,
// //     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     zIndex: 1, // Places overlay above other elements
// //   },
// //   dropdownBtnStyle: {
// //     width: '100%',
// //     height: 40,
// //     backgroundColor: '#fff',
// //     borderRadius: 8,
// //     borderColor: '#ccc',
// //     borderWidth: 1,
// //     marginBottom: 12,
// //   },
// //   dropdownBtnTxtStyle: {
// //     color: '#444',
// //     textAlign: 'left',
// //     fontSize: 16,
// //   },
// //   dropdownDropdownStyle: {
// //     backgroundColor: '#EFEFEF',
// //   },
// //   dropdownRowStyle: {
// //     backgroundColor: '#EFEFEF',
// //     borderBottomColor: '#C5C5C5',
// //   },
// //   dropdownRowTxtStyle: {
// //     color: '#444',
// //     textAlign: 'left',
// //     fontSize: 16,
// //   },
// // });

// // export default Help;


import React, { useEffect, useRef, useState } from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  TextInput,
  Animated,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import { downloadFile, getDownloadPermissionAndroid } from './downloadFile';
import RNFetchBlob from 'rn-fetch-blob';
import Modal from 'react-native-modal';
import InsideHeader from '../../../comman-compnent/InsideHeader';

const ExpandableComponent = ({ item, bodyText }) => {
  const [showContent, setShowContent] = useState(false);
  const animationController = useRef(new Animated.Value(0)).current;

  const toggleItem = () => {
    const config = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    setShowContent(!showContent);
  };

  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={{ zIndex: 0, flex: 1 }}>
      <TouchableOpacity activeOpacity={0.8} onPress={toggleItem} style={styles.header}>
        <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between' }}>
          <View style={{ width: '95%' }}>
            <Text style={styles.headerText}>{item.category_name}</Text>
          </View>
          <View style={{ width: '3%' }}>
            <Animated.View style={{ transform: [{ rotateZ: arrowTransform }] }}>
              <Ionicons name="angle-right" size={20} color="#838383" />
            </Animated.View>
          </View>
        </View>
      </TouchableOpacity>
      {showContent && (
        <View style={{ paddingHorizontal: 8, marginBottom: 5 }}>
          <Text style={{ color: '#000000', lineHeight: 22, letterSpacing: 0.6, fontWeight: '500' }}>
            {bodyText}
          </Text>
        </View>
      )}
    </View>
  );
};

function Help({ navigation }) {
  const [listDataSource, setListDataSource] = useState(CONTENT);
  const [isModalVisible, setModalVisible] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const fileUrl = 'https://privacypolicygodrejsmartlife.s3.ap-south-1.amazonaws.com/GODREJ+AC+USER+MANUAL.pdf';
  const AppUserManual = 'https://privacypolicygodrejsmartlife.s3.ap-south-1.amazonaws.com/Godrej+Smart+Life+App+User+Manual.pdf';

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const onSearch = text => {
    if (text !== '') {
      let userData = listDataSource.filter(item => {
        return item.category_name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setListDataSource(userData);
    } else {
      setListDataSource(CONTENT);
    }
  };

  const handleDownload = async (url) => {
    console.log('Starting download...');
    setModalVisible(true);
    if (Platform.OS === 'android') {
      const granted = await getDownloadPermissionAndroid();
      if (granted) {
        RNFetchBlob.config({ fileCache: true })
          .fetch('GET', url)
          .progress({ count: 10 }, (received, total) => {
            setDownloadProgress(Math.floor((received / total) * 100));
          })
          .then(res => {
            console.log('Download complete: ', res.path());
            RNFetchBlob.android.actionViewIntent(res.path(), 'application/pdf');
            setModalVisible(false);
          })
          .catch(err => {
            console.error('Download error on Android: ', err);
            setModalVisible(false);
          });
      } else {
        console.log('Permission denied');
        setModalVisible(false);
      }
    } else {
      RNFetchBlob.config({ fileCache: true })
        .fetch('GET', url)
        .progress({ count: 10 }, (received, total) => {
          setDownloadProgress(Math.floor((received / total) * 100));
        })
        .then(res => {
          console.log('Download complete: ', res.path());
          RNFetchBlob.ios.previewDocument(res.path());
          setModalVisible(false);
        })
        .catch(err => {
          console.error('Download error on iOS: ', err);
          setModalVisible(false);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View >
        <InsideHeader
          title="Help"
          onBackPress={() => navigation.goBack()} // Set your back action here
        />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.cardLayout}>
          <TouchableOpacity onPress={() => handleDownload(fileUrl)}>
            <Text style={styles.textProduct}>Product User Manual</Text>
          </TouchableOpacity>
          <View style={styles.menuline} />
          <TouchableOpacity onPress={() => handleDownload(AppUserManual)}>
            <Text style={styles.textApp}>App User Manual</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={{ width: '100%', height: 40, borderRadius: 10, borderWidth: 0.5, borderColor: '#000', marginTop: 10, paddingLeft: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <EvilIcons name="search" width={20} height={20} color="#000" size={20} />
            <TextInput
              style={{ paddingHorizontal: 10 }}
              placeholder="Search here"
              placeholderTextColor="#000"
              onChangeText={text => onSearch(text)}
            />
          </View>
          <View style={{ paddingVertical: 10, paddingBottom: 100 }}>
            <FlatList
              data={listDataSource}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <ExpandableComponent
                  key={item.category_name}
                  bodyText={item.body}
                  item={item}
                />
              )}
            />
          </View>
        </View>
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Downloading... {downloadProgress}%</Text>
          <ActivityIndicator size="large" color="#810055" />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingBottom: 50,
  },

  textStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },

  textLayout: {
    flex: 1,
    marginStart: 10,
    justifyContent: 'center',
  },

  textProduct: {
    fontSize: 14,
    color: '#810055',
    padding: 8,
    flex: 1,
  },

  textApp: {
    fontSize: 14,
    color: '#810055',
    padding: 8,
    flex: 1,
  },

  layoutTop: {
    flexDirection: 'row',
    marginStart: 12,
    marginEnd: 12,
    marginTop: 12,
  },

  cardLayout: {
    height: 50,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    justifyContent: 'space-between',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
  },

  menuline: {
    height: 22,
    width: 0.5,
    backgroundColor: '#d4d4d4',
    margin: 8,
  },

  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },

  header: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F3F3F3',
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E1EEDD',
  },

  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },

  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },

  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },

  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5, // Add elevation for shadow on Android
    shadowColor: '#000', // Add shadow properties for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

//Dummy content to show
//You can also use dynamic data by calling webservice

const CONTENT = [
  {
    id: 0,
    category_name: 'How to add a new device ?',
    body: `Download the "Godrej Smart Life" mobile app from Google Play. Sign up and create your login to add smart appliance \n\nSTEP 1:\n\n- Turn the device ON\n\n- Please ensure the Wi-Fi is switched on and in range\n\n- Ensure the existing Wi-Fi is connected to your smart phone or your phone internet is ON\n\nSTEP 2:\n\n- Login into the Godrej Smart Life App\n\n- Click on add device button or \"+\" icon to begin the device registration process\n\n- Allow camera, bluetooth and location permission \n\n\- Select device Air Conditioner\n\n- Enter Product serial number manually or scan serial number QR code ( 16-digit IDU serial number ) and verify\n\n- Scan IOT QR code and pair for auto configure\n\n- Select Wi-Fi name and enter Wi-Fi Password and then click on connect button\n\n- After finish auto configuration steps click on connect button\n\n- Congratulations, now you can use your new appliance.\n`,
  },
  {
    id: 1,
    category_name: 'Can I use a Godrej smart appliance without an internet connection? i.e. using the appliance hotspot?',
    body: `No. Internet connectivity is necessary to use this appliance.`,
  },
  {
    id: 2,
    category_name: 'How many Godrej smart appliance can I add to an account?',
    body: `As many as you like! There's no limit on the number of Godrej smart appliance that can be added to an account.`,
  },
  {
    id: 3,
    category_name: 'Is the Godrej smart appliance compatible with a 5GHz router?',
    body: `No, Godrej smart appliance are compatible with a 2.4GHz router only.`,
  },
  {
    id: 4,
    category_name: 'What is the recommended bandwidth for Godrej smart appliance to function properly?',
    body: `The recommended upload speed is at least 1 Mbps per Godrej smart appliance in your home. The Godrej Smart Life app adjust mode and other feature.`,
  },
  {
    id: 5,
    category_name: 'Can I connect the Godrej smart appliance to the internet via an ethernet cable?',
    body: `Godrej smart appliance are only Wi-Fi enabled.`,
  },
  {
    id: 6,
    category_name: 'How to reset my Godrej smart appliance?',
    body: `Please follow the steps below: - \nSet temperature on 31 from remote, press and hold the remote Wi-Fi button (about 5sec), until you hear the beep sound. \nThe smart Appliance will reboot to complete the reset.`,
  },
  {
    id: 7,
    category_name: 'What should I do if the smart appliance stops working after I change the Wi-Fi name/password or switch to a new router?',
    body: `The smart appliance cannot automatically recognize a new Wi-Fi name or password. So, any changes will disconnect it from the router. You will need to reset and reconfigure the smart appliance accordingly. If a new router shares the same 2.4G Wi-Fi name, password and security mode as your old router, the smart appliance should be able connected to it automatically. If not, please reset and reconfigure the same."`,
  },
  {
    id: 8,
    category_name: 'What if I forgot Godrej Smart Life app login details?',
    body: 'You can reset your password using forget password option on login screen.',
  },
  {
    id: 9,
    category_name: 'Can I share smart Appliance with my friends and family?',
    body: `To share your appliance with your friends and family click on share option and enter register email address or mobile number and share."`,
  },
  {
    id: 10,
    category_name: 'Can I edit or change my profile picture in Smart Life app?',
    body: `Yes, go to the profile option and click on edit option, upload and capture pic and save change."`,
  },
];


