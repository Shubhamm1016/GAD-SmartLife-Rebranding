import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import {Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import NotificationModuleWrapper from '../../components/NotificationInterfaceModule/NotificationModuleWrapper';
import { mobileEndPoint } from '../../Context/API';

const LoginWithGoogle = () => {
  const onGoogleButtonPress = async () => {
    try {
      // Configure Google Sign-In
      await GoogleSignin.configure({
        iosClientId: '737248352915-76o4u8jhtj7br35faggfodog1uf95b01.apps.googleusercontent.com',
      });

      // Clear existing sign-in state
      await GoogleSignin.signOut();

      // Get the user's ID token
      const { idToken } = await GoogleSignin.signIn();
      console.log('ID Token:', idToken);
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
      try {
        console.log('before fetching');
        let deviceToken = await NotificationModuleWrapper.getDeviceToken();
        console.log(deviceToken,"deviceTokendeviceToken.......................");
        callMobileEndPoint(deviceToken);
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Sign-in cancelled by user');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.error('Error configuring Google Sign-In:', error.message);
      }
    }
  };


  // const callMobileEndPoint = async deviceToken => {
  //   const platform = Platform.OS === "APNS" // For iOS, APNS, for Android, GCM
  //   console.log('Platform:', platform);
  //   console.log('Device Token:', deviceToken);

  //   const token = await AsyncStorage.getItem('AccessToken');
  //   console.log('AccessToken:', token);

  //   try {
  //     // Call the API to register the device endpoint
  //     const response = await mobileEndPoint(
  //       "APNS",
  //       token,
  //       deviceToken
  //     );

  //     console.log('API response in Login:', response.data);
  //     console.log('Response status:', response.status);
  //     console.log('Full response:', response);

  //     // Check if the response contains platform endpoint details
  //     if (
  //       response.data &&
  //       response.data.platform_endpoints &&
  //       response.data.platform_endpoints.length > 0
  //     ) {
  //       const platformData = response.data.platform_endpoints[0];
  //       const platformApplicationArn = platformData.platform_application_arn;
  //       const platformEndpointArn = platformData.platform_endpoint_arn;

  //       // Save Platform ARN details in AsyncStorage
  //       await AsyncStorage.setItem(
  //         'PlatformApplicationArn',
  //         platformApplicationArn,
  //       );
  //       await AsyncStorage.setItem('PlatformEndpointArn', platformEndpointArn);

  //       console.log('Platform Application ARN stored:', platformApplicationArn);
  //       console.log('Platform Endpoint ARN stored:', platformEndpointArn);

  //       // Now, store the device token in AsyncStorage
  //       await AsyncStorage.setItem('deviceToken', deviceToken);
  //       console.log('Device Token stored in AsyncStorage:', deviceToken);
  //     } else {
  //       console.log('No platform endpoint data found in the response.');
  //     }
  //   } catch (error) {
  //     console.error('Error calling mobileEndPoint:', error.message);
  //   }
  // };

  const callMobileEndPoint = async (deviceToken) => {
    const platform = Platform.OS === "APNS"; // Ensure platform type is set correctly
    console.log('Platform:', platform);
    console.log('Device Token:', deviceToken);
  
    const token = await AsyncStorage.getItem('AccessToken');
    console.log('AccessToken:', token);
  
    try {
      const response = await mobileEndPoint(
        "APNS",
        token,
        deviceToken
      );
  
      console.log('API response in Login:', response.data);
      console.log('Response status:', response.status);
      console.log('Full response:', response);

      if (response.data && response.data.platform_endpoint_arn) {
        const platformEndpointArn = response.data.platform_endpoint_arn;
        await AsyncStorage.setItem('PlatformEndpointArn', platformEndpointArn);
        console.log('Platform Endpoint ARN stored:', platformEndpointArn);
        await AsyncStorage.setItem('deviceToken', deviceToken);
        console.log('Device Token stored in AsyncStorage:', deviceToken);
      } else {
        console.log('No platform endpoint ARN found in the response.');
      }
    } catch (error) {
      console.error('Error calling mobileEndPoint:', error.message);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.loginOptions}>
        <TouchableOpacity style={styles.layout} onPress={onGoogleButtonPress}>
          <Text style={styles.loginOptionsTextStyle}>Continue with</Text>
          <Image
            source={require('../../assets/google.png')}
            style={styles.googlelogo}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};


export default LoginWithGoogle;

const styles = StyleSheet.create({
  loginOptions: {
    height: 45,
    marginTop: 10,
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 28,
    borderColor: '#9c9a9a',
  },
  layout: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loginOptionsTextStyle: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  googlelogo: {
    width: 24,
    height: 24,
    marginLeft: 6,
    marginTop: 10,
  },
});
