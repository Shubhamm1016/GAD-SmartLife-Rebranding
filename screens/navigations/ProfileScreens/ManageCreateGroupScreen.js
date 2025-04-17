import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ManageGroupNameScreen from './ManageGroupNameScreen';
import LinearGradient from 'react-native-linear-gradient';
import {
  DeleteGroupName,
  UpdateGroupName,
  UpdateGroupNames,
  addGroupList,
} from '../../../Context/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import ManageCreateGroupList from './ManageCreateGroupList';
import InsideHeader from '../../../comman-compnent/InsideHeader';

const renderDevicesItem = (itsemData, fetchData) => {
  console.log(itsemData, fetchData, 'hello kya ho rha hai ');
  return <ManageCreateGroupList data={itsemData.item} fetchData={fetchData} />;
};

const ManageCreateGroupScreen = props => {
  const {navigation} = props;
  // console.log(props, 'propss');
  // console.log(props, 'navigation');
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const set = props.route.params.setHideRemove;
  const FlatListName = props.route.params.selectGroupName;
  console.log(FlatListName, 'FlatListName');
  console.log(set, 'set');
  const id = props.route.params.group_id;

  const name = props.route.params.group_name;
  console.log(id, name, 'id');
  const [showRemove] = useState(set);
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupname] = useState(props.route.params.group_name);
  console.log(groupName, 'groupNamegroupName');
  // console.log(props.route, 'props.route.params');
  // const [music, setMusic] = useState(false);
  const [addDevices, setAddDevices] = useState([]);
  console.log(addDevices, 'addDevicesaddDevicessssss');

  // const fetchData = async () => {
  //   setLoading(true);
  //   let token = await AsyncStorage.getItem('AccessToken');
  //   // console.log(token, 'tokentoken');
  //   // console.log(id, 'ididid');
  //   try {
  //     let response = await addGroupList(token, id);
  //     setAddDevices([]);
  //     console.log(response.data.groups, 'response.data.groups');
  //     if (response.data.groups.length > 0) {
  //       let i = 0;
  //       let array = Array();
  //       while (i < response.data.groups.length) {
  //         if (response.data.groups[i].nodes) {
  //           let j = 0;
  //           let nodes = [];
  //           while (j < response.data.groups[i].nodes.length) {
  //             array.push({
  //               ...response.data.groups[i],
  //               nodes: response.data.groups[i].nodes[j],
  //             });
  //             j++;
  //           }
  //           console.log(array, 'array');
  //           setAddDevices(array);
  //           setLoading(false);
  //         }
  //         i++;
  //       }
  //     }
  //   } catch (err) {
  //     setLoading(false);
  //     console.log(err.response);
  //   }

  // };

  useEffect(() => {
    setGroupname(props.route.params.group_name);
  }, [props.route.params.group_name]);

  // const fetchData = async () => {
  //   setLoading(true);

  //   try {
  //     let token = await AsyncStorage.getItem('AccessToken');
  //     let response = await addGroupList(token, id);
  //     setAddDevices([]);

  //     if (response.data.groups.length > 0) {
  //       let array = [];

  //       // Loop through groups
  //       for (let i = 0; i < response.data.groups.length; i++) {
  //         let group = response.data.groups[i];

  //         // Check if group has nodes
  //         if (group.nodes && group.nodes.length > 0) {
  //           for (let j = 0; j < group.nodes.length; j++) {
  //             // Add group with each node
  //             array.push({
  //               ...group,
  //               nodes: group.nodes[j],
  //             });
  //           }
  //         }
  //       }
  //       setAddDevices(array);
  //       console.log(array, 'Processed array');
  //     }
  //   } catch (err) {
  //     console.log(err.response);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchData = async () => {
    setLoading(true);
    try {
      let token = await AsyncStorage.getItem('AccessToken');
      let response = await addGroupList(token, id);
      setAddDevices([]);

      if (response.data.groups.length > 0) {
        let array = [];
        for (let i = 0; i < response.data.groups.length; i++) {
          let group = response.data.groups[i];

          if (group.nodes && group.nodes.length > 0) {
            for (let j = 0; j < group.nodes.length; j++) {
              array.push({
                ...group,
                nodes: group.nodes[j],
              });
            }
          }
        }
        setAddDevices(array);
        console.log(array, 'Processed array');
      }
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  const removeDevice = async id => {
    console.log(id, 'ididid');
    // return
    let token = await AsyncStorage.getItem('AccessToken');
    console.log(token, 'tokentoken');
    try {
      let response = await DeleteGroupName(token, id);
      console.log(response.data);
      navigation.goBack('ManageGroup');
    } catch (err) {
      console.log(err.response.data);
    }
  };
  // const node_id = addDevices.map(device => device.nodes.id);
  // console.log(node_id, ':nnbb');

  // const handleUpdateGroupName = async () => {
  //   setLoading(true);
  //   const token = await AsyncStorage.getItem('AccessToken');
  //   if (!token) {
  //     console.error('Access token not found');
  //     setLoading(false);
  //     return;
  //   }

  //   const {group_id, group_name} = props.route.params;
  //   console.log(props.route.params,"....ddnjnjjbjb");

  //   const payload = {group_name};

  //   try {
  //     const response = await UpdateGroupNames(group_id, payload, token);
  //     if (response?.status === 'success') {
  //       console.log('Group name updated successfully:', response);
  //       await fetchData(); // Refresh data after update
  //       setModalVisible(false); // Close the modal after successful update
  //     } else {
  //       console.error(
  //         'Failed to update group name:',
  //         response?.error || 'Unknown error',
  //       );
  //     }
  //   } catch (err) {
  //     console.error(
  //       'Error updating group name:',
  //       err?.response?.data || err.message,
  //     );
  //   } finally {
  //     setLoading(false); // Hide loader in finally block
  //   }
  // };

  const handleUpdateGroupName = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('AccessToken');
    if (!token) {
      console.error('Access token not found');
      setLoading(false);
      return;
    }

    const {group_id} = props.route.params;
    const payload = {group_name: groupName};

    try {
      const response = await UpdateGroupNames(group_id, payload, token);
      if (response?.status === 'success') {
        console.log('Group name updated successfully:', response);
        setGroupname(groupName); // Update the group name state
        props.navigation.setParams({group_name: groupName}); // Update route params if necessary
        await fetchData(); // Refresh data after update
        setModalVisible(false); // Close the modal after successful update
      } else {
        console.error(
          'Failed to update group name:',
          response?.error || 'Unknown error',
        );
      }
    } catch (err) {
      console.error(
        'Error updating group name:',
        err?.response?.data || err.message,
      );
    } finally {
      setLoading(false); // Hide loader in finally block
    }
  };

  const numColumns = 2;
  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        // padding: 24,
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
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
        <View>
          <InsideHeader
            title="Create Groups"
            onBackPress={() => navigation.goBack()} // Set your back action here
          />
        </View>
        {/* <Text
          style={{
            fontSize: 18,
            color: 'black',
            fontWeight: '500',
            justifyContent: 'center',
          }}>
          Create Group
        </Text> */}
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: '#fff',
        }}>
        {showRemove ? (
          <>
            <View>
              <ManageGroupNameScreen {...props} />
            </View>
          </>
        ) : (
          <>
            <View>
              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        paddingHorizontal: 15,
                        paddingVertical: 15,
                        width: '90%',
                        borderRadius: 10,
                        height: 150,
                        elevation: 8,
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                      }}>
                      <View>
                        <Text style={{color: 'black'}}>Enter Group Name</Text>
                      </View>
                      <View>
                        <TextInput
                          keyboardType={'email-address'}
                          placeholder={groupName}
                          maxLength={10}
                          placeholderTextColor="#000"
                          style={{
                            height: 45,
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            marginHorizontal: 10,
                            marginVertical: 10,
                            backgroundColor: 'white',
                            padding: 10,
                            borderWidth: 1,
                            borderRadius: 8,
                            borderColor: '#9c9a9a',
                          }}
                          onChangeText={text => setGroupname(text)}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                          paddingVertical: 10,
                        }}>
                        <TouchableOpacity
                          style={{marginRight: 30}}
                          onPress={() => setModalVisible(false)}>
                          <Text style={{color: '#810055', fontSize: 17}}>
                            Cancel
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{}}
                          onPress={async () => {
                            await handleUpdateGroupName(); // Call the function to update the group name
                            setModalVisible(false); // Close the modal
                          }}>
                          <Text style={{color: '#810055', fontSize: 17}}>
                            ok
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
                <Pressable
                  onPress={() => {
                    setModalVisible(true);
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#eee',

                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    width: '100%',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#000',
                      alignSelf: 'center',
                    }}>
                    Group name
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: '#000', fontWeight: '600'}}>
                      {groupName ? groupName : ''}{' '}
                    </Text>
                    <AntDesign
                      name="right"
                      width={20}
                      height={20}
                      color="#ddd"
                      size={20}
                    />
                  </View>
                </Pressable>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AddMoreDevices', {
                      group_id: id,
                      Name: name,
                    });
                  }}
                  style={{
                    // alignItems: 'center',
                    backgroundColor: '#eee',
                    paddingVertical: 15,
                    borderRadius: 25,
                    // width: '100%',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#000',
                      alignSelf: 'center',
                    }}>
                    Add more devices
                  </Text>
                </TouchableOpacity>

                {/* {addDevices ? (
                <> */}
                <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
                  <Text style={{color: '#ddd'}}>Added Devices</Text>
                </View>
                {/* <View>
                    <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
                      <Text style={{color: '#ddd'}}>Added Devices</Text>
                    </View>
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
                          <Image
                            style={{
                              width: 100,
                              height: 40,
                              resizeMode: 'contain',
                            }}
                            source={require('../../../assets/acimg.png')}
                          />
                        </View>

                        <View style={{}}>
                          <Text style={{fontSize: 13, color: '#000'}}>
                            {props.device}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Pressable
                          onPress={() => {
                            console.log('hello');
                          }}>
                          <MaterialCommunityIcons
                            name="delete-alert-outline"
                            size={24}
                            color="#ddd"
                          />
                        </Pressable>
                      </View>
                    </View>
                  </View>*/}
                {loading ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <ActivityIndicator size="large" color="#810055" />
                  </View>
                ) : (
                  <FlatList
                    data={addDevices ? addDevices : []}
                    keyExtractor={item => item.id}
                    renderItem={e => renderDevicesItem(e, fetchData)}
                    numColumns={numColumns}
                  />
                )}

                <TouchableOpacity
                  onPress={() => {
                    console.log('hello');
                    removeDevice(id);
                  }}>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 15,
                      borderRadius: 25,
                      marginVertical: 30,
                      backgroundColor: '#810055',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#fff',
                        fontWeight: 'bold',
                        alignSelf: 'center',
                      }}>
                      Delete Group
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ManageCreateGroupScreen;
