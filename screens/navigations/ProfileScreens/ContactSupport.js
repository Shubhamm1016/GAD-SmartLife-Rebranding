import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Pressable,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import InsideHeader from '../../../comman-compnent/InsideHeader';
import {GEGBodyCopy, GEGBold} from '../../../comman-compnent/FontFamily';

function ContactSupport({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      {/* <View>
        <InsideHeader
          title="Contact Support"
          onBackPress={() => navigation.goBack()} // Set your back action here
        />
      </View> */}
      <View
        style={{
          paddingHorizontal: 15,

          paddingVertical: 15,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            fontSize: 18,
            color: 'black',
            fontWeight: '500',
            justifyContent: 'center',
          }}>
          Contact Support
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#fff',

          flex: 1,

          paddingHorizontal: 15,

          paddingVertical: 15,
        }}>
        {/* <Pressable
          onPress={() => {
            Linking.openURL('tel:18002095511');
          }}
          style={styles.layoutmenu}>
          <Image
            style={styles.imageCall}
            source={require('../../../assets/conbcall.png')}
          />

          <View style={styles.textLayout}>
            <Text style={styles.text}>Call us</Text>
          </View>

          <View style={styles.sideView}>
            <Text style={styles.textBlue}>1800 209 5511</Text>
          </View>
        </Pressable> */}

        <Pressable
          onPress={() => {
            // Linking.openURL('tel:18002095511');
            Linking.openURL('tel:080-6743-6743');
          }}
          style={styles.layoutmenu}>
          <Image
            style={styles.imageCall}
            source={require('../../../assets/conbcall.png')}
          />

          <View style={styles.textLayout}>
            <Text style={styles.text}>Call us</Text>
          </View>

          <View style={styles.sideView}>
            <Text style={styles.textBlue}>080-6743-6743</Text>
          </View>
        </Pressable>

        <View style={styles.menuline} />

        <Pressable
          onPress={() => Linking.openURL('mailto:smartcare@godrej.com')}
          style={styles.layoutmenu}>
          <Image
            style={styles.image}
            source={require('../../../assets/conbgmail.png')}
          />

          <View style={styles.textLayout}>
            <Text style={styles.text}>Write to us</Text>
          </View>

          <View style={styles.sideView}>
            <Image
              style={{
                width: 38,

                height: 38,

                resizeMode: 'contain',
              }}
              source={require('../../../assets/congmail.png')}
            />

            {/* <Text style={styles.textMenu}>Gmail</Text> */}
          </View>

          {/* <TouchableOpacity
            onPress={() => Linking.openURL('mailto:smartcare@godrej.com')}
            style={styles.sideView}>
            <Image
              style={styles.image}
              source={require('../../../assets/conoutlook.png')}
            />

            <Text style={styles.textMenu}>Outlook</Text>
          </TouchableOpacity> */}
        </Pressable>

        <View style={styles.menuline} />

        <Pressable
          onPress={() =>
            Linking.openURL('whatsapp://send?text=Hi&phone=+919321665511')
          }
          style={styles.layoutmenu}>
          <Image
            style={styles.image}
            source={require('../../../assets/conbwhat.png')}
          />
          <View style={styles.textLayout}>
            <Text style={styles.text}>Say 'hi' on WhatsApp</Text>
          </View>

          <View style={styles.sideView}>
            <Image
              style={{
                width: 38,

                height: 38,

                resizeMode: 'contain',
              }}
              source={require('../../../assets/conwhatsapp.png')}
            />

            {/* <Text style={styles.textMenu}>Whatsapp</Text> */}
          </View>
        </Pressable>

        <View style={styles.menuline} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.image}
              source={require('../../../assets/SMIcon.png')}
            />
            <View style={{margin: 10}}>
              <Text
                style={{
                  fontSize: 16,

                  color: 'black',
                }}>
                SmartCare
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => navigation.navigate('NewServiceRequest')}
            style={{backgroundColor: '#810055', padding: 15, borderRadius: 25}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: GEGBold,
                color: '#fff',
              }}>
              New Service Request
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            marginTop: 10,
          }}>
          <Pressable
            onPress={() => navigation.navigate('TrackServiceRequest')}
            style={{padding: 10}}>
            <Text
              style={{
                fontSize: 14,
                color: '#810055',
                textDecorationLine: 'underline',
                textDecorationStyle: 'solid',
              }}>
              Track Service Request
            </Text>
          </Pressable>
        </View>
        <View
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
          <Image
            style={{
              height: '45%',

              width: '100%',

              // resizeMode: 'center',
            }}
            source={require('../../../assets/ContactSupport.png')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ContactSupport;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#ffffff',
  },

  layoutmenu: {
    flexDirection: 'row',

    alignItems: 'center',
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
    marginVertical: 20,
    justifyContent: 'center',
  },

  textStyle: {
    fontSize: 14,

    color: 'black',

    fontWeight: '500',
  },

  text: {
    fontSize: 16,

    color: '#333333',
    fontFamily: GEGBodyCopy,
  },

  textMenu: {
    fontSize: 14,

    color: 'black',
  },

  textBlue: {
    fontSize: 14,

    color: '#810055',

    fontFamily: GEGBodyCopy,

    textDecorationLine: 'underline',
  },

  sideView: {
    textAlign: 'center',

    justifyContent: 'center',

    marginStart: 28,

    alignItems: 'center',
  },

  menuline: {
    height: 0.6,

    backgroundColor: '#d4d4d4',

    marginTop: 14,

    marginBottom: 14,
  },

  image: {
    height: 20,

    width: 20,

    resizeMode: 'contain',
  },
  imageCall: {
    height: 35,

    width: 35,

    resizeMode: 'contain',
  },
});
