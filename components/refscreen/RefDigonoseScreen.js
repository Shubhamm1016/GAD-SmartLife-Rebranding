// import React, {useEffect, useState} from 'react';

// import {
//   Button,
//   Image,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   View,
//   ActivityIndicator,
// } from 'react-native';
// import Foundation from 'react-native-vector-icons/Foundation';
// import Entypo from 'react-native-vector-icons/Entypo';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import Modal from 'react-native-modal';
// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {FetchFilter, FilterControl} from '../../Context/API';

// const DATA = [
//   {
//     id: 0,
//     error: 'No Error',
//     errorcode: 'E0',
//   },
//   {
//     id: 1,
//     error:
//       'Your refrigerator door has been open too long. Please close the door immediately.',
//     errorcode: 'E1',
//   },
//   {
//     id: 2,
//     error: 'Display panel fault detected. Please call Customer Care ',
//     errorcode: 'E2',
//   },
//   {
//     id: 3,
//     error:
//       'Temperature sensor fault detected. Please call Customer Care . Cooling is not impacted and it is safe to store food.',
//     errorcode: 'E3PC',
//   },
//   {
//     id: 4,
//     error: `Defrost function fault detected.
//     1. Switch off the power supply and switch it on again to restart the refrigerator.
//     2. If panel continues to display E4 error, please call Customer Care.`,
//     errorcode: 'E3FCD',
//   },
//   {
//     id: 5,
//     error: `Seal system fault detected.
// 1. Switch off the power supply and then switch it on again to restart the refrigerator
// 2. If panel continues to display E5 error, please call Customer Care `,
//     errorcode: 'E3FCA',
//   },
//   {
//     id: 6,
//     error: `Low cooling fault detected.
// 1. . Switch off the power supply and then switch it on again to restart the refrigerator
// 2. If panel continues to display E7 error, please call Customer Care`,
//     errorcode: 'E4',
//   },
//   {
//     id: 7,
//     error: `Low cooling fault detected.
// 1. . Switch off the power supply and then switch it on again to restart the refrigerator
// 2. If panel continues to display E7 error, please call Customer Care`,
//     errorcode: 'E5',
//   },
//   {
//     id: 8,
//     error: `Ambient Sensor Fault
// Ambient sensor fault detected. Please call Customer Care. Cooling is not impacted and it is safe to store food.`,
//     errorcode: 'E6',
//   },
// ];

// const RefDigonoseScreen = ({id, setState, power, ErrorStatus}) => {
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [openModel, setOpenModal] = React.useState(false);
//   const [dataFetched, setDataFetched] = useState(false);

//   const [hide, setShow] = useState(false);
//   const [wmFeature, setWmFeature] = useState([]);
//   const [filterPercent, setFilterPercent] = useState([]);
//   const idToFind = filterPercent;
//   const selectedItem = DATA.find(item => item.id === idToFind);

//   const setopen = () => {
//     setOpenModal(true);
//   };
//   const filterFunctionClick = async id => {
//     let param = 'Start';
//     let values = true;
//     let token = await AsyncStorage.getItem('AccessToken');
//     try {
//       let response = await FilterControl(token, id, param, values);

//       filterFunction(id);
//       setShow(true);
//     } catch (err) {
//       console.log(err, 'error');
//     }
//   };
//   const filterFunction = async id => {
//     try {
//       let token = await AsyncStorage.getItem('AccessToken');

//       let response = await FetchFilter(token, id);

//       const newAcFeature = response.data.node_details.map(alldata => ({
//         alldata,
//       }));

//       setWmFeature(newAcFeature);
//       setDataFetched(true);
//     } catch (err) {
//       console.log(err.response?.data?.description || 'Node Details error');
//     }
//   };
//   useEffect(() => {
//     if (wmFeature.length > 0 && dataFetched) {
//       setFilterPercent(wmFeature[0].alldata.params.Refrigerator.ErrorStatus);
//     }
//   }, [wmFeature, dataFetched]);

//   return (
//     <View style={{justifyContent: 'center', alignItems: 'center'}}>
//       <TouchableOpacity
//         style={{
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//         onPress={() => {
//           if (power) {
//             setModalVisible(true);
//           } else {
//             alert('Washing Machine Power OFF,Turn On And Retry');
//             return;
//           }
//         }}>
//         <Image
//           source={require('../../assets/washingmashine/wdignose.png')}
//           style={{height: 90, width: 80, resizeMode: 'contain'}}
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

