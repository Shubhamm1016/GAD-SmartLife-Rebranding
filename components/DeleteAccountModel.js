import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native';

import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {EditDeviceName, SendOtpToDeleteUser} from '../Context/API';

const DeleteAccountModel = ({navigation}) => {
  // console.log(navigation, 'navigation');
  const [openModel, setOpenModal] = React.useState(false);
  //   const [textInput, setTextInput] = useState([]);
  const SwitchModeSelected = async () => {
    // console.log('account delete');
    let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await SendOtpToDeleteUser(token);
      // console.log(response.data, 'response');
      setOpenModal(false);
      navigation.navigate('UserDeleteOtpScreen');
    } catch (err) {
      console.log(err.response, 'errerr');
      // Check for specific error conditions and handle them accordingly
      if (err.response && err.response.status === 401) {
        // Handle unauthorized error
        console.log('Unauthorized error. Redirecting to login.');
        // Example: navigation.navigate('LoginScreen');
      } else {
        // Handle other errors or show a generic error message
        console.error('An error occurred:', err.message);
        // Example: showAlert('Error', 'Failed to delete account. Please try again.');
      }
    }
  };

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
              Delete User
            </Text> */}

            <View style={{marginVertical: 25}}>
              <Text style={{fontSize: 18}}>Are you sure you want to delete!</Text>
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
                  }}>
                  No
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  SwitchModeSelected();
                }}
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
      <Pressable onPress={() => setOpenModal(true)}>
        <AntDesign
          name="delete"
          width={23}
          height={23}
          color="#838383"
          size={20}
        />
      </Pressable>
      <Pressable
        style={{marginLeft: 5, alignItems: 'center'}}
        onPress={() => setOpenModal(true)}>
        <Text
          style={{
            fontSize: 14,
            color: '#810055',
            fontWeight: 'bold',
          }}>
          Delete account
        </Text>
      </Pressable>

      {renderModal()}
    </View>
  );
};

export default DeleteAccountModel;
