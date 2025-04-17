import React, {useEffect, useState} from 'react';

import {
  Button,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

import Modal from 'react-native-modal';

import LinearGradient from 'react-native-linear-gradient';

import ProgressBar from 'react-native-progress-bar-horizontal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FetchFilter, FilterControl} from '../../Context/API';
const DATA = [
  {
    id: 0,
    error: 'No Error happening',
    errorcode: 'No fault detected',
  },
  {
    id: 1,
    error: 'Indoor machine EE fault',
    errorcode: 'EE',
  },
  {
    id: 2,
    error: 'Indoor fan fault',
    errorcode: 'E1',
  },
  {
    id: 3,
    error: 'Zero-crossing detection abnormal',
    errorcode: 'E2',
  },
  {
    id: 4,
    error: 'Indoor coil sensor fault',
    errorcode: 'E3',
  },
  {
    id: 5,
    error: 'Indoor ambient temperature sensor fault',
    errorcode: 'E4',
  },
  {
    id: 6,
    error: 'Outdoor EE fault',
    errorcode: 'E0',
  },
  {
    id: 7,
    error: 'Indoor and outdoor machine communication fault',
    errorcode: 'E6',
  },
  {
    id: 8,
    error: 'Main board and driver board communication fault',
    errorcode: 'E7',
  },
  {
    id: 9,
    error: 'Compressor starting abnormal (phase failure, reverse)',
    errorcode: 'F1',
  },
  {
    id: 10,
    error: 'Compressor out-of-step fault',
    errorcode: 'F2',
  },
  {
    id: 11,
    error: 'IPM module fault',
    errorcode: 'F3',
  },
  {
    id: 12,
    error: 'Compressor shell roof fault/protection',
    errorcode: 'None',
  },
  {
    id: 13,
    error: 'Discharge temperature sensor fault',
    errorcode: 'F5',
  },
  {
    id: 14,
    error: 'Suction temperature sensor fault',
    errorcode: 'F6',
  },
  {
    id: 15,
    error: 'Outdoor coil temperature sensor fault',
    errorcode: 'F7',
  },
  {
    id: 16,
    error: 'Outdoor ambient temperature sensor fault',
    errorcode: 'F8',
  },
  {
    id: 17,
    error: 'Outdoor DC fan fault',
    errorcode: 'F9',
  },
  {
    id: 18,
    error: 'Outdoor machine AC current protection',
    errorcode: 'P1',
  },
  {
    id: 19,
    error: 'Compressor phase current protection',
    errorcode: 'P2',
  },
  {
    id: 20,
    error: 'Outdoor unit over-high/over-low AC voltage protection',
    errorcode: 'P3',
  },
  {
    id: 21,
    error: 'DC voltage over-high or over-low voltage protection',
    errorcode: 'P4',
  },
  {
    id: 22,
    error: 'IPM over-high temperature protection',
    errorcode: 'P5',
  },
  {
    id: 23,
    error: 'Discharge temperature overheat protection',
    errorcode: 'P6',
  },
  {
    id: 24,
    error: 'Cooling indoor coil anti-freezing protection',
    errorcode: 'P7',
  },
  {
    id: 25,
    error: 'Cooling outdoor coil overheat protection',
    errorcode: 'P8',
  },
  {
    id: 26,
    error: 'Heating indoor coil overheat protection',
    errorcode: 'P9',
  },
  {
    id: 27,
    error: 'Cooling outdoor ambient temperature over-low protection',
    errorcode: 'PC',
  },
  {
    id: 28,
    error: 'Heating outdoor ambient temperature over-high protection',
    errorcode: 'PH',
  },
  {
    id: 29,
    error: 'Drive bus voltage over-high protection',
    errorcode: 'L1',
  },
  {
    id: 30,
    error: 'Drive bus voltage over-low protection',
    errorcode: 'L2',
  },
  {
    id: 31,
    error: 'Drive phase current overload fault',
    errorcode: 'L3',
  },
  {
    id: 30,
    error: 'Phase current sampling abnormal',
    errorcode: 'L4',
  },
];

const AcDignoseScreen = props => {
  const {navigation} = props;
  let nodeid = props.id;
  const nodeAllData = props.nodeAllData;
  // console.log(nodeid, 'nodeid');
  // console.log(props, 'hubha');
  const [isModalVisible, setModalVisible] = useState(false);
  // console.log(isModalVisible, 'isModalVisible');
  const [openModel, setOpenModal] = React.useState(false);
  const [acFeature, setAcFeature] = useState([]);
  const [filterPercent, setFilterPercent] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [progress, setProgress] = useState(0.0);
  // console.log(progress, 'progress');

  const idToFind = filterPercent; // Replace with the id you want to search for

  // Find the item with the specified id
  const selectedItem = DATA.find(item => item.id === idToFind);
  // console.log(selectedItem);
  const setopen = () => {
    setOpenModal(true);
  };
  const filterFunctionClick = async nodeid => {
    let param = 'Start';
    let values = true;
    let token = await AsyncStorage.getItem('AccessToken');
    // console.log(nodeid, param, values, 'sending_values');
    try {
      let response = await FilterControl(token, nodeid, param, values);
      console.log(response.data, 'response');
      setProgress(1.0);
      filterFunction(nodeid);
      nodeAllData();
    } catch (err) {
      console.log(err, 'error');
    }
  };
  const filterFunction = async nodeid => {
    try {
      let token = await AsyncStorage.getItem('AccessToken');
      // console.log(token, 'token');
      let response = await FetchFilter(token, nodeid);
      console.log(response.data.node_details);
      const newAcFeature = response.data.node_details.map(alldata => ({
        alldata,
      }));
      // console.log(newAcFeature, 'objobj');
      setAcFeature(newAcFeature);
      setDataFetched(true); // Set dataFetched to true after data retrieval
      // setProgress(1.0);
      nodeAllData();
    } catch (err) {
      console.log(err.response?.data?.description || 'Node Details error');
    }
  };
  useEffect(() => {
    filterFunction(nodeid);
  }, [nodeid]);

  useEffect(() => {
    // Check if acFeature is not empty and data has been fetched before accessing its elements
    if (acFeature.length > 0 && dataFetched) {
      // console.log(
      //   acFeature[0].alldata.params.Diagnostics.Data.fault,
      //   'percent data ',
      // );
      setFilterPercent(acFeature[0].alldata.params.Diagnostics.Data.fault);
    }
  }, [acFeature, dataFetched]);

  function renderModal() {
    return (
      <Modal visible={openModel} aninmationType="slider" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'rgba(255, 255, 255, 0.5)'
          }}>
          <View
            style={{
              backgroundColor: '#EFEFEF',
              paddingHorizontal: 15,
              paddingVertical: 15,
              width: '85%',
              borderRadius: 18,
              height: 250,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: 'bold',
                marginTop: 28,
              }}>
              Fault Details{' '}
            </Text>

            {selectedItem ? (
              <Text style={{fontSize: 14, color: 'black', marginTop: 22}}>
                {selectedItem.error}
              </Text>
            ) : (
              <Text style={{fontSize: 12, color: '#810055'}}>
                fault Details
              </Text>
            )}

            <TouchableOpacity
              style={{marginTop: 44}}
              onPress={() => {setOpenModal(false)
                setProgress(0.0)
              }}>
              <LinearGradient
                colors={['#810055', '#810055']}
                style={{
                  elevation: 8,
                  borderRadius: 25,
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
          source={require('../../assets/Diagnose.png')}
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

            paddingHorizontal: 10,

            paddingVertical: 10,
          }}>
          <View style={{paddingVertical: 20, paddingHorizontal: 5}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#525968'}}>
              CHECK DEVICE HEALTH
            </Text>
          </View>

          <Text style={_styles.textStyle}>
            Click on start to check device faults.
          </Text>

          <View
            style={{
              marginTop: 12,
              marginStart: 38,
              marginEnd: 38,
              marginBottom: 42,
            }}>
            <ProgressBar
              progress={progress}
              borderWidth={1}
              fillColor="#810055"
              unfilledColor="#F9F2F6"
              height={18}
              borderColor="#F9F2F6"
              duration={100}
            />
          </View>

          <TouchableOpacity
            onPress={setopen}
            style={{
              // marginVertical: 50,

              marginHorizontal: 15,

              flexDirection: 'row',

              alignItems: 'center',

              justifyContent: 'center',

              width: '90%',

              paddingVertical: 8,

              backgroundColor: '#F9F2F6',

              borderRadius: 10,
            }}>
            <View
              style={{
                backgroundColor: '#810055',

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
              <Text style={{fontSize: 12, color: '#810055'}}>
                {selectedItem.errorcode}
              </Text>
            ) : (
              <Text style={{fontSize: 12, color: '#810055'}}>
                Fault Details
              </Text>
            )}

            {/* <View style={{}}>
              <Text style={{fontSize: 12, color: '#4BB6E8'}}>
              {selectedItem.title} No fault detected
              </Text>
            </View> */}
          </TouchableOpacity>

          {/* <Model /> */}

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                // handleClick();
                filterFunctionClick(nodeid);
              }}>
              <View style={_styles.appButtonContainer}>
                <Text style={_styles.appButtonText}>Start</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {renderModal()}
      </Modal>
    </View>
  );
};

export default AcDignoseScreen;

const _styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 2,

    marginVertical: 26,

    borderRadius: 25,

    paddingVertical: 18,

    paddingHorizontal: 12,

    width: 350,
    backgroundColor: '#810055',
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
