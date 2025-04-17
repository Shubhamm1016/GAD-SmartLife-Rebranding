import React, { useEffect } from 'react';
import Route from './Route';
import MyProvider from './Context/MyProvider';
import {useColorScheme} from 'react-native';
import{requestUserPermission,NotificationLister}  from "./screens/Notification/NotificationToken";
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const App = props => {
  // const darkTheme = {
  //   ...DefaultTheme,
  //   roundness: 2,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     primary: '#1A1A1A',
  //     accent: '#FAFAFA',
  //   },
  // };

  // const lightTheme = {
  //   ...DefaultTheme,
  //   roundness: 2,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     primary: '#FAFAFA',
  //     accent: '#1A1A1A',
  //   },
  // };
  // const scheme = useColorScheme();
  // console.log(scheme,"scheme");
  // useEffect(() => {
  //   // Request user permission for notifications
  //   requestUserPermission();
    
  //   // Set up notification listeners
  //   NotificationLister();
  // }, []);
  return (
    <>
      {/* <PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}> */}
        <MyProvider>
          <Route {...props} />
        </MyProvider>

      {/* </PaperProvider> */}

    </>
  );
};
export default App;
// import React from 'react';
// import { useColorScheme, Text } from 'react-native';
// import { DefaultTheme, Provider as PaperProvider, useTheme } from 'react-native-paper';

// // Define themes
// const darkTheme = {
//   ...DefaultTheme,
//   roundness: 2,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#2c6485',
//     accent: '#FAFAFA',
//   },
// };

// const lightTheme = {
  
//   ...DefaultTheme,
//   roundness: 2,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#FAFAFA',
//     accent: '#2c6485',
//   },
// };

// // MyComponent
// function MyComponent(props) {
//   const { colors } = useTheme();
//   return <Text style={{ color: colors.accent }}>Yo!</Text>;
// }

// // Main component
// export default function Main(props) {
//   const scheme = useColorScheme();
//   console.log(scheme, "scheme");
//   return (
//     <PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
//       <MyComponent {...props} />
//     </PaperProvider>
//   );
// }
