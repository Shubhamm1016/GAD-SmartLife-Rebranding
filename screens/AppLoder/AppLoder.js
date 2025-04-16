// import {View, Text, ActivityIndicator} from 'react-native';
// import React from 'react';

// const AppLoder = () => {
//   return (
//     <View
//       style={{
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}>
//       <ActivityIndicator size="small" color="#4BB6E8" />

//     </View>
//   );
// };

// export default AppLoder;
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

const AppLoder = () => (
  <View style={styles.overlay}>
    <ActivityIndicator size="large" color="red" />
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
    zIndex: 1000, // Ensures the loader is on top of other components
  },
});

export default AppLoder;
