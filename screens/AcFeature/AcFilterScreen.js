import React, {useEffect, useState} from 'react';

import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  Alert,
} from 'react-native';

import Modal from 'react-native-modal';

import Wave from 'react-native-waveview';

import LinearGradient from 'react-native-linear-gradient';
import {
  FetchFilter,
  FilterControl,
  featuresContol,
  manageGroup,
} from '../../Context/API';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AcFilterScreen = props => {
  const {navigation} = props;
  const nodeid = props.id;
  const [isModalVisible, setModalVisible] = useState(false);

  // console.log(JSON.parse(acFeature[0].alldata),"deny");
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const filterFunctionClick = async nodeid => {
    let param = 'Start';
    let values = true;
    let token = await AsyncStorage.getItem('AccessToken');
    console.log(nodeid, param, values, 'sending_values');
    try {
      let response = await FilterControl(token, nodeid, param, values);
      console.log(response.data, 'response');
      filterFunction(nodeid);
    } catch (err) {
      console.log(err, 'error');
    }
  };

  //  For alert dialog

  const createTwoButtonAlert = () =>
    Alert.alert('Reset Filter', 'Are you sure to reset your filter?', [
      {
        text: 'Cancel',

        onPress: () => {
          console.log('Cancel Click');
        },

        style: 'cancel',
      },

      {
        text: 'OK',
        onPress: () => {
          ResetFilter();
        },
      },
    ]);

  const ResetFilter = async () => {
    let key = "AC";
    let param = 'ResetFilter';
    let values = true;
    let token = await AsyncStorage.getItem('AccessToken');
    console.log(nodeid, param, values, 'sending_values');
    // return
    try {
      let response = await featuresContol(key,token, nodeid, param, values);
      console.log(response.data, 'response');
      nodeAllData();
    } catch (err) {
      console.log(err, 'error');
    }
  };

  const [acFeature, setAcFeature] = useState([]);
  const [filterPercent, setFilterPercent] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // Add a state variable to track data fetching
  // console.log(filterPercent, 'percentage useState');

  const filterFunction = async nodeid => {
    try {
      let token = await AsyncStorage.getItem('AccessToken');
      console.log(token, 'token');
      let response = await FetchFilter(token, nodeid);
      console.log(response.data.node_details);
      const newAcFeature = response.data.node_details.map(alldata => ({
        alldata,
      }));
      console.log(newAcFeature, 'objobj');
      setAcFeature(newAcFeature);
      setDataFetched(true); // Set dataFetched to true after data retrieval
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
      console.log(acFeature[0].alldata.params.Diagnostics, 'acFeature');
      console.log(
        acFeature[0].alldata.params.Diagnostics.Data,
        'percent data ',
      );
      setFilterPercent(
        acFeature[0].alldata.params.Diagnostics.Data.filterPercent,
      );
    }
  }, [acFeature, dataFetched]);

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
          source={require('../../assets/iconFILTER.png')}
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
            // flex:1,
            position: 'absolute',
            bottom: 0,
            // height: 350,
            backgroundColor: '#fff',
            width: '100%',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}>
          <View style={{
            // backgroundColor:'red',
            paddingHorizontal: 10, paddingVertical: 10}}>
            <View style={{paddingVertical: 20, paddingHorizontal: 5}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: '#525968'}}>
                FILTER
              </Text>
            </View>

            <View style={_styles.container}>
              <Wave
                ref={ref => (this._waveRect = ref)}
                style={_styles.wave}
                H={filterPercent ? filterPercent : 0}
                waveParams={[
                  {A: 10, T: 1000, fill: '#810055'},

                  {A: 10, T: 1000, fill: '#810055'},

                  {A: 10, T: 1000, fill: '#810055'},
                ]}
                // animated={true}
              />
            </View>

            <View
              style={{
                // marginBottom:50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => filterFunctionClick(nodeid)}>
                <LinearGradient
                  colors={['#810055', '#810055']}
                  style={_styles.appButtonContainer}>
                  <Text style={_styles.appButtonText}>Filter Status</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={createTwoButtonAlert}>
                <LinearGradient
                  colors={['#810055', '#810055']}
                  style={_styles.appButtonContainer}>
                  <Text style={_styles.appButtonText}>Reset Filter</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginVertical: 22,

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

                  borderColor: '#810055',

                  paddingHorizontal: 12,

                  paddingVertical: 2,

                  borderRadius: 100,

                  marginHorizontal: 8,
                }}>
                <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
                  i
                </Text>
              </View>

              <View style={{width:"90%"}}>
                <Text style={{fontSize: 12, color: '#810055'}}>
                  Filter needs to be mannualy cleaned or replaced when the above box
                  becomes completely purple.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AcFilterScreen;

const _styles = StyleSheet.create({
  container: {
// flex:1,
    // marginHorizontal: 30,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: '#EFEFEF',

    // height: 130,
    paddingVertical:20,

    width: '100%',

    borderRadius: 10,
  },

  wave: {
    width: '85%',

    // height: 80,

    aspectRatio: 4,

    borderRadius: 10,

    overflow: 'hidden',

    backgroundColor: '#F9F2F6',
  },

  appButtonContainer: {
    elevation: 2,

    marginTop: 14,

    marginStart: 12,

    marginEnd: 12,

    borderRadius: 8,

    paddingVertical: 10,

    paddingHorizontal: 12,

    width: 150,
  },

  appButtonText: {
    fontSize: 16,

    color: '#fff',

    fontWeight: '600',

    alignSelf: 'center',
  },
});
