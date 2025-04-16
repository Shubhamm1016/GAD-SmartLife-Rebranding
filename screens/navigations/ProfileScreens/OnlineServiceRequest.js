import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {newServiceRequest} from '../../../Context/API';
import { GEGBold, GEGHeadline } from '../../../comman-compnent/FontFamily';

const OnlineServiceRequest = props => {
  const {navigation} = props;
  const {
    documentId,
    selectedTitle,
    name,
    surname,
    address,
    selectedState,
    selectedCity,
    pincode,
    cityArea,
    alternateNumber,
    mobileNumber,
    email,
    selectedProduct,
    productSubCategory,
    productSerialNumber,
    serviceAssistanceRequiredFor,
    selectedCallType,
  } = props.route.params;

  const SubmitRequest = async (
    documentId,
    selectedTitle,
    name,
    surname,
    address,
    selectedState,
    selectedCity,
    pincode,
    cityArea,
    alternateNumber,
    mobileNumber,
    email,
    selectedProduct,
    productSubCategory,
    productSerialNumber,
    serviceAssistanceRequiredFor,
    selectedCallType,
  ) => {
    console.log(mobileNumber, '......');
    try {
      let response = await newServiceRequest(
        documentId,
        selectedTitle,
        name,
        surname,
        mobileNumber,
        address,
        selectedState,
        selectedCity,
        pincode,
        cityArea,
        alternateNumber,
        email,
        selectedProduct,
        productSubCategory,
        productSerialNumber,
        serviceAssistanceRequiredFor,
        selectedCallType,
      );
      console.log(response.data.statusRemarks, 'response111111111111');
      alert(response.data.statusRemarks);
      navigation.navigate('ContactSupport');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
      <ScrollView>
        {/* <Pressable
          style={{
            height: 50,
            borderRadius: 100,
            flexDirection: 'row',
            marginStart: 15,
            marginVertical: 10,
          }}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text style={{marginStart: 10, fontSize: 16, color: '#525968'}}>
            ONLINE SERVICE REQUEST
          </Text>
        </Pressable> */}
        <View>
          <InsideHeader
            title="ONLINE SERVICE REQUEST"
            onBackPress={() => navigation.goBack()} // Set your back action here
          />
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 16, color: '#525968', fontFamily:GEGBold}}>
            Mobile Number-9800990099
          </Text>
          <Text style={{fontSize: 16, color: '#8BBD54', fontFamily:GEGBold}}>
            Verified
          </Text>
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginStart: 20,
            paddingVertical: 10,
            marginTop: 20,
            backgroundColor:"#FFFFFF"
          }}>
          <Text style={{color: '#CECECE', fontSize: 14,fontFamily:GEGHeadline}}>Name</Text>
          <Text style={{color: '#525968', fontSize: 16, fontFamily:GEGBold}}>
            {selectedTitle} {name} {surname}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginStart: 20,
            paddingVertical: 10,
          }}>
          <Text style={{color: '#CECECE', fontSize: 14,fontFamily:GEGHeadline}}>Address</Text>
          <Text
            numberOfLines={2}
            style={{
              color: '#525968',
              fontSize: 16,
              fontWeight: 'bold',
              width: '95%',
            }}>
            {address}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginStart: 20,
            paddingVertical: 10,
          }}>
          <Text style={{color: '#CECECE', fontSize: 14,fontFamily:GEGHeadline}}>State</Text>
          <Text
            numberOfLines={2}
            style={{
              color: '#525968',
              fontSize: 16,
              fontFamily:GEGHeadline,
              width: '95%',
            }}>
            {selectedState}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginStart: 20,
            paddingVertical: 10,
          }}>
          <Text style={{color: '#CECECE', fontSize: 14,fontFamily:GEGHeadline}}>District/City</Text>
          <Text
            numberOfLines={2}
            style={{
              color: '#525968',
              fontSize: 16,
              fontFamily:GEGHeadline,
              width: '95%',
            }}>
            {selectedCity}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginStart: 20,
            paddingVertical: 10,
          }}>
          <Text style={{color: '#CECECE', fontSize: 14,fontFamily:GEGHeadline}}>Pincode</Text>
          <Text
            numberOfLines={2}
            style={{
              color: '#525968',
              fontSize: 16,
              fontFamily:GEGHeadline,
              width: '95%',
            }}>
            {pincode}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginStart: 20,
            paddingVertical: 10,
          }}>
          <Text style={{color: '#CECECE', fontSize: 14,fontFamily:GEGHeadline}}>
            City Area/ Closest Location
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: '#525968',
              fontSize: 16,
              fontFamily:GEGHeadline,
              width: '95%',
            }}>
            {cityArea}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginStart: 20,
            paddingVertical: 10,
          }}>
          <Text style={{color: '#CECECE', fontSize: 14,fontFamily:GEGHeadline}}>
            Alternate Mobile Number
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: '#525968',
              fontSize: 16,
              fontFamily:GEGHeadline,
              width: '95%',
            }}>
            {alternateNumber}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginStart: 20,
            paddingVertical: 10,
          }}>
          <Text style={{color: '#CECECE', fontSize: 14,fontFamily:GEGHeadline}}>Mobile Number</Text>
          <Text
            numberOfLines={2}
            style={{
              color: '#525968',
              fontSize: 16,
              fontFamily:GEGHeadline,
              width: '95%',
            }}>
            {mobileNumber}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginStart: 20,
            paddingVertical: 10,
          }}>
          <Text style={{color: '#CECECE', fontSize: 14,fontFamily:GEGHeadline}}>Email Id</Text>
          <Text
            numberOfLines={2}
            style={{
              color: '#525968',
              fontSize: 16,
              fontFamily:GEGHeadline,
              width: '95%',
            }}>
            {email}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginStart: 20,
            paddingVertical: 10,
          }}>
          <Text style={{color: '#CECECE', fontSize: 14,fontFamily:GEGHeadline}}>Product</Text>
          <Text
            numberOfLines={2}
            style={{
              color: '#525968',
              fontSize: 16,
              fontFamily:GEGHeadline,
              width: '95%',
            }}>
            {selectedProduct}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginStart: 20,
            paddingVertical: 10,
          }}>
          <Text style={{color: '#CECECE', fontSize: 14,fontFamily:GEGHeadline}}>
            Product Sub Category
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: '#525968',
              fontSize: 16,
              fontFamily:GEGHeadline,
              width: '95%',
            }}>
            {productSubCategory}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginStart: 20,
            paddingVertical: 10,
          }}>
          <Text style={{color: '#CECECE', fontSize: 14,fontFamily:GEGHeadline}}>
            Product Serial Number
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: '#525968',
              fontSize: 16,
              fontFamily:GEGHeadline,
              width: '95%',
            }}>
            {productSerialNumber}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginStart: 20,
            paddingVertical: 10,
          }}>
          <Text style={{color: '#CECECE', fontSize: 12,fontFamily:GEGHeadline}}>
            Sevice / Assistance required for
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: '#525968',
              fontSize: 14,
              fontFamily:GEGHeadline,
              width: '95%',
            }}>
            {serviceAssistanceRequiredFor}
          </Text>
        </View>

        {/* <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginStart: 20,
            paddingVertical: 10,
          }}>
          <Text style={{color: '#CECECE', fontSize: 14}}>
            Service/ Assistance required for
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: '#525968',
              fontSize: 16,
              fontWeight: 'bold',
              width: '95%',
            }}>
            Repair
          </Text>
        </View> */}

        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginStart: 20,
            paddingVertical: 10,
          }}>
          <Text style={{color: '#CECECE', fontSize: 14,fontFamily:GEGHeadline}}>Call Type</Text>
          <Text
            numberOfLines={2}
            style={{
              color: '#525968',
              fontSize: 16,
              fontFamily:GEGHeadline,
              width: '95%',
            }}>
            {selectedCallType}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            SubmitRequest(
              documentId,
              selectedTitle,
              name,
              surname,
              address,
              selectedState,
              selectedCity,
              pincode,
              cityArea,
              alternateNumber,
              mobileNumber,
              email,
              selectedProduct,
              productSubCategory,
              productSerialNumber,
              serviceAssistanceRequiredFor,
              selectedCallType,
            );
          }}
          style={{
            paddingVertical: 20,
            justifyContent: 'center',
            width: '100%',
          }}>
          <LinearGradient
            colors={['#810055', '#810055']}
            style={{
              // elevation: 8,
              // marginTop: 25,
              marginStart: 20,
              padding: 20,
              marginEnd: 20,
              borderRadius: 10,
              padding: 15,
              height:55
            }}>
            <View style={{alignSelf: 'center', flexDirection: 'row'}}>
              <View style={{top: 2}}>
                <AntDesign name="mail" size={24} color="white" />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  color: '#fff',
                  fontFamily:GEGBold,
                  paddingHorizontal: 10,
                }}>
                Submit Request
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnlineServiceRequest;
