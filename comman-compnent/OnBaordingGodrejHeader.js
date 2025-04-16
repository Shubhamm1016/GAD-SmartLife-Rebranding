import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const OnBaordingGodrejHeader = ({title, onBackPress, style}) => {
  return (
    <View style={styles.background}>
      <Image
        source={require('../assets/godrejname.png')}
        style={{
          height: 30,
          width: 60,
          resizeMode: 'contain',
          left: 15,
          marginTop: 5,
          padding: 20,
          // paddingHorizontal:10
        }}
      />
      <Image
        source={require('../assets/godrejen.png')}
        style={{
          height: 30,
          width: 60,
          resizeMode: 'contain',
          right: 15,
          marginTop: 5,
        }}
      />
    </View>
  );
};

export default OnBaordingGodrejHeader;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // top: 1,
  },
});
