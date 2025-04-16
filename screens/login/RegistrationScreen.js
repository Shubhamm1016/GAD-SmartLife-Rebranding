import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Pressable,
} from 'react-native';
import Logo from '../../components/Logo';
import SmartLogo from '../../components/SmartLogo';
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';
import {userCreates} from '../../Context/API';
import Entypo from 'react-native-vector-icons/Entypo';
import {TeamsAndConditionsUrl, PolicyUrl} from '@env';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

console.log(TeamsAndConditionsUrl, 'TeamsAndConditionsUrl');
function RegistrationScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureConfermEntry, setSecureConfermEntry] = useState(true);
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const PASSWORD_REGEX =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  const [checked, setChecked] = useState(false);
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const toggleConfermEntry = () => {
    setSecureConfermEntry(!secureConfermEntry);
  };
  const pressHandler = async () => {
    console.log(email, 'email');
    // return
    if (email == '') {
      alert('Please Provide Vaild Email');
      return;
    }
    if (!email || EMAIL_REGEX.test(email) == false) {
      alert('Invalid Email Id!');
      return;
    }
    if (password == '') {
      alert('Please Provide Vaild Password');
      return;
    }
    if (!password || PASSWORD_REGEX.test(password) == false) {
      alert('Invalid Password Correct, Try Another...');
      return;
    }
    console.log('hello');
    if (confirmpassword == '') {
      alert('Confirm Password Cannot be empty');
      return;
    }
    if (!confirmpassword || PASSWORD_REGEX.test(confirmpassword) == false) {
      alert('Invalid Password Correct, Try Another...');
      return;
    }
    if (password != confirmpassword) {
      console.log('Password Not Matched');
      alert('Password Not Matched');
      return;
    }
    try {
      let response = await userCreates(email, password);
      console.log(response.data, 'response');
      if (response.status == 201) {
        navigation.navigate('RegistrationOTP', {email: email});
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
    // Toggle the state of checked
    setChecked(!checked);
  };
  const isPasswordValid = {
    minLength: password.length >= 8,
    hasCapitalLetter: /[A-Z]/.test(password),
    hasAlphaNumeric: /\d/.test(password) && /[a-zA-Z]/.test(password),
    hasSpecialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  return (
    <View style={styles.main}>
      <ImageBackground
        source={require('../../assets/loginback.png')}
        style={styles.background}>
        <Logo />
        <SmartLogo />
      </ImageBackground>
      <ScrollView>
        <View style={styles.mainCardView}>
          {/* <Text style={styles.textStyle}>Create an account</Text> */}
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={value => setEmail(value.trim().toLowerCase())}
              placeholder="Email ID"
              placeholderTextColor="#9c9a9a"
              keyboardType="email-address"
              maxLength={30}
            />
            <View
              style={{
                flexDirection: 'row', // Align children horizontally
                alignItems: 'center', // Center vertically
                marginTop: 18,
                marginHorizontal: 20,
                backgroundColor: '#fff',
                paddingVertical: 10,
                padding: 10,
                paddingHorizontal: 12,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: '#9c9a9a',
                height: 45,
              }}>
              <TextInput
                style={{
                  flex: 1, // Takes remaining space in the container
                  height: 45,
                  color: '#000',
                }}
                secureTextEntry={secureTextEntry}
                onChangeText={value => setPassword(value.trim())}
                placeholder="Password"
                maxLength={15}
                placeholderTextColor="#9c9a9a"
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
            <View
              style={{
                flexDirection: 'row', // Align children horizontally
                alignItems: 'center', // Center vertically
                marginTop: 18,
                marginHorizontal: 20,
                backgroundColor: '#fff',
                paddingVertical: 10,
                padding: 10,
                paddingHorizontal: 12,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: '#9c9a9a',
                height: 45,
              }}>
              <TextInput
                style={{
                  flex: 1, // Takes remaining space in the container
                  height: 45,
                  color: '#000',
                }}
                secureTextEntry={secureConfermEntry}
                onChangeText={value => setConfirmPassword(value.trim())}
                placeholder="Confirm Password"
                placeholderTextColor="#9c9a9a"
                maxLength={15}
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
                  color="#9c9a9a"
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          <View style={styles.passwordCard}>
            <Text style={styles.cardHeadingStyle}>
              Your password should contain
            </Text>

            <View style={styles.passwordHint}>
              <Image
                source={require('../../assets/dotimg.png')}
                style={styles.dotImage}
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
              <Image
                source={require('../../assets/dotimg.png')}
                style={styles.dotImage}
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
              <Image
                source={require('../../assets/dotimg.png')}
                style={styles.dotImage}
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
              <Image
                source={require('../../assets/dotimg.png')}
                style={styles.dotImage}
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
          <TouchableOpacity onPress={pressHandler}>
            <LinearGradient
              colors={['#64bbf5', '#0c98f5']}
              style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.dontView}>
            <Text style={styles.newStyle}>Already have an account ? </Text>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => navigation.replace('Login')}>
              <Text
                style={{
                  color: '#4BB6E8',
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: '600',
                }}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>

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
                  size={24}
                  color="#000"
                />
              </Pressable> */}
              <Text style={styles.policy}>
                By continuing you are agreeing to
              </Text>
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
              <TouchableOpacity
                style={{right: 15}}
                onPress={async () => {
                  try {
                    const supported = await Linking.canOpenURL(PolicyUrl);
                    if (supported) {
                      Linking.openURL(
                        'https://privacypolicygodrejsmartapp.godrejenterprises.com',
                      );
                    } else {
                      console.error("Can't open URL: " + PolicyUrl);
                    }
                  } catch (error) {
                    console.error('Error opening URL', error);
                  }
                }}>
                <Text style={styles.terms}>Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default RegistrationScreen;

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
    height: '80%',
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
    marginTop: 130,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  passwordCard: {
    height: 150,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'column',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 12,
    marginBottom: 6,
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
  dontView: {
    marginTop: 10,
    marginBottom: 25,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  newStyle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
  },
  policy: {
    fontSize: 14,
    // marginTop: 28,
    color: 'black',
    textAlign: 'center',
    // marginStart: 22,
  },
  terms: {
    fontSize: 14,
    color: '#20a0f5',
    textAlign: 'center',
    marginStart: 22,
    marginTop: 4,
    fontWeight: '500',
  },
  viewStyle: {
    // flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 25,
    alignItems: 'center',
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
  cardStyle: {
    fontSize: 14,
    color: '#008000',
    marginStart: 6,
    fontWeight: '800',
  },
  invalidPassword: {
    fontSize: 14,
    color: '#9c9a9a',
    marginStart: 6,
    fontWeight: '300',
  },
  cardHeadingStyle: {
    fontSize: 14,
    color: '#9c9a9a',
    marginTop: 6,
    marginTop: 10,
  },
  appButtonContainer: {
    elevation: 8,
    marginTop: 20,
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
  dotImage: {
    width: 6,
    height: 6,
  },
  passwordHint: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
    marginTop: 10,
  },
});
