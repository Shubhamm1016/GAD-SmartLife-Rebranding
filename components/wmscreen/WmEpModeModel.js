import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';

import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {switchButton} from '../../Context/API';

const WmEpModeModel = ({state, id, setState, power, ChildLock, wmrunning}) => {
  const [openModel, setOpenModal] = React.useState(false);
  console.log(power, 'power');
  const SwitchModeSelected = async (State, id) => {
    let token = await AsyncStorage.getItem('AccessToken');
    const key = 'program';
    const switchData = 11;
    try {
      let response = await switchButton(State, token, id, switchData, key);
      console.log(response.data, 'response');
      setState(prevState => ({
        ...prevState,
        program: prevState.program,
      }));
      await NodeStatus(State, id, token);
    } catch (err) {
      console.log(err.response.data, 'errerr');
    }
  };

  const NodeStatus = async (State, id, token) => {
    const key = 'wmrunning';
    try {
      let response = await switchButton(
        State,
        token,
        id,
        !state.wmrunning,
        key,
      );
      console.log(response.data, 'response');
      setState(prevState => ({
        ...prevState,
        wmrunning: !prevState.wmrunning,
      }));
      setOpenModal(false);
    } catch (err) {
      console.log(err.response.data, 'errerr');
    }
  };

  function renderModal() {
    return (
      <Modal visible={openModel} aninmationType="slider" transparent={true}>
        <View
          style={{
            flex: 1,

            justifyContent: 'center',

            alignItems: 'center',

            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',

              paddingHorizontal: 15,

              paddingVertical: 15,

              width: '90%',

              borderRadius: 10,

              height: 150,
            }}>
            <Text
              style={{
                fontSize: 16,

                color: '#000',

                fontWeight: 'bold',
              }}>
              EP Mode
            </Text>

            <View style={{paddingVertical: 10}}>
              <Text style={{fontSize: 16, color: '#000'}}>
                Are you sure to start EP Mode?
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',

                justifyContent: 'flex-end',

                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                style={{paddingHorizontal: 20}}
                onPress={() => setOpenModal(false)}>
                <Text
                  style={{
                    fontSize: 16,

                    color: '#64bbf5',

                    fontWeight: 'bold',

                    alignSelf: 'center',
                  }}>
                  NO
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{paddingHorizontal: 20}}
                onPress={() => {
                  const State = 'WM';

                  SwitchModeSelected(State, id);
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#64bbf5',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  YES
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Pressable
        onPress={() => {
          if (power) {
            if (ChildLock) {
              alert('Child lock enabled');
              return;
            } else {
              console.log(wmrunning,"wmrunning");
              if (wmrunning) {
                console.log('shubham');
                setOpenModal(false);
              } else {
                console.log('malviya');
                setOpenModal(true);
              }
            }
          } else {
            alert('Washing Machine Power OFF,Turn On And Retry');
          }
        }}>
        <Image
          style={{
            height: 90,
            width: 75,
            resizeMode: 'contain',
          }}
          source={
            state === 11
              ? require('../../assets/washingmashine/EP_ModeBlue.png')
              : require('../../assets/washingmashine/EP_Mode.png')
          }
        />
      </Pressable>

      {renderModal()}
    </View>
  );
};

export default WmEpModeModel;
