import React from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, Dimensions} from 'react-native';
import Lottie from 'lottie-react-native';

function SplashScreennnn({navigation}) {
  function pressHandler() {
    // navigation.navigate("Login");
    navigation.navigate('OnBoarding');
  }
  const size = Dimensions.get('window').width * 0.5;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/loginbackgroundimg.png')}
        resizeMode="cover"
        style={styles.image}>
        {/* <Image
          source={require('../../assets/godrejlogos.png')}
          style={styles.logo}
        /> */}

        {/* <Text style={styles.text} onPress={pressHandler}>
          Smartlife
        </Text> */}
        {/* <View> */}
          <Lottie
            source={require('../../assets/animation/applianceloadingsync.json')}
            loop={true}
            autoPlay={true}
            style={{width:size,height: size}}
            // resizeMode="center"
            // progress={animationProgress.current}
          />
        {/* </View> */}
      </ImageBackground>
      <Text>bbb</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  logo: {
    alignSelf: 'center',
    width: 164,
    height: 30,
    marginBottom: 40,
  },
});

export default SplashScreennnn;
