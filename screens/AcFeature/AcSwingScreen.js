import React, {useState} from 'react';

import {
  Button,
  Image,
  Text,
  TouchableOpacity,
  View,
  // Switch,
} from 'react-native';

import Modal from 'react-native-modal';
import {Switch} from 'react-native-switch';
import LottieView from 'lottie-react-native';

import {featuresContol} from '../../Context/API';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {UserContext} from '../../Context/UserContext';
import {useEffect} from 'react';
import {useCallback} from 'react';

const AcSwingScreen = props => {
  const {navigation} = props;
  const {fetchAll} = useContext(UserContext);
  let nodeid = props.id;
  const nodeAllData = props.nodeAllData;
  // console.log(props, 'nodeid');

  // let swing = props.route.params.data.item.alldata.params.AC.Swing;

  const [isModalVisible, setModalVisible] = useState(false);

  const [isEnabled, setIsEnabled] = useState(props.swing);
  // console.log(props.swing, 'isEnabled');
  const [isEnabledH, setIsEnabledH] = useState(props.swingH);
  // console.log(isEnabledH, 'isEnabledH');
  // const toggleSwitch = param => {
  //   setIsEnabled(previousState => !previousState);

  //   let updatedIsOnEnabled = !isEnabled;

  //   featuresContolFunction(param, updatedIsOnEnabled);
  // };

  const toggleSwitch = param => {
    console.log(param, 'shubham');
    // return
    if (param === 'Swing') {
      const updatedIsEnabled = !isEnabled;
      setIsEnabled(updatedIsEnabled);
      featuresContolFunction(param, updatedIsEnabled);
    } else if (param === 'SwingH') {
      const updatedIsEnabledH = !isEnabledH;
      setIsEnabledH(updatedIsEnabledH);
      featuresContolFunction(param, updatedIsEnabledH);
    }
  };

  const featuresContolFunction = async (param, values) => {
    let key = 'AC';
    let token = await AsyncStorage.getItem('AccessToken');

    try {
      let response = await featuresContol(key, token, nodeid, param, values);

      console.log(response.data, 'response');
      nodeAllData();
    } catch (err) {
      console.log(err, 'error');
    }
  };
  useEffect(() => {
    setIsEnabled(props.swing);
    setIsEnabledH(props.swingH);
  }, [props.swing, props.swingH]);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
          setModalVisible(true);
        }}>
        <Image
          source={require('../../assets/iconswing.png')}
          style={{width: 70, height: 70, resizeMode: 'contain'}}
        />
      </TouchableOpacity>

      <Modal
        animationIn={'slideInUp'}
        animationInTiming={300}
        animationOut={'slideOutDown'}
        animationOutTiming={300}
        style={{width: '100%', marginLeft: 0, marginBottom: 0}}
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            position: 'absolute',

            bottom: 0,

            height: 350,

            backgroundColor: '#fff',

            width: '100%',

            borderTopRightRadius: 20,

            borderTopLeftRadius: 20,
          }}>
          <View style={{paddingHorizontal: 10, paddingVertical: 10, flex: 1}}>
            <View
              style={{
                margin: 8,

                flexDirection: 'row',

                alignItems: 'center',

                justifyContent: 'space-between',
              }}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: '#525968'}}>
                SWING MODE
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal:10
              }}>
              <Text
                style={{
                  fontSize: 16,
                  // fontWeight: 'bold',
                  fontWeight: '400',
                  color: isEnabled ? '#810055' : '#000',
                  textAlign: 'center',
                  // marginVertical: 10,
                }}>
                Vertical Swing
              </Text>
              <Switch
                trackColor={{false: '#D9D9D9', true: '#4D98FF12'}}
                style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
                ios_backgroundColor="#D9D9D9"
                backgroundActive={'#F9F2F6'}
                backgroundInactive={'#D9D9D9'}
                circleActiveColor={'#810055'}
                circleInActiveColor={'#FFFFFF'}
                onValueChange={() => {
                  let param = 'Swing';
                  toggleSwitch(param);
                }}
                outerCircleStyle={{marginRight: 50}}
                activeText={'On'}
                inActiveText={'Off'}
                activeTextStyle={{color: '#810055', fontWeight: '600'}}
                inactiveTextStyle={{color: '#FFFFFF', fontWeight: '600'}}
                switchLeftPx={10}
                switchRightPx={10}
                switchWidthMultiplier={2}
                value={isEnabled}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal:10
              }}>
              <Text style={{
                  fontSize: 16,
                  // fontWeight: 'bold',
                  fontWeight: '400',
                  color: isEnabledH ? '#810055' : '#000',
                  textAlign: 'center',
                  // marginVertical: 10,
                }}>Horizontal Swing</Text>
              <Switch
                trackColor={{false: '#D9D9D9', true: '#4D98FF12'}}
                style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
                ios_backgroundColor="#D9D9D9"
                backgroundActive={'#F9F2F6'}
                backgroundInactive={'#D9D9D9'}
                circleActiveColor={'#810055'}
                circleInActiveColor={'#FFFFFF'}
                onValueChange={() => {
                  let param = 'SwingH';
                  toggleSwitch(param);
                }}
                outerCircleStyle={{marginRight: 50}}
                activeText={'On'}
                inActiveText={'Off'}
                activeTextStyle={{color: '#810055', fontWeight: '600'}}
                inactiveTextStyle={{color: '#FFFFFF', fontWeight: '600'}}
                switchLeftPx={10}
                switchRightPx={10}
                switchWidthMultiplier={2}
                value={isEnabledH}
              />
            </View>
            <View style={{flex: 1}}>
              <LottieView
                // style={{marginTop: 32}}  
                source={require('../../assets/acswinganimation.json')}
                autoPlay={isEnabled || isEnabledH} // Play when either condition is true
                loop={isEnabled || isEnabledH} // Loop based on either condition
                key={`${isEnabled}-${isEnabledH}`} // Use both states as the key
              />
            </View>
          </View>
          {/* 
          <View
            style={{
              flexDirection: 'row',

              alignItems: 'center',

              justifyContent: 'center',

              width: '85%',

              margin: 26,

              padding: 6,

              backgroundColor: '#E1F5FF80',

              borderRadius: 10,
            }}>
            <View
              style={{
                backgroundColor: '#4BB6E8',

                borderColor: '#4BB6E8',

                paddingHorizontal: 17,

                paddingVertical: 5,

                borderRadius: 100,

                marginHorizontal: 8,
              }}>
              <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
                i
              </Text>
            </View>

            <View style={{}}>
              <Text style={{fontSize: 12, color: '#4BB6E8'}}>
                Control AC airflow swing
              </Text>
            </View>
          </View> */}
        </View>
      </Modal>
    </View>
  );
};

