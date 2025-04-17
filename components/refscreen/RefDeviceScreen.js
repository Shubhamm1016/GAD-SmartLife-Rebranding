// // // import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   SafeAreaView,
// // //   ImageBackground,
// // //   Pressable,
// // //   TouchableOpacity,
// // //   Image,
// // // } from 'react-native';
// // // import AntDesign from 'react-native-vector-icons/AntDesign';
// // // import {UserContext} from '../../Context/UserContext';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import {switchButton} from '../../Context/API';
// // // import RefDigonoseScreen from './RefDigonoseScreen';
// // // import RBSheet from 'react-native-raw-bottom-sheet';
// // // import RefBottomSheet from './RefBottomSheet';
// // // // import TabViewRef from './TabViewRef';
// // // import LinearGradient from 'react-native-linear-gradient';

// // // const RefDeviceScreen = props => {
// // //   const {navigation, route} = props;
// // //   const {id} = route.params;

// // //   const {acFeature, fetchAll} = useContext(UserContext);
// // //   const [isClose, setClose] = useState(false);
// // //   const [isActive, setIsActive] = useState(true);
// // //   const [modeType, setModeType] = useState(null);
// // //   const refRBSheet = useRef(null);
// // //   const [state, setState] = useState({
// // //     refresh: false,
// // //     role: '',
// // //     Child_Lock: '',
// // //     Convertible_Mode: '',
// // //     ErrorStatus: '',
// // //     Name: '',
// // //     Power: '',
// // //     Freezer_Temp: '',
// // //     Fridge_Temp: '',
// // //     Ref_Mode: '',
// // //     ResetDevice: '',
// // //     coolingLevel: '',
// // //     refrigeratorVariant: '',
// // //   });
// // //   console.log(state.Convertible_Mode, 'state api respons');

// // //   const toggleChildLockImage = async (State, id) => {
// // //     try {
// // //       const token = await AsyncStorage.getItem('AccessToken');
// // //       if (!token) throw new Error('Access token is missing.');
// // //       const key = 'Child_Lock';
// // //       const newState = !state.Child_Lock;
// // //       const response = await switchButton(State, token, id, newState, key);
// // //       if (response?.data) {
// // //         console.log(response.data, 'response');
// // //         setState(prevState => ({
// // //           ...prevState,
// // //           Child_Lock: newState,
// // //         }));
// // //       } else {
// // //         throw new Error('Invalid response from the API.');
// // //       }
// // //     } catch (err) {
// // //       console.log(
// // //         err?.response?.data || err.message,
// // //         'Error in toggleChildLockImage',
// // //       );
// // //     }
// // //   };

// // //   const FunctionFreezer_Temp = async (newTemp, action) => {
// // //     const MIN_VALUE = -16;
// // //     const MAX_VALUE = -22;
// // //     try {
// // //       if (!['increment', 'decrement'].includes(action)) {
// // //         return alert("Invalid action. Use 'increment' or 'decrement'.");
// // //       }
// // //       if (action === 'increment' && newTemp < MIN_VALUE) {
// // //         if (newTemp === -20 || newTemp === -22) {
// // //           newTemp += 2;
// // //         } else {
// // //           newTemp++;
// // //         }
// // //       } else if (action === 'decrement' && newTemp > MAX_VALUE) {
// // //         if (newTemp === -18 || newTemp === -20) {
// // //           newTemp -= 2;
// // //         } else {
// // //           newTemp--;
// // //         }
// // //       } else {
// // //         // return alert(
// // //         //   `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}.`,
// // //         // );
// // //         console.log(
// // //           `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}`,
// // //         );
// // //       }
// // //       const token = await AsyncStorage.getItem('AccessToken');
// // //       if (!token) throw new Error('Access token is missing.');
// // //       const state = 'Refrigerator';
// // //       const key = 'Freezer_Temp';
// // //       const newState = newTemp;
// // //       console.log(newTemp, 'newTemp');
// // //       const response = await switchButton(state, token, id, newState, key);
// // //       console.log(response.data);
// // //       setState(prevState => ({
// // //         ...prevState,
// // //         Freezer_Temp: newState,
// // //       }));
// // //     } catch (err) {
// // //       console.error(
// // //         err?.response?.data || err.message,
// // //         'Error in incrementFreezerTemp',
// // //       );
// // //     }
// // //   };
// // //   const FunctionRRFreezer_Temp = async (newTemp, action) => {
// // //     const MIN_VALUE = 1;
// // //     const MAX_VALUE = 6;
// // //     try {
// // //       if (!['increment', 'decrement'].includes(action)) {
// // //         return alert("Invalid action. Use 'increment' or 'decrement'.");
// // //       }
// // //       if (action === 'increment' && newTemp < MAX_VALUE) {
// // //         if (newTemp === 2) {
// // //           newTemp += 2;
// // //         } else {
// // //           newTemp++;
// // //         }
// // //       } else if (action === 'decrement' && newTemp > MIN_VALUE) {
// // //         if (newTemp === 4) {
// // //           newTemp -= 2;
// // //         } else {
// // //           newTemp--;
// // //         }
// // //       } else {
// // //         // return alert(
// // //         //   `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}.`,
// // //         // );
// // //         console.log(
// // //           `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}`,
// // //         );
// // //       }
// // //       const token = await AsyncStorage.getItem('AccessToken');
// // //       if (!token) throw new Error('Access token is missing.');
// // //       const state = 'Refrigerator';
// // //       const key = 'Freezer_Temp';
// // //       const newState = newTemp;
// // //       console.log(newTemp, 'newTemp');
// // //       const response = await switchButton(state, token, id, newState, key);
// // //       console.log(response.data);
// // //       setState(prevState => ({
// // //         ...prevState,
// // //         Freezer_Temp: newState,
// // //       }));
// // //     } catch (err) {
// // //       console.error(
// // //         err?.response?.data || err.message,
// // //         'Error in incrementFreezerTemp',
// // //       );
// // //     }
// // //   };

// // //   const FunctionFridge_Temp = async (newTemp, action) => {
// // //     const MIN_VALUE = 1;
// // //     const MAX_VALUE = 6;
// // //     try {
// // //       if (!['increment', 'decrement'].includes(action)) {
// // //         return alert("Invalid action. Use 'increment' or 'decrement'.");
// // //       }
// // //       if (action === 'increment' && newTemp < MAX_VALUE) {
// // //         if (newTemp === 2) {
// // //           newTemp += 2;
// // //         } else {
// // //           newTemp++;
// // //         }
// // //       } else if (action === 'decrement' && newTemp > MIN_VALUE) {
// // //         if (newTemp === 4) {
// // //           newTemp -= 2;
// // //         } else {
// // //           newTemp--;
// // //         }
// // //       } else {
// // //         // return alert(
// // //         //   `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}.`,
// // //         // );
// // //         console.log(
// // //           `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}`,
// // //         );
// // //       }
// // //       const token = await AsyncStorage.getItem('AccessToken');
// // //       if (!token) throw new Error('Access token is missing.');
// // //       const state = 'Refrigerator';
// // //       const key = 'Fridge_Temp';
// // //       const newState = newTemp;
// // //       const response = await switchButton(state, token, id, newState, key);
// // //       console.log(response.data);
// // //       setState(prevState => ({
// // //         ...prevState,
// // //         Fridge_Temp: newState,
// // //       }));
// // //     } catch (err) {
// // //       console.error(
// // //         err?.response?.data || err.message,
// // //         'Error in incrementFreezerTemp',
// // //       );
// // //     }
// // //   };

// // //   const toggleImage = selectedModeType => {
// // //     setModeType(selectedModeType);
// // //     refRBSheet.current.open();
// // //     setIsActive(!isActive);
// // //   };

// // //   useEffect(() => {
// // //     const RefData = acFeature.find(feature => feature?.alldata?.id === id)
// // //       ?.alldata.params?.Refrigerator;
// // //     console.log(RefData, 'RefData');

// // //     if (RefData) {
// // //       setState(prev => ({...prev, ...RefData}));
// // //     } else {
// // //       console.log('No matching feature or Refrigerator data found');
// // //     }
// // //   }, [acFeature, id]);

// // //   useEffect(() => {
// // //     const intervalDuration = 1000; // 10 seconds
// // //     const runDuration = 10000; // 70 seconds

// // //     const intervalId = setInterval(() => {
// // //       fetchAll();
// // //     }, intervalDuration);

// // //     const timeoutId = setTimeout(() => {
// // //       clearInterval(intervalId);
// // //     }, runDuration);

// // //     return () => {
// // //       clearInterval(intervalId);
// // //       clearTimeout(timeoutId);
// // //     };
// // //   }, [fetchAll]);

// // //   return (
// // //     <SafeAreaView
// // //       style={{
// // //         flex: 1,
// // //       }}>
// // //       <View style={{flex: 1}}>
// // //         <ImageBackground
// // //           source={require('../../assets/RefImage/RefFetcherImage.png')}
// // //           style={{
// // //             width: '100%',
// // //             height: 350,
// // //             resizeMode: 'contain',
// // //           }}>
// // //           <View style={{flexDirection: 'row'}}>
// // //             <Pressable
// // //               style={{
// // //                 height: 50,
// // //                 width: 50,
// // //                 borderRadius: 100,
// // //                 alignItems: 'center',
// // //                 justifyContent: 'center',
// // //               }}
// // //               onPress={() => navigation.goBack()}>
// // //               <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
// // //             </Pressable>

// // //             <View style={{flex: 1, justifyContent: 'center'}}>
// // //               <Text
// // //                 style={{
// // //                   fontSize: 18,
// // //                   color: '#FFFFFF',
// // //                   fontWeight: '500',
// // //                   justifyContent: 'center',
// // //                 }}>
// // //                 {state.Name}
// // //               </Text>
// // //             </View>
// // //           </View>
// // //           {/* <TabViewRef
// // //             {...props}
// // //             name={state.Name}
// // //             Convertible_Mode={state.Convertible_Mode}
// // //             Fridge_Temp={state.Fridge_Temp}
// // //             Freezer_Temp={state.Freezer_Temp}
// // //             Ref_Mode={state.Ref_Mode}
// // //             setState={setState}
// // //             id={id}
// // //             Child_Lock={state.Child_Lock}
// // //           /> */}
// // //           {/* <Text> {state.Ref_Mode=="Regular"?"shubham":"Malviya"}</Text> */}
// // //           {state.Ref_Mode == 'Regular' ? (
// // //             <LinearGradient
// // //               colors={['#4A90E2', '#D76D77']} // Adjust gradient colors as needed
// // //               style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
// // //               <View
// // //                 style={{
// // //                   flexDirection: 'row',
// // //                   justifyContent: 'space-around',
// // //                   alignItems: 'center',
// // //                   width: '90%',
// // //                 }}>
// // //                 {state.Convertible_Mode == 'RR' ? (
// // //                   <View
// // //                     style={{justifyContent: 'center', alignItems: 'center'}}>
// // //                     <TouchableOpacity
// // //                       onPress={() => {
// // //                         if (state.Child_Lock) {
// // //                           alert('Child Lock Enabled');
// // //                         } else {
// // //                           if (
// // //                             state.Convertible_Mode == 'F0' ||
// // //                             state.Convertible_Mode == 'R0'
// // //                           ) {
// // //                             console.log('Freezer_Temp not click');
// // //                           } else {
// // //                             FunctionRRFreezer_Temp(
// // //                               state.Freezer_Temp,
// // //                               'increment',
// // //                             );
// // //                           }
// // //                         }
// // //                       }}
// // //                       style={{
// // //                         padding: 10,
// // //                         alignItems: 'center',
// // //                         justifyContent: 'center',
// // //                       }}>
// // //                       <Text style={{fontSize: 30, color: 'white'}}>
// // //                         {state.Freezer_Temp == 6 ? '' : '▲'}
// // //                       </Text>
// // //                     </TouchableOpacity>
// // //                     <View
// // //                       style={{alignItems: 'center', justifyContent: 'center'}}>
// // //                       <Text
// // //                         style={{
// // //                           fontSize: 25,
// // //                           color: 'white',
// // //                           marginVertical: 10,
// // //                         }}>
// // //                         {state.Freezer_Temp} °C
// // //                       </Text>
// // //                       <Text style={{fontSize: 18, color: 'white'}}>
// // //                         FREEZER
// // //                       </Text>
// // //                     </View>
// // //                     <TouchableOpacity
// // //                       onPress={() => {
// // //                         if (state.Child_Lock) {
// // //                           alert('Child Lock Enabled');
// // //                         } else {
// // //                           if (
// // //                             state.Convertible_Mode == 'F0' ||
// // //                             state.Convertible_Mode == 'R0'
// // //                           ) {
// // //                             console.log('Freezer_Temp not click');
// // //                           } else {
// // //                             FunctionRRFreezer_Temp(
// // //                               state.Freezer_Temp,
// // //                               'decrement',
// // //                             );
// // //                           }
// // //                         }
// // //                       }}
// // //                       style={{
// // //                         padding: 10,
// // //                         alignItems: 'center',
// // //                         justifyContent: 'center',
                      