//             paddingHorizontal: 10,

//             paddingVertical: 10,
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'stretch',
//               paddingVertical: 10,
//               paddingHorizontal: 5,
//             }}>
//             <Text style={{fontSize: 16, fontWeight: 'bold', color: '#525968'}}>
//               CHECK DEVICE HEALTH
//             </Text>
//             <TouchableOpacity
//               onPress={() => {
//                 setModalVisible(false);
//                 setShow(false);
//               }}
//               style={{
//                 height: 30,
//                 width: 30,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               <Entypo name="cross" size={28} color="#525968" />
//             </TouchableOpacity>
//           </View>

//           {hide ? (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 backgroundColor: '#E1F5FF80',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 marginTop: 50,
//                 borderRadius: 5,
//                 paddingVertical: 10,
//                 paddingVertical: 20,
//                 height: 150,
//               }}>
//               {/* <Foundation name="info" size={30} color="#4BB6E8" /> */}
//               {selectedItem ? (
//                 <View
//                   style={{
//                     flex: 1,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}>
//                   <View
//                     style={{
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       borderRadius: 100,
//                       borderWidth: 1,
//                       paddingHorizontal: 10,
//                       paddingVertical: 10,
//                       backgroundColor: '#4BB6E8',
//                       borderColor: '#4BB6E8',
//                     }}>
//                     <Text> {selectedItem.errorcode}</Text>
//                   </View>

//                   <View
//                     style={{
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       paddingHorizontal: 20,
//                       paddingVertical: 20,
//                     }}>
//                     <Text style={{fontSize: 16, color: '#000'}}>
//                       Fault Details
//                     </Text>
//                   </View>
//                   <View
//                     style={{
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       paddingVertical: 20,
//                     }}>
//                     <Text style={{color: '#4BB6E8', fontSize: 16}}>
//                       {'  '}
//                       {selectedItem.error}{' '}
//                     </Text>
//                   </View>
//                 </View>
//               ) : (
//                 <View
//                   style={{
//                     //   flex: 1,
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     zIndex: 1,
//                   }}>
//                   <ActivityIndicator size="large" color="#64bbf5" />
//                 </View>
//               )}
//             </View>
//           ) : (
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: 'flex-end',
//                 alignItems: 'center',
//               }}>
//               <View style={{marginBottom: 50}}>
//                 <Text style={_styles.textStyle}>
//                   Diagnose the device issues
//                 </Text>
//               </View>

//               <TouchableOpacity
//                 onPress={() => {
//                   filterFunctionClick(id);
//                 }}>
//                 <LinearGradient
//                   colors={['#64bbf5', '#0c98f5']}
//                   style={_styles.appButtonContainer}>
//                   <Text style={_styles.appButtonText}>Start</Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default RefDigonoseScreen;

// const _styles = StyleSheet.create({
//   appButtonContainer: {
//     elevation: 2,
//     marginVertical: 26,
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     width: 350,
//   },

//   appButtonText: {
//     fontSize: 16,

//     color: '#fff',

//     fontWeight: '600',

//     alignSelf: 'center',
//   },

//   textStyle: {
//     fontSize: 14,
//     color: '#525968',
//     alignSelf: 'center',
//     marginVertical: 8,
//   },
// });


import React, {useEffect, useState} from 'react';

import {
  Button,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FetchFilter, FilterControl} from '../../Context/API';

const DATA = [
  {
    id: 0,
    error: 'No Error',
    errorcode: 'E0',
  },
  {
    id: 1,
    error:
      'Your refrigerator door has been open too long. Please close the door immediately.',
    errorcode: 'E1',
  },
  {
    id: 2,
    error: 'Display panel fault detected. Please call Customer Care ',
    errorcode: 'E2',
  },
  {
    id: 3,
    error:
      'Temperature sensor fault detected. Please call Customer Care . Cooling is not impacted and it is safe to store food.',
    errorcode: 'E3PC',
  },
  {
    id: 4,
    error: `Defrost function fault detected.
    1. Switch off the power supply and switch it on again to restart the refrigerator.
    2. If panel continues to display E4 error, please call Customer Care.`,
    errorcode: 'E3FCD',
  },
  {
    id: 5,
    error: `Seal system fault detected.
1. Switch off the power supply and then switch it on again to restart the refrigerator
2. If panel continues to display E5 error, please call Customer Care `,
    errorcode: 'E3FCA',
  },
  {
    id: 6,
    error: `Low cooling fault detected.
1. . Switch off the power supply and then switch it on again to restart the refrigerator
2. If panel continues to display E7 error, please call Customer Care`,
    errorcode: 'E4',
  },
  {
    id: 7,
    error: `Low cooling fault detected.
1. . Switch off the power supply and then switch it on again to restart the refrigerator
2. If panel continues to display E7 error, please call Customer Care`,
    errorcode: 'E5',
  },
  {
    id: 8,
    error: `Ambient Sensor Fault
Ambient sensor fault detected. Please call Customer Care. Cooling is not impacted and it is safe to store food.`,
    errorcode: 'E6',
  },
];

