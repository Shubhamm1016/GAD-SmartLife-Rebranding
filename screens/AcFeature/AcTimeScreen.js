import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Switch,
  SafeAreaView,
  Dimensions,
  Pressable,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import ModelTime from './ModelTime';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UpdateTimeDate, removeSetTimer, setTimeDate} from '../../Context/API';

const AcTimeScreen = props => {
  const {navigation} = props;
  let nodeid = props.route.params.id;
  let name = props.route.params.uname;
  console.log(props.route.params, 'props.route.params');

  let Upower = props.route.params.Upower;
  console.log(Upower, 'Upower');

  let temperature = props.route.params.temperature;
  let SubName = props.route.params.name;

  console.log(props.route.params, 'props.route.params');

  let Time = props.route.params.TimeMint;
  console.log(Time, 'Time');

  let ID = props.route.params.Id || '';
  console.log(ID, 'ID pooooooooo');
  let power = props.route.params.power;
  console.log(power, '{{{{{{{{{{');

  let days = props.route.params.day || '';
  let counttime = props.route.params.Idtime || '';
  let countOfftime = props.route.params.offTime || '';
  console.log(counttime, 'counttime');
  console.log(countOfftime,"countOfftime");
  
  const match = counttime.match(/(\d+):(\d+)\s*(AM|PM)/i);
  const matchOff = countOfftime.match(/(\d+):(\d+)\s*(AM|PM)/i);
  console.log(matchOff, 'matchOff');

  const currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let hoursOff = currentDate.getHours();
  let minutesOff = currentDate.getMinutes();
  if (match) {
    hours = parseInt(match[1], 10);
    minutes = parseInt(match[2], 10);
    // Adjust hours for PM
    if (match[3].toUpperCase() === 'PM' && hours < 12) {
      hours += 12;
    }
    // Adjust hours for AM (midnight)
    if (match[3].toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }
  }
  if (matchOff) {
    hoursOff = parseInt(matchOff[1], 10);
    minutesOff = parseInt(matchOff[2], 10);
    // Adjust hours for PM
    if (matchOff[3].toUpperCase() === 'PM' && hoursOff < 12) {
      hoursOff += 12;
    }
    // Adjust hours for AM (midnight)
    if (matchOff[3].toUpperCase() === 'AM' && hoursOff === 12) {
      hoursOff = 0;
    }
  }
  const currentTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    hours,
    minutes,
  );
  const currentOffTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    hoursOff,
    minutesOff,
  );
  console.log(currentOffTime, 'currentOffTime');

  const [time, setTime] = useState(currentTime);
  console.log(time, 'timetime');

  const [textInput, setTextInput] = useState(SubName || '');
  console.log(textInput, 'textInput');

  const minimumValue = 16;
  const maximumValue = 31;
  const [sliderValue, setSliderValue] = useState(temperature || 16);
  const screenWidth = Dimensions.get('window').width;
  const left = (sliderValue * (screenWidth - 60)) / 100 - 15;
  if (typeof sliderValue !== 'number' || typeof screenWidth !== 'number') {
    console.error(
      'Invalid sliderValue or screenWidth:',
      sliderValue,
      screenWidth,
    );
    return;
  }
  //swinch on/off
  const [isEnabled, setIsEnabled] = useState(Upower);
  console.log(isEnabled, 'isEnabled QQQQ');

  const [selectTime, setSelectTime] = useState(counttime||'');
  const [selectedOnAmPM, setSelectedOnAmPM] = useState('');
  const [selectedOffAmPM, setSelectedOffAmPM] = useState('');
  console.log(selectTime, 'selectTime');

  const [selectOffTime, setSelectOffTime] = useState(countOfftime || '');
  const daysArray = days.split(',').map(day => day.trim());

  const condition3 = daysArray.slice(); // Copy the array

  let daysNames = [];
  function getDayName(index) {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return daysOfWeek[index];
  }

  if (condition3.includes('Daily')) {
    daysNames = [1, 1, 1, 1, 1, 1, 1] || [0, 1, 1, 1, 1, 1, 1];
  } else if (condition3.includes('Weekends')) {
    daysNames = [1, 1, 0, 0, 0, 0, 0] || [1, 1, 1, 0, 0, 0, 0];
  } else if (condition3.includes('Weekdays')) {
    daysNames = [0, 0, 1, 1, 1, 1, 1] || [1, 0, 0, 1, 1, 1, 1];
  } else {
    for (let i = 0; i < 7; i++) {
      daysNames.push(condition3.includes(getDayName(i)) ? 1 : 0);
    }
    daysNames.reverse();
  }

  const [selectedDays, setSelectedDays] = useState(
    daysNames || [0, 0, 0, 0, 0, 0, 0],
  );
  // const [selectedDays, setSelectedDays] = useState([]);
  console.log(selectedDays, 'selectedDays');

  const daysOfWeek = ['Sun', 'Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon'];
  // Find the indices where selectedDays has 1
  const selectedDayNames = selectedDays
    .map((val, index) => (val === 1 ? daysOfWeek[index] : null))
    .filter(Boolean);

  // Replace 'Mon' with 'Sun' if 'Mon' is the last selected day
  if (
    selectedDayNames.length > 0 &&
    selectedDayNames[selectedDayNames.length - 1] === 'Mon'
  ) {
    selectedDayNames[selectedDayNames.length - 1] = 'Mon';
  }

  const createBouncyCheckbox = ({id, text, num}) => (
    <BouncyCheckbox
      disableBuiltInState
      key={id}
      size={28}
      fillColor="#4D98FF"
      unfillColor={selectedDays[id - 1] ? '#620042' : '#ccc'}
      text={text}
      innerIconStyle={{
        borderWidth: 1.5,
        borderColor: 'gray',
      }}
      textStyle={{
        right: 37,
        textDecorationLine: 'none', // Removed conditional styling
        color: selectedDays[id - 1] ? '#fff' : '#000',
        textAlign: 'center',
      }}
      onPress={() => handleDaySelection(num, !selectedDays[id - 1])}
    />
  );
  const checkboxesData = [
    {id: 7, text: 'M', num: 7, full: 'Mon'},
    {id: 6, text: 'T', num: 6, full: 'Tue'},
    {id: 5, text: 'W', num: 5, full: 'Wed'},
    {id: 4, text: 'T', num: 4, full: 'Thu'},
    {id: 3, text: 'F', num: 3, full: 'Fri'},
    {id: 2, text: 'S', num: 2, full: 'Sat'},
    {id: 1, text: 'S', num: 1, full: 'Sun'},
  ];

  const handleTimeChange = newTime => {
    setTime(newTime);
    const timeToFormat = toHoursAndMinutes(newTime);
    const [hours, minutes] = timeToFormat
      .split(':')
      .map(time => parseInt(time));
    const timeObj = new Date();
    console.log(timeObj, 'timeObj');

    timeObj.setHours(hours);
    timeObj.setMinutes(minutes);
    const ampm = timeObj.getHours() >= 12 ? 'PM' : 'AM';
    let hours12 = timeObj.getHours() % 12;
    hours12 = hours12 ? hours12 : 12;
    const minValue = minutes + hours * 60;
    console.log(ampm, 'ampm');
    setSelectedOnAmPM(timeObj);
    setSelectTime(minValue);
  };

  const handleOffTimeChange = newTime => {
    console.log(newTime, time, 'newTime');

    if (time < newTime && time !== newTime) {
      console.log("shubham bayyyyyyyyy");
      setOffTime(newTime);
      const timeToFormat = toHoursAndMinutes(newTime);
      const [hours, minutes] = timeToFormat
        .split(':')
        .map(time => parseInt(time));
      const timeObj = new Date();
      timeObj.setHours(hours);
      timeObj.setMinutes(minutes);
      const ampm = timeObj.getHours() >= 12 ? 'PM' : 'AM';
      let hours12 = timeObj.getHours() % 12;
      hours12 = hours12 ? hours12 : 12;
      const minValue = minutes + hours * 60;
  
      setSelectedOffAmPM(timeObj);
  
      setSelectOffTime(minValue);
    } else {
     alert("Please select a time that is later than the On time");
    }
    // return
   
  };

  const toHoursAndMinutes = time => {
    const selectedTime = new Date(time);
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  // Temperature value
  const handleValueChange = value => {
    setSliderValue(value);
  };

  const handleDaySelection = (num, isSelected) => {
    const updatedSelectedDays = [...selectedDays];
    updatedSelectedDays[num - 1] = isSelected ? 1 : 0;
    console.log(updatedSelectedDays, 'updatedSelectedDays');

    setSelectedDays(updatedSelectedDays);
    // Output the desired format
  };

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    let updatedIsOnEnabled = !isEnabled;
  };
  //  generateScheduleId id
  function generateScheduleId() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const size = 4;

    let id = '';
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }

    return id;
  }
  const scheduleId = generateScheduleId();

  // Remove timer API call
  const removeTimer = async ID => {
    console.log(ID);
    // let timerId = ID;
    let token = await AsyncStorage.getItem('AccessToken');

    try {
      let response = await Promise.all(
        ID.map(ID => removeSetTimer(token, nodeid, ID)),
      );
      navigation.navigate('Alerts');
    } catch (err) {
      alert(err.response.data.description);
      console.log(err.response.data.description, 'error');
      
    }
  };
  // Save timer API call
  const saveTimer = async (textInput, sliderValue) => {
    console.log(selectTime, 'textInput, sliderValue');
    if(selectTime ==''){
      alert('Please select a On Time');
      return false;
    }
    if(selectOffTime ==''){
      alert('Please select a Off Time');
      return false;
    }
    // return
    const name = textInput;
    if (name == '') {
      alert('Please enter a scheduler name');
      return false;
    }
  
    // return
    const tem = Math.floor(sliderValue);
    const Power = isEnabled;
    const TimeOff = selectOffTime;
    const id = scheduleId;
    const Time = selectTime;
    console.log(Time, id, Power, tem, TimeOff, 'Time');

    if (Time == '') {
      alert('Please select a Time');
      return false;
    }
    let daysValue = parseInt('0' + selectedDays.join(''), 2);
    console.log(daysValue, 'daysValue');
    // return

    let token = await AsyncStorage.getItem('AccessToken');
    console.log(id, '@@@@@@@@@@@@@@@@@@@@@@@');
    // return;
    try {
      let response = await setTimeDate(
        name,
        tem,
        id,
        Power,
        Time,
        daysValue,
        token,
        nodeid,
      );
      OffTimeApi(textInput, sliderValue);
    } catch (err) {
      alert(err.response.data.description,"err.response.data.description")
      console.log(err.response.data.description, 'error');
    }
  };

  const OffTimeApi = async (textInput, sliderValue) => {
    const name = textInput;
    const tem = Math.floor(sliderValue);
    const Power = !isEnabled;
    const TimeOff = selectOffTime;
    const id = generateScheduleId();
    const Time = selectTime;
    console.log(Time, id, Power, tem, TimeOff, 'Time');
    // return
    let daysValue = parseInt('0' + selectedDays.join(''), 2);
    console.log(id, 'daysValue');

    // return

    let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await setTimeDate(
        name,
        tem,
        id,
        Power,
        TimeOff,
        daysValue,
        token,
        nodeid,
      );
      console.log(response, 'response0000000000000000000');
      // navigation.navigate('Alerts');
      navigation.navigate('Alerts');
    } catch (err) {
      alert(err.response.data.description);
      console.log(err.response.data.description, 'error');
    
    }
  };

  // Update timer API call
  const UpdateFunction = async (textInput, sliderValue, ID) => {
    console.log(ID[0],selectTime,selectOffTime, 'shubham');
// return
    // return
    const name = textInput;
    // if (name == '') {
    //   alert('Please input a Value');
    //   return false;
    // }

    const tem = Math.floor(sliderValue);
    const Power = true;
    const id = ID[0];
    const Time = selectTime;
    // if (Time == '') {
    //   alert('Please select a Time');
    //   return false;
    // }
    let daysValue = parseInt('0' + selectedDays.join(''), 2);

    let token = await AsyncStorage.getItem('AccessToken');
    console.log(id, 'idididididid');

    try {
      let response = await UpdateTimeDate(
        name,
        tem,
        id,
        Power,
        Time,
        daysValue,
        token,
        nodeid,
      );
      await UpdateOffFunction(textInput, sliderValue);
    } catch (err) {
      alert(err.response.data.description);
      console.log(err.response.data.description, 'error a rhe haii kyyaya++++');

    }
  };

  const UpdateOffFunction = async (textInput, sliderValue) => {
    console.log(textInput, sliderValue, 'textInput, sliderValue, ID');

    const tem = Math.floor(sliderValue);
    const Power = false;
    const id = ID[1];
    const Time = selectOffTime;
    let daysValue = parseInt('0' + selectedDays.join(''), 2);

    let token = await AsyncStorage.getItem('AccessToken');

    try {
      let response = await UpdateTimeDate(
        textInput,
        tem,
        id,
        Power,
        Time,
        daysValue,
        token,
        nodeid,
      );

      navigation.navigate('Alerts');
    } catch (err) {
      alert(err.response.data.description);
      console.log(err.response.data.description, 'error a rhe haii kyyaya++++');

    }
  };

  // const [offTime, setOffTime] = useState(new Date());
  const [offTime, setOffTime] = useState(currentOffTime);
  const [showOnTimePicker, setShowOnTimePicker] = useState(false);
  const [showOffTimePicker, setShowOffTimePicker] = useState(false);

  const dayss = [
    {id: 0, label: 'S', full: 'Sun'},
    {id: 1, label: 'M', full: 'Mon'},
    {id: 2, label: 'T', full: 'Tue'},
    {id: 3, label: 'W', full: 'Wed'},
    {id: 4, label: 'T', full: 'Thu'},
    {id: 5, label: 'F', full: 'Fri'},
    {id: 6, label: 'S', full: 'Sat'},
  ];

  const toggleDay = day => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day],
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <View
        style={{
          flex: 1,

          height: 100,
          width: '100%',
        }}>
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
            <AntDesign name="arrowleft" size={24} color="black" />
          </Pressable>

          <View style={styles.textLayout}>
            <Text style={styles.textStyle}>Timer</Text>
          </View>
        </View>

        <View
          style={{
            flexGrow: 1,
            height: 100,
            backgroundColor: '#fff',
            width: '100%',
            paddingHorizontal: 10,
          }}>
          <View style={{}}>
            <ModelTime
              nodeid={nodeid}
              setTextInput={setTextInput}
              textInput={textInput}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 14,
              backgroundColor: '#5c4c34',
              borderRadius: 10,
              padding: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <DatePicker
              date={time}
              mode="time"
              onDateChange={handleTimeChange}
            />
          </View>
          <ScrollView>
            <View style={{width: '100%'}}>
              <Text style={styles.textColor}>Day's to Repeat</Text>

              <View
                style={{
                  marginTop: 14,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {checkboxesData.map(checkbox => createBouncyCheckbox(checkbox))}
              </View>
            </View>
            <Text style={styles.textColor}>
              Actions{' '}
              <Text style={{color: '#0c98f5', fontSize: 16}}>
                {name ? name : ' '}
              </Text>
            </Text>

            <View
              style={{
                height: 80,
                marginTop: 14,
                backgroundColor: '#fff',
                padding: 15,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#ccc',
                justifyContent: 'center',
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.8,
                shadowRadius: 4,
                elevation: 3,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'column', marginStart: 4}}>
                    <View>
                      <Text>Power</Text>
                    </View>
                    <View>
                      <Text>{isEnabled ? 'ON' : 'OFF'}</Text>
                    </View>
                  </View>
                </View>

                <View>
                  <Switch
                    trackColor={{false: '#4D98FF', true: '#4D98FF12'}}
                    thumbColor={isEnabled ? '#81b0ff' : '#FFFFFF'}
                    style={{transform: [{scaleX: 1}, {scaleY: 1}]}}
                    ios_backgroundColor="#D9D9D9"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
            </View>

            {isEnabled ? (
              <View
                style={{
                  height: 80,
                  marginTop: 10,
                  backgroundColor: '#fff',
                  padding: 15,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#ccc',
                  justifyContent: 'center',
                  shadowColor: 'rgba(0, 0, 0, 0.2)',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.8,
                  shadowRadius: 4,
                  elevation: 3,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                  }}>
                  Temperature
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <Text>{minimumValue}</Text>

                  <View style={{flex: 4}}>
                    <Text style={{width: 50, textAlign: 'center', left: left}}>
                      {Math.floor(sliderValue)}
                    </Text>
                    <Slider
                      style={{width: '100%', height: 24}}
                      value={temperature}
                      minimumValue={minimumValue}
                      maximumValue={maximumValue}
                      minimumTrackTintColor="#64bbf5"
                      maximumTrackTintColor="#000000"
                      thumbTintColor="#64bbf5"
                      thumbStyle={{width: 24, height: 24, borderRadius: 12}}
                      trackStyle={{height: 8, borderRadius: 4}}
                      onValueChange={handleValueChange}
                    />
                  </View>

                  <Text>{maximumValue}</Text>
                </View>
              </View>
            ) : (
              ''
            )}

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              {ID ? (
                <>
                  <View
                    style={{
                      flex: 1,
                      marginTop: 12,
                      flexDirection: 'row',
                      justifyContent: 'space-between',

                      alignContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: '50%',
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                      }}
                      onPress={() => {
                        UpdateFunction(textInput, sliderValue, ID);
                      }}>
                      <LinearGradient
                        colors={['#64bbf5', '#0c98f5']}
                        style={{borderRadius: 8, paddingVertical: 10}}>
                        <Text style={styles.appButtonText}>Update</Text>
                      </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        width: '50%',
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                      }}
                      onPress={() => removeTimer(ID)}>
                      <LinearGradient
                        colors={['#64bbf5', '#0c98f5']}
                        style={{borderRadius: 8, paddingVertical: 10}}>
                        <Text style={styles.appButtonText}>Remove</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    saveTimer(textInput, sliderValue);
                  }}
                  style={{
                    marginBottom: 24,
                    flex: 1,
                    width: '100%',
                    paddingVertical: 10,
                  }}>
                  <LinearGradient
                    colors={['#64bbf5', '#0c98f5']}
                    style={{borderRadius: 8, paddingVertical: 10}}>
                    <Text style={styles.appButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </View> */}
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
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>

        <View style={styles.textLayout}>
          <Text style={styles.textStyle}>Scheduler</Text>
        </View>
      </View>
      <View style={{padding: 20, backgroundColor: '#fff', flex: 1}}>
        <Text style={{color: 'gray', marginBottom: 20}}>
          The device will turn On and Off at the set schedule.
        </Text>

        <View style={{}}>
          <TextInput
            style={{
              height: 45,
              backgroundColor: 'white',
              padding: 10,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: '#9c9a9a',
            }}
            placeholder={'Enter scheduler name*'}
            placeholderTextColor="#000"
            maxLength={16}
            value={textInput}
            onChangeText={value => setTextInput(value)}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            if (!textInput) {
              alert('Please enter a scheduler name');
              return;
            }
            setShowOnTimePicker(true);
          }}
          disabled={
            ID.length > 0 ? (power ? false : true) : power ? true : false
          }
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: isEnabled ? '#ccc' : '#ddd',
          }}>
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
              Turn On Time
            </Text>
            <Text style={{fontSize: 16, color: '#555'}}>
              {selectedOnAmPM
                ? selectedOnAmPM.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : time.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
            </Text>
          </View>
          <Text style={{fontSize: 20, color: '#888'}}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setShowOffTimePicker(true);
          }}
          disabled={ ID.length > 0 && ID=="" ?  selectTime : !selectTime}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor:
              ID.length > 0 && ID==""? selectTime : !selectTime ? '#ccc' : '#ddd',
            opacity: ID.length > 0 && ID==""? selectTime : !selectTime ? 0.5 : 1,
          }}>
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
              Turn Off Time
            </Text>
            <Text style={{fontSize: 16, color: '#555'}}>
              <Text style={{fontSize: 16, color: '#555'}}>
                {selectedOffAmPM
                  ? selectedOffAmPM.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : offTime.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
              </Text>
            </Text>
          </View>
          <Text style={{fontSize: 20, color: '#888'}}>›</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
            Repeat
          </Text>
          <Text style={styles.textColor}>
            AC Name:{' '}
            <Text style={{color: '#620042', fontSize: 16}}>
              {name ? name : ' '}
         
            </Text>
          </Text>
        </View>

        <View style={{}}>
          <Text
            style={{
              color: '#620042',
              marginBottom: 10,
              fontSize: 16,
            }}>
            {/* {selectedDays.length > 0 ? selectedDays.join(', ') : 'None'} */}
            {selectedDayNames.length > 0
              ? selectedDayNames.reverse().join(', ')
              : 'None'}
          </Text>
        </View>

        {/* <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {dayss.map(day => (
            <TouchableOpacity
              key={day.id}
              onPress={() => toggleDay(day.full)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: selectedDays.includes(day.full)
                  ? '#620042'
                  : '#ccc',
                backgroundColor: selectedDays.includes(day.full)
                  ? '#620042'
                  : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 5,
              }}>
              <Text
                style={{
                  color: selectedDays.includes(day.full) ? '#fff' : '#000',
                  fontSize: 16,
                }}>
                {day.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View> */}
        <View
          style={{
            marginTop: 14,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {checkboxesData.map(checkbox => createBouncyCheckbox(checkbox))}
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 20,
            }}>
            <View style={{}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Set Temperature
              </Text>
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#620042',
                }}>
                {sliderValue}°C
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text style={{fontSize: 14, color: '#666'}}>16</Text>
            <Slider
              style={{flex: 1, height: 50}}
              minimumValue={16}
              maximumValue={31}
              step={1}
              value={sliderValue}
              onValueChange={handleValueChange}
              minimumTrackTintColor="#620042"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#620042"
            />
            <Text style={{fontSize: 14, color: '#666'}}>31</Text>
          </View>
        </View>

        {ID.length > 0 ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: 40,
              paddingHorizontal: 20,
            }}>
           

            <TouchableOpacity
              style={{
               
                flex: 1,
                marginRight: 10,
                backgroundColor: '#72004d',
                paddingVertical: 15,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
              }}
              onPress={() => removeTimer(ID)}>
              <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                Remove
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                marginLeft: 10,
                backgroundColor: '#72004d',
                paddingVertical: 15,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
                
              }}
              onPress={() => {
                // if(power){
                UpdateFunction(textInput, sliderValue, ID);

                // }else{
                // UpdateOffFunction(textInput, sliderValue, ID);

                // }
              }}>
              <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                Update
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: 40,
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                marginRight: 10,
                backgroundColor: '#72004d',
                paddingVertical: 15,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
              }}
              onPress={() => navigation.goBack()} >
              <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                marginLeft: 10,
                backgroundColor: '#72004d',
                paddingVertical: 15,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
              }}
              onPress={() => {
                saveTimer(textInput, sliderValue);
              }}>
              <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {showOnTimePicker && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={showOnTimePicker}
            onRequestClose={() => setShowOnTimePicker(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: 'rgba(0,0,0,0.3)',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 200,
                    marginTop: 18,
                    borderRadius: 10,
                    padding: 10,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}>
                  <DatePicker
                    date={time}
                    mode="time"
                    onDateChange={handleTimeChange}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: 40,
                    marginTop: 20,
                  }}>
                  <TouchableOpacity onPress={() => setShowOnTimePicker(false)}>
                    <Text style={{fontSize: 18, color: '#004080'}}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('ON time set ');
                      setShowOnTimePicker(false);
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#004080',
                        fontWeight: 'bold',
                      }}>
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}

        {showOffTimePicker && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={showOffTimePicker}
            onRequestClose={() => setShowOffTimePicker(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: 'rgba(0,0,0,0.3)',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 200,
                    marginTop: 18,
                    borderRadius: 10,
                    padding: 10,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}>
                  <DatePicker
                    date={offTime}
                    mode="time"
                    onDateChange={handleOffTimeChange}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: 40,
                    marginTop: 20,
                  }}>
                  <TouchableOpacity onPress={() => setShowOffTimePicker(false)}>
                    <Text style={{fontSize: 18, color: '#004080'}}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('Off time set ');
                      setShowOffTimePicker(false);
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#004080',
                        fontWeight: 'bold',
                      }}>
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AcTimeScreen;

const styles = StyleSheet.create({
  layoutTop: {
    flexDirection: 'row',
    marginTop: 12,
  },

  textLayout: {
    flex: 1,
    justifyContent: 'center',
  },

  textStyle: {
    fontSize: 18,

    color: 'black',

    fontWeight: '500',

    justifyContent: 'center',
  },

  textColor: {
    fontSize: 16,

    color: 'black',

 fontWeight: 'bold'


  },

  appButtonContainer: {
    elevation: 2,
    borderRadius: 8,

    paddingVertical: 10,

    paddingHorizontal: 12,

    width: 105,
    margin: 4,
  },

  appButtonText: {
    fontSize: 16,

    color: '#fff',

    fontWeight: '600',

    alignSelf: 'center',
  },

  input: {
    height: 45,
    marginTop: 22,
    backgroundColor: '#ffffff',
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#9c9a9a',
    justifyContent: 'center',
  },

  text: {
    // not used currently

    fontSize: 14,

    color: 'black',

    fontWeight: '500',

    marginTop: 6,
  },

  textBlue: {
    fontSize: 14,

    color: '#4BB6E8',

    fontWeight: 'bold',
  },

  layoutmenu: {
    marginTop: 22,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },
});
