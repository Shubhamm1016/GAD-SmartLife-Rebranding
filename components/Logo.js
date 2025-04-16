import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <Image source={require("../assets/godrej.png")} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 136,
    height: 25,
    marginTop: 90,
    resizeMode:'cover'
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
