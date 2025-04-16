import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {featuresContol, featuresMappingContol} from '../../Context/API';
import {UserContext} from '../../Context/UserContext';

const RemoveModule = props => {
  const {navigation} = props;
  const {fetchAll} = useContext(UserContext);
  // console.log(props.nodeid, 'props');
  const {key, role} = props.route.params;
  console.log(role, 'key');
  const [openModel, setOpenModal] = React.useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const hardrestDeviceClick = () => {
    if (role == 'primary') {
      console.log('shubham');
      let values = true;
      featuresContolFunction(values, key);
    } else {
      let values = 'remove';
      nodeMappingFunction(values);
    }
  };

  const featuresContolFunction = async (values, key) => {
    let nodeid = props.nodeid;
    console.log(nodeid, key, 'nodeid');

    setIsLoading(true);
    let param = 'ResetDevice';
    let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await featuresContol(key, token, nodeid, param, values);
      console.log(response.data, 'response featuresContolFunction');
      // return
      let removeValues = 'remove';
      nodeMappingFunction(removeValues);
    } catch (err) {
      console.log(err.response.data.description, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const nodeMappingFunction = async values => {
    console.log(values,"valuesvaluesvalues");
    
    fetchAll();
    // return
    let nodeid = props.nodeid;
    setIsLoading(true);
    let param = 'operation';
    let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await featuresMappingContol(token, nodeid, param, values);
      console.log(response, 'response..');
  
      setOpenModal(false);
      navigation.navigate('Home');
    
    } catch (err) {
      console.log(err.response.data.description, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // const nodeMappingFunction = async values => {
  //   let nodeid = props.nodeid;
  //   setIsLoading(true);
  //   let param = 'operation';
  //   let token = await AsyncStorage.getItem('AccessToken');
  //   try {
  //     let response = await featuresMappingContol(token, nodeid, param, values);
  //     console.log(response, 'response..');
  //     setOpenModal(false);
  //     navigation.navigate('Home');
  //   } catch (err) {
  //     console.log(err.response.data.description, 'error');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
            {/* <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontWeight: 'bold',
              }}>
              Are you sure ?
            </Text> */}

            <View style={{marginVertical: 25}}>
              <Text style={{fontSize: 18}}>
                Are you sure you want to remove this device!
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => setOpenModal(false)}
                style={{marginRight: 30}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    textAlign:"center",
                    // backgroundColor:"#810055",
                    // width:"300%",
                    // height:"40%",
                    // borderRadius
                  }}>
                  No
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={hardrestDeviceClick}
                style={{marginLeft: 15}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
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
        flexDirection: 'row',
      }}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#810055" />
        </View>
      ) : (
        ''
      )}
      <Pressable
        style={{marginLeft: 5, alignItems: 'center'}}
        onPress={() => setOpenModal(true)}>
        <View
          style={{
            elevation: 2,
            marginTop: 14,
            marginStart: 12,
            marginEnd: 12,
            borderRadius: 25,
            paddingVertical: 10,
            paddingHorizontal: 12,
            width: 160,
            backgroundColor:"#810055"
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              fontWeight: '600',
              alignSelf: 'center',
            }}>
            Delete Device
          </Text>
        </View>
      </Pressable>

      {renderModal()}
    </View>
  );
};

export default RemoveModule;
