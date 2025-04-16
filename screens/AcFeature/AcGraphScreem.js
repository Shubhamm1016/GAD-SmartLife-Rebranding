import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {BarChart} from 'react-native-chart-kit';
import {FetchFilter, FilterControl} from '../../Context/API';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AcGraphScreem = props => {
  // console.log(props, 'props');
  const {navigation} = props;
  const [isModalVisible, setModalVisible] = useState(false);
  const [acFeature, setAcFeature] = useState([]);
  const [GraphPercent, setGraphPercent] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [
          GraphPercent.PowerMon || 0,
          GraphPercent.PowerTue || 0,
          GraphPercent.PowerWed || 0,
          GraphPercent.PowerThus || 0,
          GraphPercent.PowerFri || 0,
          GraphPercent.PowerSat || 0,
          GraphPercent.PowerSun || 0,
        ],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#810055',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#810055',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(3, 37, 82, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,

  };
  const fetchData = async () => {
    try {
      let token = await AsyncStorage.getItem('AccessToken');
      await GraphStartFunction(props.id, token);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const GraphStartFunction = async (nodeid, token) => {
    let param = 'Start';
    let values = 'true';
    console.log(nodeid, param, values, 'graph_api_call');
    try {
      let response = await FilterControl(token, nodeid, param, values);
      console.log(response.data, 'response_graph');
      await filterFunction(nodeid, token);
    } catch (err) {
      console.log(err, 'error');
    }
  };

  const filterFunction = async (nodeid, token) => {
    console.log(nodeid, 'nodeidnodeid');
    try {
      let response = await FetchFilter(token, nodeid);
      const newAcFeature = response.data.node_details.map(alldata => ({
        alldata,
      }));
      setAcFeature(newAcFeature);
      setDataFetched(true);
    } catch (err) {
      console.log(err.response?.data?.description || 'Node Details error');
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.id]);

  useEffect(() => {
    if (acFeature.length > 0 && dataFetched) {
      console.log(acFeature[0].alldata.params, 'Graph_updated_data');
      const graphData = acFeature[0].alldata.params?.Diagnostics?.Data || {};
      setGraphPercent(graphData);
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
          source={require('../../assets/iconGRAPH.png')}
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
            <View style={{paddingVertical: 10, paddingHorizontal: 5}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: '#525968'}}>
                HIGHEST ENERGY CONSUMPTION(kWH)
              </Text>
            </View>

            <View
              style={{
                // backgroundColor: 'red',
                // alignItems:'center',justifyContent:'center',
                // paddingHorizontal:10
              }}>
              <BarChart
                style={{
                  // flex:1,
                  alignItems: 'center',
                  resizeMode: 'contain',
                  width: '100%',
                  marginTop: 8,
                  borderRadius: 10,
                  // backgroundColor:'red',
                  // paddingHorizontal:15,paddingVertical:10
                  
                }}
                data={data}
                width={390}
                height={220}

                chartConfig={chartConfig}
              />
            </View>

            <View style={{margin: 14}}>
              <Text style={{fontSize: 12, color: '#636262'}}>
              Declaimer: The above graph shows the weekly indicative value of consumption; it may not accurately match actual consumption.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AcGraphScreem;
