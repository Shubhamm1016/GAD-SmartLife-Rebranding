// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   ImageBackground,
//   Pressable,
// } from 'react-native';

// import LinearGradient from 'react-native-linear-gradient';
// import ForgotBackground from '../../components/ForgotBackground';
// import Logo from '../../components/Logo';
// import SmartLogo from '../../components/SmartLogo';
// import {useState} from 'react';
// import {userforgot} from '../../Context/API';
// // import {Console, timeLog} from 'console';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Header from '../../comman-compnent/Header';
// import GodrejHeader from '../../comman-compnent/GodrejHeader';
// import {
//   GEGBodyCopy,
//   GEGBold,
//   GEGHeadline,
// } from '../../comman-compnent/FontFamily';

// const ForgotPasswordScreen = ({navigation}) => {
//   const [email, setEmail] = useState('');

//   const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
//   const MOBILE_REGEX = /^\+91[0-9]{10}$/;

//   let emails;

//   const isnum = /^\d+$/.test(email.trim());
//   if (isnum) {
//     emails = '+91' + email.trim();
//   } else {
//     emails = email.trim().toLowerCase();
//   }
//   const pressHandler = async () => {
//     if (emails === '') {
//       alert('Please Provide Valid Email & Phone Number!');
//       return;
//     }

//     // if (!email || EMAIL_REGEX.test(email) == false) {
//     //   alert('Invalid email Id!');
//     //   return;
//     // }
//     if (
//       emails === '' ||
//       (!EMAIL_REGEX.test(emails) && !MOBILE_REGEX.test(emails))
//     ) {
//       alert('Please Provide vaild email');
//       return;
//     }
//     console.log(emails, 'emails');
//     // return
//     try {
//       let response = await userforgot(emails);
//       console.log(response.data, 'response');
//       // return
//       if (response.status == 200) {
//         // console.log("byyy");
//         navigation.navigate('ResetPassword', {email: email});
//       }
//     } catch (err) {
//       console.log(
//         err.response.data.description,
//         'err.response.data.description',
//       );
//       alert(err.response.data.description, 'error');
//     }
//   };
//   return (
//     <View style={styles.main}>
//       {/* <View style={{flex: 1}}>
//         <Header
//           title="Forget Password"
//           onBackPress={() => navigation.goBack()} // Set your back action here
//         />
//       </View> */}
//       <GodrejHeader />
//       <View style={styles.background}>
//         <Text style={{fontSize: 28, color: '#810055', fontFamily: GEGHeadline}}>
//           Smart
//         </Text>
//         <Text style={{fontSize: 28, color: '#810055', fontFamily: GEGHeadline}}>
//           Life
//         </Text>
//       </View>
//       <View style={styles.mainCardView}>
//         <Text style={styles.textStyle}>Reset Password</Text>
//         <Text style={styles.terms}>
//           Please enter your registered email or mobile number to reset password
//         </Text>
//         <SafeAreaView>
//           <TextInput
//             style={styles.input}
//             placeholder="Email or Mobile Number"
//             placeholderTextColor="#333333"
//             maxLength={30}
//             onChangeText={value => {
//               setEmail(value);
//             }}
//           />
//         </SafeAreaView>
//         <TouchableOpacity onPress={pressHandler}>
//           <LinearGradient
//             colors={['#810055', '#810055']}
//             style={styles.appButtonContainer}>
//             <Text style={styles.appButtonText}>Get OTP</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ForgotPasswordScreen;

// const styles = StyleSheet.create({
//   main: {
//     flex: 1,
//     backgroundColor: '#F1F1ED',
//   },
//   background: {
//     flex: 1,
//     top: 20,
//     alignItems: 'center',
//   },
//   mainCardView: {
//     height: '66%',
//     backgroundColor: 'white',
//     borderRadius: 25,
//     shadowColor: 'gray',
//     shadowOffset: {width: 0, height: 0},
//     shadowOpacity: 1,
//     shadowRadius: 8,
//     elevation: 8,
//     flexDirection: 'column',
//     paddingLeft: 16,
//     paddingRight: 14,
//     marginBottom: 80,
//     marginLeft: 16,
//     marginRight: 16,
//   },
//   textStyle: {
//     // fontWeight: 'bold',
//     fontSize: 18,
//     color: '#333333',
//     // marginStart: 20,
//     textAlign: 'center',
//     marginTop: 20,
//     width: '100%',
//     fontFamily: GEGHeadline,
//   },
//   terms: {
//     fontSize: 14,
//     color: '#333333',
//     // marginStart: 20,
//     marginTop: 25,
//     fontFamily: GEGBodyCopy,
//   },
//   input: {
//     height: 55,
//     marginTop: 18,
//     // marginStart: 20,
//     // marginEnd: 20,
//     backgroundColor: 'white',
//     padding: 10,
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: '#F1F1ED',
//   },
//   appButtonContainer: {
//     elevation: 8,
//     marginTop: 32,
//     // marginStart: 20,
//     // marginEnd: 20,
//     borderRadius: 30,
//     paddingVertical: 20,
//     paddingHorizontal: 12,
//   },
//   appButtonText: {
//     fontSize: 16,
//     color: '#fff',
//     fontFamily: GEGBold,
//     alignSelf: 'center',
//   },
// });

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Pressable,
} from 'react-native';
 
