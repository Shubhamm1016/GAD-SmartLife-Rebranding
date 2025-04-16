import React, {useState} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import OnBaordingGodrejHeader from '../../comman-compnent/OnBaordingGodrejHeader';
import { GEGHeadline } from '../../comman-compnent/FontFamily';

const {width, height} = Dimensions.get('window');
const COLORS = {primary: '#ffffff', white: '#810055'};
const colors = {primary: '#ffffff', white: '#333333'};

const slides = [
  {
    id: '1',
    image: require('../../assets/threeslider.png'),
    // title: 'Smart Life',
    subtitle:
    'Now Control your Appliance\nwith sGodrejSmartlife from anywhere',
  },
  {
    id: '2',
    image: require('../../assets/twoslider.png'),
    // title: 'Smart Life',
    subtitle: 'Stay updated with Live running \nstatus of your \nAppliance',
  },
  {
    id: '3',
    image: require('../../assets/oneslider.png'),
    // title: 'Smart Life',
    subtitle: 'Not to worry if you forgot \nto power-off your devices',
  },
  {
    id: '4',
    image: require('../../assets/fourslider.png'),
    // title: 'Smart Life',
    subtitle: 'Monitor and track stats & consumption \nthrough analytics',
  },
  // {
  //   id: '5',
  //   image: require('../../assets/fourslider.png'),
  //   // title: 'Smart Life',
  //   subtitle: 'Kindly ensure your product\nhas this sticker mark.\nOnly products having this sticker\nwill connect to this APP',
  // },
];

const Slide = ({item}) => {
  return (
    <View>
      <OnBaordingGodrejHeader />
      <View style={{alignItems: 'center'}}>
        <Image
          source={item?.image}
          style={{height: '65%', width, resizeMode: 'contain'}}
        />
        <View>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.subtitle}>{item?.subtitle}</Text>
        </View>
      </View>
    </View>
  );
};

