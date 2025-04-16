import React, {useContext, useEffect, useMemo, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
// import SplashScreennnn from './screens/splash/SplashScreennnn';
import OnBoardingScreen from './screens/splash/OnBoardingScreen';
import LoginScreen from './screens/login/LoginScreen';
import RegistrationScreen from './screens/login/RegistrationScreen';
import ForgotPasswordScreen from './screens/login/ForgotPasswordScreen';
import HomeScreen from './screens/navigations/HomeScreen';
import ContactSupport from './screens/navigations/ProfileScreens/ContactSupport';
import EditProfileScreen from './screens/navigations/ProfileScreens/EditProfile';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ShareScreen from './screens/navigations/ProfileScreens/ShareScreen';
import HelpScreen from './screens/navigations/ProfileScreens/Help';
import AlertsScreen from './screens/navigations/AlertsScreen';
import ProfileScreen from './screens/navigations/ProfileScreen';
import ManageGroup from './screens/navigations/ProfileScreens/ManageGroup';
import AddDeviceScreen from './screens/provisioning/AddDeviceScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SerialNumberScreen from './screens/provisioning/SerialNumberScreen';
import ProvisioningScreen from './screens/provisioning/ProvisioningScreen';
import QRScannerScreen from './screens/provisioning/QRScannerScreen';
import DeviceConnectedScreen from './screens/provisioning/DeviceConnectedScreen';
import WifiScanList from './screens/provisioning/WifiScanList';
import Setting from './screens/navigations/ProfileScreens/Setting';
import MobileNumberLoginScreen from './screens/login/MobileNumberLoginScreen';
import ResetPasswordScreen from './screens/login/ResetPasswordScreen';
import RegistrationOTPScreen from './screens/login/RegistrationOTPScreen';
import MobileNumberOTPScreen from './screens/login/MobileNumberOTPScreen';
import {UserContext} from './Context/UserContext';
import {
  StatusBar,
  TouchableOpacity,
  Text,
  Platform,
  useWindowDimensions,
  View,
} from 'react-native';
import AddDeviceListScreen from './screens/provisioning/AddDeviceListScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AcFeatureScreen from './screens/AcFeature/AcFeatureScreen';
import ManageCreateGroupScreen from './screens/navigations/ProfileScreens/ManageCreateGroupScreen';
import NotificationCenterScreen from './components/NotificationCenterScreen';
import AddMoreDevices from './components/AddMoreDevices';
import SetTimeAlerts from './components/SetTimeAlerts';
import AcEcoScreen from './screens/AcFeature/AcEcoScreen';
import AcTimeScreen from './screens/AcFeature/AcTimeScreen';
import SerialQRScanner from './screens/provisioning/SerialQRScanner';
import DeleteDeviceList from './components/DeleteDeviceList';
import DeleteDeviceScreen from './screens/navigations/DeleteDeviceScreen';
import SplashScreenCom from './components/SplashScreenCom';
import FindAddressModal from './screens/provisioning/FindAddressModal';
import UserDeleteOtpScreen from './components/UserDeleteOtpScreen';
import {GetUserData} from './Context/API';
import HomeScrennNavigater from './screens/TabBarNavigater/HomeScrennNavigater';
import InternetConnectionChecker from './Context/InternetConnectionChecker';
import MyProvider from './Context/MyProvider';
import MyDevicesScreen from './components/wmscreen/WMDeviceScreen';
import WMDeviceScreen from './components/wmscreen/WMDeviceScreen';
import WMBottomSheet from './components/wmscreen/WMFunctionScreen/WMBottomSheet';
import TrackServiceRequest from './screens/navigations/ProfileScreens/TrackServiceRequest';
import NewServiceRequest from './screens/navigations/ProfileScreens/NewServiceRequest';
import OnlineServiceRequest from './screens/navigations/ProfileScreens/OnlineServiceRequest';
import SpecialProgram from './components/wmscreen/WMFunctionScreen/SpecialProgram';
import SpecialProgramStart from './components/wmscreen/WMFunctionScreen/SpecialProgramStart';
import GifDisplay from './screens/provisioning/GifDisplay';
import RefDeviceScreen from './components/refscreen/RefDeviceScreen';
const Stack = createNativeStackNavigator();

const BottomTabs = createBottomTabNavigator();

function HomeNavigator(props) {
  const {setIsLoggedIn} = props;
  const windowWidth = useWindowDimensions().width;
  const [notificationCount, setNotificationCount] = useState(0);

  return (
    <BottomTabs.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 15, // Curved corner for left side
          borderTopRightRadius: 15,
          height: 75, // Adjust height if needed
          overflow: 'hidden', // Ensures content stays within the rounded corners
          elevation: 5,
          // height: 60,
        },
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Alerts') {
            iconName = 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }
          return iconName === 'home' ? (
            <FontAwesome name={iconName} size={size} color={color} />
          ) : (
            <Ionicons name={iconName} size={size} color={color} />
          );
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: '#810055',
        tabBarInactiveTintColor: '#333333',
        tabBarIconStyle: {
          marginTop: 5,
        },
      })}>
      {/* Home Screen */}
      <BottomTabs.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}>
        {props => <HomeScreen setIsLoggedIn={setIsLoggedIn} {...props} />}
      </BottomTabs.Screen>
      {/* Alert screen */}
      {/* <BottomTabs.Screen
        name="Alerts"
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}>
        {props => (
          <AlertsScreen
            setNotificationCount={setNotificationCount}
            {...props}
          />
        )}
      </BottomTabs.Screen> */}
      <BottomTabs.Screen
        name="Alerts"
        options={({route, navigation}) => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Feather name="bell" size={size} color={color} />
          ),
          tabBarBadge: notificationCount > 0 ? notificationCount : null, // Show badge
        })}>
        {props => (
          <AlertsScreen
            setNotificationCount={setNotificationCount} // Pass the function to AlertsScreen
            {...props}
          />
        )}
      </BottomTabs.Screen>
      {/* Other screens */}
      <BottomTabs.Screen
        name="Support"
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="support-agent" size={size} color={color} />
          ),
        }}>
        {props => <ContactSupport setIsLoggedIn={setIsLoggedIn} {...props} />}
      </BottomTabs.Screen>
      {/* Profile Screen */}
      <BottomTabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}>
        {props => <ProfileScreen setIsLoggedIn={setIsLoggedIn} {...props} />}
      </BottomTabs.Screen>
    </BottomTabs.Navigator>
  );
}

