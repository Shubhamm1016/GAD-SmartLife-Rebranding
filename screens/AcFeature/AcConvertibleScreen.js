import React, {useEffect, useState} from 'react';

import {Button, Image, Text, TouchableOpacity, View} from 'react-native';

import Modal from 'react-native-modal';

import {featuresContol} from '../../Context/API';

import AsyncStorage from '@react-native-async-storage/async-storage';

// c1

const soundImg = require('../../assets/conc1.png');

const muteImg = require('../../assets/conc1b.png');

// c2

const FunImg = require('../../assets/conc2.png');

const modeImg = require('../../assets/conc2b.png');

// c3

const midGrayImg = require('../../assets/conc3.png');

const midBlueImg = require('../../assets/conc3b.png');

// c4

const highGrayImg = require('../../assets/conc4.png');

const highBlueImg = require('../../assets/conc4b.png');

// c5

const grayImg = require('../../assets/conc5.png');

const blueImg = require('../../assets/conc5b.png');

// off

const grayConImg = require('../../assets/conoff.png');

const blueConImg = require('../../assets/conoffb.png');

const AcConvertibleScreen = props => {
  const {navigation} = props;
  const nodeAllData = props.nodeAllData;
  // console.log(props.converrt, 'id');
  let nodeid = props.id;
  let Convert = props.converrt;
  const [isModalVisible, setModalVisible] = useState(false);

  // state for 5In1

  const [changeImage, setChnageImage] = useState(Convert === 1 ? true : false); // c1

  const [data, setDate] = useState(Convert === 2 ? true : false); // c2

  const [midData, setMidDate] = useState(Convert === 3 ? true : false); // c3

  const [highData, setHighDate] = useState(Convert === 4 ? true : false); // c4

  const [fanData, setFanDate] = useState(Convert === 5 ? true : false); // c5

  const [conOffData, setconOffDate] = useState(Convert === 6 ? true : false); // Off

  useEffect(() => {
    setChnageImage(Convert === 1);
    setDate(Convert === 2);
    setMidDate(Convert === 3);
    setHighDate(Convert === 4);
    setFanDate(Convert === 5);
    setconOffDate(Convert === 6);
  }, [Convert]);
  // c1

  let imageXml = (
    <Image
      style={{width: 70, height: 70, resizeMode: 'contain'}}
      source={changeImage ? muteImg : soundImg}
    />
  );

  // c2

  let imageMode = (
    <Image
      style={{width: 70, height: 70, resizeMode: 'contain'}}
      source={data ? modeImg : FunImg}
    />
  );

  // c3

  let imageMidMode = (
    <Image
      style={{width: 70, height: 70, resizeMode: 'contain'}}
      source={midData ? midBlueImg : midGrayImg}
    />
  );

  // c4

  let imageHighMode = (
    <Image
      style={{width: 70, height: 70, resizeMode: 'contain'}}
      source={highData ? highBlueImg : highGrayImg}
    />
  );

  // c5

  let imageFanMode = (
    <Image
      style={{width: 70, height: 70, resizeMode: 'contain'}}
      source={fanData ? blueImg : grayImg}
    />
  );

  // Off

  let imageConOffMode = (
    <Image
      style={{width: 70, height: 70, resizeMode: 'contain'}}
      source={conOffData ? blueConImg : grayConImg}
    />
  );

  const fanModeSelectedData = values => {
    // console.log(values);

    if (values == 1) {
      setChnageImage(true);

      setDate(false);

      setMidDate(false);

      setHighDate(false);

      setFanDate(false);

      setconOffDate(false);

      featuresContolFunction(values);
    } else if (values == 2) {
      setDate(true);

      setChnageImage(false);

      setMidDate(false);

      setHighDate(false);

      setFanDate(false);

      setconOffDate(false);

      featuresContolFunction(values);
    } else if (values == 3) {
      setMidDate(true);

      setChnageImage(false);

      setDate(false);

      setHighDate(false);

      setFanDate(false);

      setconOffDate(false);

      featuresContolFunction(values);
    } else if (values == 4) {
      setHighDate(true);

      setChnageImage(false);

      setDate(false);

      setMidDate(false);

      setFanDate(false);

      setconOffDate(false);

      featuresContolFunction(values);
    } else if (values == 5) {
      // console.log("ppppppp");
      setFanDate(true);

      setHighDate(false);

      setChnageImage(false);

      setDate(false);

      setMidDate(false);

      setconOffDate(false);

      featuresContolFunction(values);
    } else if (values == 6) {
      setconOffDate(false);

      setFanDate(false);

      setHighDate(false);

      setChnageImage(false);

      setDate(false);

      setMidDate(false);

      featuresContolFunction(values);
    }
  };

  const featuresContolFunction = async values => {
    //let values = parseInt(numVal);

    // console.log(nodeid, 'get_Val');
    let key = 'AC';
    let param = 'AC5in1';

    let token = await AsyncStorage.getItem('AccessToken');

    // console.log(nodeid, param, values, 'token, nodeid, param, values');

    try {
      let response = await featuresContol(key, token, nodeid, param, values);
      console.log(response.data, 'response');
      nodeAllData();
    } catch (err) {
      console.log(err, 'error');
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
          source={require('../../assets/iconCONVERTIBLE.png')}
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
                5 IN 1 CONVERTIBLE
              </Text>
            </View>

            {/*5In1 click event */}

            <View
              style={{
                marginTop: 8,

                flexDirection: 'row',

                alignItems: 'center',

                justifyContent: 'space-between',
              }}>
              <TouchableOpacity // C1
                onPress={() => {
                  fanModeSelectedData(1);
                }}
                style={{paddingHorizontal: 5}}>
                {imageXml}
              </TouchableOpacity>

              <TouchableOpacity // C2
                onPress={() => {
                  fanModeSelectedData(2);
                }}
                style={{paddingHorizontal: 5}}>
                {imageMode}
              </TouchableOpacity>

              <TouchableOpacity // C3
                onPress={() => {
                  fanModeSelectedData(3);
                }}
                style={{paddingHorizontal: 5}}>
                {imageMidMode}
              </TouchableOpacity>

              <TouchableOpacity // C4
                onPress={() => {
                  fanModeSelectedData(4);
                }}
                style={{paddingHorizontal: 5}}>
                {imageHighMode}
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',

                justifyContent: 'flex-start',

                marginTop: 14,
              }}>
              <TouchableOpacity // C5
                onPress={() => {
                  fanModeSelectedData(5);
                }}
                style={{paddingHorizontal: 6}}>
                {imageFanMode}
              </TouchableOpacity>

              <TouchableOpacity // Off
                onPress={() => {
                  fanModeSelectedData(6);
                }}
                style={{paddingHorizontal: 28}}>
                {imageConOffMode}
              </TouchableOpacity>
            </View>

            {/* <View
              style={{
                marginVertical: 50,

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
      </Modal>
    </View>
  );
};

export default AcConvertibleScreen;
