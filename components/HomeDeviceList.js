// // // import {Pressable, View, Text, StyleSheet, Image} from 'react-native';
// // // import React, {
// // //   useState,
// // //   useCallback,
// // //   useMemo,
// // //   useEffect,
// // //   useRef,
// // //   useContext,
// // // } from 'react';
// // // import Model from './Model';

// // // import {featuresContol, switchButton} from '../Context/API';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import {RadialSlider} from 'react-native-radial-slider';
// // // import {AnimatedCircularProgress} from 'react-native-circular-progress';
// // // import LinearGradient from 'react-native-linear-gradient';
// // // import {Circle} from 'react-native-svg';
// // // import {UserContext} from '../Context/UserContext';
// // // const highGrayImg = require('../assets/poweroff.png');
// // // const highBlueImg = require('../assets/powerond.png');

// // // function HomeDeviceList({
// // //   data,
// // //   id,
// // //   device,
// // //   timestamp,
// // //   onLineDevice,
// // //   switchs,
// // //   Type,
// // //   mode,
// // //   temperature,
// // //   timeinhr,
// // //   timeinmin,
// // //   runing,
// // //   timepercent,
// // //   ...props
// // // }) {
// // //   const {navigation} = props;
// // //   console.log(data.item.alldata, '.....propspropspropsprops');

// // //   const isFirstRender = useRef(false);
// // //   const [switchData, setSwitchData] = useState(switchs);
// // //   const [offlineTime, setOfflineTime] = useState(null);

// // //   const [speed, setSpeed] = useState(temperature);
// // //   const [select, setSelected] = useState(Type);

// // //   const [timeInhr, setTimeInhr] = useState(timeinhr);
// // //   const getState = () => {
// // //     if ('AC' in select) return 'AC';
// // //     if ('WM' in select) return 'WM';
// // //     if ('Refrigerator' in select) return 'Refrigerator';
// // //     return 'Unknown';
// // //   };
// // //   const State = getState();

// // //   // Switch'
// // //   const SwitchModeSelected = async (State, id, switchData) => {
// // //     let token = await AsyncStorage.getItem('AccessToken');
// // //     const key = 'Power';
// // //     try {
// // //       let response = await switchButton(State, token, id, !switchData, key);

// // //       setSwitchData(!switchData);
// // //     } catch (err) {
// // //       console.log(err.response.data, 'errerr');
// // //     }
// // //   };

// // //   const handlePress = increment => {
// // //     const newSpeed = speed + increment;
// // //     if (newSpeed >= 16 && newSpeed <= 31) {
// // //       setSpeed(newSpeed);
// // //     }
// // //   };

// // //   const fillValue = timepercent;

// // //   const handleChange = useMemo(
// // //     () =>
// // //       debounce(async newTemperature => {
// // //         if (mode?.toLowerCase() !== 'cool') {
// // //           console.log('Mode is not Cool, no temperature update');
// // //           return;
// // //         }

// // //         let param = 'Temperature';
// // //         let token = await AsyncStorage.getItem('AccessToken');
// // //         featuresContolFunction(token, id, param, newTemperature);

// // //         console.log('Temperature updated to:', newTemperature);
// // //       }, 100),
// // //     [mode, id],
// // //   );
// // //   const featuresContolFunction = async (token, id, param, values) => {
// // //     let key = 'AC';
// // //     try {
// // //       let response = await featuresContol(key, token, id, param, values);
// // //       if (response && response.data) {
// // //         setSpeed(values);
// // //       } else {
// // //         console.log('Response is undefined or does not contain data');
// // //       }
// // //     } catch (err) {
// // //       console.log(err.response.data, 'error');
// // //     }
// // //   };

// // //   // Debounce helper function
// // //   function debounce(func, delay) {
// // //     let timer;
// // //     return function (...args) {
// // //       clearTimeout(timer);
// // //       timer = setTimeout(() => {
// // //         func(...args);
// // //       }, delay);
// // //     };
// // //   }

// // //   // WM API
// // //   useEffect(() => {
// // //     const date = new Date(timestamp);
// // //     const formattedDateTime = new Intl.DateTimeFormat('en-US', {
// // //       year: 'numeric',
// // //       month: '2-digit',
// // //       day: '2-digit',
// // //       hour: 'numeric',
// // //       minute: 'numeric',
// // //       hour12: true,
// // //     }).format(date);

// // //     setOfflineTime(formattedDateTime);
// // //   }, [timestamp]);
// // //   return (
// // //     <View style={styles.mainMargin}>
// // //       {'AC' in select && (
// // //         <Pressable
// // //           onPress={() => {
// // //             if (onLineDevice) {
// // //               if (switchData) {
// // //                 navigation.navigate('AcFeatureScreen', (alldata = {data}));
// // //               } else {
// // //                 alert('Turn ON AC');
// // //               }
// // //             } else {
// // //               console.log('Device is offline');
// // //             }
// // //           }}
// // //           style={styles.mainCardView}>
// // //           <View
// // //             style={{
// // //               flexDirection: 'row',
// // //               alignItems: 'center',
// // //               width: '100%',
// // //               justifyContent: 'space-between',
// // //               // marginStart: 4,
// // //             }}>
// // //             <View>
// // //               <View style={styles.switchLayout}>
// // //                 <Pressable
// // //                   onPress={() => {
// // //                     onLineDevice
// // //                       ? SwitchModeSelected(State, id, switchData)
// // //                       : '';
// // //                   }}>
// // //                   {onLineDevice ? (
// // //                     <Image
// // //                       style={{width: 38, height: 38}}
// // //                       source={switchData ? highBlueImg : highGrayImg}
// // //                     />
// // //                   ) : (
// // //                     <Image
// // //                       style={{width: 38, height: 38}}
// // //                       source={switchData ? highGrayImg : highGrayImg}
// // //                     />
// // //                   )}
// // //                 </Pressable>
// // //                 <View>
// // //                   <Text
// // //                     style={{
// // //                       color: onLineDevice ? '#810055' : '#838383',
// // //                       fontSize: 22,
// // //                       fontWeight: 'bold',
// // //                       marginStart: 32,
// // //                     }}>
// // //                     {onLineDevice && switchData ? `${speed} °C` : ''}
// // //                   </Text>
// // //                 </View>
// // //               </View>

// // //               <View
// // //                 style={{
// // //                   flexDirection: 'row',

// // //                   alignItems: 'center',

// // //                   paddingHorizontal: 8,
// // //                   marginHorizontal: 5,
// // //                 }}>
// // //                 <Text
// // //                   style={{
// // //                     fontSize: 14,

// // //                     color: onLineDevice ? '#525151' : '#333333',
// // //                   }}>
// // //                   {device}
// // //                 </Text>

// // //                 <View>
// // //                   <Model State={State} id={id} onLineDevice={onLineDevice} />
// // //                 </View>
// // //               </View>

// // //               <View>
// // //                 <View style={{marginStart: 8, marginVertical: 4}}>
// // //                   <Image
// // //                     style={styles.image}
// // //                     source={require('../assets/acimg.png')}
// // //                   />
// // //                 </View>
// // //               </View>

// // //               <View
// // //                 style={{
// // //                   flexDirection: 'row',

// // //                   alignItems: 'center',

// // //                   // paddingHorizontal: 3,
// // //                   marginHorizontal: 10,
// // //                 }}>
// // //                 <Text
// // //                   style={{
// // //                     fontSize: 14,
// // //                     fontStyle: 'normal',
// // //                     fontWeight: 'bold',
// // //                     color: onLineDevice ? '#454545' : '#838383',
                   
// // //                   }}
// // //                   numberOfLines={2}>
// // //                   {/* {onLineDevice ? 'online' : 'Offline'} */}
// // //                   {onLineDevice ? (switchData ? 'Online' : '') : 'Offline '}
// // //                 </Text>
// // //                 {onLineDevice ? (
// // //                   ''
// // //                 ) : (
// // //                   <View style={{}}>
// // //                     <Text
// // //                       style={{
// // //                         fontSize: 14,
// // //                         fontStyle: 'normal',
// // //                         color: '#838383',
// // //                         width: '100%',
// // //                         // marginRight: 10,
// // //                       }}>
// // //                       {/* Approx END Time is 1 hr 45 mins */}
// // //                       {`${offlineTime}`}
// // //                     </Text>
// // //                   </View>
// // //                 )}
// // //               </View>
// // //             </View>

// // //             <View style={{alignItems: 'center', justifyContent: 'center'}}>
// // //               <Image
// // //                 style={{
// // //                   position: 'absolute',
// // //                   width: '90%',
// // //                   height: 190,
// // //                   resizeMode: 'contain',
// // //                   marginHorizontal: 30,
// // //                 }}
// // //                 source={require('../assets/SliderPng.png')}
// // //               />

// // //               <RadialSlider
// // //                 value={speed}
// // //                 min={16}
// // //                 max={31}
// // //                 onChange={handleChange}
// // //                 radius={78}
// // //                 unit="°C"
// // //                 thumbRadius={12}
// // //                 thumbColor={onLineDevice ? '#2E73D3' : '#E5E5E5'}
// // //                 thumbBorderWidth={2}
// // //                 thumbBorderColor="#fff"
// // //                 markerLineSize={60}
// // //                 sliderWidth={14}
// // //                 sliderTrackColor="#E5E5E5"
// // //                 lineColor="#E5E5E5"
// // //                 lineSpace={16}
// // //                 linearGradient={[
// // //                   {offset: '0%', color: '#4D98FF'},
// // //                   {offset: '25%', color: '#6DB149'},
// // //                   {offset: '55%', color: '#FBA905'},
// // //                   {offset: '100%', color: '#ff0000'},
// // //                 ]}
// // //                 subTitle=""
// // //                 isHideSubtitle
// // //                 isHideButtons
// // //                 isHideLines
// // //                 isHideValue
// // //                 isHideTailText
// // //                 isHideSlider={
// // //                   onLineDevice && switchData && mode?.toLowerCase() === 'cool'
// // //                     ? false
// // //                     : true
// // //                 }
// // //               />
// // //             </View>
// // //           </View>
// // //         </Pressable>
// // //       )}

