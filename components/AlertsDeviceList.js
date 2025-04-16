import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {AlertSwitch} from '../Context/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width} = Dimensions.get('window');
function AlertsDeviceList({...props}) {
  const {navigation} = props;
  console.log(props, 'props');

  let NodeId = props.nodeid;
  let id = props.id;
  let tem = props.tem;
  let uname = props.offline;
  let time = props.date;
  let name = props.device;
  let Upower = props.toggle;
  let mint = props.mins;
  let power = props.power;
  let day = props.day;
  // const [isEnabled, setIsEnabled] = useState(Upower);
  const [isEnabled, setIsEnabled] = useState(Upower.some(val => val));
  const toggleSwitch = async (id, NodeId) => {
    try {
      let select = isEnabled ? 'disable' : 'enable';
      let token = await AsyncStorage.getItem('AccessToken');
      // let response = await AlertSwitch(id, token, NodeId, select);
      const responses = await Promise.all(
        id.map(id => AlertSwitch(id, token, NodeId, select)),
      );
      setIsEnabled(previousState => !previousState);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const OpenTime = (NodeId, tem, uname, time, power, day) => {
    console.log(time[0], '+++++++++++++++++');

    navigation.navigate('TimerScreen', {
      id: NodeId,
      temperature: tem,
      uname: uname,
      Idtime: time[0],
      offTime: time[1],
      name: name,
      Upower: Upower,
      TimeMint: mint,
      Id: id,
      day: day,
      power: power,
    });
  };
  return (
    <View style={styles.mainMargin}>
      <TouchableOpacity
        onPress={() => {
          OpenTime(NodeId, tem, uname, time, power, day);
        }}
        style={styles.mainCardView}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={styles.image}
              source={require('../assets/acimg.png')}
            />
          </View>

          <View style={styles.info}>
            <Text style={styles.title}>{props.offline || 'Office AC'}</Text>
            <Text style={styles.device}>{props.device || 'AC On'}</Text>
            <Text style={styles.day}>{props.day || 'None'}</Text>

            <Text style={styles.time}>
              {props.date && props.date.length >= 2
                ? `On: ${props.date[0]}, Off: ${props.date[1]}`
                : 'On: 00:00, Off: 00:00'}
            </Text>
          </View>
          <View
            style={
              {
                // width: '60%'
              }
            }>
            <View>
              <Switch
                trackColor={{false: '#810055', true: '#F9F2F6'}}
                thumbColor={isEnabled ? '#810055' : '#FFFFFF'}
                style={styles.switch}

                ios_backgroundColor="#D9D9D9"
               
                onValueChange={() => {
                  toggleSwitch(id, NodeId); // Call toggleSwitch for each id

                  // toggleSwitch(id, NodeId);
                }}
                value={isEnabled}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default AlertsDeviceList;

const styles = StyleSheet.create({
  mainMargin: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  mainCardView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 15,
  },
  image: {
    width: width * 0.2, // 20% of screen width
    height: 50,
    resizeMode: 'contain',
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: width * 0.04, // Dynamic font size
    fontWeight: '600',
  },
  device: {
    fontSize: width * 0.035,
    fontWeight: '500',
  },
  day: {
    fontSize: width * 0.035,
    fontWeight: '600',
    color: '#810055',
  },
  time: {
    fontSize: width * 0.035,
    fontWeight: '400',
    flexWrap: 'wrap', // Prevents text overflow
  },
  switch: {
    transform: [{scaleX: 1}, {scaleY: 1}],
  },
});
