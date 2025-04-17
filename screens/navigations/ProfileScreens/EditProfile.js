import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Pressable,
  Button,
  TextInput,
  PermissionsAndroid,
  ActivityIndicator,
  StatusBar,
  ScrollView,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {UserContext} from '../../../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {editUserProfile} from '../../../Context/API';
import {useIsFocused} from '@react-navigation/native';
import InsideHeader from '../../../comman-compnent/InsideHeader';
const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

const CameraModule = props => {
  const [cameraRef, setCameraRef] = useState(null);
  const devices = useCameraDevices();
  const device = devices.back;
  console.log(device, 'devicedevicedevice');
  // const checkPermission = async () => {
  //   const newCameraPermission = await Camera.requestCameraPermission();
  //   console.log(newCameraPermission, 'newCameraPermission');
  //   const camera = useRef(null);
  //   console.log(camera, 'camera');
  // };
  const takePicture = async () => {
    const photo = await Camera.current.takePhoto({
      flash: 'on',
    });
    console.log(photo, 'photophoto');
  };
  // useEffect(() => {
  //   checkPermission();
  // }, []);
  if (device == null) return <ActivityIndicator />;
  // const [type, setType] = useState(Camera.Constants.Type.back);
  return (
    <Modal animationType="slide" transparent={true} visible={true}></Modal>
  );
};

export default function EditProfile({navigation}) {
  const [image, setImage] = useState([]);
  console.log(image, 'image');
  const [camera, setShowCamera] = useState(false);
  const {userData} = useContext(UserContext);
  // const [hasPermission, setHasPermission] = useState(null);
  // const [hide,setHide]= useState(false);
  // hide, show view
  const [shouldShow, setShouldShow] = useState(false);
  const {user} = useContext(UserContext);
  console.log(user, 'useruseruser');

  const [data, setData] = useState(
    user
      ? user
      : {
          email_id: '',
          full_name: '',
          location: '',
          email_id: '',
          mobile_number: '',
          pin_code: '',
        },
  );
  console.log(data.email_id, 'email id value is');
  const isFocused = useIsFocused();
  const [img, setImg] = useState({});
  //  image picker
  const pickImage = async () => {
    setShouldShow(false);
    console.log('net ');
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('user cancelled image picker');
      } else if (response.errorCode == 'permission') {
        console.log('permission not satisfied:', response.errorCode);
      } else if (response.errorMessage == 'others') {
        console.log('user tapped custom button:', response.errorMessage);
      } else if (response.assets[0].fileSize > 10485760) {
        // 10 MB in bytes
        console.log(response.assets[0].fileSize, 'response.assets[0].fileSize');
        setShouldShow(false);
        alert(
          'Maximum image size exceeded. Please select an image that is under 10 MB in size.',
        );
      } else {
        const source = {uri: response.assets[0].uri};
        // console.log(source, 'sourcesource');
        // setImage(source);
        // setShouldShow(false);
        try {
          // Storing the URI in AsyncStorage after converting to JSON string
          let date = await AsyncStorage.setItem(
            'addImg',
            JSON.stringify(source),
          );
          console.log(date, 'img data');
          setImage(source);
          setImge();
          setShouldShow(false);
          console.log('Image URI stored successfully');
        } catch (error) {
          console.error('Error storing image URI:', error);
        }
      }
    });
  };

  const pickCamara = async () => {
    setShouldShow(false);
    console.log('hello');
    let options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchCamera(options, async response => {
      if (response.errorMessage) {
        console.log('Camera permission error');
      } else if (response.didCancel) {
        console.log('user cancelled image picker');
      } else if (response.error) {
        console.log('imagePicker error:', response.error);
      } else if (response.customButton) {
        console.log('user tapped custom button:', response.customButton);
      } else {
        // const source = {uri: response.assets[0].uri};
        // console.log(source.uri, 'sourcesource');
        // let da= await AsyncStorage.setItem('addImg',JSON.stringify(source));
        // console.log(da,"data");
        const source = {uri: response.assets[0].uri};
        // Logging the URI and 'sourcesource'
        console.log(source.uri, 'sourcesource');
        try {
          // Storing the URI in AsyncStorage after converting to JSON string
          let date = await AsyncStorage.setItem(
            'addImg',
            JSON.stringify(source),
          );
          console.log(date, 'img data');
          setImage(source);
          setImge();
          setShouldShow(false);
          console.log('Image URI stored successfully');
        } catch (error) {
          console.error('Error storing image URI:', error);
        }
      }
    });
  };

  // const checkPermission = async () => {
  //   const newCameraPermission = await Camera.requestCameraPermission();
  //   const newMicrophonePermission = await Camera.requestMicrophonePermission();
  //   console.log(newCameraPermission, newMicrophonePermission, 'Premission');
  // };
  const MOBILE_REGEX = /^\+91\d{10}$/;
  // Assuming you want to format the current date and time
  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const SaveToData = async () => {

     const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!data.full_name) {
      alert('Enter Name');
      return;
    }
    if (!emailRegex.test(data.email_id)) {
      alert("Invalid Email");
      return 
    } 
    
    if (!MOBILE_REGEX.test(data.mobile_number)) {
      alert('Please enter a valid mobile number in the format +91xxxxxxxxxx');
      return;
    }
    if (!data.location) {
      alert('Enter Location');
      return;
    }
    if (!data.pin_code) {
      alert('Enter Pin code');
      return;
    }
