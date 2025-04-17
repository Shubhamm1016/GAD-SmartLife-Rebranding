import {View, Text, Pressable, Modal, Platform, Dimensions} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Entypo';
const { width, height } = Dimensions.get('window');
const MCDModulHome = props => {
  const {navigation} = props;
  const [openModal, setOpenModal] = React.useState(false);
  const responsiveHeight = (height * 15) / 100;
  const responsiveWidth = (width * 35)/100;
  console.log(responsiveWidth,"responsiveWidth");
  function renderModal() {
    if (!openModal) {
      return null; // Don't render the modal if it's closed
    }

    return (
      <Modal
        style={{flex:1,width: '100%', marginLeft: 0, marginBottom: 0}}
        visible={openModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setOpenModal(false);
        }}>
        <Pressable
          style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          onPress={() => {
            setOpenModal(false);
          }}>
          <View
            style={{
              height: responsiveHeight,
              width: responsiveWidth,
              backgroundColor: 'white',
              shadowColor: 'gray',
              shadowRadius: 12,
              elevation: 12,
              shadowOpacity: 5.0,
              justifyContent: 'center',
              borderRadius: 12,
              position: 'absolute',
              right: 30,
              top: '25%',
              zIndex: 1,
              alignItems: 'center',
            }}>
            <Text
              style={{textAlign: 'center'}}
              onPress={() => {
                setOpenModal(false);
                navigation.navigate('ManageGroup');
              }}>
              Manage Group
            </Text>

            <View
              style={{
                height: 0.3,
                backgroundColor: 'gray',
                margin: 8,
                width: 125,
              }}
            />

            <Text
              style={{textAlign: 'center'}}
              onPress={() => {
                setOpenModal(false);
                navigation.navigate('ManageCreateGroupScreen', {
                  setHideRemove: true,
                });
              }}>
              Create Group
            </Text>
            <View
              style={{
                height: 0.3,
                backgroundColor: 'gray',
                margin: 8,
                width: 125,
              }}
            />

            <Text
              style={{textAlign: 'center'}}
              onPress={() => {
                setOpenModal(false);
                navigation.navigate('DeleteDeviceScreen');
              }}>
              Delete Devices
            </Text>
          </View>
        </Pressable>
      </Modal>
    );
  }

  return (
    <Pressable
      style={{
        height: 30,
        // backgroundColor: 'red',
        width: 30,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => setOpenModal(true)}>
      <Ionicons name="dots-three-vertical" size={20} color="black" />

      {renderModal()}
    </Pressable>
  );
};

export default MCDModulHome;
