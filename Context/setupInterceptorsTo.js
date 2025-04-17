// Import necessary modules and setup interceptors
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_BASEURL } from '@env';

const API_URL = REACT_APP_BASEURL;

const onRequest = async (config) => {
  try {
    const token = await AsyncStorage.getItem('AccessToken');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
  } catch (error) {
    console.error('Error retrieving access token:', error);
  }
  return config;
};

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => {
  return response;
};
const onResponseError = async (error) => {
  console.log(error.response,"error.response.status");

  if (error.response) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await AsyncStorage.removeItem('AccessToken');
      try {
        const refreshToken = await AsyncStorage.getItem('refreshtoken');
        const username = await AsyncStorage.getItem('email');
        const rs = await axios.post(`${API_URL}login2`, {
          username,
          refreshToken,
        });
        const accessToken = rs.data?.accesstoken;
        if (accessToken) {
          await AsyncStorage.setItem('AccessToken', accessToken);
          // Retry the original request
          return axios(originalRequest);
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    }
  }
  return Promise.reject(error);
};

const setupInterceptorsTo = (axiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};

export default setupInterceptorsTo;