export default AcSwingScreen;

// import React, {useState} from 'react';

// import {
//   Button,
//   Image,
//   Text,
//   TouchableOpacity,
//   View,
//   // Switch,
// } from 'react-native';

// import Modal from 'react-native-modal';
// import {Switch} from 'react-native-switch';
// import LottieView from 'lottie-react-native';

// import {featuresContol} from '../../Context/API';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useContext} from 'react';
// import {UserContext} from '../../Context/UserContext';
// import {useEffect} from 'react';
// import {useCallback} from 'react';

// const AcSwingScreen = props => {
//   const {navigation} = props;
//   const {fetchAll} = useContext(UserContext);
//   let nodeid = props.id;
//   const nodeAllData = props.nodeAllData;
//   console.log(props, 'nodeid');

//   // let swing = props.route.params.data.item.alldata.params.AC.Swing;

//   const [isModalVisible, setModalVisible] = useState(false);

//   const [isEnabled, setIsEnabled] = useState(props.swingV);

//   const [isEnabledH, setIsEnabledH] = useState(props.swingH);
//   console.log(isEnabled, isEnabledH, 'shhh');
//   // const toggleSwitch = () => {
//   //   let param = 'SwingV';
//   //   setIsEnabled(previousState => !previousState);
//   //   // setIsEnabledH(previousState => !previousState);
//   //   let updatedIsOnEnabled = !isEnabled;

//   //   featuresContolFunction(param, updatedIsOnEnabled);
//   // };

//   const toggleSwitch = (param )=> {
//     console.log(param,'shubham');
//     // return
//     if (param === 'SwingV') {
//       const updatedIsEnabled = !isEnabled;
//       setIsEnabled(updatedIsEnabled);
//       featuresContolFunction(param, updatedIsEnabled);
//     } else if (param === 'SwingH') {
//       const updatedIsEnabledH = !isEnabledH;
//       setIsEnabledH(updatedIsEnabledH);
//       featuresContolFunction(param, updatedIsEnabledH);
//     }
//   };

//   const featuresContolFunction = async (param, values) => {
//     let key = 'AC';
//     let token = await AsyncStorage.getItem('AccessToken');
//     try {
//       let response = await featuresContol(key, token, nodeid, param, values);
//       console.log(response.data, 'response');
//       nodeAllData();
//     } catch (err) {
//       console.log(err, 'error');
//     }
//   };
//   useEffect(() => {
//     setIsEnabled(props.swingV);
//     setIsEnabledH(props.swingH);
//   }, [props.swingV,props.swingH]);

//   return (
//     <View style={{justifyContent: 'center', alignItems: 'center'}}>
//       <TouchableOpacity
//         style={{
//           width: 60,