export default function Route(props) {
  const {navigation} = props;
  console.log(props, 'props');
  const {user, isLoggedIn, setIsLoggedIn} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [isFirstTimeLoad, setIsFristTimeLoad] = useState(null);
  const [hasShownVideo, setHasShownVideo] = useState(false);
  const userData = async () => {
    let token = await AsyncStorage.getItem('AccessToken');
    console.log(token, 'token');
    if (!token) return false;
    if (token) {
      try {
        let response = await GetUserData(token);
        // console.log(response, '22222222222222222222@@@@@@@@');
        if (response.isLoggedIn) return true;
      } catch (err) {
        console.log(
          err.response?.data?.description?.message ||
            'Error fetching user data',
        );
      }
    }
  };
  const handleDone = () => {
    console.log('done');
    setIsFristTimeLoad(false);
    AsyncStorage.setItem('isFirstTimeOpen', 'no');
  };

  useEffect(() => {
    const checkFirstTimeLoad = async () => {
      try {
        const isFirstTime = await AsyncStorage.getItem('isFirstTimeLoad');
        if (isFirstTime === null) {
          setIsFristTimeLoad(true);
          await AsyncStorage.setItem('isFirstTimeLoad', 'false');
        } else {
          setIsFristTimeLoad(false);
        }
      } catch (error) {
        console.error('Failed to check if first time load', error);
      }
    };

    checkFirstTimeLoad();
  }, []);

  useEffect(() => {
    (async () => {
      await new Promise(resolve => setTimeout(resolve, 8000));
      userData();

      SplashScreen.hide();
    })();
  }, []);

  return (
    <>
      <NavigationContainer>
        <InternetConnectionChecker>
          <MyProvider>
            <StatusBar
              backgroundColor="#288db7"
              barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
            />
            <Stack.Navigator>
              {!hasShownVideo && (
                <Stack.Screen
                  name="Lotties"
                  options={{
                    headerShown: false,
                  }}>
                  {props => (
                    <SplashScreenCom
                      setHasShownVideo={setHasShownVideo}
                      {...props}
                    />
                  )}
                </Stack.Screen>
              )}

              {isFirstTimeLoad ? (
                <>
                  <Stack.Screen
                    name="OnBoarding"
                    options={{
                      headerShown: false,
                    }}>
                    {props => (
                      <OnBoardingScreen
                        onDone={handleDone}
                        setIsLoggedIn={setIsLoggedIn}
                        {...props}
                      />
                    )}
                  </Stack.Screen>
                </>
              ) : (
                <>
                  {isLoggedIn ? (
                    <>
                      <Stack.Screen
                        name="bottomTab"
                        options={{
                          headerShown: false,
                        }}>
                        {props => (
                          <HomeNavigator
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Setting"
                        component={Setting}
                        options={{
                          headerShown: false,
                          headerBackTitle: 'Back',
                          title: 'App Setting',
                        }}

                        // <View></View>

                        // <AntDesign name="plus" width={20} height={20} color="#64bbf5"  size={20}/>
                      />

                      {/* <Stack.Screen
                        name="ContactSupport"
                        options={{
                          headerShown: false,
                          headerBackTitle: 'Back',
                          title: 'Contact Support',
                        }}>
                        {props => (
                          <ContactSupport
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen> */}

                      <Stack.Screen
                        name="Help"
                        options={{
                          headerShown: false,
                          headerBackTitle: 'Back',
                          title: 'Help Guide',
                        }}>
                        {props => (
                          <HelpScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="TrackServiceRequest"
                        options={{
                          headerShown: false,
                          headerBackTitle: 'Back',
                          title: 'TrackServiceRequest',
                        }}>
                        {props => (
                          <TrackServiceRequest
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="OnlineServiceRequest"
                        options={{
                          headerShown: false,
                          headerBackTitle: 'Back',
                          title: 'OnlineServiceRequest',
                        }}>
                        {props => (
                          <OnlineServiceRequest
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="NewServiceRequest"
                        options={{
                          headerShown: false,
                          headerBackTitle: 'Back',
                          title: 'NewServiceRequest',
                        }}>
                        {props => (
                          <NewServiceRequest
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="NotificationCenterScreen"
                        options={{
                          headerShown: false,
                          headerBackTitle: 'Back',
                          title: 'Notification Center',
                        }}>
                        {props => (
                          <NotificationCenterScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="EditProfile"
                        options={{
                          headerShown: false,
                          headerBackTitle: 'Back',
                          title: 'Profile',
                        }}>
                        {props => (
                          <EditProfileScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="AddDevice"
                        options={{
                          headerShown: false,

                          title: 'Add Device',
                        }}>
                        {props => (
                          <AddDeviceScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="GifDisplay"
                        options={{
                          headerShown: false,
                        }}>
                        {props => (
                          <GifDisplay
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="WMDeviceScreen"
                        options={{
                          headerShown: false,

                          title: 'WM Device',
                        }}>
                        {props => (
                          <WMDeviceScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="SpecialProgram"
                        options={{
                          headerShown: false,

                          title: 'Special Program',
                        }}>
                        {props => (
                          <SpecialProgram
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="RefDeviceScreen"
                        options={{
                          headerShown: false,

                          title: 'Ref DeviceScreen',
                        }}>
                        {props => (
                          <RefDeviceScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="SpecialProgramStart"
                        options={{
                          headerShown: false,

                          title: 'Program Start',
                        }}>
                        {props => (
                          <SpecialProgramStart
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="WMBottomSheet"
                        options={{
                          headerShown: false,

                          title: 'WMBottomSheet',
                        }}>
                        {props => (
                          <WMBottomSheet
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="AddDeviceList"
                        options={{
                          headerShown: true,

                          title: 'Add Device',
                        }}>
                        {props => (
                          <AddDeviceList
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="ManageGroup"
                        options={({navigation}) => ({
                          headerShown: false,

                          title: 'Manage Group',

                          headerBackTitle: 'Back',

                          headerRight: () => (
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate('ManageCreateGroupScreen', {
                                  setHideRemove: true,
                                });
                              }}>
                              <AntDesign
                                name="plus"
                                width={20}
                                height={20}
                                color="#64bbf5"
                                size={20}
                              />
                            </TouchableOpacity>
                          ),
                        })}>
                        {props => (
                          <ManageGroup
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="AddMoreDevices"
                        options={({navigation}) => ({
                          headerShown: false,

                          title: 'Group',

                          headerBackTitle: 'Back',

                          headerRight: () => (
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate('ManageCreateGroupScreen', {
                                  setHideRemove: true,
                                });
                              }}>
                              <Text>Save</Text>
                            </TouchableOpacity>
                          ),
                        })}>
                        {props => (
                          <AddMoreDevices
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="ManageCreateGroupScreen"
                        options={{
                          headerShown: false,
                          title: 'Create Group',

                          headerBackTitle: 'Back',
                        }}>
                        {props => (
                          <ManageCreateGroupScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="FindAddressModal"
                        options={{
                          headerShown: false,
                        }}>
                        {props => (
                          <FindAddressModal
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="UserDeleteOtpScreen"
                        options={{
                          headerShown: false,
                        }}>
                        {props => (
                          <UserDeleteOtpScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="SerialNumber"
                        options={{
                          headerShown: false,
                          title: 'Serial Number',
                        }}>
                        {props => (
                          <SerialNumberScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      {/* SetTimeAlerts */}

                      <Stack.Screen
                        name="SetTimeAlerts"
                        options={{
                          headerShown: true,

                          title: 'Time',
                        }}>
                        {props => (
                          <SetTimeAlerts
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="QRScanner"
                        options={{
                          headerShown: false,
                          title: 'Qr Scanner',
                        }}>
                        {props => (
                          <QRScannerScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="AcFeatureScreen"
                        options={{
                          headerShown: false,

                          title: 'Ac Feature Screen',
                        }}>
                        {props => (
                          <AcFeatureScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="SerialQRScanner"
                        options={{
                          headerShown: false,

                          title: ' Serial Qr Scanner',
                        }}>
                        {props => (
                          <SerialQRScanner
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="AcEcoScreen"
                        options={{
                          headerShown: false,

                          title: 'Share',
                        }}>
                        {props => (
                          <AcEcoScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="TimerScreen"
                        options={{
                          headerShown: false,

                          title: 'Timer',
                        }}>
                        {props => (
                          <AcTimeScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="DeleteDeviceList"
                        options={{
                          headerShown: false,
                          headerBackTitle: 'Back',
                          title: 'List',
                        }}>
                        {props => (
                          <DeleteDeviceList
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="DeleteDeviceScreen"
                        options={{
                          headerShown: false,

                          title: 'Device',
                        }}>
                        {props => (
                          <DeleteDeviceScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Provisioning"
                        options={{
                          headerShown: false,
                        }}>
                        {props => (
                          <ProvisioningScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="DeviceConnected"
                        options={{
                          headerShown: false,
                        }}>
                        {props => (
                          <DeviceConnectedScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Share"
                        options={{
                          headerShown: false,

                          title: 'Share',
                        }}>
                        {props => (
                          <ShareScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="WifiScanList"
                        options={{
                          headerShown: false,
                        }}>
                        {props => (
                          <WifiScanList
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>
                    </>
                  ) : (
                    <>
                      <Stack.Screen
                        name="Login"
                        options={{
                          headerShown: false,
                        }}>
                        {props => (
                          <LoginScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="SignUp"
                        options={{
                          headerShown: false,
                        }}>
                        {props => (
                          <RegistrationScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="RegistrationOTP"
                        options={{
                          headerShown: false,
                        }}>
                        {props => (
                          <RegistrationOTPScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="ForgotPassword"
                        options={{
                          headerShown: false,
                        }}>
                        {props => (
                          <ForgotPasswordScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="ResetPassword"
                        options={{
                          headerShown: false,
                        }}>
                        {props => (
                          <ResetPasswordScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="MobileNumberLogin"
                        options={{
                          headerShown: false,
                        }}>
                        {props => (
                          <MobileNumberLoginScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="MobileNumberOTP"
                        options={{
                          headerShown: false,
                        }}>
                        {props => (
                          <MobileNumberOTPScreen
                            setIsLoggedIn={setIsLoggedIn}
                            {...props}
                          />
                        )}
                      </Stack.Screen>
                    </>
                  )}
                </>
              )}
            </Stack.Navigator>
          </MyProvider>
        </InternetConnectionChecker>
      </NavigationContainer>
    </>
  );
}