// // //                       }}>
// // //                       <Text style={{fontSize: 30, color: 'white'}}>
// // //                         {state.Freezer_Temp == 1 ? '' : '▼'}
// // //                       </Text>
// // //                     </TouchableOpacity>
// // //                   </View>
// // //                 ) : (
// // //                   <View
// // //                     style={{justifyContent: 'center', alignItems: 'center'}}>
// // //                     {state.Freezer_Temp == -22 ? (
// // //                       <View
// // //                         style={{
// // //                           padding: 10,
// // //                           alignItems: 'center',
// // //                           justifyContent: 'center',
// // //                           height:50,
// // //                           width:50,
                          
// // //                         }}>
// // //                         {/* Empty View for padding when Fridge_Temp is 6 */}
// // //                       </View>
// // //                     ) : (
// // //                       <TouchableOpacity
// // //                         onPress={() => {
// // //                           if (state.Child_Lock) {
// // //                             alert('Child Lock Enabled');
// // //                           } else {
// // //                             if (
// // //                               state.Convertible_Mode == 'F0' ||
// // //                               state.Convertible_Mode == 'R0'
// // //                             ) {
// // //                               console.log('Freezer_Temp not click');
// // //                             } else {
// // //                               FunctionFreezer_Temp(
// // //                                 state.Freezer_Temp,
// // //                                 'decrement',
// // //                               );
// // //                             }
// // //                           }
// // //                         }}
// // //                         style={{
// // //                           padding: 10,
// // //                           alignItems: 'center',
// // //                           justifyContent: 'center',
// // //                         }}>
// // //                         <Text style={{fontSize: 30, color: 'white'}}>
// // //                           {state.Convertible_Mode == 'FR' ||
// // //                           state.Convertible_Mode == 'RR'
// // //                             ? '▲'
// // //                             : ''}
// // //                         </Text>
// // //                       </TouchableOpacity>
// // //                     )}
// // //                     <View
// // //                       style={{alignItems: 'center', justifyContent: 'center'}}>
// // //                       <View
// // //                         style={{
// // //                           alignItems: 'center',
// // //                           justifyContent: 'center',
// // //                         }}>
// // //                         <Text
// // //                           style={{
// // //                             fontSize: 25,
// // //                             color: 'white',
// // //                             marginVertical: 10,
// // //                           }}>
// // //                           {state.Freezer_Temp} °C
// // //                         </Text>
// // //                         <Text style={{fontSize: 18, color: 'white'}}>
// // //                           FREEZER
// // //                         </Text>
// // //                       </View>
// // //                     </View>
// // //                     {state.Freezer_Temp == -16 ? (
// // //                       <View
// // //                         style={{
// // //                           padding: 10,
// // //                           alignItems: 'center',
// // //                           justifyContent: 'center',
// // //                           height:50,
// // //                           width:50,
// // //                         }}>
                         
// // //                         {/* Empty View for padding when Fridge_Temp is 6 */}
// // //                       </View>
// // //                     ) : (
// // //                       <TouchableOpacity
// // //                         onPress={() => {
// // //                           if (state.Child_Lock) {
// // //                             alert('Child Lock Enabled');
// // //                           } else {
// // //                             if (
// // //                               state.Convertible_Mode == 'F0' ||
// // //                               state.Convertible_Mode == 'R0'
// // //                             ) {
// // //                               console.log('Freezer_Temp not click');
// // //                             } else {
// // //                               FunctionFreezer_Temp(
// // //                                 state.Freezer_Temp,
// // //                                 'increment',
// // //                               );
// // //                             }
// // //                           }
// // //                         }}
// // //                         style={{
// // //                           paddingHorizontal: 10,
// // //                           paddingVertical:10,
// // //                           alignItems: 'center',
// // //                           justifyContent: 'center',
// // //                           height:50,
// // //                           width:50,

// // //                         }}>
// // //                         <Text style={{fontSize: 30, color: 'white'}}>
// // //                           {state.Convertible_Mode == 'FR' ||
// // //                           state.Convertible_Mode == 'RR'
// // //                             ? '▼'
// // //                             : ''}
// // //                         </Text>
// // //                       </TouchableOpacity>
// // //                     )}
// // //                   </View>
// // //                 )}
// // //                 {state.Convertible_Mode == 'R0' ||
// // //                 state.Convertible_Mode == 'F0' ? null : (
// // //                   <>
// // //                     <View
// // //                       style={{
// // //                         width: 1,
// // //                         height: '60%',
// // //                         backgroundColor: 'white',
// // //                       }}
// // //                     />

// // //                     <View
// // //                       style={{justifyContent: 'center', alignItems: 'center'}}>
// // //                       {state.Fridge_Temp === 6 ? (
// // //                         <View
// // //                           style={{
// // //                             padding: 10,
// // //                             alignItems: 'center',
// // //                             justifyContent: 'center',
// // //                             height: 50,
// // //                             width: 50,
// // //                           }}>
// // //                           {/* Empty View for padding when Fridge_Temp is 6 */}
// // //                         </View>
// // //                       ) : (
// // //                         <TouchableOpacity
// // //                           onPress={() => {
// // //                             if (state.Child_Lock) {
// // //                               alert('Child Lock Enabled');
// // //                             } else {
// // //                               FunctionFridge_Temp(
// // //                                 state.Fridge_Temp,
// // //                                 'increment',
// // //                               );
// // //                             }
// // //                           }}
// // //                           style={{
// // //                             padding: 10,
// // //                             alignItems: 'center',
// // //                             justifyContent: 'center',
// // //                           }}>
// // //                           <Text style={{fontSize: 30, color: 'white'}}>▲</Text>
// // //                         </TouchableOpacity>
// // //                       )}
// // //                       <View
// // //                         style={{
// // //                           justifyContent: 'center',
// // //                           alignItems: 'center',
// // //                         }}>
// // //                         <Text
// // //                           style={{
// // //                             fontSize: 25,
// // //                             color: 'white',
// // //                             marginVertical: 10,
// // //                           }}>
// // //                           {state.Fridge_Temp} °C
// // //                         </Text>
// // //                         <Text style={{fontSize: 18, color: 'white'}}>
// // //                           FRIDGE
// // //                         </Text>
// // //                       </View>
// // //                       {state.Fridge_Temp === 1 ? (
// // //                         <View
// // //                           style={{
// // //                             padding: 10,
// // //                             alignItems: 'center',
// // //                             justifyContent: 'center',
// // //                             height:50,
// // //                             width:50,
                            
// // //                           }}>
// // //                           {/* Empty View for padding when Fridge_Temp is 6 */}
// // //                         </View>
// // //                       ) : (
// // //                         <TouchableOpacity
// // //                           onPress={() => {
// // //                             if (state.Child_Lock) {
// // //                               alert('Child Lock Enabled');
// // //                             } else {
// // //                               FunctionFridge_Temp(
// // //                                 state.Fridge_Temp,
// // //                                 'decrement',
// // //                               );
// // //                             }
// // //                           }}
// // //                           style={{
// // //                             padding: 10,
// // //                             alignItems: 'center',
// // //                             justifyContent: 'center',
// // //                           }}>
// // //                           <Text style={{fontSize: 30, color: 'white'}}>▼</Text>
// // //                         </TouchableOpacity>
// // //                       )}
// // //                     </View>
// // //                   </>
// // //                 )}
// // //               </View>
// // //             </LinearGradient>
// // //           ) : (
// // //             ''
// // //           )}
// // //         </ImageBackground>
// // //       </View>
// // //       <View
// // //         style={{
// // //           flex: 1,
// // //           paddingHorizontal: 20,
// // //           paddingVertical: 20,
// // //         }}>
// // //         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
// // //           <TouchableOpacity
// // //             onPress={() => {
// // //               if (state.Child_Lock) {
// // //                 alert('Child Lock Enabled');
// // //               } else {
// // //                 if (state.Convertible_Mode == 'FR') {
// // //                   const selectedModeType = 'MODE';
// // //                   toggleImage(selectedModeType);
// // //                 } else {
// // //                   alert('This Mode only works with FR Convertible Mode');
// // //                 }
// // //               }
// // //             }}>
// // //             <Image
// // //               style={{height: 90, width: 80, resizeMode: 'contain'}}
// // //               source={require('../../assets/RefImage/modeHide.png')}
// // //             />
// // //           </TouchableOpacity>

// // //           <TouchableOpacity
// // //             disabled={
// // //               !(
// // //                 state.refrigeratorVariant === 2 ||
// // //                 state.refrigeratorVariant === 1
// // //               )
// // //             }
// // //             style={{
// // //               opacity:
// // //                 state.refrigeratorVariant === 2 ||
// // //                 state.refrigeratorVariant === 1
// // //                   ? 1
// // //                   : 0.5,
// // //             }}
// // //             onPress={() => {
// // //               if (state.Child_Lock) {
// // //                 alert('Child Lock Enabled');
// // //               } else {
// // //                 const selectedModeType = 'CONVERTIBLE MODE';
// // //                 toggleImage(selectedModeType);
// // //               }
// // //             }}>
// // //             <Image
// // //               style={{height: 90, width: 80, resizeMode: 'contain'}}
// // //               source={require('../../assets/RefImage/cmHide.png')}
// // //             />
// // //           </TouchableOpacity>

// // //           <TouchableOpacity
// // //             disabled={!state.refrigeratorVariant == 0}
// // //             onPress={() => {
// // //               if (state.Power) {
// // //                 const selectedModeType = 'Cooling MODE';
// // //                 toggleImage(selectedModeType);
// // //               } else {
// // //                 alert('Washing Machine Power OFF, Turn On And Retry');
// // //                 return;
// // //               }
// // //             }}>
// // //             <Image
// // //               style={{
// // //                 height: 90,
// // //                 width: 80,
// // //                 resizeMode: 'contain',

// // //                 opacity: state.refrigeratorVariant === 0 ? 1 : 0.5, // Visual feedback for disabled state
// // //               }}
// // //               source={require('../../assets/RefImage/coolmHide.png')}
// // //             />
// // //           </TouchableOpacity>

// // //           <TouchableOpacity
// // //             onPress={() => {
// // //               if (state.Power) {
// // //                 const State = 'Refrigerator';
// // //                 toggleChildLockImage(State, id);
// // //               } else {
// // //                 alert('Refrigerator Power OFF, Turn On And Retry');
// // //                 return;
// // //               }
// // //             }}>
// // //             <Image
// // //               style={{
// // //                 height: 90,
// // //                 width: 80,
// // //                 resizeMode: 'contain',
// // //               }}
// // //               source={
// // //                 state.Child_Lock
// // //                   ? require('../../assets/washingmashine/wchildclocks.png')
// // //                   : require('../../assets/washingmashine/wchildclock.png')
// // //               }
// // //             />
// // //           </TouchableOpacity>
// // //         </View>
// // //         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
// // //           <RefDigonoseScreen
// // //             power={state.Power}
// // //             err_status={state.ErrorStatus}
// // //             ChildLock={state.Child_Lock}
// // //             id={id}
// // //             setState={setState}
// // //           />

