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
import {userCreatesVerfication, userMobileVerfication} from '../../Context/API';
import GodrejHeader from '../../comman-compnent/GodrejHeader';
import {GEGHeadline} from '../../comman-compnent/FontFamily';

const MobileNumberOTPScreen = ({route, navigation}) => {
  const {phone} = route.params;

  const [verificationcode, setVerificationCode] = useState('');
  const pressHandler = async () => {
    if (verificationcode == '') {
      alert('Please Provide vaild Code');
      return;
    }
    try {
      let response = await userMobileVerfication(phone, verificationcode);

      if (response.status == 201) {
        Alert.alert('Success!', {phone}, 'has been confirmed!', [
          {text: 'OK', onPress: () => navigation.navigate('Login')},
        ]);
      }
    } catch (err) {
      alert(err.response.data.description, 'error');
    }
  };
  return (
    <View style={styles.main}>
      <GodrejHeader />
      <View style={{flex: 1, top: 20, alignItems: 'center'}}>
        <Text style={{fontSize: 28, color: '#810055', fontFamily: GEGHeadline}}>
          Smart
        </Text>
        <Text style={{fontSize: 28, color: '#810055', fontFamily: GEGHeadline}}>
          Life
        </Text>
      </View>
      <View style={styles.mainCardView}>
        <Text style={styles.textStyle}>Enter OTP</Text>
        <Text style={styles.terms}>
          Please enter OTP sent to your mobile {phone}{' '}
        </Text>
        <SafeAreaView>
          {/* <Text style={styles.terms}>Enter cerification Code :</Text> */}

          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            placeholderTextColor="#CECECE"
            maxLength={6}
            keyboardType="number-pad"
            onChangeText={value => setVerificationCode(value)}
          />
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

export default MobileNumberOTPScreen;
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
