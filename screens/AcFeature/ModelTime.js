import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { UserContext } from '../../Context/UserContext';
import { GEGBold } from '../../comman-compnent/FontFamily';

const ModelTime = ({textInput, nodeid, setTextInput: setParentTextInput }) => {
  console.log(nodeid,textInput, "idddd");
  console.log("ram");
  const [openModel, setOpenModal] = React.useState(false);
  const [localTextInput, setLocalTextInput] = useState(textInput||"");
  function renderModal() {
    return (
      <Modal visible={openModel} animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'transparent',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 15,
              paddingVertical: 15,
              width: '95%',
              borderRadius: 10,
              height: 190,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontFamily:GEGBold
              }}>
              Time Name{' '}
            </Text>

            <TextInput
              style={{
                height: 55,
                marginVertical: 25,
                backgroundColor: 'white',
                padding: 10,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: '#F1F1ED',
              }}
              placeholder="Enter time name"
              placeholderTextColor="#000"
              maxLength={15}
              onChangeText={(value) => setLocalTextInput(value)}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setOpenModal(false);
                }}>
                <LinearGradient
                  colors={['#810055', '#810055']}
                  style={{
                    elevation: 8,
                    // marginEnd: 20,
                    borderRadius: 8,
                    paddingVertical: 8,
                    paddingHorizontal: 8,
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
                onPress={() => {
                  setOpenModal(false);
                  setParentTextInput(localTextInput);
                  console.log("submit");
                }}>
                <LinearGradient
                  colors={['#810055', '#810055']}
                  style={{
                    elevation: 8,
                    borderRadius: 8,
                    paddingVertical: 8,
                    paddingHorizontal: 8,
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
  // useEffect(() => {
  //   fetchAll();
  // }, []);
  return (
    <View style={{ justifyContent: 'center', paddingHorizontal: 8 }}>
      <TouchableOpacity onPress={() => setOpenModal(true)}>
        <View
          style={{
            // height: 45,
            marginTop: 10,
            backgroundColor: '#ffffff',
            padding: 10,
            borderWidth: 0.5,
            borderRadius: 8,
            borderColor: '#9c9a9a',
            justifyContent: 'center',
          }}>
        <Text style={{fontSize:16}}>{localTextInput ? localTextInput : 'Enter Time Name'}</Text>
        </View>
      </TouchableOpacity>

      {renderModal()}
    </View>
  );
};

export default ModelTime;


