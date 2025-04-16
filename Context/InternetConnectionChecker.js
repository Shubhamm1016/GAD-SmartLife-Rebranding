import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const InternetConnectionChecker = ({children}) => {
  const [isConnected, setIsConnected] = useState(true);
  const checkConnection = () => {
    NetInfo.fetch().then(state => {
      console.log(state,"state");
      console.log('Connection type:', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
    });
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log(state,"statestatestate");
      // console.log('Connection Type:', state.type);
      // if(state.type=== 'cellular'){
      //   console.log(state.details.cellularGeneration,"state.details.cellularGeneration");
      // }else{
        console.log('Is Connected:', state.isConnected);
        setIsConnected(state.isConnected);
      // }
   
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {isConnected ? (
        children
      ) : (
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/InternetConnection.png')}
              style={{width: '80%', height: 200, resizeMode: 'contain'}}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: '#000',
                marginTop: 20,
              }}>
              No Internet Connection
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#000',
                height: 50,
                width: 200,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}
              onPress={checkConnection}>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
              Refresh
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default InternetConnectionChecker;