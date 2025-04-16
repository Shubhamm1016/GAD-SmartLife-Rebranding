import React, {useState} from 'react';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
const AcSilentScreen = (props) => {
    const {navigation} = props;
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
      return (
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
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
                source={require('../../assets/iconSILENT.png')}
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
              {/* <View style={{flex:1,position:'absolute',top:0,bottom:0}}> */}
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  height: 200,
                  backgroundColor: '#fff',
                  width: '100%',
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                }}>
                <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
                  <View style={{paddingVertical: 10,paddingHorizontal:5}}>
                    <Text style={{fontSize:16,fontWeight:'bold',color:'#525968'}}>FAN SPEED</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                  <View style={{paddingHorizontal:5}}>
                    <Image
                      source={require('../../assets/iconMODE.png')}
                      style={{width: 70, height: 70, resizeMode: 'contain'}}
                    />
                  </View>
                  <View style={{paddingHorizontal:5}}>
                    <Image
                      source={require('../../assets/iconMODE.png')}
                      style={{width: 70, height: 70, resizeMode: 'contain'}}
                    />
                  </View>
                  <View style={{paddingHorizontal:5}}>
                    <Image
                      source={require('../../assets/iconMODE.png')}
                      style={{width: 70, height: 70, resizeMode: 'contain'}}
                    />
                  </View>
                  <View style={{paddingHorizontal:5}}>
                    <Image
                      source={require('../../assets/iconMODE.png')}
                      style={{width: 70, height: 70, resizeMode: 'contain'}}
                    />
                  </View>
                  </View>
                </View>
              </View>
              {/* </View> */}
            </Modal>
          </View>
        );
}

export default AcSilentScreen