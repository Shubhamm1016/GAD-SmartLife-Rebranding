import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {useEffect, useState} from 'react';

import {Button, Image, Text, TouchableOpacity, View} from 'react-native';

import Modal from 'react-native-modal';

import {featuresContol} from '../../Context/API';
import { GEGBodyCopy } from '../../comman-compnent/FontFamily';

// Auto

const soundImg = require('../../assets/autogray.png');

const muteImg = require('../../assets/autoblue.png');

// Cool

const FunImg = require('../../assets/modecool.png');

const modeImg = require('../../assets/modecoolblue.png');

// dry

const midGrayImg = require('../../assets/modedry.png');

const midBlueImg = require('../../assets/modedryblue.png');

// Heat

const highGrayImg = require('../../assets/modeheat.png');

const highBlueImg = require('../../assets/modeheatblue.png');

// Fan

const grayImg = require('../../assets/modefan.png');

const blueImg = require('../../assets/modefanblue.png');

const modes = {
  Cool: {
    description: 'Cool mode sets the temperature range 16°C to 31°C',
  },
  Auto: {
    description: 'Auto mode sets the temperature 24°C',
  },
  Dry: {
    description: 'Dry mode sets the temperature 24°C',
  },
  Fan: {
    description: 'Fan mode set room temperature',
  },
  Heat: {
    description:
      'Please do not select HEAT mode if the machine you purchased is cooling only type. Heat mode is not supported by the cooling only appliance.',
  },
};

