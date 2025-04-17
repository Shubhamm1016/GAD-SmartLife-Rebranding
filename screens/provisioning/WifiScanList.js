import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Pressable,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ESPDevice} from '@orbital-systems/react-native-esp-idf-provisioning';
import uuid from 'react-native-uuid';
import {jwtDecode} from 'jwt-decode';
import 'core-js/stable/atob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CmdSetUserMapping,
  RMakerConfigPayload,
  RMakerConfigMsgType,
} from '../proto/provision_pb';
import {GEGBold, GEGHeadline} from '../../comman-compnent/FontFamily';
import InsideHeader from '../../comman-compnent/InsideHeader';
import {ScrollView} from 'react-native-gesture-handler';

function WifiScanList({navigation, route}) {
  const {device, serialNumber, stateName, selectedId, city} = route.params;
  console.log(stateName, 'stateName');
  const [refreshing, setRefreshing] = useState(false);
  const [allwifiListData, setAllWifListData] = useState([]);
  const [ssid, setSSID] = useState('');
  const [ssidPassword, setSSIDPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [saveCredentials, setSaveCredentials] = useState(false);
  const deviceInfo = {
    name: device.name,
    security: device.security,
    transport: device.transport,
  };
  const devicee = new ESPDevice(deviceInfo);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  // const handleCheckboxPress = async () => {
  //   try {
  //     if (!saveCredentials) {
  //       // Save credentials if checkbox is being checked
  //       await AsyncStorage.setItem('ssid', ssid);
  //       await AsyncStorage.setItem('ssidPassword', ssidPassword);
  //       // Alert.alert('Success', 'Credentials saved successfully!');
  //     } else {
  //       // Clear credentials if checkbox is being unchecked
  //       await AsyncStorage.removeItem('ssid');
  //       await AsyncStorage.removeItem('ssidPassword');
  //       setSSID('');
  //       setSSIDPassword('');
  //     }
  //     setSaveCredentials(!saveCredentials); // Toggle checkbox state
  //   } catch (error) {
  //     Alert.alert('Error', 'Failed to update credentials.');
  //   }
  // };

  function createAssociationConfigRequest(secretKey, userID) {
    console.log('secretKey :', secretKey, 'userID :', userID);

    // Create CmdSetUserMapping message
    const configRequest = new CmdSetUserMapping();
    configRequest.setSecretkey(secretKey);
    configRequest.setUserid(userID);

    console.log('configRequest :', configRequest);

    // Create RMakerConfigPayload message
    const payload = new RMakerConfigPayload();
    payload.setMsg(RMakerConfigMsgType.TYPECMDSETUSERMAPPING);
    payload.setCmdSetUserMapping(configRequest);

    console.log('payload :', payload);

    // Serialize payload to binary data
    const serializedData = payload.serializeBinary();
    console.log('serializedData :', serializedData);

    return serializedData;
  }

  async function pressClickHandler(ssid, ssidPassword) {
    setRefreshing(true);
    try {
      const idToken = await AsyncStorage.getItem('TokenId');
      if (!idToken) {
        throw new Error('TokenId not found');
      }
      const decoded = jwtDecode(idToken);
      console.log(decoded, 'decoded');
      const userID = decoded['custom:user_id'];
      const secretKey = uuid.v4();
      const serializedData = createAssociationConfigRequest(secretKey, userID);
      const path = 'cloud_user_assoc';
      const data = serializedData;
      const espResponse = await devicee.sendData(path, data);
      if (typeof espResponse !== 'string') {
        throw new Error('Invalid response from device');
      }
      const result = espResponse.slice(6);
      const provisioningResult = await device.provision(ssid, ssidPassword);
      console.log('Provisioning result:', provisioningResult);
      setRefreshing(false);
      navigation.navigate('Provisioning', {
        ssid,
        ssidPassword,
        serialNumber,
        espResponse,
        secretKey,
        nodeid: result,
        userId: userID,
        city,
        stateName,
        selectedId,
      });
    } catch (error) {
      setRefreshing(false);
      if (error.message === 'Wi-Fi status: authentication error') {
        alert('Incorrect Password, Please reset your Device configration.');
        setSSID('');
        setSSIDPassword('');
        navigation.navigate('SerialNumber', {
          selectedId: selectedId,
        });
      } else {
        setRefreshing(false);
        console.error('Error during Wi-Fi provisioning:', error.message);
        console.error('Error stack:', error.stack);
        alert('Please reset your Device configration.');
        navigation.navigate('SerialNumber', {
          selectedId: selectedId,
        });
      }
    }
  }

  // async function pressClickHandler(ssid, ssidPassword) {
  //   setRefreshing(true);
  //   try {
  //     const idToken = await AsyncStorage.getItem('TokenId');
  //     if (!idToken) {
  //       throw new Error('TokenId not found');
  //     }
  //     const decoded = jwtDecode(idToken);
  //     console.log(decoded, 'decoded');
  //     const userID = decoded['custom:user_id'];
  //     const secretKey = uuid.v4();
  //     const serializedData = createAssociationConfigRequest(secretKey, userID);
  //     const path = 'cloud_user_assoc';
  //     const data = serializedData;
  //     const espResponse = await devicee.sendData(path, data);
  //     if (typeof espResponse !== 'string') {
  //       throw new Error('Invalid response from device');
  //     }
  //     const result = espResponse.slice(6);
  //     const provisioningResult = await device.provision(ssid, ssidPassword);
  //     console.log('Provisioning result:', provisioningResult);
  //     setRefreshing(false);
  //     navigation.navigate('Provisioning', {
  //       ssid,
  //       ssidPassword,
  //       serialNumber,
  //       espResponse,
  //       secretKey,
  //       nodeid: result,
  //       userId: userID,
  //       city,
  //       stateName,
  //       selectedId,
  //     });
  //   } catch (error) {
  //     setRefreshing(false);
  //     if (error.message === 'Wi-Fi status: authentication error') {
  //       alert('Incorrect Password, Please reset your Device configration.');
  //       setSSID('');
  //       setSSIDPassword('');
  //       navigation.navigate('SerialNumber', {
  //         selectedId: selectedId,
  //       });
  //     } else {
  //       setRefreshing(false);
  //       console.error('Error during Wi-Fi provisioning:', error.message);
  //       console.error('Error stack:', error.stack);
  //       alert(error.message, 'shubham');
  //     }
  //   }
  // }

  const AllWifiList = async () => {
    try {
      setRefreshing(true);
      const wifiList = await devicee.scanWifiList();
      console.log(wifiList, 'wifiListwifiList');
      setRefreshing(false);

      // Check if wifiList is nil or empty
      if (!wifiList || wifiList.length === 0) {
        console.error(
          'Error: Number of Wi-Fi network scanned result is nil or empty.',
        );
        // Handle the error, display a message, or take any other necessary action
        return; // Exit the function early as there's no valid data to set
      }
      setAllWifListData(wifiList);
    } catch (error) {
      setRefreshing(false);
      if (
        error.message.includes(
          'Request for returning Wi-Fi network list failed',
        )
      ) {
        console.error(
          'Error: The command for returning Wi-Fi network list is invalid.',
        );
      } else {
        console.error(
          'Error during connection or provisioning:',
          error.message,
        );
        console.error('Error stack:', error.stack);
      }
      throw error;
    }
  };

  const ssidList = allwifiListData.map(item => item.ssid);

  const pullme = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (device) {
          console.log('Fetching Wi-Fi list...');
          await AllWifiList();
          console.log('Wi-Fi list fetched successfully.');
          pullme(); // Call pullme after fetching Wi-Fi list
        } else {
          console.log('No device available.');
        }
      } catch (error) {
        console.error('Error during Wi-Fi list fetching:', error.message);
        console.error('Error stack:', error.stack);
      }
    };

    fetchData(); // Call the async function immediately
  }, [device]);

  // useEffect(() => {
  //   // Load saved credentials from AsyncStorage when the app starts
  //   const loadCredentials = async () => {
  //     try {
  //       const savedssid = await AsyncStorage.getItem('ssid');
  //       const savedssidPassword = await AsyncStorage.getItem('ssidPassword');
  //       if (savedssid && savedssidPassword) {
  //         setSSID(savedssid);
  //         setSSIDPassword(savedssidPassword);
  //         setSaveCredentials(true);
  //       }
  //     } catch (error) {
  //       Alert.alert('Error', 'Failed to load credentials.');
  //     }
  //   };
  //   loadCredentials();
  // }, []);

  // useEffect(() => {
  //   const initializeData = async () => {
  //     try {
  //       // Load saved credentials from AsyncStorage
  //       const savedSSID = await AsyncStorage.getItem('ssid');
  //       const savedSSIDPassword = await AsyncStorage.getItem('ssidPassword');
  //       if (savedSSID && savedSSIDPassword) {
  //         setSSID(savedSSID);
  //         setSSIDPassword(savedSSIDPassword);
  //         setSaveCredentials(true);
  //       }

  //       // Fetch Wi-Fi list if the device is available
  //       if (device) {
  //         console.log('Fetching Wi-Fi list...');
  //         setRefreshing(true);
  //         const wifiList = await devicee.scanWifiList();
  //         console.log(wifiList, 'wifiListwifiList');

  //         if (!wifiList || wifiList.length === 0) {
  //           console.warn('No Wi-Fi networks found.');
  //         } else {
  //           setAllWifListData(wifiList);
  //         }
  //         console.log('Wi-Fi list fetched successfully.');
  //       } else {
  //         console.log('No device available.');
  //       }
  //     } catch (error) {
  //       console.error('Error during data initialization:', error.message);
  //       console.error('Error stack:', error.stack);
  //       Alert.alert('Error', 'Failed to load credentials or fetch Wi-Fi list.');
  //     } finally {
  //       setRefreshing(false);
  //     }
  //   };

  //   initializeData();
  // }, [device]);

  // // Derive the list of SSIDs for easier usage later
  // const ssidList = allwifiListData?.map(item => item.ssid) || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.layoutTop}>
        {/* <AntDesign
          onPress={() => navigation.goBack()}
          name="arrowleft"
          size={20}
          color="black"
        /> */}
        <View>
          <InsideHeader
            title="WIFI Scan List"
            onBackPress={() => navigation.goBack()} // Set your back action here
          />
        </View>
      </View>
      <ScrollView>
        <View style={{marginTop: 24, alignItems: 'center'}}>
          <Image
            source={require('../../assets/wifi.png')}
            style={{width: 60, height: 60}}
          />
        </View>
        <TouchableOpacity onPress={AllWifiList}>
          <Text
            style={{
              fontSize: 18,
              marginTop: 14,
              height: 45,
              marginStart: 20,
              marginEnd: 20,
              backgroundColor: 'white',
              padding: 10,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: '#9c9a9a',
              textAlign: 'center',
              fontFamily: GEGHeadline,
            }}>
            Rescan
          </Text>
        </TouchableOpacity>

        <SelectDropdown
          data={ssidList}
          defaultValueByIndex={1}
          defaultValue={'Egypt'}
          onSelect={(selectedItem, index) => {
            setSSID(selectedItem);
            console.log(selectedItem, index, 'ssssss');
          }}
          defaultButtonText={'Select network'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#444'}
                size={18}
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
        <View
          style={{
            flexDirection: 'row', // Align children horizontally
            alignItems: 'center', // Center vertically
            marginTop: 18,
            marginHorizontal: 20,
            backgroundColor: '#fff',
            paddingVertical: 10,
            padding: 10,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: '#9c9a9a',
            height: 45,
          }}>
          <TextInput
            onChangeText={value => setSSIDPassword(value)}
            // style={styles.input}
            style={{
              flex: 1,
              height: 45,
              color: '#000',
            }}
            placeholderTextColor="#000"
            placeholder="Password"
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity
            style={{
              marginLeft: 8,
              position: 'relative',
            }}
            onPress={toggleSecureEntry}>
            <Entypo
              name={secureTextEntry ? 'eye-with-line' : 'eye'}
              size={18}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        {/* <View
        style={{
          flexDirection: 'row', // Align children horizontally
          alignItems: 'center', // Center vertically
          marginTop: 18,
          marginHorizontal: 20,
          // backgroundColor: '#fff',
          paddingVertical: 10,
          padding: 10,
          paddingHorizontal: 12,
          // borderWidth: 1,
          // borderRadius: 8,
          // borderColor: '#9c9a9a',
          // height: 45,
        }}>
        <Pressable onPress={handleCheckboxPress}>
          <MaterialCommunityIcons
            name={
              saveCredentials ? 'checkbox-marked' : 'checkbox-blank-outline'
            }
            size={22}
            color={saveCredentials ? '#8BBD54' : '#9c9a9a'}
          />
        </Pressable>
        <Text style={styles.checkboxLabel}>Save Password</Text>
      </View> */}

        <View
          style={{
            margin: 12,
            backgroundColor: '#F9F2F6',
            padding: 24,
            borderRadius: 16,
          }}>
          <Text
            style={{
              color: 'white',
              marginTop: 12,
              fontSize: 28,
              fontFamily: GEGBold,
            }}>
            01
          </Text>
          <Text
            style={{
              marginTop: 4,
              fontSize: 14,
              color: '#810055',
              fontFamily: GEGHeadline,
            }}>
            For better performance,please use Wifi with {'\n'}broadband or fibre
            optic connection.
          </Text>

          <Text
            style={{
              color: 'white',
              marginTop: 12,
              fontSize: 28,
              fontFamily: GEGBold,
            }}>
            02
          </Text>
          <Text
            style={{
              marginTop: 4,
              fontSize: 14,
              color: '#810055',
              fontFamily: GEGHeadline,
            }}>
            Make sure you have a download and upload speeds{'\n'}above 2Mbps.
          </Text>

          <Text
            style={{
              color: 'white',
              marginTop: 12,
              fontSize: 28,
              fontFamily: GEGBold,
            }}>
            03
          </Text>
          <Text
            style={{
              marginTop: 4,
              fontSize: 14,
              color: '#810055',
              fontFamily: GEGHeadline,
            }}>
            If you are using dual-band router make please {'\n'}connect to the
            2.4 GHz band.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            pressClickHandler(ssid, ssidPassword);
          }}
          style={{alignItems: 'center'}}>
          <LinearGradient
            colors={['#810055', '#810055']}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
        </ScrollView>
        {refreshing && (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
            }}>
            <ActivityIndicator size="large" color="#810055" />
          </View>
        )}
    
    </SafeAreaView>
  );
}

export default WifiScanList;

const styles = StyleSheet.create({
  textLayout: {
    flex: 1,
    marginStart: 10,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  layoutTop: {
    flexDirection: 'row',
    // marginStart: 12,
    // marginEnd: 12,
    marginTop: 12,
  },
  appButtonContainer: {
    elevation: 8,
    marginTop: 4,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12,
    height: 55,
    justifyContent: 'center',
    width: 350,
  },
  appButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: GEGBold,
    alignSelf: 'center',
  },
  input: {
    height: 45,
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#9c9a9a',
  },
  dropdown1BtnStyle: {
    width: '91%',
    height: 45,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9c9a9a',
    margin: 19,
  },
  dropdown1BtnTxtStyle: {color: '#707070', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
});
