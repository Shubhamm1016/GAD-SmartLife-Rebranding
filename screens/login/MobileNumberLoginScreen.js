import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  Pressable,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {userMobileCreates} from '../../Context/API';
import {TeamsAndConditionsUrl, PolicyUrl} from '@env';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../../comman-compnent/Header';
import GodrejHeader from '../../comman-compnent/GodrejHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  GEGBodyCopy,
  GEGBodyCopyHighlight,
  GEGHeadline,
} from '../../comman-compnent/FontFamily';

const MobileNumberLoginScreen = ({navigation}) => {
  const [phon, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  console.log(checked, 'checked');
  const [confirmpassword, setConfirmPassword] = useState('');
  const PASSWORD_REGEX =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureConfermEntry, setSecureConfermEntry] = useState(true);

  const phone = '+91' + phon;
  console.log(phone);

  const pressBottomHandler = async () => {
    if (checked == false) {
      alert('Please accept terms & Policy to Proceed');
      return;
    }
    if (phon == '') {
      alert('Please Provide Vaild Phone Number');
      return;
    }
    if (password == '') {
      alert('Please Provide Vaild Passsword');
      return;
    }
    if (!password || PASSWORD_REGEX.test(password) == false) {
      alert('Invalid Password Correct, Try Another...');
      return;
    }
    if (confirmpassword == '') {
      alert('Please Provide Vaild Confirm Password');
      return;
    }

    if (!confirmpassword || PASSWORD_REGEX.test(confirmpassword) == false) {
      alert('Invalid Confirm Password Correct, Try Another...');
      return;
    }
    if (password != confirmpassword) {
      alert('Password Not Matched');
      return;
    }
    console.log('hello');
    try {
      let response = await userMobileCreates(phone, password);
      console.log(response.data, 'response');
      if (response.status == 201) {
        navigation.navigate('MobileNumberOTP', {phone: phone});
      }
    } catch (err) {
      if (err.response && err.response.data) {
        if (err.response.data.message) {
          alert(err.response.data.message);
        } else if (err.response.data.description) {
          alert(err.response.data.description);
        }
      } else {
        console.log(err, 'err');
        // If response or data is not available, display a default error message
        alert('An error occurred. Please try again later.');
      }
    }
  };
  const handleCheckboxPress = () => {
    setChecked(!checked);
  };

  const isPasswordValid = {
    minLength: password.length >= 8,
    hasCapitalLetter: /[A-Z]/.test(password),
    hasAlphaNumeric: /\d/.test(password) && /[a-zA-Z]/.test(password),
    hasSpecialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const toggleConfermEntry = () => {
    setSecureConfermEntry(!secureConfermEntry);
  };

  return (
    <View style={styles.main}>
      {/* <ImageBackground
        source={require('../../assets/loginback.png')}
        style={styles.background}>
        <Logo />
        <SmartLogo />
      </ImageBackground> */}
      {/* <View style={{flex: 1}}>
        <Header
          title="Registration"
          onBackPress={() => navigation.goBack()} // Set your back action here
        />
      </View> */}
      <GodrejHeader />
      <View style={{ alignItems: 'center'}}>
        <Text style={{fontSize: 20, color: '#810055', fontFamily: GEGHeadline}}>
          Smart
        </Text>
        <Text style={{fontSize: 20, color: '#810055', fontFamily: GEGHeadline}}>
          Life
        </Text>
      </View>
      <ScrollView style={{marginBottom:20}}>
        <View style={styles.mainCardView}>
          <View style={styles.textStyleView}>
            <Text style={styles.textStyle}>Register</Text>
          </View>
          {/* <View
            style={{
              flexDirection: 'row', // Align children horizontally
              alignItems: 'center', // Center vertically
              marginTop: 18,
              backgroundColor: '#fff',
              padding: 10,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: '#9c9a9a',
              height: 45,
              width: '100%',
            }}>
            <View
              style={
                {
                  // height: 45,
                  // marginTop: 18,
                  // marginStart: '3%', // Adjust marginStart using percentage
                  // backgroundColor: 'white',
                  // padding: 10,
                  // borderWidth: 1,
                  // borderRadius: 8,
                  // borderColor: '#9c9a9a',
                  // width: '15%', // Set width as a percentage
                  // alignItems: 'center',
                  // justifyContent: 'center',
                }
              }>
              <Text>+91</Text>
            </View>
            <TextInput
              placeholder="Mobile number"
              maxLength={10}
              placeholderTextColor="#000"
              keyboardType="number-pad"
              onChangeText={value => setPhone(value)}
            />
          </View> */}
          <View
            style={{
              // flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              // backgroundColor:'blue'
            }}>
            <View
              style={{
                height: 55,
                marginTop: 18,
                // paddingVertical: 10,
                backgroundColor: 'white',
                // padding: 10,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderColor: '#F1F1ED',
                marginHorizontal: 10,
              }}>
              <TextInput
                style={{
                  paddingLeft: 10,
                  width: '100%',
                }}
                placeholder="Mobile number"
                maxLength={10}
                placeholderTextColor="#333333"
                keyboardType="number-pad"
                onChangeText={value => setPhone(value)}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row', // Align children horizontally
              alignItems: 'center', // Center vertically
              marginTop: 18,
              marginHorizontal: 10,
              backgroundColor: '#fff',
              paddingVertical: 10,
              padding: 10,
              paddingHorizontal: 12,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: '#F1F1ED',
              height: 55,
              // backgroundColor: 'red',
            }}>
            <TextInput
              style={{
                flex: 1, // Takes remaining space in the container
                height: 45,
                color: '#000',
              }}
              placeholder="Password"
              placeholderTextColor="#000"
              secureTextEntry={secureTextEntry}
              maxLength={15}
              onChangeText={value => setPassword(value.trim())}
            />
            <TouchableOpacity
              style={{
                marginLeft: 8,
                position: 'relative',
              }}
              onPress={toggleSecureEntry}>
              <Entypo
                name={secureTextEntry ? 'eye-with-line' : 'eye'}
                size={18}
                color="#707070"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row', // Align children horizontally
              alignItems: 'center', // Center vertically
              marginTop: 18,
              marginHorizontal: 10,
              backgroundColor: '#fff',
              // paddingVertical: 10,
              padding: 10,
              paddingHorizontal: 12,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: '#F1F1ED',
              height: 55,
            }}>
            <TextInput
              style={{
                flex: 1, // Takes remaining space in the container
                height: 45,
                color: '#000',
              }}
              placeholder="Confirm Password"
              placeholderTextColor="#000"
              secureTextEntry={secureConfermEntry}
              maxLength={15}
              onChangeText={value => setConfirmPassword(value.trim())}
            />
            <TouchableOpacity
              style={{
                marginLeft: 8,
                position: 'relative',
              }}
              onPress={toggleConfermEntry}>
              <Entypo
                name={secureConfermEntry ? 'eye-with-line' : 'eye'}
                size={18}
                color="#707070"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordCard}>
            <Text style={styles.cardHeadingStyle}>
              Your password should contain
            </Text>

            <View style={styles.passwordHint}>
              {/* <Image
                source={require('../../assets/dotimg.png')}
                style={styles.dotImage}
              /> */}
              <AntDesign
                name="checkcircleo"
                width={20}
                height={20}
                color={isPasswordValid.minLength ? '#33C037' : '#707070'}
                size={15}
              />
              <Text
                style={[
                  styles.cardStyle,
                  isPasswordValid.minLength ? null : styles.invalidPassword,
                ]}>
                Minimum 8 character
              </Text>
            </View>

            <View style={styles.passwordHint}>
              <AntDesign
                name="checkcircleo"
                width={20}
                height={20}
                color={isPasswordValid.minLength ? '#33C037' : '#707070'}
                size={15}
              />
              <Text
                style={[
                  styles.cardStyle,
                  isPasswordValid.hasCapitalLetter
                    ? null
                    : styles.invalidPassword,
                ]}>
                1 Capital letter
              </Text>
            </View>

            <View style={styles.passwordHint}>
              <AntDesign
                name="checkcircleo"
                width={20}
                height={20}
                color={isPasswordValid.minLength ? '#33C037' : '#707070'}
                size={15}
              />
              <Text
                style={[
                  styles.cardStyle,
                  isPasswordValid.hasAlphaNumeric
                    ? null
                    : styles.invalidPassword,
                ]}>
                1 Alpha numeric letter
              </Text>
            </View>

            <View style={styles.passwordHint}>
              <AntDesign
                name="checkcircleo"
                width={20}
                height={20}
                color={isPasswordValid.minLength ? '#33C037' : '#707070'}
                size={15}
              />
              <Text
                style={[
                  styles.cardStyle,
                  isPasswordValid.hasSpecialCharacter
                    ? null
                    : styles.invalidPassword,
                ]}>
                1 Special character
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={pressBottomHandler}>
            <View style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.dontView}>
          <Text style={styles.newStyle}>Alreaday have an Account? </Text>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            //  onPress={navigation.navigate("Login")}
            onPress={() => navigation.replace('Login')}>
            <Text style={{color: '#810055', fontFamily: GEGHeadline}}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewStyle}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // marginTop: 5,
              // marginBottom: 5,
            }}>
            <Pressable onPress={handleCheckboxPress}>
              <MaterialCommunityIcons
                name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
                size={20}
                color={checked ? '#810055' : '#810055'}
                style={{borderRadius: 5}}
              />
            </Pressable>
            <Text style={styles.policy}>
              {' '}
              By continuing you are agreeing to
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(TeamsAndConditionsUrl);
              }}>
              <Text style={styles.terms}>Teams & Conditions |</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{right: 15}}
              onPress={() => {
                Linking.openURL(
                  'https://privacypolicygodrejsmartlife.s3.ap-south-1.amazonaws.com/Updated_Godrej_smartlife_privacy_policy.pdf',
                );
              }}>
              <Text style={styles.terms}>Privacy Policy</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{right: 15}}
              onPress={async () => {
                try {
                  const supported = await Linking.canOpenURL(PolicyUrl);
                  if (supported) {
                    Linking.openURL(
                      'https://privacypolicygodrejsmartlife.s3.ap-south-1.amazonaws.com/Updated_Godrej_smartlife_privacy_policy.pdf',
                    );
                  } else {
                    console.error("Can't open URL: " + PolicyUrl);
                  }
                } catch (error) {
                  console.error('Error opening URL', error);
                }
              }}>
              <Text style={styles.terms}>Privacy Policy</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MobileNumberLoginScreen;

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
  layout: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  googlelogo: {
    width: 20,
    height: 20,
  },
  continueView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainCardView: {
    height: '80%',
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
    marginTop: 30,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  textStyleView: {
    marginStart: 18,
    marginTop: 12,
  },
  dontView: {
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  textStyle: {
    // fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    color: '#333333',
    fontFamily: GEGHeadline,
  },
  rememberStyle: {
    marginTop: 4,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgotStyle: {
    fontSize: 13,
    color: '#20a0f5',
  },
  newStyle: {
    fontSize: 12,
    color: '#707070',
    textAlign: 'center',
    fontFamily: GEGBodyCopy,
  },
  policy: {
    fontSize: 12,
    // marginTop: 28,
    color: '#707070',
    textAlign: 'center',
    // marginStart: 22,
    fontFamily: GEGBodyCopy,
  },
  terms: {
    fontSize: 12,
    color: '#810055',
    textAlign: 'center',
    marginStart: 22,
    marginTop: 0,
    fontFamily: GEGHeadline,
    // fontWeight: 'bold',
  },
  viewStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    // marginBottom: 5,
    alignItems: 'center',
  },
  fieldSet: {
    alignItems: 'center',
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
  legend: {
    position: 'absolute',
    top: -10,
    left: 10,
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF',
    color: '#9c9a9a',
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
  passwordCard: {
    height: 130,
    borderRadius: 5,
    flexDirection: 'column',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 12,
    marginBottom: 6,
    // marginLeft: 16,
    // marginRight: 16,
  },
  cardHeadingStyle: {
    fontSize: 14,
    color: '#707070',
    marginTop: 6,
    fontFamily: GEGBodyCopyHighlight,
  },
  cardStyle: {
    fontSize: 12,
    color: '#33C037',
    marginStart: 6,
    // fontWeight: '700',
  },
  invalidPassword: {
    fontSize: 12,
    color: '#525968',
    marginStart: 6,
    fontFamily: GEGBodyCopyHighlight,
  },

  loginOptions: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#9c9a9a',
  },
  loginOptionsTextStyle: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
  },
  appButtonContainer: {
    elevation: 8,
    // marginTop: 5,
    // marginStart: 20,
    // marginEnd: 20,
    borderRadius: 30,
    marginBottom:10,
    paddingVertical: 15,
    paddingHorizontal: 12,
    backgroundColor: '#810055',
  },
  appButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  dotImage: {
    width: 16,
    height: 16,
  },
  passwordHint: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
    fontFamily: GEGBodyCopyHighlight,
  },
});