//           height: 60,

//           borderRadius: 10,

//           backgroundColor: '#000',

//           justifyContent: 'center',

//           alignItems: 'center',
//         }}
//         onPress={() => {
//           setModalVisible(true);
//         }}>
//         <Image
//           source={require('../../assets/iconswing.png')}
//           style={{width: 70, height: 70, resizeMode: 'contain'}}
//         />
//       </TouchableOpacity>

//       <Modal
//         animationIn={'slideInUp'}
//         animationInTiming={300}
//         animationOut={'slideOutDown'}
//         animationOutTiming={300}
//         style={{width: '100%', marginLeft: 0, marginBottom: 0}}
//         isVisible={isModalVisible}
//         onBackdropPress={() => {
//           setModalVisible(false);
//         }}>
//         <View
//           style={{
//             position: 'absolute',

//             bottom: 0,

//             height: 350,

//             backgroundColor: '#fff',

//             width: '100%',

//             borderTopRightRadius: 20,

//             borderTopLeftRadius: 20,
//           }}>
//           <View style={{paddingHorizontal: 10, paddingVertical: 10, flex: 1}}>
//             <View
//               style={{
//                 margin: 8,

//                 flexDirection: 'row',

//                 alignItems: 'center',

//                 justifyContent: 'space-between',
//               }}>
//               <Text
//                 style={{fontSize: 16, fontWeight: 'bold', color: '#525968'}}>
//                 SWING MODE
//               </Text>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 paddingVertical:10
//               }}>
//               <Text>V-SWING</Text>
//               <Switch
//                 trackColor={{false: '#D9D9D9', true: '#4D98FF12'}}
//                 style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
//                 ios_backgroundColor="#D9D9D9"
//                 backgroundActive={'#F2F8FF'}
//                 backgroundInactive={'#D9D9D9'}
//                 circleActiveColor={'#4D98FF'}
//                 circleInActiveColor={'#FFFFFF'}
//                 outerCircleStyle={{marginRight: 50}}
//                 activeText={'On'}
//                 inActiveText={'Off'}
//                 activeTextStyle={{color: '#4D98FF', fontWeight: '600'}}
//                 inactiveTextStyle={{color: '#FFFFFF', fontWeight: '600'}}
//                 switchLeftPx={10}
//                 switchRightPx={10}
//                 switchWidthMultiplier={2}
//                 onValueChange={() => {
//                   let param = 'SwingV';
//                   toggleSwitch(param);
//                 }}
//                 // onValueChange={toggleSwitch}
//                 value={isEnabled}

//               />
//             </View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 paddingVertical: 10,
//               }}>
//               <Text>H-SWING</Text>
//               <Switch
//                 trackColor={{false: '#D9D9D9', true: '#4D98FF12'}}
//                 style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
//                 ios_backgroundColor="#D9D9D9"
//                 backgroundActive={'#F2F8FF'}
//                 backgroundInactive={'#D9D9D9'}
//                 circleActiveColor={'#4D98FF'}
//                 circleInActiveColor={'#FFFFFF'}
//                 outerCircleStyle={{marginRight: 50}}
//                 activeText={'On'}
//                 inActiveText={'Off'}
//                 activeTextStyle={{color: '#4D98FF', fontWeight: '600'}}
//                 inactiveTextStyle={{color: '#FFFFFF', fontWeight: '600'}}
//                 switchLeftPx={10}
//                 switchRightPx={10}
//                 switchWidthMultiplier={2}
//                 onValueChange={() => {
//                   let param = 'SwingH';
//                   toggleSwitch(param);
//                 }}
//                 value={isEnabledH}
//               />
//             </View>
//             <LottieView
//               style={{marginTop: 35}}
//               source={require('../../assets/acswinganimation.json')}
//               autoPlay={isEnabled}
//               loop={isEnabled}
//               key={isEnabled}
//             />
//           </View>

//           {/* <View
//             style={{
//               flexDirection: 'row',

//               alignItems: 'center',

//               justifyContent: 'center',

//               width: '85%',

//               margin: 26,

//               padding: 6,

//               backgroundColor: '#E1F5FF80',

//               borderRadius: 10,
//             }}>
//             <View
//               style={{
//                 backgroundColor: '#4BB6E8',

//                 borderColor: '#4BB6E8',

//                 paddingHorizontal: 17,

//                 paddingVertical: 5,

//                 borderRadius: 100,

//                 marginHorizontal: 8,
//               }}>
//               <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
//                 i
//               </Text>
//             </View>

//             <View style={{}}>
//               <Text style={{fontSize: 12, color: '#4BB6E8'}}>
//                 Control AC airflow swing
//               </Text>
//             </View>
//           </View> */}
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default AcSwingScreen;