// // //           <TouchableOpacity
// // //             onPress={() => {
// // //               navigation.navigate('AcEcoScreen', {
// // //                 ...props,
// // //                 id: id,
// // //                 uname: state.Name,
// // //                 role: state.role,
// // //                 key: 'Refrigerator',
// // //               });
// // //             }}>
// // //             <Image
// // //               style={{
// // //                 height: 90,
// // //                 width: 80,
// // //                 resizeMode: 'contain',
// // //               }}
// // //               source={require('../../assets/washingmashine/Share.png')}
// // //             />
// // //           </TouchableOpacity>
// // //           <View style={{height: 90, width: 80}} />
// // //           <View style={{height: 90, width: 80}} />
// // //         </View>
// // //       </View>

// // //       <RBSheet
// // //         ref={refRBSheet}
// // //         height={400}
// // //         onClose={() => {
// // //           // fetchAll();
// // //         }}
// // //         customStyles={{
// // //           container: {
// // //             borderTopLeftRadius: 25,
// // //             borderTopRightRadius: 25,
// // //           },
// // //         }}>
// // //         <RefBottomSheet
// // //           isClose={isClose}
// // //           refRBSheet={refRBSheet}
// // //           id={id}
// // //           Convertible_Mode={state.Convertible_Mode}
// // //           Ref_Mode={state.Ref_Mode}
// // //           modeType={modeType}
// // //           setState={setState}
// // //           setClose={setClose}
// // //           Freezer_Temp={state.Freezer_Temp}
// // //           Fridge_Temp={state.Fridge_Temp}
// // //           refrigeratorVariant={state.refrigeratorVariant}
// // //           coolingLevel={state.coolingLevel}
// // //           // fetchAll={fetchAll}
// // //         />
// // //       </RBSheet>
// // //     </SafeAreaView>
// // //   );
// // // };
// // // export default RefDeviceScreen;


// // import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
// // import {
// //   View,
// //   Text,
// //   SafeAreaView,
// //   ImageBackground,
// //   Pressable,
// //   TouchableOpacity,
// //   Image,
// // } from 'react-native';
// // import AntDesign from 'react-native-vector-icons/AntDesign';
// // import {UserContext} from '../../Context/UserContext';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import {switchButton} from '../../Context/API';
// // import RefDigonoseScreen from './RefDigonoseScreen';
// // import RBSheet from 'react-native-raw-bottom-sheet';
// // import RefBottomSheet from './RefBottomSheet';
// // // import TabViewRef from './TabViewRef';
// // import LinearGradient from 'react-native-linear-gradient';
 
// // const RefDeviceScreen = props => {
// //   const {navigation, route} = props;
// //   const {id} = route.params;
 
// //   const {acFeature, fetchAll} = useContext(UserContext);
// //   const [isClose, setClose] = useState(false);
// //   const [isActive, setIsActive] = useState(true);
// //   const [modeType, setModeType] = useState(null);
// //   const refRBSheet = useRef(null);
// //   const [state, setState] = useState({
// //     refresh: false,
// //     role: '',
// //     Child_Lock: '',
// //     Convertible_Mode: '',
// //     ErrorStatus: '',
// //     Name: '',
// //     Power: '',
// //     Freezer_Temp: '',
// //     Fridge_Temp: '',
// //     Ref_Mode: '',
// //     ResetDevice: '',
// //     coolingLevel: '',
// //     refrigeratorVariant: '',
// //   });
// //   console.log(state.ErrorStatus, 'state.ErrorStatus.....');
 
// //   const toggleChildLockImage = async (State, id) => {
// //     try {
// //       const token = await AsyncStorage.getItem('AccessToken');
// //       if (!token) throw new Error('Access token is missing.');
// //       const key = 'Child_Lock';
// //       const newState = !state.Child_Lock;
// //       const response = await switchButton(State, token, id, newState, key);
// //       if (response?.data) {
// //         console.log(response.data, 'response');
// //         setState(prevState => ({
// //           ...prevState,
// //           Child_Lock: newState,
// //         }));
// //       } else {
// //         throw new Error('Invalid response from the API.');
// //       }
// //     } catch (err) {
// //       console.log(
// //         err?.response?.data || err.message,
// //         'Error in toggleChildLockImage',
// //       );
// //     }
// //   };
 
// //   const FunctionFreezer_Temp = async (newTemp, action) => {
// //     const MIN_VALUE = -16;
// //     const MAX_VALUE = -22;
// //     try {
// //       if (!['increment', 'decrement'].includes(action)) {
// //         return alert("Invalid action. Use 'increment' or 'decrement'.");
// //       }
// //       if (action === 'increment' && newTemp < MIN_VALUE) {
// //         if (newTemp === -20 || newTemp === -22) {
// //           newTemp += 2;
// //         } else {
// //           newTemp++;
// //         }
// //       } else if (action === 'decrement' && newTemp > MAX_VALUE) {
// //         if (newTemp === -18 || newTemp === -20) {
// //           newTemp -= 2;
// //         } else {
// //           newTemp--;
// //         }
// //       } else {
// //         // return alert(
// //         //   `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}.`,
// //         // );
// //         console.log(
// //           `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}`,
// //         );
// //       }
// //       const token = await AsyncStorage.getItem('AccessToken');
// //       if (!token) throw new Error('Access token is missing.');
// //       const state = 'Refrigerator';
// //       const key = 'Freezer_Temp';
// //       const newState = newTemp;
// //       console.log(newTemp, 'newTemp');
// //       const response = await switchButton(state, token, id, newState, key);
// //       console.log(response.data);
// //       setState(prevState => ({
// //         ...prevState,
// //         Freezer_Temp: newState,
// //       }));
// //     } catch (err) {
// //       console.error(
// //         err?.response?.data || err.message,
// //         'Error in incrementFreezerTemp',
// //       );
// //     }
// //   };
// //   const FunctionRRFreezer_Temp = async (newTemp, action) => {
// //     const MIN_VALUE = 1;
// //     const MAX_VALUE = 6;
// //     try {
// //       if (!['increment', 'decrement'].includes(action)) {
// //         return alert("Invalid action. Use 'increment' or 'decrement'.");
// //       }
// //       if (action === 'increment' && newTemp < MAX_VALUE) {
// //         if (newTemp === 2) {
// //           newTemp += 2;
// //         } else {
// //           newTemp++;
// //         }
// //       } else if (action === 'decrement' && newTemp > MIN_VALUE) {
// //         if (newTemp === 4) {
// //           newTemp -= 2;
// //         } else {
// //           newTemp--;
// //         }
// //       } else {
// //         // return alert(
// //         //   `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}.`,
// //         // );
// //         console.log(
// //           `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}`,
// //         );
// //       }
// //       const token = await AsyncStorage.getItem('AccessToken');
// //       if (!token) throw new Error('Access token is missing.');
// //       const state = 'Refrigerator';
// //       const key = 'Freezer_Temp';
// //       const newState = newTemp;
// //       console.log(newTemp, 'newTemp');
// //       const response = await switchButton(state, token, id, newState, key);
// //       console.log(response.data);
// //       setState(prevState => ({
// //         ...prevState,
// //         Freezer_Temp: newState,
// //       }));
// //     } catch (err) {
// //       console.error(
// //         err?.response?.data || err.message,
// //         'Error in incrementFreezerTemp',
// //       );
// //     }
// //   };
 
// //   const FunctionFridge_Temp = async (newTemp, action) => {
// //     const MIN_VALUE = 1;
// //     const MAX_VALUE = 6;
// //     try {
// //       if (!['increment', 'decrement'].includes(action)) {
// //         return alert("Invalid action. Use 'increment' or 'decrement'.");
// //       }
// //       if (action === 'increment' && newTemp < MAX_VALUE) {
// //         if (newTemp === 2) {
// //           newTemp += 2;
// //         } else {
// //           newTemp++;
// //         }
// //       } else if (action === 'decrement' && newTemp > MIN_VALUE) {
// //         if (newTemp === 4) {
// //           newTemp -= 2;
// //         } else {
// //           newTemp--;
// //         }
// //       } else {
// //         // return alert(
// //         //   `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}.`,
// //         // );
// //         console.log(
// //           `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}`,
// //         );
// //       }
// //       const token = await AsyncStorage.getItem('AccessToken');
// //       if (!token) throw new Error('Access token is missing.');
// //       const state = 'Refrigerator';
// //       const key = 'Fridge_Temp';
// //       const newState = newTemp;
// //       const response = await switchButton(state, token, id, newState, key);
// //       console.log(response.data);
// //       setState(prevState => ({
// //         ...prevState,
// //         Fridge_Temp: newState,
// //       }));
// //     } catch (err) {
// //       console.error(
// //         err?.response?.data || err.message,
// //         'Error in incrementFreezerTemp',
// //       );
// //     }
// //   };
 
// //   const toggleImage = selectedModeType => {
// //     setModeType(selectedModeType);
// //     refRBSheet.current.open();
// //     setIsActive(!isActive);
// //   };
 
// //   useEffect(() => {
// //     const RefData = acFeature.find(feature => feature?.alldata?.id === id)
// //       ?.alldata.params?.Refrigerator;
// //     console.log(RefData, 'RefData');
 
// //     if (RefData) {
// //       setState(prev => ({...prev, ...RefData}));
// //     } else {
// //       console.log('No matching feature or Refrigerator data found');
// //     }
// //   }, [acFeature, id]);
 
// //   useEffect(() => {
// //     const intervalDuration = 1000; // 10 seconds
// //     const runDuration = 10000; // 70 seconds
 
// //     const intervalId = setInterval(() => {
// //       fetchAll();
// //     }, intervalDuration);
 
// //     const timeoutId = setTimeout(() => {
// //       clearInterval(intervalId);
// //     }, runDuration);
 
// //     return () => {
// //       clearInterval(intervalId);
// //       clearTimeout(timeoutId);
// //     };
// //   }, [fetchAll]);
 
  
 
// //   return (
// //     <SafeAreaView
// //       style={{
// //         flex: 1,
// //       }}>
// //       <View style={{flex: 1}}>
// //         <ImageBackground
// //           source={require('../../assets/RefImage/RefFetcherImage.png')}
// //           style={{
// //             width: '100%',
// //             height: 350,
// //             resizeMode: 'contain',
// //           }}>
// //           <View style={{flexDirection: 'row'}}>
// //             <Pressable
// //               style={{
// //                 height: 50,
// //                 width: 50,
// //                 borderRadius: 100,
// //                 alignItems: 'center',
// //                 justifyContent: 'center',
// //               }}
// //               onPress={() => navigation.goBack()}>
// //               <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
// //             </Pressable>
 
