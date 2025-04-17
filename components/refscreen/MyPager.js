import React, {useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Pressable,
  Image,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import debounce from 'lodash.debounce';
import AntDesign from 'react-native-vector-icons/AntDesign';
import twantitowImage from '../../assets/RefImage/twantitow.png';
import {RadialSlider} from 'react-native-radial-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {switchButton} from '../../Context/API';
const MyPager = props => {
  const {
    navigation,
    name,
    Convertible_Mode,
    Fridge_Temp,
    Freezer_Temp,
    Ref_Mode,
    setState,
    id,
  } = props;
  console.log(Ref_Mode, 'Ref_Mode');

  const images = [
    {id: 1, image: require('../../assets/RefImage/firstImg.png')},
    {id: 2, image: require('../../assets/RefImage/secondImg.png')},
    {id: 3, image: require('../../assets/RefImage/threeImg.png')},
    {id: 4, image: require('../../assets/RefImage/threeImg.png')},
    {id: 5, image: require('../../assets/RefImage/forthImg.png')},
    {id: 6, image: require('../../assets/RefImage/sixImg.png')},
  ];

  const Freezerimages = [
    {id: 1, image: require('../../assets/RefImage/nagitveTow.png')},
    {id: 2, image: require('../../assets/RefImage/nagitivetwontee.png')},
    {id: 3, image: require('../../assets/RefImage/negtiveEiteen.png')},
    {id: 4, image: require('../../assets/RefImage/negtiveEiteen.png')},
    {id: 5, image: require('../../assets/RefImage/negitiveSeventeen.png')},
    {id: 6, image: require('../../assets/RefImage/negtiveSecteen.png')},
  ];

  const [backgroundImage, setBackgroundImage] = useState(images[0]?.image);
  const [FreezerbackgroundImage, setFreezerBackgroundImage] = useState(
    Freezerimages[0]?.image,
  );
  const downGread = useMemo(
    () =>
      debounce(async newTemp => {
        console.log(newTemp, 'newTemp');
        if (newTemp >= 1 && newTemp <= images.length) {
          if (newTemp !== 3) {
            try {
              const token = await AsyncStorage.getItem('AccessToken');
              if (!token) throw new Error('Access token is missing.');
              const state = 'Refrigerator';
              const key = 'Fridge_Temp';
              const newState = newTemp;

              const response = await switchButton(
                state,
                token,
                id,
                newState,
                key,
              );

              if (response?.data) {
                // setState({ Fridge_Temp: newState });
                handleImageChange(newTemp);
              } else {
                throw new Error('Invalid response from the API.');
              }
            } catch (err) {
              console.error(
                err?.response?.data || err.message,
                'Error in handleImageChange',
              );
            }
          } else {
            console.log('no data send ');
          }
        } else {
          console.log(newTemp, 'out of range');
        }
      }, 300),
    [id, images.length],
  );

  const handleImageChange = newId => {
    const selectedImage = images.find(img => img.id === newId);
    if (selectedImage) {
      setBackgroundImage(selectedImage.image);
    }
  };

  const FreezerdownGread = useMemo(
    () =>
      debounce(async newTemp => {
        console.log(newTemp, 'newTemp');
        // if (newTemp >= 1 && newTemp <= images.length) {
        //   if (newTemp !== 3) {
        try {
          const token = await AsyncStorage.getItem('AccessToken');
          if (!token) throw new Error('Access token is missing.');
          const state = 'Refrigerator';
          const key = 'Freezer_Temp';
          const newState = newTemp;

          const response = await switchButton(state, token, id, newState, key);

          if (response?.data) {
            // setState({ Fridge_Temp: newState });
            FreezerhandleImageChange(newTemp);
          } else {
            throw new Error('Invalid response from the API.');
          }
        } catch (err) {
          console.error(
            err?.response?.data || err.message,
            'Error in handleImageChange',
          );
        }
        //   } else {
        //     console.log('no data send ');
        //   }
        // } else {
        //   console.log(newTemp, 'out of range');
        // }
      }, 300),
    [id, images.length],
  );

  const FreezerhandleImageChange = newId => {
    const selectedImage = images.find(img => img.id === newId);
    if (selectedImage) {
      setFreezerBackgroundImage(selectedImage.image);
    }
  };

  useEffect(() => {
    const matchingImage = images.find(
      img => img.id === Number(Fridge_Temp),
    )?.image;
    if (matchingImage) {
      setBackgroundImage(matchingImage);
    }
  }, [Fridge_Temp]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/RefImage/RefFetcherImage.png')}
        style={{
          width: '100%',
          height: 290,
          resizeMode: 'contain',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            style={{
              height: 50,
              width: 50,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
          </Pressable>

          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                color: '#FFFFFF',
                fontWeight: '500',
                justifyContent: 'center',
              }}>
              {name}
            </Text>
          </View>
        </View>
        <PagerView style={styles.pagerView} initialPage={0}>
          <View
            key="1"
            style={{
              flex: 1,
              //   top: 50,
              width: '100%',
              //   height: 180,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            {/* <View
              style={{
                height: 145,
                position: 'absolute',
                overflow: 'hidden',
                alignItems: 'center',
                width: '100%',
              }}>
                 {Convertible_Mode === 'RR'?(<Text>shubham</Text>):(<Text>malviya</Text>)}
              <Image
                style={{
                  position: 'absolute',
                  width: '40%',
                  height: 180,
                  resizeMode: 'contain',
                }}
                source={backgroundImage}
              />

              <RadialSlider
                value={Fridge_Temp}
                min={1}
                max={6}
                // onChange={downGread}
                radius={80}
                unit="°C"
                thumbRadius={12}
                thumbColor="#2E73D3"
                thumbBorderWidth={2}
                thumbBorderColor="#fff"
                markerLineSize={20}
                sliderWidth={15}
                sliderTrackColor="#E5E5E5"
                lineColor="#E5E5E5"
                lineSpace={16}
                linearGradient={[
                  {offset: '0%', color: '#4D98FF'},
                  {offset: '25%', color: '#6DB149'},
                  {offset: '55%', color: '#FBA905'},
                  {offset: '100%', color: '#ff0000'},
                ]}
                subTitle=""
                isHideSubtitle
                isHideButtons
                isHideLines
                isHideTailText
                //   isHideSlider={state.Power ? false : true}
              />
            </View> */}
            {Ref_Mode === 'Regular' ? (
              <>
                {Convertible_Mode === 'FR' || Convertible_Mode === 'RR' ? (
                  <View
                    style={{
                      height: 145,
                      position: 'absolute',
                      overflow: 'hidden',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    {/* <Text>shubham</Text> */}
                    <Image
                      style={{
                        position: 'absolute',
                        width: '40%',
                        height: 180,
                        resizeMode: 'contain',
                      }}
                      source={backgroundImage}
                    />
                    <RadialSlider
                      value={Fridge_Temp}
                      min={1}
                      max={6}
                      radius={80}
                      unit="°C"
                      thumbRadius={12}
                      thumbColor="#2E73D3"
                      thumbBorderWidth={2}
                      thumbBorderColor="#fff"
                      markerLineSize={20}
                      sliderWidth={15}
                      sliderTrackColor="#E5E5E5"
                      lineColor="#E5E5E5"
                      lineSpace={16}
                      linearGradient={[
                        {offset: '0%', color: '#4D98FF'},
                        {offset: '25%', color: '#6DB149'},
                        {offset: '55%', color: '#FBA905'},
                        {offset: '100%', color: '#ff0000'},
                      ]}
                      subTitle=""
                      isHideSubtitle
                      isHideButtons
                      isHideLines
                      isHideTailText
                    />
                  </View>
                ) : null}
              </>
            ) : null}
          </View>
          <View key="2" style={styles.page}>
            {Ref_Mode === 'Regular' ? <Text>shubham</Text> : null}
            <Text style={styles.text}>Freezer</Text>
            <View
              key="1"
              style={{
                flex: 1,
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <View
                style={{
                  height: 145,
                  position: 'absolute',
                  overflow: 'hidden',
                  alignItems: 'center',
                  width: '100%',
                }}>
                {Convertible_Mode === 'RR' || Convertible_Mode === 'R0' ? (
                  <>
                    <View
                      key="1"
                      style={{
                        flex: 1,
                        //   top: 50,
                        width: '100%',
                        //   height: 180,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}>
                      <View
                        style={{
                          height: 145,
                          position: 'absolute',
                          overflow: 'hidden',
                          alignItems: 'center',
                          width: '100%',
                        }}>
                        <Image
                          style={{
                            position: 'absolute',
                            width: '40%',
                            height: 180,
                            resizeMode: 'contain',
                          }}
                          source={backgroundImage}
                        />
                        <RadialSlider
                          value={Freezer_Temp}
                          min={1}
                          max={6}
                          radius={80}
                          // onChange={FreezerdownGread}
                          unit="°C"
                          thumbRadius={12}
                          thumbColor="#2E73D3"
                          thumbBorderWidth={2}
                          thumbBorderColor="#fff"
                          markerLineSize={20}
                          sliderWidth={15}
                          sliderTrackColor="#E5E5E5"
                          lineColor="#E5E5E5"
                          lineSpace={16}
                          linearGradient={[
                            {offset: '0%', color: '#4D98FF'},
                            {offset: '25%', color: '#6DB149'},
                            {offset: '55%', color: '#FBA905'},
                            {offset: '100%', color: '#ff0000'},
                          ]}
                          subTitle=""
                          isHideSubtitle
                          isHideButtons
                          isHideLines
                          isHideTailText
                        />
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    <Image
                      style={{
                        position: 'absolute',
                        width: '40%',
                        height: 180,
                        resizeMode: 'contain',
                      }}
                      source={FreezerbackgroundImage}
                    />
                    <RadialSlider
                      value={Freezer_Temp}
                      min={-22}
                      max={-16}
                      radius={80}
                      //   onChange={FreezerdownGread}
                      unit="°C"
                      thumbRadius={12}
                      thumbColor="#2E73D3"
                      thumbBorderWidth={2}
                      thumbBorderColor="#fff"
                      markerLineSize={20}
                      sliderWidth={15}
                      sliderTrackColor="#E5E5E5"
                      lineColor="#E5E5E5"
                      lineSpace={16}
                      linearGradient={[
                        {offset: '0%', color: '#4D98FF'},
                        {offset: '25%', color: '#6DB149'},
                        {offset: '55%', color: '#FBA905'},
                        {offset: '100%', color: '#ff0000'},
                      ]}
                      subTitle=""
                      isHideSubtitle
                      isHideButtons
                      isHideLines
                      isHideTailText
                    />
                  </>
                )}
              </View>
            </View>
          </View>
        </PagerView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Optional background color for better readability
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 15, // Padding as a percentage of the screen size
  },
  text: {
    fontSize: 15, // Text size based on percentage (relative scaling)
    color: '#333',
    textAlign: 'center',
  },
});

export default MyPager;