// // //       {'WM' in select && (
// // //         <Pressable
// // //           onPress={() => {
// // //             if (onLineDevice) {
// // //               if (switchData) {
// // //                 navigation.navigate('WMDeviceScreen', {alldata: data, id: id});
// // //               } else {
// // //                 alert('Turn on a washing machine');
// // //               }
// // //             } else {
// // //               console.log('Device is offline');
// // //             }
// // //           }}
// // //           style={{
// // //             height: 190,
// // //             backgroundColor: '#ffff',
// // //             borderRadius: 15,
// // //             shadowColor: 'gray',
// // //             shadowOffset: {width: 0, height: 0},
// // //             shadowOpacity: 1,
// // //             shadowRadius: 8,
// // //             elevation: 8,
// // //             flexDirection: 'row',
// // //             width: '100%',
// // //             alignContent: 'space-between',
// // //             justifyContent: 'space-between',
// // //             alignItems: 'center',
// // //             paddingVertical: 10,
// // //             paddingHorizontal: 10,
// // //           }}>
// // //           <View
// // //             style={{
// // //               flexDirection: 'row',
// // //               width: '50%',
// // //             }}>
// // //             <View>
// // //               <View style={styles.switchLayout}>
// // //                 <Pressable
// // //                   onPress={() => {
// // //                     SwitchModeSelected(State, id, switchData);
// // //                   }}>
// // //                   {onLineDevice ? (
// // //                     <Image
// // //                       style={{width: 38, height: 38}}
// // //                       source={switchData ? highBlueImg : highGrayImg}
// // //                     />
// // //                   ) : (
// // //                     <Image
// // //                       style={{width: 38, height: 38}}
// // //                       source={switchData ? highGrayImg : highGrayImg}
// // //                     />
// // //                   )}
// // //                 </Pressable>
// // //               </View>
// // //               <View
// // //                 style={{
// // //                   flexDirection: 'row',
// // //                   paddingHorizontal: 10,
// // //                   width: 110,
// // //                 }}>
// // //                 <Text
// // //                   style={{
// // //                     fontSize: 14,
// // //                     color: onLineDevice ? '#525151' : '#838383',
// // //                   }}
// // //                   numberOfLines={2}>
// // //                   {device}
// // //                 </Text>
// // //                 <View>
// // //                   <Model State={State} id={id} onLineDevice={onLineDevice} />
// // //                 </View>
// // //               </View>
// // //               <View style={{flexDirection: 'row', width: '70%'}}>
// // //                 <View style={{marginStart: 8, marginVertical: 4}}>
// // //                   <Image
// // //                     style={{
// // //                       width: 50,
// // //                       height: 100,
// // //                       resizeMode: 'contain',
// // //                     }}
// // //                     source={require('../assets/washingmashine/wmashine.png')}
// // //                   />
// // //                 </View>
// // //                 <View
// // //                   style={{
// // //                     flexDirection: 'column',
// // //                     justifyContent: 'flex-end',
// // //                     marginBottom: 10,
// // //                     paddingHorizontal: 10,
// // //                   }}>
// // //                   <View style={{}}>
// // //                     <Text
// // //                       style={{
// // //                         fontSize: 14,
// // //                         fontStyle: 'normal',
// // //                         fontWeight: 'bold',
// // //                         color: onLineDevice ? '#454545' : '#838383',
// // //                       }}>
// // //                       {onLineDevice
// // //                         ? runing
// // //                           ? 'Cycle Runing'
// // //                           : onLineDevice
// // //                           ? 'Online'
// // //                           : ''
// // //                         : 'Offline at'}
// // //                     </Text>
// // //                   </View>
// // //                   {onLineDevice ? (
// // //                     ''
// // //                   ) : (
// // //                     <View style={{}}>
// // //                       <Text
// // //                         style={{
// // //                           fontSize: 13,
// // //                           fontStyle: 'normal',
// // //                           color: '#838383',
// // //                           width: '100%',
// // //                           marginRight: 10,
// // //                         }}>
// // //                         {`${offlineTime}`}
// // //                       </Text>
// // //                     </View>
// // //                   )}
// // //                 </View>
// // //               </View>
// // //             </View>
// // //           </View>
// // //           {/* <View
// // //             style={{
// // //               backgroundColor: '#95C34A',
// // //               height: 150,
// // //               width: 150,
// // //               alignItems: 'center',
// // //               justifyContent: 'center',
// // //               borderRadius: 100,
// // //             }}> */}
// // //           {/* <View
// // //             style={{
// // //               backgroundColor: '#4D98FF',
// // //               height: 145,
// // //               width: 130,
// // //               alignItems: 'center',
// // //               justifyContent: 'center',
// // //               borderRadius: 80,
// // //               marginEnd: 10,
// // //             }}>
// // //             <CountdownCircleTimer
// // //               isPlaying
// // //               duration={timepercent}
// // //               size={150}
// // //               rotation="counterclockwise"
// // //               strokeLinecap="square"
// // //               isGrowing={false}
// // //               isSmoothColorTransition={true}
// // //               colors={['#333333']}
// // //               strokeWidth={12}
// // //               trailColor="#8BBD54"
// // //               renderArcs={({remainingTime}) => {
// // //                 const [color, fraction] = getColorSettings(
// // //                   remainingTime,
// // //                   duration,
// // //                 );
// // //                 const radius = 45; // Radius as percentage of the size
// // //                 const circumference = 2 * Math.PI * radius;
// // //                 const dashOffset = circumference * (1 - fraction);
// // //               }}>
// // //               {({remainingTime}) => {
// // //                 return (
// // //                   <View style={styles.timerContent}>
// // //                     <Text style={styles.remainingTimeText}>   {timeinhr} : {timeinmin}</Text>
// // //                     <Text style={styles.hourMinuteText}>
// // //                       Hrs    Min
// // //                     </Text>
// // //                   </View>
// // //                 );
// // //               }}
// // //             </CountdownCircleTimer>
         
// // //           </View> */}
// // //           <View
// // //             style={{
// // //               alignItems: 'center',
// // //               justifyContent: 'center',
// // //               backgroundColor: onLineDevice ? '#4D98FF' : '#999C9F',
// // //               borderRadius: 100,
// // //             }}>
// // //             <AnimatedCircularProgress
// // //               size={155}
// // //               width={9}
// // //               fill={fillValue}
// // //               tintColor={onLineDevice ? '#525968' : '#525968'}
// // //               backgroundColor={onLineDevice ? '#8BBD54' : '#525968'}
// // //             />
// // //             <View
// // //               style={{
// // //                 position: 'absolute',
// // //                 alignItems: 'center',
// // //                 justifyContent: 'center',
// // //               }}>
// // //               <Text
// // //                 style={{
// // //                   fontSize: 28,
// // //                   color: '#fff',
// // //                   fontWeight: '700',
// // //                 }}>
// // //                 {onLineDevice ? `${timeinhr}:${timeinmin}` : '00:00'}
// // //               </Text>
// // //               <Text
// // //                 style={{
// // //                   fontSize: 14,
// // //                   color: '#fff',
// // //                   marginTop: 5,
// // //                   fontWeight: '500',
// // //                 }}>
// // //                 Hrs Min
// // //               </Text>
// // //             </View>
// // //           </View>
// // //         </Pressable>
// // //         // </LinearGradient>
// // //       )}
// // //       {'Refrigerator' in select && (
// // //         <Pressable
// // //           onPress={() => {
// // //             if (onLineDevice) {
// // //               if (switchData) {
// // //                 navigation.navigate('RefDeviceScreen', {alldata: data, id: id});
// // //               } else {
// // //                 alert('Turn ON AC');
// // //               }
// // //             } else {
// // //               console.log('Device is offline');
// // //             }
// // //           }}
// // //           style={styles.mainCardView}>
// // //           {/* <View> */}
// // //           <View
// // //             style={{
// // //               flexDirection: 'row',
// // //               alignItems: 'center',
// // //               paddingHorizontal: 10,
// // //               paddingVertical: 10,
// // //               borderRadius: 10,
// // //             }}>
// // //             <Text
// // //               style={{
// // //                 fontSize: 13,
// // //                 color: onLineDevice ? '#525151' : '#333333',
// // //               }}>
// // //               {device}
// // //             </Text>

// // //             <View>
// // //               <Model State={State} id={id} onLineDevice={onLineDevice} />
// // //             </View>
// // //           </View>

// // //           <View
// // //             style={{
// // //               flexDirection: 'row',
// // //               justifyContent: 'space-between',
// // //               alignItems: 'center',
// // //               // backgroundColor:'blue'
// // //             }}>
// // //             <View style={{}}>
// // //               <Image
// // //                 style={{
// // //                   width: 60,
// // //                   height: 100,
// // //                   resizeMode: 'contain',
// // //                 }}
// // //                 source={require('../assets/RefImage/RefImage.png')}
// // //               />
// // //             </View>
// // //             <View
// // //               style={{
// // //                 paddingHorizontal: 10,
// // //                 paddingVertical: 10,
// // //               }}>
// // //               <View
// // //                 style={{
// // //                   flexDirection: 'row',
// // //                   alignItems: 'center',
// // //                   justifyContent: 'space-between',
// // //                   // paddingHorizontal:10,paddingVertical:10,
// // //                 }}>
// // //                 <View style={{marginRight: 20}}>
// // //                   <Text style={{color: '#333333', fontSize: 16}}>Fridge</Text>
// // //                 </View>

// // //                 <Text
// // //                   style={{
// // //                     color: '#4D98FF',
// // //                     fontSize: 20,
// // //                     fontWeight: 'bold',
// // //                   }}>
// // //                   {runing} °C
// // //                 </Text>
// // //               </View>
// // //               <View
// // //                 style={{
// // //                   height: 0.5,
// // //                   backgroundColor: '#d4d4d4',
// // //                   // marginStart: 14,
// // //                   marginEnd: 14,
// // //                   marginTop: 14,
// // //                   marginBottom: 14,
// // //                 }}
// // //               />
// // //               <View
// // //                 style={{
// // //                   flexDirection: 'row',
// // //                   alignItems: 'center',
// // //                   justifyContent: 'space-between',
// // //                 }}>
// // //                 <View>
// // //                   <Text style={{color: '#333333', fontSize: 16}}>Freezer</Text>
// // //                 </View>
// // //                 <View>
// // //                   <Text
// // //                     style={{
// // //                       color: '#4D98FF',
// // //                       fontSize: 20,
// // //                       fontWeight: 'bold',
// // //                     }}>
// // //                     {temperature} °C
// // //                   </Text>
// // //                 </View>
// // //               </View>
// // //             </View>
// // //           </View>

// // //           <View
// // //             style={{
// // //               flexDirection: 'row',
// // //               alignItems: 'center',
// // //               paddingHorizontal: 10,
// // //               paddingVertical: 10,
// // //               borderRadius: 10,
// // //             }}>
// // //             <Text
// // //               style={{
// // //                 fontSize: 12,
// // //                 fontStyle: 'normal',
// // //                 fontWeight: 'bold',
// // //                 color: onLineDevice ? '#454545' : '#838383',
// // //               }}
// // //               numberOfLines={2}>
// // //               {/* {onLineDevice ? 'online' : 'Offline'} */}
// // //               {onLineDevice ? (switchData ? 'Online' : '') : 'Offline '}
// // //             </Text>
// // //             {onLineDevice ? (
// // //               ''
// // //             ) : (
// // //               <View style={{}}>
// // //                 <Text
// // //                   style={{
// // //                     fontSize: 13,
// // //                     fontStyle: 'normal',
// // //                     color: '#838383',
// // //                     width: '100%',
// // //                     marginRight: 10,
// // //                   }}>
// // //                   {/* Approx END Time is 1 hr 45 mins */}
// // //                   {`${offlineTime}`}
// // //                 </Text>
// // //               </View>
// // //             )}
// // //           </View>
// // //           {/* </View> */}
// // //         </Pressable>
// // //       )}
// // //     </View>
// // //   );
// // // }

