import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {useEffect, useState} from 'react';

import {Button, Image, Text, TouchableOpacity, View} from 'react-native';

import Modal from 'react-native-modal';

import {featuresContol} from '../../Context/API';

// Auto

const soundImg = require('../../assets/autogray.png');

const muteImg = require('../../assets/autoblue.png');

// Low

const FunImg = require('../../assets/fanlowg.png');

const modeImg = require('../../assets/fanlowb.png');

// Mid

const midGrayImg = require('../../assets/fanmidg.png');
const midBlueImg = require('../../assets/fanmidb.png');

// High

const highGrayImg = require('../../assets/fanhighg.png');

const highBlueImg = require('../../assets/fanhightb.png');

const AcFanScreen = props => {
  // console.log(props.setFan, 'id');
  let nodeid = props.id;
  let FanMode = props.Fan;
  // console.log(FanMode,"FanMode.......");
  const result = FanMode === 'Low' ? true : false;
  console.log(result, 'FanModessss');
  console.log(nodeid, FanMode, 'nodeid');

  const {navigation} = props;

  const [isModalVisible, setModalVisible] = useState(false);

  // state for fan modes

  const [changeImage, setChnageImage] = useState(
    FanMode === 'Auto' ? true : false,
  ); // Auto

  const [data, setDate] = useState(FanMode === 'Low' ? true : false); // Low

  const [midData, setMidDate] = useState(FanMode === 'Medium' ? true : false); // Mid

  const [highData, setHighDate] = useState(FanMode === 'High' ? true : false); // High

  // Auto

  let imageXml = (
    <Image
      style={{width: 70, height: 70, resizeMode: 'contain'}}
      source={changeImage ? muteImg : soundImg}
    />
  );

  // Low

  let imageMode = (
    <Image
      style={{width: 70, height: 70, resizeMode: 'contain'}}
      source={data ? modeImg : FunImg}
    />
  );

  // Mid

  let imageMidMode = (
    <Image
      style={{width: 70, height: 70, resizeMode: 'contain'}}
      source={midData ? midBlueImg : midGrayImg}
    />
  );

  // High

  let imageHighMode = (
    <Image
      style={{width: 70, height: 70, resizeMode: 'contain'}}
      source={highData ? highBlueImg : highGrayImg}
    />
  );

  // const fanModeSelectedData = values => {
  //   console.log(values);
  //   if (values == 'Auto') {
  //     setChnageImage(true);

  //     setDate(false);

  //     setMidDate(false);

  //     setHighDate(false);

  //     //send fan speed parameters

  //     featuresContolFunction(values);
  //   } else if (values == 'Low') {
  //     setDate(true);

  //     setChnageImage(false);

  //     setMidDate(false);

  //     setHighDate(false);

  //     //send fan speed parameters

  //     featuresContolFunction(values);
  //   } else if (values == 'Medium') {
  //     setMidDate(true);

  //     setChnageImage(false);

  //     setDate(false);

  //     setHighDate(false);

  //     //send fan speed parameters

  //     featuresContolFunction(values);
  //   } else if (values == 'High') {
  //     setHighDate(true);

  //     setChnageImage(false);

  //     setDate(false);

  //     setMidDate(false);

  //     //send fan speed parameters

  //     featuresContolFunction(values);
  //   }
  // };

  const fanModeSelectedData = async values => {
    try {
      if (values === 'Auto') {
        setChnageImage(true);
        setDate(false);
        setMidDate(false);
        setHighDate(false);
      } else if (values === 'Low') {
        setDate(true);
        setChnageImage(false);
        setMidDate(false);
        setHighDate(false);
      } else if (values === 'Medium') {
        setMidDate(true);
        setChnageImage(false);
        setDate(false);
        setHighDate(false);
      } else if (values === 'High') {
        setHighDate(true);
        setChnageImage(false);
        setDate(false);
        setMidDate(false);
      }

      // Send fan speed parameters
      await featuresContolFunction(values);

      // Optionally, you can fetch the updated fan mode here
      // and update the state accordingly if necessary
    } catch (error) {
      console.log(error);
    }
  };

  const featuresContolFunction = async values => {
    // console.log(nodeid, 'get_Val');
    let key = 'AC';
    let param = 'Fan Speed';

    let token = await AsyncStorage.getItem('AccessToken');

    // console.log(nodeid, param, values, 'token, nodeid, param, values');

    // return

    try {
      let response = await featuresContol(key, token, nodeid, param, values);
      console.log(response.data, 'response');
      props.setFan(values);
    } catch (err) {
      console.log(err, 'error');
    }
  };
  useEffect(() => {
    // const FanModeLower = FanMode?.toLowerCase();
    setChnageImage(FanMode === 'Auto');
    setDate(FanMode === 'Low');
    setMidDate(FanMode === 'Medium');
    setHighDate(FanMode === 'High');
  }, [FanMode]);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          width: 60,

          height: 60,

          borderRadius: 10,

          backgroundColor: '#DDDDDD',

          justifyContent: 'center',

          alignItems: 'center',
        }}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Image
          source={require('../../assets/iconFAN.png')}
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
                FAN SPEED
              </Text>
            </View>

            {/* Fan mode click event */}

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

              <TouchableOpacity // Low
                onPress={() => {
                  fanModeSelectedData('Low');
                }}
                style={{paddingHorizontal: 5}}>
                {imageMode}
              </TouchableOpacity>

              <TouchableOpacity // Mid
                onPress={() => {
                  fanModeSelectedData('Medium');
                }}
                style={{paddingHorizontal: 5}}>
                {imageMidMode}
              </TouchableOpacity>

              <TouchableOpacity // High
                onPress={() => {
                  fanModeSelectedData('High');
                }}
                style={{paddingHorizontal: 5}}>
                {imageHighMode}
              </TouchableOpacity>
            </View>

            {/* <View
              style={{
                marginVertical: 100,

                marginHorizontal: 15,

                flexDirection: 'row',

                alignItems: 'center',

                justifyContent: 'center',

                width: '90%',

                paddingVertical: 8,

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
                  Air blow speed will be ~ 55 Cubic Mtr/min
                </Text>
              </View>
            </View> */}
          </View>
        </View>

        {/* </View> */}
      </Modal>
    </View>
  );
};

export default AcFanScreen;
