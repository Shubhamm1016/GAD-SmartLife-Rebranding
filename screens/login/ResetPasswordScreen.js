import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import Logo from '../../components/Logo';
import SmartLogo from '../../components/SmartLogo';
import LinearGradient from 'react-native-linear-gradient';
import {userVerification} from '../../Context/API';
import Header from '../../comman-compnent/Header';
import GodrejHeader from '../../comman-compnent/GodrejHeader';
import {GEGBold, GEGHeadline} from '../../comman-compnent/FontFamily';
 
const ResetPasswordScreen = ({route, navigation}) => {
  const {email} = route.params;
  console.log(email, 'email');
  let emails;
  const isnum = /^\d+$/.test(email);
  if (isnum) {
    emails = '+91' + email;
  } else {
    emails = email;
  }
  const [newpass, setNewPass] = useState('');
  const [confirmpass, setConfirmPass] = useState('');
  const [verificationcode, setVerificationCode] = useState('');
  const PASSWORD_REGEX =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
 
  const pressHandler = async () => {
    // Validate new password input
    if (!newpass) {
      alert('Please provide a valid new password');
      return;
    }
 
    // Validate confirm password input
    if (!confirmpass) {
      alert('Please provide a valid confirm password');
      return;
    }
 
    // Validate new password format
    if (!PASSWORD_REGEX.test(newpass)) {
      alert('Invalid password, try another...');
      return;
    }
 
    // Validate confirm password format
    if (!PASSWORD_REGEX.test(confirmpass)) {
      alert('Invalid confirm password, try another...');
      return;
    }
 
    // Check if new password and confirm password match
    if (newpass !== confirmpass) {
      alert('Passwords do not match');
      return;
    }
    console.log(emails, newpass, verificationcode, '?????');
 
    try {
      const response = await userVerification(
        emails,
        newpass,
        verificationcode,
      );
      console.log(response.data.status === 'success', 'response');
      // alert(response.data.description);
      if (response.data.status) {
        alert('Password Successful Change.');
        setVerificationCode('');
        setConfirmPass('');
        setNewPass('');
        setTimeout(() => {
          navigation.navigate('Login');
        }, 3000);
      } else {
        alert('Password change failed. Please try again.');
      }
    } catch (err) {
      // console.error('Error:', err); // Log the entire error object for more context
      if (err.response) {
        // console.error('Error Response Data:', err.response.data); // Check server's response message
        // console.error('Error Status:', err.response.status);
        alert(
          err.response.data.description || 'Request failed with status 400',
        );
      } else {
        alert('An unexpected error occurred');
      }
    }
  };
 
  return (
    <View style={styles.main}>
      {/* <View style={{flex: 1}}>
        <Header
          title="Reset Password"
          onBackPress={() => navigation.goBack()} // Set your back action here
        />
      </View> */}
      <GodrejHeader />
      <View
        style={{
          flex: 1,
          top: 20,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 28, color: '#810055', fontFamily: GEGHeadline}}>
          Smart
        </Text>
        <Text style={{fontSize: 28, color: '#810055', fontFamily: GEGHeadline}}>
          Life
        </Text>
      </View>
      <View style={styles.mainCardView}>
        <Text style={styles.textStyle}>Set Password</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            onChangeText={value => setNewPass(value)}
            placeholderTextColor="#707070"
          />
        </SafeAreaView>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#707070"
            onChangeText={value => setConfirmPass(value)}
          />
        </SafeAreaView>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            placeholder="Verification Code"
            placeholderTextColor="#707070"
            maxLength={6}
            keyboardType="number-pad"
            onChangeText={value => setVerificationCode(value)}
          />
        </SafeAreaView>
        <TouchableOpacity onPress={pressHandler}>
          <LinearGradient
            colors={['#810055', '#810055']}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Reset Password</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
 
export default ResetPasswordScreen;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F1F1ED',
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
    marginBottom: 50,
    marginLeft: 16,
    marginRight: 16,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333333',
    // marginStart: 20,
    marginTop: 20,
    fontFamily: GEGHeadline,
    width: '100%',
  },
  terms: {
    fontSize: 14,
    color: 'gray',
    marginStart: 20,
    marginTop: 4,
  },
  input: {
    height: 55,
    marginTop: 18,
    // marginStart: 20,
    // marginEnd: 20,
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#F1F1ED',
  },
  appButtonContainer: {
    elevation: 8,
    marginTop: 32,
    // marginStart: 20,
    // marginEnd: 20,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    // fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: GEGBold,
  },
});