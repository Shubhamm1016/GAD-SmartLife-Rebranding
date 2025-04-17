// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ImageBackground,
//   TouchableOpacity,
//   SafeAreaView,
//   RefreshControl,
//   Pressable,
//   Dimensions,
// } from 'react-native';

// import React, {
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from 'react';
// import {Circle, Svg} from 'react-native-svg';
// import {AnimatedCircularProgress} from 'react-native-circular-progress';
// import AcFanScreen from './AcFanScreen';
// import AcModeScreen from './AcModeScreen';
// import AcFunctionScreen from './AcFunctionScreen';
// import AcGraphScreem from './AcGraphScreem';
// import AcDignoseScreen from './AcDignoseScreen';
// import AcFilterScreen from './AcFilterScreen';
// import AcSwingScreen from './AcSwingScreen';
// import AcConvertibleScreen from './AcConvertibleScreen';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {FeacturAC, featuresContol} from '../../Context/API';
// import {displayButton, switchButton} from '../../Context/API';
// import {ScrollView} from 'react-native';
// import {RadialSlider} from 'react-native-radial-slider';
// import {UserContext} from '../../Context/UserContext';
// import InsideHeader from '../../comman-compnent/InsideHeader';
// const highGrayImg = require('../../assets/poweron.png');
// const highBlueImg = require('../../assets/poweroff.png');
// const displayHide = require('../../assets/iconDISPLAY.png');
// const displayShow = require('../../assets/displayico.png');
// const {height, width} = Dimensions.get('window');
// const AcFeatureScreen = props => {
//   const {navigation} = props;
//   // console.log(props.route.params.data.item.alldata.id, 'propsaaaaaaaaaaaaaaa');
//   const {acFeature, fetchAll} = useContext(UserContext);
//   // const nodeid = useMemo(
//   //   () => props.route.params.data.item.alldata.id,
//   //   [props.route.params.data.item.alldata.id],
//   // );
//   const nodeid = props.route.params.data.item.alldata.id;

//   const [state, setState] = useState({
//     refresh: false,
//     role: '',
//     name: '',
//     Power: '',
//     display: '',
//     mode: '',
//     Fan: '',
//     converrt: '',
//     energtSaving: '',
//     silent: '',
//     hygine: '',
//     sleep: '',
//     turbo: '',
//     swing: '',
//     swingH: '',
//     temperature: '',
//   });

//   // console.log(state, 'statestatestatestate');

//   const debounce = useCallback((func, delay) => {
//     let timer;
//     return function (...args) {
//       clearTimeout(timer);
//       timer = setTimeout(() => {
//         func.apply(this, args);
//       }, delay);
//     };
//   }, []);

//   const decNumber = () => {
//     if (state.temperature > 16) {
//       // Decrement the temperature and pass the value to debouncedSetTemperature
//       debouncedSetTemperature(state.temperature - 1);
//       // setState(prevState => ({...prevState, temperature: state.temperature - 1}));
//     } else {
//       console.log(state.temperature, 'min_value');
//     }
//   };

//   // Increment temperature
//   const inNumber = () => {
//     if (state.temperature < 31) {
//       // Increment the temperature and pass the value to debouncedSetTemperature
//       debouncedSetTemperature(state.temperature + 1);
//       // handleChange(state.temperature + 1)
//       // setState(prevState => ({...prevState, temperature: state.temperature + 1}));
//     } else {
//       console.log(state.temperature, 'max_value');
//       alert('Maxmum Temperature is 31');
//     }
//   };

//   // const handleChange = useCallback(
//   //   newTemperature => {
//   //     // Exit early if mode is not 'Cool'
//   //     if (state.mode !== 'Cool') {
//   //       console.log('Mode is not Cool, no temperature update');
//   //       return;
//   //     }

//   //     // If mode is 'Cool', proceed to update the temperature
//   //     debouncedSetTemperature(newTemperature);
//   //     console.log('Temperature updated to:', newTemperature);
//   //   },
//   //   [debouncedSetTemperature, state.mode] // Include 'mode' in the dependency array
//   // );

//   const handleChange = useMemo(
//     () =>
//       debounce(async newTemperature => {
//         // Exit early if mode is not 'Cool'
//         if (state.mode !== 'Cool') {
//           console.log('Mode is not Cool, no temperature update');
//           return;
//         }

//         let param = 'Temperature';
//         let token = await AsyncStorage.getItem('AccessToken');
//         featuresContolFunction(token, nodeid, param, newTemperature);

//         console.log(nodeid, 'Temperature updated to:', newTemperature);
//       }, 300), // Adjust the delay time (in milliseconds) as needed
//     [state.mode, nodeid],
//   );

//   const featuresContolFunction = async (
//     token,
//     nodeid,
//     param,
//     newTemperature,
//   ) => {
//     let key = 'AC';
//     // let param = 'Temperature';
//     // let token = await AsyncStorage.getItem('AccessToken');
//     try {
//       let response = await featuresContol(
//         key,
//         token,
//         nodeid,
//         param,
//         newTemperature,
//       );
//       console.log(response, 'response @@@@@@@@@@@@@@@@@@@@@@@@@');
//       setState(prevState => ({...prevState, temperature: newTemperature}));
//     } catch (err) {
//       console.log(err.response.data, 'error');
//     }
//   };