// //             <View style={{flex: 1, justifyContent: 'center'}}>
// //               <Text
// //                 style={{
// //                   fontSize: 18,
// //                   color: '#FFFFFF',
// //                   fontWeight: '500',
// //                   justifyContent: 'center',
// //                 }}>
// //                 {state.Name}
// //               </Text>
// //             </View>
// //           </View>
// //           {/* <TabViewRef
// //             {...props}
// //             name={state.Name}
// //             Convertible_Mode={state.Convertible_Mode}
// //             Fridge_Temp={state.Fridge_Temp}
// //             Freezer_Temp={state.Freezer_Temp}
// //             Ref_Mode={state.Ref_Mode}
// //             setState={setState}
// //             id={id}
// //             Child_Lock={state.Child_Lock}
// //           /> */}
// //           {/* <Text> {state.Ref_Mode=="Regular"?"shubham":"Malviya"}</Text> */}
// //           {state.Ref_Mode == 'Regular' ? (
// //             <LinearGradient
// //               colors={['#4A90E2', '#D76D77']} // Adjust gradient colors as needed
// //               style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
// //               <View
// //                 style={{
// //                   flexDirection: 'row',
// //                   justifyContent: 'space-around',
// //                   alignItems: 'center',
// //                   width: '90%',
// //                 }}>
// //                 {state.Convertible_Mode == 'RR' ? (
// //                   <View
// //                     style={{justifyContent: 'center', alignItems: 'center'}}>
// //                     <TouchableOpacity
// //                       onPress={() => {
// //                         if (state.Child_Lock) {
// //                           alert('Child Lock Enabled');
// //                         } else {
// //                           if (
// //                             state.Convertible_Mode == 'F0' ||
// //                             state.Convertible_Mode == 'R0'
// //                           ) {
// //                             console.log('Freezer_Temp not click');
// //                           } else {
// //                             FunctionRRFreezer_Temp(
// //                               state.Freezer_Temp,
// //                               'increment',
// //                             );
// //                           }
// //                         }
// //                       }}
// //                       style={{
// //                         padding: 10,
// //                         alignItems: 'center',
// //                         justifyContent: 'center',
// //                       }}>
// //                       <Text style={{fontSize: 30, color: 'white'}}>
// //                         {state.Freezer_Temp == 6 ? '' : '▲'}
// //                       </Text>
// //                     </TouchableOpacity>
// //                     <View
// //                       style={{alignItems: 'center', justifyContent: 'center'}}>
// //                       <Text
// //                         style={{
// //                           fontSize: 25,
// //                           color: 'white',
// //                           marginVertical: 10,
// //                         }}>
// //                         {state.Freezer_Temp} °C
// //                       </Text>
// //                       <Text style={{fontSize: 18, color: 'white'}}>
// //                         FREEZER
// //                       </Text>
// //                     </View>
// //                     <TouchableOpacity
// //                       onPress={() => {
// //                         if (state.Child_Lock) {
// //                           alert('Child Lock Enabled');
// //                         } else {
// //                           if (
// //                             state.Convertible_Mode == 'F0' ||
// //                             state.Convertible_Mode == 'R0'
// //                           ) {
// //                             console.log('Freezer_Temp not click');
// //                           } else {
// //                             FunctionRRFreezer_Temp(
// //                               state.Freezer_Temp,
// //                               'decrement',
// //                             );
// //                           }
// //                         }
// //                       }}
// //                       style={{
// //                         padding: 10,
// //                         alignItems: 'center',
// //                         justifyContent: 'center',
                      
// //                       }}>
// //                       <Text style={{fontSize: 30, color: 'white'}}>
// //                         {state.Freezer_Temp == 1 ? '' : '▼'}
// //                       </Text>
// //                     </TouchableOpacity>
// //                   </View>
// //                 ) : (
// //                   <View
// //                     style={{justifyContent: 'center', alignItems: 'center'}}>
// //                     {state.Freezer_Temp == -22 ? (
// //                       <View
// //                         style={{
// //                           padding: 10,
// //                           alignItems: 'center',
// //                           justifyContent: 'center',
// //                           height:50,
// //                           width:50,
                          
// //                         }}>
// //                         {/* Empty View for padding when Fridge_Temp is 6 */}
// //                       </View>
// //                     ) : (
// //                       <TouchableOpacity
// //                         onPress={() => {
// //                           if (state.Child_Lock) {
// //                             alert('Child Lock Enabled');
// //                           } else {
// //                             if (
// //                               state.Convertible_Mode == 'F0' ||
// //                               state.Convertible_Mode == 'R0'
// //                             ) {
// //                               console.log('Freezer_Temp not click');
// //                             } else {
// //                               FunctionFreezer_Temp(
// //                                 state.Freezer_Temp,
// //                                 'decrement',
// //                               );
// //                             }
// //                           }
// //                         }}
// //                         style={{
// //                           padding: 10,
// //                           alignItems: 'center',
// //                           justifyContent: 'center',
// //                         }}>
// //                         <Text style={{fontSize: 30, color: 'white'}}>
// //                           {state.Convertible_Mode == 'FR' ||
// //                           state.Convertible_Mode == 'RR'
// //                             ? '▲'
// //                             : ''}
// //                         </Text>
// //                       </TouchableOpacity>
// //                     )}
// //                     <View
// //                       style={{alignItems: 'center', justifyContent: 'center'}}>
// //                       <View
// //                         style={{
// //                           alignItems: 'center',
// //                           justifyContent: 'center',
// //                         }}>
// //                         <Text
// //                           style={{
// //                             fontSize: 25,
// //                             color: 'white',
// //                             marginVertical: 10,
// //                           }}>
// //                           {state.Freezer_Temp} °C
// //                         </Text>
// //                         <Text style={{fontSize: 18, color: 'white'}}>
// //                           FREEZER
// //                         </Text>
// //                       </View>
// //                     </View>
// //                     {state.Freezer_Temp == -16 ? (
// //                       <View
// //                         style={{
// //                           padding: 10,
// //                           alignItems: 'center',
// //                           justifyContent: 'center',
// //                           height:50,
// //                           width:50,
// //                         }}>
                         
// //                         {/* Empty View for padding when Fridge_Temp is 6 */}
// //                       </View>
// //                     ) : (
// //                       <TouchableOpacity
// //                         onPress={() => {
// //                           if (state.Child_Lock) {
// //                             alert('Child Lock Enabled');
// //                           } else {
// //                             if (
// //                               state.Convertible_Mode == 'F0' ||
// //                               state.Convertible_Mode == 'R0'
// //                             ) {
// //                               console.log('Freezer_Temp not click');
// //                             } else {
// //                               FunctionFreezer_Temp(
// //                                 state.Freezer_Temp,
// //                                 'increment',
// //                               );
// //                             }
// //                           }
// //                         }}
// //                         style={{
// //                           paddingHorizontal: 10,
// //                           paddingVertical:10,
// //                           alignItems: 'center',
// //                           justifyContent: 'center',
// //                           height:50,
// //                           width:50,
 
// //                         }}>
// //                         <Text style={{fontSize: 30, color: 'white'}}>
// //                           {state.Convertible_Mode == 'FR' ||
// //                           state.Convertible_Mode == 'RR'
// //                             ? '▼'
// //                             : ''}
// //                         </Text>
// //                       </TouchableOpacity>
// //                     )}
// //                   </View>
// //                 )}
// //                 {state.Convertible_Mode == 'R0' ||
// //                 state.Convertible_Mode == 'F0' ? null : (
// //                   <>
// //                     <View
// //                       style={{
// //                         width: 1,
// //                         height: '60%',
// //                         backgroundColor: 'white',
// //                       }}
// //                     />
 
// //                     <View
// //                       style={{justifyContent: 'center', alignItems: 'center'}}>
// //                       {state.Fridge_Temp === 6 ? (
// //                         <View
// //                           style={{
// //                             padding: 10,
// //                             alignItems: 'center',
// //                             justifyContent: 'center',
// //                             height: 50,
// //                             width: 50,
// //                           }}>
// //                           {/* Empty View for padding when Fridge_Temp is 6 */}
// //                         </View>
// //                       ) : (
// //                         <TouchableOpacity
// //                           onPress={() => {
// //                             if (state.Child_Lock) {
// //                               alert('Child Lock Enabled');
// //                             } else {
// //                               FunctionFridge_Temp(
// //                                 state.Fridge_Temp,
// //                                 'increment',
// //                               );
// //                             }
// //                           }}
// //                           style={{
// //                             padding: 10,
// //                             alignItems: 'center',
// //                             justifyContent: 'center',
// //                           }}>
// //                           <Text style={{fontSize: 30, color: 'white'}}>▲</Text>
// //                         </TouchableOpacity>
// //                       )}
// //                       <View
// //                         style={{
// //                           justifyContent: 'center',
// //                           alignItems: 'center',
// //                         }}>
// //                         <Text
// //                           style={{
// //                             fontSize: 25,
// //                             color: 'white',
// //                             marginVertical: 10,
// //                           }}>
// //                           {state.Fridge_Temp} °C
// //                         </Text>
// //                         <Text style={{fontSize: 18, color: 'white'}}>
// //                           FRIDGE
// //                         </Text>
// //                       </View>
// //                       {state.Fridge_Temp === 1 ? (
// //                         <View
// //                           style={{
// //                             padding: 10,
// //                             alignItems: 'center',
// //                             justifyContent: 'center',
// //                             height:50,
// //                             width:50,
                            
// //                           }}>
// //                           {/* Empty View for padding when Fridge_Temp is 6 */}
// //                         </View>
// //                       ) : (
// //                         <TouchableOpacity
// //                           onPress={() => {
// //                             if (state.Child_Lock) {
// //                               alert('Child Lock Enabled');
// //                             } else {
// //                               FunctionFridge_Temp(
// //                                 state.Fridge_Temp,
// //                                 'decrement',
// //                               );
// //                             }
// //                           }}
// //                           style={{
// //                             padding: 10,
// //                             alignItems: 'center',
// //                             justifyContent: 'center',
// //                           }}>
// //                           <Text style={{fontSize: 30, color: 'white'}}>▼</Text>
// //                         </TouchableOpacity>
// //                       )}
// //                     </View>
// //                   </>
// //                 )}
// //               </View>
// //             </LinearGradient>
// //           ) : (
// //             ''
// //           )}
// //         </ImageBackground>
// //       </View>
// //       <View
// //         style={{
// //           flex: 1,
// //           paddingHorizontal: 20,
// //           paddingVertical: 20,
// //         }}>
// //         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
// //           <TouchableOpacity
// //           disabled={!!state.ErrorStatus}
// //             onPress={() => {
// //               if (state.Child_Lock) {
// //                 alert('Child Lock Enabled');
// //               } else {
// //                 if (state.Convertible_Mode == 'FR') {
// //                   const selectedModeType = 'MODE';
// //                   toggleImage(selectedModeType);
// //                 } else {
// //                   alert('This Mode only works with FR Convertible Mode');
// //                 }
// //               }
// //             }}>
// //             <Image
// //               style={{height: 90, width: 80, resizeMode: 'contain'}}
// //               source={require('../../assets/RefImage/modeHide.png')}
// //             />
// //           </TouchableOpacity>
 
// //           <TouchableOpacity
// //             // disabled={
// //             //   !(
// //             //     state.refrigeratorVariant === 2 ||
// //             //     state.refrigeratorVariant === 1
// //             //   )
// //             // }
// //             disabled={
// //               !!state.ErrorStatus ||
// //               !(state.refrigeratorVariant === 2 || state.refrigeratorVariant === 1)
// //             }
// //             style={{
// //               opacity:
// //                 state.refrigeratorVariant === 2 ||
// //                 state.refrigeratorVariant === 1
// //                   ? 1
// //                   : 0.5,
// //             }}
// //             onPress={() => {
// //               if (state.Child_Lock) {
// //                 alert('Child Lock Enabled');
// //               } else {
// //                 const selectedModeType = 'CONVERTIBLE MODE';
// //                 toggleImage(selectedModeType);
// //               }
// //             }}>
// //             <Image
// //               style={{height: 90, width: 80, resizeMode: 'contain'}}
// //               source={
// //                 require('../../assets/RefImage/cmHide.png')}
// //             />
// //           </TouchableOpacity>
 
// //           <TouchableOpacity
// //             disabled={!!state.ErrorStatus || state.refrigeratorVariant !== 0}
// //             style={{
// //               opacity: state.ErrorStatus || state.refrigeratorVariant !== 0 ? 0.5 : 1, // Visual feedback for disabled state
// //             }}
// //             onPress={() => {
// //               if (state.Power) {
// //                 const selectedModeType = 'Cooling MODE';
// //                 toggleImage(selectedModeType);
// //               } else {
// //                 alert('Washing Machine Power OFF, Turn On And Retry');
// //                 return;
// //               }
// //             }}>
// //             <Image
// //               style={{
// //                 height: 90,
// //                 width: 80,
// //                 resizeMode: 'contain',
 