// // // export default HomeDeviceList;

// // // const styles = StyleSheet.create({
// // //   mainCardView: {
// // //     height: 190,

// // //     backgroundColor: '#ffff',

// // //     borderRadius: 15,
// // //     shadowColor: 'gray',

// // //     shadowOffset: {width: 0, height: 0},

// // //     shadowOpacity: 1,

// // //     shadowRadius: 8,

// // //     elevation: 8,
// // //   },

// // //   mainCardW: {
// // //     height: 190,
// // //     // backgroundColor: '#E8E8E8',
// // //     // borderRadius: 15,
// // //     // shadowColor: 'gray',
// // //     // shadowOffset: {width: 0, height: 0},
// // //     // shadowOpacity: 1,
// // //     // shadowRadius: 8,
// // //     // elevation: 8,
// // //     flexDirection: 'row',
// // //     width: '100%',
// // //     alignContent: 'space-between',
// // //     justifyContent: 'space-between',
// // //     alignItems: 'center',
// // //     paddingVertical: 10,
// // //     paddingHorizontal: 10,
// // //   },

// // //   image: {
// // //     width: 120,

// // //     height: 50,

// // //     resizeMode: 'contain',
// // //   },

// // //   switchLayout: {
// // //     alignItems: 'center',

// // //     flexDirection: 'row',

// // //     justifyContent: 'space-between',

// // //     paddingVertical: 10,

// // //     marginStart: 10,
// // //   },

// // //   textLay: {
// // //     fontSize: 11,

// // //     color: '#454545',
// // //   },

// // //   mainMargin: {
// // //     flex: 1,
// // //     zIndex: 0,
// // //     paddingHorizontal: 10,
// // //     position: 'relative',
// // //     paddingVertical: 10,
// // //   },

// // //   centerItem: {
// // //     alignItems: 'center',

// // //     marginTop: 0,

// // //     marginBottom: 0,
// // //   },

// // //   container: {
// // //     fontSize: 13,

// // //     color: '#454545',
// // //   },
// // //   timerContent: {
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },
// // //   remainingTimeText: {
// // //     fontSize: 18,
// // //     fontWeight: 'bold',
// // //     color: '#fff',
// // //   },
// // //   hourMinuteText: {
// // //     fontSize: 10,
// // //     // marginTop: 8,
// // //     color: '#fff',
// // //   },
// // // });


// // import {
// //   Pressable,
// //   View,
// //   Text,
// //   StyleSheet,
// //   Image,
// //   ScrollView,
// // } from 'react-native';
// // import React, {
// //   useState,
// //   useCallback,
// //   useMemo,
// //   useEffect,
// //   useRef,
// //   useContext,
// // } from 'react';
// // import Model from './Model';

// // import {featuresContol, switchButton} from '../Context/API';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import {RadialSlider} from 'react-native-radial-slider';
// // import {AnimatedCircularProgress} from 'react-native-circular-progress';
// // import LinearGradient from 'react-native-linear-gradient';
// // import {GEGBodyCopy, GEGBold} from '../comman-compnent/FontFamily';
// // const highGrayImg = require('../assets/poweroff.png');
// // const highBlueImg = require('../assets/powerond.png');

// // function HomeDeviceList({
// //   data,
// //   id,
// //   device,
// //   timestamp,
// //   onLineDevice,
// //   switchs,
// //   Type,
// //   mode,
// //   temperature,
// //   timeinhr,
// //   timeinmin,
// //   runing,
// //   timepercent,
// //   ...props
// // }) {
// //   const {navigation} = props;
// //   console.log(
// //     onLineDevice,
// //     '....onLineDeviceonLineDeviceonLineDeviceonLineDevice',
// //   );

// //   console.log(data.item.alldata, '.....propspropspropsprops');

// //   const isFirstRender = useRef(false);
// //   const [switchData, setSwitchData] = useState(switchs);
// //   const [offlineTime, setOfflineTime] = useState(null);

// //   const [speed, setSpeed] = useState(temperature);
// //   const [select, setSelected] = useState(Type);
// //   const refMode = data?.item?.alldata?.params?.Refrigerator?.Ref_Mode;
// //   const convertMode =
// //     data?.item?.alldata?.params?.Refrigerator?.Convertible_Mode;
// //   console.log(data, '........refModerefMode');

// //   const refModeLower = refMode?.toLowerCase() || '';
// //   const isSpecialMode =
// //     refModeLower === 'intelligent' ||
// //     refModeLower === 'eco' ||
// //     refModeLower === 'quick chill';

// //   const [timeInhr, setTimeInhr] = useState(timeinhr);
// //   const getState = () => {
// //     if ('AC' in select) return 'AC';
// //     if ('WM' in select) return 'WM';
// //     if ('Refrigerator' in select) return 'Refrigerator';
// //     return 'Unknown';
// //   };
// //   const State = getState();

// //   // Switch'
// //   const SwitchModeSelected = async (State, id, switchData) => {
// //     let token = await AsyncStorage.getItem('AccessToken');
// //     const key = 'Power';
// //     try {
// //       let response = await switchButton(State, token, id, !switchData, key);

// //       setSwitchData(!switchData);
// //     } catch (err) {
// //       console.log(err.response.data, 'errerr');
// //     }
// //   };

// //   const handlePress = increment => {
// //     const newSpeed = speed + increment;
// //     if (newSpeed >= 16 && newSpeed <= 31) {
// //       setSpeed(newSpeed);
// //     }
// //   };

// //   const fillValue = timepercent;

// //   const handleChange = useMemo(
// //     () =>
// //       debounce(async newTemperature => {
// //         if (mode?.toLowerCase() !== 'cool') {
// //           console.log('Mode is not Cool, no temperature update');
// //           return;
// //         }

// //         let param = 'Temperature';
// //         let token = await AsyncStorage.getItem('AccessToken');
// //         featuresContolFunction(token, id, param, newTemperature);

// //         console.log('Temperature updated to:', newTemperature);
// //       }, 100),
// //     [mode, id],
// //   );
// //   const featuresContolFunction = async (token, id, param, values) => {
// //     let key = 'AC';
// //     try {
// //       let response = await featuresContol(key, token, id, param, values);
// //       if (response && response.data) {
// //         setSpeed(values);
// //       } else {
// //         console.log('Response is undefined or does not contain data');
// //       }
// //     } catch (err) {
// //       console.log(err.response.data, 'error');
// //     }
// //   };

// //   // Debounce helper function
// //   function debounce(func, delay) {
// //     let timer;
// //     return function (...args) {
// //       clearTimeout(timer);
// //       timer = setTimeout(() => {
// //         func(...args);
// //       }, delay);
// //     };
// //   }

// //   // WM API
// //   useEffect(() => {
// //     const date = new Date(timestamp);
// //     const formattedDateTime = new Intl.DateTimeFormat('en-US', {
// //       year: 'numeric',
// //       month: '2-digit',
// //       day: '2-digit',
// //       hour: 'numeric',
// //       minute: 'numeric',
// //       hour12: true,
// //     }).format(date);

// //     setOfflineTime(formattedDateTime);
// //   }, [timestamp]);
// //   return (
// //     // <ScrollView style={{flex: 1}}>
// //       <View style={styles.mainMargin}>
// //         {'AC' in select && (
// //           <Pressable
// //             onPress={() => {
// //               if (onLineDevice) {
// //                 if (switchData) {
// //                   navigation.navigate('AcFeatureScreen', (alldata = {data}));
// //                 } else {
// //                   alert('Turn ON AC');
// //                 }
// //               } else {
// //                 console.log('Device is offline');
// //               }
// //             }}
// //             style={styles.mainCardView}>
// //             <View
// //               style={{
// //                 flexDirection: 'row',
// //                 alignItems: 'center',
// //                 width: '100%',
// //                 justifyContent: 'space-between',
// //                 marginStart: 4,
// //               }}>
// //               <View>
// //                 <View style={styles.switchLayout}>
// //                   <Pressable
// //                     onPress={() => {
// //                       onLineDevice
// //                         ? SwitchModeSelected(State, id, switchData)
// //                         : '';
// //                     }}>
// //                     {onLineDevice ? (
// //                       <Image
// //                         style={{width: 38, height: 38}}
// //                         source={switchData ? highBlueImg : highGrayImg}
// //                       />
// //                     ) : (
// //                       <Image
// //                         style={{width: 38, height: 38}}
// //                         source={switchData ? highGrayImg : highGrayImg}
// //                       />
// //                     )}
// //                   </Pressable>
// //                   <View>
// //                     <Text
// //                       style={{
// //                         color: onLineDevice ? '#810055' : '#838383',
// //                         fontSize: 22,
// //                         fontWeight: 'bold',
// //                         marginStart: 32,
// //                       }}>
// //                       {onLineDevice && switchData ? `${speed} °C` : ''}
// //                     </Text>
// //                   </View>
// //                 </View>

// //                 <View
// //                   style={{
// //                     flexDirection: 'row',

// //                     alignItems: 'center',

// //                     paddingHorizontal: 8,
// //                     marginHorizontal: 5,
// //                   }}>
// //                   <Text
// //                     style={{
// //                       fontSize: 14,

// //                       color: onLineDevice ? '#525151' : '#333333',
// //                     }}>
// //                     {device}
// //                   </Text>

// //                   <View>
// //                     <Model State={State} id={id} onLineDevice={onLineDevice} />
// //                   </View>
// //                 </View>

// //                 <View>
// //                   <View style={{marginStart: 8, marginVertical: 4}}>
// //                     <Image
// //                       style={styles.image}
// //                       source={require('../assets/acimg.png')}
// //                     />
// //                   </View>
// //                 </View>

// //                 <View
// //                   style={{
// //                     flexDirection: 'row',

// //                     alignItems: 'center',

