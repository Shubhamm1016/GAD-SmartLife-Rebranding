import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {switchButton} from '../../../Context/API';

const SpecialProgramStart = props => {
  // console.log(props, 'props');
  const {navigation} = props;
  // console.log(props.route.params, '......');
  const {programData, waterLevel, start, setState, id, program} =
    props.route.params;
  console.log(waterLevel, start, id, programData.program, 'waterLavel');
  const [waterButton, setWaterButton] = useState(waterLevel);
  const [hide, setShow] = useState(start);
  const WaterButtons = [
    {
      id: 'Minimum',
      label: 'Minimum',
      key: 'water_level',
      value: 'Minimum',
      setWaterButton: setWaterButton,
    },
    {
      id: 'Low',
      label: 'Low',
      key: 'water_level',
      value: 'Low',
      setWaterButton: setWaterButton,
    },
    {
      id: 'Medium',
      label: 'Medium',
      key: 'water_level',
      value: 'Medium',
      setWaterButton: setWaterButton,
    },
    {
      id: 'High',
      label: 'High',
      key: 'water_level',
      value: 'High',
      setWaterButton: setWaterButton,
    },
  ];
  const ProgramSet = [
    {id: 12, call: 'P12', label: '51 mins', name: 'Jeanes/ Denim'},
    {id: 13, call: 'P13', label: '53 mins', name: 'Cotton'},
    {id: 14, call: 'P14', label: '30 mins', name: 'Gentle wash'},
    {id: 15, call: 'P15', label: '60 mins', name: 'Saree / Silk / Synthetic'},
    {id: 16, call: 'P16', label: '42 mins', name: 'Sport wash'},
    {id: 17, call: 'P17', label: '44 mins', name: 'Inner wear'},
    {id: 18, call: 'P18', label: '59 mins', name: 'ECO wash'},
  ];
  const selectedProgram = ProgramSet.find(
    program => program.id === programData.program,
  );
  // water level function api
  const handleWaterLevelButtonPress = async (button, id) => {
    const {key, value, setWaterButton} = button;
    setWaterButton(value);
    let token = await AsyncStorage.getItem('AccessToken');
    const newWash = value;
    console.log(newWash, 'newWash');
    try {
      // processSwitchesSequentially(switchComponents);
      let response = await switchButton('WM', token, id, newWash, key);
      console.log(response.data, 'response');
      setState(prevState => ({
        ...prevState,
        [key]: newWash,
      }));
    } catch (err) {
      console.log(err, 'error a rhe hai kya ');
      // setWaterButton(wash);
    }
  };
  // Start Wash Cycle Api
  // const StartWashCycle = async (program, State, id) => {
  //   console.log(program, State, id, 'heeee');
  //   let token = await AsyncStorage.getItem('AccessToken');
  //   const key = 'program';
  //   const switchData = program;
  //   try {
  //     // processSwitchesSequentially(switchComponents);
  //     let response = await switchButton(State, token, id, switchData, key);
  //     console.log(response.data, 'response');
  //     setState(prevState => ({
  //       ...prevState,
  //       [key]: switchData,
  //     }));

  //     await NodeStatus(State, id, token);
  //   } catch (err) {
  //     console.log(err.response.data, 'errerr');
  //   }
  // };
  const StartWashCycle = async (State, id) => {
    console.log(State, id, 'State and id');
    let token = await AsyncStorage.getItem('AccessToken');
    const key = 'wmrunning';
    const wmrunningValue = true;
    try {
      let response = await switchButton(State, token, id, wmrunningValue, key);
      console.log(response.data, 'response');
      setState(prevState => ({
        ...prevState,
        wmrunning: wmrunningValue,
      }));
      // navigation.navigate('WMDeviceScreen',id)

      navigation.navigate('Home');
    } catch (err) {
      console.log(err.response.data, 'errerr');
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </Pressable>

        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              fontWeight: '500',
            }}>
            {programData.title}
          </Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
        <View
          style={{
            backgroundColor: '#E5F8CD',
            height: '50%',
            width: '100%',
            borderRadius: 10,
            marginBottom: 10,
          }}>
          <View style={{alignItems: 'center', paddingVertical: 10}}>
            <Image
              source={programData.image}
              style={{
                height: 40,
                width: 40,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontWeight: '500',
              }}>
              {programData.title}
            </Text>
          </View>
          <View style={{alignItems: 'center', paddingVertical: 10}}>
            <Text
              style={{
                fontSize: 14,
                color: '#979EA6',
                fontWeight: '500',
                textAlign: 'center',
              }}>
              {programData.Description}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 20,
              paddingHorizontal: 20,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  color: '#525968',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {programData.wash}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#525968',
                  textAlign: 'center',
                }}>
                Wash
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#525968',
                borderStyle: 'dotted',
                alignSelf: 'center',
                height: '100%', // Adjust height as needed
                width: 1, // Narrow width for vertical line
              }}
            />
            <View>
              <Text
                style={{
                  fontSize: 18,
                  color: '#525968',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {programData.spin_time}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#525968',
                  textAlign: 'center',
                }}>
                Spin
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#525968',
                borderStyle: 'dotted',
                alignSelf: 'center',
                height: '100%', // Adjust height as needed
                width: 1, // Narrow width for vertical line
              }}
            />
            <View>
              <Text
                style={{
                  fontSize: 18,
                  color: '#525968',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {programData.temprature}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#525968',
                  textAlign: 'center',
                }}>
                Temp.
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingVertical: 20,
              paddingHorizontal: 20,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  color: '#525968',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {programData.rinse}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#525968',
                  textAlign: 'center',
                }}>
                Rinse
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#525968',
                borderStyle: 'dotted',
                alignSelf: 'center',
                height: '100%', // Adjust height as needed
                width: 1, // Narrow width for vertical line
              }}
            />
            <View>
              <Text
                style={{
                  fontSize: 18,
                  color: '#525968',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                ON
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#525968',
                  textAlign: 'center',
                }}>
                Program time
              </Text>
            </View>
            {/* <View style={{}}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#525968',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                60º
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#525968',
                  textAlign: 'center',
                }}>
                Temp.
              </Text>
            </View> */}
          </View>
        </View>

        {/* <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
          <View>
            <Text
              style={{
                fontSize: 18,
                color: '#525968',
                fontWeight: 'bold',
              }}>
              Water Level
            </Text>
          </View>
        </View> */}
        {/* Water Level */}
        <View style={{}}>
          <Text
            style={{
              marginHorizontal: 10,
              top: 15,
              fontWeight: 'bold',
              fontSize: 16,
              color: hide ? '#838383' : '#000',
            }}>
            Water Level
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 20,
            }}>
            {WaterButtons.slice(0, 3).map(button => {
              const isDisabled = hide;
              return (
                <TouchableOpacity
                  key={button.id}
                  onPress={() => {
                    handleWaterLevelButtonPress(button, id);
                  }}
                  disabled={isDisabled}>
                  <View
                    style={[
                      styles.appButtonContainer,
                      waterButton === button.id && styles.activeButton,
                      isDisabled && styles.disabledButton,
                    ]}>
                    <Text
                      style={[
                        styles.appButtonText,
                        waterButton === button.id && {color: '#fff'},
                        isDisabled && styles.disabledButtonText,
                      ]}>
                      {button.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            {WaterButtons.slice(3, 4).map(button => {
              const isDisabled = hide;
              return (
                <TouchableOpacity
                  key={button.id}
                  onPress={() => {
                    handleWaterLevelButtonPress(button, id);
                  }}
                  disabled={isDisabled}>
                  <View
                    style={[
                      styles.appButtonContainer,
                      waterButton === button.id && styles.activeButton,
                      isDisabled && styles.disabledButton,
                    ]}>
                    <Text
                      style={[
                        styles.appButtonText,
                        waterButton === button.id && {color: '#fff'},
                        isDisabled && styles.disabledButtonText,
                      ]}>
                      {button.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {/* <View style={{}}>
          <LinearGradient
            colors={hide ? ['#D9D9D9', '#A9A9A9'] : ['#4BB6E8', '#4D98FF']}
            style={{
              padding: 15,
              borderRadius: 10,
            }}>
            <Text
              style={[
                hide
                  ? styles.buttonText
                  : {color: '#fff', fontSize: 16, fontWeight: 'bold'},

                hide && styles.disabledButtonText, // Change text color when disabled
              ]}>
              button
            </Text>
          </LinearGradient>
        </View> */}
        <TouchableOpacity
          onPress={() => {
            const State = 'WM';

            // const program = selectedProgram.id;
            StartWashCycle(State, id);
          }}
          disabled={hide}>
          <LinearGradient
            colors={hide ? ['#D9D9D9', '#A9A9A9'] : ['#4BB6E8', '#4D98FF']}
            style={styles.ButtonContainer}>
            <Text
              style={[
                hide
                  ? styles.buttonText
                  : {
                      color: '#fff',
                      fontSize: 16,
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    },
                hide && styles.disabledButtonText,
              ]}>
              Start Wash Cycle
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SpecialProgramStart;

const styles = StyleSheet.create({
  appButtonContainer: {
    marginTop: 20,
    width: 100,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#EDF5FF',
    padding: 8,
  },
  ButtonContainer: {
    borderRadius: 8,
    paddingVertical: 10,
  },
  activeButton: {
    backgroundColor: '#64bbf5',
  },
  disabledButton: {
    backgroundColor: '#D9D9D9',
  },
  appButtonText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  disabledButtonText: {
    color: '#A9A9A9',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