// //                 opacity: state.refrigeratorVariant === 0 ? 1 : 0.5, // Visual feedback for disabled state
// //               }}
// //               source={require('../../assets/RefImage/coolmHide.png')}
// //             />
// //           </TouchableOpacity>
 
// //           <TouchableOpacity
// //           disabled={!!state.ErrorStatus}
// //             onPress={() => {
// //               if (state.Power) {
// //                 const State = 'Refrigerator';
// //                 toggleChildLockImage(State, id);
// //               } else {
// //                 alert('Refrigerator Power OFF, Turn On And Retry');
// //                 return;
// //               }
// //             }}>
// //             <Image
// //               style={{
// //                 height: 90,
// //                 width: 80,
// //                 resizeMode: 'contain',
// //               }}
// //               source={
// //                 state.Child_Lock
// //                   ? require('../../assets/washingmashine/wchildclocks.png')
// //                   : require('../../assets/washingmashine/wchildclock.png')
// //               }
// //             />
// //           </TouchableOpacity>
// //         </View>
// //         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
// //           <RefDigonoseScreen
// //             power={state.Power}
// //             err_status={state.ErrorStatus}
// //             ChildLock={state.Child_Lock}
// //             id={id}
// //             setState={setState}
// //           />
 
// //           <TouchableOpacity
// //             onPress={() => {
// //               navigation.navigate('AcEcoScreen', {
// //                 ...props,
// //                 id: id,
// //                 uname: state.Name,
// //                 role: state.role,
// //                 key: 'Refrigerator',
// //               });
// //             }}>
// //             <Image
// //               style={{
// //                 height: 90,
// //                 width: 80,
// //                 resizeMode: 'contain',
// //               }}
// //               source={require('../../assets/washingmashine/Share.png')}
// //             />
// //           </TouchableOpacity>
// //           <View style={{height: 90, width: 80}} />
// //           <View style={{height: 90, width: 80}} />
// //         </View>
// //       </View>
 
// //       <RBSheet
// //         ref={refRBSheet}
// //         height={400}
// //         onClose={() => {
// //           // fetchAll();
// //         }}
// //         customStyles={{
// //           container: {
// //             borderTopLeftRadius: 25,
// //             borderTopRightRadius: 25,
// //           },
// //         }}>
// //         <RefBottomSheet
// //           isClose={isClose}
// //           refRBSheet={refRBSheet}
// //           id={id}
// //           Convertible_Mode={state.Convertible_Mode}
// //           Ref_Mode={state.Ref_Mode}
// //           modeType={modeType}
// //           setState={setState}
// //           setClose={setClose}
// //           Freezer_Temp={state.Freezer_Temp}
// //           Fridge_Temp={state.Fridge_Temp}
// //           refrigeratorVariant={state.refrigeratorVariant}
// //           coolingLevel={state.coolingLevel}
// //           // fetchAll={fetchAll}
// //         />
// //       </RBSheet>
// //     </SafeAreaView>
// //   );
// // };
// // export default RefDeviceScreen;


// import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
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
// import {UserContext} from '../../Context/UserContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {switchButton} from '../../Context/API';
// import RefDigonoseScreen from './RefDigonoseScreen';
// import RBSheet from 'react-native-raw-bottom-sheet';
// import RefBottomSheet from './RefBottomSheet';
// // import TabViewRef from './TabViewRef';
// import LinearGradient from 'react-native-linear-gradient';

// const RefDeviceScreen = props => {
//   const {navigation, route} = props;
//   const {id} = route.params;

//   const {acFeature, fetchAll} = useContext(UserContext);
//   const [isClose, setClose] = useState(false);
//   const [isActive, setIsActive] = useState(true);
//   const [modeType, setModeType] = useState(null);
//   const refRBSheet = useRef(null);
//   const [state, setState] = useState({
//     refresh: false,
//     role: '',
//     Child_Lock: '',
//     Convertible_Mode: '',
//     ErrorStatus: '',
//     Name: '',
//     Power: '',
//     Freezer_Temp: '',
//     Fridge_Temp: '',
//     Ref_Mode: '',
//     ResetDevice: '',
//     coolingLevel: '',
//     refrigeratorVariant: '',
//   });
//   console.log(state.ErrorStatus, 'state.ErrorStatus.....');

//   const toggleChildLockImage = async (State, id) => {
//     try {
//       const token = await AsyncStorage.getItem('AccessToken');
//       if (!token) throw new Error('Access token is missing.');
//       const key = 'Child_Lock';
//       const newState = !state.Child_Lock;
//       const response = await switchButton(State, token, id, newState, key);
//       if (response?.data) {
//         console.log(response.data, 'response');
//         setState(prevState => ({
//           ...prevState,
//           Child_Lock: newState,
//         }));
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

//   const FunctionFreezer_Temp = async (newTemp, action) => {
//     const MIN_VALUE = -16;
//     const MAX_VALUE = -22;
//     try {
//       if (!['increment', 'decrement'].includes(action)) {
//         return alert("Invalid action. Use 'increment' or 'decrement'.");
//       }
//       if (action === 'increment' && newTemp < MIN_VALUE) {
//         if (newTemp === -20 || newTemp === -22) {
//           newTemp += 2;
//         } else {
//           newTemp++;
//         }
//       } else if (action === 'decrement' && newTemp > MAX_VALUE) {
//         if (newTemp === -18 || newTemp === -20) {
//           newTemp -= 2;
//         } else {
//           newTemp--;
//         }
//       } else {
//         // return alert(
//         //   `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}.`,
//         // );
//         console.log(
//           `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}`,
//         );
//       }
//       const token = await AsyncStorage.getItem('AccessToken');
//       if (!token) throw new Error('Access token is missing.');
//       const state = 'Refrigerator';
//       const key = 'Freezer_Temp';
//       const newState = newTemp;
//       console.log(newTemp, 'newTemp');
//       const response = await switchButton(state, token, id, newState, key);
//       console.log(response.data);
//       setState(prevState => ({
//         ...prevState,
//         Freezer_Temp: newState,
//       }));
//     } catch (err) {
//       console.error(
//         err?.response?.data || err.message,
//         'Error in incrementFreezerTemp',
//       );
//     }
//   };
//   const FunctionRRFreezer_Temp = async (newTemp, action) => {
//     const MIN_VALUE = 1;
//     const MAX_VALUE = 6;
//     try {
//       if (!['increment', 'decrement'].includes(action)) {
//         return alert("Invalid action. Use 'increment' or 'decrement'.");
//       }
//       if (action === 'increment' && newTemp < MAX_VALUE) {
//         if (newTemp === 2) {
//           newTemp += 2;
//         } else {
//           newTemp++;
//         }
//       } else if (action === 'decrement' && newTemp > MIN_VALUE) {
//         if (newTemp === 4) {
//           newTemp -= 2;
//         } else {
//           newTemp--;
//         }
//       } else {
//         // return alert(
//         //   `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}.`,
//         // );
//         console.log(
//           `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}`,
//         );
//       }
//       const token = await AsyncStorage.getItem('AccessToken');
//       if (!token) throw new Error('Access token is missing.');
//       const state = 'Refrigerator';
//       const key = 'Freezer_Temp';
//       const newState = newTemp;
//       console.log(newTemp, 'newTemp');
//       const response = await switchButton(state, token, id, newState, key);
//       console.log(response.data);
//       setState(prevState => ({
//         ...prevState,
//         Freezer_Temp: newState,
//       }));
//     } catch (err) {
//       console.error(
//         err?.response?.data || err.message,
//         'Error in incrementFreezerTemp',
//       );
//     }
//   };

//   const FunctionFridge_Temp = async (newTemp, action) => {
//     const MIN_VALUE = 1;
//     const MAX_VALUE = 6;
//     try {
//       if (!['increment', 'decrement'].includes(action)) {
//         return alert("Invalid action. Use 'increment' or 'decrement'.");
//       }
//       if (action === 'increment' && newTemp < MAX_VALUE) {
//         if (newTemp === 2) {
//           newTemp += 2;
//         } else {
//           newTemp++;
//         }
//       } else if (action === 'decrement' && newTemp > MIN_VALUE) {
//         if (newTemp === 4) {
//           newTemp -= 2;
//         } else {
//           newTemp--;
//         }
//       } else {
//         // return alert(
//         //   `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}.`,
//         // );
//         console.log(
//           `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}`,
//         );
//       }
//       const token = await AsyncStorage.getItem('AccessToken');
//       if (!token) throw new Error('Access token is missing.');
//       const state = 'Refrigerator';
//       const key = 'Fridge_Temp';
//       const newState = newTemp;
//       const response = await switchButton(state, token, id, newState, key);
//       console.log(response.data);
//       setState(prevState => ({
//         ...prevState,
//         Fridge_Temp: newState,
//       }));
//     } catch (err) {
//       console.error(
//         err?.response?.data || err.message,
//         'Error in incrementFreezerTemp',
//       );
//     }
//   };

//   const toggleImage = selectedModeType => {
//     setModeType(selectedModeType);
//     refRBSheet.current.open();
//     setIsActive(!isActive);
//   };

//   useEffect(() => {
//     const RefData = acFeature.find(feature => feature?.alldata?.id === id)
//       ?.alldata.params?.Refrigerator;
//     console.log(RefData, 'RefData');

//     if (RefData) {
//       setState(prev => ({...prev, ...RefData}));
//     } else {
//       console.log('No matching feature or Refrigerator data found');
//     }
//   }, [acFeature, id]);

//   useEffect(() => {
//     const intervalDuration = 1000; // 10 seconds
//     const runDuration = 10000; // 70 seconds

//     const intervalId = setInterval(() => {
//       fetchAll();
//     }, intervalDuration);

//     const timeoutId = setTimeout(() => {
//       clearInterval(intervalId);
//     }, runDuration);

//     return () => {
//       clearInterval(intervalId);
//       clearTimeout(timeoutId);
//     };
//   }, [fetchAll]);

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//       }}>
//       <View style={{flex: 1}}>
//         <ImageBackground
//           source={require('../../assets/RefImage/RefFetcherImage.png')}
//           style={{
//             width: '100%',
//             height: 350,
//             resizeMode: 'contain',
//           }}>
//           <View style={{flexDirection: 'row'}}>
//             <Pressable
//               style={{
//                 height: 50,
//                 width: 50,
//                 borderRadius: 100,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//               onPress={() => navigation.goBack()}>
//               <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
//             </Pressable>