// //                     paddingHorizontal: 0,
// //                   }}>
// //                   <Text
// //                     style={{
// //                       fontSize: 14,
// //                       fontStyle: 'normal',
// //                       fontWeight: 'bold',
// //                       color: onLineDevice ? '#454545' : '#838383',
// //                       marginHorizontal: 0,
// //                     }}
// //                     numberOfLines={2}>
// //                     {/* {onLineDevice ? 'online' : 'Offline'} */}
// //                     {onLineDevice ? (switchData ? 'Online' : '') : 'Offline '}
// //                   </Text>
// //                   {onLineDevice ? (
// //                     ''
// //                   ) : (
// //                     <View style={{}}>
// //                       <Text
// //                         style={{
// //                           fontSize: 14,
// //                           fontStyle: 'normal',
// //                           color: '#838383',
// //                           width: '100%',
// //                         }}>
// //                         {/* Approx END Time is 1 hr 45 mins */}
// //                         {`${offlineTime}`}
// //                       </Text>
// //                     </View>
// //                   )}
// //                 </View>
// //               </View>

// //               <View style={{alignItems: 'center', justifyContent: 'center'}}>
// //                 <Image
// //                   style={{
// //                     position: 'absolute',
// //                     width: '90%',
// //                     height: 190,
// //                     resizeMode: 'contain',
// //                     marginHorizontal: 30,
// //                   }}
// //                   source={require('../assets/SliderPng.png')}
// //                 />

// //                 <RadialSlider
// //                   value={speed}
// //                   min={16}
// //                   max={31}
// //                   onChange={handleChange}
// //                   radius={78}
// //                   unit="°C"
// //                   thumbRadius={12}
// //                   thumbColor={onLineDevice ? '#2E73D3' : '#E5E5E5'}
// //                   thumbBorderWidth={2}
// //                   thumbBorderColor="#fff"
// //                   markerLineSize={60}
// //                   sliderWidth={14}
// //                   sliderTrackColor="#E5E5E5"
// //                   lineColor="#E5E5E5"
// //                   lineSpace={16}
// //                   linearGradient={[
// //                     {offset: '0%', color: '#4D98FF'},
// //                     {offset: '25%', color: '#6DB149'},
// //                     {offset: '55%', color: '#FBA905'},
// //                     {offset: '100%', color: '#ff0000'},
// //                   ]}
// //                   subTitle=""
// //                   isHideSubtitle
// //                   isHideButtons
// //                   isHideLines
// //                   isHideValue
// //                   isHideTailText
// //                   isHideSlider={
// //                     onLineDevice && switchData && mode?.toLowerCase() === 'cool'
// //                       ? false
// //                       : true
// //                   }
// //                 />
// //               </View>
// //             </View>
// //           </Pressable>
// //         )}

// //         {'WM' in select && (
// //           <Pressable
// //             onPress={() => {
// //               if (onLineDevice) {
// //                 if (switchData) {
// //                   navigation.navigate('WMDeviceScreen', {
// //                     alldata: data,
// //                     id: id,
// //                   });
// //                 } else {
// //                   alert('Turn on a washing machine');
// //                 }
// //               } else {
// //                 console.log('Device is offline');
// //               }
// //             }}
// //             style={{
// //               height: 190,
// //               backgroundColor: '#ffff',
// //               borderRadius: 15,
// //               shadowColor: 'gray',
// //               shadowOffset: {width: 0, height: 0},
// //               shadowOpacity: 1,
// //               shadowRadius: 8,
// //               elevation: 8,
// //               flexDirection: 'row',
// //               width: '100%',
// //               alignContent: 'space-between',
// //               justifyContent: 'space-between',
// //               alignItems: 'center',
// //               paddingVertical: 10,
// //               paddingHorizontal: 10,
// //             }}>
// //             <View
// //               style={{
// //                 flexDirection: 'row',
// //                 width: '50%',
// //               }}>
// //               <View>
// //                 <View style={styles.switchLayout}>
// //                   <Pressable
// //                     onPress={() => {
// //                       SwitchModeSelected(State, id, switchData);
// //                     }}>
// //                     {onLineDevice ? (
// //                       <Image
// //                         style={{width: 38, height: 38}}
// //                         source={switchData ? highBlueImg : highGrayImg}
// //                       />
// //                     ) : (
// //                       <Image
// //                         style={{width: 38, height: 38}}
// //                         source={switchData ? highGrayImg : highGrayImg}
// //                       />
// //                     )}
// //                   </Pressable>
// //                 </View>
// //                 <View
// //                   style={{
// //                     flexDirection: 'row',
// //                     paddingHorizontal: 10,
// //                     width: 110,
// //                   }}>
// //                   <Text
// //                     style={{
// //                       fontSize: 14,
// //                       color: onLineDevice ? '#525151' : '#838383',
// //                     }}
// //                     numberOfLines={2}>
// //                     {device}
// //                   </Text>
// //                   <View>
// //                     <Model State={State} id={id} onLineDevice={onLineDevice} />
// //                   </View>
// //                 </View>
// //                 <View style={{flexDirection: 'row', width: '70%'}}>
// //                   <View style={{marginStart: 8, marginVertical: 4}}>
// //                     <Image
// //                       style={{
// //                         width: 50,
// //                         height: 100,
// //                         resizeMode: 'contain',
// //                       }}
// //                       source={require('../assets/washingmashine/wmashine.png')}
// //                     />
// //                   </View>
// //                   <View
// //                     style={{
// //                       flexDirection: 'column',
// //                       justifyContent: 'flex-end',
// //                       marginBottom: 10,
// //                       paddingHorizontal: 10,
// //                     }}>
// //                     <View style={{}}>
// //                       <Text
// //                         style={{
// //                           fontSize: 14,
// //                           fontStyle: 'normal',
// //                           fontWeight: 'bold',
// //                           color: onLineDevice ? '#454545' : '#838383',
// //                         }}>
// //                         {onLineDevice
// //                           ? runing
// //                             ? 'Cycle Runing'
// //                             : onLineDevice
// //                             ? 'Online'
// //                             : ''
// //                           : 'Offline at'}
// //                       </Text>
// //                     </View>
// //                     {onLineDevice ? (
// //                       ''
// //                     ) : (
// //                       <View style={{}}>
// //                         <Text
// //                           style={{
// //                             fontSize: 13,
// //                             fontStyle: 'normal',
// //                             color: '#838383',
// //                             width: '100%',
// //                             marginRight: 10,
// //                           }}>
// //                           {`${offlineTime}`}
// //                         </Text>
// //                       </View>
// //                     )}
// //                   </View>
// //                 </View>
// //               </View>
// //             </View>
// //             {/* <View
// //             style={{
// //               backgroundColor: '#95C34A',
// //               height: 150,
// //               width: 150,
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //               borderRadius: 100,
// //             }}> */}
// //             {/* <View
// //             style={{
// //               backgroundColor: '#4D98FF',
// //               height: 145,
// //               width: 130,
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //               borderRadius: 80,
// //               marginEnd: 10,
// //             }}>
// //             <CountdownCircleTimer
// //               isPlaying
// //               duration={timepercent}
// //               size={150}
// //               rotation="counterclockwise"
// //               strokeLinecap="square"
// //               isGrowing={false}
// //               isSmoothColorTransition={true}
// //               colors={['#333333']}
// //               strokeWidth={12}
// //               trailColor="#8BBD54"
// //               renderArcs={({remainingTime}) => {
// //                 const [color, fraction] = getColorSettings(
// //                   remainingTime,
// //                   duration,
// //                 );
// //                 const radius = 45; // Radius as percentage of the size
// //                 const circumference = 2 * Math.PI * radius;
// //                 const dashOffset = circumference * (1 - fraction);
// //               }}>
// //               {({remainingTime}) => {
// //                 return (
// //                   <View style={styles.timerContent}>
// //                     <Text style={styles.remainingTimeText}>   {timeinhr} : {timeinmin}</Text>
// //                     <Text style={styles.hourMinuteText}>
// //                       Hrs    Min
// //                     </Text>
// //                   </View>
// //                 );
// //               }}
// //             </CountdownCircleTimer>
         
// //           </View> */}
// //             <View
// //               style={{
// //                 alignItems: 'center',
// //                 justifyContent: 'center',
// //                 backgroundColor: onLineDevice ? '#4D98FF' : '#999C9F',
// //                 borderRadius: 100,
// //               }}>
// //               <AnimatedCircularProgress
// //                 size={155}
// //                 width={9}
// //                 fill={fillValue}
// //                 tintColor={onLineDevice ? '#525968' : '#525968'}
// //                 backgroundColor={onLineDevice ? '#8BBD54' : '#525968'}
// //               />
// //               <View
// //                 style={{
// //                   position: 'absolute',
// //                   alignItems: 'center',
// //                   justifyContent: 'center',
// //                 }}>
// //                 <Text
// //                   style={{
// //                     fontSize: 28,
// //                     color: '#fff',
// //                     fontWeight: '700',
// //                   }}>
// //                   {onLineDevice ? `${timeinhr}:${timeinmin}` : '00:00'}
// //                 </Text>
// //                 <Text
// //                   style={{
// //                     fontSize: 14,
// //                     color: '#fff',
// //                     marginTop: 5,
// //                     fontWeight: '500',
// //                   }}>
// //                   Hrs Min
// //                 </Text>
// //               </View>
// //             </View>
// //           </Pressable>
// //           // </LinearGradient>
// //         )}
// //         {'Refrigerator' in select && (
// //           <Pressable
// //             onPress={() => {
// //               if (onLineDevice) {
// //                 if (switchData) {
// //                   navigation.navigate('RefDeviceScreen', {
// //                     alldata: data,
// //                     id: id,
// //                   });
// //                 } else {
// //                   alert('Turn ON AC');
// //                 }
// //               } else {
// //                 console.log('Device is offline');
// //               }
// //             }}
// //             style={styles.mainCardView}>
// //             {/* <View> */}
// //             <View
// //               style={{
// //                 flexDirection: 'row',
// //                 alignItems: 'center',
// //                 paddingHorizontal: 10,
// //                 paddingVertical: 10,
// //                 borderRadius: 10,
// //               }}>
// //               <Text
// //                 style={{
// //                   fontSize: 13,
// //                   color: onLineDevice ? '#525151' : '#333333',
// //                 }}>
// //                 {device}
// //               </Text>

// //               <View>
// //                 <Model State={State} id={id} onLineDevice={onLineDevice} />
// //               </View>
// //             </View>

