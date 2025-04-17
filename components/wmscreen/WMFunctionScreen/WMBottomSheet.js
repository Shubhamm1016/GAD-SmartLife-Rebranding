import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Switch} from 'react-native-switch';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {switchButton} from '../../../Context/API';

const WMBottomSheet = ({
  refRBSheet,
  isClose,
  setState,
  setClose,
  id,
  start,
  timeinhr,
  timeinmin,
  program,
  soak,
  hygineRinse,
  rinse,
  spin,
  superDry,
  wash,
  plus,
  waterLavel,
  temperature,
  uv,
  select,
  fetchAll,
}) => {
  console.log(program, 'program number');
  console.log(spin, '...nnbbbbbbb');

  const [isSoak, setSoak] = useState(soak);
  const [isWash, setWash] = useState(wash);
  const [isRinse, setRinse] = useState(rinse);
  const [isSpin, setSpin] = useState(spin);

  useEffect(() => {
    // Log to check the state values before the API call
    console.log("isWash:", isWash, "isRinse:", isRinse, "isSpin:", isSpin);
  }, [isWash, isRinse, isSpin]);
  const [refreshKey, setRefreshKey] = useState(0);

  const [isHygiene, setHygiene] = useState(hygineRinse);
  const [isSuperDry, setSuperDry] = useState(superDry);
  const [washButton, setWashButton] = useState(plus);
  const [waterButton, setWaterButton] = useState(waterLavel);
  console.log(waterButton, 'waterButton');
  const [temperatureButton, setTemperaratureButton] = useState(temperature);
  // const [programss, setProgress] = useState(program);
  const [time, setTime] = useState('00:59');
  console.log(time, 'time');
  const [hide, setShow] = useState(start);

  const closeSheet = () => {
    refRBSheet.current.close();
    setClose(true);
  };
  const WashButtons = [
    {
      id: 0,
      label: 'OFF',
      key: 'wash_plus',
      value: 0,
      setWashButton: setWashButton,
    },
    {
      id: 5,
      label: '+5 mins',
      key: 'wash_plus',
      value: 5,
      setWashButton: setWashButton,
    },
    {
      id: 10,
      label: '+10 mins',
      key: 'wash_plus',
      value: 10,
      setWashButton: setWashButton,
    },
    {
      id: 15,
      label: '+15 mins',
      key: 'wash_plus',
      value: 15,
      setWashButton: setWashButton,
    },
    {
      id: 20,
      label: '+20 mins',
      key: 'wash_plus',
      value: 20,
      setWashButton: setWashButton,
    },
    {
      id: 25,
      label: '+25 mins',
      key: 'wash_plus',
      value: 25,
      setWashButton: setWashButton,
    },
    {
      id: 30,
      label: '+30 mins',
      key: 'wash_plus',
      value: 30,
      setWashButton: setWashButton,
    },
  ];
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
  const temperatureButtons = [
    {
      id: 'Regular',
      label: 'Regular',
      key: 'Temperature',
      value: 'Regular',
      setTemperaratureButton: setTemperaratureButton,
    },
    {
      id: 'Warm',
      label: 'Warm',
      key: 'Temperature',
      value: 'Warm',
      setTemperaratureButton: setTemperaratureButton,
    },
    {
      id: 'Hot',
      label: 'Hot',
      key: 'Temperature',
      value: 'Hot',
      setTemperaratureButton: setTemperaratureButton,
    },
  ];
  // const ProgramSet = [
  //   {id: 1, label: '51 mins', name: 'AUTO'},
  //   {id: 2, label: '53 mins', name: 'WHITES'},
  //   {id: 3, label: '30 mins', name: 'REPID 30'},
  //   {id: 4, label: '60 mins', name: 'BULKY'},
  //   {id: 5, label: '42 mins', name: 'DELICATE'},
  //   {id: 6, label: '44 mins', name: 'WOOLLENS'},
  //   {id: 7, label: '59 mins', name: 'DEEP CLEANSE'},
  //   {id: 8, label: '56 mins', name: 'GERM SHIELD'},
  //   {id: 9, label: '69 mins', name: 'STEAM WASH'},
  // ];
  const ProgramSet = [
    {
      id: 1,
      label: '59 mins',
      time: {
        High: '1:03 mins',
        Medium: '59 mins',
        Low: '55 mins',
        Minimum: '51 mins',
      },
      name: 'AUTO',
      cycle: {
        wash_cycle_soak: false,
        wash_cycle_spin: true,
        wash_cycle_wash: true,
        wash_cycle_rinse: true,
        wash_cycle_hygineRinse: false,
        wash_cycle_superDry: false,
      },
      wash_plus: 0,
      water_level: 'Fuzzy',
      Temperature: 'Regular',
    },
    {
      id: 2,
      label: '1:01 mins',
      time: {
        High: '1:05 mins',
        Medium: '1:01 mins',
        Low: '57 mins',
        Minimum: '53 mins',
      },
      name: 'WHITES',
      cycle: {
        wash_cycle_soak: false,
        wash_cycle_spin: true,
        wash_cycle_wash: true,
        wash_cycle_rinse: true,
        wash_cycle_hygineRinse: false,
        wash_cycle_superDry: false,
      },
      wash_plus: 0,
      water_level: 'Fuzzy',
      Temperature: 'Regular',
    },
    {
      id: 3,
      label: '30 mins',
      time: {
        High: '30 mins',
        Medium: '30 mins',
        Low: '30 mins',
        Minimum: '30 mins',
      },
      name: 'RAPID 30',
      cycle: {
        wash_cycle_soak: false,
        wash_cycle_spin: true,
        wash_cycle_wash: true,
        wash_cycle_rinse: true,
        wash_cycle_hygineRinse: false,
        wash_cycle_superDry: false,
      },
      wash_plus: 0,
      water_level: 'High',
      Temperature: 'Regular',
    },
    {
      id: 4,
      label: '1:06 mins',
      time: {
        High: '1:12 mins',
        Medium: '1:06 mins',
        Low: '1:03 mins',
        Minimum: '1:00 mins',
      },
      name: 'BULKY',
      cycle: {
        wash_cycle_soak: false,
        wash_cycle_spin: true,
        wash_cycle_wash: true,
        wash_cycle_rinse: true,
        wash_cycle_hygineRinse: false,
        wash_cycle_superDry: false,
      },
      wash_plus: 0,
      water_level: 'High',
      Temperature: 'Regular',
    },
    {
      id: 5,
      label: '46 mins',
      time: {
        High: '46 mins',
        Medium: '46 mins',
        Low: '44 mins',
        Minimum: '42 mins',
      },
      name: 'DELICATE',
      cycle: {
        wash_cycle_soak: false,
        wash_cycle_spin: true,
        wash_cycle_wash: true,
        wash_cycle_rinse: true,
        wash_cycle_hygineRinse: false,
        wash_cycle_superDry: false,
      },
      wash_plus: 0,
      water_level: 'Fuzzy',
      Temperature: 'Regular',
    },
    {
      id: 6,
      label: '48 mins',
      time: {
        High: '48 mins',
        Medium: '48 mins',
        Low: '44 mins',
        Minimum: '44 mins',
      },
      name: 'WOOLLENS',
      cycle: {
        wash_cycle_soak: false,
        wash_cycle_spin: true,
        wash_cycle_wash: true,
        wash_cycle_rinse: true,
        wash_cycle_hygineRinse: false,
        wash_cycle_superDry: false,
      },
      wash_plus: 0,
      water_level: 'Fuzzy',
      Temperature: 'Regular',
    },
    {
      id: 7,
      label: '1:11 mins',
      time: {
        High: '1:14 mins',
        Medium: '1:11 mint',
        Low: '1:05 mint',
        Minimum: '59 mint',
      },
      name: 'DEEP CLEANSE',
      cycle: {
        wash_cycle_soak: false,
        wash_cycle_spin: true,
        wash_cycle_wash: true,
        wash_cycle_rinse: true,
        wash_cycle_hygineRinse: false,
        wash_cycle_superDry: false,
      },
      wash_plus: 0,
      water_level: 'Fuzzy',
      Temperature: 'Regular',
    },
    {
      id: 8,
      label: '56 mins',
      time: {
        High: '1:01 mins',
        Medium: '56 mint',
        Low: '56 mint',
        Minimum: '56 mint',
      },
      name: 'GERM SHIELD',
      cycle: {
        wash_cycle_soak: false,
        wash_cycle_spin: true,
        wash_cycle_wash: true,
        wash_cycle_rinse: true,
        wash_cycle_hygineRinse: false,
        wash_cycle_superDry: false,
      },
      wash_plus: 0,
      water_level: 'Medium',
      Temperature: 'Regular',
    },
    {
      id: 9,
      label: '1:09 mins',
      time: {
        High: '1:13 mins',
        Medium: '1:09 mint',
        Low: '1:09 mint',
        minimum: '1:09 mint',
      },
      name: 'STEAM WASH',
      cycle: {
        wash_cycle_soak: false,
        wash_cycle_spin: true,
        wash_cycle_wash: true,
        wash_cycle_rinse: true,
        wash_cycle_hygineRinse: false,
        wash_cycle_superDry: false,
      },
      wash_plus: 0,
      water_level: 'Medium',
      Temperature: 'Regular',
    },
  ];

  const switchComponents = [
    {label: 'Soak', value: isSoak, setValue: setSoak, key: 'wash_cycle_soak'},
    {label: 'Wash', value: isWash, setValue: setWash, key: 'wash_cycle_wash'},
    {
      label: 'Rinse',
      value: isRinse,
      setValue: setRinse,
      key: 'wash_cycle_rinse',
    },
    {label: 'Spin', value: isSpin, setValue: setSpin, key: 'wash_cycle_spin'},
    {
      label: 'Hygiene Rinse',
      value: isHygiene,
      setValue: setHygiene,
      key: 'wash_cycle_hygineRinse',
    },
    {
      label: 'Super Dry',
      value: isSuperDry,
      setValue: setSuperDry,
      key: 'wash_cycle_superDry',
    },
  ];

  const selectedProgram = ProgramSet.find(program => program.id === select);
  console.log(selectedProgram, 'selectedProgram');

  const handleSwitchChange = async (State, id, currentValue, setValue, key) => {
    const newValue = !currentValue;

    // Handle mutual exclusivity for "Spin" and "Super Dry"
    if (key === 'wash_cycle_spin' && newValue) {
      setState(prevState => ({
        ...prevState,
        wash_cycle_superDry: false, // Deselect Super Dry if Spin is selected
      }));
    }

    if (key === 'wash_cycle_superDry' && newValue) {
      setState(prevState => ({
        ...prevState,
        wash_cycle_spin: false, // Deselect Spin if Super Dry is selected
      }));
    }

    // Set the new value for the current switch
    setValue(newValue);

    // Save the new value in AsyncStorage
    try {
      await AsyncStorage.setItem(key, newValue.toString());
    } catch (error) {
      console.error('Error saving to AsyncStorage', error);
    }

    // Get the access token
    let token = await AsyncStorage.getItem('AccessToken');
    console.log(State, id, newValue, key);

    try {
      // Send the request to the server to update the wash cycle
      let response = await switchButton(State, token, id, newValue, key);
      console.log(response.data, 'response from server');

      // Update the local state with the new value based on the response
      setState(prevState => ({
        ...prevState,
        [key]: newValue, // Update specific state key based on the change
      }));
    } catch (err) {
      // Log the error and revert the value if the request fails
      console.log(err.response ? err.response.data : err, 'error');

      // Revert to the original value in case of error (failure handling)
      setValue(currentValue);
    }
  };

  useEffect(() => {
    const loadStates = async () => {
      const savedSpin = await AsyncStorage.getItem('wash_cycle_spin');
      const savedSuperDry = await AsyncStorage.getItem('wash_cycle_superDry');
      if (savedSpin !== null) setSpin(JSON.parse(savedSpin));
      if (savedSuperDry !== null) setSuperDry(JSON.parse(savedSuperDry));
    };

    loadStates();
  }, []);

  // (+) Wash function Api
  const handleWashButtonPress = async (button, id) => {
    const {key, value, setWashButton} = button;
    console.log(button, 'button');
    setWashButton(value);
    let token = await AsyncStorage.getItem('AccessToken');
    const newWash = value;
    try {
      // processSwitchesSequentially(switchComponents);
      let response = await switchButton('WM', token, id, newWash, key);
      console.log();

      console.log(response.data, 'responsebdbdbbdbbbdbdbb');
      setState(prevState => ({
        ...prevState,
        [key]: newWash,
      }));
      updateTime(value);
    } catch (err) {
      console.log(err.response.data, 'error');
      setWashButton(wash);
    }
  };

  const updateTime = value => {
    const baseMinutes = 59; // start time at 00:59
    const baseHours = 0;

    const newMinutes = baseMinutes + value;
    const newHours = baseHours + Math.floor(newMinutes / 60);
    const displayMinutes = newMinutes % 60;

    const formattedTime = `${String(newHours).padStart(2, '0')}:${String(
      displayMinutes,
    ).padStart(2, '0')}`;

    setTime(formattedTime);
  };

  // water level function api
  const handleWaterLevelButtonPress = async (button, id) => {
    const {key, value, setWaterButton} = button;
    console.log(value, 'button');
    setWaterButton(value); // Update waterButton state asynchronously
    let token = await AsyncStorage.getItem('AccessToken');
    const newWash = value;
    try {
      let response = await switchButton('WM', token, id, newWash, key);
      console.log(response.data, 'response');
      setState(prevState => ({
        ...prevState,
        [key]: newWash,
      }));
      const waterLevelTime = selectedProgram.time[value]; // Use `value` directly
      setTime(waterLevelTime);
    } catch (err) {
      console.log(err.response.data, 'error');
      setWaterButton(wash); // Reset water button in case of an error
    }
  };

  // const processSwitchesSequentially = async switchComponents => {
  //   for (const component of switchComponents) {
  //     const {label, value, setValue, key} = component;
  //     console.log(component, 'component');
  //     await handleSwitchChange('WM', component.key, value, setValue, key);
  //   }
  // };

  // Temperature Function Api
  const handleTemperatureButtonPress = async (button, id) => {
    const {key, value, setTemperaratureButton} = button;
    setTemperaratureButton(value);
    let token = await AsyncStorage.getItem('AccessToken');
    const newWash = value;
    try {
      let response = await switchButton('WM', token, id, newWash, key);
      console.log(response.data, 'response');
      setState(prevState => ({
        ...prevState,
        [key]: newWash,
      }));
    } catch (err) {
      console.log(err.response.data, 'error');
      setTemperaratureButton(wash);
    }
  };

  // Start Wash Cycle Api
  // const StartWashCycle = async (program, State, id) => {
  //   console.log(program, State, id, 'heeee');
  //   let token = await AsyncStorage.getItem('AccessToken');
  //   const key = 'program';
  //   const switchData = program;
  //   try {
  //     processSwitchesSequentially(switchComponents);
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
    let token = await AsyncStorage.getItem('AccessToken');
    const key = 'wmrunning';
    const wmrunningValue = true;

    try {
      // Trigger the API call to start the wash cycle
      let response = await switchButton(State, token, id, wmrunningValue, key);
      console.log(response.data, 'response');

      // Update the state with the new cycle status
      setState(prevState => ({
        ...prevState,
        wmrunning: wmrunningValue,
        // Update any other relevant states such as time
        timeinhr: response.data.timeinhr || prevState.timeinhr,
        timeinmin: response.data.timeinmin || prevState.timeinmin,
      }));

      // Close the BottomSheet
      refRBSheet.current.close();
      setClose(false);

    } catch (err) {
      console.log(err.response ? err.response.data : err, 'Error starting the wash cycle');
    }
  };

  useEffect(() => {
    const selectedProgram = ProgramSet.find(program => program.id === select);

    if (!start && selectedProgram) {
      // Update states based on the selected program
      setSoak(selectedProgram.cycle.wash_cycle_soak);
      setWash(selectedProgram.cycle.wash_cycle_wash);
      setRinse(selectedProgram.cycle.wash_cycle_rinse);
      setSpin(selectedProgram.cycle.wash_cycle_spin);
      setHygiene(selectedProgram.cycle.wash_cycle_hygineRinse);
      setSuperDry(selectedProgram.cycle.wash_cycle_superDry);
      setWashButton(selectedProgram.wash_plus);
      setWaterButton(selectedProgram.water_level);
      setTemperaratureButton(selectedProgram.Temperature);

      const waterLevelTime = selectedProgram.time[selectedProgram.water_level];
      console.log(waterLevelTime, 'waterLevelTime');

      if (waterLevelTime) {
        setTime(waterLevelTime);
      }
    }
    console.log(selectedProgram.id, program, '+++++++');
    if (!start && selectedProgram && selectedProgram.id !== program) {
      // Use selectedProgram.id and program directly for comparison
      console.log(id, 'shubham malviya id ');
      selectProgram(selectedProgram.id, 'WM', id);
    }
  }, [select, start, id, program]);
  const selectProgram = async (program, state, id) => {
    console.log(program, state, id, 'Starting wash cycle');
    // return
    let token = await AsyncStorage.getItem('AccessToken');
    const key = 'program';
    const switchData = program;

    try {
      let response = await switchButton(state, token, id, switchData, key);
      console.log(response.data, 'response');
      setState(prevState => ({
        ...prevState,
        [key]: switchData,
      }));
    } catch (err) {
      console.log(err.response?.data, 'Error during switch button');
    }
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 10, paddingVertical: 10}}>
      {/* wash program */}
      <View style={{}}>
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#525968'}}>
            WASH PROGRAM - P{selectedProgram.id} {selectedProgram.name}
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
            <AntDesign name="close" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 10, padding: 10}}>
          {selectedProgram ? (
            <Text
              style={{
                color: '#838383',
                fontSize: 14,
              }}>
              {selectedProgram.label}
            </Text>
          ) : (
            <Text style={{textAlign: 'center', color: '#838383', fontSize: 16}}>
              Select a program to see details
            </Text>
          )}
        </View>
      </View>
      {/* scrollView */}
      <ScrollView style={{marginBottom: 10}}>
        {/* Wash Cycle */}
        <View style={{marginBottom: 10, paddingHorizontal: 10}}>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 14,
                fontWeight: 'bold',
                color: hide || select === 3 ? '#838383' : '#000',
              }}>
              Wash Cycle
            </Text>
          </View>
          {/* {switchComponents.map(({label, value, setValue, key}) => {
            const isDisabled =
              hide ||
              select === 3 ||
              (select === 6 &&
                (label === 'Soak' ||
                  label === 'Hygiene Rinse' ||
                  label === 'Super Dry')) ||
              select === 8 ||
              select === 9;

            return (
              <View key={key} style={styles.optionContainer}>
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: isDisabled
                        ? '#B0B0B0'
                        : value
                        ? '#4D98FF'
                        : '#4D98FF',
                      fontSize: 16,
                    },
                  ]}>
                  {label}
                </Text>
                <View
                  style={isDisabled ? styles.disabledSwitchContainer : null}>
                  <Switch
                    trackColor={{false: '#D9D9D9', true: '#4D98FF12'}}
                    style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
                    ios_backgroundColor="#D9D9D9"
                    backgroundActive={'#F2F8FF'}
                    backgroundInactive={'#D9D9D9'}
                    circleActiveColor={'#4D98FF'}
                    circleInActiveColor={'#FFFFFF'}
                    value={value}
                    onValueChange={() =>
                      handleSwitchChange('WM', id, value, setValue, key)
                    }
                    outerCircleStyle={{marginRight: 50}}
                    activeText={'On'}
                    inActiveText={'Off'}
                    activeTextStyle={{color: '#4D98FF', fontWeight: '600'}}
                    inactiveTextStyle={{color: '#FFFFFF', fontWeight: '600'}}
                    switchLeftPx={10}
                    switchRightPx={10}
                    switchWidthMultiplier={2}
                    disabled={isDisabled}
                  />
                </View>
              </View>
            );
          })} */}

          {switchComponents.map(({label, value, setValue, key}) => {
            const isDisabled =
              hide ||
              select === 3 ||
              (select === 6 &&
                (label === 'Soak' ||
                  label === 'Hygiene Rinse' ||
                  label === 'Super Dry')) ||
              select === 8 ||
              select === 9;

            return (
              <View key={key} style={styles.optionContainer}>
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: isDisabled
                        ? '#B0B0B0'
                        : value
                        ? '#4D98FF'
                        : '#4D98FF', // This seems redundant since both cases use the same color
                      fontSize: 16,
                    },
                  ]}>
                  {label}
                </Text>
                <View
                  style={isDisabled ? styles.disabledSwitchContainer : null}>
                  <Switch
                    trackColor={{false: '#D9D9D9', true: '#4D98FF12'}}
                    style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
                    ios_backgroundColor="#D9D9D9"
                    backgroundActive={'#F2F8FF'}
                    backgroundInactive={'#D9D9D9'}
                    circleActiveColor={'#4D98FF'}
                    circleInActiveColor={'#FFFFFF'}
                    value={value}
                    onValueChange={() =>
                      handleSwitchChange('WM', id, value, setValue, key)
                    }
                    outerCircleStyle={{marginRight: 50}}
                    activeText={'On'}
                    inActiveText={'Off'}
                    activeTextStyle={{color: '#4D98FF', fontWeight: '600'}}
                    inactiveTextStyle={{color: '#FFFFFF', fontWeight: '600'}}
                    switchLeftPx={10}
                    switchRightPx={10}
                    switchWidthMultiplier={2}
                    disabled={isDisabled}
                  />
                </View>
              </View>
            );
          })}
        </View>
        {/* (+) Wash */}
        <View style={{marginHorizontal: 10}}>
          <Text
            style={{
              marginVertical: 20,
              fontWeight: 'bold',
              fontSize: 16,
              color: hide || select === 3 ? '#838383' : '#000',
            }}>
            (+) Wash
          </Text>

          <View style={styles.row}>
            {WashButtons.slice(0, 3).map(button => {
              const isDisabled = hide || select === 3;
              const isSelected = washButton === button.id;
              return (
                <TouchableOpacity
                  key={button.id}
                  onPress={() => handleWashButtonPress(button, id)}
                  disabled={isDisabled}>
                  <View
                    style={[
                      styles.button,
                      washButton === button.id && styles.washButton,
                      isDisabled && styles.disabledButton,
                    ]}>
                    <Text
                      style={[
                        styles.buttonText,
                        isDisabled && styles.disabledButtonText,
                      ]}>
                      {button.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.row}>
            {WashButtons.slice(3, 6).map(button => {
              const isDisabled = hide || select === 3;
              return (
                <TouchableOpacity
                  key={button.id}
                  onPress={() => handleWashButtonPress(button, id)}
                  disabled={isDisabled}>
                  <View
                    style={[
                      styles.button,
                      washButton === button.id && styles.washButton,
                      isDisabled && styles.disabledButton, // Add this line
                    ]}>
                    <Text
                      style={[
                        styles.buttonText,
                        isDisabled && styles.disabledButtonText,
                      ]}>
                      {button.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.row}>
            {WashButtons.slice(6).map(button => {
              const isDisabled = hide || select === 3;
              return (
                <TouchableOpacity
                  key={button.id}
                  onPress={() => handleWashButtonPress(button, id)}
                  disabled={isDisabled}>
                  <View
                    style={[
                      styles.button,
                      washButton === button.id && styles.washButton,
                      isDisabled && styles.disabledButton, // Add this line
                    ]}>
                    <Text
                      style={[
                        styles.buttonText,
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
          {/* <View style={{flexDirection: 'row', marginVertical: 10}}> */}
          <View style={styles.row}>
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
          <View style={styles.row}>
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
        {/*  Temperature */}
        <View>
          <Text
            style={{
              marginHorizontal: 10,
              fontWeight: 'bold',
              fontSize: 16,
              color:
                hide ||
                select === 3 ||
                select === 6 ||
                select === 8 ||
                select === 9
                  ? '#838383'
                  : '#000',
            }}>
            Temperature
          </Text>
          {/* <View style={{flexDirection: 'row', marginVertical: 10}}> */}
          <View style={styles.row}>
            {temperatureButtons.map(button => {
              const isDisabled =
                hide ||
                select === 3 ||
                select === 6 ||
                select === 8 ||
                select === 9;
              return (
                <TouchableOpacity
                  key={button.id}
                  onPress={() => {
                    handleTemperatureButtonPress(button, id);
                  }}
                  disabled={isDisabled}>
                  <View
                    style={[
                      styles.appButtonContainer,
                      temperatureButton == button.id && styles.activeButton,
                      isDisabled && styles.disabledButton,
                    ]}>
                    <Text
                      style={[
                        styles.appButtonText,
                        temperatureButton == button.id && {color: '#fff'},
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: 0.5,
          }}>
          <Text
            style={{
              marginHorizontal: 10,
              fontWeight: 'bold',
              fontSize: 16,
              color: '#838383',
            }}>
            UV Feature
          </Text>
          <Switch
            trackColor={{false: '#D9D9D9', true: '#4D98FF12'}}
            style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
            ios_backgroundColor="#D9D9D9"
            backgroundActive={'#F2F8FF'}
            backgroundInactive={'#D9D9D9'}
            circleActiveColor={'#4D98FF'}
            circleInActiveColor={'#FFFFFF'}
            value={uv}
            outerCircleStyle={{marginRight: 50}}
            activeText={'On'}
            inActiveText={'Off'}
            activeTextStyle={{color: '#4D98FF', fontWeight: '600'}}
            inactiveTextStyle={{color: '#FFFFFF', fontWeight: '600'}}
            switchLeftPx={10}
            switchRightPx={10}
            switchWidthMultiplier={2}
            disabled={true}
          />
        </View>
        {/* cycle approximately */}
        <View style={{flex: 1, paddingVertical: 10}}>
          {selectedProgram ? (
            <View style={{}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#838383',
                  fontSize: 14,
                }}>
                This cycle approximately will take{' '}
                {start ? `${timeinhr}:${timeinmin}` : time}
                {/* {selectedProgram.label} */}
              </Text>
            </View>
          ) : (
            <Text style={{textAlign: 'center', color: '#838383', fontSize: 16}}>
              Select a program to see details
            </Text>
          )}
        </View>
        {/* button Start and Cancel */}
        <View>
          <TouchableOpacity
            onPress={() => {
              const State = 'WM';

              StartWashCycle(State, id);
            }}
            disabled={hide}>
            <LinearGradient
              colors={hide ? ['#D9D9D9', '#A9A9A9'] : ['#4BB6E8', '#4D98FF']}
              style={{
                padding: 15,
                borderRadius: 10,
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <AntDesign
                  name="caretright"
                  size={20}
                  color={hide ? '#A9A9A9' : '#fff'}
                />
                <Text
                  style={[
                    hide
                      ? styles.buttonText
                      : {color: '#fff', fontSize: 16, fontWeight: 'bold'},

                    hide && styles.disabledButtonText,
                  ]}>
                  {' '}
                  Start Wash Cycle
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeSheet} style={styles.card}>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#4CA6F4',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  paddingVertical: 15,
                }}>
                Cancel
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  modalContent: {
    bottom: 0,
    height: 800,
    backgroundColor: '#fff',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#525968',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  uvFeatures: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 15,
  },
  uvText: {
    marginHorizontal: 12,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#525968',
  },
  appButtonContainer: {
    elevation: 8,
    marginTop: 25,
    marginStart: 20,
    width: 100,
    padding: 20,
    marginEnd: 20,
    borderRadius: 10,
    padding: 8,
  },
  appButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  card: {
    borderWidth: 2,
    borderColor: '#4CA6F4',
    BordercolorborderRadius: 8,
    Borderradiuspadding: 16,
    borderRadius: 10,
    marginVertical: 25,
  },
  headerText: {
    top: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  appButtonContainer: {
    elevation: 8,
    marginTop: 25,
    marginStart: 5,
    width: 100,
    backgroundColor: '#EDF5FF',
    marginEnd: 20,
    borderRadius: 10,
    padding: 8,
  },
  appButtonText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  button: {
    elevation: 8,
    marginTop: 25,
    marginStart: 5,
    width: 100,
    backgroundColor: '#EDF5FF',
    marginEnd: 20,
    borderRadius: 10,
    padding: 8,
  },
  activeButton: {
    backgroundColor: '#64bbf5',
  },
  buttonText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  container: {
    // backgroundColor: 'red',
    width: '100%',
    // padding: 20,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerText: {
    top: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    elevation: 8,
    width: 100,
    backgroundColor: '#EDF5FF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientButton: {
    elevation: 8,
    width: 100,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  washButton: {
    backgroundColor: '#64bbf5',
  },
  buttonText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
  appButtonContainer: {
    elevation: 8,
    marginTop: 25,
    marginStart: 5,
    width: 100,
    backgroundColor: '#EDF5FF',
    marginEnd: 20,
    borderRadius: 10,
    padding: 8,
  },
  appButtonText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  activeButton: {
    backgroundColor: '#0c98f5',
  },
  disabledSwitchContainer: {
    opacity: 0.5,
  },
  disabledButton: {
    backgroundColor: '#D9D9D9',
  },
  disabledButtonText: {
    color: '#A9A9A9',
  },
});

export default WMBottomSheet;