//             <View style={{flex: 1, justifyContent: 'center'}}>
//               <Text
//                 style={{
//                   fontSize: 18,
//                   color: '#FFFFFF',
//                   fontWeight: '500',
//                   justifyContent: 'center',
//                 }}>
//                 {state.Name}
//               </Text>
//             </View>
//           </View>
//           {/* <TabViewRef
//             {...props}
//             name={state.Name}
//             Convertible_Mode={state.Convertible_Mode}
//             Fridge_Temp={state.Fridge_Temp}
//             Freezer_Temp={state.Freezer_Temp}
//             Ref_Mode={state.Ref_Mode}
//             setState={setState}
//             id={id}
//             Child_Lock={state.Child_Lock}
//           /> */}
//           {/* <Text> {state.Ref_Mode=="Regular"?"shubham":"Malviya"}</Text> */}
//           {state.Ref_Mode == 'Regular' ? (
//             <LinearGradient
//               colors={['#4A90E2', '#D76D77']} // Adjust gradient colors as needed
//               style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-around',
//                   alignItems: 'center',
//                   width: '90%',
//                 }}>
//                 {state.Convertible_Mode == 'RR' ? (
//                   <View
//                     style={{justifyContent: 'center', alignItems: 'center'}}>
//                     <TouchableOpacity
//                       onPress={() => {
//                         if (state.Child_Lock) {
//                           alert('Child Lock Enabled');
//                         } else {
//                           if (
//                             state.Convertible_Mode == 'F0' ||
//                             state.Convertible_Mode == 'R0'
//                           ) {
//                             console.log('Freezer_Temp not click');
//                           } else {
//                             FunctionRRFreezer_Temp(
//                               state.Freezer_Temp,
//                               'increment',
//                             );
//                           }
//                         }
//                       }}
//                       style={{
//                         padding: 10,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                       }}>
//                       <Text style={{fontSize: 30, color: 'white'}}>
//                         {state.Freezer_Temp == 6 ? '' : '▲'}
//                       </Text>
//                     </TouchableOpacity>
//                     <View
//                       style={{alignItems: 'center', justifyContent: 'center'}}>
//                       <Text
//                         style={{
//                           fontSize: 25,
//                           color: 'white',
//                           marginVertical: 10,
//                         }}>
//                         {state.Freezer_Temp} °C
//                       </Text>
//                       <Text style={{fontSize: 18, color: 'white'}}>
//                         FREEZER
//                       </Text>
//                     </View>
//                     <TouchableOpacity
//                       onPress={() => {
//                         if (state.Child_Lock) {
//                           alert('Child Lock Enabled');
//                         } else {
//                           if (
//                             state.Convertible_Mode == 'F0' ||
//                             state.Convertible_Mode == 'R0'
//                           ) {
//                             console.log('Freezer_Temp not click');
//                           } else {
//                             FunctionRRFreezer_Temp(
//                               state.Freezer_Temp,
//                               'decrement',
//                             );
//                           }
//                         }
//                       }}
//                       style={{
//                         padding: 10,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                       }}>
//                       <Text style={{fontSize: 30, color: 'white'}}>
//                         {state.Freezer_Temp == 1 ? '' : '▼'}
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 ) : (
//                   <View
//                     style={{justifyContent: 'center', alignItems: 'center'}}>
//                     {state.Freezer_Temp == -22 ? (
//                       <View
//                         style={{
//                           padding: 10,
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           height: 50,
//                           width: 50,
//                         }}>
//                         {/* Empty View for padding when Fridge_Temp is 6 */}
//                       </View>
//                     ) : (
//                       <TouchableOpacity
//                         onPress={() => {
//                           if (state.Child_Lock) {
//                             alert('Child Lock Enabled');
//                           } else {
//                             if (
//                               state.Convertible_Mode == 'F0' ||
//                               state.Convertible_Mode == 'R0'
//                             ) {
//                               console.log('Freezer_Temp not click');
//                             } else {
//                               FunctionFreezer_Temp(
//                                 state.Freezer_Temp,
//                                 'decrement',
//                               );
//                             }
//                           }
//                         }}
//                         style={{
//                           padding: 10,
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                         }}>
//                         <Text style={{fontSize: 30, color: 'white'}}>
//                           {state.Convertible_Mode == 'FR' ||
//                           state.Convertible_Mode == 'RR'
//                             ? '▲'
//                             : ''}
//                         </Text>
//                       </TouchableOpacity>
//                     )}
//                     <View
//                       style={{alignItems: 'center', justifyContent: 'center'}}>
//                       <View
//                         style={{
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                         }}>
//                         <Text
//                           style={{
//                             fontSize: 25,
//                             color: 'white',
//                             marginVertical: 10,
//                           }}>
//                           {state.Freezer_Temp} °C
//                         </Text>
//                         <Text style={{fontSize: 18, color: 'white'}}>
//                           FREEZER
//                         </Text>
//                       </View>
//                     </View>
//                     {state.Freezer_Temp == -16 ? (
//                       <View
//                         style={{
//                           padding: 10,
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           height: 50,
//                           width: 50,
//                         }}>
//                         {/* Empty View for padding when Fridge_Temp is 6 */}
//                       </View>
//                     ) : (
//                       <TouchableOpacity
//                         onPress={() => {
//                           if (state.Child_Lock) {
//                             alert('Child Lock Enabled');
//                           } else {
//                             if (
//                               state.Convertible_Mode == 'F0' ||
//                               state.Convertible_Mode == 'R0'
//                             ) {
//                               console.log('Freezer_Temp not click');
//                             } else {
//                               FunctionFreezer_Temp(
//                                 state.Freezer_Temp,
//                                 'increment',
//                               );
//                             }
//                           }
//                         }}
//                         style={{
//                           paddingHorizontal: 10,
//                           paddingVertical: 10,
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           height: 50,
//                           width: 50,
//                         }}>
//                         <Text style={{fontSize: 30, color: 'white'}}>
//                           {state.Convertible_Mode == 'FR' ||
//                           state.Convertible_Mode == 'RR'
//                             ? '▼'
//                             : ''}
//                         </Text>
//                       </TouchableOpacity>
//                     )}
//                   </View>
//                 )}
//                 {state.Convertible_Mode == 'R0' ||
//                 state.Convertible_Mode == 'F0' ? null : (
//                   <>
//                     <View
//                       style={{
//                         width: 1,
//                         height: '60%',
//                         backgroundColor: 'white',
//                       }}
//                     />

//                     <View
//                       style={{justifyContent: 'center', alignItems: 'center'}}>
//                       {state.Fridge_Temp === 6 ? (
//                         <View
//                           style={{
//                             padding: 10,
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             height: 50,
//                             width: 50,
//                           }}>
//                           {/* Empty View for padding when Fridge_Temp is 6 */}
//                         </View>
//                       ) : (
//                         <TouchableOpacity
//                           onPress={() => {
//                             if (state.Child_Lock) {
//                               alert('Child Lock Enabled');
//                             } else {
//                               FunctionFridge_Temp(
//                                 state.Fridge_Temp,
//                                 'increment',
//                               );
//                             }
//                           }}
//                           style={{
//                             padding: 10,
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                           }}>
//                           <Text style={{fontSize: 30, color: 'white'}}>▲</Text>
//                         </TouchableOpacity>
//                       )}
//                       <View
//                         style={{
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                         }}>
//                         <Text
//                           style={{
//                             fontSize: 25,
//                             color: 'white',
//                             marginVertical: 10,
//                           }}>
//                           {state.Fridge_Temp} °C
//                         </Text>
//                         <Text style={{fontSize: 18, color: 'white'}}>
//                           FRIDGE
//                         </Text>
//                       </View>
//                       {state.Fridge_Temp === 1 ? (
//                         <View
//                           style={{
//                             padding: 10,
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             height: 50,
//                             width: 50,
//                           }}>
//                           {/* Empty View for padding when Fridge_Temp is 6 */}
//                         </View>
//                       ) : (
//                         <TouchableOpacity
//                           onPress={() => {
//                             if (state.Child_Lock) {
//                               alert('Child Lock Enabled');
//                             } else {
//                               FunctionFridge_Temp(
//                                 state.Fridge_Temp,
//                                 'decrement',
//                               );
//                             }
//                           }}
//                           style={{
//                             padding: 10,
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                           }}>
//                           <Text style={{fontSize: 30, color: 'white'}}>▼</Text>
//                         </TouchableOpacity>
//                       )}
//                     </View>
//                   </>
//                 )}
//               </View>
//             </LinearGradient>
//           ) : (
//             ''
//           )}
//         </ImageBackground>
//       </View>
//       <View
//         style={{
//           flex: 1,
//           paddingHorizontal: 20,
//           paddingVertical: 20,
//         }}>
//         {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//           <TouchableOpacity
//           disabled={!!state.ErrorStatus}
//             onPress={() => {
//               if (state.Child_Lock) {
//                 alert('Child Lock Enabled');
//               } else {
//                 if (state.Convertible_Mode == 'FR') {
//                   const selectedModeType = 'MODE';
//                   toggleImage(selectedModeType);
//                 } else {
//                   alert('This Mode only works with FR Convertible Mode');
//                 }
//               }
//             }}>
//             <Image
//               style={{height: 90, width: 80, resizeMode: 'contain'}}
//               source={require('../../assets/RefImage/modeHide.png')}
//             />
//           </TouchableOpacity>

//           <TouchableOpacity
//             // disabled={
//             //   !(
//             //     state.refrigeratorVariant === 2 ||
//             //     state.refrigeratorVariant === 1
//             //   )
//             // }
//             disabled={
//               !!state.ErrorStatus ||
//               !(state.refrigeratorVariant === 2 || state.refrigeratorVariant === 1)
//             }
//             style={{
//               opacity:
//                 state.refrigeratorVariant === 2 ||
//                 state.refrigeratorVariant === 1
//                   ? 1
//                   : 0.5,
//             }}
//             onPress={() => {
//               if (state.Child_Lock) {
//                 alert('Child Lock Enabled');
//               } else {
//                 const selectedModeType = 'CONVERTIBLE MODE';
//                 toggleImage(selectedModeType);
//               }
//             }}>
//             <Image
//               style={{height: 90, width: 80, resizeMode: 'contain'}}
//               source={
//                 require('../../assets/RefImage/cmHide.png')}
//             />
//           </TouchableOpacity>

//           <TouchableOpacity
//             disabled={!!state.ErrorStatus || state.refrigeratorVariant !== 0}
//             style={{
//               opacity: state.ErrorStatus || state.refrigeratorVariant !== 0 ? 0.5 : 1, // Visual feedback for disabled state
//             }}
//             onPress={() => {
//               if (state.Power) {
//                 const selectedModeType = 'Cooling MODE';
//                 toggleImage(selectedModeType);
//               } else {
//                 alert('Washing Machine Power OFF, Turn On And Retry');
//                 return;
//               }
//             }}>
//             <Image
//               style={{
//                 height: 90,
//                 width: 80,
//                 resizeMode: 'contain',

//                 opacity: state.refrigeratorVariant === 0 ? 1 : 0.5, // Visual feedback for disabled state
//               }}
//               source={require('../../assets/RefImage/coolmHide.png')}
//             />
//           </TouchableOpacity>

//           <TouchableOpacity
//           disabled={!!state.ErrorStatus}
//             onPress={() => {
//               if (state.Power) {
//                 const State = 'Refrigerator';
//                 toggleChildLockImage(State, id);
//               } else {
//                 alert('Refrigerator Power OFF, Turn On And Retry');
//                 return;
//               }
//             }}>
//             <Image
//               style={{
//                 height: 90,
//                 width: 80,
//                 resizeMode: 'contain',
//               }}
//               source={
//                 state.Child_Lock
//                   ? require('../../assets/washingmashine/wchildclocks.png')
//                   : require('../../assets/washingmashine/wchildclock.png')
//               }
//             />
//           </TouchableOpacity>
//         </View> */}
//         <View style={{flexDirection: 'row', justifyContent: 'space-between',marginVertical:25}}>
//           {/* MODE */}
//           <TouchableOpacity
//             onPress={() => {
//               if (state.ErrorStatus) {
//                 alert('Please check diagnose');
//               } else if (state.Child_Lock) {
//                 alert('Child Lock Enabled');
//               } else {
//                 if (state.Convertible_Mode === 'FR') {
//                   const selectedModeType = 'MODE';
//                   toggleImage(selectedModeType);
//                 } else {
//                   alert('This Mode only works with FR Convertible Mode');
//                 }
//               }
//             }}>
//             <Image
//               style={{
//                 height: 90,
//                 width: 80,
//                 resizeMode: 'contain',
//                 opacity: state.ErrorStatus ? 0.5 : 1,
//               }}
//               source={require('../../assets/RefImage/modeHide.png')}
//             />
//           </TouchableOpacity>

