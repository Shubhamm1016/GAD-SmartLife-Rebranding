import React from 'react';
import {Pressable, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GEGHeadline} from './FontFamily';

const InsideHeader = ({title, onBackPress, style}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 0, // Ensuring the header has some space from the top
        },
        style, // Allow custom styles to be passed to the container
      ]}>
      {/* Back Button */}
      {onBackPress && (
        <Pressable
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onBackPress}>
          <Ionicons name="chevron-back" size={28} color="#333333" />
        </Pressable>
      )}

      {/* Title */}
      <Text
        style={{
          fontSize: 16,
          color: '#333333',
          textAlign: 'center',
          fontFamily: GEGHeadline,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default InsideHeader;
