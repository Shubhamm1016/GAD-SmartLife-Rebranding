import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const OnBoardingHeader = () => {
  return (
    <View style={styles.background}>
      <Image
        source={require('../assets/godrejname.png')}
        style={{
          height: 60,
          width: 60,
          resizeMode: 'contain',
          left: 15,
          marginTop: 10,
        //   padding: 20,
        }}
      />
      <Image
        source={require('../assets/godrejen.png')}
        style={{
          height: 60,
          width: 60,
          resizeMode: 'contain',
          right: 15,
          marginTop: 50,
        }}
      />
    </View>
  );
};

export default OnBoardingHeader;

const styles = StyleSheet.create({
  background: {
    height: '5%',
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom:10
  },
});