//   // const debouncedSetTemperature = async newTemperature => {
//   //   let key = 'AC';
//   //   let param = 'Temperature';
//   //   let token = await AsyncStorage.getItem('AccessToken');
//   //   try {
//   //     let response = await featuresContol(
//   //       key,
//   //       token,
//   //       nodeid,
//   //       param,
//   //       newTemperature,
//   //     );
//   //     setState(prevState => ({...prevState, temperature: newTemperature}));
//   //   } catch (err) {
//   //     console.log(err.response.data, 'error');
//   //   }
//   // };

//   const debouncedSetTemperature = debounce(async newTemperature => {
//     let key = 'AC';
//     let param = 'Temperature';
//     let token = await AsyncStorage.getItem('AccessToken');
//     try {
//       let response = await featuresContol(
//         key,
//         token,
//         nodeid,
//         param,
//         newTemperature,
//       );
//       console.log('Temperature +++++++++++++++++');

//       setState(prevState => ({...prevState, temperature: newTemperature}));
//     } catch (err) {
//       console.log(err.response.data, 'error');
//     }
//   }, 300);

//   const getImageSource = useCallback(() => {
//     if (state.temperature >= 16 && state.temperature <= 19) {
//       return require('../../assets/AcFetuerScreento.png');
//     } else if (state.temperature >= 20 && state.temperature <= 23) {
//       return require('../../assets/AcFetuerScreenthr.png');
//     } else if (state.temperature >= 24 && state.temperature <= 27) {
//       return require('../../assets/AcFetuerScreenfir.png');
//     } else {
//       return require('../../assets/AcFetuerScreenfive.png');
//     }
//   }, [state.temperature]);

//   let imageSwitchMode = useMemo(
//     () => (
//       <Image
//         style={{width: 38, height: 38, resizeMode: 'contain'}}
//         source={state.Power ? highGrayImg : highBlueImg}
//       />
//     ),
//     [state.Power],
//   );

//   let displayMode = useMemo(
//     () => (
//       <Image
//         source={state.display ? displayShow : displayHide}
//         style={{width: 90, height: 38}}
//       />
//     ),
//     [state.display],
//   );

//   const onRefresh = useCallback(() => {
//     setState(prevState => ({...prevState, refresh: true}));
//     setTimeout(() => {
//       NodeIdFetch(nodeid);
//       setState(prevState => ({...prevState, refresh: false}));
//     }, 2000);
//   }, [nodeid]);
//   const SwitchModeSelected = useCallback(
//     async (Power, State) => {
//       let token = await AsyncStorage.getItem('AccessToken');
//       const key = 'Power';
//       try {
//         let response = await switchButton(State, token, nodeid, !Power, key);
//         setState(prevState => ({...prevState, Power: !prevState.Power}));
//       } catch (err) {
//         console.log(err.response.data, 'errerr');
//       }
//     },
//     [nodeid],
//   );

//   const displayModeSelected = useCallback(
//     async display => {
//       let token = await AsyncStorage.getItem('AccessToken');
//       try {
//         let response = await displayButton(token, nodeid, !display);
//         setState(prevState => ({...prevState, display: !prevState.display}));
//       } catch (err) {
//         console.log(err.response.data, 'errerr');
//       }
//     },
//     [nodeid],
//   );

//   useEffect(() => {
//     // fetchAll();
//     const filteredFeature = acFeature.filter(feature => {
//       return feature && feature.alldata && feature.alldata.id === nodeid;
//     });

//     if (filteredFeature.length > 0) {
//       console.log(filteredFeature[0].alldata.role, '|||||||||||||||');

//       const nodeDetails = filteredFeature[0].alldata.params.AC;
//       console.log(nodeDetails.AC5in1, 'wmValue');
//       const AcRole = filteredFeature[0].alldata.role;
//       console.log(AcRole, 'acParamsacParamsacParamsacParams');

//       setState(prevState => ({
//         ...prevState,
//         role: AcRole.role || prevState.role,
//         name: nodeDetails.Name || prevState.name,
//         Power: nodeDetails.Power || prevState.Power,
//         display: nodeDetails.Display || prevState.display,
//         mode: nodeDetails.Mode || prevState.mode,
//         Fan: nodeDetails['Fan Speed'] || prevState.Fan,
//         convert: nodeDetails.AC5in1 || prevState.converrt,
//         energySaving: nodeDetails.EnergySaving || prevState.energtSaving,
//         silent: nodeDetails.IndoorNoise || prevState.silent,
//         hygiene: nodeDetails.Hygiene || prevState.hygine,
//         sleep: nodeDetails.Sleep || prevState.sleep,
//         turbo: nodeDetails.Turbo || prevState.turbo,
//         swing: nodeDetails.Swing || prevState.swing,
//         swingH: nodeDetails.SwingH || prevState.swingH,
//         temperature: nodeDetails.Temperature || prevState.temperature,
//       }));
//     } else {
//       console.log('No feature found with the matching ID');
//     }
//   }, [acFeature, nodeid]);

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: '#F1F1ED'}}>
//       {/* <ScrollView
//         refreshControl={
//           <RefreshControl
//             refreshing={state.refresh}
//             onRefresh={onRefresh}
//             tintColor={'red'}
//           />
//         } */}
//       {/* style={{backgroundColor: '#fff', height: '100%'}}
//         showsVerticalScrollIndicator={false}> */}
//       <ImageBackground source={getImageSource()} style={styles.backgrounfImage}>
//         <View style={{}}>
//           {/* <View style={styles.layoutTop}>
//             <Pressable
//               style={{
//                 height: 50,
//                 width: 50,
//                 borderRadius: 100,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//               onPress={() => navigation.goBack()}>
//               <AntDesign name="arrowleft" size={24} color="black" />
//             </Pressable>