//           {/* CONVERTIBLE MODE */}
//           <TouchableOpacity
//             onPress={() => {
//               if (state.ErrorStatus) {
//                 alert('Please check diagnose');
//               } else if (
//                 !(
//                   state.refrigeratorVariant === 2 ||
//                   state.refrigeratorVariant === 1
//                 )
//               ) {
//                 alert('Convertible Mode not supported for this variant');
//               } else if (state.Child_Lock) {
//                 alert('Child Lock Enabled');
//               } else {
//                 const selectedModeType = 'CONVERTIBLE MODE';
//                 toggleImage(selectedModeType);
//               }
//             }}>
//             <Image
//               style={{
//                 height: 90,
//                 width: 80,
//                 resizeMode: 'contain',
//                 opacity:
//                   !!state.ErrorStatus ||
//                   !(
//                     state.refrigeratorVariant === 2 ||
//                     state.refrigeratorVariant === 1
//                   )
//                     ? 0.5
//                     : 1,
//               }}
//               source={require('../../assets/RefImage/cmHide.png')}
//             />
//           </TouchableOpacity>

//           {/* COOLING MODE */}
//           <View
//             // onPress={() => {
//             //   if (state.ErrorStatus) {
//             //     alert('Please check diagnose');
//             //   } else if (state.refrigeratorVariant !== 0) {
//             //     alert('Cooling Mode only works with Variant 0');
//             //   } else if (!state.Power) {
//             //     alert('Washing Machine Power OFF, Turn On And Retry');
//             //   } else {
//             //     const selectedModeType = 'Cooling MODE';
//             //     toggleImage(selectedModeType);
//             //   }
//             // }}
//             >
//             <Image
//               style={{
//                 height: 90,
//                 width: 80,
//                 resizeMode: 'contain',
//                 opacity:
//                   !!state.ErrorStatus || state.refrigeratorVariant !== 0
//                     ? 0.5
//                     : 1,
//               }}
//               source={require('../../assets/RefImage/coolmHide.png')}
//             />
//           </View>

//           {/* CHILD LOCK */}
//           <TouchableOpacity
//             onPress={() => {
//               if (state.ErrorStatus) {
//                 alert('Please check diagnose');
//               } else if (!state.Power) {
//                 alert('Refrigerator Power OFF, Turn On And Retry');
//               } else {
//                 const State = 'Refrigerator';
//                 toggleChildLockImage(State, id);
//               }
//             }}>
//             <Image
//               style={{
//                 height: 90,
//                 width: 80,
//                 resizeMode: 'contain',
//                 opacity: state.ErrorStatus ? 0.5 : 1,
//               }}
//               source={
//                 state.Child_Lock
//                   ? require('../../assets/washingmashine/wchildclocks.png')
//                   : require('../../assets/washingmashine/wchildclock.png')
//               }
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//           <RefDigonoseScreen
//             power={state.Power}
//             err_status={state.ErrorStatus}
//             ChildLock={state.Child_Lock}
//             id={id}
//             setState={setState}
//           />

//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate('AcEcoScreen', {
//                 ...props,
//                 id: id,
//                 uname: state.Name,
//                 role: state.role,
//                 key: 'Refrigerator',
//               });
//             }}>
//             <Image
//               style={{
//                 height: 90,
//                 width: 80,
//                 resizeMode: 'contain',
//               }}
//               source={require('../../assets/RefImage/Share.png')}
//             />
//           </TouchableOpacity>
//           <View style={{height: 90, width: 80}} />
//           <View style={{height: 90, width: 80}} />
//         </View>
//       </View>

//       <RBSheet
//         ref={refRBSheet}
//         height={400}
//         onClose={() => {
//           // fetchAll();
//         }}
//         customStyles={{
//           container: {
//             borderTopLeftRadius: 25,
//             borderTopRightRadius: 25,
//           },
//         }}>
//         <RefBottomSheet
//           isClose={isClose}
//           refRBSheet={refRBSheet}
//           id={id}
//           Convertible_Mode={state.Convertible_Mode}
//           Ref_Mode={state.Ref_Mode}
//           modeType={modeType}
//           setState={setState}
//           setClose={setClose}
//           Freezer_Temp={state.Freezer_Temp}
//           Fridge_Temp={state.Fridge_Temp}
//           refrigeratorVariant={state.refrigeratorVariant}
//           coolingLevel={state.coolingLevel}
//           // fetchAll={fetchAll}
//         />
//       </RBSheet>
//     </SafeAreaView>
//   );
// };
// export default RefDeviceScreen;


import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
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
import {UserContext} from '../../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {switchButton} from '../../Context/API';
import RefDigonoseScreen from './RefDigonoseScreen';
import RBSheet from 'react-native-raw-bottom-sheet';
import RefBottomSheet from './RefBottomSheet';
// import TabViewRef from './TabViewRef';
import LinearGradient from 'react-native-linear-gradient';