// retu
    const date = new Date();
    console.log(date, 'date');
    const formattedDate = formatDate(date);
    console.log(formattedDate, data, 'formattedDate');
    // return
    let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await editUserProfile(token, formattedDate, data);
      console.log(response.data);
      userData();
      alert('Changes saved successfully!');
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const setImge = async () => {
    try {
      const date = await AsyncStorage.getItem('addImg');
      console.log(date, 'date');

      if (date) {
        setImg(JSON.parse(date));
      } else {
        // console.log('No image data found.');
      }
    } catch (error) {
      console.error('Error retrieving image data:', error);
    }
  };
  useLayoutEffect(() => {
    if (isFocused) {
      setImge();
    }
    const fetchData = async () => {
      // try {
      //   const email = await AsyncStorage.getItem('email');
      //   console.log(email,"email");
      //   const isNumeric = /^\d+$/.test(email);
      //   console.log(isNumeric ? '+91' + email || '': prevData.mobile_number,"isNumeric");
      //   setData(prevData => ({
      //     ...prevData,
      //     mobile_number: isNumeric ? '+91' + email || '': prevData.mobile_number,
      //     email_id: isNumeric ? prevData.email_id : email || '',
      //     // email_id :isNumeric ?  email || '': prevData.email_id,
      //   }));
      // } catch (error) {
      //   console.error('Error fetching data:', error.message);
      // }
      try {
        const email = await AsyncStorage.getItem('email');
        console.log(email, 'email');

        if (email === null) {
          console.error('Error: Email is null.');
          return;
        }

        const isNumeric = /^\d+$/.test(email);
        // console.log(isNumeric, 'isNumeric');

        setData(prevData => {
          const updatedMobileNumber = isNumeric
            ? '+91' + email
            : prevData.mobile_number;
          const updatedEmailId = isNumeric ? email : prevData.email_id;
          // const updatedEmailId = isNumeric ? prevData.email_id : email;
          console.log(updatedMobileNumber, 'updatedMobileNumber');
          console.log(updatedEmailId, 'updatedEmailId');

          return {
            ...prevData,
            mobile_number: updatedMobileNumber,
            email_id: updatedEmailId,
          };
        });
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [isFocused]);
  const [textColor, setTextColor] = useState('#9c9a9a');
  const [editable, setEditable] = useState(true); // Initially true, will be set based on login method
  const [textEmailColor, setTextEmailColor] = useState('#9c9a9a');
  const [editableEmail, setEditableEmail] = useState(false); // Initially true, will be set based on login method
  // const [data, setData] = useState({
  //   mobile_number: '',
  //   email_id: ''
  // });

  const processEmail = async () => {
    const email = await AsyncStorage.getItem('email');
    if (!email) return ''; // Handle case where email is null or undefined
    let emails;
    const trimmedEmail = email.trim();
    const isnum = /^\d+$/.test(trimmedEmail);

    if (isnum) {
      emails = '+91' + trimmedEmail;
    } else {
      emails = trimmedEmail.toLowerCase();
    }

    return emails;
  };

  const processAndSetEmailProperties = async () => {
    const processedEmail = await processEmail();
    console.log(processedEmail, 'processedEmail');

    // Regular expression to check if the email is a valid email
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    const isEmailValid = emailRegex.test(processedEmail);
    const isMobileValid = /^\+91\d+$/.test(processedEmail); // Check if processed email is a mobile number

    if (isMobileValid) {
      // If logged in with mobile number

      setTextColor('#9c9a9a');
      setEditable(false); // Mobile number is not editable
      setTextEmailColor('#000');
      setEditableEmail(true); // Email ID is editable
      setData({...data, mobile_number: processedEmail});
    } else if (isEmailValid) {
      // If logged in with email ID
      setTextColor('#000');
      setEditable(true); // Mobile number is editable
      setTextEmailColor('#9c9a9a');
      setEditableEmail(false); // Email ID is not editable
      setData({...data, email_id: processedEmail});
    }
  };

  useEffect(() => {
    processAndSetEmailProperties();
  }, []);

  const mobileRef = useRef(null);
  const emailRef = useRef(null);
  const locationRef = useRef(null);
  const pinCodeRef = useRef(null);

  return (
    <SafeAreaView
      style={{
        marginTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <ScrollView>
        {/* image picker */}
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Pressable
            style={{
              height: 50,
              width: 50,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </Pressable>

          <View
            style={{
              flex: 1,

              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,

                color: 'black',

                fontWeight: '500',

                justifyContent: 'center',
              }}>
              Profile
            </Text>
          </View>
          {img.uri ? (
            <TouchableOpacity
              style={{
                height: 28,
                width: 28,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AntDesign
                onPress={async () => {
                  try {
                    await AsyncStorage.removeItem('addImg');
                    setImg({});
                    console.log('Image removed from AsyncStorage');
                  } catch (error) {
                    console.error(
                      'Error removing image from AsyncStorage:',
                      error,
                    );
                  }
                }}
                name="delete"
                size={22}
                color="black"
              />
            </TouchableOpacity>
          ) : (
            ''
          )}
        </View> */}
        <View>
          <InsideHeader
            title="Profile"
            onBackPress={() => navigation.goBack()} // Set your back action here
          />
        </View>

        <View
          style={{
            // flex:1,
            alignItems: 'center',
            // marginTop: 22,
            // marginBottom: 14,
            // backgroundColor: 'red',
          }}>
          <View
            style={
              {
                // backgroundColor: '#eeee',
                // // width: 120,
                // // height: 120,
                // borderRadius: 100,
                // marginBottom: 8,
              }
            }>
            {img.uri ? (
              <Image
                source={img}
                style={{width: 120, height: 120, borderRadius: 100}}
              />
            ) : (
              <Image
                source={require('../../../assets/UserImages.png')}
                style={{width: 120, height: 120, borderRadius: 100}}
              />
            )}
          </View>
          <Pressable
            style={{
              position: 'relative',
              height: 30,
              width: 30,
              left: 40,
              bottom: 40,
              backgroundColor: '#810055',
              borderRadius: 100,
              borderColor: '#fff',
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShouldShow(!shouldShow)}>
            <Entypo name="camera" size={20} color="#fff" />
          </Pressable>
          {/* <View
          style={{
            // flexGrow:1,
            position: 'absolute',
            // bottom: 0,
            // right: 0,
            // backgroundColor: '#4BB6E8',
            // borderRadius: 100,
            // borderColor: '#fff',
            // borderWidth: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            // width: 30,
            // height: 30,
            // marginBottom: 5,
            // marginRight: 150,
            right: '43%',
            top: '64%',

            height: 30,
            width: 30,
            backgroundColor: '#4BB6E8',
            borderRadius: 100,
            borderColor: '#fff',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}> */}

          {/* </View> */}
          {shouldShow ? (
            <View
              style={{
                // flex:1,
                height: 70,
                width: '30%',
                backgroundColor: 'white',
                shadowColor: 'gray',
                shadowRadius: 12,
                elevation: 12,
                shadowOpacity: 5.0,
                justifyContent: 'center',
                borderRadius: 12,
                position: 'absolute',
                // right: '40%',
                // top: '30%',
                // right: 160,
                // top: 220,
                right: '50%',
                top: '55%',
                bottom: 'auto',
                marginTop: 20,
              }}>
              <Pressable
                onPress={() => {
                  pickCamara();
                }}
                style={{
                  height: '40%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{textAlign: 'center'}}>Camera</Text>
              </Pressable>

              <View
                style={{
                  height: 1,
                  backgroundColor: 'gray',
                  margin: 8,
                  width: '90%',
                }}
              />

              <Pressable
                style={{
                  height: '40%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  pickImage();
                }}>
                <Text style={{textAlign: 'center'}}>Gallery</Text>
              </Pressable>
            </View>
          ) : null}
        </View>

        {/* edit data field and save data */}
        <View
          style={{
            paddingHorizontal: '5%',
            paddingVertical: '3%',
            marginTop: '2%',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderRadius: 8,
              borderColor: '#9c9a9a',
              marginHorizontal: '2%',
              marginVertical: '4%',
            }}>
            <Text
              style={{
                position: 'absolute',
                top: -10,
                left: 10,
                fontWeight: 'bold',
                backgroundColor: '#FFFFFF',
                color: '#9c9a9a',
              }}>
              Name
            </Text>
            <TextInput
              style={{paddingHorizontal: '5%', paddingVertical: '3%'}}
              placeholder="Name"
              // readOnly={true}
              maxLength={30}
              placeholderTextColor="#9c9a9a"
              value={data.full_name}
              onChangeText={value => {
                setData({
                  ...data,
                  full_name: value,
                });
              }}
              // onChangeText={(text) => setData(text.target.value)}
              // defaultValue={data.full_name}
            />
          </View>

          <View
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderRadius: 8,
              borderColor: '#9c9a9a',
              marginHorizontal: '2%',
              marginVertical: '4%',
            }}>
            <Text
              style={{
                position: 'absolute',
                top: -10,
                left: 10,
                fontWeight: 'bold',
                backgroundColor: '#FFFFFF',
                color: '#9c9a9a',
              }}>
              Mobile number
            </Text>
            <TextInput
              style={{
                paddingHorizontal: '5%',
                paddingVertical: '3%',
                color: textColor,
              }}
              placeholder="Mobile number"
              placeholderTextColor="#9c9a9a"
              maxLength={13}
              editable={editable}
              value={data.mobile_number}
              // onSubmitEditing={() => mobileRef.current.focus()}
              keyboardType="numeric"
              onChangeText={value => {
                setData({
                  ...data,
                  mobile_number: value,
                });
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderRadius: 8,
              borderColor: '#9c9a9a',
              marginHorizontal: '2%',
              marginVertical: '4%',
            }}>
            <Text
              style={{
                position: 'absolute',
                top: -10,
                left: 10,
                fontWeight: 'bold',
                backgroundColor: '#FFFFFF',
                color: '#9c9a9a',
              }}>
              Email ID
            </Text>
            <TextInput
              style={{
                paddingHorizontal: '5%',
                paddingVertical: '3%',
                color: textEmailColor,
              }}
              placeholder="Email Id"
              editable={editableEmail}
              value={data.email_id}
              maxLength={30}
              placeholderTextColor="#9c9a9a"
              onChangeText={value => {
                setData({
                  ...data,
                  email_id: value,
                });
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderRadius: 8,
              borderColor: '#9c9a9a',
              marginHorizontal: '2%',
              marginVertical: '4%',
            }}>
            <Text
              style={{
                position: 'absolute',
                top: -10,
                left: 10,
                fontWeight: 'bold',
                backgroundColor: '#FFFFFF',
                color: '#9c9a9a',
              }}>
              Location
            </Text>
            <TextInput
              style={{
                paddingHorizontal: '5%',
                paddingVertical: '3%',
              }}
              placeholder="Location"
              value={data.location}
              // onSubmitEditing={() => locationRef.current.focus()}
              maxLength={15}
              keyboardType="default"
              placeholderTextColor="#9c9a9a"
              onChangeText={value => {
                setData({
                  ...data,
                  location: value,
                });
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderRadius: 8,
              borderColor: '#9c9a9a',
              marginHorizontal: '2%',
              marginVertical: '4%',
            }}>
            <Text
              style={{
                position: 'absolute',
                top: -10,
                left: 10,
                fontWeight: 'bold',
                backgroundColor: '#FFFFFF',
                color: '#9c9a9a',
              }}>
              PIN Code
            </Text>
            <TextInput
              style={{
                paddingHorizontal: '5%',
                paddingVertical: '3%',
              }}
              placeholder="PIN Code"
              placeholderTextColor="#9c9a9a"
              value={data.pin_code}
              // onSubmitEditing={() => pinCodeRef.current.focus()}
              maxLength={6}
              keyboardType="number-pad"
              onChangeText={value => {
                setData({
                  ...data,
                  pin_code: value,
                });
              }}
            />
          </View>

          <TouchableOpacity
            onPress={SaveToData}
            style={{
              backgroundColor: '#810055',
              height: '10%', // Set height to 8% of the containing element
              borderRadius: 25,
              marginTop: '5%', // Set marginTop to 5% of the containing element
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>

        {/*  old data */}
        {camera && (
          <CameraModule
            showModal={camera}
            setModalVisible={() => setShowCamera(false)}
            setImage={async result => {
              console.log('camerModule');
              setImage(result.uri);
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layoutTop: {
    flexDirection: 'row',
    marginStart: 12,
    marginEnd: 12,
    marginTop: 12,
  },
  textStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  layout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 28,
  },
  layoutmenu: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingStart: 12,
    paddingEnd: 12,
    margin: 5,
    height: 50,
  },
  textLayout: {
    marginStart: 10,
    justifyContent: 'center',
  },

  toggleStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewStyle: {
    marginTop: 18,
  },
  profileImgContainer: {
    marginLeft: 8,
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  line: {
    height: 0.3,
    backgroundColor: 'gray',
    margin: 6,
  },
});