//             <View style={styles.textLayout}>
//               <Text style={styles.textStyle}>{state.name}</Text>
//             </View>
//           </View> */}
//           <View>
//             <InsideHeader
//               title={state.name}
//               onBackPress={() => navigation.goBack()} // Set your back action here
//             />
//           </View>

//           <View>
//             <Image
//               style={styles.image}
//               source={require('../../assets/acimg.png')}
//             />
//           </View>
//         </View>

//         <View
//           style={{
//             flexDirection: 'row',

//             justifyContent: 'space-between',

//             alignItems: 'center',
//             width: '100%',
//             height: '15%',
//             // marginTop: 26,
//           }}>
//           <TouchableOpacity
//             onPress={() => {
//               const State = 'AC';
//               SwitchModeSelected(state.Power, State);
//             }}
//             style={{marginHorizontal: 8}}>
//             {imageSwitchMode}
//             <View>
//               <Image
//                 style={{
//                   position: 'absolute',
//                   height: 20,
//                   marginTop: 140,
//                   marginHorizontal: 60,
//                   resizeMode: 'contain',
//                 }}
//                 source={require('../../assets/weather.png')}
//               />
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => {
//               displayModeSelected(state.display);
//             }}
//             style={{marginHorizontal: 8}}>
//             {displayMode}
//             <Image
//               style={{
//                 position: 'absolute',
//                 height: 20,
//                 marginTop: 175,
//                 resizeMode: 'contain',
//               }}
//               source={require('../../assets/fire.png')}
//             />
//           </TouchableOpacity>
//         </View>

//         {state.mode === 'Dry' ||
//         state.mode === 'Fan' ||
//         state.mode === 'Auto' ? (
//           ''
//         ) : (
//           <View
//             style={{
//               // alignItems: 'center',

//               // justifyContent: 'center',
//               width: '100%',
//               // backgroundColor: 'red',
//               height: '50%',
//               // marginBottom:50
//             }}>
//             <View
//               style={{
//                 height: 160,
//                 position: 'absolute',
//                 overflow: 'hidden',
//                 alignItems: 'center',
//                 width: '100%',
//                 // justifyContent: 'center',
//               }}>
//               <Image
//                 style={{
//                   position: 'absolute',
//                   width: '100%',
//                   height: 210,
//                   resizeMode: 'contain',
//                 }}
//                 source={require('../../assets/SliderPng.png')}
//               />
//               <RadialSlider
//                 value={state.temperature}
//                 min={16}
//                 max={31}
//                 onChange={handleChange}
//                 radius={90}
//                 unit="°C"
//                 thumbRadius={12}
//                 thumbColor="#2E73D3"
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
//                 isHideTailText
//                 isHideSlider={state.Power ? false : true}
//               />
//             </View>
//           </View>
//         )}
//       </ImageBackground>

//       <View
//         style={{
//           flex: 1,
//           height: '100%',
//           color: '#0000000D',
//           width: '100%',
//           paddingHorizontal: 20,
//           // backgroundColor: 'red',
//           paddingVertical: 20,
//         }}>
//         <View
//           style={{
//             flexDirection: 'row',

//             alignItems: 'center',

//             justifyContent: 'space-around',

//             // paddingVertical: 10,
//           }}>
//           <View>
//             {state.mode === 'Auto' ||
//             state.mode === 'Fan' ||
//             state.mode === 'Dry' ? (
//               <View>
//                 <Text></Text>
//               </View>
//             ) : (
//               <TouchableOpacity
//                 onPress={() => {
//                   if (state.Power) {
//                     // decNumber(state.temperature);
//                     decNumber();
//                   } else {
//                     alert('AC Power Off');
//                   }
//                 }}
//                 style={{marginHorizontal: 8}}>
//                 <Image
//                   source={require('../../assets/iconBOTOOM.png')}
//                   style={{width: 40, height: 40, resizeMode: 'contain'}}
//                 />
//               </TouchableOpacity>
//             )}
//           </View>

//           <View
//             style={{
//               borderRadius: 10,
//               alignItems: 'center',
//               paddingVertical: 11,
//               paddingHorizontal: 30,
//               backgroundColor: '#FFF',
//               marginTop: 10,
//             }}>
//             <Text
//               style={{
//                 fontWeight: 'bold',
//                 fontSize: 14,
//                 color: '#636362',
//                 textTransform: 'uppercase',
//               }}>
//               {state.mode ? state.mode : 'auto'}
//             </Text>
//           </View>

//           <View>
//             {state.mode === 'Auto' ||
//             state.mode === 'Fan' ||
//             state.mode === 'Dry' ? (
//               <View>
//                 <Text></Text>
//               </View>
//             ) : (
//               <TouchableOpacity
//                 onPress={() => {
//                   if (state.Power) {
//                     // inNumber(state.temperature);
//                     inNumber();
//                   } else {
//                     alert('AC Power Off');
//                   }
//                 }}
//                 style={{marginHorizontal: 8}}>
//                 <Image
//                   source={require('../../assets/iconTOP.png')}
//                   style={{width: 40, height: 40, resizeMode: 'contain'}}
//                 />
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>

//         {/* 2nd  row */}

//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             paddingVertical: 15,
//             marginTop: 30,
//           }}>
//           {state.mode === 'Dry' || state.Power === false ? (
//             <TouchableOpacity
//               onPress={() => {
//                 if (state.Power === false) {
//                   alert('AC Power off');
//                   return;
//                 }
//                 if (state.mode === 'Dry') {
//                   alert("Fan Speed cannot be chnaged in 'Dry' mode");
//                   return;
//                 }
//               }}
//               style={{marginHorizontal: 3}}>
//               <Image
//                 source={require('../../assets/iconFAN.png')}
//                 style={{width: 70, height: 70, resizeMode: 'contain'}}
//               />
//             </TouchableOpacity>
//           ) : (
//             <View style={{marginHorizontal: 8}}>
//               <AcFanScreen
//                 {...props}
//                 id={props.route.params.data.item.alldata.id}
//                 Fan={state.Fan}
//                 mode={state.mode}
//                 setFan={newValue =>
//                   setState(prev => ({...prev, fan: newValue}))
//                 }
//               />
//             </View>
//           )}

//           {state.Power === false ? (
//             <TouchableOpacity
//               onPress={() => {
//                 if (state.Power === false) {
//                   alert('AC Power off');
//                 }
//               }}
//               style={{marginHorizontal: 3}}>
//               <Image
//                 source={require('../../assets/acmode.png')}
//                 style={{width: 70, height: 70, resizeMode: 'contain'}}
//               />
//             </TouchableOpacity>
//           ) : (
//             <View style={{marginHorizontal: 8}}>
//               <AcModeScreen
//                 {...props}
//                 id={props.route.params.data.item.alldata.id}
//                 mode={state.mode}
//                 setmode={newValue =>
//                   setState(prev => ({...prev, mode: newValue}))
//                 }
//               />
//             </View>
//           )}

//           <View style={{marginHorizontal: 8}}>
//             <AcFunctionScreen
//               {...props}
//               id={props.route.params.data.item.alldata.id}
//               turbo={state.turbo}
//               sleep={state.sleep}
//               hygine={state.hygine}
//               silent={state.silent}
//               energtSaving={state.energtSaving}
//               mode={state.mode}
//             />
//           </View>

//           <View style={{marginHorizontal: 8}}>
//             <AcGraphScreem
//               {...props}
//               id={props.route.params.data.item.alldata.id}
//             />
//           </View>
//         </View>

//         {/* 3rd row */}

//         <View
//           style={{
//             flexDirection: 'row',

//             alignItems: 'center',

//             justifyContent: 'space-between',

//             paddingVertical: 20,
//           }}>
//           <View style={{marginHorizontal: 8}}>
//             <AcDignoseScreen
//               {...props}
//               id={props.route.params.data.item.alldata.id}
//             />
//           </View>

//           <View style={{marginHorizontal: 8}}>
//             <AcFilterScreen
//               {...props}
//               id={props.route.params.data.item.alldata.id}
//             />
//           </View>

//           <View style={{marginHorizontal: 8}}>
//             <TouchableOpacity
//               style={{
//                 width: 60,

//                 height: 60,

//                 borderRadius: 10,

//                 backgroundColor: '#000',

//                 justifyContent: 'center',

//                 alignItems: 'center',
//               }}
//               onPress={() => {
//                 navigation.navigate('TimerScreen', {
//                   ...props,
//                   id: props.route.params.data.item.alldata.id,
//                   uname: state.name,
//                   Upower: state.Power,
//                   temperature: state.temperature,
//                 });
//               }}>
//               <Image
//                 source={require('../../assets/iconTIME.png')}
//                 style={{width: 70, height: 70, resizeMode: 'contain'}}
//               />
//             </TouchableOpacity>
//           </View>

//           <View style={{marginHorizontal: 8}}>
//             <AcSwingScreen
//               {...props}
//               id={props.route.params.data.item.alldata.id}
//               swing={state.swing}
//               swingH={state.swingH}
//               SetSwing={newValue =>
//                 setState(prev => ({...prev, swing: newValue, swingH: newValue}))
//               }
//             />
//           </View>
//         </View>

//         <View
//           style={{
//             flexDirection: 'row',

//             alignItems: 'center',
//             justifyContent: 'space-between',
//             paddingVertical: 20,
//             // width: '100%',
//             // backgroundColor: 'red',
//           }}>
//           {state.Power === false ||
//           state.mode === 'Auto' ||
//           state.mode === 'Fan' ||
//           state.mode === 'Heat' ||
//           state.mode === 'Dry' ? (
//             <TouchableOpacity
//               onPress={() => {
//                 if (state.Power === false) {
//                   alert('AC Power off');
//                   return;
//                 }
//                 if (state.mode !== 'Cool') {
//                   alert("Please enable 'Cool' mode to use 5 IN 1 Convert");
//                   return;
//                 }
//               }}
//               style={{marginHorizontal: 6}}>
//               <Image
//                 source={require('../../assets/iconCONVERTIBLE.png')}
//                 style={{width: 70, height: 70, resizeMode: 'contain'}}
//               />
//             </TouchableOpacity>
//           ) : (
//             <View style={{marginHorizontal: 8}}>
//               <AcConvertibleScreen
//                 {...props}
//                 id={props.route.params.data.item.alldata.id}
//                 converrt={state.converrt}
//               />
//             </View>
//           )}

//           <View style={{marginHorizontal: 8}}>
//             <TouchableOpacity
//               style={{
//                 width: 60,

//                 height: 60,

//                 borderRadius: 10,

//                 backgroundColor: '#000',

//                 justifyContent: 'center',

//                 alignItems: 'center',
//               }}
//               onPress={() => {
//                 navigation.navigate('AcEcoScreen', {
//                   ...props,
//                   id: props.route.params.data.item.alldata.id,
//                   uname: state.name,
//                   role: state.role,
//                   key: 'AC',
//                 });
//               }}>
//               <Image
//                 source={require('../../assets/acshare.png')}
//                 style={{width: 70, height: 70, resizeMode: 'contain'}}
//               />
//             </TouchableOpacity>
//           </View>
//           <View style={{marginHorizontal: 8}}>
//             <TouchableOpacity
//               style={{
//                 width: 60,

//                 height: 60,

//                 borderRadius: 10,

//                 // backgroundColor: '#fff',

//                 justifyContent: 'center',

//                 alignItems: 'center',
//               }}
//               // onPress={() => {
//               //   navigation.navigate('AcEcoScreen', {
//               //     ...props,
//               //     id: props.route.params.data.item.alldata.id,
//               //     uname: state.name,
//               //   });
//               // }}
//             >
//               {/* <Image
//                   source={require('../../assets/acshare.png')}
//                   style={{width: 70, height: 70, resizeMode: 'contain'}}
//                 /> */}
//             </TouchableOpacity>
//           </View>
//           <View style={{marginHorizontal: 8}}>
//             <TouchableOpacity
//               style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: 10,
//                 // backgroundColor: '#fff',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//               // onPress={() => {
//               //   navigation.navigate('AcEcoScreen', {
//               //     ...props,
//               //     id: props.route.params.data.item.alldata.id,
//               //     uname: state.name,
//               //   });
//               // }}
//             >
//               {/* <Image
//                   source={require('../../assets/acshare.png')}
//                   style={{width: 70, height: 70, resizeMode: 'contain'}}
//                 /> */}
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       {/* <Text>AcFeatureScreen</Text> */}
//       {/* </ScrollView> */}
//     </SafeAreaView>
//   );
// };

// export default AcFeatureScreen;

// const styles = StyleSheet.create({
//   backgrounfImage: {
//     width: '100%',

//     height: 350,

//     resizeMode: 'contain',
//   },

//   image: {
//     width: '100%',

//     height: 90,

//     resizeMode: 'contain',

//     // marginTop: 28,
//     // backgroundColor:'red'
//   },

//   Iconimage: {
//     width: '100%',

//     height: 20,

//     resizeMode: 'contain',
//   },

//   layoutTop: {
//     flexDirection: 'row',
//     // marginTop: 12,
//     // backgroundColor:'red'
//   },

//   textLayout: {
//     flex: 1,
//     justifyContent: 'center',
//   },

//   textStyle: {
//     fontSize: 18,

//     color: '#F1F1ED',

//     fontWeight: '500',

//     justifyContent: 'center',
//   },
// });

import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  Pressable,
  Dimensions,
} from 'react-native';

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Circle, Svg} from 'react-native-svg';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AcFanScreen from './AcFanScreen';
import AcModeScreen from './AcModeScreen';
import AcFunctionScreen from './AcFunctionScreen';
import AcGraphScreem from './AcGraphScreem';
import AcDignoseScreen from './AcDignoseScreen';
import AcFilterScreen from './AcFilterScreen';
import AcSwingScreen from './AcSwingScreen';
import AcConvertibleScreen from './AcConvertibleScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FeacturAC, featuresContol} from '../../Context/API';
import {displayButton, switchButton} from '../../Context/API';
import {ScrollView} from 'react-native';
import {RadialSlider} from 'react-native-radial-slider';
import {UserContext} from '../../Context/UserContext';
const highGrayImg = require('../../assets/poweron.png');
const highBlueImg = require('../../assets/poweroff.png');
const displayHide = require('../../assets/displayico.png');
const displayShow = require('../../assets/iconDISPLAY.png');
const {height, width} = Dimensions.get('window');
const AcFeatureScreen = props => {
  const {navigation} = props;

  const {acFeature, fetchAll} = useContext(UserContext);

  const nodeid = props.route.params.data.item.alldata.id;

  const [state, setState] = useState({
    refresh: false,
    role: '',
    name: '',
    Power: '',
    display: '',
    mode: '',
    Fan: '',
    converrt: '',
    energtSaving: '',
    silent: '',
    hygine: '',
    sleep: '',
    turbo: '',
    swing: '',
    swingH: '',
    temperature: '',
  });

  const debounce = useCallback((func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }, []);

  const decNumber = () => {
    if (state.temperature > 16) {
      // Decrement the temperature and pass the value to debouncedSetTemperature
      debouncedSetTemperature(state.temperature - 1);
      // setState(prevState => ({...prevState, temperature: state.temperature - 1}));
    } else {
      console.log(state.temperature, 'min_value');
      alert('Minimum Temperature is 16');
    }
  };

  // Increment temperature
  const inNumber = () => {
    if (state.temperature < 31) {
      // Increment the temperature and pass the value to debouncedSetTemperature
      debouncedSetTemperature(state.temperature + 1);
      // handleChange(state.temperature + 1)
      // setState(prevState => ({...prevState, temperature: state.temperature + 1}));
    } else {
      alert('Maximum Temperature is 31');
    }
  };

  const handleChange = useMemo(
    () =>
      debounce(async newTemperature => {
        // Exit early if mode is not 'Cool'
        if (state.mode !== 'cool') {
          console.log('Mode is not Cool, no temperature update');
          return;
        }

        let param = 'Temperature';
        let token = await AsyncStorage.getItem('AccessToken');
        featuresContolFunction(token, nodeid, param, newTemperature);
      }, 300), // Adjust the delay time (in milliseconds) as needed
    [state.mode, nodeid],
  );

  const featuresContolFunction = async (
    token,
    nodeid,
    param,
    newTemperature,
  ) => {
    let key = 'AC';
    // let param = 'Temperature';
    // let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await featuresContol(
        key,
        token,
        nodeid,
        param,
        newTemperature,
      );
      setState(prevState => ({...prevState, temperature: newTemperature}));
    } catch (err) {
      console.log(err.response.data, 'error');
    }
  };

  const debouncedSetTemperature = debounce(async newTemperature => {
    let key = 'AC';
    let param = 'Temperature';
    let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await featuresContol(
        key,
        token,
        nodeid,
        param,
        newTemperature,
      );

      setState(prevState => ({...prevState, temperature: newTemperature}));
    } catch (err) {
      console.log(err.response.data, 'error');
    }
  }, 300);

  // const getImageSource = useCallback(() => {
  //   if (state.temperature >= 16 && state.temperature <= 19) {
  //     return require('../../assets/AcFetuerScreento.png');
  //   } else if (state.temperature >= 20 && state.temperature <= 23) {
  //     return require('../../assets/AcFetuerScreenthr.png');
  //   } else if (state.temperature >= 24 && state.temperature <= 27) {
  //     return require('../../assets/AcFetuerScreenfir.png');
  //   } else {
  //     return require('../../assets/AcFetuerScreenfive.png');
  //   }
  // }, [state.temperature]);

  let imageSwitchMode = useMemo(
    () => (
      <Image
        style={{width: 38, height: 38, resizeMode: 'contain'}}
        source={state.Power ? highGrayImg : highBlueImg}
      />
    ),
    [state.Power],
  );

  let displayMode = useMemo(
    () => (
      <Image
        source={state.display ? displayShow : displayHide}
        style={{width: 90, height: 38}}
      />
    ),
    [state.display],
  );

  const onRefresh = useCallback(() => {
    setState(prevState => ({...prevState, refresh: true}));
    setTimeout(() => {
      NodeIdFetch(nodeid);
      setState(prevState => ({...prevState, refresh: false}));
    }, 2000);
  }, [nodeid]);
  const SwitchModeSelected = useCallback(
    async (Power, State) => {
      let token = await AsyncStorage.getItem('AccessToken');
      const key = 'Power';
      try {
        let response = await switchButton(State, token, nodeid, !Power, key);
        setState(prevState => ({...prevState, Power: !prevState.Power}));
      } catch (err) {
        console.log(err.response.data, 'errerr');
      }
    },
    [nodeid],
  );

  const displayModeSelected = useCallback(
    async display => {
      let token = await AsyncStorage.getItem('AccessToken');
      try {
        let response = await displayButton(token, nodeid, !display);
        setState(prevState => ({...prevState, display: !prevState.display}));
      } catch (err) {
        console.log(err.response.data, 'errerr');
      }
    },
    [nodeid],
  );

  useEffect(() => {
    // fetchAll();
    const filteredFeature = acFeature.filter(feature => {
      return feature && feature.alldata && feature.alldata.id === nodeid;
    });

    if (filteredFeature.length > 0) {
      const nodeDetails = filteredFeature[0].alldata.params.AC;
      const AcRole = filteredFeature[0].alldata.role;

      setState(prevState => ({
        ...prevState,
        role: AcRole.role || prevState.role,
        name: nodeDetails.Name || prevState.name,
        Power: nodeDetails.Power || prevState.Power,
        display: nodeDetails.Display || prevState.display,
        mode:
          nodeDetails.Mode === 'fan-only'
            ? 'Fan'
            : nodeDetails.Mode || prevState.mode,
        Fan: nodeDetails['Fan Speed'] || prevState.Fan,
        convert: nodeDetails.AC5in1 || prevState.converrt,
        energySaving: nodeDetails.EnergySaving || prevState.energtSaving,
        silent: nodeDetails.IndoorNoise || prevState.silent,
        hygiene: nodeDetails.Hygiene || prevState.hygine,
        sleep: nodeDetails.Sleep || prevState.sleep,
        turbo: nodeDetails.Turbo || prevState.turbo,
        swing: nodeDetails.Swing || prevState.swing,
        swingH: nodeDetails.SwingH || prevState.swingH,
        temperature: nodeDetails.Temperature || prevState.temperature,
      }));
    } else {
      console.log('No feature found with the matching ID');
    }
  }, [acFeature, nodeid]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={state.refresh}
            onRefresh={onRefresh}
            tintColor={'red'}
          />
        } */}
      {/* style={{backgroundColor: '#fff', height: '100%'}}
        showsVerticalScrollIndicator={false}> */}
        <View style={styles.backgrounfImage}>
          <View style={{}}>
            <View style={styles.layoutTop}>
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

              <View style={styles.textLayout}>
                <Text style={styles.textStyle}>{state.name}</Text>
              </View>
            </View>

            <View>
              <Image
                style={styles.image}
                source={require('../../assets/acimg.png')}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',

              justifyContent: 'space-between',

              alignItems: 'center',
              width: '100%',
              height: '15%',
              marginTop: 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                paddingHorizontal: 8,
              }}>
              <TouchableOpacity
                onPress={() => {
                  const State = 'AC';
                  SwitchModeSelected(state.Power, State);
                }}
                style={{marginTop: 50}}>
                {imageSwitchMode}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  displayModeSelected(state.display);
                }}
                style={{marginTop: 50}}>
                {displayMode}
              </TouchableOpacity>
            </View>
            {/* <View>
            <Image
              style={styles.coldImage}
              source={require('../../assets/cold.png')}
            />
          </View>
          <View>
            <Image
              style={styles.fireImage}
              source={require('../../assets/fire.png')}
            />
          </View> */}
          </View>

          {state.mode === 'Dry' ||
          state.mode === 'Fan' ||
          state.mode === 'Auto' ? (
            ''
          ) : (
            <View
              style={{
                // alignItems: 'center',

                // justifyContent: 'center',
                width: '100%',
                // backgroundColor: 'red',
                height: '50%',
                // marginBottom:50
              }}>
              <View
                style={{
                  height: 160,
                  position: 'absolute',
                  overflow: 'hidden',
                  alignItems: 'center',
                  width: '100%',
                  // justifyContent: 'center',
                }}>
                <Image
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: 210,
                    resizeMode: 'contain',
                  }}
                  source={require('../../assets/SliderPng.png')}
                />
                <RadialSlider
                  value={state.temperature}
                  min={16}
                  max={31}
                  onChange={handleChange}
                  radius={90}
                  unit="°C"
                  thumbRadius={12}
                  thumbColor="#2E73D3"
                  thumbBorderWidth={2}
                  thumbBorderColor="#fff"
                  // markerLineSize={30}
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
                  isHideTailText
                  isHideSlider={state.Power ? false : true}
                />
              </View>
            </View>
          )}
        </View>

