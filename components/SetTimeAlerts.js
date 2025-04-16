// import {View, Text, NativeModules} from 'react-native';
// import React, {useEffect} from 'react';

// // import EspIdfProvisioning from 'react-native-esp-idf-provisioning';

// const SetTimeAlerts = props => {
//   const {navigation} = props;
//   const {ESPProvisionBridge} = NativeModules;
//   console.log(ESPProvisionBridge, 'ESPProvisionBridge');
//   // if (!ESPProvisionBridge) {
//   //   console.error(
//   //     'ESPProvisionBridge is not available. Make sure the module is linked properly.',
//   //   );
//   // }
//   // // Your existing code
//   // const handleProvisioningPress = async () => {
//   //   try {
//   //     // Trigger provisioning
//   //     await ESPProvisionBridge.startProvisioning();
//   //     console.log('Provisioning started successfully');
//   //   } catch (error) {
//   //     console.error('Provisioning error:', error);
//   //   }
//   // };

//   useEffect(() => {
//     // handleProvisioningPress();
//   }, []);

//   return (
//     <View>
//       <Text>SetTimeAlerts</Text>
//     </View>
//   );
// };

// export default SetTimeAlerts;

// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, NativeModules } from 'react-native';
// import { RNCamera } from 'react-native-camera';

// const SetTimeAlerts = () => {
//   const [scanned, setScanned] = useState(false);
//   const [device,SetDevice] = useState('')
//   console.log(device,"device");
//   const { ESPProvisionBridge } = NativeModules;

// const onBarCodeRead = (event) => {
//   if (!scanned) {
//     setScanned(true);
//     // Handle the QR code data
//     SetDevice(event.data);
//     handleProvisioningPress();
//   }
// };

//   const handleProvisioningPress = async () => {
//     try {
//       // Trigger provisioning
//       // await ESPProvisionBridge.startProvisioning();
//       console.log('Provisioning started successfully');
//     } catch (error) {
//       console.error('Provisioning error:', error);
//     }
//   };

//   useEffect(() => {
//     setScanned(false);
//   }, [scanned]);

//   return (
//     <View style={styles.container}>
//       <RNCamera
//         style={styles.preview}
//         onBarCodeRead={onBarCodeRead}
//         type={RNCamera.Constants.Type.back}
//         flashMode={RNCamera.Constants.FlashMode.auto}
//       />
//       <View style={styles.overlay} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
// });

// export default SetTimeAlerts;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   PermissionsAndroid,
//   ToastAndroid,
//   Vibration,
//   Alert,
// } from 'react-native';
// import { RNCamera } from 'react-native-camera'; // Make sure to install 'react-native-camera' package

// const SetTimeAlerts = () => {
//   const [isQrCodeDataReceived, setIsQrCodeDataReceived] = useState(false);
//   const [connectedNetwork, setConnectedNetwork] = useState('');
//   const [espDevice, setEspDevice] = useState(null);

//   useEffect(() => {
//     openCamera();
//     // Subscribe to events or set up any necessary configurations
//     // Similar to EventBus in Android
//     return () => {
//       // Unsubscribe or clean up
//     };
//   }, []);

