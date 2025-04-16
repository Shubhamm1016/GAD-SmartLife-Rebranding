import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import { Entypo } from "@expo/vector-icons";
import { Rating } from 'react-native-ratings';
import {GEGBodyCopy} from '../../../comman-compnent/FontFamily';
import InsideHeader from '../../../comman-compnent/InsideHeader';

function Share({navigation}) {
  //const WATER_IMAGE = require('/assets/Ratingstar.png')
  const CopiedAddresh = async () => {
    setString(refcode.toString());
    // setVisible(true);
    // setType('success');
    // setMessage('Copy Your Referral Code By User');
  };

  const handlePress = () => {
    Linking.openURL('https://x.com/godrejentgroup?lang=en&mx=2').catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.layoutTop}>
          <InsideHeader
            title="Share"
            onBackPress={() => navigation.goBack()} // Set your back action here
          />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.menu}>
          <Text style={styles.text}>Share this app via:</Text>

          <View style={styles.optionLayout}>
            <TouchableOpacity onPress={handlePress}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                }}
                source={require('../../../assets/Twiiter.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginHorizontal: 8}}
              onPress={() =>
                Linking.openURL('whatsapp://send?text=Hi&phone=9321665511')
              }>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                }}
                source={require('../../../assets/whatupp.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // Open the Instagram profile in the default browser or app
                Linking.openURL(
                  'https://www.instagram.com/godrejenterprises/',
                ).catch(err => console.error('Failed to open URL:', err));
              }}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                }}
                source={require('../../../assets/insta.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('mailto:smartcare@godrej.com')}
              style={{marginHorizontal: 8}}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                }}
                source={require('../../../assets/email.png')}
              />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.text}>Or copy link</Text>

            <View style={styles.layoutmenu}>
              <View style={styles.textLayout}>
                <Text style={styles.text}>
                  https://apps.apple.com/in/app/godrej-smart-life/id6502178936
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => CopiedAddresh('www.godrejsmartlife.com')}
                style={styles.sideView}>
                <Text style={styles.textBlue}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cardLayout}>
            <Text style={styles.text}>Rate this app for better experience</Text>
            {/* showRating -> it's use for show rating values */}
            {/* <Rating
              style={{marginTop: 10}} // Temporary, to test if it's a style issue
              imageSize={30}
              defaultRating={5}
              maxRating={5}
              readonly={true}
              halfStarEnabled={false}
            /> */}
              <Rating
              style={{marginTop: 10}}
              type="star"
              ratingCount={5}
              imageSize={30}
              readonly
              startingValue={5}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Share;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  shareOption: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ratingBar: {
    alignItems: 'flex-start',
    marginTop: '5%',
  },

  cardLayout: {
    height: '28%',
    paddingStart: 18,
    paddingTop: 14,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'column',
    marginTop: 52,
    marginStart: 2,
    marginEnd: 2,
  },

  layoutmenu: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 8,
    borderWidth: 0.4,
    paddingStart: 6,
    paddingEnd: 12,
    marginTop: 8,
    height: 45,
  },
  optionLayout: {
    // marginHorizontal: 10,
    // marginVertical: 20,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  menu: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  layoutTop: {
    flexDirection: 'row',
    marginStart: 12,
    marginEnd: 12,
    marginTop: 12,
  },
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
  text: {
    fontSize: 14,
    color: 'black',
    fontFamily: GEGBodyCopy,
  },
  textMenu: {
    fontSize: 10,
    color: 'black',
  },
  textBlue: {
    fontSize: 14,
    color: '#810055',
    fontWeight: '600',
  },
  sideView: {
    textAlign: 'center',
    justifyContent: 'center',
    marginStart: 28,
  },
});
