import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
  Pressable,
  Alert,
  Platform,
  StatusBar,
  StatusBarStyle,
  Dimensions,
  Button,
  NativeModules,
} from 'react-native';

import Logo from '../../components/Logo';
import SmartLogo from '../../components/SmartLogo';
import LinearGradient from 'react-native-linear-gradient';
import {useContext, useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  LoginGoogle,
  mobileEndPoint,
  setUser_name,
  userLogin,
} from '../../Context/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../../Context/UserContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TeamsAndConditionsUrl,
  LoginWithGoogle,
  PolicyUrl,
  LoginWithApple,
} from '@env';
import SafariWebAuth from 'react-native-safari-web-auth';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {v4 as uuid} from 'uuid';
import appleAuth, {
  AppleButton,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import NotificationModuleWrapper from '../../components/NotificationInterfaceModule/NotificationModuleWrapper';
import GodrejHeader from '../../comman-compnent/GodrejHeader';
import {
  GEGBodyCopy,
  GEGBodyCopyHighlight,
  GEGBold,
  GEGHeadline,
  GEGLight,
  GEGLightItalic,
} from '../../comman-compnent/FontFamily';

function LoginScreen(props) {
  const {navigation} = props;
  console.log(SafariWebAuth, 'SafariWebAuth');
  const {fetchAll, userData} = useContext(UserContext);
  // console.log(navigation, 'login');
  const [email, setEmail] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [checked, setChecked] = useState(false);
  const [deviceToken, setDeviceToken] = useState(null);

  console.log(deviceToken, 'bbbbbbbbbbbb');
  console.log(checked, 'checked');

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  let emails;
  const isnum = /^\d+$/.test(email.trim());
  if (isnum) {
    // emails = removeCountryCode('+91' + email.trim());
    emails = '+91' + email.trim();
  } else {
    emails = email.trim().toLowerCase();
  }
  const [password, setPassword] = useState('');
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const MOBILE_REGEX = /^\+91[0-9]{10}$/;
  const PASSWORD_REGEX =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

  function pressHandler() {
    navigation.navigate('SignUp');
  }
  function pressForgotHandler() {
    navigation.navigate('ForgotPassword');
  }
  const pressBottomHandler = async () => {
    console.log(emails, 'emails');
    // return
    if (
      emails === '' ||
      (!EMAIL_REGEX.test(emails) && !MOBILE_REGEX.test(emails))
    ) {
      alert(
        EMAIL_REGEX.test(emails)
          ? 'Please Provide vaild email'
          : 'Please Provide vaild Phone',
      );
      return;
    }
    console.log(emails, 'emails');
    const trimmedPassword = password.trim();
    if (trimmedPassword == '') {
      alert('Please Provide vaild Passsword');
      return;
    }
    // if (checked == false) {
    //   alert('Please accept terms & Policy to Proceed');
    //   return;
    // }
    if (!trimmedPassword || PASSWORD_REGEX.test(trimmedPassword) == false) {
      alert('Invalid password Correct, try another...');
      return;
    }

    try {
      let response = await userLogin(emails, trimmedPassword);

      if (response.status == 200) {
        let tokenid = response.data.idtoken;
        let accesstoken = response.data.accesstoken;
        let refreshtoken = response.data.refreshtoken;

        await AsyncStorage.setItem('AccessToken', accesstoken);
        await AsyncStorage.setItem('TokenId', tokenid);

        await AsyncStorage.setItem('refreshtoken', refreshtoken);
        await AsyncStorage.setItem('email', emails);
        props.setIsLoggedIn(true);
        fetchAll();
        userData();
        try {
          let deviceToken = await NotificationInterface.getDeviceToken();
          console.log(deviceToken);
        } catch (err) {
          console.log(err);
        }

        // registerForPushNotifications();
        try {
          let deviceToken = await NotificationModuleWrapper.getDeviceToken();

          callMobileEndPoint(deviceToken);
          handleNotification();
        } catch (err) {
          console.log(err);
        }
        navigation.navigate('bottomTab');
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
  function pressHandlerNumber() {
    navigation.navigate('MobileNumberLogin');
  }

  const requestPermissions = async () => {
    try {
      const permissions = await PushNotificationIOS.requestPermissions();
      if (permissions.alert || permissions.sound || permissions.badge) {
        console.log('Permission granted');
      } else {
        console.log('Permission denied');
      }
    } catch (error) {
      console.error('Error requesting permissions:', error.message);
    }
  };

  const callMobileEndPoint = async deviceToken => {
    const platform = Platform.OS === 'APNS'; // Ensure platform type is set correctly

    const token = await AsyncStorage.getItem('AccessToken');

    try {
      // Call the API to register the device endpoint
      const response = await mobileEndPoint('APNS', token, deviceToken);

      console.log('API response in Login:', response.data);
      console.log('Response status:', response.status);
      console.log('Full response:', response);

      // Check if the response contains platform endpoint ARN directly
      if (response.data && response.data.platform_endpoint_arn) {
        const platformEndpointArn = response.data.platform_endpoint_arn;

        // Save Platform ARN details in AsyncStorage
        await AsyncStorage.setItem('PlatformEndpointArn', platformEndpointArn);
        console.log('Platform Endpoint ARN stored:', platformEndpointArn);

        // Now, store the device token in AsyncStorage
        await AsyncStorage.setItem('deviceToken', deviceToken);
        console.log('Device Token stored in AsyncStorage:', deviceToken);
      } else {
        console.log('No platform endpoint ARN found in the response.');
      }
    } catch (error) {
      console.error('Error calling mobileEndPoint:', error.message);
    }
  };
  useEffect(() => {
    const initializePushNotifications = async () => {
      try {
        await requestPermissions(); // Request permissions
        // await registerForPushNotifications(); // Register for push notifications
      } catch (error) {
        console.error('Error during notification setup:', error.message);
      }
    };

    initializePushNotifications();

    return () => {
      PushNotificationIOS.removeEventListener('register');
      PushNotificationIOS.removeEventListener('registrationError');
      PushNotificationIOS.removeEventListener(
        'notification',
        // handleNotification,
      );
    };
  }, []);

  const openLink = async url => {
    try {
      if (await InAppBrowser.isAvailable()) {
        const response = await InAppBrowser.openAuth(url, null, {
          ephemeralWebSession: false,
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        });
        console.log(response, 'response');

        if (response && response.type === 'success' && response.url) {
          // let url = response.url;

          let data = response.url.replace(
            'com.godrej.boyce://success?code=',
            '',
          );
          console.log(data, 'datadatadatadata');

          let verificationcode = data.replace('#', '');
          console.log(verificationcode, 'verificationcodeverificationcode');

          try {
            let response = await LoginGoogle(verificationcode);

            await AsyncStorage.setItem(
              'AccessToken',
              response.data.access_token,
            );
            await AsyncStorage.setItem('TokenId', response.data.id_token);
            await AsyncStorage.setItem(
              'refreshtoken',
              response.data.refresh_token,
            );
            // return
            try {
              let token = await AsyncStorage.getItem('AccessToken');
              let response = await setUser_name(token);

              await AsyncStorage.setItem('email', response.data.user_name);

              props.setIsLoggedIn(true);
              fetchAll();
              userData();
            } catch (err) {
              console.log(err);
            }
          } catch (err) {
            {
              console.error(err.response, 'Error occurred');
            }
          }
        }
      } else {
        console.log('InAppBrowser not available');
        // Handle the case when InAppBrowser is not available
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        } else if (error.response.data.description) {
          alert(error.response.data.description);
        }
      } else {
        console.error(error, 'Error occurred');
      }
    }
  };

  async function onAppleButtonPressAndroid() {
    try {
      const rawNonce = uuid();
      const state = uuid();
      appleAuthAndroid.configure({
        clientId: 'com.godrej.boyce.applelogin',
        redirectUri: 'com.godrej.boyce.app://success',
        responseType: appleAuthAndroid.ResponseType.ALL,
        nonce: rawNonce,
        state,
      });
      const response = await appleAuthAndroid.signIn();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.main}>
      <GodrejHeader />
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text
            style={{fontSize: 22, color: '#810055', fontFamily: GEGHeadline}}>
            Smart
          </Text>
          <Text
            style={{fontSize: 22, color: '#810055', fontFamily: GEGHeadline}}>
            Life
          </Text>
        </View>
        <View style={styles.mainCardView}>
          <Text style={styles.textStyle}>Login</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              placeholder="Email or Mobile Number"
              placeholderTextColor="#707070"
              onChangeText={value => setEmail(value)}
              // keyboardType=''
              maxLength={30}
            />

            <View
              style={{
                flexDirection: 'row', // Align children horizontally
                alignItems: 'center', // Center vertically
                marginTop: 18,
                // marginHorizontal: 20,
                backgroundColor: '#fff',
                paddingVertical: 10,
                padding: 10,
                // paddingHorizontal: 12,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#F1F1ED',
                height: 45,
              }}>
              <TextInput
                style={{
                  flex: 1, // Takes remaining space in the container
                  height: 45,
                  color: '#000',
                }}
                placeholder="Password"
                placeholderTextColor="#707070"
                maxLength={15}
                secureTextEntry={secureTextEntry}
                onChangeText={value => setPassword(value)}
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
                  color="#9c9a9a"
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          <Text style={styles.forgotStyle} onPress={pressForgotHandler}>
            Forgot Password ?
          </Text>
          <TouchableOpacity
            disabled={email && password ? false : true}
            onPress={pressBottomHandler}>
            <LinearGradient
              colors={
                email && password
                  ? ['#810055', '#810055']
                  : ['#D9D9D9', '#CECECE']
              }
              style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.viewStyle}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 28,
              }}>
              {/* <Pressable onPress={handleCheckboxPress}>
                <MaterialCommunityIcons
                  name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
                  size={22}
                  color={checked ? '#8BBD54' : '#9c9a9a'}
                />
              </Pressable> */}
              <Text style={styles.policy}>Continuing you are agreeing to</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    'https://privacypolicygodrejsmartlife.s3.ap-south-1.amazonaws.com/Updated_Godrej_Smartlife_Legal_Disclaimer+.pdf',
                  );
                }}>
                <Text style={styles.terms}>Teams & Conditions |</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={{right: 15}}
                onPress={() => {
                  Linking.openURL("https://privacypolicygodrejsmartlife.s3.ap-south-1.amazonaws.com/Updated_Godrej_Smartlife_Legal_Disclaimer+.pdf");
                }}>
                <Text style={styles.terms}>Policy</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={{right: 15}}
                onPress={async () => {
                  // try {
                  //   const supported = await Linking.canOpenURL(PolicyUrl);
                  //   if (supported) {
                  Linking.openURL(
                    'https://privacypolicygodrejsmartlife.s3.ap-south-1.amazonaws.com/Updated_Godrej_smartlife_privacy_policy.pdf',
                  );
                  //   } else {
                  //     console.error("Can't open URL: " + PolicyUrl);
                  //   }
                  // } catch (error) {
                  //   console.error('Error opening URL', error);
                  // }
                }}>
                <Text style={styles.terms}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <Text style={styles.newStyle}>For new users</Text> */}
          <View>
            <Text
              style={{
                textAlign: 'center',
                color: '#707070',
                fontFamily: GEGBodyCopy,
              }}>
              OR
            </Text>
            {/* <View
              style={{
                // position: 'absolute',
                top: '40%',
                width: 330,
                height: 2,
                alignItems:"center",
                alignContent:"center",
                backgroundColor: '#F1F1ED',
                left: 0,
              }}
            /> */}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {Platform.OS === 'ios' ? (
              <TouchableOpacity style={styles.appleLoginOptions}>
                <TouchableOpacity
                  style={styles.layout}
                  onPress={() => {
                    openLink(LoginWithApple);
                  }}>
                  <Text style={styles.appleLoginOptionsTextStyle}>
                    Continue with
                  </Text>
                  <Image
                    source={require('../../assets/apple.png')}
                    style={{
                      height: 25,
                      width: 40,
                      resizeMode: 'contain',
                      right: 5,
                      marginTop: 10,
                    }}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ) : (
              // <AppleButton
              //   buttonStyle={AppleButton.Style.BLACK}
              //   buttonType={AppleButton.Type.SIGN_IN}
              //   style={{
              //     width: '100%',
              //     height: 44,
              //     borderRadius: 50,
              //     marginVertical: 10,
              //   }}
              //   onPress={onAppleButtonPress}
              // />
              <AppleButton
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.SIGN_IN}
                style={{
                  width: 100,
                  height: 44,
                }}
                onPress={onAppleButtonPressAndroid}
              />
            )}
            <TouchableOpacity style={styles.appleLoginOptions}>
              <TouchableOpacity
                style={styles.layout}
                onPress={() => {
                  openLink(LoginWithGoogle);
                }}>
                <Text style={styles.appleLoginOptionsTextStyle}>
                  Continue with
                </Text>
                <Image
                  source={require('../../assets/google.png')}
                  style={styles.googlelogo}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          {/* <LoginWithGoogle/> */}
          {/* <TouchableOpacity style={styles.loginOptions} onPress={pressHandler}>
            <Text style={styles.loginOptionsTextStyle}>
              Register with Godrej
            </Text>
          </TouchableOpacity> */}
        </View>

        <TouchableOpacity
          style={styles.loginOptions}
          onPress={pressHandlerNumber}>
          <Text style={[styles.loginOptionsTextStyle, {textAlign: 'center'}]}>
            Not a member?
            <Text style={{color: '#810055', fontFamily: GEGHeadline}}>
              {' '}
              Register Now
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F1F1ED',
  },
  background: {
    height: '12%',
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 10,
  },
  layout: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  googlelogo: {
    height: 25,
    width: 40,
    resizeMode: 'contain',
    right: 5,
    marginTop: 10,
  },
  mainCardView: {
    height: 460,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'column',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 30,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  textStyle: {
    fontSize: 18,
    color: '#000',
    fontFamily: GEGHeadline,
    textAlign: 'center',
    color: '#333333',
    marginTop: 20,
    width: '100%',
  },
  forgotStyle: {
    fontSize: 14,
    color: '#707070',
    fontFamily: GEGBodyCopy,
    // marginStart: 22,
    marginTop: 10,
    width: '100%',
    // fontWeight: '500',
  },
  newStyle: {
    fontSize: 14,
    marginTop: 28,
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
    // marginStart: 22,
  },
  policy: {
    fontSize: 14,
    // marginTop: 28,
    color: '#525968',
    textAlign: 'center',
    fontFamily: GEGBodyCopy,
    // marginStart: 22,
  },
  terms: {
    fontSize: 14,
    color: '#810055',
    textAlign: 'center',
    marginStart: 22,
    marginTop: 4,
    marginBottom: 20,
    fontFamily: GEGHeadline,
  },
  viewStyle: {
    justifyContent: 'flex-end',
    marginBottom: 5,
    alignItems: 'center',
  },
  input: {
    height: 50,
    marginTop: 18,
    // marginStart: 20,
    // marginEnd: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#F1F1ED',
  },
  appleLoginOptions: {
    height: 45,
    marginTop: 15,
    // marginStart: 20,
    // marginEnd: 20,
    backgroundColor: '#F1F1ED',
    // borderWidth: 1,
    borderRadius: 28,
    // borderColor: '#9c9a9a',
  },
  loginOptions: {
    marginVertical: 15,
    backgroundColor: '#F1F1ED',
    borderRadius: 28,
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    paddingHorizontal: 10,
  },
  appleLoginOptionsTextStyle: {
    fontSize: 14,
    color: '#525968',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: 120,
    fontFamily: GEGBodyCopy,
  },
  loginOptionsTextStyle: {
    fontSize: 14,
    color: '#525968',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 0, // Remove marginTop for better alignment
    flexWrap: 'nowrap', // Prevent text wrapping
  },
  appButtonContainer: {
    elevation: 8,
    marginTop: 20,
    // marginEnd: 25,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  appButtonText: {
    fontSize: 16,
    color: '#fff',
    // fontWeight: 'bold',
    fontFamily: GEGBold,
    alignSelf: 'center',
  },
});
