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

export default function ForgotBackground() {
  return (
    <View style={styles.mainCardView}>
      <Text style={styles.textStyle}>Reset Password</Text>
      <Text style={styles.terms}>
        Please enter your registered email or mobile number to reset password
      </Text>
      <SafeAreaView>
        <TextInput style={styles.input}     placeholderTextColor="#CECECE" placeholder="Email or Mobile Number" />
      </SafeAreaView>
      <TouchableOpacity>
        <LinearGradient
          colors={["#64bbf5", "#0c98f5"]}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Get OTP</Text>
        </LinearGradient>
      </TouchableOpacity>
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
  terms: {
    fontSize: 14,
    color: "gray",
    marginStart: 20,
    fontFamily: "sans-serif-medium",
    marginTop: 4,
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
  appButtonContainer: {
    elevation: 8,
    marginTop: 32,
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
