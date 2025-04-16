// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
// } from 'react-native';

// import AntDesign from 'react-native-vector-icons/AntDesign';

// import {useContext, useEffect, useLayoutEffect, useState} from 'react';
// import {UserContext} from '../../Context/UserContext';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import DeleteAccountModel from '../../components/DeleteAccountModel';
// import LogOutModel from './ProfileScreens/LogOutModel';
// import MyProvider from '../../Context/MyProvider';
// import ArrowRight from '../../assets/arrowright.svg';
// import {Path, Svg} from 'react-native-svg';
// import {GEGBold, GEGHeadline} from '../../comman-compnent/FontFamily';
// // import BackIconSvg from '../../components/BackIconSvg';
// // import WMAddDevice from '../../components/ImgeIcon/WMImageIcon/WMAddDevice';
// // import RefAddDevice from '../../components/ImgeIcon/RefImageIcon/RefAddDevice';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// const pkg = require('../../package.json');
// const ProfileScreen = props => {
//   const navigation = useNavigation();
//   console.log(navigation, 'navigation');
//   const {user} = useContext(UserContext);
//   console.log(user, '......useruseruser');

//   const AppVersion = pkg.version;
//   // console.log(AppVersion, 'AppVersion');
//   const [img, setImg] = useState({});
//   const [email, setEmail] = useState(null);
//   console.log(email, '.....emailemailemail');

//   const {logout} = useContext(UserContext);
//   const isFocused = useIsFocused();
//   const setImge = async () => {
//     try {
//       const date = await AsyncStorage.getItem('addImg');
//       console.log(date, 'date');

//       if (date) {
//         setImg(JSON.parse(date));
//       } else {
//         // console.log('No image data found.');
//         setImg({});
//       }
//     } catch (error) {
//       console.error('Error retrieving image data:', error);
//     }
//   };

//   useEffect(() => {
//     const getEmailFromStorage = async () => {
//       try {
//         const storedEmail = await AsyncStorage.getItem('email');
//         setEmail(storedEmail);
//       } catch (error) {
//         console.error('Error retrieving email:', error);
//       }
//     };

//     getEmailFromStorage();
//   }, []);
//   useLayoutEffect(() => {
//     if (isFocused) {
//       setImge();
//     }
//   }, [isFocused]);
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <View style={styles.container}>
//           {/* profile ui */}

//           <View style={styles.layout}>
//             {img.uri ? (
//               <Image
//                 source={img}
//                 style={{width: 68, height: 68, borderRadius: 68 / 2}}
//               />
//             ) : (
//               <Image
//                 source={require('../../assets/UserImages.png')}
//                 style={{width: 68, height: 68, borderRadius: 68 / 2}}
//               />
//             )}

//             <View style={styles.textLayout}>
//               <Text style={styles.text}>Hey</Text>

//               <Text style={styles.text}>
//                 {user.full_name ? user.full_name : 'user'}
//               </Text>

//               <Text style={styles.textgray}>
//                 {/* {user.email_id ? user.email_id : email} */}
//                 {email}
//                 {/* shubham@123 */}
//               </Text>
//             </View>

//             <TouchableOpacity
//               onPress={() => navigation.navigate('EditProfile')}>
//               <View style={styles.layoutNoti}>
//                 <Text style={styles.textblue}>Edit</Text>
//               </View>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.line} />

//           {/* menu ui */}

//           <View style={{margin: 10}}>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('ManageGroup', {...props})}>
//               <View style={styles.layoutmenu}>
//                 <Image
//                   style={styles.image}
//                   source={require('../../assets/promanage.png')}
//                 />

//                 {/* <AntDesign name="addusergroup" width={20} height={20} /> */}

//                 <View style={styles.textLayout}>
//                   <Text style={styles.text}>Manage Group</Text>
//                 </View>

//                 {/* <ArrowIcon width={12} height={12} /> */}

//                 <AntDesign name="right" color="#000" width={20} height={20} />
//               </View>
//             </TouchableOpacity>

//             <View style={styles.menuline} />

//             <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
//               <View style={styles.layoutmenu}>
//                 <Image
//                   style={styles.image}
//                   source={require('../../assets/prosetting.png')}
//                 />

//                 {/* <AntDesign name="setting" width={20} height={20} /> */}

//                 <View style={styles.textLayout}>
//                   <Text style={styles.text}>Settings</Text>
//                 </View>

//                 {/* <ArrowIcon width={12} height={12} /> */}

