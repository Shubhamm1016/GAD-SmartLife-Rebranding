import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeleteDeviceList from '../../components/DeleteDeviceList';
import {manageGroup} from '../../Context/API';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InsideHeader from '../../comman-compnent/InsideHeader';

const renderDevicesItem = (itsemData, props) => {
  console.log(itsemData.item, 'hello');
  return (
    <DeleteDeviceList
      {...props}
      device={itsemData.item.name}
      node_id={itsemData.item.node_id}
      Modeltype={itsemData.item.Modeltype}
    />
  );
};

const DeleteDeviceScreen = props => {
  const {navigation} = props;
  const isFocused = useIsFocused();
  const [group, setGroup] = useState([]);
  console.log(group, 'group');
  const fetchDevices = async () => {
    let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await manageGroup(token);
      setGroup([]);
      let i = 0;
      // while (i < response.data.node_details.length) {
      //   let node_id = response.data.node_details[i].id;
      //   let name = response.data.node_details[i].params.AC.Name;
      //   let obj = {
      //     name,
      //     node_id,
      //   };
      //   setGroup(prev => [...prev, obj]);
      //   i++;
      // }
      while (i < response.data.node_details.length) {
        let node = response.data.node_details[i];
        console.log(node.config.info.model,"nodesssssssssss");
        let Modeltype = node.config.info.model;
        let node_id = node.id;
        let name = '';

        // Check the type of the node and assign the name accordingly
        if (node.params.AC) {
          name = node.params.AC.Name;
        } else if (node.params.WM) {
          name = node.params.WM.Name;
        } else if (node.params.Refrigerator) {
          name = node.params.Refrigerator.Name;
        }

        if (name) {
          let obj = {
            name,
            node_id,
            Modeltype,
          };
          console.log(obj, 'obj');
          setGroup(prev => [...prev, obj]);
        }

        i++;
      }
      // console.log(response.data.node_details[0].config.devices[0], 'data');
    } catch (err) {
      console.log(err.response.data.description, 'Node Details error');
    }
  };

  const hardrestDeviceClick = () => {
    let values = 'remove';
    nodeMappingFunction(values);
  };

  const nodeMappingFunction = async values => {
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
  useEffect(() => {
    if (isFocused) {
      fetchDevices();
    }
  }, [isFocused]);
  // const numColumns = 2;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 10,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          // paddingHorizontal: 10,
          paddingVertical: 10,
          // margin:8
        }}>
        <View
          style={{
            flexDirection: 'row',
            // marginTop: 10,
            // marginBottom: 12,
            alignItems: 'center',
            // backgroundColor: 'red',
          }}>
          {/* <Pressable
            style={{
              height: 50,
              width: 50,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'red',
            }}
            onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </Pressable> */}
          {/* <View
            style={{
              flex: 1,
              // marginStart: 10,
              justifyContent: 'center',
            }}> */}
          {/* <Text
              style={{
                fontSize: 18,
                color: '#000',
                fontWeight: '500',
                justifyContent: 'center',
              }}>
              Delete Devices
            </Text> */}
          {/* </View> */}
          <View>
            <InsideHeader
              title="Delete Devices"
              onBackPress={() => navigation.goBack()} // Set your back action here
            />
          </View>
        </View>

        <FlatList
          data={group}
          keyExtractor={item => item.id}
          renderItem={itemData => renderDevicesItem(itemData, props)}
          // numColumns={numColumns}
        />
      </View>
    </SafeAreaView>
  );
};

export default DeleteDeviceScreen;