//   const openCamera = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         // Camera permission granted
//         // Set up your camera here
//       } else {
//         ToastAndroid.show('Camera permission denied', ToastAndroid.SHORT);
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   const scanQrCode = () => {
//     // Implement QR code scanning logic here
//   };

//   const onQrCodeScanned = () => {
//     // QR code scanned logic
//     // showLoading();
//     Vibration.vibrate(50);
//     setIsQrCodeDataReceived(true);
//   };

//   const onDeviceDetected = (device) => {
//     // Device detected logic
//     setEspDevice(device);
//     // Additional logic for device detection
//   };

//   const onFailure = (error) => {
//     // Handle failure, e.g., WiFi module not found
//     hideLoading();
//     ToastAndroid.show('WiFi module not found', ToastAndroid.SHORT);
//     // Additional error handling logic
//   };

//   const checkDeviceCapabilities = () => {
//     // Implement checking device capabilities logic here
//     // Similar to the checkDeviceCapabilities method in your Java code
//   };

//   const alertForClaimingNotSupported = () => {
//     // Implement alert logic for claiming not supported
//     // Similar to the alertForClaimingNotSupported method in your Java code
//   };

//   const goToWiFiScanActivity = () => {
//     // Implement navigation logic to WiFiScanActivity
//     // Similar to the goToWiFiScanActivity method in your Java code
//   };

//   const goToWiFiConfigActivity = () => {
//     // Implement navigation logic to WiFiConfigActivity
//     // Similar to the goToWiFiConfigActivity method in your Java code
//   };

//   const goToClaimingActivity = () => {
//     // Implement navigation logic to ClaimingActivity
//     // Similar to the goToClaimingActivity method in your Java code
//   };

//   return (
//     <View style={styles.container}>
//       {/* Your React Native UI components go here */}
//       <RNCamera
//         style={styles.camera}
//         onBarCodeRead={() => onQrCodeScanned()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     flex: 1,
//     width: '100%',
//   },
// });

// export default SetTimeAlerts;

// import * as React from 'react';
// import {
//   StyleSheet,
//   View,
//   Button,
//   Platform,
//   NativeEventEmitter,
//   NativeModules,
//   PermissionsAndroid,
//   Linking,
// } from 'react-native';
// import {RNCamera} from 'react-native-camera';
// import EspIdfProvisioning from 'react-native-esp-idf-provisioning';
// import {request, PERMISSIONS} from 'react-native-permissions';

// const EspIdfProvisioningModule = NativeModules.EspIdfProvisioning;
// const deviceProofOfPossession = '021a9004-0382-4aea-bff4-6b3f1c5adfb4';
// // console.log(EspIdfProvisioningModule,"EspIdfProvisioning");
// console.log(EspIdfProvisioningModule,"EspIdfProvisioningaaaa");
// export default function SetTimeAlerts() {
//   let foundBLEDevices = [];

//   const handleConnect = () => {
//     if (Platform.OS === 'android') {
//       //no need to connect since in Android
//       //create & connect happen in the same function
//     } else {
//       EspIdfProvisioning.connectDevice();
//     }
//   };

//   const handleGetBleDevices = async () => {
//     console.log('GetBLEDevices: Start');
//     if (Platform.OS === 'android') {
//       console.log('androidd');
//       await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
//     } else {
//       console.log('ios');
//       await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
//     }
//     // return
//     try {
//       const devices = await EspIdfProvisioning.getBleDevices('PROV__');
//       console.log(devices, 'devices');
//       // return;
//       if (devices.length > 0) {
//         console.log('GetBLEDevices: found devices:', devices);
//         foundBLEDevices = devices;
//       } else {
//         console.log('GetBLEDevices: No devices found');
//       }
//     } catch (error) {
//       console.log('GetBLEDevices: ' + error);
//     }
//   };

//   const handleConnectBleDevice = async () => {
//     const espIdfProvisioningEmitter = new NativeEventEmitter(
//       EspIdfProvisioningModule,
//     );
//     console.log(espIdfProvisioningEmitter,"espIdfProvisioningEmitter");
//     espIdfProvisioningEmitter.addListener(
//       'DeviceConnectionEvent',
//       function (event) {
//         console.log('DeviceConnectionEvent');
//         console.log(event);

//         espIdfProvisioningEmitter.removeListeners('DeviceConnectionEvent');
//       },
//     );

//     console.log('handleConnectBleDevice: start connection');
//     console.log(foundBLEDevices,"foundBLEDevices");
//     if (foundBLEDevices.length === 0) {
//       console.log(
//         "handleConnectBleDevice: Can't connect because there are no devices found",
//       );
//       return;
//     }

//     try {
//       const connectedDevice = await EspIdfProvisioning.connectBleDevice(
//         foundBLEDevices[0].address,
//         deviceProofOfPossession,
//       ); // For testing we use the first matching device.
//       console.log(
//         'handleConnectBleDevice: Connection started to: ' + connectedDevice,
//       );
//     } catch (error) {
//       console.log('handleConnectBleDevice: Connection failed: ' + error);
//     }
//   };

//   const handleCreate = async () => {
//     let deviceSSID = 'NETGEAR80';
//     let devicePassword = 'silkyprairie373';

//     try {
//       if (Platform.OS === 'android') {
//         const result = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//         );

//         console.log(result, "result");

//         if (result === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('Location permission granted');
//           // Perform actions after permission is granted
//         } else {
//           console.log('Location permission denied');

//           if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
//             alert('Please enable location permission in app settings.');
//             Linking.openSettings();
//           }
//           // Handle denial or show a message to the user
//         }
//       }else {
//         await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
//       }
//       EspIdfProvisioning.createDevice(
//         deviceSSID,
//         devicePassword,
//         deviceProofOfPossession,
//         (error, value) => {
//           console.log({error, value});
//         },
//       );
//     } catch (error) {
//       console.log(error,"errorerrorerror");
//       // alert('Location permisson denied');
//     }
//   };

//   const handleScanWifi = async () => {
//     console.log('handleScanWifi: start');
//     try {
//       const foundNetworks = await EspIdfProvisioning.scanWifiList();
//       console.log('handleScanWifi: Found Networks: ' + foundNetworks);
//     } catch (error) {
//       console.log('handleScanWifi: ' + error);
//     }
//   };

//   const handleProvision = async () => {
//     try {
//       const value = EspIdfProvisioning.provision(
//         'PROV_TEST_LAN_SSID',
//         'PROV_TEST_LAN_PASSWORD',
//       );
//       console.log('handleProvision: ' + value);
//     } catch (error) {
//       console.log('handleProvision: ' + error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Get BLE Devices" onPress={handleGetBleDevices} />
//       <Button title="Connect BLE Device" onPress={handleConnectBleDevice} />
//       <Button title="Scan Wifi List" onPress={handleScanWifi} />
//       <Button title="Create Device" onPress={handleCreate} />
//       <Button title="Connect" onPress={handleConnect} />
//       <Button title="Provision" onPress={handleProvision} />
//       {/* <RNCamera
//         style={styles.preview}
//         onBarCodeRead={onBarCodeRead}
//         type={RNCamera.Constants.Type.back}
//         flashMode={RNCamera.Constants.FlashMode.auto}
//       /> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// import React, { useState } from 'react';
// import {
//     View,
//     Button,
//     Text,
//     ToastAndroid
// } from 'react-native';
// import EspIdfBleProvisioningRn from "react-native-esp-idf-ble-provisioning-rn";

// const SetTimeAlerts = () => {
//     const [uuid, setUuid] = useState("021a9004-0382-4aea-bff4-6b3f1c5adfb4");
//     const [pop, setPop] = useState("");
//     console.log(EspIdfBleProvisioningRn,"data ");
//     // EspIdfBleProvisioningRn.create();

//     const scanFunc = () => {
//         console.log("scan init")
//         EspIdfBleProvisioningRn.scanBleDevices("PROV_").then(res => {
//             console.log(res)
//             if (res.length > 0) {
//                 setUuid(res[0].serviceUuid);
//             } else {
//                 setUuid("");
//             }
//         }).catch(e => {
//             console.log(e ,"what")
//         })
//     }

//     const connectFun = () => {
//         EspIdfBleProvisioningRn.connectToBLEDevice(uuid).then(res => {
//             ToastAndroid.show("Connected to device", ToastAndroid.LONG)
//         }).catch(e => {
//             ToastAndroid.show("Connect to device error", ToastAndroid.LONG)
//             console.log(e)
//         })
//     }

//     const setProof = () => {
//         EspIdfBleProvisioningRn.setProofOfPossession("abcd1234");
//         ToastAndroid.show("Pop: abcd1234", ToastAndroid.LONG)
//     }

//     const getProof = async () => {
//         EspIdfBleProvisioningRn.getProofOfPossession().then((pop) => {
//             setPop(pop)
//         }).catch((e) => {
//             ToastAndroid.show("Get pop error", ToastAndroid.LONG)
//             console.error(e)
//         })
//     }

//     const scanNetworks = () => {
//         EspIdfBleProvisioningRn.scanNetworks().then(res => {
//             ToastAndroid.show("Number of networks found: "+res.length, ToastAndroid.LONG)
//         }).catch(e => {
//             ToastAndroid.show("Scan networks error", ToastAndroid.LONG)
//             console.log(e)
//         })
//     }

//     const provCreds = () => {
//         EspIdfBleProvisioningRn.provisionNetwork("SSIS", "PASS").then(resp => {
//             ToastAndroid.show("Credentials provided with success", ToastAndroid.LONG)
//             console.log(resp)
//         }).catch(e => {
//             ToastAndroid.show("Provide creds error", ToastAndroid.LONG)
//             console.log(e)
//         })
//     }

//     const provCustom = () => {
//         EspIdfBleProvisioningRn.sendCustomData("custom-endpoint", "testinho").then(resp => {
//             ToastAndroid.show("Custom data provisioned successfully", ToastAndroid.LONG)
//             console.log(resp)
//         }).catch(e => {
//             ToastAndroid.show("Provision Custom Data Error, " + e.getMessage(), ToastAndroid.LONG)
//             console.log(e)
//         })
//     }

//   const provCustomWithByteData = () => {
//     // Often the strings communicating over BLE are really binary represented as UTF-8
//     // however UTF-16 is the react-native spec for strings
//     // These strings are usually generated with a cipher, perhaps protobuf (on npmjs)
//     // what's important is that React-Native is programmed in C. And C will trim trailing
//     // \x00 characters from strings. This has a big impact on BLE communication

//     // usually using Protocl Buffers, one would cmd.serializeBinary()
//     // which renders protcol buffer messages into binary wire format, a Uint8Array in JS
//     // const cmdContent = cmd.serializeBinary();
//     // however for demonstration let's start with a string with problematic trailing characters
//     const string = 'R\u0000';
//     console.log(string); // R�
//     // render string as Uint8Array, a typed array that represents an array of 8-bit unsigned integers
//     // this is the medium most common to protocol buffers
//     const strToBuf = str => {
//       var buf = new ArrayBuffer(str.length);
//       var bufView = new Uint8Array(buf);
//       for (let i = 0; i < str.length; i++) {
//         bufView[i] = str.charCodeAt(i);
//       }
//       return bufView;
//     };
//     const stringAsByteArray = strToBuf(string);
//     console.log(stringAsByteArray); // [82, 0] these numbers are in decimal, need to be hexi
//     // a Uint8Array in JS isn't exactly an array, more like {0: 82, 1:0} and yet there's more differences
//     // below converts the Uint8Array into a JS array of strings,
//     // each string is hexidecimal value of corresponding byte
//     const hexArrayOfCmdContent = Object.keys(stringAsByteArray).map(i =>
//       stringAsByteArray[i].toString(16),
//     );
//     // using JSON.stringify below so it makes clear whether the values are strings or numbers
//     console.log('hexArrayOfCmdContent: ', JSON.stringify(hexArrayOfCmdContent)); // ["52", "0"]

//     EspIdfBleProvisioningRn.sendCustomDataWithByteData(
//       'custom-endpoint',
//       hexArrayOfCmdContent,
//     )
//       .then(resp => {
//         // this is worth tweaking, but I have found that the data response
//         // is wrapped in some other packaging I have to strip away from
//         // the beginning and then JSON parsing works. The Native Backend manages
//         // encryption at the session level
//         const data = JSON.parse(resp.data.substring(8));
//         ToastAndroid.show(
//           'Custom data with byte accuracy provisioned successfully',
//           ToastAndroid.LONG,
//         );
//         console.log(data);
//       })
//       .catch(e => {
//         console.log(e && e.message ? e.message : 'error querying live data');
//       });
//   };

//   return (
//     <View
//       style={{
//         justifyContent: 'space-around',
//         flex: 1,
//         padding: 10,
//         alignContent: 'center',
//       }}>
//       <Button title="Scan Devices" onPress={scanFunc} />
//       <Text style={{color: 'white', textAlign: 'center'}}>
//         Service UUID: {uuid}
//       </Text>
//       <Button title="Connect to Device" onPress={connectFun} />
//       <Button title="Set PoP" onPress={setProof} />
//       <Button title="Get PoP" onPress={getProof} />
//       <Text style={{color: 'white', textAlign: 'center'}}>Pop: {pop}</Text>
//       <Button title="Scan Networks" onPress={scanNetworks} />
//       <Button title="Provision WiFi Credentials" onPress={provCreds} />
//       <Button title="Provision Custom Data" onPress={provCustom} />
//       <Button
//         title="Provision Custom Data with Byte Information"
//         onPress={provCustomWithByteData}
//       />
//     </View>
//   );
// };

// export default SetTimeAlerts;

import {
  ESPProvisionManager,
  ESPDevice,
  ESPTransport,
  ESPSecurity,
} from '@orbital-systems/react-native-esp-idf-provisioning';
import {ESPWifiAuthMode} from '@orbital-systems/react-native-esp-idf-provisioning/src';

import React, {useState, useEffect} from 'react';
import {View, Text, Button, PermissionsAndroid, Platform} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import {request, PERMISSIONS} from 'react-native-permissions';
// import WifiManager from 'react-native-wifi-reborn';
// import EspIdfBleProvisioningRn from "react-native-esp-idf-ble-provisioning-rn";
const SetTimeAlerts = () => {
  const data = async () => {
    
    try {
      const devices = await ESPProvisionManager.searchESPDevices(
        'PROV_',
        'ble',
        1,
      );
      console.log('Found devices:', devices);

      if (devices.length > 0) {
        const device = new ESPDevice(devices[0]);
        console.log('Selected device:', device);

        try {
          const proofOfPossession = 'a05894f2';
          console.log('Connecting to device...');
          await device.connect(proofOfPossession, null, null);
          console.log('Connected to device successfully.');

          try {
            const wifiList = await device.scanWifiList();
            console.log('Available Wi-Fi networks:', wifiList);

            const ssid = 'NETGEAR80';
            const passphrase = 'silkyprairie373';
            const result = await device.provision(ssid, passphrase);
            console.log('Provisioning result:', result);
            // API
          } catch (error) {
            console.error(
              'Error during connection or provisioning:',
              error.message,
            );
            console.error('Error stack:', error.stack);
          }
        } catch (connectError) {
          if (connectError.message.includes('Encryption is insufficient')) {
            console.log(
              'Failed to connect to device. Encryption is insufficient.',
            );
            // You can choose to handle this specific error case differently if needed.
          } else {
            console.error('Error connecting to device:', connectError.message);
            console.error('Connection error stack:', connectError.stack);
          }
        }
      } else {
        console.log('No devices found.');
      }
    } catch (error) {
      if (
        error.message.includes('No bluetooth device found with given prefix')
      ) {
        console.log(
          'No Bluetooth devices found. Please check your device and try again.',
        );
      } else {
        console.error('Top-level error:', error.message);
        console.error('Top-level error stack:', error.stack);
      }
    }
  };

  useEffect(() => {
    data();
  }, []);

  // const uuiddd = 'c80894df-ce1a-4a8b-ba11-1c61b19283a2';

  const [uuid, setUuid] = useState('');
  const [scanning, setScanning] = useState(false);
  const [name, setName] = useState('');
  console.log(name, 'name');
  const manager = new BleManager();

  const waitForBluetoothOn = async () => {
    return new Promise((resolve, reject) => {
      const checkBluetoothState = async () => {
        try {
          const bluetoothState = await manager.state();
          console.log(bluetoothState, 'bluetoothState');

          switch (bluetoothState) {
            case 'PoweredOn':
              resolve();
              break;
            case 'PoweredOff':
            case 'Unsupported':
              reject(new Error(`Bluetooth is ${bluetoothState}`));
              break;
            default:
              setTimeout(checkBluetoothState, 1000); // Check again after 1 second
              break;
          }
        } catch (error) {
          reject(error);
        }
      };

      checkBluetoothState();
    });
  };

  const scanBleDevices = async prefix => {
    return new Promise((resolve, reject) => {
      try {
        setScanning(true);

        // Wait for Bluetooth to be in a valid state
        waitForBluetoothOn()
          .then(async () => {
            const devices = [];
            console.log('Devices');

            manager.startDeviceScan(null, null, (error, device) => {
              console.log(device, 'device');
              if (error) {
                console.error('Error during BLE device scanning:', error);
                setScanning(false);
                manager.stopDeviceScan();
                reject(error);
                return;
              }

              if (device) {
                // devices.push(device);

                // Check if the device has the desired name
                console.log(
                  device.name,
                  'device.name && device.name.startsWith(prefix)',
                );
                setName(device.name);
                if (device.name && device.name.startsWith(prefix)) {
                  // Resolve the promise with the filtered devices
                  manager.stopDeviceScan();
                  setScanning(false);
                  resolve([device]);
                }
              }
            });

            // Stop scanning after a certain period (adjust as needed)
            setTimeout(() => {
              manager.stopDeviceScan();
              setScanning(false);
              reject(new Error('Scan timeout'));
            }, 10000); // Stop scanning after 10 seconds
          })
          .catch(error => {
            console.error('Error during BLE device scanning:', error);
            setScanning(false);
            reject(error);
          });
      } catch (error) {
        console.error('Error during BLE device scanning......:', error);
        setScanning(false);
        reject(error);
      }
    });
  };

  const scanFunc = async () => {
    console.log('Scan init');
    try {
      const bluetoothStateBefore = await manager.state();
      console.log('Bluetooth state before:', bluetoothStateBefore);

      await waitForBluetoothOn();

      const bluetoothStateAfter = await manager.state();
      console.log('Bluetooth state after:', bluetoothStateAfter);

      try {
        const res = await scanBleDevices('PROV_');
        console.log(res, 'dattt');
        if (res && res.length > 0) {
          setUuid(res[0].serviceUUIDs[0]);
        } else {
          setUuid('');
        }
      } catch (error) {
        if (error.message === 'Scan timeout') {
          console.warn('Scan timed out. No matching devices found.');
        } else {
          console.error('Error during BLE device scanning:', error);
        }
      }
    } catch (e) {
      console.error('Error during BLE device scanningeeeeeee:', e);
    }
  };

  useEffect(() => {
    return () => {
      manager.stopDeviceScan();
    };
  }, []);

  useEffect(() => {
    // getCurrentSSID();
    // data();
  }, []);

  return (
    <View>
      <Text>UUID: {uuid}</Text>
      <Button
        title={scanning ? 'Scanning...' : 'Scan Devices'}
        onPress={scanFunc}
        disabled={scanning}
      />
      {/* <Button title="Connect to WiFi" onPress={handleConnect} /> */}
      {/* <View>
        <Text> {espWifiAuthToString}</Text>
      </View> */}
    </View>
  );
};

export default SetTimeAlerts;
