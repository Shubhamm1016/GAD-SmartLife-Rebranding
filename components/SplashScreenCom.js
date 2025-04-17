import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Lottie from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {GEGBodyCopy, GEGBold} from '../comman-compnent/FontFamily';

const SplashScreenCom = ({setHasShownVideo}) => {
  const pkg = require('../package.json');
  const AppVersion = pkg.version;
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      setHasShownVideo(true);
    }, 4000);
  }, []);
  const size = Dimensions.get('window').width * 0.5;
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Image
          source={require('../assets/godrejsplashscreen.png')}
          style={{
            height: 80,
            width: 80,
            resizeMode: 'contain',
            left: 15,
            marginTop: 50,
            padding: 20,
          }}
        />
        <Image
          source={require('../assets/godrejenterpise.png')}
          style={{
            height: 80,
            width: 80,
            resizeMode: 'contain',
            right: 15,
            marginTop: 50,
          }}
        />
      </View>
      <View style={styles.image}>
        {/* <Image
          source={require('../assets/godrejlogos.png')}
          style={styles.logo}
        /> */}

        <Text style={styles.text}>
          Smart{' '}
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 45,
              fontWeight: '300',
              marginBottom: 50,
            }}>
            Life
          </Text>
        </Text>

        {/* <Lottie
          source={require('../assets/animation/applianceloadingsync.json')}
          loop={true}
          autoPlay={true}
          style={{width: size, height: size}}
        /> */}
        <View style={{top: 150}}>
          <Text style={styles.versionText}>Version {AppVersion}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#810055',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 44,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  versionText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontFamily: GEGBold,
    marginTop: 150,
  },
  logo: {
    alignSelf: 'center',
    width: 164,
    height: 30,
    marginBottom: 40,
  },
});

export default SplashScreenCom;