// //             <View
// //               style={{
// //                 flexDirection: 'row',
// //                 justifyContent: 'space-between',
// //                 alignItems: 'center',
// //                 // backgroundColor:'blue'
// //               }}>
// //               <View style={{}}>
// //                 <Image
// //                   style={{
// //                     width: 60,
// //                     height: 100,
// //                     resizeMode: 'contain',
// //                   }}
// //                   source={require('../assets/RefImage/RefImage.png')}
// //                 />
// //               </View>
// //               <View
// //                 style={{
// //                   paddingHorizontal: 10,
// //                   paddingVertical: 10,
// //                 }}>
// //                 {/* <View style={{alignContent:"flex-end",al}}>
// //                   <Text>nnn</Text>
// //                   </View> */}
// //                 {isSpecialMode ? (
// //                   // Show Intelligent Mode from API
// //                   <View
// //                     style={{
// //                       flexDirection: 'row',
// //                       alignItems: 'center',
// //                       justifyContent: 'flex-end',
// //                       marginEnd: 30,
// //                     }}>
// //                     <Text
// //                       style={{
// //                         color: '#810055',
// //                         fontSize: 18,
// //                         fontFamily: GEGBold,
// //                       }}>
// //                       <Text style={{color: '#707070', fontSize: 16}}>Mode</Text>{' '}
// //                       {refMode}
// //                     </Text>
// //                   </View>
// //                 ) : (
// //                   // Show temperature layout
// //                   <>
// //                     <View
// //                       style={{
// //                         flexDirection: 'row',
// //                         alignItems: 'center',
// //                         justifyContent: 'space-between',
// //                         marginEnd: 30,
// //                       }}>
// //                       <View>
// //                         <Text
// //                           style={{
// //                             color: '#333333',
// //                             fontSize: 16,
// //                             marginEnd: 10,
// //                           }}>
// //                           Freezer
// //                         </Text>
// //                       </View>
// //                       <View style={{flexDirection: 'row'}}>
// //                         <Text
// //                           style={{
// //                             color: !onLineDevice ? '#A9A9A9' : '#810055',
// //                             fontSize: 28,
// //                             fontWeight: 'bold',
// //                             marginEnd: 30,
// //                           }}>
// //                           {!onLineDevice ? 'OFF' : `${temperature}°C`}
// //                         </Text>
// //                         <View
// //                           style={{
// //                             backgroundColor: '#810055',
// //                             borderRadius: 20,
// //                             height: 25,
// //                             width: 25,
// //                           }}>
// //                           <Text
// //                             style={{
// //                               color: 'white',
// //                               textAlign: 'center',
// //                               marginTop: 5,
// //                               fontSize: 12,
// //                             }}>
// //                             {convertMode}
// //                           </Text>
// //                         </View>
// //                       </View>
// //                     </View>

// //                     <View
// //                       style={{
// //                         height: 0.5,
// //                         backgroundColor: '#d4d4d4',
// //                         marginEnd: 14,
// //                         marginTop: 14,
// //                         marginBottom: 14,
// //                         borderWidth: 0.5,
// //                       }}
// //                     />

// //                     <View
// //                       style={{
// //                         flexDirection: 'row',
// //                         alignItems: 'center',
// //                         justifyContent: 'space-between',
// //                         marginEnd: 30,
// //                       }}>
// //                       <View style={{marginRight: 20}}>
// //                         <Text style={{color: '#333333', fontSize: 16}}>
// //                           Fridge
// //                         </Text>
// //                       </View>

// //                       <Text
// //                         style={{
// //                           color: !onLineDevice ? '#A9A9A9' : '#810055',
// //                           fontSize: 28,
// //                           fontWeight: 'bold',
// //                           marginEnd: 60,
// //                         }}>
// //                         {/* {runing === 0 ? 'OFF' : `${runing} °C`} */}
// //                         {!onLineDevice
// //                           ? 'OFF'
// //                           : runing === 0
// //                           ? 'OFF'
// //                           : `${runing}°C`}
// //                       </Text>
// //                     </View>
// //                   </>
// //                 )}
// //               </View>
// //             </View>

// //             <View
// //               style={{
// //                 flexDirection: 'row',
// //                 alignItems: 'center',
// //                 paddingHorizontal: 10,
// //                 paddingVertical: 10,
// //                 borderRadius: 10,
// //               }}>
// //               <Text
// //                 style={{
// //                   fontSize: 12,
// //                   fontStyle: 'normal',
// //                   fontWeight: 'bold',
// //                   color: onLineDevice ? '#454545' : '#838383',
// //                 }}
// //                 numberOfLines={2}>
// //                 {/* {onLineDevice ? 'online' : 'Offline'} */}
// //                 {onLineDevice ? (switchData ? 'Online' : '') : 'Offline '}
// //               </Text>
// //               {onLineDevice ? (
// //                 ''
// //               ) : (
// //                 <View style={{}}>
// //                   <Text
// //                     style={{
// //                       fontSize: 13,
// //                       fontStyle: 'normal',
// //                       color: '#838383',
// //                       width: '100%',
// //                       marginRight: 10,
// //                     }}>
// //                     {/* Approx END Time is 1 hr 45 mins */}
// //                     {`${offlineTime}`}
// //                   </Text>
// //                 </View>
// //               )}
// //             </View>
// //             {/* </View> */}
// //           </Pressable>
// //         )}
// //       </View>
// //     // </ScrollView>
// //   );
// // }

// // export default HomeDeviceList;

// // const styles = StyleSheet.create({
// //   mainCardView: {
// //     height: 190,

// //     backgroundColor: '#ffff',

// //     borderRadius: 15,
// //     shadowColor: 'gray',

// //     shadowOffset: {width: 0, height: 0},

// //     shadowOpacity: 1,

// //     shadowRadius: 8,

// //     elevation: 8,
// //   },

// //   mainCardW: {
// //     height: 190,
// //     // backgroundColor: '#E8E8E8',
// //     // borderRadius: 15,
// //     // shadowColor: 'gray',
// //     // shadowOffset: {width: 0, height: 0},
// //     // shadowOpacity: 1,
// //     // shadowRadius: 8,
// //     // elevation: 8,
// //     flexDirection: 'row',
// //     width: '100%',
// //     alignContent: 'space-between',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingVertical: 10,
// //     paddingHorizontal: 10,
// //   },

// //   image: {
// //     width: 120,

// //     height: 50,

// //     resizeMode: 'contain',
// //   },

// //   switchLayout: {
// //     alignItems: 'center',

// //     flexDirection: 'row',

// //     justifyContent: 'space-between',

// //     paddingVertical: 10,

// //     marginStart: 10,
// //   },

// //   textLay: {
// //     fontSize: 11,

// //     color: '#454545',
// //   },

// //   mainMargin: {
// //     flex: 1,
// //     zIndex: 0,
// //     paddingHorizontal: 10,
// //     position: 'relative',
// //     paddingVertical: 10,
// //   },

// //   centerItem: {
// //     alignItems: 'center',

// //     marginTop: 0,

// //     marginBottom: 0,
// //   },

// //   container: {
// //     fontSize: 13,

// //     color: '#454545',
// //   },
// //   timerContent: {
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   remainingTimeText: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: '#fff',
// //   },
// //   hourMinuteText: {
// //     fontSize: 10,
// //     // marginTop: 8,
// //     color: '#fff',
// //   },
// // });

import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useContext,
} from 'react';
import Model from './Model';

import {featuresContol, switchButton} from '../Context/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RadialSlider} from 'react-native-radial-slider';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import LinearGradient from 'react-native-linear-gradient';
const highGrayImg = require('../assets/poweroff.png');
const highBlueImg = require('../assets/powerond.png');

