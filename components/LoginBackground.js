import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

export default function LoginBackground() {
  return (
    <View style={styles.mainCardView}>
      <Text style={styles.textStyle}>Login for a great experience</Text>
      <SafeAreaView>
        <TextInput style={styles.input} placeholder="Email or Mobile Number" />
        <TextInput style={styles.input} placeholder="Password" />
      </SafeAreaView>
      <Text style={styles.forgotStyle}>Forgot Password ?</Text>
      <TouchableOpacity>
        <LinearGradient
          colors={["#64bbf5", "#0c98f5"]}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Text style={styles.newStyle}>For new users</Text>
      <TouchableOpacity style={styles.loginOptions}>
        <Text style={styles.loginOptionsTextStyle}> with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginOptions}>
        <Text style={styles.loginOptionsTextStyle}>Register with Godrej</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginOptions}>
        <Text style={styles.loginOptionsTextStyle}>
          Register with Mobile Number
        </Text>
      </TouchableOpacity>
      <View style={styles.viewStyle}>
        <Text style={styles.policy}>By continuing you are agreeing to</Text>
        <Text style={styles.terms}>Teams and Conditions Policy</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainCardView: {
    height: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: "column",
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 130,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  textStyle: {
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
    fontSize: 14,
    color: "#636362",
    marginStart: 20,
    marginTop: 20,
    width: "100%",
  },
  forgotStyle: {
    fontFamily: "sans-serif-medium",
    fontSize: 13,
    color: "#20a0f5",
    marginStart: 22,
    marginTop: 4,
    width: "100%",
  },
  newStyle: {
    fontFamily: "sans-serif-medium",
    fontSize: 13,
    marginTop: 28,
    color: "black",
    textAlign: "center",
    marginStart: 22,
  },
  policy: {
    fontSize: 10,
    marginTop: 28,
    color: "black",
    textAlign: "center",
    marginStart: 22,
  },
  terms: {
    fontSize: 10,
    color: "#20a0f5",
    textAlign: "center",
    marginStart: 22,
    marginTop: 4,
  },
  viewStyle: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  input: {
    height: 45,
    marginTop: 18,
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#9c9a9a",
  },
  loginOptions: {
    height: 45,
    marginTop: 10,
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 28,
    borderColor: "#9c9a9a",
  },
  loginOptionsTextStyle: {
    fontFamily: "sans-serif-medium",
    fontSize: 13,
    color: "black",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  appButtonContainer: {
    elevation: 8,
    marginTop: 28,
    marginStart: 20,
    marginEnd: 20,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    fontFamily: "sans-serif-medium",
  },
});