const AcModeScreen = props => {
  const {navigation} = props;
  // console.log(props, 'props++++++');
  let nodeid = props.id;
  let mode = props.mode;

  const [description, setDescription] = useState({});
  // console.log(description, 'description aaa');

  console.log(mode, 'nodeid aaaaaa');
  const result = mode === 'Auto || auto' ? true : false;
  // console.log(result, 'FanModessss');
  const [isModalVisible, setModalVisible] = useState(false);

  // state for modes
  const [changeImage, setChnageImage] = useState(
    mode === 'Auto' || mode === 'auto' ? true : false,
  ); // Auto
  const [data, setDate] = useState(
    mode === 'Cool' || mode === 'cool' ? true : false,
  ); // Cool
  const [midData, setMidDate] = useState(
    mode === 'Dry' || mode === 'dry' ? true : false,
  ); // dry
  const [highData, setHighDate] = useState(
    mode === 'Heat' || mode === 'heat' ? true : false,
  ); // Heat
  const [fanData, setFanDate] = useState(
    mode === 'Fan' || mode === 'fan-only' ? true : false,
  ); // Fan
  useEffect(() => {
    const modeLower = mode?.toLowerCase(); // Ensure mode is treated case-insensitively once
    setChnageImage(modeLower === 'auto');
    setDate(modeLower === 'cool');
    setMidDate(modeLower === 'dry');
    setHighDate(modeLower === 'heat');
    setFanDate(modeLower === 'fan-only' || modeLower === 'fan');
  }, [mode]);

  // Auto

  let imageXml = (
    <Image
      style={{width: 70, height: 70, resizeMode: 'contain'}}
      source={changeImage ? muteImg : soundImg}
    />
  );

  // Cool

  let imageMode = (
    <Image
      style={{width: 70, height: 70, resizeMode: 'contain'}}
      source={data ? modeImg : FunImg}
    />
  );

  // dry

  let imageMidMode = (
    <Image
      style={{width: 70, height: 70, resizeMode: 'contain'}}
      source={midData ? midBlueImg : midGrayImg}
    />
  );

  // Heat

  let imageHighMode = (
    <Image
      style={{width: 70, height: 70, resizeMode: 'contain'}}
      source={highData ? highBlueImg : highGrayImg}
    />
  );

  // Fan

  let imageFanMode = (
    <Image
      style={{width: 70, height: 70, resizeMode: 'contain'}}
      source={fanData ? blueImg : grayImg}
    />
  );

  const fanModeSelectedData = values => {
    if (values == 'Auto') {
      setChnageImage(true);

      setDate(false);

      setMidDate(false);

      setHighDate(false);

      setFanDate(false);
      // SetTemp();
      featuresContolFunction(values);
      setDescription(modes['Auto']);
    } else if (values == 'Cool') {
      setDate(true);

      setChnageImage(false);

      setMidDate(false);

      setHighDate(false);

      setFanDate(false);
      // SetTemp();
      featuresContolFunction(values);
      setDescription(modes['Cool']);
    } else if (values == 'Dry') {
      setMidDate(true);

      setChnageImage(false);

      setDate(false);

      setHighDate(false);

      setFanDate(false);
      // SetTemp();
      featuresContolFunction(values);
      setDescription(modes['Dry']);
    } else if (values == 'Heat') {
      setHighDate(true);

      setChnageImage(false);

      setDate(false);

      setMidDate(false);

      setFanDate(false);
      // SetTemp();
      // featuresContolFunction(values);
      setDescription(modes['Heat']);
    } else if (values == 'Fan') {
      setFanDate(true);

      setHighDate(false);

      setChnageImage(false);

      setDate(false);

      setMidDate(false);

      featuresContolFunction(values);
      setDescription(modes['Fan']);
    }
  };

  // const fanModeSelectedData = values => {
  //   // Update the description based on selected mode
  //   setDescription(modes[values] || {description: 'Mode not available'});

  //   // Update mode images and states based on the selected mode
  //   if (values === 'Auto') {
  //     setChnageImage(true);
  //     setDate(false);
  //     setMidDate(false);
  //     setHighDate(false);
  //     setFanDate(false);
  //     featuresContolFunction(values);
  //     setDescription(modes['Auto']);
  //   } else if (values === 'Cool') {
  //     setDate(true);
  //     setChnageImage(false);
  //     setMidDate(false);
  //     setHighDate(false);
  //     setFanDate(false);
  //     featuresContolFunction(values);
  //     setDescription(modes['Cool']);
  //   } else if (values === 'Dry') {
  //     setMidDate(true);
  //     setChnageImage(false);
  //     setDate(false);
  //     setHighDate(false);
  //     setFanDate(false);
  //     featuresContolFunction(values);
  //     setDescription(modes['Dry']);
  //   } else if (values === 'Heat') {
  //     setHighDate(true);
  //     setChnageImage(false);
  //     setDate(false);
  //     setMidDate(false);
  //     setFanDate(false);
  //     featuresContolFunction(values);
  //     setDescription(modes['Heat']);
  //   } else if (values === 'Fan') {
  //     setFanDate(true);
  //     setHighDate(false);
  //     setChnageImage(false);
  //     setDate(false);
  //     setMidDate(false);
  //     featuresContolFunction(values);
  //     setDescription(modes['Fan']);
  //   }
  // };

  const featuresContolFunction = async values => {
    let key = 'AC';
    let param = 'Mode';
    let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await featuresContol(key, token, nodeid, param, values);
      console.log(response.data, 'response');
      props.setmode(values);
    } catch (err) {
      if (err.response) {
        // Server responded with a status code out of 2xx range
        console.error('Server error:', err.response.status, err.response.data);
        alert(
          `Server error: ${err.response.status}. ${
            err.response.data.message || 'Please try again later.'
          }`,
        );
      } else if (err.request) {
        // No response was received after the request was made
        console.error('Network error:', err.request);
        alert(
          'Network error: Unable to reach the server. Please check your internet connection.',
        );
      } else {
        // Any other errors
        console.error('Error:', err.message);
        alert(`Error: ${err.message}`);
      }
    }
  };
  const SetTemp = async () => {
    let values = 24;
    let key = 'AC';
    let param = 'Temperature';
    let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await featuresContol(key, token, nodeid, param, values);
      console.log(response, 'response');
      // props.setmode(values);
      // setState(prevState => ({...prevState, temperature: values}));
    } catch (err) {
      console.log(err.response.data, 'error');
    }
  };

  useEffect(() => {
    // Check if modes[mode] exists before setting the description
    if (modes[mode]) {
      setDescription(modes[mode]);
    } else {
      setDescription({description: 'Mode not available'});
    }
  }, [mode]);

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
          source={require('../../assets/acmode.png')}
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

            backgroundColor: '#FFFFFF',

            width: '100%',

            borderTopRightRadius: 20,

            borderTopLeftRadius: 20,
          }}>
          <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
            <View style={{paddingVertical: 10, paddingHorizontal: 5}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: '#525968'}}>
                MODE
              </Text>
            </View>

            {/*mode click event */}

            <View
              style={{
                marginTop: 8,

                flexDirection: 'row',

                alignItems: 'center',

                justifyContent: 'space-between',
              }}>
              <TouchableOpacity // Auto
                onPress={() => {
                  fanModeSelectedData('Auto');
                }}
                style={{paddingHorizontal: 5}}>
                {imageXml}
              </TouchableOpacity>

              <TouchableOpacity // Cool
                onPress={() => {
                  fanModeSelectedData('Cool');
                }}
                style={{paddingHorizontal: 5}}>
                {imageMode}
              </TouchableOpacity>

              <TouchableOpacity // dry
                onPress={() => {
                  fanModeSelectedData('Dry');
                }}
                style={{paddingHorizontal: 5}}>
                {imageMidMode}
              </TouchableOpacity>

              <TouchableOpacity // Heat
                onPress={() => {
                  fanModeSelectedData('Heat');
                }}
                style={{paddingHorizontal: 5}}>
                {imageHighMode}
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 14}}>
              <TouchableOpacity // Fan
                onPress={() => {
                  fanModeSelectedData('Fan');
                }}
                style={{paddingHorizontal: 5}}>
                {imageFanMode}
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginVertical: 50,
                marginHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '90%',
                backgroundColor: '#F9F2F6',
                borderRadius: 10,
                padding: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#810055',
                  borderColor: '#810055',
                  paddingHorizontal: 8,
                  borderRadius: 100,
                  marginHorizontal: 8,
                  
                }}>
                <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
                  i
                </Text>
              </View>

              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: '#810055',fontFamily:GEGBodyCopy}}>
                  {description?.description || 'No description available'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* </View> */}
      </Modal>
    </View>
  );
};

export default AcModeScreen;