//                 <AntDesign name="right" color="#000" width={20} height={20} />
//               </View>
//             </TouchableOpacity>
//             <View style={styles.menuline} />
//             <TouchableOpacity onPress={() => navigation.navigate('Share')}>
//               <View style={styles.layoutmenu}>
//                 <Image
//                   style={styles.image}
//                   source={require('../../assets/proshare.png')}
//                 />

//                 <View style={styles.textLayout}>
//                   <Text style={styles.text}>Share</Text>
//                 </View>

//                 <AntDesign name="right" color="#000" width={20} height={20} />
//               </View>
//             </TouchableOpacity>
//             {/* 
//         <View style={styles.menuline} />
//           <TouchableOpacity
//             onPress={() => navigation.navigate('ContactSupport')}>
//             <View style={styles.layoutmenu}>
//               <Image
//                 style={styles.image}
//                 source={require('../../assets/procall.png')}
//               />

//               <View style={styles.textLayout}>
//                 <Text style={styles.text}>Contact Support</Text>
//               </View>

//               <AntDesign name="right" color="#000" width={20} height={20} />
//             </View>
//           </TouchableOpacity>  */}

//             <View style={styles.menuline} />

//             <TouchableOpacity onPress={() => navigation.navigate('Help')}>
//               <View style={styles.layoutmenu}>
//                 <Image
//                   style={styles.image}
//                   source={require('../../assets/prohelp.png')}
//                 />

//                 {/* <MaterialIcons name="help-outline" width={20} height={20} /> */}

//                 <View style={styles.textLayout}>
//                   <Text style={styles.text}>Help</Text>
//                 </View>

//                 {/* <ArrowIcon width={12} height={12} /> */}

//                 <AntDesign name="right" color="#000" width={20} height={20} />
//               </View>
//             </TouchableOpacity>

//             <View style={styles.menuline} />
//             <View
//               style={{
//                 marginStart: 12,
//                 marginEnd: 12,
//                 paddingVertical: 7,
//               }}>
//               <DeleteAccountModel {...props} />
//             </View>
//             <View style={styles.menuline} />
//             {/* <TouchableOpacity
//               onPress={async () => {
//                 try {
//                   logout();
//                   props.setIsLoggedIn(false);
//                 } catch (err) {
//                   console.log(err);
//                 }
//               }}
//               style={styles.logoutlayout}>
//               <AntDesign
//                 name="logout"
//                 width={23}
//                 height={23}
//                 color="#838383"
//                 size={16}
//               />

//               <View style={{marginStart: 10}}>
//                 <Text style={styles.textblue}>Logout</Text>
//               </View>
//             </TouchableOpacity> */}

//             <LogOutModel setIsLoggedIn={props.setIsLoggedIn} />
//             {/* <WMAddDevice width={100} height={100} /> */}
//             <View style={styles.menuline} />
//           </View>
//         </View>
//         <View style={{marginTop: 140}}>
//           <Text
//             style={{
//               fontSize: 14,
//               color: '#810055',
//               fontFamily: GEGBold,
//               alignItems: 'center',
//               textAlign: 'center',
//             }}>
//             Version: {AppVersion}
//           </Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     backgroundColor: '#fff',

//     paddingTop: 14,
//   },

//   layout: {
//     flexDirection: 'row',

//     marginStart: 12,

//     marginEnd: 12,
//   },

//   logoutlayout: {
//     marginStart: 15,

//     marginEnd: 15,

//     paddingVertical: 7,

//     flexDirection: 'row',

//     alignItems: 'center',
//   },

//   layoutmenu: {
//     flexDirection: 'row',

//     marginStart: 12,

//     marginEnd: 12,

//     paddingVertical: 7,
//   },

//   textLayout: {
//     flex: 1,

//     marginStart: 10,

//     justifyContent: 'center',
//   },

//   layoutNoti: {
//     flex: 1,

//     backgroundColor: '#fff',

//     justifyContent: 'center',

//     padding: 6,

//     alignItems: 'flex-end',
//   },

//   text: {
//     fontSize: 14,
//     color: '#333333',
//     fontFamily: GEGHeadline,
//   },

//   textgray: {
//     fontSize: 11,

//     color: '#515152',
//   },

//   textblue: {
//     fontSize: 14,

//     color: '#810055',

//     fontWeight: 'bold',
//   },

//   line: {
//     height: 0.5,

//     backgroundColor: 'gray',

//     marginStart: 14,