<ScrollView>
        <View
          style={{
            flex: 1,
            height: '100%',
            color: '#0000000D',
            width: '100%',
            paddingHorizontal: 25,
            backgroundColor: '#F1F1ED',
            paddingVertical: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',

              alignItems: 'center',

              justifyContent: 'space-around',

              // paddingVertical: 10,
            }}>
            <View>
              {state.mode === 'Auto' ||
              state.mode === 'Fan' ||
              state.mode === 'Dry' ? (
                <View>
                  <Text></Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    if (state.Power) {
                      // decNumber(state.temperature);
                      decNumber();
                    } else {
                      alert('AC Power Off');
                    }
                  }}
                  style={{marginHorizontal: 8}}>
                  <Image
                    source={require('../../assets/iconBOTOOM.png')}
                    style={{width: 55, height: 55, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
              )}
            </View>

            <View
              style={{
                borderRadius: 10,
                alignItems: 'center',
                paddingVertical: 15,
                paddingHorizontal: 30,
                backgroundColor: '#FFF',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: '#636362',
                  textTransform: 'uppercase',
                }}>
                {state.mode ? state.mode : 'auto'}
              </Text>
            </View>

            <View>
              {state.mode === 'Auto' ||
              state.mode === 'Fan' ||
              state.mode === 'Dry' ? (
                <View>
                  <Text></Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    if (state.Power) {
                      // inNumber(state.temperature);
                      inNumber();
                    } else {
                      alert('AC Power Off');
                    }
                  }}
                  style={{marginHorizontal: 8}}>
                  <Image
                    source={require('../../assets/iconTOP.png')}
                    style={{width: 55, height: 70, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* 2nd  row */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 20,
            }}>
            {state.mode === 'Dry' || state.Power === false ? (
              <TouchableOpacity
                onPress={() => {
                  if (state.Power === false) {
                    alert('AC Power off');
                    return;
                  }
                  if (state.mode === 'Dry') {
                    alert("Fan Speed cannot be chnaged in 'Dry' mode");
                    return;
                  }
                }}
                style={{marginHorizontal: 3}}>
                <Image
                  source={require('../../assets/iconFAN.png')}
                  style={{width: 70, height: 70, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            ) : (
              <View style={{marginHorizontal: 8}}>
                <AcFanScreen
                  {...props}
                  id={props.route.params.data.item.alldata.id}
                  Fan={state.Fan}
                  mode={state.mode}
                  setFan={newValue =>
                    setState(prev => ({...prev, fan: newValue}))
                  }
                />
              </View>
            )}

            {state.Power === false ? (
              <TouchableOpacity
                onPress={() => {
                  if (state.Power === false) {
                    alert('AC Power off');
                  }
                }}
                style={{marginHorizontal: 3}}>
                <Image
                  source={require('../../assets/acmode.png')}
                  style={{width: 70, height: 70, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            ) : (
              <View style={{marginHorizontal: 8}}>
                <AcModeScreen
                  {...props}
                  id={props.route.params.data.item.alldata.id}
                  mode={state.mode}
                  setmode={newValue =>
                    setState(prev => ({...prev, mode: newValue}))
                  }
                />
              </View>
            )}

            <View style={{marginHorizontal: 8}}>
              <AcFunctionScreen
                {...props}
                id={props.route.params.data.item.alldata.id}
                turbo={state.turbo}
                sleep={state.sleep}
                hygine={state.hygine}
                silent={state.silent}
                energtSaving={state.energtSaving}
                mode={state.mode}
              />
            </View>

            <View style={{marginHorizontal: 8}}>
              <AcGraphScreem
                {...props}
                id={props.route.params.data.item.alldata.id}
              />
            </View>
          </View>

          {/* 3rd row */}

          <View
            style={{
              flexDirection: 'row',

              alignItems: 'center',

              justifyContent: 'space-between',

              paddingVertical: 20,
            }}>
            <View style={{marginHorizontal: 8}}>
              <AcDignoseScreen
                {...props}
                id={props.route.params.data.item.alldata.id}
              />
            </View>

            <View style={{marginHorizontal: 8}}>
              <AcFilterScreen
                {...props}
                id={props.route.params.data.item.alldata.id}
              />
            </View>

            <View style={{marginHorizontal: 8}}>
              <TouchableOpacity
                style={{
                  width: 60,

                  height: 60,

                  borderRadius: 10,

                  backgroundColor: '#000',

                  justifyContent: 'center',

                  alignItems: 'center',
                }}
                onPress={() => {
                  navigation.navigate('TimerScreen', {
                    ...props,
                    id: props.route.params.data.item.alldata.id,
                    uname: state.name,
                    Upower: state.Power,
                    temperature: state.temperature,
                  });
                }}>
                <Image
                  source={require('../../assets/iconTIME.png')}
                  style={{width: 70, height: 70, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>

            <View style={{marginHorizontal: 8}}>
              <AcSwingScreen
                {...props}
                id={props.route.params.data.item.alldata.id}
                swing={state.swing}
                swingH={state.swingH}
                SetSwing={newValue =>
                  setState(prev => ({
                    ...prev,
                    swing: newValue,
                    swingH: newValue,
                  }))
                }
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',

              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 15,
              // width: '100%',
              // backgroundColor: 'red',
            }}>
            {state.Power === false ||
            state.mode === 'Auto' ||
            state.mode === 'Fan' ||
            state.mode === 'Heat' ||
            state.mode === 'Dry' ? (
              <TouchableOpacity
                onPress={() => {
                  if (state.Power === false) {
                    alert('AC Power off');
                    return;
                  }
                  if (state.mode !== 'Cool') {
                    alert("Please enable 'Cool' mode to use 5 IN 1 Convert");
                    return;
                  }
                }}
                style={{marginHorizontal: 6}}>
                <Image
                  source={require('../../assets/iconCONVERTIBLE.png')}
                  style={{width: 70, height: 70, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            ) : (
              <View style={{marginHorizontal: 8}}>
                <AcConvertibleScreen
                  {...props}
                  id={props.route.params.data.item.alldata.id}
                  converrt={state.converrt}
                />
              </View>
            )}

            <View style={{marginHorizontal: 8}}>
              <TouchableOpacity
                style={{
                  width: 60,

                  height: 60,

                  borderRadius: 10,

                  backgroundColor: '#000',

                  justifyContent: 'center',

                  alignItems: 'center',
                }}
                onPress={() => {
                  navigation.navigate('AcEcoScreen', {
                    ...props,
                    id: props.route.params.data.item.alldata.id,
                    uname: state.name,
                    role: state.role,
                    key: 'AC',
                  });
                }}>
                <Image
                  source={require('../../assets/acshare.png')}
                  style={{width: 70, height: 70, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginHorizontal: 8}}>
              <TouchableOpacity
                style={{
                  width: 60,

                  height: 60,

                  borderRadius: 10,

                  // backgroundColor: '#fff',

                  justifyContent: 'center',

                  alignItems: 'center',
                }}
                // onPress={() => {
                //   navigation.navigate('AcEcoScreen', {
                //     ...props,
                //     id: props.route.params.data.item.alldata.id,
                //     uname: state.name,
                //   });
                // }}
              >
                {/* <Image
                  source={require('../../assets/acshare.png')}
                  style={{width: 70, height: 70, resizeMode: 'contain'}}
                /> */}
              </TouchableOpacity>
            </View>
            <View style={{marginHorizontal: 8}}>
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                  // backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                // onPress={() => {
                //   navigation.navigate('AcEcoScreen', {
                //     ...props,
                //     id: props.route.params.data.item.alldata.id,
                //     uname: state.name,
                //   });
                // }}
              >
                {/* <Image
                  source={require('../../assets/acshare.png')}
                  style={{width: 70, height: 70, resizeMode: 'contain'}}
                /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>

</ScrollView>

        {/* <Text>AcFeatureScreen</Text> */}
        {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default AcFeatureScreen;

const styles = StyleSheet.create({
  backgrounfImage: {
    width: '100%',
    backgroundColor: '#810055',
    height: 350,
    resizeMode: 'contain',
  },

  image: {
    width: '100%',

    height: 90,

    resizeMode: 'contain',

    // marginTop: 28,
    // backgroundColor:'red'
  },

  Iconimage: {
    width: '100%',

    height: 20,

    resizeMode: 'contain',
  },

  layoutTop: {
    flexDirection: 'row',
    // marginTop: 12,
    // backgroundColor:'red'
  },

  textLayout: {
    flex: 1,
    justifyContent: 'center',
  },

  textStyle: {
    fontSize: 18,

    color: '#FFFFFF',

    fontWeight: '500',

    justifyContent: 'center',
  },
  fireImage: {
    width: 20,
    height: 20,
    top: 100,
  },
  coldImage: {
    width: 20,
    height: 20,
    top: 100,
    left: 70,
  },
});
