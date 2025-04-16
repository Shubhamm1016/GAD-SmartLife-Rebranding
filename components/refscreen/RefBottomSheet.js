// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, {useContext, useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   ImageBackground,
//   Pressable,
//   TouchableOpacity,
//   Image,
// } from 'react-native';

// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {switchButton} from '../../Context/API';

// const RefBottomSheet = ({
//   refRBSheet,
//   isClose,
//   id,
//   Convertible_Mode,
//   Ref_Mode,
//   modeType,
//   setState,
//   setClose,
//   Freezer_Temp,
//   Fridge_Temp,
//   refrigeratorVariant,
//   coolingLevel,
// }) => {
//   const closeSheet = () => {
//     refRBSheet.current.close();
//     setClose(true);
//   };

//   const ConvertibleModesDescription = [
//     {
//       id: 1,
//       mode: 'FR',
//       description: 'Auto Mode',
//     },
//     {
//       id: 2,
//       mode: 'RR',
//       description: 'Extra Veg Mode',
//     },
//     {
//       id: 3,
//       mode: 'R0',
//       description: 'Efficiency Mode/Low Load Mode',
//     },
//     {
//       id: 4,
//       mode: 'F0',
//       description: 'Holiday Mode',
//     },
//   ];

//   const ModesDescription = [
//     {
//       id: 1,
//       mode: 'Eco',
//       description: 'Eco Mode',
//     },
//     {
//       id: 2,
//       mode: 'Intelligent',
//       description: 'Intelligent Mode',
//     },
//     {
//       id: 3,
//       mode: 'Quick Chill',
//       description: 'Quick Chill mode',
//     },
//     {
//       id: 4,
//       mode: 'Regular',
//       description: 'No mode selected',
//     },
//   ];

//   const [checkModeType, setModeType] = useState(modeType);
//   const [checkConvertible, setConvertible] = useState(Convertible_Mode);
//   const [checkRefMode, setRefMode] = useState(Ref_Mode);
//   const [countRefrigeratorVariant, setRefrigeratorVariant] =
//     useState(refrigeratorVariant);
//   const [checkCoolingLevel, setCheckCoolingLevel] = useState(coolingLevel);
//   console.log(checkRefMode, 'checkConvertible');

//   const currentModeDescription =
//     ConvertibleModesDescription.find(mode => mode.mode === checkConvertible)
//       ?.description || 'No description available';

//   const ModeDescription =
//     ModesDescription.find(mode => mode.mode === checkRefMode)?.description ||
//     'No description available';

//   const ModeAPI = async (State, id, key, newState) => {
//     try {
//       const token = await AsyncStorage.getItem('AccessToken');
//       if (!token) throw new Error('Access token is missing.');
//       const response = await switchButton(State, token, id, newState, key);
//       if (response?.data) {
//         setState(prevState => ({
//           ...prevState,
//           Ref_Mode: newState,
//         }));
//         setRefMode(newState);
//       } else {
//         throw new Error('Invalid response from the API.');
//       }
//     } catch (err) {
//       console.log(
//         err?.response?.data || err.message,
//         'Error in toggleChildLockImage',
//       );
//     }
//   };

//   const Convertible_Mode_API = async (State, id, key, newState) => {
//     try {
//       const token = await AsyncStorage.getItem('AccessToken');
//       if (!token) throw new Error('Access token is missing.');
//       const response = await switchButton(State, token, id, newState, key);
//       if (response?.data) {
//         setState(prevState => ({
//           ...prevState,
//           Convertible_Mode: newState,
//         }));
//         setConvertible(newState);
//       } else {
//         throw new Error('Invalid response from the API.');
//       }
//     } catch (err) {
//       console.log(
//         err?.response?.data || err.message,
//         'Error in toggleChildLockImage',
//       );
//     }
//   };

//   useEffect(() => {
//     setModeType(modeType);
//   }, [modeType]);

