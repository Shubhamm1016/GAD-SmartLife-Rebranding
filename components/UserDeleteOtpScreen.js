import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
//   import Logo from '../../components/Logo';
import SmartLogo from './SmartLogo';
import LinearGradient from 'react-native-linear-gradient';
import Logo from './Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {OtpVerifyToDeleteUser, SendOtpToDeleteUser} from '../Context/API';
import GodrejHeader from '../comman-compnent/GodrejHeader';
import { GEGHeadline } from '../comman-compnent/FontFamily';
import { UserContext } from '../Context/UserContext';
//   import {userCreatesVerfication} from '../../Context/API';

const UserDeleteOtpScreen = (props) => {
    // console.log(props,"props");
    const {navigation} = props;
  // console.log(navigation, 'navigation');
  // const {email} = route.params;
  const {deleteAccountOTPVerify} = useContext(UserContext);
  const [verificationcode, setVerificationCode] = useState('');

  const pressHandler = async () => {
    // console.log(verificationcode, 'verificationcode');
    // return
    if (verificationcode == '') {
      alert('Please Provide vaild Code');
      return;
    }
    let token = await AsyncStorage.getItem('AccessToken');
    try {
      deleteAccountOTPVerify(verificationcode);
 
      let response = await OtpVerifyToDeleteUser(token, verificationcode);
      console.log(response.status, 'response');
      await AsyncStorage.removeItem('email');

      await AsyncStorage.removeItem('AccessToken');

      await AsyncStorage.removeItem('TokenId');

      await AsyncStorage.removeItem('refreshtoken');
      await AsyncStorage.removeItem('addImg');
      // Assuming email is a variable you want to display in the alert
      Alert.alert('Success!', `has been confirmed!`, [
        {text: 'OK', onPress: () =>  props.setIsLoggedIn(false)},
      ]);
    } catch (err) {
      // Assuming err.response.data.description contains the error message
      alert('Error', err.response.data.description);
    }
  };
  const pressResendOtp = async () => {
    // console.log('hhhhh');
    // return
    let token = await AsyncStorage.getItem('AccessToken');
    // console.log(token, 'token');
    // return
    try {
      let response = await SendOtpToDeleteUser(token);
      // console.log(response.data, 'response');
    } catch (err) {
      console.log(err.response, 'errerr');
    }
  };

  return (
    <View style={styles.main}>
      {/* <ImageBackground
        source={require('../assets/loginback.png')}
        style={styles.background}>
        <Logo />
        <SmartLogo />
      </ImageBackground> */}
       <GodrejHeader/>
        <View style={{flex: 1, top: 20, alignItems: 'center'}}>
          <Text
            style={{fontSize: 28, color: '#810055', fontFamily: GEGHeadline}}>
            Smart
          </Text>
          <Text
            style={{fontSize: 28, color: '#810055', fontFamily: GEGHeadline}}>
            Life
          </Text>
        </View>
      <View style={styles.mainCardView}>
        <Text style={styles.textStyle}>Enter OTP</Text>
        <Text style={styles.terms}>A confirmation code was sent to</Text>
        <SafeAreaView>
          <Text style={styles.terms}>Enter cerification Code </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            placeholderTextColor="#000"
            keyboardType="numeric" // Set keyboard type to numeric
            onChangeText={value => setVerificationCode(value)}
            maxLength={6} // Set maximum length for OTP (adjust as needed)
          />
          <TouchableOpacity
            onPress={pressResendOtp}
            style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 16,
                color: '#810055',
                fontWeight: 'bold',
                alignSelf: 'center',
                marginTop:10
              }}>
              Resend OTP
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
        <TouchableOpacity onPress={pressHandler}>
          <LinearGradient
            colors={['#810055', '#810055']}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Verify</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserDeleteOtpScreen;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F1F1ED',
  },
  background: {
    flex: 1,
    width: '100%',
    height: 300,
    alignItems: 'center',
  },
  mainCardView: {
    height: '66%',
    backgroundColor: 'white',
    borderRadius: 25,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'column',
    paddingLeft: 16,
    paddingRight: 14,
    marginBottom: 56,
    marginTop:30,
    marginLeft: 16,
    marginRight: 16,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#636362',
    marginStart: 20,
    marginTop: 20,
    width: '100%',
  },
  terms: {
    fontSize: 14,
    color: 'gray',
    marginStart: 20,
    marginTop: 4,
  },
  input: {
    height: 45,
    marginTop: 18,
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#9c9a9a',
  },
  appButtonContainer: {
    elevation: 8,
    marginTop: 32,
    marginStart: 10,
    marginEnd: 10,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
