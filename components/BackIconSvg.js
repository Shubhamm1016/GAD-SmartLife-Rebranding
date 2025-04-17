import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
// import {BLUE} from '../shared/constants/color';

const BackIconSvg = ({width, height}) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#4bb6e8"/>
      <stop offset="1" stop-color="#4d98ff"/>
    </linearGradient>
  </defs>
  <g id="Group_24729" data-name="Group 24729" transform="translate(-15 -390)">
    <g id="Group_24728" data-name="Group 24728" transform="translate(4143 -7239)">
      <circle id="Ellipse_1515" data-name="Ellipse 1515" cx="16" cy="16" r="16" transform="translate(-4128 7629)" fill="url(#linear-gradient)"/>
    </g>
    <path id="Icon_material-format-list-bulleted" data-name="Icon material-format-list-bulleted" d="M4.984,11.686A1.234,1.234,0,1,0,6.218,12.92,1.232,1.232,0,0,0,4.984,11.686Zm0-4.936A1.234,1.234,0,1,0,6.218,7.984,1.232,1.232,0,0,0,4.984,6.75Zm0,9.872a1.234,1.234,0,1,0,1.234,1.234A1.238,1.238,0,0,0,4.984,16.622Zm2.468,2.057H18.97V17.034H7.452Zm0-4.936H18.97V12.1H7.452Zm0-6.582V8.807H18.97V7.161Z" transform="translate(19.64 393.08)" fill="#fff"/>
  </g>
</svg>
`;

  const styles = StyleSheet.create({
    backIcon: {
      flexDirection: 'row',
      marginVertical: 30,
      marginHorizontal: 15,
      color: 'red',
    },
    backIconText: {
      fontSize: 12,
      color: 'red',
    },
    backIconView: {
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.backIcon}>
      <SvgXml width={width} height={height} xml={svg} />
      {/* <View style={styles.backIconView}>
        <Text allowFontScaling={false} style={styles.backIconText}>
          BACK
        </Text>
      </View> */}
    </View>
  );
};
export default BackIconSvg;