//     marginEnd: 14,

//     marginTop: 4,

//     marginBottom: 20,
//   },

//   menuline: {
//     height: 0.5,

//     backgroundColor: '#CECECE',

//     marginStart: 14,

//     marginEnd: 14,

//     marginTop: 14,

//     marginBottom: 14,
//   },

//   image: {
//     height: 30,

//     width: 30,

//     resizeMode: 'contain',
//   },
// });

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
 
import AntDesign from 'react-native-vector-icons/AntDesign';
 
import {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {UserContext} from '../../Context/UserContext';
 
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import DeleteAccountModel from '../../components/DeleteAccountModel';
import LogOutModel from './ProfileScreens/LogOutModel';
import MyProvider from '../../Context/MyProvider';
import ArrowRight from '../../assets/arrowright.svg';
import {Path, Svg} from 'react-native-svg';
import {GEGBold, GEGHeadline} from '../../comman-compnent/FontFamily';
// import BackIconSvg from '../../components/BackIconSvg';
// import WMAddDevice from '../../components/ImgeIcon/WMImageIcon/WMAddDevice';
// import RefAddDevice from '../../components/ImgeIcon/RefImageIcon/RefAddDevice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const pkg = require('../../package.json');
const ProfileScreen = props => {
  const navigation = useNavigation();
  console.log(navigation, 'navigation');
  const {user} = useContext(UserContext);
  console.log(user, '......useruseruser');
 
  const AppVersion = pkg.version;
  // console.log(AppVersion, 'AppVersion');
  const [img, setImg] = useState({});
  const [email, setEmail] = useState(null);
  console.log(email, '.....emailemailemail');
 
  const {logout} = useContext(UserContext);
  const isFocused = useIsFocused();
  const setImge = async () => {
    try {
      const date = await AsyncStorage.getItem('addImg');
      console.log(date, 'date');
 
      if (date) {
        setImg(JSON.parse(date));
      } else {
        // console.log('No image data found.');
        setImg({});
      }
    } catch (error) {
      console.error('Error retrieving image data:', error);
    }
  };
 
  useEffect(() => {
    const getEmailFromStorage = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        setEmail(storedEmail);
      } catch (error) {
        console.error('Error retrieving email:', error);
      }
    };
 
    getEmailFromStorage();
  }, []);
  useLayoutEffect(() => {
    if (isFocused) {
      setImge();
    }
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          {/* profile ui */}
 
          <View style={styles.layout}>
            {img.uri ? (
              <Image
                source={img}
                style={{width: 68, height: 68, borderRadius: 68 / 2}}
              />
            ) : (
              <Image
                source={require('../../assets/UserImages.png')}
                style={{width: 68, height: 68, borderRadius: 68 / 2}}
              />
            )}
 
            <View style={styles.textLayout}>
              <Text style={styles.text}>Hey</Text>
 
              <Text style={styles.text}>
                {user.full_name ? user.full_name : 'user'}
              </Text>
 
              <Text style={styles.textgray}>
                {/* {user.email_id ? user.email_id : email} */}
                {email}
                {/* shubham@123 */}
              </Text>
            </View>
 
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}>
              <View style={styles.layoutNoti}>
                <Text style={styles.textblue}>Edit</Text>
              </View>
            </TouchableOpacity>
          </View>
 
          <View style={styles.line} />
 
          {/* menu ui */}
 
          <View style={{margin: 10}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ManageGroup', {...props})}>
              <View style={styles.layoutmenu}>
                <Image
                  style={styles.image}
                  source={require('../../assets/promanage.png')}
                />
 
                {/* <AntDesign name="addusergroup" width={20} height={20} /> */}
 
                <View style={styles.textLayout}>
                  <Text style={styles.text}>Manage Group</Text>
                </View>
 
                {/* <ArrowIcon width={12} height={12} /> */}
 
                <AntDesign name="right" color="#000" width={20} height={20} />
              </View>
            </TouchableOpacity>
 
            <View style={styles.menuline} />
 
            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
              <View style={styles.layoutmenu}>
                <Image
                  style={styles.image}
                  source={require('../../assets/prosetting.png')}
                />
 
                {/* <AntDesign name="setting" width={20} height={20} /> */}
 
                <View style={styles.textLayout}>
                  <Text style={styles.text}>Settings</Text>
                </View>
 
                {/* <ArrowIcon width={12} height={12} /> */}
 
                <AntDesign name="right" color="#000" width={20} height={20} />
              </View>
            </TouchableOpacity>
            <View style={styles.menuline} />
            <TouchableOpacity onPress={() => navigation.navigate('Share')}>
              <View style={styles.layoutmenu}>
                <Image
                  style={styles.image}
                  source={require('../../assets/proshare.png')}
                />
 
                <View style={styles.textLayout}>
                  <Text style={styles.text}>Share</Text>
                </View>
 
                <AntDesign name="right" color="#000" width={20} height={20} />
              </View>
            </TouchableOpacity>
            {/*
        <View style={styles.menuline} />
          <TouchableOpacity
            onPress={() => navigation.navigate('ContactSupport')}>
            <View style={styles.layoutmenu}>
              <Image
                style={styles.image}
                source={require('../../assets/procall.png')}
              />
 
              <View style={styles.textLayout}>
                <Text style={styles.text}>Contact Support</Text>
              </View>
 
              <AntDesign name="right" color="#000" width={20} height={20} />
            </View>
          </TouchableOpacity>  */}
 
            <View style={styles.menuline} />
 
            <TouchableOpacity onPress={() => navigation.navigate('Help')}>
              <View style={styles.layoutmenu}>
                <Image
                  style={styles.image}
                  source={require('../../assets/prohelp.png')}
                />
 
                {/* <MaterialIcons name="help-outline" width={20} height={20} /> */}
 
                <View style={styles.textLayout}>
                  <Text style={styles.text}>Help</Text>
                </View>
 
                {/* <ArrowIcon width={12} height={12} /> */}
 
                <AntDesign name="right" color="#000" width={20} height={20} />
              </View>
            </TouchableOpacity>
 
            <View style={styles.menuline} />
            <View
              style={{
                marginStart: 12,
                marginEnd: 12,
                paddingVertical: 7,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <DeleteAccountModel {...props} />
              <AntDesign name="right" color="#000" width={20} height={20} />
            </View>
            <View style={styles.menuline} />
 
            <View
              style={{
                // marginStart: 10,
                // marginEnd: 12,
                paddingVertical: 7,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <LogOutModel setIsLoggedIn={props.setIsLoggedIn} />
              <View style={{marginEnd: 10}}>
                <AntDesign name="right" color="#000" width={20} height={20} />
              </View>
            </View>
            {/* <WMAddDevice width={100} height={100} /> */}
            <View style={styles.menuline} />
          </View>
        </View>
        <View style={{marginTop: 140}}>
          <Text
            style={{
              fontSize: 14,
              color: '#810055',
              fontFamily: GEGBold,
              alignItems: 'center',
              textAlign: 'center',
            }}>
            Version: {AppVersion}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
 
export default ProfileScreen;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
 
    backgroundColor: '#fff',
 
    paddingTop: 14,
  },
 
  layout: {
    flexDirection: 'row',
 
    marginStart: 12,
 
    marginEnd: 12,
  },
 
  logoutlayout: {
    marginStart: 15,
 
    marginEnd: 15,
 
    paddingVertical: 7,
 
    flexDirection: 'row',
 
    alignItems: 'center',
  },
 
  layoutmenu: {
    flexDirection: 'row',
 
    marginStart: 12,
 
    marginEnd: 12,
 
    paddingVertical: 7,
  },
 
  textLayout: {
    flex: 1,
 
    marginStart: 10,
 
    justifyContent: 'center',
  },
 
  layoutNoti: {
    flex: 1,
 
    backgroundColor: '#fff',
 
    justifyContent: 'center',
 
    padding: 6,
 
    alignItems: 'flex-end',
  },
 
  text: {
    fontSize: 14,
    color: '#333333',
    fontFamily: GEGHeadline,
  },
 
  textgray: {
    fontSize: 11,
 
    color: '#515152',
  },
 
  textblue: {
    fontSize: 14,
 
    color: '#810055',
 
    fontWeight: 'bold',
  },
 
  line: {
    height: 0.5,
 
    backgroundColor: 'gray',
 
    marginStart: 14,
 
    marginEnd: 14,
 
    marginTop: 4,
 
    marginBottom: 20,
  },
 
  menuline: {
    height: 0.5,
 
    backgroundColor: '#CECECE',
 
    marginStart: 14,
 
    marginEnd: 14,
 
    marginTop: 14,
 
    marginBottom: 14,
  },
 
  image: {
    height: 30,
 
    width: 30,
 
    resizeMode: 'contain',
  },
});