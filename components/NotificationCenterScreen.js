import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {acceptrequest, declinerequest, sharingrequest} from '../Context/API';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InsideHeader from '../comman-compnent/InsideHeader';
import { GEGBold, GEGHeadline } from '../comman-compnent/FontFamily';

const NotificationCenterScreen = props => {
  const {navigation} = props;
  const [showNotificationData, setShowNotificationData] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(showNotificationData[0], 'showNotificationData');
  const notificationCount = showNotificationData.length;
  // console.log(notificationCount, 'notificationCountdddd');
  const notificationData = async () => {
    try {
      let token = await AsyncStorage.getItem('AccessToken');
      // console.log(token, '');
      let response = await sharingrequest(token);
      // console.log(response, 'responseresponse');
      setShowNotificationData([]);
      let i = 0;
      while (i < response.data.sharing_requests.length) {
        // console.log(
        //   response.data.sharing_requests[0].request_status,
        //   'response.data.sharing_requests.length',
        // );
        let email = response.data.sharing_requests[i].primary_user_name;
        let titte = response.data.sharing_requests[i].metadata.devices[0].name;
        let request_status = response.data.sharing_requests[i].request_status;
        let request_id = response.data.sharing_requests[i].request_id;
        let obj = {
          email,
          titte,
          request_status,
          request_id,
        };

        // console.log(obj, 'object');
        setShowNotificationData(prev => [...prev, obj]);
        i++;
      }
    } catch (err) {
      console.log(err.response.data.description, 'error');
    }
  };
  const ClickDecline = async request_id => {
    // console.log(request_id, 'ClickDecline');
    let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await declinerequest(token, request_id);
      // console.log(response, 'responseresponse');
      notificationData();
    } catch (err) {
      console.log(err.response.data.description, 'error hhhh');
    }
  };

  const ClickAccept = async request_id => {
    let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await acceptrequest(token, request_id);
      // console.log(response, 'responseresponse');
      notificationData();
    } catch (err) {
      console.log(err.response.data, 'errrrr');
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await notificationData();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Set loading state to false once data fetching is complete (regardless of success or failure)
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        // padding: 24,
        paddingHorizontal: 10,
      }}>
      <View>
        <InsideHeader
          title="Notification Center"
          onBackPress={() => navigation.goBack()} // Set your back action here
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          // paddingTop: 52,
          paddingVertical: 10,
          paddingStart: 10,
          paddingEnd: 10,
        }}>
        {/* {showNotificationData && showNotificationData.length > 0 ? (
        showNotificationData.map((ele, idx) => {
          if (ele.request_status != 'declined') {
            return (
              <View
                key={idx}
                style={{
                  backgroundColor: '#707070',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 8,
                  marginBottom: 10,
                }}>
                <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
                  <Text style={{color: '#fff', fontSize: 15}}>
                    {ele.email ? ele.email : 'email'} wants to share device{' '}
                    {ele.titte ? ele.titte : 'Ac on'} with you.
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      width: '40%',
                      backgroundColor: '#4D98FF',
                      alignItems: 'center',
                      paddingVertical: 8,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      ClickDecline(ele.request_id);
                    }}>
                    <Text style={{color: '#fff', fontSize: 15}}>Decline</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: '40%',
                      backgroundColor: '#6DB149',
                      alignItems: 'center',
                      paddingVertical: 8,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      ClickAccept(ele.request_id);
                    }}>
                    <Text style={{color: '#fff', fontSize: 15}}>Accept</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
        })
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>No notification</Text>
        </View>
      )} */}
        <View style={{flex: 1}}>
          {loading ? (
            // Show loader while data is being fetched
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#810055" />
            </View>
          ) : showNotificationData && showNotificationData.length > 0 ? (
            // Show notification data if available
            showNotificationData.map((ele, idx) => {
              if (ele.request_status !== 'declined') {
                return (
                  <View
                    key={idx}
                    style={{
                      backgroundColor: '#FFFFFF',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderRadius: 8,
                      marginBottom: 10,
                      elevation: 6,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                    }}>
                    <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
                      <Text style={{color: '#333333', fontSize: 15,fontFamily:GEGHeadline}}>
                        {ele.email ? ele.email : 'email'}  wants to share device{' '}
                        {ele.titte ? ele.titte : 'AC'} with you.
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                      }}>
                      <TouchableOpacity
                        style={{
                          width: '40%',
                          backgroundColor: '#810055',
                          alignItems: 'center',
                          paddingVertical: 8,
                          borderRadius: 10,
                        }}
                        onPress={() => {
                          ClickDecline(ele.request_id);
                        }}>
                        <Text style={{color: '#fff', fontSize: 15,fontFamily:GEGBold}}>
                          Decline
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: '40%',
                          backgroundColor: '#6DB149',
                          alignItems: 'center',
                          paddingVertical: 8,
                          borderRadius: 10,
                        }}
                        onPress={() => {
                          ClickAccept(ele.request_id);
                        }}>
                        <Text style={{color: '#fff', fontSize: 15,fontFamily:GEGBold}}>
                          Accept
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }
            })
          ) : (
            // Show message when no notification data is available
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>No notifications</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationCenterScreen;
