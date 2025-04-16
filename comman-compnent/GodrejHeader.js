import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const GodrejHeader = ({title, onBackPress, style}) => {
  return (
    <View style={styles.background}>
      <Image
        source={require('../assets/godrejname.png')}
        style={{
          height: 60,
          width: 60,
          resizeMode: 'contain',
          left: 15,
          marginTop: 50,
          padding: 20,
          // paddingHorizontal:10
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

export default GodrejHeader;

const styles = StyleSheet.create({
  background: {
    height: '12%',
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // top: 1,
  },
});
