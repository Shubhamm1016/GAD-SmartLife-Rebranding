import React, {useEffect, useState} from 'react';

import {
  Button,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FetchFilter, FilterControl} from '../../Context/API';

const DATA = [
  {
    id: 0,
    error: 'No Error happening',
    errorcode: 'NE',
  },
  {
    id: 1,
    error: 'No water, check water tap',
    errorcode: 'E1',
  },
  {
    id: 2,
    error: 'Water not drain, check drain pipe',
    errorcode: 'E2',
  },
  {
    id: 3,
    error: 'Lid open, close the door',
    errorcode: 'E3',
  },
  {
    id: 4,
    error:
      'Unbalance happened, remove the cloth and put again sand start the machine',
    errorcode: 'E4',
  },
  {
    id: 5,
    error: 'Call authorized person',
    errorcode: 'EE',
  },
  {
    id: 6,
    error: 'High voltage, wait some time and again start the machine',
    errorcode: 'EH',
  },
  {
    id: 7,
    error: 'Low voltage, wait some time and again start the machine',
    errorcode: 'EL',
  },
  {
    id: 8,
    error:
      'Set temperature not achieved, wait some time and turn ON again (only for heater model)',
    errorcode: 'H7',
  },
  {
    id: 9,
    error: 'Call authorized person',
    errorcode: 'H8',
  },
  {
    id: 10,
    error:
      'Over temperature, turn off the machine wait some time and turn it ON again (only for heater model)',
    errorcode: 'H9',
  },
];

