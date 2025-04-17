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
import React, {useState} from 'react';
import Logo from '../../components/Logo';
import SmartLogo from '../../components/SmartLogo';
import LinearGradient from 'react-native-linear-gradient';
import {userCreatesVerfication} from '../../Context/API';

const RegistrationOTPScreen = ({route, navigation}) => {
  const {email} = route.params;
  const [verificationcode, setVerificationCode] = useState('');
  const pressHandler = async () => {
    if (verificationcode == '') {
      alert('Please Provide vaild Code');
      return;
    } 
    try {
      let response = await userCreatesVerfication(email, verificationcode);
      console.log(response.status, 'response');
      if (response.status === 201) {
        // Assuming email is a variable you want to display in the alert
        Alert.alert('Success!', `${email} has been confirmed!`, [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ], {cancelable: false},);
      }
    } catch (err) {
      // Assuming err.response.data.description contains the error message
      alert(err.response.data.description);
    }
    
  };

  const data =()=>{
    console.log("hhhhh");
    Alert.alert(
      'Alert Title',
      'My Alert Msg', // <- this part is optional, you can pass an empty string
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }
  return (
    <View style={styles.main}>
      <ImageBackground
        source={require('../../assets/loginback.png')}
        style={styles.background}>
        <Logo />
        <SmartLogo />
      </ImageBackground>
      <View style={styles.mainCardView}>
        <Text style={styles.textStyle}>Enter OTP</Text>
        <Text style={styles.terms}>
        Please enter OTP sent to your {email}{' '}
        </Text>
        <SafeAreaView>
          {/* <Text style={styles.terms}>Enter cerification Code :</Text> */}

          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            placeholderTextColor="#CECECE"
            maxLength={6}
            keyboardType='number-pad'
            onChangeText={value => setVerificationCode(value)}
          />
        </SafeAreaView>
        <TouchableOpacity onPress={pressHandler}>
          <LinearGradient
            colors={['#64bbf5', '#0c98f5']}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Verify</Text>
          </LinearGradient>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={data}>
          <LinearGradient
            colors={['#64bbf5', '#0c98f5']}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>demo</Text>
          </LinearGradient>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default RegistrationOTPScreen;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
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
    borderRadius: 15,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'column',
    paddingLeft: 16,
    paddingRight: 14,
    marginBottom: 56,
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
    marginStart: 20,
    marginEnd: 20,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