import LinearGradient from 'react-native-linear-gradient';
import ForgotBackground from '../../components/ForgotBackground';
import Logo from '../../components/Logo';
import SmartLogo from '../../components/SmartLogo';
import {useState} from 'react';
import {userforgot} from '../../Context/API';
// import {Console, timeLog} from 'console';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../comman-compnent/Header';
import GodrejHeader from '../../comman-compnent/GodrejHeader';
import {
  GEGBodyCopy,
  GEGBold,
  GEGHeadline,
} from '../../comman-compnent/FontFamily';
 
const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
 
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const MOBILE_REGEX = /^\+91[0-9]{10}$/;
 
  let emails;
 
  const isnum = /^\d+$/.test(email.trim());
  if (isnum) {
    emails = '+91' + email.trim();
  } else {
    emails = email.trim().toLowerCase();
  }
  const pressHandler = async () => {
    if (emails === '') {
      alert('Please Provide Valid Email & Phone Number!');
      return;
    }
 
    // if (!email || EMAIL_REGEX.test(email) == false) {
    //   alert('Invalid email Id!');
    //   return;
    // }
    if (
      emails === '' ||
      (!EMAIL_REGEX.test(emails) && !MOBILE_REGEX.test(emails))
    ) {
      alert('Please Provide vaild email');
      return;
    }
    console.log(emails, 'emails');
    // return
    try {
      let response = await userforgot(emails);
      console.log(response.data, 'response');
      // return
      if (response.status == 200) {
        // console.log("byyy");
        navigation.navigate('ResetPassword', {email: email});
      }
    } catch (err) {
      console.log(
        err.response.data.description,
        'err.response.data.description',
      );
      alert(err.response.data.description, 'error');
    }
  };
  return (
    <View style={styles.main}>
      {/* <View style={{flex: 1}}>
        <Header
          title="Forget Password"
          onBackPress={() => navigation.goBack()} // Set your back action here
        />
      </View> */}
      <GodrejHeader />
      <View style={styles.background}>
        <Text style={{fontSize: 28, color: '#810055', fontFamily: GEGHeadline}}>
          Smart
        </Text>
        <Text style={{fontSize: 28, color: '#810055', fontFamily: GEGHeadline}}>
          Life
        </Text>
      </View>
      <View style={styles.mainCardView}>
        <Text style={styles.textStyle}>Reset Password</Text>
        <Text style={styles.terms}>
          Please enter your registered email or mobile number to reset password
        </Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            placeholder="Email or Mobile Number"
            placeholderTextColor="#333333"
            maxLength={30}
            onChangeText={value => {
              setEmail(value);
            }}
          />
        </SafeAreaView>
        <TouchableOpacity onPress={pressHandler}>
          <LinearGradient
            colors={['#810055', '#810055']}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Get OTP</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
 
export default ForgotPasswordScreen;
 
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F1F1ED',
  },
  background: {
    flex: 1,
    top: 20,
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
    marginBottom: 50,
    marginLeft: 16,
    marginRight: 16,
  },
  textStyle: {
    // fontWeight: 'bold',
    fontSize: 18,
    color: '#333333',
    // marginStart: 20,
    textAlign: 'center',
    marginTop: 20,
    width: '100%',
    fontFamily: GEGHeadline,
  },
  terms: {
    fontSize: 14,
    color: '#333333',
    // marginStart: 20,
    marginTop: 25,
    fontFamily: GEGBodyCopy,
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
    color: '#fff',
    fontFamily: GEGBold,
    alignSelf: 'center',
  },
});