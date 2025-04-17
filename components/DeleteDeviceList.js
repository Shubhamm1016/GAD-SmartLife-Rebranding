import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import React, {useState} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {featuresMappingContol} from '../Context/API';
import {GEGBold, GEGHeadline} from '../comman-compnent/FontFamily';

const DeleteDeviceList = props => {
  console.log(props.Modeltype, 'devi');
  const {navigation} = props;
  let nodeid = props.node_id;
  console.log(nodeid, 'nodeid');
  const hardrestDeviceClick = () => {
    let values = 'remove';
    nodeMappingFunction(values);
  };

  const nodeMappingFunction = async values => {
    console.log(nodeid, 'nodeidmmmm');

    let param = 'operation';
    let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await featuresMappingContol(token, nodeid, param, values);
      console.log(response, 'response..');
      navigation.navigate('Home');
    } catch (err) {
      console.log(err.response.data.description, 'error');
    }
  };

  const getDeviceImage =Modeltype => {
    console.log(Modeltype, 'deviceName');

    // Convert deviceName to lowercase to ensure case-insensitive comparison
    const normalizedDeviceName = Modeltype.trim().toLowerCase();
    console.log(normalizedDeviceName, 'normalizedDeviceName');

    switch (normalizedDeviceName) {
      case 'aircon3':
        return require('../assets/acimg.png');
      case 'washer_fatl':
        return require('../assets/washingmashine/wmashine.png');
      case 'ref_con_reg':
        return require('../assets/RefImage/RefImage.png'); // make sure path is correct
      default:
        return require('../assets/acimg.png');
    }
  };

  const getDeviceLabel = deviceName => {
    const normalized = deviceName.trim().toLowerCase();

    switch (normalized) {
      case 'ac':
        return 'Godrej AC';
      case 'washing machine':
        return 'Godrej Washing Machine';
      case 'refrigerator':
        return 'Godrej Refrigerator';
      default:
        return `Godrej ${deviceName}`;
    }
  };

  return (
    <SafeAreaView style={styles.mainMargin}>
      <View style={styles.mainMargin}>
        <Pressable
          onPress={() => console.log('delete device')}
          style={styles.mainCardView}>
          <View
            style={{
              flexDirection: 'row',

              alignItems: 'center',

              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.image}
                source={getDeviceImage(props.Modeltype)}
              />

              <Text style={styles.container}>
                {props.device.toLowerCase().includes('godrej')
                  ? props.device
                  : `Godrej ${props.device}`}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                console.log('delect');
                hardrestDeviceClick();
              }}
              style={{
                flexDirection: 'row',

                alignItems: 'center',

                width: 90,

                height: 35,

                backgroundColor: '#810055',

                borderRadius: 25,

                borderBottomWidth: 1,

                borderColor: '#810055s',

                justifyContent: 'center',
              }}>
              <AntDesign name="delete" color="#ffffff" size={14} />

              <Text style={styles.textLay}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default DeleteDeviceList;

const styles = StyleSheet.create({
  mainCardView: {
    height: 85,

    backgroundColor: 'white',

    borderRadius: 15,

    shadowColor: 'gray',

    shadowOffset: {width: 0, height: 0},

    shadowOpacity: 1,

    shadowRadius: 8,

    elevation: 8,

    justifyContent: 'center',

    paddingHorizontal: 12,
  },

  image: {
    width: 70,

    height: 55,

    resizeMode: 'contain',
  },

  textLay: {
    fontSize: 11,

    color: '#ffffff',
    fontFamily: GEGBold,
    marginStart: 4,
  },

  mainMargin: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  container: {
    fontSize: 13,
    color: '#000000',
    marginStart: 10,
    fontFamily: GEGHeadline,
  },
});