function HomeDeviceList({
  data,
  id,
  device,
  timestamp,
  onLineDevice,
  switchs,
  Type,
  mode,
  temperature,
  timeinhr,
  timeinmin,
  runing,
  timepercent,
  ...props
}) {
  const {navigation} = props;
  console.log(
    onLineDevice,
    '....onLineDeviceonLineDeviceonLineDeviceonLineDevice',
  );

  console.log(data.item.alldata, '.....propspropspropsprops');

  const isFirstRender = useRef(false);
  const [switchData, setSwitchData] = useState(switchs);
  const [offlineTime, setOfflineTime] = useState(null);

  const [speed, setSpeed] = useState(temperature);
  const [select, setSelected] = useState(Type);
  const refMode = data?.item?.alldata?.params?.Refrigerator?.Ref_Mode;
  const convertMode =
    data?.item?.alldata?.params?.Refrigerator?.Convertible_Mode;
  console.log(data, '........refModerefMode');

  const refModeLower = refMode?.toLowerCase() || '';
  const isSpecialMode =
    refModeLower === 'intelligent' ||
    refModeLower === 'eco' ||
    refModeLower === 'quick chill';

  const [timeInhr, setTimeInhr] = useState(timeinhr);
  const getState = () => {
    if ('AC' in select) return 'AC';
    if ('WM' in select) return 'WM';
    if ('Refrigerator' in select) return 'Refrigerator';
    return 'Unknown';
  };
  const State = getState();

  // Switch'
  const SwitchModeSelected = async (State, id, switchData) => {
    let token = await AsyncStorage.getItem('AccessToken');
    const key = 'Power';
    try {
      let response = await switchButton(State, token, id, !switchData, key);

      setSwitchData(!switchData);
    } catch (err) {
      console.log(err.response.data, 'errerr');
    }
  };

  const handlePress = increment => {
    const newSpeed = speed + increment;
    if (newSpeed >= 16 && newSpeed <= 31) {
      setSpeed(newSpeed);
    }
  };

  const fillValue = timepercent;

  const handleChange = useMemo(
    () =>
      debounce(async newTemperature => {
        if (mode?.toLowerCase() !== 'cool') {
          console.log('Mode is not Cool, no temperature update');
          return;
        }

        let param = 'Temperature';
        let token = await AsyncStorage.getItem('AccessToken');
        featuresContolFunction(token, id, param, newTemperature);

        console.log('Temperature updated to:', newTemperature);
      }, 100),
    [mode, id],
  );
  const featuresContolFunction = async (token, id, param, values) => {
    let key = 'AC';
    try {
      let response = await featuresContol(key, token, id, param, values);
      if (response && response.data) {
        setSpeed(values);
      } else {
        console.log('Response is undefined or does not contain data');
      }
    } catch (err) {
      console.log(err.response.data, 'error');
    }
  };

  // Debounce helper function
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  // WM API
  useEffect(() => {
    const date = new Date(timestamp);
    const formattedDateTime = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);

    setOfflineTime(formattedDateTime);
  }, [timestamp]);
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.mainMargin}>
        {'AC' in select && (
          <Pressable
            onPress={() => {
              if (onLineDevice) {
                if (switchData) {
                  navigation.navigate('AcFeatureScreen', (alldata = {data}));
                } else {
                  alert('Turn ON AC');
                }
              } else {
                console.log('Device is offline');
              }
            }}
            style={styles.mainCardView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
                marginStart: 4,
              }}>
              <View>
                <View style={styles.switchLayout}>
                  <Pressable
                    onPress={() => {
                      onLineDevice
                        ? SwitchModeSelected(State, id, switchData)
                        : '';
                    }}>
                    {onLineDevice ? (
                      <Image
                        style={{width: 38, height: 38}}
                        source={switchData ? highBlueImg : highGrayImg}
                      />
                    ) : (
                      <Image
                        style={{width: 38, height: 38}}
                        source={switchData ? highGrayImg : highGrayImg}
                      />
                    )}
                  </Pressable>
                  <View>
                    <Text
                      style={{
                        color: onLineDevice ? '#810055' : '#838383',
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginStart: 32,
                      }}>
                      {onLineDevice && switchData ? `${speed} °C` : ''}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',

                    alignItems: 'center',

                    paddingHorizontal: 8,
                    marginHorizontal: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,

                      color: onLineDevice ? '#525151' : '#333333',
                    }}>
                    {device}
                  </Text>

                  <View>
                    <Model State={State} id={id} onLineDevice={onLineDevice} />
                  </View>
                </View>

                <View>
                  <View style={{marginStart: 8, marginVertical: 4}}>
                    <Image
                      style={styles.image}
                      source={require('../assets/acimg.png')}
                    />
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',

                    alignItems: 'center',

                    paddingHorizontal: 0,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontStyle: 'normal',
                      fontWeight: 'bold',
                      color: onLineDevice ? '#454545' : '#838383',
                      marginHorizontal: 0,
                    }}
                    numberOfLines={2}>
                    {/* {onLineDevice ? 'online' : 'Offline'} */}
                    {onLineDevice ? (switchData ? 'Online' : '') : 'Offline '}
                  </Text>
                  {onLineDevice ? (
                    ''
                  ) : (
                    <View style={{}}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontStyle: 'normal',
                          color: '#838383',
                          width: '100%',
                        }}>
                        {/* Approx END Time is 1 hr 45 mins */}
                        {`${offlineTime}`}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  style={{
                    position: 'absolute',
                    width: '90%',
                    height: 190,
                    resizeMode: 'contain',
                    marginHorizontal: 30,
                  }}
                  source={require('../assets/SliderPng.png')}
                />

                <RadialSlider
                  value={speed}
                  min={16}
                  max={31}
                  onChange={handleChange}
                  radius={78}
                  unit="°C"
                  thumbRadius={12}
                  thumbColor={onLineDevice ? '#2E73D3' : '#E5E5E5'}
                  thumbBorderWidth={2}
                  thumbBorderColor="#fff"
                  markerLineSize={60}
                  sliderWidth={14}
                  sliderTrackColor="#E5E5E5"
                  lineColor="#E5E5E5"
                  lineSpace={16}
                  linearGradient={[
                    {offset: '0%', color: '#4D98FF'},
                    {offset: '25%', color: '#6DB149'},
                    {offset: '55%', color: '#FBA905'},
                    {offset: '100%', color: '#ff0000'},
                  ]}
                  subTitle=""
                  isHideSubtitle
                  isHideButtons
                  isHideLines
                  isHideValue
                  isHideTailText
                  isHideSlider={
                    onLineDevice && switchData && mode?.toLowerCase() === 'cool'
                      ? false
                      : true
                  }
                />
              </View>
            </View>
          </Pressable>
        )}

        {'WM' in select && (
          <Pressable
            onPress={() => {
              if (onLineDevice) {
                if (switchData) {
                  navigation.navigate('WMDeviceScreen', {
                    alldata: data,
                    id: id,
                  });
                } else {
                  alert('Turn on a washing machine');
                }
              } else {
                console.log('Device is offline');
              }
            }}
            style={{
              height: 190,
              backgroundColor: '#ffff',
              borderRadius: 15,
              shadowColor: 'gray',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 1,
              shadowRadius: 8,
              elevation: 8,
              flexDirection: 'row',
              width: '100%',
              alignContent: 'space-between',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '50%',
              }}>
              <View>
                <View style={styles.switchLayout}>
                  <Pressable
                    onPress={() => {
                      SwitchModeSelected(State, id, switchData);
                    }}>
                    {onLineDevice ? (
                      <Image
                        style={{width: 38, height: 38}}
                        source={switchData ? highBlueImg : highGrayImg}
                      />
                    ) : (
                      <Image
                        style={{width: 38, height: 38}}
                        source={switchData ? highGrayImg : highGrayImg}
                      />
                    )}
                  </Pressable>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    width: 110,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: onLineDevice ? '#525151' : '#838383',
                    }}
                    numberOfLines={2}>
                    {device}
                  </Text>
                  <View>
                    <Model State={State} id={id} onLineDevice={onLineDevice} />
                  </View>
                </View>
                <View style={{flexDirection: 'row', width: '70%'}}>
                  <View style={{marginStart: 8, marginVertical: 4}}>
                    <Image
                      style={{
                        width: 50,
                        height: 100,
                        resizeMode: 'contain',
                      }}
                      source={require('../assets/washingmashine/wmashine.png')}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      marginBottom: 10,
                      paddingHorizontal: 10,
                    }}>
                    <View style={{}}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontStyle: 'normal',
                          fontWeight: 'bold',
                          color: onLineDevice ? '#454545' : '#838383',
                        }}>
                        {onLineDevice
                          ? runing
                            ? 'Cycle Runing'
                            : onLineDevice
                            ? 'Online'
                            : ''
                          : 'Offline at'}
                      </Text>
                    </View>
                    {onLineDevice ? (
                      ''
                    ) : (
                      <View style={{}}>
                        <Text
                          style={{
                            fontSize: 13,
                            fontStyle: 'normal',
                            color: '#838383',
                            width: '100%',
                            marginRight: 10,
                          }}>
                          {`${offlineTime}`}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
            {/* <View
            style={{
              backgroundColor: '#95C34A',
              height: 150,
              width: 150,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
            }}> */}
            {/* <View
            style={{
              backgroundColor: '#4D98FF',
              height: 145,
              width: 130,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 80,
              marginEnd: 10,
            }}>
            <CountdownCircleTimer
              isPlaying
              duration={timepercent}
              size={150}
              rotation="counterclockwise"
              strokeLinecap="square"
              isGrowing={false}
              isSmoothColorTransition={true}
              colors={['#333333']}
              strokeWidth={12}
              trailColor="#8BBD54"
              renderArcs={({remainingTime}) => {
                const [color, fraction] = getColorSettings(
                  remainingTime,
                  duration,
                );
                const radius = 45; // Radius as percentage of the size
                const circumference = 2 * Math.PI * radius;
                const dashOffset = circumference * (1 - fraction);
              }}>
              {({remainingTime}) => {
                return (
                  <View style={styles.timerContent}>
                    <Text style={styles.remainingTimeText}>   {timeinhr} : {timeinmin}</Text>
                    <Text style={styles.hourMinuteText}>
                      Hrs    Min
                    </Text>
                  </View>
                );
              }}
            </CountdownCircleTimer>
         
          </View> */}
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: onLineDevice ? '#4D98FF' : '#999C9F',
                borderRadius: 100,
              }}>
              <AnimatedCircularProgress
                size={155}
                width={9}
                fill={fillValue}
                tintColor={onLineDevice ? '#525968' : '#525968'}
                backgroundColor={onLineDevice ? '#8BBD54' : '#525968'}
              />
              <View
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 28,
                    color: '#fff',
                    fontWeight: '700',
                  }}>
                  {onLineDevice ? `${timeinhr}:${timeinmin}` : '00:00'}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#fff',
                    marginTop: 5,
                    fontWeight: '500',
                  }}>
                  Hrs Min
                </Text>
              </View>
            </View>
          </Pressable>
          // </LinearGradient>
        )}
        {'Refrigerator' in select && (
          <Pressable
            onPress={() => {
              if (onLineDevice) {
                if (switchData) {
                  navigation.navigate('RefDeviceScreen', {
                    alldata: data,
                    id: id,
                  });
                } else {
                  alert('Turn ON AC');
                }
              } else {
                console.log('Device is offline');
              }
            }}
            style={styles.mainCardView}>
            {/* <View> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 5,
                paddingVertical: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontSize: 13,
                  color: onLineDevice ? '#525151' : '#333333',
                }}>
                {device}
              </Text>

              <View>
                <Model State={State} id={id} onLineDevice={onLineDevice} />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor:'blue'
              }}>
              <View style={{}}>
                <Image
                  style={{
                    width: 60,
                    height: 100,
                    resizeMode: 'contain',
                  }}
                  source={require('../assets/RefImage/RefImage.png')}
                />
              </View>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}>
                {/* <View style={{alignContent:"flex-end",al}}>
                  <Text>nnn</Text>
                  </View> */}
                {isSpecialMode ? (
                  // Show Intelligent Mode from API
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center', // center horizontally
                      width: '100%', // make sure View takes full width
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#810055',
                      }}>
                      <Text style={{color: '#707070', fontSize: 16}}>
                        Mode{' '}
                      </Text>
                      {refMode}
                    </Text>
                  </View>
                ) : (
                  // Show temperature layout
                  <>
                    <View style={{alignSelf: 'flex-end'}}>
                      {onLineDevice && convertMode !== 'OFF' && (
                      <View
                        style={{
                          backgroundColor: '#810055',
                          borderRadius: 20,
                          height: 25,
                          width: 25,
                          bottom: 35,
                          // left: 15,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            textAlign: 'center',
                            marginTop: 5,
                            fontSize: 12,
                          }}>
                          {convertMode}
                        </Text>
                      </View>
                       )} 
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginEnd: 40,
                      }}>
                      <View>
                        <Text
                          style={{
                            color: '#333333',
                            fontSize: 14,
                            marginEnd: 10,
                          }}>
                          Freezer
                        </Text>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: !onLineDevice ? '#A9A9A9' : '#810055',
                            fontSize: 28,
                            fontWeight: 'bold',
                            marginEnd: 40,
                          }}>
                          {!onLineDevice ? 'OFF' : `${temperature}°C`}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        height: 0.5,
                        backgroundColor: '#d4d4d4',
                        marginEnd: 14,
                        marginTop: 5,
                        marginBottom: 14,
                        borderWidth: 0.5,
                      }}
                    />

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginEnd: 30,
                      }}>
                      <View style={{marginRight: 20}}>
                        <Text style={{color: '#333333', fontSize: 14}}>
                          Fridge
                        </Text>
                      </View>

                      <Text
                        style={{
                          color: !onLineDevice ? '#A9A9A9' : '#810055',
                          fontSize: 28,
                          fontWeight: 'bold',
                          marginEnd: 60,
                        }}>
                        {/* {runing === 0 ? 'OFF' : `${runing} °C`} */}
                        {!onLineDevice
                          ? 'OFF'
                          : runing === 0
                          ? 'OFF'
                          : `${runing}°C`}
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 0,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  color: onLineDevice ? '#454545' : '#838383',
                }}
                numberOfLines={2}>
                {/* {onLineDevice ? 'online' : 'Offline'} */}
                {onLineDevice ? (switchData ? 'Online' : '') : 'Offline '}
              </Text>
              {onLineDevice ? (
                ''
              ) : (
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontStyle: 'normal',
                      color: '#838383',
                      width: '100%',
                      marginRight: 10,
                    }}>
                    {/* Approx END Time is 1 hr 45 mins */}
                    {`${offlineTime}`}
                  </Text>
                </View>
              )}
            </View>
            {/* </View> */}
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}