const OnBoardingScreen = ({navigation, onDone}) => {
  const [loading, setLoading] = useState(false);
  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = ({onDone}) => {
    return (
      // <View
      //   style={{
      //     flex: 1,
      //     // height: height * 0.25,
      //     // justifyContent: 'space-between',
      //     // paddingHorizontal: 20,
      //     // backgroundColor: 'red',
      //   }}>
      //   <View style={{paddingHorizontal: 20, marginBottom: 10}}>
      //     {currentSlideIndex == slides.length - 1 ? (
      //       <View style={{height: 50}}>
      //         <TouchableOpacity
      //           style={styles.btn}
      //           onPress={() => {
      //             // navigation.replace('Login')
      //             onDone();
      //           }}>
      //           <Text
      //             style={{fontWeight: 'bold', fontSize: 15, color: 'white'}}>
      //             Let's get started!
      //           </Text>
      //         </TouchableOpacity>
      //       </View>
      //     ) : (
      //       <View
      //         style={{
      //           alignItems: 'center',
      //           flexDirection: 'row',
      //           justifyContent: 'space-between', // This will space out the elements evenly
      //           width: '100%',
      //           // Ensure that the container stretches across the width
      //         }}>
      //         {/* Skip Button (on the left) */}
      //         <TouchableOpacity
      //           activeOpacity={0.8}
      //           onPress={skip}
      //           style={styles.btnNext}>
      //           <Text
      //             style={{
      //               fontWeight: 'bold',
      //               fontSize: 16,
      //               color: COLORS.white,
      //               left: 25,
      //             }}>
      //             Skip to Login
      //           </Text>
      //         </TouchableOpacity>
      //         <TouchableOpacity>
      //           <Image
      //             source={require('../../assets/foward.png')}
      //             style={{
      //               height: 60,
      //               width: 60,
      //               resizeMode: 'contain',
      //               alignSelf: 'flex-end',
      //               left: 200,
      //               // marginTop: 50,
      //             }}
      //           />
      //         </TouchableOpacity>

      //         {/* Dots/Indicators */}
      //         <View
      //           style={{
      //             flexDirection: 'row',
      //             justifyContent: 'center',
      //             alignItems: 'center',
      //           }}>
      //           {slides.map((_, index) => (
      //             <View
      //               key={index}
      //               style={[
      //                 styles.indicator,
      //                 currentSlideIndex == index && {
      //                   backgroundColor: '#810055', // Active color
      //                   width: 20, // Bigger size for active dot
      //                   height: 20, // Bigger size for active dot
      //                   borderRadius: 15, // Half of width/height to make it a circle
      //                 },
      //               ]}
      //             />
      //           ))}
      //         </View>

      //         {/* Next Button */}
      //         <TouchableOpacity
      //           activeOpacity={0.8}
      //           style={[
      //             styles.btn,
      //             {
      //               backgroundColor: 'transparent',
      //             },
      //           ]}
      //           onPress={goToNextSlide}>
      //           <Text
      //             style={{
      //               fontSize: 14,
      //               color: COLORS.white,
      //               borderColor: '#707070',
      //               width: 20,
      //               height: 20,
      //               borderRadius: 15,
      //             }}>
      //             {/* Next */}
      //           </Text>
      //         </TouchableOpacity>
      //       </View>
      //     )}
      //   </View>
      // </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          // Add any other necessary properties for layout, if required
        }}>
        <View style={{marginBottom: 10}}>
          {currentSlideIndex === slides.length - 1 ? (
            <View
              style={{
                height: 50,
                width: '60%', // 60% of the width
                alignSelf: 'center', // Centers the View horizontally
                alignContent: 'flex-end',
                alignSelf: 'flex-end',
              }}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {backgroundColor: '#810055', paddingVertical: 10},
                ]} // Adding custom padding to button
                onPress={() => {
                  // navigation.replace('Login')
                  onDone();
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: 'white',
                    textAlign: 'center', // Ensures the text is centered within the button
                  }}>
                  Let's get started!
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between', // Space elements evenly
                width: '100%', // Full width
              }}>
              {/* Skip Button (on the left) */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={skip}
                style={{flex: 1, alignItems: 'flex-start'}} // Align left side
              >
                <Text
                  style={{
                    fontFamily:GEGHeadline,
                    fontSize: 16,
                    color: COLORS.white,
                    marginLeft: 25, // Left margin for spacing
                  }}>
                  Skip to Login
                </Text>
              </TouchableOpacity>

              {/* Forward Button (on the right) */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'flex-end', // Align right side
                }}
                onPress={goToNextSlide}>
                <Image
                  source={require('../../assets/foward.png')}
                  style={{
                    height: 60,
                    width: 60,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          
          {/* Dots/Indicators */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 30,
              paddingHorizontal: 20,
              left: 50, // Adding vertical margin between indicators and buttons
            }}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentSlideIndex === index && {
                    backgroundColor: '#810055', // Active color
                    width: 20, // Bigger size for active dot
                    height: 20, // Bigger size for active dot
                    borderRadius: 15, // Circle shape
                  },
                ]}
              />
            ))}
          </View>

          {/* Next Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.btn,
              {
                backgroundColor: 'transparent',
                marginTop: 20, // Space between the dots and next button
              },
            ]}
            onPress={goToNextSlide}>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.white,
                borderColor: '#707070',
                width: 20,
                height: 20,
                borderRadius: 15,
              }}>
              {/* Next */}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.primary, width: '100%'}}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.75}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer onDone={onDone} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: colors.white,
    fontSize: 20,
    marginTop: 10,
    maxWidth: '90%',
    fontFamily:GEGHeadline,
    lineHeight: 28,
  },
  title: {
    color: '#4BB6E8',
    fontSize: 30,
    marginTop: 42,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 12,
    width: 12,
    backgroundColor: '#E6E6E6',
    marginHorizontal: 8,
    borderRadius: 10,
    borderColor: '#707070',
    bottom: 80,
    right: 150,
  },
  btn: {
    backgroundColor: '#810055', // Button background color
    borderRadius: 25, // Smooth edges for the button
    alignItems: 'center', // Ensures the text inside the button is centered
    justifyContent: 'center', // Ensures the text is vertically centered
    height: 50, // Ensure consistent height
    width: '100%', // Full width based on the parent View
  },
  btnNext: {
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnBoardingScreen;
