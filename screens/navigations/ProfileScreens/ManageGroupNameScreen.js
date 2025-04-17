import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GroupName} from '../../../Context/API';
import InsideHeader from '../../../comman-compnent/InsideHeader';

const ManageGroupNameScreen = props => {
  // console.log(props, 'routerouteroute');
  const {navigation} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [showButten, setShowButten] = useState(true);
  const [ChangeGroupName, setChangeGroupName] = useState('');
  console.log(ChangeGroupName, 'ChangeGroupName');

  const createGroupReq = async () => {
    // console.log("id",id);
    // return
    if (ChangeGroupName.length <= 1) {
      alert(
        'Group name must be 2 to 256 Character long and can contain only alphabets, digits, underscore',
      );
      setChangeGroupName([]);
      setShowButten([]);
      return;
    } else {
      navigation.navigate('AddMoreDevices', {
        // group_id: id,
        Name: ChangeGroupName,
      });
      // let token = await AsyncStorage.getItem('AccessToken');
      // console.log(token, 'token');
      // let node_id = 'VPT96MqQXvZHYcxXKF9L59';
      // try {
      //   let response = await GroupName(ChangeGroupName, node_id, token);
      //   console.log(response.data.status);
      //   navigation.goBack('ManageGroup');
      // } catch (err) {
      //   alert(err.response.data.description);
      // }
    }
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   // Alert.alert('Modal has been closed.');
        //   setModalVisible(!modalVisible);
        // }}
      >
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
            <View>
              <Text style={{color: '#000', fontSize: 16}}>
                Enter Group Name
              </Text>
            </View>
            <View>
              <TextInput
                keyboardType={'email-address'}
                placeholder="Enter Group name"
                maxLength={10}
                placeholderTextColor="#000"
                style={{
                  height: 45,
                  paddingHorizontal: 10,
                  // paddingVertical: 10,
                  // marginHorizontal: 10,
                  marginVertical: 10,
                  backgroundColor: 'white',
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: '#9c9a9a',
                }}
                onChangeText={text => setChangeGroupName(text)}
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
                <Text style={{color: '#810055', fontSize: 17}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  setShowButten(false);
                  setModalVisible(false);
                }}>
                <Text style={{color: '#810055', fontSize: 17}}>ok</Text>
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
          backgroundColor: '#fff',
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 10,
          width: '100%',
          borderWidth: 1,
          borderColor: '#eee',
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
          <Text style={{color: '#000'}}>
            {ChangeGroupName ? ChangeGroupName : ''}{' '}
          </Text>
          <AntDesign
            name="right"
            width={20}
            height={20}
            color="#000"
            size={20}
          />
        </View>
      </Pressable>
      {!showButten && (
        <>
          <TouchableOpacity
            onPress={() => {
              createGroupReq();
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
                Next
              </Text>
            </View>
          </TouchableOpacity>
        </>
      )}
      {showButten && (
        <>
          {/* <TouchableOpacity > */}
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
              marginVertical: 30,
              opacity: 0.4,
              backgroundColor: '#F9F2F6', // Adjust opacity for a disabled look
            }}
            // Add any other props or onPress logic as needed
          >
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                fontWeight: '600',
                alignSelf: 'center',
              }}>
              Next
            </Text>
          </View>
          {/* </TouchableOpacity> */}
        </>
      )}
    </View>
  );
};

export default ManageGroupNameScreen;