export default HomeDeviceList;

const styles = StyleSheet.create({
  mainCardView: {
    height: 190,

    backgroundColor: '#ffff',

    borderRadius: 15,
    shadowColor: 'gray',

    shadowOffset: {width: 0, height: 0},

    shadowOpacity: 1,

    shadowRadius: 8,

    elevation: 8,
  },

  mainCardW: {
    height: 190,
    // backgroundColor: '#E8E8E8',
    // borderRadius: 15,
    // shadowColor: 'gray',
    // shadowOffset: {width: 0, height: 0},
    // shadowOpacity: 1,
    // shadowRadius: 8,
    // elevation: 8,
    flexDirection: 'row',
    width: '100%',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  image: {
    width: 120,

    height: 50,

    resizeMode: 'contain',
  },

  switchLayout: {
    alignItems: 'center',

    flexDirection: 'row',

    justifyContent: 'space-between',

    paddingVertical: 10,

    marginStart: 10,
  },

  textLay: {
    fontSize: 11,

    color: '#454545',
  },

  mainMargin: {
    flex: 1,
    zIndex: 0,
    paddingHorizontal: 10,
    position: 'relative',
    paddingVertical: 10,
  },

  centerItem: {
    alignItems: 'center',

    marginTop: 0,

    marginBottom: 0,
  },

  container: {
    fontSize: 13,

    color: '#454545',
  },
  timerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  remainingTimeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  hourMinuteText: {
    fontSize: 10,
    // marginTop: 8,
    color: '#fff',
  },
});



// import {Pressable, View, Text, StyleSheet, Image} from 'react-native';
// import React, {
//   useState,
//   useCallback,
//   useMemo,
//   useEffect,
//   useRef,
//   useContext,
// } from 'react';
// import Model from './Model';
 
// import {featuresContol, switchButton} from '../Context/API';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {RadialSlider} from 'react-native-radial-slider';
// import {AnimatedCircularProgress} from 'react-native-circular-progress';
// import LinearGradient from 'react-native-linear-gradient';
// import {Circle} from 'react-native-svg';
// import {UserContext} from '../Context/UserContext';
// const highGrayImg = require('../assets/poweroff.png');
// const highBlueImg = require('../assets/powerond.png');
 
// function HomeDeviceList({
//   data,
//   id,
//   device,
//   timestamp,
//   onLineDevice,
//   switchs,
//   Type,
//   mode,
//   temperature,
//   timeinhr,
//   timeinmin,
//   runing,
//   timepercent,
//   ...props
// }) {
//   const {navigation} = props;
//   console.log(data.item.alldata, '.....propspropspropsprops');
 
//   const isFirstRender = useRef(false);
//   const [switchData, setSwitchData] = useState(switchs);
//   const [offlineTime, setOfflineTime] = useState(null);
 
//   const [speed, setSpeed] = useState(temperature);
//   const [select, setSelected] = useState(Type);
 
//   const [timeInhr, setTimeInhr] = useState(timeinhr);
//   const getState = () => {
//     if ('AC' in select) return 'AC';
//     if ('WM' in select) return 'WM';
//     if ('Refrigerator' in select) return 'Refrigerator';
//     return 'Unknown';
//   };
//   const State = getState();
 
//   // Switch'
//   const SwitchModeSelected = async (State, id, switchData) => {
//     let token = await AsyncStorage.getItem('AccessToken');
//     const key = 'Power';
//     try {
//       let response = await switchButton(State, token, id, !switchData, key);
 
//       setSwitchData(!switchData);
//     } catch (err) {
//       console.log(err.response.data, 'errerr');
//     }
//   };
 
//   const handlePress = increment => {
//     const newSpeed = speed + increment;
//     if (newSpeed >= 16 && newSpeed <= 31) {
//       setSpeed(newSpeed);
//     }
//   };
 
//   const fillValue = timepercent;
 
//   const handleChange = useMemo(
//     () =>
//       debounce(async newTemperature => {
//         if (mode?.toLowerCase() !== 'cool') {
//           console.log('Mode is not Cool, no temperature update');
//           return;
//         }
 
//         let param = 'Temperature';
//         let token = await AsyncStorage.getItem('AccessToken');
//         featuresContolFunction(token, id, param, newTemperature);
 
//         console.log('Temperature updated to:', newTemperature);
//       }, 100),
//     [mode, id],
//   );
//   const featuresContolFunction = async (token, id, param, values) => {
//     let key = 'AC';
//     try {
//       let response = await featuresContol(key, token, id, param, values);
//       if (response && response.data) {
//         setSpeed(values);
//       } else {
//         console.log('Response is undefined or does not contain data');
//       }
//     } catch (err) {
//       console.log(err.response.data, 'error');
//     }
//   };
 
//   // Debounce helper function
//   function debounce(func, delay) {
//     let timer;
//     return function (...args) {
//       clearTimeout(timer);
//       timer = setTimeout(() => {
//         func(...args);
//       }, delay);
//     };
//   }
 
//   // WM API
//   useEffect(() => {
//     const date = new Date(timestamp);
//     const formattedDateTime = new Intl.DateTimeFormat('en-US', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit',
//       hour: 'numeric',
//       minute: 'numeric',
//       hour12: true,
//     }).format(date);
 
//     setOfflineTime(formattedDateTime);
//   }, [timestamp]);
//   return (
//     <View style={styles.mainMargin}>
//       {'AC' in select && (
//         <Pressable
//           onPress={() => {
//             if (onLineDevice) {
//               if (switchData) {
//                 navigation.navigate('AcFeatureScreen', (alldata = {data}));
//               } else {
//                 alert('Turn ON AC');
//               }
//             } else {
//               console.log('Device is offline');
//             }
//           }}
//           style={styles.mainCardView}>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               width: '100%',
//               justifyContent: 'space-between',
//               marginStart: 4,
//             }}>
//             <View>
//               <View style={styles.switchLayout}>
//                 <Pressable
//                   onPress={() => {
//                     onLineDevice
//                       ? SwitchModeSelected(State, id, switchData)
//                       : '';
//                   }}>
//                   {onLineDevice ? (
//                     <Image
//                       style={{width: 38, height: 38}}
//                       source={switchData ? highBlueImg : highGrayImg}
//                     />
//                   ) : (
//                     <Image
//                       style={{width: 38, height: 38}}
//                       source={switchData ? highGrayImg : highGrayImg}
//                     />
//                   )}
//                 </Pressable>
//                 <View>
//                   <Text
//                     style={{
//                       color: onLineDevice ? '#810055' : '#838383',
//                       fontSize: 22,
//                       fontWeight: 'bold',
//                       marginStart: 32,
//                     }}>
//                     {onLineDevice && switchData ? `${speed} °C` : ''}
//                   </Text>
//                 </View>
//               </View>
 
//               <View
//                 style={{
//                   flexDirection: 'row',
 
//                   alignItems: 'center',
 
//                   paddingHorizontal: 8,
//                   marginHorizontal: 5,
//                 }}>
//                 <Text
//                   style={{
//                     fontSize: 14,
 
//                     color: onLineDevice ? '#525151' : '#333333',
//                   }}>
//                   {device}
//                 </Text>
 
//                 <View>
//                   <Model State={State} id={id} onLineDevice={onLineDevice} />
//                 </View>
//               </View>
 
//               <View>
//                 <View style={{marginStart: 8, marginVertical: 4}}>
//                   <Image
//                     style={styles.image}
//                     source={require('../assets/acimg.png')}
//                   />
//                 </View>
//               </View>
 
//               <View
//                 style={{
//                   flexDirection: 'row',
 
//                   alignItems: 'center',
 
//                   paddingHorizontal: 6,
//                 }}>
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     fontStyle: 'normal',
//                     fontWeight: 'bold',
//                     color: onLineDevice ? '#454545' : '#838383',
//                     marginHorizontal: 10,
//                   }}
//                   numberOfLines={2}>
//                   {/* {onLineDevice ? 'online' : 'Offline'} */}
//                   {onLineDevice ? (switchData ? 'Online' : '') : 'Offline '}
//                 </Text>
//                 {onLineDevice ? (
//                   ''
//                 ) : (
//                   <View style={{}}>
//                     <Text
//                       style={{
//                         fontSize: 14,
//                         fontStyle: 'normal',
//                         color: '#838383',
//                         width: '100%',
//                         marginRight: 10,
//                       }}>
//                       {/* Approx END Time is 1 hr 45 mins */}
//                       {`${offlineTime}`}
//                     </Text>
//                   </View>
//                 )}
//               </View>
//             </View>
 
//             <View style={{alignItems: 'center', justifyContent: 'center'}}>
//               <Image
//                 style={{
//                   position: 'absolute',
//                   width: '90%',
//                   height: 190,
//                   resizeMode: 'contain',
//                   marginHorizontal: 30,
//                 }}
//                 source={require('../assets/SliderPng.png')}
//               />
 
//               <RadialSlider
//                 value={speed}
//                 min={16}
//                 max={31}
//                 onChange={handleChange}
//                 radius={78}
//                 unit="°C"
//                 thumbRadius={12}
//                 thumbColor={onLineDevice ? '#2E73D3' : '#E5E5E5'}
//                 thumbBorderWidth={2}
//                 thumbBorderColor="#fff"
//                 markerLineSize={60}
//                 sliderWidth={14}
//                 sliderTrackColor="#E5E5E5"
//                 lineColor="#E5E5E5"
//                 lineSpace={16}
//                 linearGradient={[
//                   {offset: '0%', color: '#4D98FF'},
//                   {offset: '25%', color: '#6DB149'},
//                   {offset: '55%', color: '#FBA905'},
//                   {offset: '100%', color: '#ff0000'},
//                 ]}
//                 subTitle=""
//                 isHideSubtitle
//                 isHideButtons
//                 isHideLines
//                 isHideValue
//                 isHideTailText
//                 isHideSlider={
//                   onLineDevice && switchData && mode?.toLowerCase() === 'cool'
//                     ? false
//                     : true
//                 }
//               />
//             </View>
//           </View>
//         </Pressable>
//       )}
 
//       {'WM' in select && (
//         <Pressable
//           onPress={() => {
//             if (onLineDevice) {
//               if (switchData) {
//                 navigation.navigate('WMDeviceScreen', {alldata: data, id: id});
//               } else {
//                 alert('Turn on a washing machine');
//               }
//             } else {
//               console.log('Device is offline');
//             }
//           }}
//           style={{
//             height: 190,
//             backgroundColor: '#ffff',
//             borderRadius: 15,
//             shadowColor: 'gray',
//             shadowOffset: {width: 0, height: 0},
//             shadowOpacity: 1,
//             shadowRadius: 8,
//             elevation: 8,
//             flexDirection: 'row',
//             width: '100%',
//             alignContent: 'space-between',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             paddingVertical: 10,
//             paddingHorizontal: 10,
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               width: '50%',
//             }}>
//             <View>
//               <View style={styles.switchLayout}>
//                 <Pressable
//                   onPress={() => {
//                     SwitchModeSelected(State, id, switchData);
//                   }}>
//                   {onLineDevice ? (
//                     <Image
//                       style={{width: 38, height: 38}}
//                       source={switchData ? highBlueImg : highGrayImg}
//                     />
//                   ) : (
//                     <Image
//                       style={{width: 38, height: 38}}
//                       source={switchData ? highGrayImg : highGrayImg}
//                     />
//                   )}
//                 </Pressable>
//               </View>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   paddingHorizontal: 10,
//                   width: 110,
//                 }}>
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     color: onLineDevice ? '#525151' : '#838383',
//                   }}
//                   numberOfLines={2}>
//                   {device}
//                 </Text>
//                 <View>
//                   <Model State={State} id={id} onLineDevice={onLineDevice} />
//                 </View>
//               </View>
//               <View style={{flexDirection: 'row', width: '70%'}}>
//                 <View style={{marginStart: 8, marginVertical: 4}}>
//                   <Image
//                     style={{
//                       width: 50,
//                       height: 100,
//                       resizeMode: 'contain',
//                     }}
//                     source={require('../assets/washingmashine/wmashine.png')}
//                   />
//                 </View>
//                 <View
//                   style={{
//                     flexDirection: 'column',
//                     justifyContent: 'flex-end',
//                     marginBottom: 10,
//                     paddingHorizontal: 10,
//                   }}>
//                   <View style={{}}>
//                     <Text
//                       style={{
//                         fontSize: 14,
//                         fontStyle: 'normal',
//                         fontWeight: 'bold',
//                         color: onLineDevice ? '#454545' : '#838383',
//                       }}>
//                       {onLineDevice
//                         ? runing
//                           ? 'Cycle Runing'
//                           : onLineDevice
//                           ? 'Online'
//                           : ''
//                         : 'Offline at'}
//                     </Text>
//                   </View>
//                   {onLineDevice ? (
//                     ''
//                   ) : (
//                     <View style={{}}>
//                       <Text
//                         style={{
//                           fontSize: 13,
//                           fontStyle: 'normal',
//                           color: '#838383',
//                           width: '100%',
//                           marginRight: 10,
//                         }}>
//                         {`${offlineTime}`}
//                       </Text>
//                     </View>
//                   )}
//                 </View>
//               </View>
//             </View>
//           </View>
//           {/* <View
//             style={{
//               backgroundColor: '#95C34A',
//               height: 150,
//               width: 150,
//               alignItems: 'center',
//               justifyContent: 'center',
//               borderRadius: 100,
//             }}> */}
//           {/* <View
//             style={{
//               backgroundColor: '#4D98FF',
//               height: 145,
//               width: 130,
//               alignItems: 'center',
//               justifyContent: 'center',
//               borderRadius: 80,
//               marginEnd: 10,
//             }}>
//             <CountdownCircleTimer
//               isPlaying
//               duration={timepercent}
//               size={150}
//               rotation="counterclockwise"
//               strokeLinecap="square"
//               isGrowing={false}
//               isSmoothColorTransition={true}
//               colors={['#333333']}
//               strokeWidth={12}
//               trailColor="#8BBD54"
//               renderArcs={({remainingTime}) => {
//                 const [color, fraction] = getColorSettings(
//                   remainingTime,
//                   duration,
//                 );
//                 const radius = 45; // Radius as percentage of the size
//                 const circumference = 2 * Math.PI * radius;
//                 const dashOffset = circumference * (1 - fraction);
//               }}>
//               {({remainingTime}) => {
//                 return (
//                   <View style={styles.timerContent}>
//                     <Text style={styles.remainingTimeText}>   {timeinhr} : {timeinmin}</Text>
//                     <Text style={styles.hourMinuteText}>
//                       Hrs    Min
//                     </Text>
//                   </View>
//                 );
//               }}
//             </CountdownCircleTimer>
         
//           </View> */}
//           <View
//             style={{
//               alignItems: 'center',
//               justifyContent: 'center',
//               backgroundColor: onLineDevice ? '#4D98FF' : '#999C9F',
//               borderRadius: 100,
//             }}>
//             <AnimatedCircularProgress
//               size={155}
//               width={9}
//               fill={fillValue}
//               tintColor={onLineDevice ? '#525968' : '#525968'}
//               backgroundColor={onLineDevice ? '#8BBD54' : '#525968'}
//             />
//             <View
//               style={{
//                 position: 'absolute',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               <Text
//                 style={{
//                   fontSize: 28,
//                   color: '#fff',
//                   fontWeight: '700',
//                 }}>
//                 {onLineDevice ? `${timeinhr}:${timeinmin}` : '00:00'}
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   color: '#fff',
//                   marginTop: 5,
//                   fontWeight: '500',
//                 }}>
//                 Hrs Min
//               </Text>
//             </View>
//           </View>
//         </Pressable>
//         // </LinearGradient>
//       )}
//       {'Refrigerator' in select && (
//         <Pressable
//           onPress={() => {
//             if (onLineDevice) {
//               if (switchData) {
//                 navigation.navigate('RefDeviceScreen', {alldata: data, id: id});
//               } else {
//                 alert('Turn ON AC');
//               }
//             } else {
//               console.log('Device is offline');
//             }
//           }}
//           style={styles.mainCardView}>
//           {/* <View> */}
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               paddingHorizontal: 10,
//               paddingVertical: 10,
//               borderRadius: 10,
//             }}>
//             <Text
//               style={{
//                 fontSize: 13,
//                 color: onLineDevice ? '#525151' : '#333333',
//               }}>
//               {device}
//             </Text>
 
//             <View>
//               <Model State={State} id={id} onLineDevice={onLineDevice} />
//             </View>
//           </View>
 
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               // backgroundColor:'blue'
//             }}>
//             <View style={{}}>
//               <Image
//                 style={{
//                   width: 60,
//                   height: 100,
//                   resizeMode: 'contain',
//                 }}
//                 source={require('../assets/RefImage/RefImage.png')}
//               />
//             </View>
//             <View
//               style={{
//                 paddingHorizontal: 10,
//                 paddingVertical: 10,
//               }}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   // paddingHorizontal:10,paddingVertical:10,
//                 }}>
//                 <View style={{marginRight: 20}}>
//                   <Text style={{color: '#333333', fontSize: 16}}>Fridge</Text>
//                 </View>
 
//                 <Text
//                   style={{
//                     color: '#4D98FF',
//                     fontSize: 20,
//                     fontWeight: 'bold',
//                   }}>
//                   {runing} °C
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   height: 0.5,
//                   backgroundColor: '#d4d4d4',
//                   // marginStart: 14,
//                   marginEnd: 14,
//                   marginTop: 14,
//                   marginBottom: 14,
//                 }}
//               />
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}>
//                 <View>
//                   <Text style={{color: '#333333', fontSize: 16}}>Freezer</Text>
//                 </View>
//                 <View>
//                   <Text
//                     style={{
//                       color: '#4D98FF',
//                       fontSize: 20,
//                       fontWeight: 'bold',
//                     }}>
//                     {temperature} °C
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
 
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               paddingHorizontal: 10,
//               paddingVertical: 10,
//               borderRadius: 10,
//             }}>
//             <Text
//               style={{
//                 fontSize: 12,
//                 fontStyle: 'normal',
//                 fontWeight: 'bold',
//                 color: onLineDevice ? '#454545' : '#838383',
//               }}
//               numberOfLines={2}>
//               {/* {onLineDevice ? 'online' : 'Offline'} */}
//               {onLineDevice ? (switchData ? 'Online' : '') : 'Offline '}
//             </Text>
//             {onLineDevice ? (
//               ''
//             ) : (
//               <View style={{}}>
//                 <Text
//                   style={{
//                     fontSize: 13,
//                     fontStyle: 'normal',
//                     color: '#838383',
//                     width: '100%',
//                     marginRight: 10,
//                   }}>
//                   {/* Approx END Time is 1 hr 45 mins */}
//                   {`${offlineTime}`}
//                 </Text>
//               </View>
//             )}
//           </View>
//           {/* </View> */}
//         </Pressable>
//       )}
//     </View>
//   );
// }
 
