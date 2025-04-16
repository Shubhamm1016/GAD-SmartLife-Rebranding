import {View, Text, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetGroupNameAPI, deleteNodeGroupAPI} from '../../../Context/API';

const ManageCreateGroupList = props => {
  // console.log(props.data.nodes, 'devi');
  // console.log(props, '0000000');
  const fetchData = props.fetchData;
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  // const gropuName = async () => {
  //   let token = await AsyncStorage.getItem('AccessToken');
  //   console.log(token, 'tokentoken');
  //   try {
  //     let response = await GetGroupNameAPI(token, props.data.nodes);
  //     setName(response.data.AC.Name);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const selectedId = type;
  const AC = 'AC';
  const WM = 'WM';
  const getImageSource = () => {
    switch (selectedId) {
      case AC:
        return require('../../../assets/acimg.png');
      case WM:
        return require('../../../assets/washingmashine/wmashine.png');

      default:
        return require('../../../assets/RefImage/RefQRScaner.png');
    }
  };
  const gropuName = async () => {
    let token = await AsyncStorage.getItem('AccessToken');
    console.log(token, 'tokentoken');
  
    try {
      let response = await GetGroupNameAPI(token, props.data.nodes);
      console.log(response.data, "response.data");
  
      // Determine the correct name and type based on the appliance type
      let name = '';
      let type = '';
      if (response.data.AC) {
        name = response.data.AC.Name;
        type = 'AC';
      } else if (response.data.WM) {
        name = response.data.WM.Name;
        type = 'WM';
      } else if (response.data.Refrigerator) {
        name = response.data.Refrigerator.Name;
        type = 'Refrigerator';
      } else {
        name = 'Unknown Appliance'; // Fallback if no matching type found
        type = 'Unknown';
      }
      setType(type); // Set the correct type in the state
      setName(name); // Set the correct name in the state
    } catch (err) {
      console.log(err);
    }
  };
  

  const deleteNodeGroup = async () => {
    try {
      let {nodes, group_id} = props.data;
      let token = await AsyncStorage.getItem('AccessToken');
      let response = await deleteNodeGroupAPI(token, nodes, group_id);
      console.log(response.data, 'responseresponse');
      fetchData();
    } catch (error) {
      console.log('Error', error.response.data);
    }
  };

  useEffect(() => {
    gropuName(props.data.nodes);
  }, [props.data.nodes]);
  return (
    <View
      style={{
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'red',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 12,
        width: '49%',
        marginBottom: 10,
        marginHorizontal: 2,
      }}>
        
      <View style={{flexDirection: 'column'}}>
        <View>
          {/* <Image
            style={{width: 100, height: 40, resizeMode: 'contain'}}
            source={require('../../../assets/acimg.png')}
          /> */}
          <Image
            style={{width: 100, height: 40, resizeMode: 'contain'}}
            source={getImageSource()}
          />
        </View>

        <View style={{}}>
          <Text style={{fontSize: 13, color: '#000'}}>{name}</Text>
        </View>
      </View>
      <View>
        <Pressable
          onPress={() => {
            deleteNodeGroup();
          }}>
          <MaterialCommunityIcons
            name="delete-alert-outline"
            size={24}
            color="#ddd"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default ManageCreateGroupList;
