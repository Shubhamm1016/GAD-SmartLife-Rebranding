import { NativeModules, Platform } from 'react-native';

// Access the NotificationModule from NativeModules
const { NotificationModule } = NativeModules;

class NotificationModuleWrapper {
  // Method to get the device token from native module
  static async getDeviceToken() {
    console.log('before calling getDeviceToken');
    if (NotificationModule && typeof NotificationModule.getDeviceToken === 'function') {
      try {
        // Call the native method and return the resolved promise
        const deviceToken = await NotificationModule.getDeviceToken();
        console.log('after calling getDeviceToken' + deviceToken);
        return deviceToken;
      } catch (error) {
        // Handle errors if any occur
        throw new Error('Failed to get device token: ' + error.message);
      }
    } else {
      throw new Error('NotificationModule is not available on this platform');
    }
  }

  // Add any other utility methods if required
}

export default NotificationModuleWrapper;
