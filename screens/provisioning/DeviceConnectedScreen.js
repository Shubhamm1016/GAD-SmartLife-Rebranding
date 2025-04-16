import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GEGBodyCopyHighlight, GEGBold} from '../../comman-compnent/FontFamily';

// import { AntDesign } from "@expo/vector-icons";

function DeviceConnectedScreen(props) {
  const {navigation} = props;

  const {selectedId} = props.route.params;
  const AC = 'AC';
  const WM = 'WM';
  const getImageSource = () => {
    switch (selectedId) {
      case AC:
        return require('../../assets/acimg.png');
      case WM:
        return require('../../assets/WMQRImage.png');

      default:
        return require('../../assets/RefImage/RefQRScaner.png');
    }
  };
  useEffect(() => {
    const redirectToAnotherScreen = async () => {
      // Wait for 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to another screen
      navigation.navigate('Home'); // Replace 'AnotherScreen' with the name of your target screen
    };

    redirectToAnotherScreen();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.layoutTop}>
        <AntDesign
          onPress={() => navigation.goBack()}
          name="arrowleft"
          size={20}
          color="black"
        />

        <View style={styles.textLayout}>
          <Text style={styles.textStyle}>Device connection</Text>
        </View>
      </View>

      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
        {/* <Image
          source={require("../../assets/acimg.png")}
          style={{ width: 250, height: 70 }}
        /> */}
        <Image source={getImageSource()} style={{width: 250, height: 70}} />

        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 120,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={'#810055'} />
        </View>

        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 28,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign name="checkcircle" size={38} color="#810055" />
        </View>

        <Text style={{fontFamily: GEGBold, fontSize: 18, marginTop: 32}}>
          Congratulations!
        </Text>
        <Text
          style={{
            marginTop: 6,
            fontSize: 16,
            textAlign: 'center',
            fontFamily: GEGBodyCopyHighlight,
          }}>
          Your device has been set up {'\n'}on the Godrej Smart life app.
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default DeviceConnectedScreen;

const styles = StyleSheet.create({
  textLayout: {
    flex: 1,
    marginStart: 10,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  layoutTop: {
    flexDirection: 'row',
    marginStart: 12,
    marginEnd: 12,
    marginTop: 12,
  },
});
