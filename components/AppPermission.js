import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check, request,PermissionsAndroid} from 'react-native-permissions';

const PLATFORM_CAMERA_PERMISSION = {
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
};

const REQUEST_PERMISSION_TYPE = {
  camera: PLATFORM_CAMERA_PERMISSION,
};

const PERMISSION_TYPE = {
  camera: 'camera',
};

class AppPermission {
  checkPermission = async (type) => {
    const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    if (!permission) {
      return true;
    }
    try {
      const result = await check(permission);
      // console.log(result, 'result');
      if (result === RESULTS.GRANTED) return true;
      return this.requestPermission(permission);
    } catch (error) {
      console.log(error, 'error');
      return false;
    }
  };

  requestPermission = async (permission) => {
    // console.log(permission, 'permission');
    try {
      const result = await request(permission);
      // console.log(result, 'result');
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log(error, 'error');
      return false;
    }
  };
}

const Permissions = new AppPermission();
export { Permissions, PERMISSION_TYPE };

export const getDownloadPermissionAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission Required',
        message: 'This app needs access to your storage to download files',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};