const RefDigonoseScreen = ({id, setState, power, ErrorStatus}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [openModel, setOpenModal] = React.useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const [hide, setShow] = useState(false);
  const [wmFeature, setWmFeature] = useState([]);
  const [filterPercent, setFilterPercent] = useState([]);
  const idToFind = filterPercent;
  const selectedItem = DATA.find(item => item.id === idToFind);  

  const setopen = () => {
    setOpenModal(true);
  };
  const filterFunctionClick = async id => {
    let param = 'Start';
    let values = true;
    let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await FilterControl(token, id, param, values);
      console.log(response,"......responseresponseresponseresponse");
      

      filterFunction(id);
      setShow(true);
    } catch (err) {
      console.log(err, 'error');
    }
  };
  const filterFunction = async id => {
    try {
      let token = await AsyncStorage.getItem('AccessToken');

      let response = await FetchFilter(token, id);

      const newAcFeature = response.data.node_details.map(alldata => ({
        alldata,
      }));
      console.log(newAcFeature,"......newAcFeaturenewAcFeaturenewAcFeaturenewAcFeature");
      

      setWmFeature(newAcFeature);
      setDataFetched(true);
    } catch (err) {
      console.log(err.response?.data?.description || 'Node Details error');
    }
  };
  useEffect(() => {
    if (wmFeature.length > 0 && dataFetched) {
      setFilterPercent(wmFeature[0].alldata.params.Refrigerator.ErrorStatus);
    }
  }, [wmFeature, dataFetched]);

  console.log(wmFeature?.[0]?.alldata?.params?.Refrigerator?.ErrorStatus, ".....ErrorStatus");
  
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          if (power) {
            setModalVisible(true);
          } else {
            alert('Washing Machine Power OFF,Turn On And Retry');
            return;
          }
        }}>
        <Image
          source={require('../../assets/washingmashine/wdignose.png')}
          style={{height: 90, width: 80, resizeMode: 'contain'}}
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

            paddingHorizontal: 10,

            paddingVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              paddingVertical: 10,
              paddingHorizontal: 5,
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#525968'}}>
              CHECK DEVICE HEALTH
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setShow(false);
              }}
              style={{
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Entypo name="cross" size={28} color="#525968" />
            </TouchableOpacity>
          </View>

          {hide ? (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#E1F5FF80',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50,
                borderRadius: 5,
                paddingVertical: 10,
                paddingVertical: 20,
                height: 150,
              }}>
              {/* <Foundation name="info" size={30} color="#4BB6E8" /> */}
              {selectedItem ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 100,
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      backgroundColor: '#4BB6E8',
                      borderColor: '#4BB6E8',
                    }}>
                    <Text> {selectedItem.errorcode}</Text>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 20,
                      paddingVertical: 20,
                    }}>
                    <Text style={{fontSize: 16, color: '#000'}}>
                      Fault Details
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 20,
                    }}>
                    <Text style={{color: '#4BB6E8', fontSize: 16}}>
                      {'  '}
                      {selectedItem.error}{' '}
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    //   flex: 1,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1,
                  }}>
                  <ActivityIndicator size="large" color="#64bbf5" />
                </View>
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <View style={{marginBottom: 50}}>
                <Text style={_styles.textStyle}>
                  Diagnose the device issues
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  filterFunctionClick(id);
                }}>
                <LinearGradient
                  colors={['#64bbf5', '#0c98f5']}
                  style={_styles.appButtonContainer}>
                  <Text style={_styles.appButtonText}>Start</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default RefDigonoseScreen;

const _styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 2,
    marginVertical: 26,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 350,
  },

  appButtonText: {
    fontSize: 16,

    color: '#fff',

    fontWeight: '600',

    alignSelf: 'center',
  },

  textStyle: {
    fontSize: 14,
    color: '#525968',
    alignSelf: 'center',
    marginVertical: 8,
  },
});