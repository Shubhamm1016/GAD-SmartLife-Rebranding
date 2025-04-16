// import React, {useState, useEffect, useRef} from 'react';
// import {
//   TouchableOpacity,
//   Text,
//   Linking,
//   View,
//   Image,
//   BackHandler,
//   StyleSheet,
//   SafeAreaView,
//   Pressable,
// } from 'react-native';
// import {Permissions, PERMISSION_TYPE} from '../../components/AppPermission';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {RNCamera} from 'react-native-camera';
// import {launchImageLibrary} from 'react-native-image-picker';
// import {GEGBodyCopy, GEGBold} from '../../comman-compnent/FontFamily';
// import InsideHeader from '../../comman-compnent/InsideHeader';
// const SerialQRScanner = props => {
//   const {navigation, route} = props;
//   // console.log(props, 'props');
//   const {selectedId} = props.route.params;

//   const [scan, setScan] = useState(false);
//   const [scanResult, setScanResult] = useState(false);

//   const scannerRef = useRef(null);
//   const [torchOn, setTorchOn] = useState(false);

//   // const onSuccess = e => {
//   //   try {
//   //     const check = e.data.substring(0, 4);
//   //     const checkValue = e.data;

//   //     if (checkValue.length === 16) {
//   //       setScan(false);
//   //       setScanResult(true);

//   //       if (check === 'http') {
//   //         Linking.openURL(e.data).catch(err =>
//   //           console.error('An error occurred', err),
//   //         );
//   //       } else {
//   //         setScan(false);
//   //         setScanResult(true);
//   //         route.params.onResultChange(checkValue);
//   //         navigation.goBack();
//   //       }
//   //     } else {
//   //       setScan(false);
//   //       alert('Please scan a 16-digit serial number QR code!');
//   //     }
//   //   } catch (err) {
//   //     console.error(err, 'errrr');
//   //   }
//   // };

//   const AC = 'AC';
//   const WM = 'WM';
//   const Ref = 'Refrigerator';

//   const onSuccess = (e, selectedId) => {
//     try {
//       const checkValue = e.data;
//       const parts = checkValue.split('||');

//       // Determine the correct part to use
//       const firstPartWithDelimiter = parts.length > 1 ? parts[1] : parts[0]; // Use the second part if it exists, otherwise use the first part

//       console.log(firstPartWithDelimiter, 'firstPartWithDelimiter'); // Outputs: "24030042EF12345"

//       // Now, you can check the length of the selected part
//       if (
//         firstPartWithDelimiter.length === 16 ||
//         firstPartWithDelimiter.length === 18
//       ) {
//         // alert(checkValue, 'checkValue');
//         // if (checkValue.length === 16 || checkValue.length === 18) {
//         // Handle the case where selectedId is either 'AC' with length 16 or 'WM' with length 18
//         setScan(false);
//         setScanResult(true);

//         const check = firstPartWithDelimiter.substring(0, 4);

//         if (check === 'http') {
//           Linking.openURL(firstPartWithDelimiter).catch(err =>
//             console.error('An error occurred', err),
//           );
//         } else {
//           setScan(false);
//           setScanResult(true);
//           route.params.onResultChange(firstPartWithDelimiter);
//           navigation.goBack();
//         }
//       } else {
//         // Handle other cases
//         setScan(false);
//         alert(
//           `Please scan a QR code with a ${
//             selectedId == 'AC' ? '16-character' : '18-character'
//           } serial number for ${selectedId}!`,
//         );
//       }
//     } catch (err) {
//       console.error(err, 'errrr');
//     }
//   };

//   const getImageSource = () => {
//     switch (selectedId) {
//       case AC:
//         return require('../../assets/bannerone.png');
//       case WM:
//         return require('../../assets/WMQRImage.png');

//       default:
//         return require('../../assets/RefImage/RefQRScaner.png');
//     }
//   };

//   const activeQR = () => {
//     setScan(true);
//   };

//   const scanAgain = () => {
//     setScan(true);
//     setScanResult(false);
//   };

//   useEffect(() => {
//     Permissions.checkPermission(PERMISSION_TYPE.camera);
//     activeQR();
//   }, []);