//   return (
//     <View style={{flex: 1, paddingHorizontal: 10, paddingVertical: 10}}>
//       <View
//         style={{
//           paddingHorizontal: 10,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}>
//         <Text style={{fontSize: 16, fontWeight: 'bold', color: '#525968'}}>
//           {modeType}
//           {/* <TouchableOpacity>
//               <AntDesign name="lock" size={20} color="#4D98FF" />
//             </TouchableOpacity> */}
//         </Text>
//         <TouchableOpacity
//           style={{
//             height: 40,
//             width: 40,
//             borderRadius: 100,
//             alignItems: 'center',
//             justifyContent: 'center',
//             // backgroundColor:'red'
//           }}
//           onPress={closeSheet}>
//           {/* <AntDesign name="close" size={20} color="black" /> */}
//         </TouchableOpacity>
//       </View>
//       {checkModeType == 'MODE' ? (
//         <View style={{flex: 1, justifyContent: 'center'}}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//             }}>
//             <TouchableOpacity
//               onPress={() => {
//                 const State = 'Refrigerator';
//                 const key = 'Ref_Mode';
//                 const newState = 'Intelligent';
//                 ModeAPI(State, id, key, newState);
//               }}>
//               <Image
//                 style={{
//                   height: 70,
//                   width: 70,
//                   resizeMode: 'contain',
//                 }}
//                 source={
//                   checkRefMode == 'Intelligent'
//                     ? require('../../assets/RefImage/intDark.png')
//                     : require('../../assets/RefImage/intHide.png')
//                 }
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => {
//                 const State = 'Refrigerator';
//                 const key = 'Ref_Mode';
//                 const newState = 'Eco';
//                 ModeAPI(State, id, key, newState);
//               }}>
//               <Image
//                 style={{
//                   height: 70,
//                   width: 70,
//                   resizeMode: 'contain',
//                 }}
//                 source={
//                   checkRefMode == 'Eco'
//                     ? require('../../assets/RefImage/ecoDark.png')
//                     : require('../../assets/RefImage/ecoHide.png')
//                 }
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => {
//                 const State = 'Refrigerator';
//                 const key = 'Ref_Mode';
//                 const newState = 'Quick Chill';
//                 ModeAPI(State, id, key, newState);
//               }}>
//               <Image
//                 style={{
//                   height: 70,
//                   width: 70,
//                   resizeMode: 'contain',
//                 }}
//                 source={
//                   checkRefMode == 'Quick Chill'
//                     ? require('../../assets/RefImage/qcDark.png')
//                     : require('../../assets/RefImage/qcHide.png')
//                 }
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => {
//                 const State = 'Refrigerator';
//                 const key = 'Ref_Mode';
//                 const newState = 'Regular';
//                 ModeAPI(State, id, key, newState);
//               }}>
//               <Image
//                 style={{
//                   height: 70,
//                   width: 70,
//                   resizeMode: 'contain',
//                 }}
//                 source={
//                   checkRefMode == 'Regular'
//                     ? require('../../assets/conoffb.png')
//                     : require('../../assets/conoff.png')
//                 }
//               />
//             </TouchableOpacity>
//           </View>
//           <View
//             style={{
//               marginVertical: 50,
//               marginHorizontal: 15,
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'center',
//               width: '90%',
//               backgroundColor: '#E1F5FF80',
//               borderRadius: 10,
//               padding: 10,
//             }}>
//             <View
//               style={{
//                 backgroundColor: '#4BB6E8',
//                 borderColor: '#4BB6E8',
//                 paddingHorizontal: 8,
//                 borderRadius: 100,
//                 // marginHorizontal: 8,
//               }}>
//               <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
//                 i
//               </Text>
//             </View>

//             <View
//               style={{
//                 flex: 1,
//                 alignItems: 'center',
//                 justifyContent: 'flex-start',
//               }}>
//               <Text style={{fontSize: 14, color: '#4BB6E8', fontWeight: '600'}}>
//                 {/* Set mode for both fridge and Freezer */}
//                 {ModeDescription}
//               </Text>
//             </View>
//           </View>
//         </View>
//       ) : countRefrigeratorVariant === 2 || countRefrigeratorVariant === 1 ? (
//         <View style={{flex: 1, justifyContent: 'center'}}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//             }}>
//             <View
//               style={{
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 // backgroundColor:'red'
//               }}>
//               <TouchableOpacity
//                 onPress={() => {
//                   const State = 'Refrigerator';
//                   const key = 'Convertible_Mode';
//                   const newState = 'FR';
//                   Convertible_Mode_API(State, id, key, newState);
//                 }}>
//                 <Image
//                   style={{
//                     height: 90,
//                     width: 80,
//                     resizeMode: 'contain',
//                   }}
//                   source={
//                     checkConvertible == 'FR'
//                       ? require('../../assets/RefImage/frDark.png')
//                       : require('../../assets/RefImage/frHide.png')
//                   }
//                 />
//               </TouchableOpacity>
//               <View
//                 style={{
//                   backgroundColor:
//                     checkConvertible == 'FR' ? '#E1F5FF80' : '#F8F8F8',
//                   alignItems: 'center',
//                   borderRadius: 100,
//                   height: 30,
//                   width: 30,
//                   justifyContent: 'center',
//                   marginTop: 10,
//                 }}>
//                 <Text style={{fontSize: 14, color: '#838383'}}>FR</Text>
//               </View>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 // backgroundColor:'red'
//               }}>
//               <TouchableOpacity
//                 onPress={() => {
//                   const State = 'Refrigerator';
//                   const key = 'Convertible_Mode';
//                   const newState = 'RR';
//                   Convertible_Mode_API(State, id, key, newState);
//                 }}>
//                 <Image
//                   style={{
//                     height: 90,
//                     width: 80,
//                     resizeMode: 'contain',
//                   }}
//                   source={
//                     checkConvertible == 'RR'
//                       ? require('../../assets/RefImage/rrDark.png')
//                       : require('../../assets/RefImage/rrHide.png')
//                   }
//                 />
//               </TouchableOpacity>
//               <View
//                 style={{
//                   backgroundColor:
//                     checkConvertible == 'RR' ? '#E1F5FF80' : '#F8F8F8',
//                   alignItems: 'center',
//                   borderRadius: 100,
//                   height: 30,
//                   width: 30,
//                   justifyContent: 'center',
//                   marginTop: 10,
//                 }}>
//                 <Text style={{fontSize: 14, color: '#838383'}}>RR</Text>
//               </View>
//             </View>

//             <View
//               style={{
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 // backgroundColor:'red'
//               }}>
//               <TouchableOpacity
//                 onPress={() => {
//                   const State = 'Refrigerator';
//                   const key = 'Convertible_Mode';
//                   const newState = 'F0';
//                   Convertible_Mode_API(State, id, key, newState);
//                 }}>
//                 <Image
//                   style={{
//                     height: 90,
//                     width: 80,
//                     resizeMode: 'contain',
//                   }}
//                   source={
//                     checkConvertible == 'F0'
//                       ? require('../../assets/RefImage/foDark.png')
//                       : require('../../assets/RefImage/foHide.png')
//                   }
//                 />
//               </TouchableOpacity>
//               <View
//                 style={{
//                   backgroundColor:
//                     checkConvertible == 'F0' ? '#E1F5FF80' : '#F8F8F8',
//                   alignItems: 'center',
//                   borderRadius: 100,
//                   height: 30,
//                   width: 30,
//                   justifyContent: 'center',
//                   marginTop: 10,
//                 }}>
//                 <Text style={{fontSize: 14, color: '#838383'}}>F0</Text>
//               </View>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 // backgroundColor:'red'
//               }}>
//               <TouchableOpacity
//                 onPress={() => {
//                   const State = 'Refrigerator';
//                   const key = 'Convertible_Mode';
//                   const newState = 'R0';
//                   Convertible_Mode_API(State, id, key, newState);
//                 }}>
//                 <Image
//                   style={{
//                     height: 90,
//                     width: 80,
//                     resizeMode: 'contain',
//                   }}
//                   source={
//                     checkConvertible == 'R0'
//                       ? require('../../assets/RefImage/roDark.png')
//                       : require('../../assets/RefImage/roHide.png')
//                   }
//                 />
//               </TouchableOpacity>
//               <View
//                 style={{
//                   backgroundColor:
//                     checkConvertible == 'R0' ? '#E1F5FF80' : '#F8F8F8',
//                   alignItems: 'center',
//                   borderRadius: 100,
//                   height: 30,
//                   width: 30,
//                   justifyContent: 'center',
//                   marginTop: 10,
//                 }}>
//                 <Text style={{fontSize: 14, color: '#838383'}}>R0</Text>
//               </View>
//             </View>
//           </View>
//           <View
//             style={{
//               marginVertical: 50,
//               marginHorizontal: 15,
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'center',
//               width: '90%',
//               backgroundColor: '#E1F5FF80',
//               borderRadius: 10,
//               padding: 10,
//             }}>
//             <View
//               style={{
//                 backgroundColor: '#4BB6E8',
//                 borderColor: '#4BB6E8',
//                 paddingHorizontal: 8,
//                 borderRadius: 100,
//                 // marginHorizontal: 8,
//               }}>
//               <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
//                 i
//               </Text>
//             </View>

//             <View
//               style={{
//                 flex: 1,
//                 alignItems: 'center',
//                 // justifyContent: 'flex-start',
//               }}>
//               <Text style={{fontSize: 14, color: '#4BB6E8', fontWeight: '600'}}>
//                 {currentModeDescription}
//               </Text>
//             </View>
//           </View>
//         </View>
//       ) : (
//         <View style={{flex: 1, justifyContent: 'center'}}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//             }}>
//             <View
//               style={{
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 // backgroundColor:'red'
//               }}>
//               <TouchableOpacity onPress={() => {}}>
//                 <Image
//                   style={{
//                     height: 90,
//                     width: 80,
//                     resizeMode: 'contain',
//                   }}
//                   source={
//                     checkCoolingLevel == 'Intelligent'
//                       ? require('../../assets/RefImage/intDark.png')
//                       : require('../../assets/RefImage/intHide.png')
//                   }
//                 />
//               </TouchableOpacity>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 // backgroundColor:'red'
//               }}>
//               <TouchableOpacity
//                 onPress={() => {
//                   // if (state.Power) {
//                   //   const State = 'Refrigerator';
//                   //   toggleChildLockImage(State, id);
//                   // } else {
//                   //   alert('Washing Machine Power OFF, Turn On And Retry');
//                   //   return;
//                   // }
//                 }}>
//                 <Image
//                   style={{
//                     height: 90,
//                     width: 80,
//                     resizeMode: 'contain',
//                   }}
//                   source={
//                     checkCoolingLevel == 'Intelligent'
//                       ? require('../../assets/RefImage/intDark.png')
//                       : require('../../assets/RefImage/intHide.png')
//                   }
//                 />
//               </TouchableOpacity>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}>
//               <TouchableOpacity onPress={() => {}}>
//                 <Image
//                   style={{
//                     height: 90,
//                     width: 80,
//                     resizeMode: 'contain',
//                   }}
//                   source={
//                     checkCoolingLevel == 'Intelligent'
//                       ? require('../../assets/RefImage/intDark.png')
//                       : require('../../assets/RefImage/intHide.png')
//                   }
//                 />
//               </TouchableOpacity>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}>
//               <TouchableOpacity onPress={() => {}}>
//                 <Image
//                   style={{
//                     height: 90,
//                     width: 80,
//                     resizeMode: 'contain',
//                   }}
//                   source={
//                     checkCoolingLevel == 'Intelligent'
//                       ? require('../../assets/RefImage/intDark.png')
//                       : require('../../assets/RefImage/intHide.png')
//                   }
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View
//             style={{
//               marginVertical: 50,
//               marginHorizontal: 15,
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'center',
//               width: '90%',
//               backgroundColor: '#E1F5FF80',
//               borderRadius: 10,
//               padding: 10,
//             }}>
//             <View
//               style={{
//                 backgroundColor: '#4BB6E8',
//                 borderColor: '#4BB6E8',
//                 paddingHorizontal: 8,
//                 borderRadius: 100,
//               }}>
//               <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
//                 i
//               </Text>
//             </View>

//             <View
//               style={{
//                 flex: 1,
//                 alignItems: 'center',
//               }}>
//               <Text style={{fontSize: 14, color: '#4BB6E8', fontWeight: '600'}}>
//                 Set Cooling mode for both fridge and freezer
//                 {/* {ModeDescription} */}
//               </Text>
//             </View>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// };
// export default RefBottomSheet;


import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
 
import AntDesign from 'react-native-vector-icons/AntDesign';
import {switchButton} from '../../Context/API';
 
const RefBottomSheet = ({
  refRBSheet,
  isClose,
  id,
  Convertible_Mode,
  Ref_Mode,
  modeType,
  setState,
  setClose,
  Freezer_Temp,
  Fridge_Temp,
  refrigeratorVariant,
  coolingLevel,
}) => {
  const closeSheet = () => {
    refRBSheet.current.close();
    setClose(true);
  };
 
  const ConvertibleModesDescription = [
    {
      id: 1,
      mode: 'FR',
      description: 'Auto Mode',
    },
    {
      id: 2,
      mode: 'RR',
      description: 'Extra Veg Mode',
    },
    {
      id: 3,
      mode: 'R0',
      description: 'Efficiency Mode/ Low Load Mode',
    },
    {
      id: 4,
      mode: 'F0',
      description: 'Holiday Mode',
    },
  ];
 
  const ModesDescription = [
    {
      id: 1,
      mode: 'Eco',
      description: 'Refrigerator will work on its lower energy consumption.',
    },
    {
      id: 2,
      mode: 'Intelligent',
      description: 'Refrigerator adapt itself based on load and ambient',
    },
    {
      id: 3,
      mode: 'Quick Chill',
      description: 'Fast Cooling On',
    },
    {
      id: 4,
      mode: 'Regular',
      description: 'No mode selected',
    },
  ];
 
  const [checkModeType, setModeType] = useState(modeType);
  const [checkConvertible, setConvertible] = useState(Convertible_Mode);
  const [checkRefMode, setRefMode] = useState(Ref_Mode);
  const [countRefrigeratorVariant, setRefrigeratorVariant] =
    useState(refrigeratorVariant);
  const [checkCoolingLevel, setCheckCoolingLevel] = useState(coolingLevel);
  console.log(checkRefMode, 'checkConvertible');
 
  const currentModeDescription =
    ConvertibleModesDescription.find(mode => mode.mode === checkConvertible)
      ?.description || 'No description available';
 
  const ModeDescription =
    ModesDescription.find(mode => mode.mode === checkRefMode)?.description ||
    'No description available';
 
  const storeModeInAsyncStorage = async mode => {
    try {
      await AsyncStorage.setItem('selectedMode', mode); // Save mode to AsyncStorage
    } catch (error) {
      console.error('Error saving mode to AsyncStorage:', error);
    }
  };
 
  const loadModeFromAsyncStorage = async () => {
    try {
      const mode = await AsyncStorage.getItem('selectedMode');
      if (mode) {
        // setConvertible(mode); // Restore the mode
        setRefMode(mode); // Ensure that the mode is restored correctly for the `Ref_Mode` state as well
      }
    } catch (error) {
      console.error('Error loading mode from AsyncStorage:', error);
    }
  };
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem('selectedMode'); // Clear the mode from AsyncStorage
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };
  const ModeAPI = async (State, id, key, newState) => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      if (!token) throw new Error('Access token is missing.');
      const response = await switchButton(State, token, id, newState, key);
      if (response?.data) {
        setState(prevState => ({
          ...prevState,
          Ref_Mode: newState,
        }));
        setRefMode(newState);
        storeModeInAsyncStorage(newState);
      } else {
        throw new Error('Invalid response from the API.');
      }
    } catch (err) {
      console.log(
        err?.response?.data || err.message,
        'Error in toggleChildLockImage',
      );
    }
  };
 
  const Convertible_Mode_API = async (State, id, key, newState) => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      if (!token) throw new Error('Access token is missing.');
      const response = await switchButton(State, token, id, newState, key);
      if (response?.data) {
        setState(prevState => ({
          ...prevState,
          Convertible_Mode: newState,
        }));
        setConvertible(newState);
      } else {
        throw new Error('Invalid response from the API.');
      }
    } catch (err) {
      console.log(
        err?.response?.data || err.message,
        'Error in toggleChildLockImage',
      );
    }
  };
 
  useEffect(() => {
    loadModeFromAsyncStorage();
    clearAsyncStorage(); // Load the mode from AsyncStorage on component mount
  }, []);
 
  useEffect(() => {
    setModeType(modeType);
  }, [modeType]);
 
  return (
    <View style={{flex: 1, paddingHorizontal: 10, paddingVertical: 10}}>
      <View
        style={{
          paddingHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#525968'}}>
          {modeType}
          {/* <TouchableOpacity>
              <AntDesign name="lock" size={20} color="#4D98FF" />
            </TouchableOpacity> */}
        </Text>
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor:'red'
          }}
          onPress={closeSheet}>
          {/* <AntDesign name="close" size={20} color="black" /> */}
        </TouchableOpacity>
      </View>
      {checkModeType == 'MODE' ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                const State = 'Refrigerator';
                const key = 'Ref_Mode';
                const newState = 'Intelligent';
                ModeAPI(State, id, key, newState);
              }}>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  resizeMode: 'contain',
                }}
                source={
                  checkRefMode == 'Intelligent'
                    ? require('../../assets/RefImage/intDark.png')
                    : require('../../assets/RefImage/intHide.png')
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const State = 'Refrigerator';
                const key = 'Ref_Mode';
                const newState = 'Eco';
                ModeAPI(State, id, key, newState);
              }}>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  resizeMode: 'contain',
                }}
                source={
                  checkRefMode == 'Eco'
                    ? require('../../assets/RefImage/ecoDark.png')
                    : require('../../assets/RefImage/ecoHide.png')
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const State = 'Refrigerator';
                const key = 'Ref_Mode';
                const newState = 'Quick Chill';
                ModeAPI(State, id, key, newState);
              }}>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  resizeMode: 'contain',
                }}
                source={
                  checkRefMode == 'Quick Chill'
                    ? require('../../assets/RefImage/qcDark.png')
                    : require('../../assets/RefImage/qcHide.png')
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const State = 'Refrigerator';
                const key = 'Ref_Mode';
                const newState = 'Regular';
                ModeAPI(State, id, key, newState);
              }}>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  resizeMode: 'contain',
                }}
                source={
                  checkRefMode == 'Regular'
                    ? require('../../assets/conoffb.png')
                    : require('../../assets/conoff.png')
                }
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: 50,
              marginHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              backgroundColor: '#E1F5FF80',
              borderRadius: 10,
              padding: 10,
            }}>
            <View
              style={{
                backgroundColor: '#4BB6E8',
                borderColor: '#4BB6E8',
                // paddingHorizontal: 8,
                borderRadius: 100,
                width: 20,
                height: 20,
                // marginHorizontal: 8,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                i
              </Text>
            </View>
 
            <View
              style={{
                flex: 1,
                // alignItems: 'center',
                // justifyContent: 'flex-start',
                marginLeft: 5,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#4BB6E8',
                  fontWeight: '600',
                  // top: ,
                }}>
                {/* Set mode for both fridge and Freezer */}
                {ModeDescription}
              </Text>
            </View>
          </View>
        </View>
      ) : countRefrigeratorVariant === 2 || countRefrigeratorVariant === 1 ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor:'red'
              }}>
              <TouchableOpacity
                onPress={() => {
                  const State = 'Refrigerator';
                  const key = 'Convertible_Mode';
                  const newState = 'FR';
                  Convertible_Mode_API(State, id, key, newState);
                }}>
                <Image
                  style={{
                    height: 90,
                    width: 80,
                    resizeMode: 'contain',
                  }}
                  source={
                    checkConvertible == 'FR'
                      ? require('../../assets/RefImage/frDark.png')
                      : require('../../assets/RefImage/frHide.png')
                  }
                />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor:
                    checkConvertible == 'FR' ? '#E1F5FF80' : '#F8F8F8',
                  alignItems: 'center',
                  borderRadius: 100,
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 14, color: '#838383'}}>FR</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor:'red'
              }}>
              <TouchableOpacity
                onPress={() => {
                  const State = 'Refrigerator';
                  const key = 'Convertible_Mode';
                  const newState = 'RR';
                  Convertible_Mode_API(State, id, key, newState);
                }}>
                <Image
                  style={{
                    height: 90,
                    width: 80,
                    resizeMode: 'contain',
                  }}
                  source={
                    checkConvertible == 'RR'
                      ? require('../../assets/RefImage/rrDark.png')
                      : require('../../assets/RefImage/rrHide.png')
                  }
                />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor:
                    checkConvertible == 'RR' ? '#E1F5FF80' : '#F8F8F8',
                  alignItems: 'center',
                  borderRadius: 100,
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 14, color: '#838383'}}>RR</Text>
              </View>
            </View>
 
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor:'red'
              }}>
              <TouchableOpacity
                onPress={() => {
                  const State = 'Refrigerator';
                  const key = 'Convertible_Mode';
                  const newState = 'F0';
                  Convertible_Mode_API(State, id, key, newState);
                }}>
                <Image
                  style={{
                    height: 90,
                    width: 80,
                    resizeMode: 'contain',
                  }}
                  source={
                    checkConvertible == 'F0'
                      ? require('../../assets/RefImage/foDark.png')
                      : require('../../assets/RefImage/foHide.png')
                  }
                />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor:
                    checkConvertible == 'F0' ? '#E1F5FF80' : '#F8F8F8',
                  alignItems: 'center',
                  borderRadius: 100,
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 14, color: '#838383'}}>F0</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor:'red'
              }}>
              <TouchableOpacity
                onPress={() => {
                  const State = 'Refrigerator';
                  const key = 'Convertible_Mode';
                  const newState = 'R0';
                  Convertible_Mode_API(State, id, key, newState);
                }}>
                <Image
                  style={{
                    height: 90,
                    width: 80,
                    resizeMode: 'contain',
                  }}
                  source={
                    checkConvertible == 'R0'
                      ? require('../../assets/RefImage/roDark.png')
                      : require('../../assets/RefImage/roHide.png')
                  }
                />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor:
                    checkConvertible == 'R0' ? '#E1F5FF80' : '#F8F8F8',
                  alignItems: 'center',
                  borderRadius: 100,
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 14, color: '#838383'}}>R0</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginVertical: 50,
              marginHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              backgroundColor: '#E1F5FF80',
              borderRadius: 10,
              padding: 10,
            }}>
            <View
              style={{
                backgroundColor: '#4BB6E8',
                borderColor: '#4BB6E8',
                // paddingHorizontal: 8,
                width: 20,
                height: 20,
                borderRadius: 100,
                // marginHorizontal: 8,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                i
              </Text>
            </View>
 
            <View
              style={{
                flex: 1,
                // alignItems: 'center',
                // justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#4BB6E8',
                  fontWeight: '600',
                  marginLeft: 5,
                }}>
                {currentModeDescription}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor:'red'
              }}>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  style={{
                    height: 90,
                    width: 80,
                    resizeMode: 'contain',
                  }}
                  source={
                    checkCoolingLevel == 'Intelligent'
                      ? require('../../assets/RefImage/intDark.png')
                      : require('../../assets/RefImage/intHide.png')
                  }
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor:'red'
              }}>
              <TouchableOpacity
                onPress={() => {
                  // if (state.Power) {
                  //   const State = 'Refrigerator';
                  //   toggleChildLockImage(State, id);
                  // } else {
                  //   alert('Washing Machine Power OFF, Turn On And Retry');
                  //   return;
                  // }
                }}>
                <Image
                  style={{
                    height: 90,
                    width: 80,
                    resizeMode: 'contain',
                  }}
                  source={
                    checkCoolingLevel == 'Intelligent'
                      ? require('../../assets/RefImage/intDark.png')
                      : require('../../assets/RefImage/intHide.png')
                  }
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  style={{
                    height: 90,
                    width: 80,
                    resizeMode: 'contain',
                  }}
                  source={
                    checkCoolingLevel == 'Intelligent'
                      ? require('../../assets/RefImage/intDark.png')
                      : require('../../assets/RefImage/intHide.png')
                  }
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  style={{
                    height: 90,
                    width: 80,
                    resizeMode: 'contain',
                  }}
                  source={
                    checkCoolingLevel == 'Intelligent'
                      ? require('../../assets/RefImage/intDark.png')
                      : require('../../assets/RefImage/intHide.png')
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginVertical: 50,
              marginHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              backgroundColor: '#E1F5FF80',
              borderRadius: 10,
              padding: 10,
            }}>
            <View
              style={{
                backgroundColor: '#4BB6E8',
                borderColor: '#4BB6E8',
                paddingHorizontal: 8,
                borderRadius: 100,
              }}>
              <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
                i
              </Text>
            </View>
 
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 14, color: '#4BB6E8', fontWeight: '600'}}>
                Set Cooling mode for both fridge and freezer
                {/* {ModeDescription} */}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
export default RefBottomSheet;