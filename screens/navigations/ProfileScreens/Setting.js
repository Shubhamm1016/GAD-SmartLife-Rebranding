import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
} from 'react-native';

import {useContext, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Geocoder from 'react-native-geocoding';

import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, request} from 'react-native-permissions';
import {UserContext} from '../../../Context/UserContext';
import InsideHeader from '../../../comman-compnent/InsideHeader';

function Setting({navigation}) {
  const [toggle, setToggle] = useState(false);
  const [location, setLocation] = useState(false);
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  // const [isDarkTheme, setIsDarkTheme] = useState('red' === 'dark');
  // const { theme, updateTheme } = useContext(UserContext);

  // const toggleTheme = () => {
  //   updateTheme();
  //   setIsDarkTheme(prev => !prev);
  // };
  let watchID;

  // useEffect(() => {
  //   const initGeocoder = async () => {
  //     Geocoder.init('AIzaSyDtYEJhZSaOG9sXBFXePpj9P7CPGlHEugU');
  //   };

  //   const requestLocationPermission = async () => {
  //     try {
  //       await initGeocoder();

  //       const status = await request(
  //         Platform.select({
  //           ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  //           android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  //         }),
  //       );

  //       if (status === 'granted') {
  //         console.log('Permission granted');
  //         getOneTimeLocation();
  //         subscribeLocationLocation();
  //       } else {
  //         setLocationStatus('Permission Denied');
  //         console.log('Permission denied');
  //       }
  //     } catch (err) {
  //       console.error('Error:', err);
  //     }
  //   };

  //   requestLocationPermission();

  //   return () => {
  //     Geolocation.clearWatch(watchID);
  //   };
  // }, []);

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      async position => {
        try {
          const currentLongitude = JSON.stringify(position.coords.longitude);
          const currentLatitude = JSON.stringify(position.coords.latitude);

          // console.log(enabled,"enabled");
          // Geocode the current latitude and longitude
          const response = await Geocoder.from({
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
          });
          console.log(response, 'response');
          // return
          const address = response.results[0].formatted_address;
          console.log(address, 'address');

          // Update your state or do whatever you need with the address, latitude, and longitude
          setLocationStatus('You are Here');
          setCurrentLongitude(currentLongitude);
          setCurrentLatitude(currentLatitude);
          setLocation(previousState => !previousState);
        } catch (error) {
          setLocationStatus('Error getting address');
          console.error('Geocoding error:', error);
          console.error('Geocoding error origin:', error.origin);
        }
      },
      error => {
        setLocationStatus(error.message);
        console.error(error.message, 'error.message');
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');

    Geolocation.getCurrentPosition(
      position => {
        setLocationStatus('You are Here');

        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);

        console.log(currentLongitude, 'currentLongitude');
        console.log(currentLatitude, 'currentLatitude');

        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);

        setLocation(true);
      },
      error => {
        setLocationStatus(`Error getting location: ${error.message}`);
        setLocation(false);
        console.error(error.message, 'location error');
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        // padding: 24,
        paddingHorizontal: 10,
      }}>
      <View>
        <InsideHeader
          title="App Settings"
          onBackPress={() => navigation.goBack()} // Set your back action here
        />
      </View>
      <View style={styles.viewStyle}>
        <View style={styles.layoutmenu}>
          <TouchableOpacity
            style={styles.textLayout}
            onPress={() => {
              Linking.openURL(
                'https://privacypolicygodrejsmartlife.s3.ap-south-1.amazonaws.com/Updated_Godrej_smartlife_privacy_policy.pdf',
              );
            }}>
            <Text style={styles.text}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.layoutmenu}>
          <TouchableOpacity
            style={styles.textLayout}
            onPress={() => {
              Linking.openURL(
                'https://privacypolicygodrejsmartlife.s3.ap-south-1.amazonaws.com/Updated_Godrej_Smartlife_Legal_Disclaimer+.pdf',
              );
            }}>
            <Text style={styles.text}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
        {/* <View>
          <Text style={{color: 'red'}}>
            {currentLongitude}:"currentLongitude"
          </Text>
        </View>

        <View>
          <Text style={{color: 'red'}}>
            {currentLatitude}:"currentLatitude"
          </Text>
        </View>

        <View>
          <Text style={{color: 'red'}}>{locationStatus}:"locationStatus"</Text>
        </View> */}

        {/* <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
          thumbColor={isDarkTheme ? '#fff' : 'green'}
          ios_backgroundColor={'red'}
          trackColor={{
            false: 'red',
            true: 'red',
          }}></Switch> */}
      </View>
    </SafeAreaView>
  );
}

export default Setting;

const styles = StyleSheet.create({
  layoutTop: {
    flexDirection: 'row',
    marginStart: 12,
    marginEnd: 12,
    marginTop: 12,
  },
  textStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  layout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  layoutmenu: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 8,
    borderWidth: 0.4,
    paddingStart: 6,
    paddingEnd: 12,
    marginTop: 10,
    height: 45,
    backgroundColor: '#00000016',
  },
  textLayout: {
    flex: 1,
    marginStart: 10,
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: 'black',
  },
  toggleStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewStyle: {
    // flex: 1,
    paddingHorizontal: 10,
    // paddingVertical: 15,
    backgroundColor: '#fff',
  },
});

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, Alert, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import SelectDropdown from 'react-native-select-dropdown';

