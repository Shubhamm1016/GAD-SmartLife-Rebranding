import React, {useContext, useEffect, useState} from 'react';

import {
  Button,
  Image,
  // Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Modal from 'react-native-modal';
import {Switch} from 'react-native-switch';
import {featuresContol} from '../../Context/API';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AcFunctionScreen = props => {
  // console.log(
  //   props.route.params.data.item.alldata.params.AC,
  //   'propspropsprops',
  // );
  const nodeAllData = props.nodeAllData;
  // console.log(nodeAllData, 'nodeAllData');
  const {navigation} = props;

  let nodeid = props.id;

  // console.log(props.silent, 'nodeid');

  let energtSaving = props.energtSaving;

  let silent = props.silent;

  let hygine = props.hygine;

  let sleep = props.sleep;

  let turbo = props.turbo;
  let mode = props.mode;
  const [hide, setHide] = useState(mode);

  const [isModalVisible, setModalVisible] = useState(false);

  // Slient mode

  const [isEnabled, setIsEnabled] = useState(silent);

  const toggleSwitch = () => {
    let param = 'IndoorNoise';

    setIsEnabled(previousState => !previousState);

    let updatedIsOnEnabled = !isEnabled;

    featuresContolFunction(param, updatedIsOnEnabled);
  };

  // Energy saving

  const [isonEnabled, setIsOnEnabled] = useState(energtSaving);

  const toggleOnSwitch = () => {
    let param = 'EnergySaving';

    setIsOnEnabled(previousState => !previousState);

    let updatedIsOnEnabled = !isonEnabled;

    featuresContolFunction(param, updatedIsOnEnabled);
  };

  // Hygiene +

  const [hyonEnabled, sethyOnEnabled] = useState(hygine);

  const toggleHyOnSwitch = () => {
    let param = 'Hygiene';

    sethyOnEnabled(previousState => !previousState);

    let updatedIsOnEnabled = !hyonEnabled;

    featuresContolFunction(param, updatedIsOnEnabled);
  };

  // Sleep

  const [slonEnabled, setSleOnEnabled] = useState(sleep);

  const toggleOnSlepSwitch = () => {
    let param = 'Sleep';

    setSleOnEnabled(previousState => !previousState);

    let updatedIsOnEnabled = !slonEnabled;

    featuresContolFunction(param, updatedIsOnEnabled);
  };

  // Turbo

  const [isTurEnabled, setTurOnEnabled] = useState(turbo);

  const toggleTurSwitch = () => {
    let param = 'Turbo';
    setTurOnEnabled(previousState => !previousState);
    let updatedIsOnEnabled = !isTurEnabled;
    featuresContolFunction(param, updatedIsOnEnabled);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const featuresContolFunction = async (param, values) => {
    console.log(nodeid, param, values, 'get_Val_ttttttt');
    let key = 'AC';
    let token = await AsyncStorage.getItem('AccessToken');

    try {
      let response = await featuresContol(key, token, nodeid, param, values);
      console.log(response.data, 'response');
      nodeAllData();
    } catch (err) {
      console.log(err, 'error');
    }
  };

  useEffect(() => {
    setIsOnEnabled(energtSaving);
    setIsEnabled(silent);
    sethyOnEnabled(hygine);
    setSleOnEnabled(sleep);
    setTurOnEnabled(turbo);
    setHide(mode);
  }, [energtSaving, silent, hygine, sleep, turbo, mode]);

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
          source={require('../../assets/iconFUNCTION.png')}
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

            backgroundColor: '#fff',

            width: '100%',

            borderTopRightRadius: 20,

            borderTopLeftRadius: 20,
          }}>
          <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
            <View style={{paddingVertical: 20, paddingHorizontal: 5}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: '#525968'}}>
                FUNCTION
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',

                justifyContent: 'space-between',

                paddingHorizontal: 10,

                paddingVertical: 10,
              }}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 16,
                  color: isonEnabled ? '#810055' : 'black',
                }}>
                Energy Saving
              </Text>

              <View>
                <Switch
                  trackColor={{false: '#D9D9D9', true: '#4D98FF12'}}
                  style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
                  ios_backgroundColor="#D9D9D9"
                  backgroundActive={'#F2E5EE'}
                  backgroundInactive={'#D9D9D9'}
                  circleActiveColor={'#810055'}
                  circleInActiveColor={'#FFFFFF'}
                  onValueChange={toggleOnSwitch}
                  outerCircleStyle={{marginRight: 50}}
                  // activeText={'On'}
                  // inActiveText={'Off'}
                  activeTextStyle={{color: '#810055', fontWeight: '600'}}
                  inactiveTextStyle={{color: '#FFFFFF', fontWeight: '600'}}
                  switchLeftPx={10}
                  switchRightPx={10}
                  switchWidthMultiplier={2}
                  value={isonEnabled}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',

                justifyContent: 'space-between',

                paddingHorizontal: 10,

                paddingVertical: 10,
              }}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 16,
                  color: isEnabled ? '#810055' : 'black',
                }}>
                Silent Mode
              </Text>

              <View>
                <Switch
                  trackColor={{false: '#D9D9D9', true: '#4D98FF12'}}
                  style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
                  ios_backgroundColor="#D9D9D9"
                  backgroundActive={'#F2E5EE'}
                  backgroundInactive={'#D9D9D9'}
                  circleActiveColor={'#810055'}
                  circleInActiveColor={'#FFFFFF'}
                  onValueChange={toggleSwitch}
                  outerCircleStyle={{marginRight: 50}}
                  activeText={'On'}
                  inActiveText={'Off'}
                  activeTextStyle={{color: '#810055', fontWeight: '600'}}
                  inactiveTextStyle={{color: '#FFFFFF', fontWeight: '600'}}
                  switchLeftPx={10}
                  switchRightPx={10}
                  switchWidthMultiplier={2}
                  value={isEnabled}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',

                justifyContent: 'space-between',

                paddingHorizontal: 10,

                paddingVertical: 10,
              }}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 16,
                  color: hyonEnabled ? '#810055' : 'black',
                }}>
                Hygiene+
              </Text>

              <View>
                <Switch
                  trackColor={{false: '#D9D9D9', true: '#4D98FF12'}}
                  style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
                  ios_backgroundColor="#D9D9D9"
                  backgroundActive={'#F2E5EE'}
                  backgroundInactive={'#D9D9D9'}
                  circleActiveColor={'#810055'}
                  circleInActiveColor={'#FFFFFF'}
                  onValueChange={toggleHyOnSwitch}
                  outerCircleStyle={{marginRight: 50}}
                  activeText={'On'}
                  inActiveText={'Off'}
                  activeTextStyle={{color: '#810055', fontWeight: '600'}}
                  inactiveTextStyle={{color: '#FFFFFF', fontWeight: '600'}}
                  switchLeftPx={10}
                  switchRightPx={10}
                  switchWidthMultiplier={2}
                  value={hyonEnabled}
                />
              </View>
            </View>
            {/* Sleep mode */}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 16,
                  color:
                    hide === 'Fan' || hide === 'Auto' || hide === 'Dry'
                      ? '#767676'
                      : slonEnabled
                      ? '#810055'
                      : 'black',
                }}>
                Sleep
              </Text>

              <View>
                <Switch
                  trackColor={{false: '#D9D9D9', true: '#4D98FF12'}}
                  style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
                  ios_backgroundColor="#D9D9D9"
                  backgroundActive={'#F2E5EE'}
                  backgroundInactive={'#D9D9D9'}
                  circleActiveColor={'#810055'}
                  circleInActiveColor={'#FFFFFF'}
                  onValueChange={toggleOnSlepSwitch}
                  outerCircleStyle={{marginRight: 50}}
                  activeText={'On'}
                  inActiveText={'Off'}
                  activeTextStyle={{color: '#810055', fontWeight: '600'}}
                  inactiveTextStyle={{color: '#FFFFFF', fontWeight: '600'}}
                  switchLeftPx={10}
                  switchRightPx={10}
                  switchWidthMultiplier={2}
                  value={slonEnabled}
                  disabled={
                    hide === 'Fan' || hide === 'Auto' || hide === 'Dry'
                      ? true
                      : false
                  }
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',

                justifyContent: 'space-between',

                paddingHorizontal: 10,

                paddingVertical: 10,
              }}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 16,
                  color:
                    hide === 'Fan' || hide === 'Auto' || hide === 'Dry'
                      ? '#767676'
                      : isTurEnabled
                      ? '#810055'
                      : 'black',
                }}>
                Turbo
              </Text>

              <View>
                <Switch
                  trackColor={{false: '#D9D9D9', true: '#4D98FF12'}}
                  style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
                  ios_backgroundColor="#D9D9D9"
                  backgroundActive={'#F2E5EE'}
                  backgroundInactive={'#D9D9D9'}
                  circleActiveColor={'#810055'}
                  circleInActiveColor={'#FFFFFF'}
                  onValueChange={toggleTurSwitch}
                  outerCircleStyle={{marginRight: 50}}
                  activeText={'On'}
                  inActiveText={'Off'}
                  activeTextStyle={{color: '#810055', fontWeight: '600'}}
                  inactiveTextStyle={{color: '#FFFFFF', fontWeight: '600'}}
                  switchLeftPx={10}
                  switchRightPx={10}
                  switchWidthMultiplier={2}
                  value={isTurEnabled}
                  disabled={hide === 'Fan' || hide === 'Auto' || hide === 'Dry'}
                />
              </View>
            </View>
          </View>
        </View>

        {/* </View> */}
      </Modal>
    </View>
  );
};

export default AcFunctionScreen;
