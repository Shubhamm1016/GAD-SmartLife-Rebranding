import React, {useState, useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  Text,
  Linking,
  View,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {Permissions, PERMISSION_TYPE} from '../../components/AppPermission';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {BleManager} from 'react-native-ble-plx';
import {
  ESPProvisionManager,
  ESPDevice,
} from '@orbital-systems/react-native-esp-idf-provisioning';
import {Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InsideHeader from '../../comman-compnent/InsideHeader';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const QRScannerScreen = props => {
  const {navigation, route} = props;
  const {serialNumber, stateName, city} = route.params;
  const {selectedId} = props.route.params;
  console.log(selectedId, 'stateName,city');
  const [scanpro, setScanPRO] = useState(true);
  console.log(scanpro, 'scanpro');
  const [scanproresult, setScanPROResult] = useState(false);
  console.log(scanproresult, 'scanproresult');
  const [resultpro, setResultPRO] = useState({});
  const manager = new BleManager();
  const scannerRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const AC = 'AC';
  const WM = 'WM';
  const getImageSource = () => {
    switch (selectedId) {
      case AC:
        return require('../../assets/bannercodeSecond.png');
      case WM:
        return require('../../assets/WMQRImage.png');

      default:
        return require('../../assets/RefImage/RefQRScaner.png');
    }
  };
  const onSuccess = async e => {
    try {
      setRefreshing(true); // Show loader

      const data = e.data;
      if (data.startsWith('{') || data.startsWith('[')) {
        const parsedData = JSON.parse(data);
        console.log(parsedData, 'parsedData');

        // setScanPRO(false);
        setScanPROResult(true);
        const check = e.data.substring(0, 4);
        if (check === 'http') {
          Linking.openURL(e.data).catch(err =>
            console.error('An error occurred', err),
          );
        } else {
          setScanPRO(false);
          setScanPROResult(false);

          // Perform asynchronous operation (e.g., sendDone) with loader
          await sendDone(
            parsedData.name,
            parsedData.pop,
            parsedData.transport,
            parsedData.ver,
          );
          setRefreshing(false);
        }
      } else {
        setScanPRO(true);
        alert('Invalid QR, please scan for app QR code');
        navigation.navigate('SerialNumber', {
          selectedId: selectedId,
        });
      }
    } catch (err) {
      console.log(err, 'errrr');
    } finally {
      setRefreshing(false); // Hide loader in case of error
    }
  };

  // const onSuccess = async e => {
  //   try {
  //     setRefreshing(true); // Show loader

  //     const data = e.data;
  //     if (data.startsWith('{') || data.startsWith('[')) {
  //       const parsedData = JSON.parse(data);
  //       console.log(parsedData, 'parsedData');

  //       setScanPROResult(true);
  //       const check = e.data.substring(0, 4);
  //       if (check === 'http') {
  //         Linking.openURL(e.data).catch(err =>
  //           console.error('An error occurred', err),
  //         );
  //       } else {
  //         setScanPRO(false);
  //         setScanPROResult(false);

  //         // Perform asynchronous operation (e.g., sendDone) with loader
  //         await sendDone(
  //           parsedData.name,
  //           parsedData.pop,
  //           parsedData.transport,
  //           parsedData.ver,
  //         );
  //         setRefreshing(false);
  //       }
  //     } else {
  //       setScanPRO(true);
  //       alert('Invalid QR, please scan for app QR code');
  //       navigation.navigate('SerialQRScanner', {
  //         selectedId: selectedId,
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err, 'errrr');
  //   } finally {
  //     setRefreshing(false); // Hide loader in case of error
  //   }
  // };

  const activeQR = () => {
    checkBluetooth();
  };

  const checkBluetooth = () => {
    waitForBluetoothOn()
      .then(() => {
        setScanPRO(true);
      })
      .catch(error => {
        if (error.message.includes('Bluetooth is PoweredOff')) {
          // Handle the case where Bluetooth is powered off
          // console.log('Bluetooth is powered off. Please enable Bluetooth.');
          Alert.alert('Bluetooth is powered off', 'Please enable Bluetooth.');
        } else {
          // Handle other rejection reasons
          console.error('Unhandled promise rejection:', error.message);
        }
      });
  };

  const requestBluetoothPermissions = async () => {
    try {
      const bluetoothConnectPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      );

      const bluetoothScanPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      );

      const locationPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'ACCESS_FINE_LOCATION Permission',
          message:
            'Cool Photo App needs access to your ACCESS_FINE_LOCATION ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (
        bluetoothConnectPermission === PermissionsAndroid.RESULTS.GRANTED &&
        bluetoothScanPermission === PermissionsAndroid.RESULTS.GRANTED &&
        locationPermission === PermissionsAndroid.RESULTS.GRANTED
      ) {
        // All permissions granted, proceed with Bluetooth functionality
        console.log('Bluetooth and location permissions granted.');
      } else {
        // Handle the case where any permission is denied
        console.warn('One or more permissions are denied.');
      }
    } catch (err) {
      console.error('Error requesting permissions:', err);
    }
  };

  const sendDone = async (name, pop, transport, ver) => {
    try {
      // Make sure Bluetooth is still on before proceeding
      await waitForBluetoothOn();

      // Request Bluetooth permissions if necessary (Android only)
      if (Platform.OS === 'android') {
        await requestBluetoothPermissions();
      }

      // Search for ESP devices
      const devices = await ESPProvisionManager.searchESPDevices(
        'PROV_',
        'ble',
        1,
      );
      console.log('Devices found:', devices);

      if (devices.length > 0) {
        const device = new ESPDevice(devices[0]);
        console.log('Device:', device);

        // Connect to the device
        const proofOfPossession = pop;
        console.log('Proof of Possession:', proofOfPossession);
        const isConnected = await device.connect(proofOfPossession, null, null);
        // console.log(isConnected, 'Connected to device successfully.');

        // Navigate to WifiScanList screen
        navigation.navigate('WifiScanList', {
          device: device,
          serialNumber: serialNumber,
          city: city,
          stateName: stateName,
          selectedId: selectedId,
        });
      } else {
        console.log('No devices found.');
      }
    } catch (error) {
      // Handle errors
      if (
        error.message.includes('No bluetooth device found with given prefix')
      ) {
        setScanPRO(true);
        alert('Device not found,Please reset your device and try again.');
        navigation.navigate('SerialNumber', {
          selectedId: selectedId,
        });
      } else if (error.message.includes('Encryption is insufficient')) {
        // Handle insufficient encryption error
        alert(
          'Unfortunately, you click the cancel button,Please switch Off and On And try again',
        );
        navigation.navigate('SerialNumber', {
          selectedId: selectedId,
        });
      } else {
        // Handle other errors
        console.error('Error: go throw', error.message);
      }
    }
  };
  const toggleTorch = () => {
    setTorchOn(prevState => !prevState); // Toggle the state
  };

  const openGallery = async () => {
    try {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 0.5,
          includeBase64: false,
        },
        response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else {
            console.log('Selected image: ', response.assets?.[0]?.uri);
          }
        },
      );
    } catch (error) {
      console.error('Error opening gallery:', error);
    }
  };

  const scanAgain = () => {
    setScanPRO(true);
    setScanPROResult(false);
  };

  // const waitForBluetoothOn = async () => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const checkBluetoothState = async () => {
  //         try {
  //           const bluetoothState = await manager.state();

  //           switch (bluetoothState) {
  //             case 'PoweredOn':
  //               resolve();
  //               break;
  //             case 'PoweredOff':
  //             case 'Unsupported':
  //               reject(new Error(`Bluetooth is ${bluetoothState}`));
  //               break;
  //             default:
  //               setTimeout(() => {
  //                 try {
  //                   checkBluetoothState(); // Check again after 1 second
  //                 } catch (error) {
  //                   reject(error);
  //                 }
  //               }, 1000);
  //               break;
  //           }
  //         } catch (error) {
  //           reject(error);
  //         }
  //       };

  //       await checkBluetoothState();
  //     } catch (error) {
  //       console.error('Error during Bluetooth check:', error.message);
  //       reject(error);
  //     }
  //   });
  // };

  const waitForBluetoothOn = () => {
    return new Promise((resolve, reject) => {
      try {
        const checkBluetoothState = async () => {
          try {
            const bluetoothState = await manager.state();

            switch (bluetoothState) {
              case 'PoweredOn':
                resolve();
                break;
              case 'PoweredOff':
                reject(new Error('Bluetooth is PoweredOff'));
                break;
              case 'Unsupported':
                reject(new Error('Bluetooth is Unsupported'));
                break;
              default:
                setTimeout(() => {
                  checkBluetoothState(); // Check again after 1 second
                }, 1000);
                break;
            }
          } catch (error) {
            reject(error);
          }
        };

        checkBluetoothState();
      } catch (error) {
        console.error('Error during Bluetooth check:', error.message);
        reject(error);
      }
    });
  };

  useEffect(() => {
    Permissions.checkPermission(PERMISSION_TYPE.camera);
    activeQR();
  }, []);

  return (
    <SafeAreaView style={styles.scrollViewStyle}>
      <View style={styles.scrollViewStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <InsideHeader
              title="Add Device"
              onBackPress={() => navigation.goBack()} // Set your back action here
            />
          </View>
        </View>

        {/* <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-end',
                // backgroundColor: 'red',
              }}>
              <Image
                source={getImageSource()}
                style={{width: 350, height: 180, resizeMode: 'contain'}}
              />
            </View> */}

        <View>
          <Text style={styles.textTitle}>Scan QR</Text>
        </View>

        {/* {scanproresult && (
          <>
            <Text style={styles.textTitle1}>Result</Text>
            <View style={scanproresult ? styles.scanCardView : styles.cardView}>
              <Text>name : {resultpro.name}</Text>
              <Text>transport : {resultpro.transport}</Text>
              <Text>POP : {resultpro.pop}</Text>
              <Text numberOfLines={1}>ver: {resultpro.ver}</Text>
              <TouchableOpacity onPress={scanAgain} style={styles.buttonScan}>
                <View style={styles.buttonWrapper}>
                  <Text
                    style={{
                      ...styles.buttonTextStyle,
                      color: '#2196f3',
                    }}>
                    Click to scan again
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  sendDone(
                    resultpro.name,
                    resultpro.pop,
                    resultpro.transport,
                    resultpro.ver,
                  );
                }}
                style={styles.buttonScan}>
                <View style={styles.buttonWrapper}>
                  <Text
                    style={{
                      ...styles.buttonTextStyle,
                      color: '#2196f3',
                    }}>
                    Done
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )} */}

        {scanpro && (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor:'red'
            }}>
            <QRCodeScanner
              reactivate={true}
              showMarker={true}
              cameraStyle={{
                height: 350,
                width: 350,
                alignSelf: 'center',
                marginTop: 10,
                borderRadius: 50,
              }}
              ref={scannerRef}
              onRead={onSuccess}
              bottomContent={
                <View>
                  <TouchableOpacity
                    style={styles.buttonScan2}
                    onPress={() => scannerRef.current.reactivate()}
                    onLongPress={() => setScanPRO(false)}></TouchableOpacity>
                </View>
              }
            />
            {/* <TouchableOpacity
              onPress={toggleTorch} // Toggle torch state on press
              style={styles.torchButton}>
              <MaterialIcons
                name={torchOn ? 'flashlight-on' : 'flashlight-off'} // Change icon based on torch state
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
            <View style={{marginRight: 200, marginBottom: 600}}>
              <TouchableOpacity
                onPress={openGallery} // Handle gallery icon press
                style={styles.galleryButton}>
                <AntDesign name="picture" size={20} color="#fff" />
              </TouchableOpacity>
            </View> */}
            <View
              style={{
                flex: 1,
                paddingHorizontal: 10,
                paddingVertical: 10,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              <Image
                source={getImageSource()}
                style={{width: 350, height: 180, resizeMode: 'contain'}}
              />
            </View>
          </View>
        )}
        {refreshing && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              // justifyContent: 'flex-end',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
              // backgroundColor: 'red',
            }}>
            {/* <View style={{flexDirection:'row',alignItems:'center'}}> */}
            <ActivityIndicator size="large" color="#810055" />
            {/* <Text style={{fontSize:18,color:'#64bbf5', fontWeight: 'bold',}}>Scan Wi-Fi...</Text> */}
            {/* </View> */}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default QRScannerScreen;
const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '10%',
    paddingLeft: 20,
    paddingTop: 10,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
  },
  textTitle1: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'white',
  },
  cardView: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    padding: 25,
    marginLeft: 5,
    marginRight: 5,
    marginTop: '10%',
    backgroundColor: 'white',
  },
  scanCardView: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 25,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonScan: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#258ce3',
    paddingTop: 5,
    paddingRight: 25,
    paddingBottom: 5,
    paddingLeft: 25,
    marginTop: 20,
  },
  buttonScan2: {
    width: 100,
    height: 100,
  },
  descText: {
    padding: 16,
    textAlign: 'center',
    fontSize: 16,
  },
  centerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    padding: 32,
    color: 'white',
  },
  buttonTextStyle: {
    // your button text style
  },
  galleryButton: {
    position: 'absolute',
    // bottom: 80, // Position it just above the flashlight button
    right: 20, // Position it on the right side
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    borderRadius: 50, // Make it circular
    padding: 12, // Padding inside the button
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Add shadow on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOpacity: 0.3, // Shadow opacity on iOS
    shadowRadius: 5, // Shadow blur on iOS
    shadowOffset: {width: 2, height: 2}, // Shadow offset on iOS
  },
  torchButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 30,
  },
});