// const Setting = () => {
//   const [selectedSSID, setSelectedSSID] = useState(null);
//   const [password, setPassword] = useState('');
//   const [saveCredentials, setSaveCredentials] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Dummy Wi-Fi network list
//   const ssidList = [
//     { id: 1, ssid: 'Network1' },
//     { id: 2, ssid: 'Network2' },
//     { id: 3, ssid: 'Network3' },
//   ];

//   useEffect(() => {
//     const loadCredentials = async () => {
//       try {
//         setLoading(true); // Show loader while loading credentials
//         const savedSSID = await AsyncStorage.getItem('ssid');
//         const savedPassword = await AsyncStorage.getItem('password');
//         if (savedSSID && savedPassword) {
//           setSelectedSSID(savedSSID);
//           setPassword(savedPassword);
//           setSaveCredentials(true);
//         }
//       } catch (error) {
//         Alert.alert('Error', 'Failed to load credentials.');
//       } finally {
//         setLoading(false); // Hide loader
//       }
//     };
//     loadCredentials();
//   }, []);

// const transformedSSIDList = ssidList.map((item) => ({
//   ...item,
//   ssid: item.ssid.toUpperCase(), // Example of transformation
// }));

//   const handleLogin = () => {
//     if (!selectedSSID || !password) {
//       Alert.alert('Error', 'Please select a Wi-Fi network and enter the password.');
//       return;
//     }

//     setLoading(true); // Show loader during login process

//     // Simulate API request
//     setTimeout(() => {
//       setLoading(false); // Hide loader after "login"
//       Alert.alert('Logged In', 'You have successfully logged in!');
//     }, 2000); // Adjust this delay as needed for your real API request
//   };

// const getDefaultIndex = () => {
//   return selectedSSID ? transformedSSIDList.findIndex((item) => item.ssid === selectedSSID) : null;
// };

//   const handleCheckboxPress = async () => {
//     try {
//       if (!saveCredentials) {
//         await AsyncStorage.setItem('ssid', selectedSSID);
//         await AsyncStorage.setItem('password', password);
//         Alert.alert('Success', 'Wi-Fi credentials saved successfully!');
//       } else {
//         await AsyncStorage.removeItem('ssid');
//         await AsyncStorage.removeItem('password');
//         setSelectedSSID(null);  // Clear selectedSSID when unchecking
//         setPassword('');
//         Alert.alert('Notice', 'Wi-Fi credentials have been removed.');
//       }
//       setSaveCredentials(!saveCredentials);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to update credentials.');
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {/* Overlay for loading state */}
//       {loading && (
//         <View style={styles.overlay}>
//           <ActivityIndicator size="large" color="#64bbf5" />
//         </View>
//       )}

//       <View style={styles.container}>
//         <Text style={styles.label}>Select Wi-Fi Network:</Text>
//         <SelectDropdown
//   key={selectedSSID} // Force re-render based on selectedSSID
//   data={transformedSSIDList}
//   defaultValueByIndex={getDefaultIndex()}
//   onSelect={(selectedItem, index) => {
//     setSelectedSSID(selectedItem.ssid);
//   }}
//   defaultButtonText="Select Wi-Fi Network"
//   buttonTextAfterSelection={(selectedItem) => selectedItem.ssid}
//   rowTextForSelection={(item) => item.ssid}
// />

//         <Text style={styles.label}>Password:</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Wi-Fi password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />

//         <View style={styles.checkboxContainer}>
//           <Pressable onPress={handleCheckboxPress}>
//             <MaterialCommunityIcons
//               name={saveCredentials ? 'checkbox-marked' : 'checkbox-blank-outline'}
//               size={22}
//               color={saveCredentials ? '#8BBD54' : '#9c9a9a'}
//             />
//           </Pressable>
//           <Text style={styles.checkboxLabel}>Save Wi-Fi Credentials</Text>
//         </View>
//         <Button title="Connect" onPress={handleLogin} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 10,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   checkboxLabel: {
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   overlay: {
// position: 'absolute',
// top: 0,
// left: 0,
// right: 0,
// bottom: 0,
// backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
// justifyContent: 'center',
// alignItems: 'center',
// zIndex: 1, // Places overlay above other elements
//   },
//   dropdownBtnStyle: {
//     width: '100%',
//     height: 40,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 12,
//   },
//   dropdownBtnTxtStyle: {
//     color: '#444',
//     textAlign: 'left',
//     fontSize: 16,
//   },
//   dropdownDropdownStyle: {
//     backgroundColor: '#EFEFEF',
//   },
//   dropdownRowStyle: {
//     backgroundColor: '#EFEFEF',
//     borderBottomColor: '#C5C5C5',
//   },
//   dropdownRowTxtStyle: {
//     color: '#444',
//     textAlign: 'left',
//     fontSize: 16,
//   },
// });

// export default Setting;
