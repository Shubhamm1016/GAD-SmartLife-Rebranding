import RNFetchBlob from 'rn-fetch-blob';
import {Platform, PermissionsAndroid} from 'react-native';

/// grant permission in android
export const getDownloadPermissionAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'File Download Permission',
        message: 'Your permission is required to save Files to your device',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;
  } catch (err) {
    console.log('err', err);
  }
};

// export const downloadFile = async url => {
//   // Get the app's cache directory
//   const {config, fs} = RNFetchBlob;
//   // console.log(config,"config");
//   const cacheDir = fs.dirs.DownloadDir;
// console.log(cacheDir,"cacheDir");
//   // Generate a unique filename for the downloaded image
//   const filename = url.split('/').pop();
//   const imagePath = `${cacheDir}/${filename}`;

//   try {
//     // Download the file and save it to the cache directory
//     const configOptions = Platform.select({
//       ios: {
//         fileCache: true,
//         path: imagePath,
//         appendExt: filename.split('.').pop(),
//       },
//       android: {
//         fileCache: true,
//         path: imagePath,
//         appendExt: filename.split('.').pop(),
//         addAndroidDownloads: {
//           // Related to the Android only
//           useDownloadManager: true,
//           notification: true,
//           path: imagePath,
//           description: 'File',
//         },
//       },
//     });

//     const response = await RNFetchBlob.config(configOptions).fetch('GET', url);
//     console.log(response, 'response');
//     // Return the path to the downloaded file
//     return response;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

export const downloadFile = async (fileUrl) => {
  const { config, fs } = RNFetchBlob;
  let PictureDir = fs.dirs.PictureDir; // this is the pictures directory. You can check the available directories in the wiki.
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: PictureDir + "/me_" + Math.floor(Date.now() / 1000) + ".pdf",
      description: 'Downloading image.'
    }
  };

  return config(options)
    .fetch('GET', fileUrl)
    .then((res) => {
      return res;
    });
};