const RefDeviceScreen = props => {
  const {navigation, route} = props;
  const {id} = route.params;

  const {acFeature, fetchAll} = useContext(UserContext);
  const [isClose, setClose] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [modeType, setModeType] = useState(null);
  const refRBSheet = useRef(null);
  const [state, setState] = useState({
    refresh: false,
    role: '',
    Child_Lock: '',
    Convertible_Mode: '',
    ErrorStatus: '',
    Name: '',
    Power: '',
    Freezer_Temp: '',
    Fridge_Temp: '',
    Ref_Mode: '',
    ResetDevice: '',
    coolingLevel: '',
    refrigeratorVariant: '',
  });
  console.log(state.ErrorStatus, 'state.ErrorStatus.....');

  const toggleChildLockImage = async (State, id) => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      if (!token) throw new Error('Access token is missing.');
      const key = 'Child_Lock';
      const newState = !state.Child_Lock;
      const response = await switchButton(State, token, id, newState, key);
      if (response?.data) {
        console.log(response.data, 'response');
        setState(prevState => ({
          ...prevState,
          Child_Lock: newState,
        }));
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

  const FunctionFreezer_Temp = async (newTemp, action) => {
    const MIN_VALUE = -16;
    const MAX_VALUE = -22;
    try {
      if (!['increment', 'decrement'].includes(action)) {
        return alert("Invalid action. Use 'increment' or 'decrement'.");
      }
      if (action === 'increment' && newTemp < MIN_VALUE) {
        if (newTemp === -20 || newTemp === -22) {
          newTemp += 2;
        } else {
          newTemp++;
        }
      } else if (action === 'decrement' && newTemp > MAX_VALUE) {
        if (newTemp === -18 || newTemp === -20) {
          newTemp -= 2;
        } else {
          newTemp--;
        }
      } else {
        // return alert(
        //   `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}.`,
        // );
        console.log(
          `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}`,
        );
      }
      const token = await AsyncStorage.getItem('AccessToken');
      if (!token) throw new Error('Access token is missing.');
      const state = 'Refrigerator';
      const key = 'Freezer_Temp';
      const newState = newTemp;
      console.log(newTemp, 'newTemp');
      const response = await switchButton(state, token, id, newState, key);
      console.log(response.data);
      setState(prevState => ({
        ...prevState,
        Freezer_Temp: newState,
      }));
    } catch (err) {
      console.error(
        err?.response?.data || err.message,
        'Error in incrementFreezerTemp',
      );
    }
  };
  const FunctionRRFreezer_Temp = async (newTemp, action) => {
    const MIN_VALUE = 1;
    const MAX_VALUE = 6;
    try {
      if (!['increment', 'decrement'].includes(action)) {
        return alert("Invalid action. Use 'increment' or 'decrement'.");
      }
      if (action === 'increment' && newTemp < MAX_VALUE) {
        if (newTemp === 2) {
          newTemp += 2;
        } else {
          newTemp++;
        }
      } else if (action === 'decrement' && newTemp > MIN_VALUE) {
        if (newTemp === 4) {
          newTemp -= 2;
        } else {
          newTemp--;
        }
      } else {
        // return alert(
        //   `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}.`,
        // );
        console.log(
          `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}`,
        );
      }
      const token = await AsyncStorage.getItem('AccessToken');
      if (!token) throw new Error('Access token is missing.');
      const state = 'Refrigerator';
      const key = 'Freezer_Temp';
      const newState = newTemp;
      console.log(newTemp, 'newTemp');
      const response = await switchButton(state, token, id, newState, key);
      console.log(response.data);
      setState(prevState => ({
        ...prevState,
        Freezer_Temp: newState,
      }));
    } catch (err) {
      console.error(
        err?.response?.data || err.message,
        'Error in incrementFreezerTemp',
      );
    }
  };

  const FunctionFridge_Temp = async (newTemp, action) => {
    const MIN_VALUE = 1;
    const MAX_VALUE = 6;
    try {
      if (!['increment', 'decrement'].includes(action)) {
        return alert("Invalid action. Use 'increment' or 'decrement'.");
      }
      if (action === 'increment' && newTemp < MAX_VALUE) {
        if (newTemp === 2) {
          newTemp += 2;
        } else {
          newTemp++;
        }
      } else if (action === 'decrement' && newTemp > MIN_VALUE) {
        if (newTemp === 4) {
          newTemp -= 2;
        } else {
          newTemp--;
        }
      } else {
        // return alert(
        //   `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}.`,
        // );
        console.log(
          `Temperature out of bounds. Valid range: ${MIN_VALUE} to ${MAX_VALUE}`,
        );
      }
      const token = await AsyncStorage.getItem('AccessToken');
      if (!token) throw new Error('Access token is missing.');
      const state = 'Refrigerator';
      const key = 'Fridge_Temp';
      const newState = newTemp;
      const response = await switchButton(state, token, id, newState, key);
      console.log(response.data);
      setState(prevState => ({
        ...prevState,
        Fridge_Temp: newState,
      }));
    } catch (err) {
      console.error(
        err?.response?.data || err.message,
        'Error in incrementFreezerTemp',
      );
    }
  };

  const toggleImage = selectedModeType => {
    setModeType(selectedModeType);
    refRBSheet.current.open();
    setIsActive(!isActive);
  };

  useEffect(() => {
    const RefData = acFeature.find(feature => feature?.alldata?.id === id)
      ?.alldata.params?.Refrigerator;
    console.log(RefData, 'RefData');

    if (RefData) {
      setState(prev => ({...prev, ...RefData}));
    } else {
      console.log('No matching feature or Refrigerator data found');
    }
  }, [acFeature, id]);

  useEffect(() => {
    const intervalDuration = 1000; // 10 seconds
    const runDuration = 10000; // 70 seconds

    const intervalId = setInterval(() => {
      fetchAll();
    }, intervalDuration);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, runDuration);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [fetchAll]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../../assets/RefImage/RefFetcherImage.png')}
          style={{
            width: '100%',
            height: 350,
            resizeMode: 'contain',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={{
                height: 50,
                width: 50,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
            </Pressable>

            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#FFFFFF',
                  fontWeight: '500',
                  justifyContent: 'center',
                }}>
                {state.Name}
              </Text>
            </View>
          </View>
          {/* <TabViewRef
              {...props}
              name={state.Name}
              Convertible_Mode={state.Convertible_Mode}
              Fridge_Temp={state.Fridge_Temp}
              Freezer_Temp={state.Freezer_Temp}
              Ref_Mode={state.Ref_Mode}
              setState={setState}
              id={id}
              Child_Lock={state.Child_Lock}
            /> */}
          {/* <Text> {state.Ref_Mode=="Regular"?"shubham":"Malviya"}</Text> */}
          {state.Ref_Mode == 'Regular' ? (
            <LinearGradient
              colors={['#4A90E2', '#D76D77']} // Adjust gradient colors as needed
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '90%',
                }}>
                {state.Convertible_Mode == 'RR' ? (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => {
                        if (state.Child_Lock) {
                          alert('Child Lock Enabled');
                        } else {
                          if (
                            state.Convertible_Mode == 'F0' ||
                            state.Convertible_Mode == 'R0'
                          ) {
                            console.log('Freezer_Temp not click');
                          } else {
                            FunctionRRFreezer_Temp(
                              state.Freezer_Temp,
                              'increment',
                            );
                          }
                        }
                      }}
                      style={{
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontSize: 30, color: 'white'}}>
                        {state.Freezer_Temp == 6 ? '' : '▲'}
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <Text
                        style={{
                          fontSize: 25,
                          color: 'white',
                          marginVertical: 10,
                        }}>
                        {state.Freezer_Temp} °C
                      </Text>
                      <Text style={{fontSize: 18, color: 'white'}}>
                        FREEZER
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        if (state.Child_Lock) {
                          alert('Child Lock Enabled');
                        } else {
                          if (
                            state.Convertible_Mode == 'F0' ||
                            state.Convertible_Mode == 'R0'
                          ) {
                            console.log('Freezer_Temp not click');
                          } else {
                            FunctionRRFreezer_Temp(
                              state.Freezer_Temp,
                              'decrement',
                            );
                          }
                        }
                      }}
                      style={{
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontSize: 30, color: 'white'}}>
                        {state.Freezer_Temp == 1 ? '' : '▼'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    {state.Freezer_Temp == -22 ? (
                      <View
                        style={{
                          padding: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 50,
                          width: 50,
                        }}>
                        {/* Empty View for padding when Fridge_Temp is 6 */}
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          if (state.Child_Lock) {
                            alert('Child Lock Enabled');
                          } else {
                            if (
                              state.Convertible_Mode == 'F0' ||
                              state.Convertible_Mode == 'R0'
                            ) {
                              console.log('Freezer_Temp not click');
                            } else {
                              FunctionFreezer_Temp(
                                state.Freezer_Temp,
                                'decrement',
                              );
                            }
                          }
                        }}
                        style={{
                          padding: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={{fontSize: 30, color: 'white'}}>
                          {state.Convertible_Mode == 'FR' ||
                          state.Convertible_Mode == 'RR'
                            ? '▲'
                            : ''}
                        </Text>
                      </TouchableOpacity>
                    )}
                    <View
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 25,
                            color: 'white',
                            marginVertical: 10,
                          }}>
                          {state.Freezer_Temp} °C
                        </Text>
                        <Text style={{fontSize: 18, color: 'white'}}>
                          FREEZER
                        </Text>
                      </View>
                    </View>
                    {state.Freezer_Temp == -16 ? (
                      <View
                        style={{
                          padding: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 50,
                          width: 50,
                        }}>
                        {/* Empty View for padding when Fridge_Temp is 6 */}
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          if (state.Child_Lock) {
                            alert('Child Lock Enabled');
                          } else {
                            if (
                              state.Convertible_Mode == 'F0' ||
                              state.Convertible_Mode == 'R0'
                            ) {
                              console.log('Freezer_Temp not click');
                            } else {
                              FunctionFreezer_Temp(
                                state.Freezer_Temp,
                                'increment',
                              );
                            }
                          }
                        }}
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 50,
                          width: 50,
                        }}>
                        <Text style={{fontSize: 30, color: 'white'}}>
                          {state.Convertible_Mode == 'FR' ||
                          state.Convertible_Mode == 'RR'
                            ? '▼'
                            : ''}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                {state.Convertible_Mode == 'R0' ||
                state.Convertible_Mode == 'F0' ? null : (
                  <>
                    <View
                      style={{
                        width: 1,
                        height: '60%',
                        backgroundColor: 'white',
                      }}
                    />

                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      {state.Fridge_Temp === 6 ? (
                        <View
                          style={{
                            padding: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            width: 50,
                          }}>
                          {/* Empty View for padding when Fridge_Temp is 6 */}
                        </View>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            if (state.Child_Lock) {
                              alert('Child Lock Enabled');
                            } else {
                              FunctionFridge_Temp(
                                state.Fridge_Temp,
                                'increment',
                              );
                            }
                          }}
                          style={{
                            padding: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontSize: 30, color: 'white'}}>▲</Text>
                        </TouchableOpacity>
                      )}
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 25,
                            color: 'white',
                            marginVertical: 10,
                          }}>
                          {state.Fridge_Temp} °C
                        </Text>
                        <Text style={{fontSize: 18, color: 'white'}}>
                          FRIDGE
                        </Text>
                      </View>
                      {state.Fridge_Temp === 1 ? (
                        <View
                          style={{
                            padding: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            width: 50,
                          }}>
                          {/* Empty View for padding when Fridge_Temp is 6 */}
                        </View>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            if (state.Child_Lock) {
                              alert('Child Lock Enabled');
                            } else {
                              FunctionFridge_Temp(
                                state.Fridge_Temp,
                                'decrement',
                              );
                            }
                          }}
                          style={{
                            padding: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontSize: 30, color: 'white'}}>▼</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </>
                )}
              </View>
            </LinearGradient>
          ) : (
            ''
          )}
        </ImageBackground>
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
            disabled={!!state.ErrorStatus}
              onPress={() => {
                if (state.Child_Lock) {
                  alert('Child Lock Enabled');
                } else {
                  if (state.Convertible_Mode == 'FR') {
                    const selectedModeType = 'MODE';
                    toggleImage(selectedModeType);
                  } else {
                    alert('This Mode only works with FR Convertible Mode');
                  }
                }
              }}>
              <Image
                style={{height: 90, width: 80, resizeMode: 'contain'}}
                source={require('../../assets/RefImage/modeHide.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              // disabled={
              //   !(
              //     state.refrigeratorVariant === 2 ||
              //     state.refrigeratorVariant === 1
              //   )
              // }
              disabled={
                !!state.ErrorStatus ||
                !(state.refrigeratorVariant === 2 || state.refrigeratorVariant === 1)
              }
              style={{
                opacity:
                  state.refrigeratorVariant === 2 ||
                  state.refrigeratorVariant === 1
                    ? 1
                    : 0.5,
              }}
              onPress={() => {
                if (state.Child_Lock) {
                  alert('Child Lock Enabled');
                } else {
                  const selectedModeType = 'CONVERTIBLE MODE';
                  toggleImage(selectedModeType);
                }
              }}>
              <Image
                style={{height: 90, width: 80, resizeMode: 'contain'}}
                source={
                  require('../../assets/RefImage/cmHide.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!!state.ErrorStatus || state.refrigeratorVariant !== 0}
              style={{
                opacity: state.ErrorStatus || state.refrigeratorVariant !== 0 ? 0.5 : 1, // Visual feedback for disabled state
              }}
              onPress={() => {
                if (state.Power) {
                  const selectedModeType = 'Cooling MODE';
                  toggleImage(selectedModeType);
                } else {
                  alert('Washing Machine Power OFF, Turn On And Retry');
                  return;
                }
              }}>
              <Image
                style={{
                  height: 90,
                  width: 80,
                  resizeMode: 'contain',

                  opacity: state.refrigeratorVariant === 0 ? 1 : 0.5, // Visual feedback for disabled state
                }}
                source={require('../../assets/RefImage/coolmHide.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
            disabled={!!state.ErrorStatus}
              onPress={() => {
                if (state.Power) {
                  const State = 'Refrigerator';
                  toggleChildLockImage(State, id);
                } else {
                  alert('Refrigerator Power OFF, Turn On And Retry');
                  return;
                }
              }}>
              <Image
                style={{
                  height: 90,
                  width: 80,
                  resizeMode: 'contain',
                }}
                source={
                  state.Child_Lock
                    ? require('../../assets/washingmashine/wchildclocks.png')
                    : require('../../assets/washingmashine/wchildclock.png')
                }
              />
            </TouchableOpacity>
          </View> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 50,
          }}>
          {/* MODE */}
          <TouchableOpacity
            onPress={() => {
              if (state.ErrorStatus) {
                alert('Please check diagnose');
              } else if (state.Child_Lock) {
                alert('Child Lock Enabled');
              } else {
                if (state.Convertible_Mode === 'FR') {
                  const selectedModeType = 'MODE';
                  toggleImage(selectedModeType);
                } else {
                  alert('This Mode only works with FR Convertible Mode');
                }
              }
            }}>
            <Image
              style={{
                height: 90,
                width: 80,
                resizeMode: 'contain',
                opacity: state.ErrorStatus ? 0.5 : 1,
              }}
              source={require('../../assets/RefImage/modeHide.png')}
            />
          </TouchableOpacity>

          {/* CONVERTIBLE MODE */}
          <TouchableOpacity
            onPress={() => {
              if (state.ErrorStatus) {
                alert('Please check diagnose');
              } else if (
                !(
                  state.refrigeratorVariant === 2 ||
                  state.refrigeratorVariant === 1
                )
              ) {
                alert('Convertible Mode not supported for this variant');
              } else if (state.Child_Lock) {
                alert('Child Lock Enabled');
              } else {
                const selectedModeType = 'CONVERTIBLE MODE';
                toggleImage(selectedModeType);
              }
            }}>
            <Image
              style={{
                height: 90,
                width: 80,
                resizeMode: 'contain',
                opacity:
                  !!state.ErrorStatus ||
                  !(
                    state.refrigeratorVariant === 2 ||
                    state.refrigeratorVariant === 1
                  )
                    ? 0.5
                    : 1,
              }}
              source={require('../../assets/RefImage/cmHide.png')}
            />
          </TouchableOpacity>

          {/* COOLING MODE */}
          <TouchableOpacity
          // onPress={() => {
          //   if (state.ErrorStatus) {
          //     alert('Please check diagnose');
          //   } else if (state.refrigeratorVariant !== 0) {
          //     alert('Cooling Mode only works with Variant 0');
          //   } else if (!state.Power) {
          //     alert('Washing Machine Power OFF, Turn On And Retry');
          //   } else {
          //     const selectedModeType = 'Cooling MODE';
          //     toggleImage(selectedModeType);
          //   }
          // }}
          >
            <Image
              style={{
                height: 90,
                width: 80,
                resizeMode: 'contain',
                opacity:
                  !!state.ErrorStatus || state.refrigeratorVariant !== 0
                    ? 0.5
                    : 1,
              }}
              source={require('../../assets/RefImage/coolmHide.png')}
            />
          </TouchableOpacity>

          {/* CHILD LOCK */}
          <TouchableOpacity
            onPress={() => {
              if (state.ErrorStatus) {
                alert('Please check diagnose');
              } else if (!state.Power) {
                alert('Refrigerator Power OFF, Turn On And Retry');
              } else {
                const State = 'Refrigerator';
                toggleChildLockImage(State, id);
              }
            }}>
            <Image
              style={{
                height: 90,
                width: 80,
                resizeMode: 'contain',
                opacity: state.ErrorStatus ? 0.5 : 1,
              }}
              source={
                state.Child_Lock
                  ? require('../../assets/washingmashine/wchildclocks.png')
                  : require('../../assets/washingmashine/wchildclock.png')
              }
            />
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <RefDigonoseScreen
            power={state.Power}
            err_status={state.ErrorStatus}
            ChildLock={state.Child_Lock}
            id={id}
            setState={setState}
          />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AcEcoScreen', {
                ...props,
                id: id,
                uname: state.Name,
                role: state.role,
                key: 'Refrigerator',
              });
            }}>
            <Image
              style={{
                height: 90,
                width: 80,
                resizeMode: 'contain',
              }}
              source={require('../../assets/washingmashine/Share.png')}
            />
          </TouchableOpacity>
          <View style={{height: 90, width: 80}} />
          <View style={{height: 90, width: 80}} />
        </View>
      </View>

      <RBSheet
        ref={refRBSheet}
        height={400}
        onClose={() => {
          // fetchAll();
        }}
        customStyles={{
          container: {
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          },
        }}>
        <RefBottomSheet
          isClose={isClose}
          refRBSheet={refRBSheet}
          id={id}
          Convertible_Mode={state.Convertible_Mode}
          Ref_Mode={state.Ref_Mode}
          modeType={modeType}
          setState={setState}
          setClose={setClose}
          Freezer_Temp={state.Freezer_Temp}
          Fridge_Temp={state.Fridge_Temp}
          refrigeratorVariant={state.refrigeratorVariant}
          coolingLevel={state.coolingLevel}
          // fetchAll={fetchAll}
        />
      </RBSheet>
    </SafeAreaView>
  );
};
export default RefDeviceScreen;
