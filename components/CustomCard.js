import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WHITE } from './color';

const CustomCard = ({ initialImageSource, clickImageSource, topText, bottomText, timeText,onPressCallback}) => {
    const [isClick, setIsClick] = useState(false);

    const handlePress = () => {
        setIsClick(!isClick)
        if(onPressCallback){
            onPressCallback();
        }
    }

    const gradientColors = isClick ? ['#4bb6e8', '#4D98FF'] : ['#F8F8F8', '#F8F8F8']
    const textColor = isClick ? '#ffff' : '#838383';
    const circleTextColor = isClick ? '#4B97FF' : '#838383'
    const circleColor = isClick ? '#ffff' : '#00000016'
    console.log(initialImageSource, "initialImageSource");
    const imageSource = isClick ? clickImageSource : initialImageSource
    console.log(imageSource, "imageSource");
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
                <LinearGradient colors={gradientColors} style={styles.card}>
                    <View style={[styles.circle, { backgroundColor: circleColor }]}>
                        <Text style={[styles.circleText, { color: circleTextColor }]}>{topText}</Text>
                    </View>
                    <View>
                        <Image source={imageSource} style={styles.image} />
                        <Text style={[styles.bottomText, { color: textColor }]}>{bottomText}</Text>
                        <Text style={[styles.timeText, { color: textColor }]}>{timeText}</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
    text: {
        // marginTop: 65,
        position: 'absolute',
        alignSelf: 'center',
        fontSize: 24, // Adjust the font size as needed
        color: 'black', // Change the color as needed
    },
    card: {
        flex: 1,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        position: 'relative',
        alignItems: "center",
        justifyContent: "center",
        height: 85,
        width: 85,
        borderRadius: 15,
        marginTop: 20,
        backgroundColor: "#4D98FF",
        flexDirection: 'row',
    },
    circle: {
        width: 28,
        height: 28,
        // borderEndStartRadius:5,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 24,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 20,
        backgroundColor: "#fff",
        position: "absolute",
        top: 0,
        right: 0,
        transformL: [{ rotate: '48deg' }]
    },
    image: {
        marginTop: 10,
        width: 28,
        height: 28,
        alignSelf: 'center',
        justifyContent: "center",
        // paddingVertical: 15,
        resizeMode: 'center',

        // marginTop: 28,
        // backgroundColor:'red'
    },
    underlineText: {
        textDecorationLine: 'underline',
        color: 'white', // Change color if needed when selected
        padding: 4,
    },
    bottomText: {
        fontSize: 10, color: "#fff", textAlign: "center"
    },
    timeText: {
        fontSize: 10, color: "#fff", textAlign: "center"
    },
    circleText: {
        textAlign: "center", justifyContent: "center", marginTop: 8, color: '#4BB6E8', fontWeight: "bold", fontSize: 10
    }
});

export default CustomCard;