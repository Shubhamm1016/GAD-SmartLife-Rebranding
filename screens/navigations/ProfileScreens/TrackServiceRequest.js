import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {trackServiceRequest} from '../../../Context/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InsideHeader from '../../../comman-compnent/InsideHeader';
import {GEGBodyCopy, GEGBold} from '../../../comman-compnent/FontFamily';
const {width} = Dimensions.get('window');

const TrackServiceRequest = props => {
  const {navigation} = props;
  const [seviceOrderNumber, setSeviceOrderNumber] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [verified, setVerified] = useState('');
  const product = [
    {label: 'Product', value: 'null'},
    {label: 'AIR CONDITIONER', value: 'AIR CONDITIONER'},
    {label: 'REFRIGERATOR', value: 'REFRIGERATOR'},
    {label: 'WASHING MACHINE', value: 'WASHING MACHINE'},
  ];

  const generateDocumentId = () => {
    const timestamp = Date.now();
    return `${timestamp}`;
  };
  const GetRequestStatus = async () => {
    if (seviceOrderNumber == '') {
      alert('Enter Sevice order Number');
    }
    if (selectedProduct == undefined || selectedProduct == null) {
      alert('Please select a Product');
      return;
    }
    const documentId = generateDocumentId();
    console.log(
      documentId,
      mobileNumber,
      selectedProduct,
      seviceOrderNumber,
      'data',
    );
    // return
    try {
      let response = await trackServiceRequest(
        documentId,
        mobileNumber,
        selectedProduct,
        seviceOrderNumber,
      );
      // console.log(response.data[0].godrejServiceRequestNoStatus, 'statusRemarks');
      // console.log(response.data.statusRemarks,"....7777");

      // alert(response.data.statusRemarks);
      // navigation.navigate('ContactSupport');
      console.log(response, 'shu ham');
      if (response.data.data && response.data.data.length > 0) {
        const statusRemarks =
          response.data.data[0].godrejServiceRequestNoStatus;
        console.log(statusRemarks, 'statusRemarks');
        if (statusRemarks === 'Free') {
          alert('Not Allocated to Technician');
        } else if (statusRemarks === 'In Progress') {
          alert('Work is Going On');
        } else if (statusRemarks === 'Costed') {
          alert('Service Request is Closed');
        } else if (statusRemarks === 'Cancelled') {
          alert('Service Request is Cancelled');
        } else if (statusRemarks === 'error') {
          alert('Please Try Again');
        }
        setSeviceOrderNumber('');
        setSelectedProduct(null);
        setMobileNumber('');
      } else {
        console.log('No data available or response format is incorrect');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isEmail = value => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const processEmail = async () => {
    const storedValue = await AsyncStorage.getItem('email');
    if (!storedValue) return ''; // Handle case where email is null or undefined
    let processedValue;
    const trimmedValue = storedValue.trim();
    const isnum = /^\d+$/.test(trimmedValue);

    if (isnum) {
      processedValue = '+91' + trimmedValue;
    } else {
      processedValue = trimmedValue.toLowerCase();
    }

    return processedValue;
  };

  const trimCountryCode = phoneNumber => {
    if (phoneNumber.startsWith('+91')) {
      return phoneNumber.replace('+91', '').trim();
    }
    return phoneNumber;
  };

  useEffect(() => {
    const fetchValue = async () => {
      let processedValue = await processEmail();
      console.log(processedValue, 'processedValue');
      if (processedValue.startsWith('+91')) {
        processedValue = trimCountryCode(processedValue);
      }
      setVerified(processedValue);
    };

    fetchValue();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Pressable
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text
          style={{
            fontSize: 18,
            color: 'black',
            fontWeight: '600',
            justifyContent: 'center',
          }}>
          ONLINE SERVICE REQUEST STATUS
        </Text>
      </View> */}
      <View>
        <InsideHeader
          title="ONLINE SERVICE REQUEST STATUS"
          onBackPress={() => navigation.goBack()} // Set your back action here
        />
      </View>

      <View
        style={{
          alignSelf: 'flex-start',
          paddingHorizontal: 20,
          // paddingVertical: 20,
          width: '100%',
        }}>
        <View style={{padding: 15}}>
          <Text
            style={{fontSize: 16, color: '#838383', fontFamily: GEGBodyCopy}}>
            *All field are mandatory
          </Text>
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          {verified ? (
            isEmail(verified) ? (
              <Text
                numberOfLines={2}
                style={{
                  fontWeight: '600',
                  color: '#525968',
                  fontSize: width > 768 ? 24 : 18, // Larger font size for iPad
                  flex: 1, // Allow text to wrap within available space
                  marginRight: 5,
                }}>
                Email ID - {verified}
              </Text>
            ) : (
              <Text
                numberOfLines={2}
                style={{
                  fontWeight: '600',
                  color: '#525968',
                  fontSize: width > 768 ? 24 : 18, // Larger font size for iPad
                  flex: 1, // Allow text to wrap within available space
                  marginRight: 5,
                }}>
                Mobile Number - {verified}
              </Text>
            )
          ) : null}
          <Text
            style={{
              fontFamily: GEGBold,
              color: '#8BBD54',
              fontSize: width > 768 ? 24 : 18,
            }}>
            Verified
          </Text>
        </View>
        {/* <View style={{marginHorizontal: 0}}> */}
        <View
          style={{
            paddingHorizontal: 10,
            borderWidth: 1,
            padding: 10,
            borderRadius: 9,
            borderColor: '#CECECE',
            marginRight: 10,
            width: '100%',
            marginBottom: 20,
          }}>
          <TextInput
            style={styles.input}
            placeholder="Service Order Number*"
            placeholderTextColor="#888888"
            onChangeText={value => {
              // Validation: Only allow alphanumeric characters
              const filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
              setSeviceOrderNumber(filteredValue);
            }}
            maxLength={11}
            value={seviceOrderNumber}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            borderWidth: 1,
            padding: 10,
            borderRadius: 9,
            borderColor: '#CECECE',
            marginRight: 10,
            width: '100%',
            marginBottom: 20,
          }}>
          {/* <TextInput
            style={styles.input}
            placeholder="Product"
            onChangeText={value => {
              setProduct(value);
            }}
          /> */}
          {/* <Dropdown
              style={{padding: 10}}
              data={product}
              labelField="label"
              valueField="value"
              placeholder="Product*"
              value={selectedProduct}
              onChange={item => {
                setSelectedProduct(item.value);
              }}
              selectedTextStyle={{color: '#000', fontSize: 16}}
              placeholderStyle={{color: '#000', fontSize: 16}}
              containerStyle={{
                justifyContent: 'center',
                padding: 10,
              }}
            /> */}

          {/* <SelectDropdown
            data={product}
            defaultButtonText={'Select Product*'}
            value={selectedProduct}
            onChange={item => {
              setSelectedProduct(item.value);
            }}
            buttonTextAfterSelection={selectedItem => {
              return selectedItem.label; // Display selected product label
            }}
            rowTextForSelection={item => {
              return item.label; // Display product label in dropdown
            }}
            // buttonStyle={{ padding: 10 }}
            // buttonTextStyle={{ color: '#000', fontSize: 16 }}
            buttonStyle={styles.dropdown1BtnStyle}
            // buttonTextStyle={styles.dropdown1BtnTxtStyle}
            buttonTextStyle={[styles.dropdown1BtnTxtStyle, {textAlign: 'left'}]}
            renderDropdownIcon={isOpened => (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#444'}
                size={18}
              />
            )}
            dropdownIconPosition={'right'}
            dropdownStyle={{padding: 10, textAlign: 'right'}} // Dropdown styling
            rowStyle={{padding: 10}} // Row styling
            rowTextStyle={{color: '#000', fontSize: 16}} // Row text styling
          /> */}
          <SelectDropdown
            data={product}
            defaultButtonText="Product*"
            onSelect={selectedItem => {
              setSelectedProduct(selectedItem.value); // Set selected product value
            }}
            buttonTextAfterSelection={selectedItem => {
              return selectedItem.label; // Display selected product label
            }}
            rowTextForSelection={item => {
              return item.label; // Display product label in dropdown
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={[styles.dropdown1BtnTxtStyle, {textAlign: 'left'}]}
            renderDropdownIcon={isOpened => (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#444'}
                size={18}
              />
            )}
            dropdownIconPosition="right"
            dropdownStyle={{padding: 10, borderRadius: 5}}
            rowStyle={{padding: 10}}
            rowTextStyle={{color: '#000', fontSize: 16, textAlign: 'left'}}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            borderWidth: 1,
            padding: 10,
            borderRadius: 9,
            borderColor: '#CECECE',
            marginRight: 10,
            width: '100%',
            marginBottom: 20,
          }}>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number#"
            placeholderTextColor="#888888"
            maxLength={10}
            // onChangeText={value => {
            //   setMobileNumber(value);
            // }}
            onChangeText={value => {
              // Remove any leading spaces and ensure only numbers are allowed
              const cleanedValue = value.replace(/^\s+|[^0-9]/g, '');
              setMobileNumber(cleanedValue);
            }}
            value={mobileNumber}
          />
        </View>
      </View>
      <Pressable
        onPress={() => {
          GetRequestStatus();
        }}>
        <LinearGradient
          colors={['#810055', '#810055']}
          style={{
            marginTop: 25,
            marginStart: 20,
            marginEnd: 20,
            borderRadius: 25,
            padding: 15,
            paddingVertical: 18,
          }}>
          <View style={{alignSelf: 'center', flexDirection: 'row'}}>
            <AntDesign name="download" size={24} color="white" />
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                fontFamily: GEGBold,
              }}>
              {' '}
              Get Request Status
            </Text>
          </View>
        </LinearGradient>
      </Pressable>
    </SafeAreaView>
  );
};

export default TrackServiceRequest;

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 16,
    color: 'black',
    // backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    borderRadius: 9,
  },
  dropdown1BtnStyle: {
    borderColor: '#CECECE', // Set a border color
    width: '100%',
  },
  dropdown1BtnTxtStyle: {
    color: 'black', // Ensure the text color is visible
    fontSize: 16,
  },
  dropdown1RowStyle: {
    width: '100%',
    backgroundColor: '#fff', // Set a row background color
  },
  dropdown1RowTxtStyle: {
    color: 'black', // Ensure the text color is visible
  },
});
