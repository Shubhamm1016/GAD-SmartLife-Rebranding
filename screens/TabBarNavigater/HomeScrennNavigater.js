import React, { useContext, useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../navigations/HomeScreen';
import AcFeatureScreen from '../AcFeature/AcFeatureScreen';
import AcFanScreen from '../AcFeature/AcFanScreen';
import { UserContext } from '../../Context/UserContext';
import { useIsFocused } from '@react-navigation/native';
const Stack = createStackNavigator();
const HomeScrennNavigater = props => {
  const {setIsLoggedIn} = props;
  const isFocused = useIsFocused();
  const {fetchAll} = useContext(UserContext);


  useEffect(() => {
    if (isFocused) {
      fetchAll(); // Refetch your data when the screen is focused
    }
  }, [isFocused]);
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
          title: 'Home Screen',
        }}>
        {props => <HomeScreen setIsLoggedIn={setIsLoggedIn} {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="AcFeatureScreen"
        options={{
          headerShown: false,
          title: 'Ac Feature Screen',
        }}>
        {props => <AcFeatureScreen setIsLoggedIn={setIsLoggedIn} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeScrennNavigater;
