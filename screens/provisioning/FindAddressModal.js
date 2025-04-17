// FindAddressModal.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
const FindAddressModal = ({isVisible, closeModal, navigation}) => {
  const handleCloseModal = () => {
    closeModal(); // Close the modal
    // navigation.goBack(); // Go back to the previous screen
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={{
                marginLeft: 'auto',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                // alignItems: 'center',
              }}>
              <Entypo
                name="cross"
                color="red"
                width={45}
                height={45}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                color: '#636362',
                marginStart: 20,
                marginTop: 20,
                width: '100%',
                
              }}>
              Enter your City and State
            </Text>
            <View style={{}}>
              <Image
                source={require('../../assets/oneslidern.png')}
                style={{
                  width: 150,
                  height: 150,
                  marginLeft: 20,
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
              <View>
                <View style={{ alignItems: 'center',}}>
                  <TextInput
                    style={{
                      height: 45,
                      width: "100%",
                      marginTop: 18,
                      backgroundColor: '#fff',
                      paddingVertical: 10,
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: '#9c9a9a',
                      padding: 10,
                    }}
                    placeholder="City"
                    placeholderTextColor="#000"
                    onChangeText={value => {
                      // Handle the text change here
                      console.log('Entered text:', value);
                      // You can also update the state if needed
                      setCity(value);
                    }}
                  />
                  <TextInput
                    style={{
                      height: 45,
                      width: 200,
                      marginTop: 18,
                      backgroundColor: '#fff',
                      paddingVertical: 10,
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: '#9c9a9a',
                      padding: 10,
                    }}
                    placeholder="Sate"
                    placeholderTextColor="#000"
                    onChangeText={value => {
                      // Handle the text change here
                      console.log('Entered text:', value);
                      // You can also update the state if needed
                      // setCity(value);
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    // alignItems: 'center',
                    paddingVertical: 10,
                  }}>
                  {/* <TouchableOpacity onPress={handleCloseModal}>
                  <LinearGradient
                    colors={['#64bbf5', '#0c98f5']}
                    style={{
                      elevation: 8,
                      borderRadius: 8,
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,

                        color: '#fff',

                        fontWeight: 'bold',

                        alignSelf: 'center',
                      }}>
                      Cancel
                    </Text>
                  </LinearGradient>
                </TouchableOpacity> */}
                  <TouchableOpacity onPress={handleCloseModal}>
                    <LinearGradient
                      colors={['#64bbf5', '#0c98f5']}
                      style={{
                        elevation: 8,
                        borderRadius: 8,
                        paddingVertical: 12,
                        paddingHorizontal: 12,
                        width: 200,
                        marginTop: 15,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#fff',
                          // fontWeight: 'bold',
                          alignSelf: 'center',
                        }}>
                        Ok
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    width:'70%',
    // alignItems: 'center',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
});

export default FindAddressModal;
