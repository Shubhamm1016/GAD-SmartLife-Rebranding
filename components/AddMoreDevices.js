import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GroupName, UpdateGroupNames, manageGroup} from '../Context/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import AddMoreDevicesList from './AddMoreDevicesList';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddMoreDevices = ({route, navigation}) => {
  console.log(route.params, 'routeroute/////////');
  const {group_id, Name} = route.params;
  console.log(group_id, Name, 'group_gr÷oup_idid');
  const CreateGroupName = Name;
  // console.log(GroupName, 'GroupName');
  const isFocused = useIsFocused();
  const [selectedDevides, createSelectedDevices] = useState({});
  console.log(
    selectedDevides,
    'selectedDevides selectedDevides selectedDevides',
  );
  const [group, setGroup] = useState([]);
  console.log(group, 'group');
  const [selectedDevices, setSelectedDevices] = useState([]);
  console.log(selectedDevices, 'selectedDevices');

  
  const fetchDevices = async () => {
    let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await manageGroup(token);
      // setGroup(
      //   response.data.node_details.map(node => ({
      //     name: node.params.AC.Name,
      //     node_id: node.id,
      //   })),
      // );
      setGroup(
        response.data.node_details.map(node => {
          const { id, params } = node;
          let name = '';
          let applianceType = ''; // To store the appliance type
      
          // Check the type of node and assign the appropriate name and type
          if (params.AC) {
            name = params.AC.Name;
            applianceType = 'AC';
          } else if (params.WM) {
            name = params.WM.Name;
            applianceType = 'WM';
          } else if (params.Ref) {
            name = params.Ref.Name;
            applianceType = 'Ref';
          }
      
          return {
            name,
            node_id: id,
            applianceType, // Include the appliance type in the returned object
          };
        })
      );
      
    } catch (err) {
      console.log(err.response.data.description, 'Node Details error');
    }
  };

  function pushElementToObject(obj, Name, element) {
    if (!selectedDevides.Name) {
      console.log(obj, 'obj');
      createSelectedDevices(obj);
    } else {
      if (selectedDevides.Name == Name) {
        selectedDevides.node_id.push(element);
        createSelectedDevices(selectedDevides);
      }
    }
  }

  const handleCheckBoxPress = (device, node_id, Name) => {
    console.log(device, node_id, Name, 'device, node_id,Name');
    let obj = {device, node_id: [node_id], Name};
    pushElementToObject(obj, Name, node_id);
  };

  // const SaveClick = async () => {
  //   console.log(device, node_id, Name, 'device, node_id, Name');
  //   console.log('Selected Devices:', selectedDevides);
  //   let token = await AsyncStorage.getItem('AccessToken');
  //   let {device, node_id, Name} = selectedDevides;
  //   if (group_id) {
  //     console.log(group_id, CreateGroupName, node_id, 'lllllll');

  //     try {
  //       let response = await UpdateGroupName(node_id, group_id, token);
  //       console.log(response.data, 'hhhh');
  //       navigation.goBack();
  //     } catch (err) {
  //       console.log(
  //         'Update error ',
  //         err.response?.data?.description || err.message,
  //       );
  //       alert(err.response?.data?.description || err.message);
  //     }
  //   } else
  //     try {
  //       let response = await GroupName(CreateGroupName, node_id, token); // Pass an array containing the selectedDevice
  //       console.log(response.data, 'jjjj');
  //       navigation.goBack();
  //     } catch (err) {
  //       console.log(
  //         `Error processing device ${device}: ${
  //           err.response?.data?.description || err.message
  //         }`,
  //       );
  //       alert(err.response?.data?.description || err.message);
  //     }
  // };

  const SaveClick = async () => {
    console.log('Selected Devices:', selectedDevides);
    let token = await AsyncStorage.getItem('AccessToken');
  
    // Make sure you're extracting the correct information from selectedDevides
    let { node_id, Name } = selectedDevides;
  
    if (group_id) {
      // If you're updating an existing group
      try {
        const payload = {
          node_id, // or whatever the backend expects
          Name, // or any other properties you need to send
        };
  
        let response = await UpdateGroupNames(group_id, payload, token);
        console.log(response.data, 'Update response');
        navigation.goBack();
      } catch (err) {
        console.error('Error updating group:', err.response?.data || err.message);
        alert(err.response?.data?.description || err.message);
      }
    } else {
      // If you're creating a new group
      try {
        const payload = {
          node_id, // or other relevant fields
          Name: CreateGroupName, // The group name you want to use
        };
  
        let response = await GroupName(CreateGroupName, node_id, token); // Assuming GroupName API works similarly
        console.log(response.data, 'Group creation response');
        navigation.goBack();
      } catch (err) {
        console.error('Error creating group:', err.response?.data || err.message);
        alert(err.response?.data?.description || err.message);
      }
    }
  };
  

  useEffect(() => {
    if (isFocused) {
      fetchDevices();
    }
  }, [isFocused]);

  const renderDevicesItem = ({item, name}) => {
    return (
      <AddMoreDevicesList
        device={item.name}
        node_id={item.node_id}
        Name={item.name}
        Type={item.applianceType}
        isChecked={selectedDevices.includes(item.name, item.node_id, item.name)}
        onCheckBoxPress={(device, node_id, name) =>
          handleCheckBoxPress(device, node_id, name)
        }
      />
    );
  };

  const numColumns = 2;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: 'red',
          justifyContent: 'space-between',
        }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* Back Button */}
          <Pressable
            style={{
              height: 50,
              // backgroundColor: 'red',
              width: 50,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </Pressable>

          {/* Title */}
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: '500',
              justifyContent: 'center',
            }}>
            Group
          </Text>
        </View>
        {/* Save Button */}
        <Pressable
          style={{
            // backgroundColor: 'red',
            height: 50,
            width: 50,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            SaveClick();
          }}>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              fontWeight: '500',
              justifyContent: 'center',
            }}>
            Save
          </Text>
        </Pressable>

        {/* Device List */}
      </View>
      <View style={{paddingHorizontal: 10}}>
        <FlatList
          data={group}
          keyExtractor={item => item.node_id}
          renderItem={props => renderDevicesItem({...props, Name})}
          numColumns={numColumns}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddMoreDevices;
