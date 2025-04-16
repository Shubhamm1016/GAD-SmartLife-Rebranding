import axios from 'axios';
import {REACT_APP_BASEURL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function refreshToken() {
  // making an API call to refresh the toekn
  const refreshToken = await AsyncStorage.getItem('refreshtoken');
  const username = await AsyncStorage.getItem('email');
  if (!refreshToken || !username) {
    throw new Error('Missing refresh token or username');
  }
  const response = await axios.post(`${REACT_APP_BASEURL}/login2`, {
    username,
    refreshToken,
  });
  const token = response.data.accesstoken;
  await AsyncStorage.setItem('accesstoken', token);
  return token;
}
const apiAxios = axios.create({
  baseURL: REACT_APP_BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiAxios.interceptors.response.use(
  response => response,
  async error => {
    // console.log(error.response,"error ))))))))");
    if (error.response && error.response.status === 401) {
      try {
        const newToken = await refreshToken();
        apiAxios.defaults.headers.common.Authorization = `${newToken}`
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `${newToken}`;
        return apiAxios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default apiAxios;
