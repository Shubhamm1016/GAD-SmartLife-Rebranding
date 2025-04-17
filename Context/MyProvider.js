import React, {useEffect, useState} from 'react';
import {UserContext} from './UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetUserData, manageGroup, mobileDeleteEndPoint, OtpVerifyToDeleteUser} from './API';

const MyProvider = ({children}) => {
  const [user, setUserData] = useState([]);
  const [acFeature, setAcFeature] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch user data on load
  // const userData = async () => {
  //   let token = await AsyncStorage.getItem('AccessToken');
  //   try {
  //     let response = await GetUserData(token);
  //     setUserData(response.data?.user_data?.value ?? response.data);
  //     setIsLoggedIn(true);
  //   } catch (err) {
  //     setIsLoggedIn(false);
  //     console.log(err.response.data.message);
  //     console.log(
  //       err.response?.data?.description || 'Error fetching user data',
  //     );
  //   }
  // };
  const userData = async () => {
    try {
      let token = await AsyncStorage.getItem('AccessToken');

      if (!token) {
        return;
      }

      let response = await GetUserData(token);

      if (!response || !response.data) {
        console.log('Invalid response structure');
        return;
      }

      const userData = response.data?.user_data?.value ?? response.data;
      setUserData(userData);
      setIsLoggedIn(true);
    } catch (err) {
      setIsLoggedIn(false);

      if (err.message.includes('SSL error')) {
        console.log(
          'SSL Error: Secure connection to the server could not be made.',
        );
      } else if (err.response) {
        console.log(
          `Server responded with status: ${err.response.status}`,
          err.response.data,
        );
      } else if (err.request) {
        // No response received from server
        console.log('No response received from server', err.request);
      } else {
        // Other general errors
        console.log('Error fetching user data:', err.message);
      }
    }
  };

  // Delete the device token from the server
  const deleteDeviceToken = async () => {
    try {
      const mobileDeviceToken = await AsyncStorage.getItem('deviceToken');
      console.log(
        mobileDeviceToken,
        '..............mobileDeviceTokenmobileDeviceTokenmobileDeviceTokenmobileDeviceToken',
      );

      const platformEndpointArn = await AsyncStorage.getItem(
        'PlatformEndpointArn',
      );

      console.log(
        platformEndpointArn,
        '........platformEndpointArnplatformEndpointArn',
      );
      const token = await AsyncStorage.getItem('AccessToken');

      // Ensure all required data is available before making the API request
      if (!mobileDeviceToken || !platformEndpointArn || !token) {
        console.log('Required data missing to delete device token');
        return; // Exit if any value is missing
      }
      // Call the API to delete the device token
      const response = await mobileDeleteEndPoint(
        mobileDeviceToken,
        token,
        platformEndpointArn,
      );
      console.log('API Response:', response.data);

      if (response.data?.status === 'success') {
        console.log(
          response.data?.status,
          'Device token deleted successfully from the server',
        );

        // Remove the device token and platform endpoint data from AsyncStorage
        await AsyncStorage.removeItem('deviceToken');
        await AsyncStorage.removeItem('PlatformEndpointArn');
        console.log('Device token and platform ARNs removed from AsyncStorage');
      } else {
        console.log(
          'Failed to delete device token:',
          response.data?.description,
        );
      }
    } catch (err) {
      console.error(
        'Error during token deletion:',
        err.response ? err.response.data : err.message,
      );
    }
  };

  // Logout function to clear user data and device tokens
  // const logout = async () => {
  //   try {
  //     // Delete device token before logging out
  //     await deleteDeviceToken();

  //     // Clear other user-related data from AsyncStorage
  //     await AsyncStorage.removeItem('email');
  //     await AsyncStorage.removeItem('AccessToken');
  //     await AsyncStorage.removeItem('TokenId');
  //     await AsyncStorage.removeItem('refreshtoken');
  //     await AsyncStorage.removeItem('addImg');
  //     await AsyncStorage.removeItem('deviceToken');
  //     await AsyncStorage.removeItem('PlatformEndpoint'); // Ensure ARN is also removed
  //     await AsyncStorage.clear();

  //     // Reset the state and set logged out
  //     setAcFeature([]);
  //     setIsLoggedIn(false);
  //     console.log('Device Token removed after logout');
  //   } catch (err) {
  //     console.log('Error during logout:', err);
  //   }
  // };

  const logout = async () => {
    try {
      await deleteDeviceToken()
      await AsyncStorage.multiRemove([
        'email',
        'AccessToken',
        'TokenId',
        'refreshtoken',
        'addImg',
        'deviceToken',
        'PlatformEndpointArn',
        'PlatformApplicationArn',
      ]);
      setAcFeature([]);
      setIsLoggedIn(false);
      // await deleteDeviceToken();
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  // const deleteAccountOTPVerify = async (verificationcode) => {
  //   let token = await AsyncStorage.getItem('AccessToken');
  //   try {
  //     let response = await OtpVerifyToDeleteUser(token, verificationcode);
  //     console.log(response.status, 'response');
  //     await AsyncStorage.multiRemove([
  //       'email',
  //       'AccessToken',
  //       'TokenId',
  //       'refreshtoken',
  //       'addImg',
  //       'deviceToken',
  //       'PlatformEndpointArn',
  //       'PlatformApplicationArn',
  //     ]);
  //     setAcFeature([]);
  //     setIsLoggedIn(false);
  //     await deleteDeviceToken();
  //   } catch (err) {
  //     console.error('Error during logout:', err);
  //   }
  // };

  // Fetch additional data from the server
  
  const fetchAll = async () => {
    if (!isLoggedIn) {
      return;
    }
    let token = await AsyncStorage.getItem('AccessToken');
    // setAcFeature([]);
    console.log("shubham call myProvider to");
    
    try {
      let response = await manageGroup(token);
      if (response.data.nodes.length == 0) return [];
      if (response && response.data && response.data.node_details) {
        setAcFeature([]);
        let i = 0;
        while (i < response.data.node_details.length) {
          let alldata = response.data.node_details[i];
          let obj = {
            alldata,
          };
          setAcFeature(prev => {
            const currentArray = prev || [];
            const newArray = [...currentArray, obj];
            return newArray;
          });
          i++;
        }
      } else {
        console.error('Invalid or missing data in response from manageGroup');
      }
    } catch (err) {
      setAcFeature([]);
      console.log(
        err.response.data.message || err.response?.data?.description?.status,
      );
      console.log(
        err.response?.data?.description?.status || 'Node Details error',
      );
    }
  };

  useEffect(() => {
    userData();
  }, []);

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    return () => {
      setAcFeature([]);
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        userData,
        fetchAll,
        acFeature,
        isLoggedIn,
        setIsLoggedIn,
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default MyProvider;
