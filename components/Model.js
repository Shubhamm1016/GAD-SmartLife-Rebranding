import {View, Text, Modal, TouchableOpacity, TextInput, Pressable} from 'react-native';

import React, {useContext, useState} from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EditDeviceName} from '../Context/API';
import { UserContext } from '../Context/UserContext';
import { GEGBodyCopy, GEGBold } from '../comman-compnent/FontFamily';

const Model = ({id,onLineDevice,State}) => {

  const {fetchAll} = useContext(UserContext);


  const [openModel, setOpenModal] = React.useState(false);
  const [textInput, setTextInput] = useState([]);
  
  const SwitchModeSelected = async (id,State) => {
    
    let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await EditDeviceName(State,token, id, textInput);
      console.log(response.data, 'response');
      fetchAll();
      setOpenModal(false)
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

              height: 190,
            }}>
            <Text
              style={{
                fontSize: 16,

                color: '#000',
                fontFamily:GEGBodyCopy
              }}>
              Device Name{' '}
            </Text>

            <TextInput
              style={{
                height: 45,

                marginVertical: 20,

                backgroundColor: 'white',

                padding: 10,

                borderWidth: 1,

                borderRadius: 8,

                borderColor: '#9c9a9a',
              }}
              placeholder="Enter device name"
              placeholderTextColor="black"
              maxLength={15}
              onChangeText={value => setTextInput(value)}
            />

            <View
              style={{
                flexDirection: 'row',

                justifyContent: 'space-between',

                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => setOpenModal(false)}>
                <LinearGradient
                  colors={['#810055', '#810055']}
                  style={{
                    elevation: 8,

                    borderRadius: 8,

                    paddingVertical: 12,

                    paddingHorizontal: 12,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,

                      color: '#fff',

                      fontFamily:GEGBold,

                      alignSelf: 'center',
                    }}>
                    Cancel
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={()=>{SwitchModeSelected(id,State)}}>
                <LinearGradient
                  colors={['#810055', '#810055']}
                  style={{
                    elevation: 8,
                    borderRadius: 8,
                    paddingVertical: 12,
                    paddingHorizontal: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#fff',
                      fontFamily:GEGBold,
                      alignSelf: 'center',
                    }}>
                    Ok
                  </Text>
                </LinearGradient>
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
        paddingHorizontal: 8,
      }}>
      <Pressable onPress={() =>onLineDevice? setOpenModal(true):""}>
        <MaterialIcons
          name="edit"
          width={23}
          height={23}
          color={onLineDevice?"#525151":'#838383'}
          size={20}
        />
      </Pressable>

      {renderModal()}
    </View>
  );
};

export default Model;
