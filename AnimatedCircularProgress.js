import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {Circle, Defs, LinearGradient, Stop} from 'react-native-svg';
import PropTypes from 'prop-types';

const AnimatedCircularProgress = ({
  percentage,
  width,
  strokeWidth,
  fontSize,
  fontColor,
  fontFamily,
  primaryColor,
  secondaryColor,
  fill,
  hidePercentageText,
  strokeLinecap,
}) => {
  const PI = 3.14;
  const R = width / 2 - strokeWidth * 2;
  const circumference = 2 * PI * R;
  const offset = circumference - (percentage / 100) * circumference;
  const gradientId = primaryColor.join('').replace(/#/g, '');

  return (
    <View style={[styles.circleContainer, {width, height: width}]}>
      {!hidePercentageText && (
        <View style={styles.percentageContainer}>
          <TouchableOpacity style={{backgroundColor: 'red'}}>
            <Text
              style={[
                styles.percentageText,
                {fontSize, color: fontColor, fontFamily},
              ]}>
              {percentage}%
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Svg width="100%" height="100%">
        <Defs>
          <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={primaryColor[0]} />
            <Stop offset="100%" stopColor={primaryColor[1]} />
          </LinearGradient>
        </Defs>
        <Circle
          strokeWidth={strokeWidth}
          fill="transparent"
          r={R}
          cx={width / 2}
          cy={width / 2}
          stroke={secondaryColor}
          strokeDasharray={`${circumference} ${circumference}`}
        />
        <Circle
          strokeWidth={strokeWidth}
          fill={fill}
          r={R}
          cx={width / 2}
          cy={width / 2}
          stroke={`url(#${gradientId})`}
          strokeLinecap={strokeLinecap}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
        />
      </Svg>
    </View>
  );
};

AnimatedCircularProgress.propTypes = {
  percentage: PropTypes.number.isRequired,
  width: PropTypes.number,
  strokeWidth: PropTypes.number,
  strokeLinecap: PropTypes.oneOf(['round', 'square', 'butt']),
  fontSize: PropTypes.number,
  fontColor: PropTypes.string,
  fontFamily: PropTypes.string,
  primaryColor: PropTypes.arrayOf(PropTypes.string),
  secondaryColor: PropTypes.string,
  fill: PropTypes.string,
  hidePercentageText: PropTypes.bool,
};

AnimatedCircularProgress.defaultProps = {
  width: 200,
  strokeWidth: 5,
  strokeLinecap: 'round',
  fontSize: 14,
  fontColor: '#fff',
  fontFamily: 'Arial',
  primaryColor: ['#00BBFF', '#92d7f1'],
  secondaryColor: 'transparent',
  fill: 'transparent',
  hidePercentageText: false,
};

const styles = StyleSheet.create({
  circleContainer: {
    borderRadius: 100,
    position: 'relative',
  },
  percentageContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    textAlign: 'center',
  },
});

export default AnimatedCircularProgress;