const WmDigonoseScrren = ({
  id,
  setState,
  power,
  err_status,
  wmrunning,
}) => {
  console.log(
    id,
    setState,
    power,
    err_status,
    wmrunning,
    'id, setState, power',
  );

  const [isModalVisible, setModalVisible] = useState(false);
  const [openModel, setOpenModal] = React.useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const [hide, setShow] = useState(false);
  const [wmFeature, setWmFeature] = useState([]);
  const [filterPercent, setFilterPercent] = useState([]);
  const idToFind = filterPercent;
  const selectedItem = DATA.find(item => item.id === idToFind);
  // console.log(selectedItem, 'selectedItem');
  const setopen = () => {
    setOpenModal(true);
  };
  const filterFunctionClick = async id => {
    console.log(id, 'id');

    let param = 'Start';
    let values = true;
    let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await FilterControl(token, id, param, values);
      console.log(response.data, 'response');
      filterFunction(id);
      setShow(true);
    } catch (err) {
      console.log(err, 'error');
    }
  };
  const filterFunction = async id => {
    try {
      let token = await AsyncStorage.getItem('AccessToken');
      // console.log(token, 'token');
      let response = await FetchFilter(token, id);
      console.log(response.data.node_details);
      const newAcFeature = response.data.node_details.map(alldata => ({
        alldata,
      }));
      console.log(newAcFeature, 'objobj');
      setWmFeature(newAcFeature);

      setDataFetched(true); // Set dataFetched to true after data retrieval
    } catch (err) {
      console.log(err.response?.data?.description || 'Node Details error');
    }
  };
  useEffect(() => {
    // Check if acFeature is not empty and data has been fetched before accessing its elements
    if (wmFeature.length > 0 && dataFetched) {
      console.log(wmFeature[0].alldata.params.WM.err_status, 'percent data ');
      setFilterPercent(wmFeature[0].alldata.params.WM.err_status);
    }
  }, [wmFeature, dataFetched]);
  function renderModal() {
    return (
      <Modal visible={openModel} aninmationType="slider" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // width:'100%',
            // backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: '#EFEFEF',
              paddingHorizontal: 15,
              paddingVertical: 15,
              width: '85%',
              borderRadius: 18,
              height: 200,
              alignItems: 'center',
              marginBottom: 50,
            }}>
            <View
              style={{
                backgroundColor: '#E1F5FF',
                height: 60,
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                bottom: 45,
              }}>
              <Text style={{}}>
                {selectedItem ? selectedItem.errorcode : 'NE'}
              </Text>
            </View>
            <View style={{marginBottom: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  fontWeight: 'bold',
                  // marginTop: 20,
                }}>
                Fault Details{' '}
              </Text>
            </View>

            {selectedItem ? (
              <View
                style={
                  {
                    //   flex: 1,
                    //   alignItems: 'flex-end',
                    //   justifyContent: 'flex-end',
                  }
                }>
                <Text style={{fontSize: 14, color: 'black', marginTop: 22}}>
                  {selectedItem.error}
                </Text>
              </View>
            ) : (
              <View
                style={
                  {
                    //   flex: 1,
                    //   alignItems: 'flex-end',
                    //   justifyContent: 'flex-end',
                  }
                }>
                <Text style={{fontSize: 14, color: '#4BB6E8'}}>
                  No Error happening
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
              onPress={() => setOpenModal(false)}>
              <LinearGradient
                colors={['#64bbf5', '#0c98f5']}
                style={{
                  elevation: 8,
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  width: 250,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#fff',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  Ok
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          if (power) {
            setModalVisible(true);
          } else {
            alert('Washing Machine Power OFF,Turn On And Retry');
            return;
          }
        }}>
        <Image
          //   source={require('../../assets/washingmashine/wdignose.png')}
          source={
            err_status === 0
              ? require('../../assets/washingmashine/wdignoses.png')
              : require('../../assets/washingmashine/wdignoses.png')
          }
          style={{height: 90, width: 75, resizeMode: 'contain'}}
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

            paddingHorizontal: 10,

            paddingVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              paddingVertical: 10,
              paddingHorizontal: 5,
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#525968'}}>
              CHECK DEVICE HEALTH
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setShow(false);
              }}
              style={{
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Entypo name="cross" size={28} color="#525968" />
            </TouchableOpacity>
          </View>

          <Text style={_styles.textStyle}>Diagnose the washing machine</Text>

          {/* <TouchableOpacity
            onPress={setopen}
            style={{flex:1,

              flexDirection: 'row',

              alignItems: 'flex-end',

              justifyContent: 'center',

              width: '90%',

              backgroundColor: '#E1F5FF80',

              borderRadius: 10,
            }}>
            <View
              style={{
                backgroundColor: '#4BB6E8',

                borderColor: '#4BB6E8',

                paddingHorizontal: 12,

                paddingVertical: 2,

                borderRadius: 100,

                marginHorizontal: 8,
              }}>
              <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
                i
              </Text>
            </View>
            {selectedItem ? (
              <Text style={{fontSize: 12, color: '#4BB6E8'}}>
                {selectedItem.errorcode}
              </Text>
            ) : (
              <Text style={{fontSize: 12, color: '#4BB6E8'}}>
                No Fault Detected
              </Text>
            )}

          </TouchableOpacity> */}
          {hide ? (
            <TouchableOpacity
              onPress={setopen}
              style={{
                flexDirection: 'row',
                backgroundColor: '#E1F5FF80',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50,
                borderRadius: 5,
                paddingVertical: 10,
              }}>
              <Foundation name="info" size={30} color="#4BB6E8" />
              {selectedItem ? (
                <Text style={{color: '#4BB6E8', fontSize: 14}}>
                  {'  '}
                  {selectedItem.error}{' '}
                </Text>
              ) : (
                <Text style={{color: '#4BB6E8', fontSize: 14}}>
                  {'  '}
                  No Fault detected{' '}
                </Text>
              )}
              <EvilIcons name="chevron-right" size={30} color="#4BB6E8" />
            </TouchableOpacity>
          ) : (
            ''
          )}

          <View
            style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                filterFunctionClick(id);
              }}>
              <LinearGradient
                colors={['#64bbf5', '#0c98f5']}
                style={_styles.appButtonContainer}>
                <Text style={_styles.appButtonText}>Start</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {renderModal()}
      </Modal>
    </View>
  );
};

export default WmDigonoseScrren;

const _styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 2,

    marginVertical: 26,

    borderRadius: 8,

    paddingVertical: 10,

    paddingHorizontal: 12,

    width: 350,
  },

  appButtonText: {
    fontSize: 16,

    color: '#fff',

    fontWeight: '600',

    alignSelf: 'center',
  },

  textStyle: {
    fontSize: 14,
    color: '#525968',
    alignSelf: 'center',
    marginVertical: 8,
  },
});
