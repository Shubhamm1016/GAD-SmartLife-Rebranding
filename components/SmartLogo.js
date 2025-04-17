import React from "react";
import { View,Text,Image, StyleSheet } from "react-native";

export default function Logo() {
  return (
    // <Image
    //   source={require("../assets/smartlifewhite.png")}
    //   style={styles.image}
    // />
    <View style={{height:50}}>
      <Text style={styles.hading}>Smart <Text style={{color:'#FFFFFF',fontSize:45, fontWeight: '300',}}>Life</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 168,
    height: 31,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  hading:{
color:'#FFFFFF',
fontSize:45,
fontWeight: 'bold',
  }
});
