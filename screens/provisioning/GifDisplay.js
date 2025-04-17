import React from 'react';
import { View, Image, StyleSheet, Modal } from 'react-native';

const GifDisplay = ({ visible, onClose, selectedId }) => {
  let gifSource;

  // Log the selectedId to make sure it's being passed correctly
  console.log("Selected Device ID:", selectedId);

  // Set the correct GIF based on the selected device
  switch (selectedId) {
    case 'AC':
      gifSource = require('../../assets/Final.gif');
      break;
    case 'WM':
      gifSource = require('../../assets/WashingMachine.gif');
      break;
    case 'Refrigerator':
      gifSource = require('../../assets/Refrigerator.gif');
      break;
    default:
      gifSource = require('../../assets/Final.gif');  // Default fallback GIF
      break;
  }

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.container}>
        <Image
          source={gifSource}
          style={styles.gif}
          resizeMode="contain" // Maintain aspect ratio
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
  },
  gif: {
    width: '120%', // Full width
    height: '120%', // Full height
  },
});

export default GifDisplay;
