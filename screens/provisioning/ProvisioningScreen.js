import {
  Text,
  View,
  Button,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
// import { AntDesign } from "@expo/vector-icons";
import AntDesign from 'react-native-vector-icons/AntDesign';
import LottieView from 'lottie-react-native';
import React, {useRef, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {jwtDecode} from 'jwt-decode';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ESPDevice} from '@orbital-systems/react-native-esp-idf-provisioning';
import {
  FifthProvisioning,
  FirstProvisioning,
  FourthProvisioning,
  SecondProvisioning,
  ThirdProvisioning,
} from '../../Context/API';
import InsideHeader from '../../comman-compnent/InsideHeader';

function ProvisioningScreen(props) {
  const {navigation, route} = props;
  const {
    serialNumber,
    userId,
    nodeid,
    espResponse,
    secretKey,
    stateName,
    city,
    selectedId,
  } = route.params;
  console.log(userId, 'userIduserIduserId*********');
  // const city = 'Pirangut';
  // const state = 'Maharashtra';
  const [locaticatin, setLocation] = useState(
    `esp.city:${city},esp.state:${stateName},esp.serial_num:${serialNumber}`,
  );
  console.log(locaticatin, 'locaticatin');
  const [credentials, setCredentials] = useState(false);
  const [credentialsColor, setCredentialsColor] = useState(false);
  const [connection, setConnection] = useState(false);
  const [connectionColor, setConnectionColor] = useState(false);
  const [configuration, setConfiguration] = useState(false);
  const [configurationColor, setConfigurationColor] = useState(false);
  const [deviceConnection, setDeviceConnection] = useState(false);
  const [deviceConnectionColor, setDeviceConnectionColor] = useState(false);
  const [device, setDevice] = useState(false);
  const [deviceColor, setDeviceColor] = useState(false);
  const [hide, setShow] = useState(true);
  const requestIds = new Map();
  const REQ_STATUS_TIME = 5000;
  var s1 = espResponse;
  console.log(s1, 's1');
  var s2 = s1.substring(1);
  console.log(s2, 's2');
  const animation = useRef(null);

  const FristApi = async () => {
    setCredentials(true);
    //  setShow(true)
    try {
      let token = await AsyncStorage.getItem('AccessToken');
      setTimeout(async () => {
        try {
          let response = await FirstProvisioning(
            token,
            nodeid,
            secretKey,
            // userId,
            locaticatin,
          );
          console.log(response.data.request_id, 'response');

          if (response.data.request_id) {
            const request_id = response.data.request_id;
            secondAPI(request_id, nodeid);
            setCredentialsColor(true);
            // setShow(true)
          } else {
            console.log('request_id not found');
          }
        } catch (err) {
          console.log(err, 'errerrerrerrerr');
        } finally {
          setCredentials(false);
          // setShow(false)
        }
      }, 2000);
    } catch (err) {
      console.log(err, 'errerrerrerrerr');
      setCredentials(false);
    }
  };

  const secondAPI = async (request_id, nodeid) => {
    setConnection(true);
    console.log(request_id, 'request_id');
    await AsyncStorage.setItem('request_id', request_id);
    let requestId = await AsyncStorage.getItem('request_id');
    console.log('requestId&&&&&&&&', requestId);
    const name = requestIds.set(nodeid, request_id);

    const getUserNodeMappingStatusTask = () => {
      if (requestIds.size > 0) {
        console.log('run_debugg: ' + requestIds.size);

        for (let [key, value] of requestIds) {
          console.log('run_debugg:_key ' + key);
          console.log('run_debugg:_value ' + value);

          let nodeId = key;
          let requestId = value;

          console.log('run_debugg:_nodeId ' + nodeId);
          console.log('run_debugg:_requestId ' + requestId);

          // Assuming getAddNodeRequestStatus and getUserNodeMappingStatus are defined elsewhere
          getAddNodeRequestStatus(nodeId, requestId);
        }
        getUserNodeMappingStatus();
      } else {
        console.log('No request id is available to check status');
        clearTimeout(getUserNodeMappingStatusTask, 0);
      }
    };

    function getUserNodeMappingStatus() {
      setTimeout(getUserNodeMappingStatusTask, REQ_STATUS_TIME);
    }
    // Set a timeout to execute the task
    const timeoutId = setTimeout(getUserNodeMappingStatusTask, 0);
    console.log(timeoutId, 'timeoutIdtimeoutIdtimeoutId');
    // To add a request ID to the map:
    requestIds.set(nodeid, request_id);
    // To remove a request ID from the map:
    // hashMap.delete("nodeId");
    console.log(name);
    setConnection(true);
    return;
  };

  const getAddNodeRequestStatus = async (nodeId, requestId) => {
    const request_id = requestId;
    try {
      let token = await AsyncStorage.getItem('AccessToken');
      console.log(token, 'token');
      // Simulate loading delay using setTimeout
      setTimeout(async () => {
        try {
          let response = await SecondProvisioning(token, request_id);
          // {"request_status": "requested"} respons>>>>>>> time out
          console.log(response.data, 'request_status');
          if (response.data.request_status === 'confirmed') {
            console.log('hello');
            requestIds.delete(nodeId);
            checkStatus(nodeId);
            setConnectionColor(true);
          } else if (response.data.request_status === 'timedout') {
            console.log('hyy');
            requestIds.delete(nodeId);
            requestIds.clear(); //
          }
        } catch (err) {
          console.log(err, 'errerrerrerrerr');
        } finally {
          setConnection(false);
        }
      }, 2000); // Simulating a 2-second delay
    } catch (err) {
      console.log(err);
      setConnection(false);
    }
  };

  const checkStatus = async nodeId => {
    setConfiguration(true); // Set isLoading to true when starting the API call
    console.log(nodeId, 'nodeid');
    try {
      let token = await AsyncStorage.getItem('AccessToken');
      console.log(token, 'token');
      // Simulate loading delay using setTimeout
      setTimeout(async () => {
        try {
          let response = await ThirdProvisioning(token, nodeId);
          // {"request_status": "requested"} respons>>>>>>> time out
          console.log(response.data, 'respons>>>>>>> time out');
          ConnectNodeIdData(nodeid);
          setConfigurationColor(true);
        } catch (err) {
          console.log(err);
        } finally {
          setConfiguration(false); // Set isLoading to false when API call is done
        }
      }, 2000); // Simulating a 2-second delay
    } catch (err) {
      console.log(err);
      setConfiguration(false); // Set isLoading to false in case of an error
    }
  };

  const ConnectNodeIdData = async nodeid => {
    setDeviceConnection(true); // Set isLoading to true when starting the API call

    try {
      let token = await AsyncStorage.getItem('AccessToken');
      console.log(token, 'token');
      // Simulate loading delay using setTimeout
      setTimeout(async () => {
        try {
          let response = await FourthProvisioning(token, nodeid);
          // {"request_status": "requested"} respons>>>>>>> time out
          console.log(response.data, 'respons>>>>>>> time out');
          UpdatingParamValue();
          setDeviceConnectionColor(true);
        } catch (err) {
          console.log(err);
        } finally {
          setDeviceConnection(false); // Set isLoading to false when API call is done
        }
      }, 2000); // Simulating a 2-second delay
    } catch (err) {
      console.log(err);
      setDeviceConnection(false); // Set isLoading to false in case of an error
    }
  };

  const UpdatingParamValue = async () => {
    setDevice(true); // Set isLoading to true when starting the API call
    try {
      let token = await AsyncStorage.getItem('AccessToken');
      console.log(token, 'token');
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      console.log('Time zone id: ' + tz);
      // Simulate loading delay using setTimeout
      setTimeout(async () => {
        try {
          // Make API call
          let response = await FifthProvisioning(token, nodeid, tz);
          // {"request_status": "requested"} respons>>>>>>> time out
          console.log(response.data, 'respons>>>>>>> time out');
          setDeviceColor(true);
          setShow(true);
          navigation.navigate('DeviceConnected', {stateName, selectedId});
        } catch (err) {
          console.log(err);
        } finally {
          setDevice(false);
          setShow(false); // Set isLoading to false when API call is done
        }
      }, 2000); // Simulating a 2-second delay
    } catch (err) {
      console.log(err);
      setDevice(false); // Set isLoading to false in case of an error
    }
  };

  function successfullyConnected() {

    navigation.navigate('DeviceConnected', {stateName, selectedId});
  }

  useEffect(() => {
    FristApi();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.layoutTop}>
        {/* <Pressable
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'red',  
          }}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>

        <View style={styles.textLayout}>
          <Text style={styles.textStyle}>Device provisioning</Text>
        </View> */}
        <View>
          <InsideHeader
            title="Device Provisioning"
            onBackPress={() => navigation.goBack()} // Set your back action here
          />
        </View>
      </View>

      <View style={styles.animationContainer}>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'white',
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require('../../assets/animation.json')}
        />
      </View>

      <View>
        <View style={styles.dataLayout}>
          <View>
            <Text style={styles.title}>Verifying Wi-Fi credentials</Text>
            {/* <Text style={styles.subTitle}>message</Text> */}
          </View>

          <View style={{justifyContent: 'center'}}>
            {credentials ? (
              <ActivityIndicator size="small" color="#810055" />
            ) : (
              <AntDesign
                name="checkcircle"
                size={24}
                color={credentialsColor ? '#810055' : 'gray'}
              />
            )}
          </View>
        </View>

        <View style={styles.dataLayout}>
          <View>
            <Text style={styles.title}>Verifying Wi-Fi connection</Text>
            {/* <Text style={styles.subTitle}>message</Text> */}
          </View>

          <View style={{justifyContent: 'center'}}>
            {connection ? (
              <ActivityIndicator size="small" color="#810055" />
            ) : (
              <AntDesign
                name="checkcircle"
                size={24}
                color={connectionColor ? '#810055' : 'gray'}
              />
            )}
          </View>
        </View>

        <View style={styles.dataLayout}>
          <View>
            <Text style={styles.title}>Verifying device configuration</Text>
            {/* <Text style={styles.subTitle}>message</Text> */}
          </View>

          <View style={{justifyContent: 'center'}}>
            {configuration ? (
              <ActivityIndicator size="small" color="#810055" />
            ) : (
              <AntDesign
                name="checkcircle"
                size={24}
                color={configurationColor ? '#810055' : 'gray'}
              />
            )}
          </View>
        </View>

        <View style={styles.dataLayout}>
          <View>
            <Text style={styles.title}>Verifying device connection</Text>
            {/* <Text style={styles.subTitle}>message</Text> */}
          </View>

          <View style={{justifyContent: 'center'}}>
            {deviceConnection ? (
              <ActivityIndicator size="small" color="#810055" />
            ) : (
              <AntDesign
                name="checkcircle"
                size={24}
                color={deviceConnectionColor ? '#810055' : 'gray'}
              />
            )}
          </View>
        </View>

        <View style={styles.dataLayout}>
          <View>
            <Text style={styles.title}>Setting up your device</Text>
            {/* <Text style={styles.subTitle}>message</Text> */}
          </View>

          <View style={{justifyContent: 'center'}}>
            {device ? (
              <ActivityIndicator size="small" color="#810055" />
            ) : (
              <AntDesign
                name="checkcircle"
                size={24}
                color={deviceColor ? '#810055' : 'gray'}
              />
            )}
          </View>
        </View>
      </View>

      {/* {hide === true ? (
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={['#810055', '#810055']}
            style={[styles.appButtonContainer]}>
            <Text style={styles.appButtonText}>Connect</Text>
          </LinearGradient>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={successfullyConnected}>
            <LinearGradient
              colors={['#810055', '#810055']}
              style={[styles.appButtonContainer]}>
              <Text style={styles.appButtonText}>Connect</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )} */}
    </SafeAreaView>
  );
}

export default ProvisioningScreen;

const styles = StyleSheet.create({
  textLayout: {
    flex: 1,
    // marginStart: 10,
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
    // marginStart: 12,
    // marginEnd: 12,
    marginTop: 12,
  },
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 18,
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maintext: {
    fontSize: 16,
    marginTop: 50,
    color: '#bf1106',
    fontWeight: 'bold',
  },
  appButtonContainer: {
    elevation: 8,
    marginTop: 50,
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 16,
    height: 55,
    justifyContent: 'center',
    width: 360,
  },
  appButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    color: '#333333',
    alignSelf: 'flex-start',
  },
  subTitle: {
    fontSize: 10,
    color: 'red',
    alignSelf: 'flex-start',
  },
  dataLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
