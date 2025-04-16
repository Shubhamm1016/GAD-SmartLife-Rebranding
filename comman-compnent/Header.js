import React from 'react';
import {Pressable, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GEGHeadline } from './FontFamily';

const Header = ({title, onBackPress, style}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 40,
        },
        style,
      ]}>
      {/* Back Button */}
      {onBackPress && (
        <Pressable
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={onBackPress}>
          <Ionicons name="chevron-back" size={28} color="#333333" />
        </Pressable>
      )}

      {/* Title */}
      <Text
        style={{
          fontSize: 18,
          color: '#333333',
          textAlign: 'center',
          fontFamily:GEGHeadline

        }}>
        {title}
      </Text>
    </View>
  );
};

export default Header;