// export default HomeDeviceList;
 
// const styles = StyleSheet.create({
//   mainCardView: {
//     height: 190,
 
//     backgroundColor: '#ffff',
 
//     borderRadius: 15,
//     shadowColor: 'gray',
 
//     shadowOffset: {width: 0, height: 0},
 
//     shadowOpacity: 1,
 
//     shadowRadius: 8,
 
//     elevation: 8,
    
//   },
 
//   mainCardW: {
//     height: 190,
//     // backgroundColor: '#E8E8E8',
//     // borderRadius: 15,
//     // shadowColor: 'gray',
//     // shadowOffset: {width: 0, height: 0},
//     // shadowOpacity: 1,
//     // shadowRadius: 8,
//     // elevation: 8,
//     flexDirection: 'row',
//     width: '100%',
//     alignContent: 'space-between',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//   },
 
//   image: {
//     width: 120,
 
//     height: 50,
 
//     resizeMode: 'contain',
//   },
 
//   switchLayout: {
//     alignItems: 'center',
 
//     flexDirection: 'row',
 
//     justifyContent: 'space-between',
 
//     paddingVertical: 10,
 
//     marginStart: 10,
//   },
 
//   textLay: {
//     fontSize: 11,
 
//     color: '#454545',
//   },
 
//   mainMargin: {
//     flex: 1,
//     zIndex: 0,
//     paddingHorizontal: 10,
//     position: 'relative',
//     paddingVertical: 10,
//   },
 
//   centerItem: {
//     alignItems: 'center',
 
//     marginTop: 0,
 
//     marginBottom: 0,
//   },
 
//   container: {
//     fontSize: 13,
 
//     color: '#454545',
//   },
//   timerContent: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   remainingTimeText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   hourMinuteText: {
//     fontSize: 10,
//     // marginTop: 8,
//     color: '#fff',
//   },
// });
 