//   useEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => (
//         <TouchableOpacity onPress={() => BackHandler.exitApp()}>
//           <AntDesign name="arrowleft" size={20} color="black" />
//         </TouchableOpacity>
//       ),
//       headerTitle: 'Add Device',
//     });
//   }, [navigation]);

//   // const toggleTorch = () => {
//   //   if (scannerRef.current) {
//   //     // Log the ref to check if it is set properly
//   //     console.log('QRCodeScanner ref:', scannerRef.current);
//   //     setTorchOn(!torchOn); // Toggle state
//   //     if (scannerRef.current.toggleTorch) {
//   //       scannerRef.current.toggleTorch(); // Toggle the torch/flashlight
//   //     } else {
//   //       console.log(
//   //         'toggleTorch method is not available on scannerRef.current',
//   //       );
//   //     }
//   //   } else {
//   //     console.log('QRCodeScanner ref is not initialized yet');
//   //   }
//   // };

//   // const toggleTorch = () => {
//   //   setTorchOn(prevState => !prevState); // Toggle the state
//   // };

//   const toggleTorch = () => {
//     setTorchOn(prevState => !prevState); // Toggle the torch state
//   };

//   const openGallery = () => {
//     launchImageLibrary(
//       {
//         mediaType: 'photo', // Can be 'photo' or 'video'
//         quality: 0.5, // Image quality (0 to 1)
//         includeBase64: false, // Whether to include base64 encoded data
//       },
//       response => {
//         console.log('Response = ', response);
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.errorCode) {
//           console.log('ImagePicker Error: ', response.errorMessage);
//         } else {
//           // Image selected, handle the response (response.assets will contain the image data)
//           console.log('Selected image: ', response.assets[0].uri);
//           // You can handle the selected image as needed
//         }
//       },
//     );
//   };

//   return (
//     <SafeAreaView style={styles.scrollViewStyle}>
//       <View style={styles.scrollViewStyle}>
//         <View style={{flexDirection: 'row', alignItems: 'center'}}>
//           <InsideHeader
//             title="Add Device"
//             onBackPress={() => navigation.goBack()} // Set your back action here
//           />
//         </View>
//         {!scan && !scanResult && (
//           <View style={styles.cardView}>
//             <Text numberOfLines={8} style={styles.descText}>
//               Please move your camera {'\n'} over the QR Code
//             </Text>
//             <TouchableOpacity onPress={activeQR} style={styles.buttonScan}>
//               <View style={styles.buttonWrapper}>
//                 <Text
//                   style={{
//                     ...styles.buttonTextStyle,
//                     color: '#2196f3',
//                     fontFamily: GEGBold,
//                   }}>
//                   Scan QR Code
//                 </Text>
//               </View>
//             </TouchableOpacity>
//             <View
//               style={{
//                 flex: 1,
//                 paddingHorizontal: 10,
//                 paddingVertical: 10,
//                 alignItems: 'flex-end',
//                 justifyContent: 'flex-end',
//               }}>
//               <Image
//                 source={getImageSource()}
//                 style={{width: 350, height: 180, resizeMode: 'contain'}}
//               />
//             </View>
//           </View>
//         )}
//         {scanResult && (
//           <>
//             <Text style={styles.textTitle1}>Result</Text>
//             <View style={scanResult ? styles.scanCardView : styles.cardView}>
//               {/* <Text>Type : {result.type}</Text> */}
//               <Text>Result : {result}</Text>
//               {/* <Text numberOfLines={1}>RawData: {result.rawData}</Text> */}
//               <TouchableOpacity onPress={scanAgain} style={styles.buttonScan}>
//                 <View style={styles.buttonWrapper}>
//                   <Text
//                     style={{
//                       ...styles.buttonTextStyle,
//                       color: '#2196f3',
//                     }}>
//                     Click to scan again
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={SetValue} style={styles.buttonScan}>
//                 <View style={styles.buttonWrapper}>
//                   <Text
//                     style={{
//                       ...styles.buttonTextStyle,
//                       color: '#2196f3',
//                     }}>
//                     done
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </>
//         )}
//         {scan && (
//           <View
//             style={{
//               flex: 1,
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <QRCodeScanner
//               reactivate={true}
//               showMarker={true}
//               flashMode={
//                 torchOn
//                   ? RNCamera.Constants.FlashMode.torch
//                   : RNCamera.Constants.FlashMode.off
//               } // Toggle flashlight based on torchOn state
//               cameraStyle={{
//                 height: 350,
//                 width: 350,
//                 alignSelf: 'center',
//                 marginTop: 10,
//                 borderRadius: 50,
//               }}
//               ref={scannerRef}
//               onRead={e => onSuccess(e, selectedId)}
//               bottomContent={
//                 <View>
//                   <TouchableOpacity
//                     style={styles.buttonScan2}
//                     onPress={() => scannerRef.current.reactivate()}
//                     onLongPress={() => setScan(false)}></TouchableOpacity>
//                 </View>
//               }
//             />
//             {/* <TouchableOpacity
//               onPress={toggleTorch} // Toggle torch state on press
//               style={styles.torchButton}>
//               <MaterialIcons
//                 name={torchOn ? 'flashlight-on' : 'flashlight-off'} // Change icon based on torch state
//                 size={20}
//                 color="#fff"
//               />
//             </TouchableOpacity>
//             <View style={{marginRight: 200, marginBottom: 650}}>
//               <TouchableOpacity
//                 onPress={openGallery} // Handle gallery icon press
//                 style={styles.galleryButton}>
//                 <AntDesign name="picture" size={20} color="#fff" />
//               </TouchableOpacity>
//             </View> */}
//             <View
//               style={{
//                 flex: 1,
//                 paddingHorizontal: 10,
//                 paddingVertical: 10,
//                 alignItems: 'flex-end',
//                 justifyContent: 'flex-end',
//               }}>
//               <Image
//                 source={getImageSource()}
//                 style={{width: 350, height: 180, resizeMode: 'contain'}}
//               />
//             </View>
//           </View>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default SerialQRScanner;

// const styles = StyleSheet.create({
//   scrollViewStyle: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     backgroundColor: '#fff',
//   },
//   header: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: '10%',
//     paddingLeft: 15,
//     paddingTop: 10,
//   },
//   textTitle: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     textAlign: 'center',
//     padding: 16,
//     color: 'white',
//   },
//   textTitle1: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     textAlign: 'center',
//     padding: 16,
//     color: 'white',
//   },
//   cardView: {
//     alignSelf: 'center',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     borderRadius: 10,
//     padding: 25,
//     marginLeft: 5,
//     marginRight: 5,
//     marginTop: '10%',
//     backgroundColor: 'white',
//   },
//   scanCardView: {
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     padding: 25,
//     marginLeft: 5,
//     marginRight: 5,
//     marginTop: 10,
//     backgroundColor: 'white',
//   },
//   buttonWrapper: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   buttonScan: {
//     borderWidth: 2,
//     borderRadius: 10,
//     borderColor: '#258ce3',
//     paddingTop: 5,
//     paddingRight: 25,
//     paddingBottom: 5,
//     paddingLeft: 25,
//     marginTop: 20,
//   },
//   buttonScan2: {
//     width: 100,
//     height: 100,
//   },
//   descText: {
//     padding: 16,
//     textAlign: 'center',
//     fontSize: 16,
//     fontFamily: GEGBodyCopy,
//   },
//   centerText: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: 18,
//     padding: 32,
//     color: 'white',
//   },
//   torchButton: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: 10,
//     borderRadius: 30,
//   },
//   buttonTextStyle: {
//     // your button text style
//   },
//   galleryButton: {
//     position: 'absolute',
//     // bottom: 80, // Position it just above the flashlight button
//     right: 20, // Position it on the right side
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
//     borderRadius: 50, // Make it circular
//     padding: 12, // Padding inside the button
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 5, // Add shadow on Android
//     shadowColor: '#000', // Shadow on iOS
//     shadowOpacity: 0.3, // Shadow opacity on iOS
//     shadowRadius: 5, // Shadow blur on iOS
//     shadowOffset: {width: 2, height: 2}, // Shadow offset on iOS
//   },
// });


import React, {useState, useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  Text,
  Linking,
  View,
  Image,
  BackHandler,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Dimensions,
} from 'react-native';
import {Permissions, PERMISSION_TYPE} from '../../components/AppPermission';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RNCamera} from 'react-native-camera';
import {launchImageLibrary} from 'react-native-image-picker';
import {GEGBodyCopy, GEGBold} from '../../comman-compnent/FontFamily';
import InsideHeader from '../../comman-compnent/InsideHeader';
const { width } = Dimensions.get('window');
const cameraSize = width * 0.9;
const SerialQRScanner = props => {
  const {navigation, route} = props;
  // console.log(props, 'props');
  const {selectedId} = props.route.params;
 
  const [scan, setScan] = useState(false);
  const [scanResult, setScanResult] = useState(false);
 
  const scannerRef = useRef(null);
  const [torchOn, setTorchOn] = useState(false);
 
  // const onSuccess = e => {
  //   try {
  //     const check = e.data.substring(0, 4);
  //     const checkValue = e.data;
 
  //     if (checkValue.length === 16) {
  //       setScan(false);
  //       setScanResult(true);
 
  //       if (check === 'http') {
  //         Linking.openURL(e.data).catch(err =>
  //           console.error('An error occurred', err),
  //         );
  //       } else {
  //         setScan(false);
  //         setScanResult(true);
  //         route.params.onResultChange(checkValue);
  //         navigation.goBack();
  //       }
  //     } else {
  //       setScan(false);
  //       alert('Please scan a 16-digit serial number QR code!');
  //     }
  //   } catch (err) {
  //     console.error(err, 'errrr');
  //   }
  // };
 
  const AC = 'AC';
  const WM = 'WM';
  const Ref = 'Refrigerator';
 
  const onSuccess = (e, selectedId) => {
    try {
      const checkValue = e.data;
      const parts = checkValue.split('||');
 
      // Determine the correct part to use
      const firstPartWithDelimiter = parts.length > 1 ? parts[1] : parts[0]; // Use the second part if it exists, otherwise use the first part
 
      console.log(firstPartWithDelimiter, 'firstPartWithDelimiter'); // Outputs: "24030042EF12345"
 
      // Now, you can check the length of the selected part
      if (
        firstPartWithDelimiter.length === 16 ||
        firstPartWithDelimiter.length === 18
      ) {
        // alert(checkValue, 'checkValue');
        // if (checkValue.length === 16 || checkValue.length === 18) {
        // Handle the case where selectedId is either 'AC' with length 16 or 'WM' with length 18
        setScan(false);
        setScanResult(true);
 
        const check = firstPartWithDelimiter.substring(0, 4);
 
        if (check === 'http') {
          Linking.openURL(firstPartWithDelimiter).catch(err =>
            console.error('An error occurred', err),
          );
        } else {
          setScan(false);
          setScanResult(true);
          route.params.onResultChange(firstPartWithDelimiter);
          navigation.goBack();
        }
      } else {
        // Handle other cases
        setScan(false);
        alert(
          `Please scan a QR code with a ${
            selectedId == 'AC' ? '16/18-character' : '18-character'
          } serial number for ${selectedId}!`,
        );
      }
    } catch (err) {
      console.error(err, 'errrr');
    }
  };
 
  const getImageSource = () => {
    switch (selectedId) {
      case AC:
        return require('../../assets/bannerone.png');
      case WM:
        return require('../../assets/WMQRImage.png');
 
      default:
        return require('../../assets/RefImage/RefQRScaner.png');
    }
  };
 
  const activeQR = () => {
    setScan(true);
  };
 
  const scanAgain = () => {
    setScan(true);
    setScanResult(false);
  };
 
  useEffect(() => {
    Permissions.checkPermission(PERMISSION_TYPE.camera);
    activeQR();
  }, []);
 
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => BackHandler.exitApp()}>
          <AntDesign name="arrowleft" size={20} color="black" />
        </TouchableOpacity>
      ),
      headerTitle: 'Add Device',
    });
  }, [navigation]);
 
  // const toggleTorch = () => {
  //   if (scannerRef.current) {
  //     // Log the ref to check if it is set properly
  //     console.log('QRCodeScanner ref:', scannerRef.current);
  //     setTorchOn(!torchOn); // Toggle state
  //     if (scannerRef.current.toggleTorch) {
  //       scannerRef.current.toggleTorch(); // Toggle the torch/flashlight
  //     } else {
  //       console.log(
  //         'toggleTorch method is not available on scannerRef.current',
  //       );
  //     }
  //   } else {
  //     console.log('QRCodeScanner ref is not initialized yet');
  //   }
  // };
 
  // const toggleTorch = () => {
  //   setTorchOn(prevState => !prevState); // Toggle the state
  // };
 
  const toggleTorch = () => {
    setTorchOn(prevState => !prevState); // Toggle the torch state
  };
 
  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo', // Can be 'photo' or 'video'
        quality: 0.5, // Image quality (0 to 1)
        includeBase64: false, // Whether to include base64 encoded data
      },
      response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          // Image selected, handle the response (response.assets will contain the image data)
          console.log('Selected image: ', response.assets[0].uri);
          // You can handle the selected image as needed
        }
      },
    );
  };
 
  return (
    <SafeAreaView style={styles.scrollViewStyle}>
      <View style={styles.scrollViewStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <InsideHeader
            title="Add Device"
            onBackPress={() => navigation.goBack()} // Set your back action here
          />
        </View>
        {!scan && !scanResult && (
          <View style={styles.cardView}>
            <Text numberOfLines={8} style={styles.descText}>
              Please move your camera {'\n'} over the QR Code
            </Text>
            <TouchableOpacity onPress={activeQR} style={styles.buttonScan}>
              <View style={styles.buttonWrapper}>
                <Text
                  style={{
                    ...styles.buttonTextStyle,
                    color: '#2196f3',
                    fontFamily: GEGBold,
                  }}>
                  Scan QR Code
                </Text>
              </View>
            </TouchableOpacity>
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
        {scanResult && (
          <>
            <Text style={styles.textTitle1}>Result</Text>
            <View style={scanResult ? styles.scanCardView : styles.cardView}>
              {/* <Text>Type : {result.type}</Text> */}
              <Text>Result : {result}</Text>
              {/* <Text numberOfLines={1}>RawData: {result.rawData}</Text> */}
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
              <TouchableOpacity onPress={SetValue} style={styles.buttonScan}>
                <View style={styles.buttonWrapper}>
                  <Text
                    style={{
                      ...styles.buttonTextStyle,
                      color: '#2196f3',
                    }}>
                    done
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
        {scan && (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <QRCodeScanner
              reactivate={true}
              showMarker={true}
              flashMode={
                torchOn
                  ? RNCamera.Constants.FlashMode.torch
                  : RNCamera.Constants.FlashMode.off
              } // Toggle flashlight based on torchOn state
              cameraStyle={{
                // height: 350,
                // width: 350,
                // alignSelf: 'center',
                // marginTop: 10,
                // borderRadius: 50,
                height: cameraSize,
                width: cameraSize,
                alignSelf: 'center',
                marginTop: 10,
                borderRadius: cameraSize / 2,
              }}
              ref={scannerRef}
              onRead={e => onSuccess(e, selectedId)}
              bottomContent={
                <View>
                  <TouchableOpacity
                    style={styles.buttonScan2}
                    onPress={() => scannerRef.current.reactivate()}
                    onLongPress={() => setScan(false)}></TouchableOpacity>
                </View>
              }
            />
            <TouchableOpacity
              onPress={toggleTorch} // Toggle torch state on press
              style={styles.torchButton}>
              <MaterialIcons
                name={torchOn ? 'flash-on' : 'flash-off'} // Change to valid icons
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
            {/* <View style={{marginRight: 200, marginBottom: 650}}>
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
      </View>
    </SafeAreaView>
  );
};
 
export default SerialQRScanner;
 
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
    paddingLeft: 15,
    paddingTop: 10,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'white',
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
    fontFamily: GEGBodyCopy,
  },
  centerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    padding: 32,
    color: 'white',
  },
  torchButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 30,
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
});