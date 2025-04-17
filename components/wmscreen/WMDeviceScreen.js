import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  ImageBackground,
  StyleSheet,
  View,
  Pressable,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WMBottomSheet from './WMFunctionScreen/WMBottomSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import {UserContext} from '../../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {switchButton} from '../../Context/API';
import WMCardModel from './WmEpModeModel';
import WMTubCleanModel from './WMTubCleanModel';
import WmEpModeModel from './WmEpModeModel';
import WmDigonoseScrren from './WmDigonoseScrren';
import AppLoder from '../../screens/AppLoder/AppLoder';
const WMDeviceScreen = props => {
  const {navigation} = props;
  const id = props.route.params.id;
  const {acFeature, fetchAll} = useContext(UserContext);
  const [isActive, setIsActive] = useState(true);
  const [isCustom, setIsCustom] = useState(true);
  const [isUv, setIsUv] = useState(true);
  const [isClose, setClose] = useState(false);
  const [setValue, SetValue] = useState('');
  const refRBSheet = useRef(null);
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const blink = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };
    blink();
  }, [opacity]);

  const toggleCustomImage = () => {
    navigation.navigate('AcEcoScreen', {
      ...props,
      id: id,
      uname: state.Name,
      role:state.role,
      key: 'WM',
    });
  };

  const toggleSilentModeImage = async (State, id) => {
    if (state.ChildLock) {
      alert('Child lock enabled');
      return;
    } else {
      let token = await AsyncStorage.getItem('AccessToken');
      const key = 'SilentMode';
      try {
        let response = await switchButton(
          State,
          token,
          id,
          !state.SilentMode,
          key,
        );
        setState(prevState => ({
          ...prevState,
          SilentMode: !prevState.SilentMode,
        }));
      } catch (err) {
        console.log(err.response.data, 'errerr');
      }
    }

    // setIsGraph(!isGraph);
  };

  const toggleChildLockImage = async (State, id) => {
    let token = await AsyncStorage.getItem('AccessToken');
    const key = 'ChildLock';
    try {
      let response = await switchButton(
        State,
        token,
        id,
        !state.ChildLock,
        key,
      );

      setState(prevState => ({
        ...prevState,
        ChildLock: !prevState.ChildLock,
      }));
    } catch (err) {
      console.log(err.response.data, 'errerr');
    }
  };

  const togglePowerImage = async (State, id) => {
    let token = await AsyncStorage.getItem('AccessToken');
    const key = 'Power';
    try {
      let response = await switchButton(State, token, id, !state.Power, key);

      setState(prevState => ({
        ...prevState,
        Power: !prevState.Power,
      }));
    } catch (err) {
      console.log(err.response.data, 'errerr');
    }
  };

  const toggleDisplayImage = async (State, id) => {

    let token = await AsyncStorage.getItem('AccessToken');
    const key = 'wmrunning';
    try {
      let response = await switchButton(
        State,
        token,
        id,
        !state.wmrunning,
        key,
      );
    
      setState(prevState => ({
        ...prevState,
        wmrunning: !prevState.wmrunning,
      }));
      fetchAll();
    } catch (err) {
      console.log(err.response.data, 'errerr');
    }
  };
  const [state, setState] = useState({
    refresh: false,
    ChildLock: '',
    role:'',
    Name: '',
    Power: '',
    ResetDevice: '',
    SilentMode: '',
    Temperature: '',
    display_status: '',
    err_status: '',
    program: '',
    timeinhr: '',
    timeinmin: '',
    timepercent: '',
    uv: '',
    wash_cycle_hygineRinse: '',
    wash_cycle_rinse: '',
    wash_cycle_soak: '',
    wash_cycle_spin: '',
    wash_cycle_superDry: '',
    wash_cycle_wash: '',
    wash_plus: '',
    water_level: '',
    wmrunning: '',
    wmstatus: '',
  });
  useEffect(() => {
    const filteredFeature = acFeature.filter(feature => {
      return feature && feature.alldata && feature.alldata.id === id;
    });

    if (filteredFeature.length > 0) {
      const wmValue = filteredFeature[0].alldata.params.WM;

      setState(wmValue);
    } else {
      console.log('No feature found with the matching ID');
    }
  }, [acFeature, id]);

  const toggleImage = program => {
    refRBSheet.current.open(program);
    setIsActive(!isActive);
  };

  console.log(state.Power,"nnnnnnn");
  

  // useEffect(() => {
  //   const intervalDuration = 1000; // 10 seconds
  //   const runDuration = 10000; // 70 seconds

  //   const intervalId = setInterval(() => {
  //     fetchAll();
  //   }, intervalDuration);

  //   const timeoutId = setTimeout(() => {
  //     clearInterval(intervalId);
  //   }, runDuration);

  //   return () => {
  //     clearInterval(intervalId);
  //     clearTimeout(timeoutId);
  //   };
  // }, [fetchAll]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1, height: '100%', backgroundColor: '#F3F3F3'}}>
        <ImageBackground
          source={require('../../assets/washingmashine/AcFetuerScreento.png')}
          style={styles.backgroundImage}>
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
                <Text style={styles.textStyle}>{state.Name}</Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: '50%',
              }}>
              <View>
                <Image
                  style={styles.image}
                  source={require('../../assets/washingmashine/wmashine.png')}
                />
              </View>
              <View
                style={{
                  height: '141%',
                  position: 'absolute',
                  overflow: 'hidden',
                  width: '100%',
                  marginTop: 105,
                }}>
                <Image
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: 265,
                    resizeMode: 'contain',
                  }}
                  source={require('../../assets/washingmashine/wslider.png')}
                />
                <View style={{alignItems: 'center', marginTop: 20}}>
                  <Text
                    style={{
                      marginTop: 42,
                      position: 'absolute',
                      alignSelf: 'center',
                      fontSize: 12, // Adjust the font size as needed
                      color: '#000',
                    }}>
                    Time Remaining
                  </Text>
                  <View style={{paddingVertical: 10}}>
                    <Text style={styles.text}>
                      {state.timeinhr}:{state.timeinmin}
                    </Text>
                    <Text style={styles.text1}>Hrs Min</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (state.ChildLock) {
                  alert('Child lock enabled');
                  return;
                } else {
                  const State = 'WM';
                  togglePowerImage(State, id);
                }
              }}
              style={{marginHorizontal: 8}}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  marginHorizontal: 30,
                  padding: 5,
                }}
                source={
                  state.Power
                    ? require('../../assets/washingmashine/poweron.png')
                    : require('../../assets/washingmashine/poweroff.png')
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (state.Power) {
                  if (state.ChildLock) {
                    alert('Child lock enabled');
                    return;
                  } else {
                    const State = 'WM';
                    toggleDisplayImage(State, id);
                  }
                } else {
                  alert('Washing Machine Power OFF, Turn On And Retry');
                }
              }}
              style={{marginHorizontal: 8}}>
              <Image
                style={{width: 40, height: 40, marginHorizontal: 30}}
                source={
                  state.wmrunning
                    ? require('../../assets/washingmashine/wbackimages.png')
                    : require('../../assets/washingmashine/wbackimage.png')
                }
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {/* <View> */}
        <View style={styles.card}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Animated.Image
              style={{
                height: 35,
                width: 35,
                resizeMode: 'contain',
                opacity:
                  state.display_status === 'soak' && state.wmrunning
                    ? opacity
                    : 1,
              }}
              source={
                state.display_status === 'soak'
                  ? require('../../assets/washingmashine/wsoaks.png')
                  : require('../../assets/washingmashine/wsoak.png')
              }
            />

            <View
              style={{
                borderWidth: 1,
                borderColor: '#CECECE',
                borderStyle: 'dotted',
                alignSelf: 'center',
                width: '10%',
              }}
            />
            <Image
              style={{
                height: 35,
                width: 35,
                resizeMode: 'contain',
              }}
              source={
                // state.display_status === 'wash'
                // ? require('../../assets/washingmashine/tempBlu.png')
                // :
                require('../../assets/washingmashine/tempBla.png')
              }
            />
            <View
              style={{
                borderWidth: 1,
                borderColor: '#CECECE',
                borderStyle: 'dotted',
                alignSelf: 'center',
                width: '10%',
              }}
            />
            <Animated.Image
              style={{
                height: 35,
                width: 35,
                resizeMode: 'contain',
                opacity:
                  state.display_status === 'wash' && state.wmrunning
                    ? opacity
                    : 1,
              }}
              source={
                state.display_status === 'wash'
                  ? require('../../assets/washingmashine/wwashs.png')
                  : require('../../assets/washingmashine/wwash.png')
              }
            />
            <View
              style={{
                borderWidth: 1,
                borderColor: '#CECECE',
                borderStyle: 'dotted',
                alignSelf: 'center',
                width: '10%',
              }}
            />
            <Animated.Image
              style={{
                height: 35,
                width: 35,
                resizeMode: 'contain',
                opacity:
                  state.display_status === 'rinse' && state.wmrunning
                    ? opacity
                    : 1,
              }}
              source={
                state.display_status == 'rinse'
                  ? require('../../assets/washingmashine/wrinses.png')
                  : require('../../assets/washingmashine/wrinse.png')
              }
            />
            <View
              style={{
                borderWidth: 1,
                borderColor: '#CECECE',
                borderStyle: 'dotted',
                alignSelf: 'center',
                width: '10%',
              }}
            />
            <Animated.Image
              style={{
                height: 35,
                width: 35,
                resizeMode: 'contain',
                opacity:
                  state.display_status === 'spin' && state.wmrunning
                    ? opacity
                    : 1,
              }}
              source={
                state.display_status === 'spin'
                  ? require('../../assets/washingmashine/wspins.png')
                  : require('../../assets/washingmashine/wspin.png')
              }
            />
          </View>
        </View>

        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (state.Power) {
                if (state.ChildLock) {
                  alert('Child lock enabled');
                  return;
                } else {
                  const pro = 1; // Selected program ID

                  SetValue(pro);
                  toggleImage(pro);
                }
              } else {
                alert('Washing Machine Power OFF, Turn On And Retry');
                return;
              }
            }}>
            <Image
              style={{height: 90, width: 80, resizeMode: 'contain'}}
              source={
                state.program === 1
                  ? require('../../assets/washingmashine/wautoactive.png')
                  : require('../../assets/washingmashine/wauto.png')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (state.Power) {
                if (state.ChildLock) {
                  alert('Child lock enabled');
                  return;
                } else {
                  const pro = 2;
                  SetValue(pro);
                  toggleImage(pro);
                }
              } else {
                alert('Washing Machine Power OFF,Turn On And Retry');
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
                state.program === 2
                  ? require('../../assets/washingmashine/wwhitess.png')
                  : require('../../assets/washingmashine/Whites.png')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (state.Power) {
                if (state.ChildLock) {
                  alert('Child lock enabled');
                  return;
                } else {
                  const pro = 3;
                  SetValue(pro);
                  toggleImage(pro);
                }
              } else {
                alert('Washing Machine Power OFF,Turn On And Retry');
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
                state.program === 3
                  ? require('../../assets/washingmashine/wrapids.png')
                  : require('../../assets/washingmashine/wrapid.png')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (state.Power) {
                if (state.ChildLock) {
                  alert('Child lock enabled');
                  return;
                } else {
                  const pro = 4;
                  SetValue(pro);
                  toggleImage(pro);
                }
              } else {
                alert('Washing Machine Power OFF,Turn On And Retry');
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
                state.program === 4
                  ? require('../../assets/washingmashine/wbulkys.png')
                  : require('../../assets/washingmashine/wbulky.png')
              }
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (state.Power) {
                if (state.ChildLock) {
                  alert('Child lock enabled');
                  return;
                } else {
                  const pro = 5;
                  SetValue(pro);
                  toggleImage(pro);
                }
              } else {
                alert('Washing Machine Power OFF,Turn On And Retry');
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
                state.program === 5
                  ? require('../../assets/washingmashine/wdelicates.png')
                  : require('../../assets/washingmashine/wdelicate.png')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (state.Power) {
                if (state.ChildLock) {
                  alert('Child lock enabled');
                  return;
                } else {
                  const pro = 6;
                  SetValue(pro);
                  toggleImage(pro);
                }
              } else {
                alert('Washing Machine Power OFF,Turn On And Retry');
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
                state.program === 6
                  ? require('../../assets/washingmashine/wwoollenss.png')
                  : require('../../assets/washingmashine/wwoolens.png')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (state.Power) {
                if (state.ChildLock) {
                  alert('Child lock enabled');
                  return;
                } else {
                  const pro = 7;
                  SetValue(pro);
                  toggleImage(pro);
                }
              } else {
                alert('Washing Machine Power OFF,Turn On And Retry');
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
                state.program === 7
                  ? require('../../assets/washingmashine/wdeepc.png')
                  : require('../../assets/washingmashine/wdeepcleanse.png')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (state.Power) {
                if (state.ChildLock) {
                  alert('Child lock enabled');
                  return;
                } else {
                  const pro = 8;
                  SetValue(pro);
                  toggleImage(pro);
                }
              } else {
                alert('Washing Machine Power OFF,Turn On And Retry');
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
                state.program === 8
                  ? require('../../assets/washingmashine/wgerams.png')
                  : require('../../assets/washingmashine/wgrem.png')
              }
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (state.Power) {
                if (state.ChildLock) {
                  alert('Child lock enabled');
                  return;
                } else {
                  const pro = 9;
                  SetValue(pro);
                  toggleImage(pro);
                }
              } else {
                alert('Washing Machine Power OFF,Turn On And Retry');
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
                state.program === 9
                  ? require('../../assets/washingmashine/wsteamw.png')
                  : require('../../assets/washingmashine/wsteam.png')
              }
            />
          </TouchableOpacity>
          <WMTubCleanModel
            state={state.program}
            power={state.Power}
            ChildLock={state.ChildLock}
            wmrunning={state.wmrunning}
            id={id}
            setState={setState}
          />

          {/* <TouchableOpacity onPress={toggleDignoseImage}>
            <Image
              style={{
                height: 90,
                width: 80,
                resizeMode: 'contain',
              }}
              source={require('../../assets/washingmashine/wdignose.png')}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
        
              navigation.navigate('SpecialProgram', {
                id: id,
                waterLevel: state.water_level,
                start: state.wmrunning,
                program: state.program,
                setState,
              });
            }}
            style={{}}>
            {/* <Image
              style={{
                height: 90,
                width: 80,
                resizeMode: 'contain',
              }}
              source={
                state.program === 12||13||14
                  ?
                require('../../assets/washingmashine/spcalprogram.png')
                :
                 require('../../assets/washingmashine/spcalprogramBlue.png')
              }
            /> */}
            <Image
              style={{
                height: 90,
                width: 80,
                resizeMode: 'contain',
              }}
              source={
                [12, 13, 14, 15, 16, 17, 18].includes(state.program)
                  ? require('../../assets/washingmashine/spcalprogramBlue.png')
                  : require('../../assets/washingmashine/spcalprogram.png')
              }
            />

            {console.log('Current program: ', state.program)}
          </TouchableOpacity>
          <WmEpModeModel
            state={state.program}
            power={state.Power}
            ChildLock={state.ChildLock}
            wmrunning={state.wmrunning}
            id={id}
            setState={setState}
          />
          {/* <WmDigonoseScrren
            power={state.Power}
            err_status={state.err_status}
            ChildLock={state.ChildLock}
            wmrunning={state.wmrunning}
            id={id}
            setState={setState}
          /> */}

          {/* <TouchableOpacity
            onPress={() => {
              toggleCustomImage();
            }}>
            <Image
              style={{
                height: 90,
                width: 80,
                resizeMode: 'contain',
              }}
              source={require('../../assets/washingmashine/Share.png')}
            />
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 10,
          }}>
          {/* <WmEpModeModel
            state={state.program}
            power={state.Power}
            ChildLock={state.ChildLock}
            wmrunning={state.wmrunning}
            id={id}
            setState={setState}
          /> */}
          <WmDigonoseScrren
            power={state.Power}
            err_status={state.err_status}
            ChildLock={state.ChildLock}
            wmrunning={state.wmrunning}
            id={id}
            setState={setState}
          />
          <TouchableOpacity
            onPress={() => {
              if (state.Power) {
                if (state.wmrunning) {
                  const State = 'WM';
                  toggleSilentModeImage(State, id);
                } else {
                  alert('Please Start Program');
                  return;
                }
              } else {
                alert('Washing Machine Power OFF,Turn On And Retry');
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
                state.SilentMode
                  ? require('../../assets/washingmashine/SilentBlue.png')
                  : require('../../assets/washingmashine/Slient.png')
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (state.Power) {
                if (state.wmrunning) {
                  const State = 'WM';
                  toggleChildLockImage(State, id);
                } else {
                  alert('Please Start Program');
                  return;
                }
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
              }}
              source={
                state.ChildLock
                  ? require('../../assets/washingmashine/wchildclocks.png')
                  : require('../../assets/washingmashine/wchildclock.png')
              }
            />
          </TouchableOpacity>
         
          <TouchableOpacity
            onPress={() => {
              toggleCustomImage();
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
        </View>
        {/* </View> */}
        <RBSheet
          ref={refRBSheet}
          height={800}
          onClose={() => {
            fetchAll();
          }}
          customStyles={{
            container: {
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            },
          }}>
          <WMBottomSheet
            isClose={isClose}
            refRBSheet={refRBSheet}
            id={id}
            start={state.wmrunning}
            timeinhr={state.timeinhr}
            timeinmin={state.timeinmin}
            select={setValue}
            program={state.program}
            soak={state.wash_cycle_soak}
            hygineRinse={state.wash_cycle_hygineRinse}
            rinse={state.wash_cycle_rinse}
            spin={state.wash_cycle_spin}
            superDry={state.wash_cycle_superDry}
            wash={state.wash_cycle_wash}
            plus={state.wash_plus}
            waterLavel={state.water_level}
            temperature={state.Temperature}
            uv={state.uv}
            setState={setState}
            setClose={setClose}
            fetchAll={fetchAll}
          />
        </RBSheet>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  text: {
    marginTop: 62,
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 25, // Adjust the font size as needed
    color: '#000', // Change the color as needed
    fontWeight: 'bold',
  },
  text1: {
    marginTop: 95,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'space-between',
    fontSize: 12, // Adjust the font size as needed
    color: '#000', // Change the color as needed
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderColor: '#CECECE',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  layoutTop: {
    flexDirection: 'row',
  },
  backgroundImage: {
    width: '100%',

    height: 290,

    resizeMode: 'contain',
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
  image: {
    width: '100%',
    top: 20,
    height: 222,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  container1: {
    flex: 1,
  },
  imageContainer1: {
    alignItems: 'center',
  },
  imageWrapper1: {
    position: 'absolute',
    width: 125, // half of the image width
    height: 250,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  image1: {
    width: 250,
    height: 250,
    borderRadius: 125, // half of the image width
    backgroundColor: 'transparent',
  },
});

export default WMDeviceScreen;
