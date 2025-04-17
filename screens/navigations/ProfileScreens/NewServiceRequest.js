import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native';
import {newServiceRequest} from '../../../Context/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InsideHeader from '../../../comman-compnent/InsideHeader';
import { GEGBodyCopy, GEGBold } from '../../../comman-compnent/FontFamily';
import { disabled } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';
const {width} = Dimensions.get('screen');
const NewServiceRequest = props => {
  const {navigation} = props;

  const [selectedTitle, setSelectedTitle] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [citiesForSelectedState, setCitiesForSelectedState] = useState([]);
  // console.log(citiesForSelectedState,"hhhhhhh");

  const [pincode, setPinCode] = useState('');
  const [cityArea, setCityArea] = useState('');
  const [alternateNumber, setAlternateNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  console.log(selectedProduct, 'GGGGGG');

  const [productSubCategory, setProductSubCategory] = useState('');
  const [productSerialNumber, setProductSerialNumber] = useState('');
  const [serviceAssistanceRequiredFor, setServiceAssistanceRequiredFor] =
    useState('');
  const [selectedCallType, setSelectedCallType] = useState(null);
  const [verified, setVerified] = useState('');
  console.log(verified, 'verified');
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const title = [
    {label: 'Title', value: 'null'},
    {label: 'Mr.', value: 'Mr.'},
    {label: 'Mrs.', value: 'Mrs.'},
    {label: 'Ms.', value: 'Ms.'},
    {label: 'M/s.', value: 'M/s.'},
  ];
  const product = [
    {label: 'Product', value: 'null'},
    {label: 'AIR CONDITIONER', value: 'AIR CONDITIONER'},
    {label: 'REFRIGERATOR', value: 'REFRIGERATOR'},
    {label: 'WASHING MACHINE', value: 'WASHING MACHINE'},
  ];
  const callType = [
    {label: 'Call Type*', value: 'null'},
    {label: 'REPAIR', value: 'REPAIR'},
    {label: 'INSTALL and DEMO', value: 'INSTALL and DEMO'},
    {label: 'ROUTINE SERVICE', value: 'ROUTINE SERVICE'},
  ];

  const state = [
    {label: 'Andaman & Nicobar', value: 'Andaman & Nicobar'},
    {label: 'Andhra Pradesh', value: 'Andhra Pradesh'},
    {label: 'Arunachal Pradesh', value: 'Arunachal Pradesh'},
    {label: 'Assam', value: 'Assam'},
    {label: 'Bihar', value: 'Bihar'},
    {label: 'Chandigarh', value: 'Chandigarh'},
    {label: 'Chhattisgarh', value: 'Chhattisgarh'},
    {label: 'Dadra & Nagar Haveli', value: 'Dadra & Nagar Haveli'},
    {label: 'Daman & Diu', value: 'Daman & Diu'},
    {label: 'Delhi', value: 'Delhi'},
    {label: 'Goa', value: 'Goa'},
    {label: 'Gujarat', value: 'Gujarat'},
    {label: 'Haryana', value: 'Haryana'},
    {label: 'Himachal Pradesh', value: 'Himachal Pradesh'},
    {label: 'Jammu & Kashmir', value: 'Jammu & Kashmir'},
    {label: 'Jharkhand', value: 'Jharkhand'},
    {label: 'Karnataka', value: 'Karnataka'},
    {label: 'Kerala', value: 'Kerala'},
    {label: 'Lakshadweep', value: 'Lakshadweep'},
    {label: 'Madhya Pradesh', value: 'Madhya Pradesh'},
    {label: 'Maharashtra', value: 'Maharashtra'},
    {label: 'Manipur', value: 'Manipur'},
    {label: 'Meghalaya', value: 'Meghalaya'},
    {label: 'Mizoram', value: 'Mizoram'},
    {label: 'Nagaland', value: 'Nagaland'},
    {label: 'Orissa', value: 'Orissa'},
    {label: 'Pondicherry', value: 'Pondicherry'},
    {label: 'Punjab', value: 'Punjab'},
    {label: 'Rajasthan', value: 'Rajasthan'},
    {label: 'Sikkim', value: 'Sikkim'},
    {label: 'Tamil Nadu', value: 'Tamil Nadu'},
    {label: 'Tripura', value: 'Tripura'},
    {label: 'Uttar Pradesh', value: 'Uttar Pradesh'},
    {label: 'Uttaranchal', value: 'Uttaranchal'},
    {label: 'West Bengal', value: 'West Bengal'},
  ];

  const city = [
    [
      {
        lable: ' Alipur ',
        value: ' Alipur ',
      },
      {
        lable: ' Andaman Island ',
        value: ' Andaman Island ',
      },
      {
        lable: ' Anderson Island ',
        value: ' Anderson Island ',
      },
      {
        lable: ' Arainj-Laka-Punga ',
        value: ' Arainj-Laka-Punga ',
      },
      {
        lable: ' Austinabad ',
        value: ' Austinabad ',
      },
      {
        lable: ' Bamboo Flat ',
        value: ' Bamboo Flat ',
      },
      {
        lable: ' Barren Island ',
        value: ' Barren Island ',
      },
      {
        lable: ' Beadonabad ',
        value: ' Beadonabad ',
      },
      {
        lable: ' Betapur ',
        value: ' Betapur ',
      },
      {
        lable: ' Bindraban ',
        value: ' Bindraban ',
      },
      {
        lable: ' Bonington ',
        value: ' Bonington ',
      },
      {
        lable: ' Brookesabad ',
        value: ' Brookesabad ',
      },
      {
        lable: ' Cadell Point ',
        value: ' Cadell Point ',
      },
      {
        lable: ' Calicut ',
        value: ' Calicut ',
      },
      {
        lable: ' Chetamale ',
        value: ' Chetamale ',
      },
      {
        lable: ' Cinque Islands ',
        value: ' Cinque Islands ',
      },
      {
        lable: ' Defence Island ',
        value: ' Defence Island ',
      },
      {
        lable: ' Digilpur ',
        value: ' Digilpur ',
      },
      {
        lable: ' Dolyganj ',
        value: ' Dolyganj ',
      },
      {
        lable: ' Flat Island ',
        value: ' Flat Island ',
      },
      {
        lable: ' Geinyale ',
        value: ' Geinyale ',
      },
      {
        lable: ' Great Coco Island ',
        value: ' Great Coco Island ',
      },
      {
        lable: ' Haddo ',
        value: ' Haddo ',
      },
      {
        lable: ' Havelock Island ',
        value: ' Havelock Island ',
      },
      {
        lable: ' Henry Lawrence Island ',
        value: ' Henry Lawrence Island ',
      },
      {
        lable: ' Herbertabad ',
        value: ' Herbertabad ',
      },
      {
        lable: ' Hobdaypur ',
        value: ' Hobdaypur ',
      },
      {
        lable: ' Ilichar ',
        value: ' Ilichar ',
      },
      {
        lable: ' Ingoie ',
        value: ' Ingoie ',
      },
      {
        lable: ' Inteview Island ',
        value: ' Inteview Island ',
      },
      {
        lable: ' Jangli Ghat ',
        value: ' Jangli Ghat ',
      },
      {
        lable: ' Jhon Lawrence Island ',
        value: ' Jhon Lawrence Island ',
      },
      {
        lable: ' Karen ',
        value: ' Karen ',
      },
      {
        lable: ' Kartara ',
        value: ' Kartara ',
      },
      {
        lable: ' KYD Islannd ',
        value: ' KYD Islannd ',
      },
      {
        lable: ' Landfall Island ',
        value: ' Landfall Island ',
      },
      {
        lable: ' Little Andmand ',
        value: ' Little Andmand ',
      },
      {
        lable: ' Little Coco Island ',
        value: ' Little Coco Island ',
      },
      {
        lable: ' Long Island ',
        value: ' Long Island ',
      },
      {
        lable: ' Maimyo ',
        value: ' Maimyo ',
      },
      {
        lable: ' Malappuram ',
        value: ' Malappuram ',
      },
      {
        lable: ' Manglutan ',
        value: ' Manglutan ',
      },
      {
        lable: ' Manpur ',
        value: ' Manpur ',
      },
      {
        lable: ' Mitha Khari ',
        value: ' Mitha Khari ',
      },
      {
        lable: ' Neill Island ',
        value: ' Neill Island ',
      },
      {
        lable: ' Nicobar Island ',
        value: ' Nicobar Island ',
      },
      {
        lable: ' North Brother Island ',
        value: ' North Brother Island ',
      },
      {
        lable: ' North Passage Island ',
        value: ' North Passage Island ',
      },
      {
        lable: ' North Sentinel Island ',
        value: ' North Sentinel Island ',
      },
      {
        lable: ' Nothen Reef Island ',
        value: ' Nothen Reef Island ',
      },
      {
        lable: ' Outram Island ',
        value: ' Outram Island ',
      },
      {
        lable: ' Pahlagaon ',
        value: ' Pahlagaon ',
      },
      {
        lable: ' Palalankwe ',
        value: ' Palalankwe ',
      },
      {
        lable: ' Passage Island ',
        value: ' Passage Island ',
      },
      {
        lable: ' Phaiapong ',
        value: ' Phaiapong ',
      },
      {
        lable: ' Phoenix Island ',
        value: ' Phoenix Island ',
      },
      {
        lable: ' Port Blair ',
        value: ' Port Blair ',
      },
      {
        lable: ' Preparis Island ',
        value: ' Preparis Island ',
      },
      {
        lable: ' Protheroepur ',
        value: ' Protheroepur ',
      },
      {
        lable: ' Rangachang ',
        value: ' Rangachang ',
      },
      {
        lable: ' Rongat ',
        value: ' Rongat ',
      },
      {
        lable: ' Rutland Island ',
        value: ' Rutland Island ',
      },
      {
        lable: ' Sabari ',
        value: ' Sabari ',
      },
      {
        lable: ' Saddle Peak ',
        value: ' Saddle Peak ',
      },
      {
        lable: ' Shadipur ',
        value: ' Shadipur ',
      },
      {
        lable: ' Smith Island ',
        value: ' Smith Island ',
      },
      {
        lable: ' Sound Island ',
        value: ' Sound Island ',
      },
      {
        lable: ' South Sentinel Island ',
        value: ' South Sentinel Island ',
      },
      {
        lable: ' Spike Island ',
        value: ' Spike Island ',
      },
      {
        lable: ' Tarmugli Island ',
        value: ' Tarmugli Island ',
      },
      {
        lable: ' Taylerabad ',
        value: ' Taylerabad ',
      },
      {
        lable: ' Titaije ',
        value: ' Titaije ',
      },
      {
        lable: ' Toibalawe ',
        value: ' Toibalawe ',
      },
      {
        lable: ' Tusonabad ',
        value: ' Tusonabad ',
      },
      {
        lable: ' West Island ',
        value: ' West Island ',
      },
      {
        lable: ' Wimberleyganj ',
        value: ' Wimberleyganj ',
      },
      {
        lable: ' Yadita',
        value: ' Yadita',
      },
    ],
    [
      {
        lable: ' Achampet ',
        value: ' Achampet ',
      },
      {
        lable: ' Adilabad ',
        value: ' Adilabad ',
      },
      {
        lable: ' Adoni ',
        value: ' Adoni ',
      },
      {
        lable: ' Alampur ',
        value: ' Alampur ',
      },
      {
        lable: ' Allagadda ',
        value: ' Allagadda ',
      },
      {
        lable: ' Alur ',
        value: ' Alur ',
      },
      {
        lable: ' Amalapuram ',
        value: ' Amalapuram ',
      },
      {
        lable: ' Amangallu ',
        value: ' Amangallu ',
      },
      {
        lable: ' Anakapalle ',
        value: ' Anakapalle ',
      },
      {
        lable: ' Anantapur ',
        value: ' Anantapur ',
      },
      {
        lable: ' Andole ',
        value: ' Andole ',
      },
      {
        lable: ' Araku ',
        value: ' Araku ',
      },
      {
        lable: ' Armoor ',
        value: ' Armoor ',
      },
      {
        lable: ' Asifabad ',
        value: ' Asifabad ',
      },
      {
        lable: ' Aswaraopet ',
        value: ' Aswaraopet ',
      },
      {
        lable: ' Atmakur ',
        value: ' Atmakur ',
      },
      {
        lable: ' B. Kothakota ',
        value: ' B. Kothakota ',
      },
      {
        lable: ' Badvel ',
        value: ' Badvel ',
      },
      {
        lable: ' Banaganapalle ',
        value: ' Banaganapalle ',
      },
      {
        lable: ' Bandar ',
        value: ' Bandar ',
      },
      {
        lable: ' Bangarupalem ',
        value: ' Bangarupalem ',
      },
      {
        lable: ' Banswada ',
        value: ' Banswada ',
      },
      {
        lable: ' Bapatla ',
        value: ' Bapatla ',
      },
      {
        lable: ' Bellampalli ',
        value: ' Bellampalli ',
      },
      {
        lable: ' Bhadrachalam ',
        value: ' Bhadrachalam ',
      },
      {
        lable: ' Bhainsa ',
        value: ' Bhainsa ',
      },
      {
        lable: ' Bheemunipatnam ',
        value: ' Bheemunipatnam ',
      },
      {
        lable: ' Bhimadole ',
        value: ' Bhimadole ',
      },
      {
        lable: ' Bhimavaram ',
        value: ' Bhimavaram ',
      },
      {
        lable: ' Bhongir ',
        value: ' Bhongir ',
      },
      {
        lable: ' Bhooragamphad ',
        value: ' Bhooragamphad ',
      },
      {
        lable: ' Boath ',
        value: ' Boath ',
      },
      {
        lable: ' Bobbili ',
        value: ' Bobbili ',
      },
      {
        lable: ' Bodhan ',
        value: ' Bodhan ',
      },
      {
        lable: ' Chandoor ',
        value: ' Chandoor ',
      },
      {
        lable: ' Chavitidibbalu ',
        value: ' Chavitidibbalu ',
      },
      {
        lable: ' Chejerla ',
        value: ' Chejerla ',
      },
      {
        lable: ' Chepurupalli ',
        value: ' Chepurupalli ',
      },
      {
        lable: ' Cherial ',
        value: ' Cherial ',
      },
      {
        lable: ' Chevella ',
        value: ' Chevella ',
      },
      {
        lable: ' Chinnor ',
        value: ' Chinnor ',
      },
      {
        lable: ' Chintalapudi ',
        value: ' Chintalapudi ',
      },
      {
        lable: ' Chintapalle ',
        value: ' Chintapalle ',
      },
      {
        lable: ' Chirala ',
        value: ' Chirala ',
      },
      {
        lable: ' Chittoor ',
        value: ' Chittoor ',
      },
      {
        lable: ' Chodavaram ',
        value: ' Chodavaram ',
      },
      {
        lable: ' Cuddapah ',
        value: ' Cuddapah ',
      },
      {
        lable: ' Cumbum ',
        value: ' Cumbum ',
      },
      {
        lable: ' Darsi ',
        value: ' Darsi ',
      },
      {
        lable: ' Devarakonda ',
        value: ' Devarakonda ',
      },
      {
        lable: ' Dharmavaram ',
        value: ' Dharmavaram ',
      },
      {
        lable: ' Dichpalli ',
        value: ' Dichpalli ',
      },
      {
        lable: ' Divi ',
        value: ' Divi ',
      },
      {
        lable: ' Donakonda ',
        value: ' Donakonda ',
      },
      {
        lable: ' Dronachalam ',
        value: ' Dronachalam ',
      },
      {
        lable: ' East Godavari ',
        value: ' East Godavari ',
      },
      {
        lable: ' Eluru ',
        value: ' Eluru ',
      },
      {
        lable: ' Eturnagaram ',
        value: ' Eturnagaram ',
      },
      {
        lable: ' Gadwal ',
        value: ' Gadwal ',
      },
      {
        lable: ' Gajapathinagaram ',
        value: ' Gajapathinagaram ',
      },
      {
        lable: ' Gajwel ',
        value: ' Gajwel ',
      },
      {
        lable: ' Garladinne ',
        value: ' Garladinne ',
      },
      {
        lable: ' Giddalur ',
        value: ' Giddalur ',
      },
      {
        lable: ' Godavari ',
        value: ' Godavari ',
      },
      {
        lable: ' Gooty ',
        value: ' Gooty ',
      },
      {
        lable: ' Gudivada ',
        value: ' Gudivada ',
      },
      {
        lable: ' Gudur ',
        value: ' Gudur ',
      },
      {
        lable: ' Guntur ',
        value: ' Guntur ',
      },
      {
        lable: ' Hindupur ',
        value: ' Hindupur ',
      },
      {
        lable: ' Hunsabad ',
        value: ' Hunsabad ',
      },
      {
        lable: ' Huzurabad ',
        value: ' Huzurabad ',
      },
      {
        lable: ' Huzurnagar ',
        value: ' Huzurnagar ',
      },
      {
        lable: ' Hyderabad ',
        value: ' Hyderabad ',
      },
      {
        lable: ' Ibrahimpatnam ',
        value: ' Ibrahimpatnam ',
      },
      {
        lable: ' Jaggayyapet ',
        value: ' Jaggayyapet ',
      },
      {
        lable: ' Jagtial ',
        value: ' Jagtial ',
      },
      {
        lable: ' Jammalamadugu ',
        value: ' Jammalamadugu ',
      },
      {
        lable: ' Jangaon ',
        value: ' Jangaon ',
      },
      {
        lable: ' Jangareddygudem ',
        value: ' Jangareddygudem ',
      },
      {
        lable: ' Jannaram ',
        value: ' Jannaram ',
      },
      {
        lable: ' Kadiri ',
        value: ' Kadiri ',
      },
      {
        lable: ' Kaikaluru ',
        value: ' Kaikaluru ',
      },
      {
        lable: ' Kakinada ',
        value: ' Kakinada ',
      },
      {
        lable: ' Kalwakurthy ',
        value: ' Kalwakurthy ',
      },
      {
        lable: ' Kalyandurg ',
        value: ' Kalyandurg ',
      },
      {
        lable: ' Kamalapuram ',
        value: ' Kamalapuram ',
      },
      {
        lable: ' Kamareddy ',
        value: ' Kamareddy ',
      },
      {
        lable: ' Kambadur ',
        value: ' Kambadur ',
      },
      {
        lable: ' Kanaganapalle ',
        value: ' Kanaganapalle ',
      },
      {
        lable: ' Kandukuru ',
        value: ' Kandukuru ',
      },
      {
        lable: ' Kanigiri ',
        value: ' Kanigiri ',
      },
      {
        lable: ' Karimnagar ',
        value: ' Karimnagar ',
      },
      {
        lable: ' Kavali ',
        value: ' Kavali ',
      },
      {
        lable: ' Khammam ',
        value: ' Khammam ',
      },
      {
        lable: ' Khanapur (AP) ',
        value: ' Khanapur (AP) ',
      },
      {
        lable: ' Kodangal ',
        value: ' Kodangal ',
      },
      {
        lable: ' Koduru ',
        value: ' Koduru ',
      },
      {
        lable: ' Koilkuntla ',
        value: ' Koilkuntla ',
      },
      {
        lable: ' Kollapur ',
        value: ' Kollapur ',
      },
      {
        lable: ' Kothagudem ',
        value: ' Kothagudem ',
      },
      {
        lable: ' Kovvur ',
        value: ' Kovvur ',
      },
      {
        lable: ' Krishna ',
        value: ' Krishna ',
      },
      {
        lable: ' Krosuru ',
        value: ' Krosuru ',
      },
      {
        lable: ' Kuppam ',
        value: ' Kuppam ',
      },
      {
        lable: ' Kurnool ',
        value: ' Kurnool ',
      },
      {
        lable: ' Lakkireddipalli ',
        value: ' Lakkireddipalli ',
      },
      {
        lable: ' Madakasira ',
        value: ' Madakasira ',
      },
      {
        lable: ' Madanapalli ',
        value: ' Madanapalli ',
      },
      {
        lable: ' Madhira ',
        value: ' Madhira ',
      },
      {
        lable: ' Madnur ',
        value: ' Madnur ',
      },
      {
        lable: ' Mahabubabad ',
        value: ' Mahabubabad ',
      },
      {
        lable: ' Mahabubnagar ',
        value: ' Mahabubnagar ',
      },
      {
        lable: ' Mahadevapur ',
        value: ' Mahadevapur ',
      },
      {
        lable: ' Makthal ',
        value: ' Makthal ',
      },
      {
        lable: ' Mancherial ',
        value: ' Mancherial ',
      },
      {
        lable: ' Mandapeta ',
        value: ' Mandapeta ',
      },
      {
        lable: ' Mangalagiri ',
        value: ' Mangalagiri ',
      },
      {
        lable: ' Manthani ',
        value: ' Manthani ',
      },
      {
        lable: ' Markapur ',
        value: ' Markapur ',
      },
      {
        lable: ' Marturu ',
        value: ' Marturu ',
      },
      {
        lable: ' Medachal ',
        value: ' Medachal ',
      },
      {
        lable: ' Medak ',
        value: ' Medak ',
      },
      {
        lable: ' Medarmetla ',
        value: ' Medarmetla ',
      },
      {
        lable: ' Metpalli ',
        value: ' Metpalli ',
      },
      {
        lable: ' Mriyalguda ',
        value: ' Mriyalguda ',
      },
      {
        lable: ' Mulug ',
        value: ' Mulug ',
      },
      {
        lable: ' Mylavaram ',
        value: ' Mylavaram ',
      },
      {
        lable: ' Nagarkurnool ',
        value: ' Nagarkurnool ',
      },
      {
        lable: ' Nalgonda ',
        value: ' Nalgonda ',
      },
      {
        lable: ' Nallacheruvu ',
        value: ' Nallacheruvu ',
      },
      {
        lable: ' Nampalle ',
        value: ' Nampalle ',
      },
      {
        lable: ' Nandigama ',
        value: ' Nandigama ',
      },
      {
        lable: ' Nandikotkur ',
        value: ' Nandikotkur ',
      },
      {
        lable: ' Nandyal ',
        value: ' Nandyal ',
      },
      {
        lable: ' Narasampet ',
        value: ' Narasampet ',
      },
      {
        lable: ' Narasaraopet ',
        value: ' Narasaraopet ',
      },
      {
        lable: ' Narayanakhed ',
        value: ' Narayanakhed ',
      },
      {
        lable: ' Narayanpet ',
        value: ' Narayanpet ',
      },
      {
        lable: ' Narsapur ',
        value: ' Narsapur ',
      },
      {
        lable: ' Narsipatnam ',
        value: ' Narsipatnam ',
      },
      {
        lable: ' Nazvidu ',
        value: ' Nazvidu ',
      },
      {
        lable: ' Nelloe ',
        value: ' Nelloe ',
      },
      {
        lable: ' Nellore ',
        value: ' Nellore ',
      },
      {
        lable: ' Nidamanur ',
        value: ' Nidamanur ',
      },
      {
        lable: ' Nirmal ',
        value: ' Nirmal ',
      },
      {
        lable: ' Nizamabad ',
        value: ' Nizamabad ',
      },
      {
        lable: ' Nuguru ',
        value: ' Nuguru ',
      },
      {
        lable: ' Ongole ',
        value: ' Ongole ',
      },
      {
        lable: ' Outsarangapalle ',
        value: ' Outsarangapalle ',
      },
      {
        lable: ' Paderu ',
        value: ' Paderu ',
      },
      {
        lable: ' Pakala ',
        value: ' Pakala ',
      },
      {
        lable: ' Palakonda ',
        value: ' Palakonda ',
      },
      {
        lable: ' Paland ',
        value: ' Paland ',
      },
      {
        lable: ' Palmaneru ',
        value: ' Palmaneru ',
      },
      {
        lable: ' Pamuru ',
        value: ' Pamuru ',
      },
      {
        lable: ' Pargi ',
        value: ' Pargi ',
      },
      {
        lable: ' Parkal ',
        value: ' Parkal ',
      },
      {
        lable: ' Parvathipuram ',
        value: ' Parvathipuram ',
      },
      {
        lable: ' Pathapatnam ',
        value: ' Pathapatnam ',
      },
      {
        lable: ' Pattikonda ',
        value: ' Pattikonda ',
      },
      {
        lable: ' Peapalle ',
        value: ' Peapalle ',
      },
      {
        lable: ' Peddapalli ',
        value: ' Peddapalli ',
      },
      {
        lable: ' Peddapuram ',
        value: ' Peddapuram ',
      },
      {
        lable: ' Penukonda ',
        value: ' Penukonda ',
      },
      {
        lable: ' Piduguralla ',
        value: ' Piduguralla ',
      },
      {
        lable: ' Piler ',
        value: ' Piler ',
      },
      {
        lable: ' Pithapuram ',
        value: ' Pithapuram ',
      },
      {
        lable: ' Podili ',
        value: ' Podili ',
      },
      {
        lable: ' Polavaram ',
        value: ' Polavaram ',
      },
      {
        lable: ' Prakasam ',
        value: ' Prakasam ',
      },
      {
        lable: ' Proddatur ',
        value: ' Proddatur ',
      },
      {
        lable: ' Pulivendla ',
        value: ' Pulivendla ',
      },
      {
        lable: ' Punganur ',
        value: ' Punganur ',
      },
      {
        lable: ' Putturu ',
        value: ' Putturu ',
      },
      {
        lable: ' Rajahmundri ',
        value: ' Rajahmundri ',
      },
      {
        lable: ' Rajampeta ',
        value: ' Rajampeta ',
      },
      {
        lable: ' Ramachandrapuram ',
        value: ' Ramachandrapuram ',
      },
      {
        lable: ' Ramannapet ',
        value: ' Ramannapet ',
      },
      {
        lable: ' Rampachodavaram ',
        value: ' Rampachodavaram ',
      },
      {
        lable: ' Rangareddy ',
        value: ' Rangareddy ',
      },
      {
        lable: ' Rapur ',
        value: ' Rapur ',
      },
      {
        lable: ' Rayachoti ',
        value: ' Rayachoti ',
      },
      {
        lable: ' Rayadurg ',
        value: ' Rayadurg ',
      },
      {
        lable: ' Razole ',
        value: ' Razole ',
      },
      {
        lable: ' Repalle ',
        value: ' Repalle ',
      },
      {
        lable: ' Saluru ',
        value: ' Saluru ',
      },
      {
        lable: ' Sangareddy ',
        value: ' Sangareddy ',
      },
      {
        lable: ' Sathupalli ',
        value: ' Sathupalli ',
      },
      {
        lable: ' Sattenapalle ',
        value: ' Sattenapalle ',
      },
      {
        lable: ' Satyavedu ',
        value: ' Satyavedu ',
      },
      {
        lable: ' Shadnagar ',
        value: ' Shadnagar ',
      },
      {
        lable: ' Siddavattam ',
        value: ' Siddavattam ',
      },
      {
        lable: ' Siddipet ',
        value: ' Siddipet ',
      },
      {
        lable: ' Sileru ',
        value: ' Sileru ',
      },
      {
        lable: ' Sircilla ',
        value: ' Sircilla ',
      },
      {
        lable: ' Sirpur Kagaznagar ',
        value: ' Sirpur Kagaznagar ',
      },
      {
        lable: ' Sodam ',
        value: ' Sodam ',
      },
      {
        lable: ' Sompeta ',
        value: ' Sompeta ',
      },
      {
        lable: ' Srikakulam ',
        value: ' Srikakulam ',
      },
      {
        lable: ' Srikalahasthi ',
        value: ' Srikalahasthi ',
      },
      {
        lable: ' Srisailam ',
        value: ' Srisailam ',
      },
      {
        lable: ' Srungavarapukota ',
        value: ' Srungavarapukota ',
      },
      {
        lable: ' Sudhimalla ',
        value: ' Sudhimalla ',
      },
      {
        lable: ' Sullarpet ',
        value: ' Sullarpet ',
      },
      {
        lable: ' Tadepalligudem ',
        value: ' Tadepalligudem ',
      },
      {
        lable: ' Tadipatri ',
        value: ' Tadipatri ',
      },
      {
        lable: ' Tanduru ',
        value: ' Tanduru ',
      },
      {
        lable: ' Tanuku ',
        value: ' Tanuku ',
      },
      {
        lable: ' Tekkali ',
        value: ' Tekkali ',
      },
      {
        lable: ' Tenali ',
        value: ' Tenali ',
      },
      {
        lable: ' Thungaturthy ',
        value: ' Thungaturthy ',
      },
      {
        lable: ' Tirivuru ',
        value: ' Tirivuru ',
      },
      {
        lable: ' Tirupathi ',
        value: ' Tirupathi ',
      },
      {
        lable: ' Tuni ',
        value: ' Tuni ',
      },
      {
        lable: ' Udaygiri ',
        value: ' Udaygiri ',
      },
      {
        lable: ' Ulvapadu ',
        value: ' Ulvapadu ',
      },
      {
        lable: ' Uravakonda ',
        value: ' Uravakonda ',
      },
      {
        lable: ' Utnor ',
        value: ' Utnor ',
      },
      {
        lable: ' V.R. Puram ',
        value: ' V.R. Puram ',
      },
      {
        lable: ' Vaimpalli ',
        value: ' Vaimpalli ',
      },
      {
        lable: ' Vayalpad ',
        value: ' Vayalpad ',
      },
      {
        lable: ' Venkatgiri ',
        value: ' Venkatgiri ',
      },
      {
        lable: ' Venkatgirikota ',
        value: ' Venkatgirikota ',
      },
      {
        lable: ' Vijayawada ',
        value: ' Vijayawada ',
      },
      {
        lable: ' Vikrabad ',
        value: ' Vikrabad ',
      },
      {
        lable: ' Vinjamuru ',
        value: ' Vinjamuru ',
      },
      {
        lable: ' Vinukonda ',
        value: ' Vinukonda ',
      },
      {
        lable: ' Visakhapatnam ',
        value: ' Visakhapatnam ',
      },
      {
        lable: ' Vizayanagaram ',
        value: ' Vizayanagaram ',
      },
      {
        lable: ' Vizianagaram ',
        value: ' Vizianagaram ',
      },
      {
        lable: ' Vuyyuru ',
        value: ' Vuyyuru ',
      },
      {
        lable: ' Wanaparthy ',
        value: ' Wanaparthy ',
      },
      {
        lable: ' Warangal ',
        value: ' Warangal ',
      },
      {
        lable: ' Wardhannapet ',
        value: ' Wardhannapet ',
      },
      {
        lable: ' Yelamanchili ',
        value: ' Yelamanchili ',
      },
      {
        lable: ' Yelavaram ',
        value: ' Yelavaram ',
      },
      {
        lable: ' Yeleswaram ',
        value: ' Yeleswaram ',
      },
      {
        lable: ' Yellandu ',
        value: ' Yellandu ',
      },
      {
        lable: ' Yellanuru ',
        value: ' Yellanuru ',
      },
      {
        lable: ' Yellareddy ',
        value: ' Yellareddy ',
      },
      {
        lable: ' Yerragondapalem ',
        value: ' Yerragondapalem ',
      },
      {
        lable: ' Zahirabad ',
        value: ' Zahirabad ',
      },
    ],
    [
      {
        lable: ' Along ',
        value: ' Along ',
      },
      {
        lable: ' Anini ',
        value: ' Anini ',
      },
      {
        lable: ' Anjaw ',
        value: ' Anjaw ',
      },
      {
        lable: ' Bameng ',
        value: ' Bameng ',
      },
      {
        lable: ' Basar ',
        value: ' Basar ',
      },
      {
        lable: ' Changlang ',
        value: ' Changlang ',
      },
      {
        lable: ' Chowkhem ',
        value: ' Chowkhem ',
      },
      {
        lable: ' Daporizo ',
        value: ' Daporizo ',
      },
      {
        lable: ' Dibang Valley ',
        value: ' Dibang Valley ',
      },
      {
        lable: ' Dirang ',
        value: ' Dirang ',
      },
      {
        lable: ' Hayuliang ',
        value: ' Hayuliang ',
      },
      {
        lable: ' Huri ',
        value: ' Huri ',
      },
      {
        lable: ' Itanagar ',
        value: ' Itanagar ',
      },
      {
        lable: ' Jairampur ',
        value: ' Jairampur ',
      },
      {
        lable: ' Kalaktung ',
        value: ' Kalaktung ',
      },
      {
        lable: ' Kameng ',
        value: ' Kameng ',
      },
      {
        lable: ' Khonsa ',
        value: ' Khonsa ',
      },
      {
        lable: ' Kolaring ',
        value: ' Kolaring ',
      },
      {
        lable: ' Kurung Kumey ',
        value: ' Kurung Kumey ',
      },
      {
        lable: ' Lohit ',
        value: ' Lohit ',
      },
      {
        lable: ' Lower Dibang Valley ',
        value: ' Lower Dibang Valley ',
      },
      {
        lable: ' Lower Subansiri ',
        value: ' Lower Subansiri ',
      },
      {
        lable: ' Mariyang ',
        value: ' Mariyang ',
      },
      {
        lable: ' Mechuka ',
        value: ' Mechuka ',
      },
      {
        lable: ' Miao ',
        value: ' Miao ',
      },
      {
        lable: ' Nefra ',
        value: ' Nefra ',
      },
      {
        lable: ' Pakkekesang ',
        value: ' Pakkekesang ',
      },
      {
        lable: ' Pangin ',
        value: ' Pangin ',
      },
      {
        lable: ' Papum Pare ',
        value: ' Papum Pare ',
      },
      {
        lable: ' Passighat ',
        value: ' Passighat ',
      },
      {
        lable: ' Roing ',
        value: ' Roing ',
      },
      {
        lable: ' Sagalee ',
        value: ' Sagalee ',
      },
      {
        lable: ' Seppa ',
        value: ' Seppa ',
      },
      {
        lable: ' Siang ',
        value: ' Siang ',
      },
      {
        lable: ' Tali ',
        value: ' Tali ',
      },
      {
        lable: ' Taliha ',
        value: ' Taliha ',
      },
      {
        lable: ' Tawang ',
        value: ' Tawang ',
      },
      {
        lable: ' Tezu ',
        value: ' Tezu ',
      },
      {
        lable: ' Tirap ',
        value: ' Tirap ',
      },
      {
        lable: ' Tuting ',
        value: ' Tuting ',
      },
      {
        lable: ' Upper Siang ',
        value: ' Upper Siang ',
      },
      {
        lable: ' Upper Subansiri ',
        value: ' Upper Subansiri ',
      },
      {
        lable: ' Yiang Kiag ',
        value: ' Yiang Kiag ',
      },
    ],
    [
      {
        lable: ' Abhayapuri ',
        value: ' Abhayapuri ',
      },
      {
        lable: ' Baithalangshu ',
        value: ' Baithalangshu ',
      },
      {
        lable: ' Barama ',
        value: ' Barama ',
      },
      {
        lable: ' Barpeta Road ',
        value: ' Barpeta Road ',
      },
      {
        lable: ' Bihupuria ',
        value: ' Bihupuria ',
      },
      {
        lable: ' Bijni ',
        value: ' Bijni ',
      },
      {
        lable: ' Bilasipara ',
        value: ' Bilasipara ',
      },
      {
        lable: ' Bokajan ',
        value: ' Bokajan ',
      },
      {
        lable: ' Bokakhat ',
        value: ' Bokakhat ',
      },
      {
        lable: ' Boko ',
        value: ' Boko ',
      },
      {
        lable: ' Bongaigaon ',
        value: ' Bongaigaon ',
      },
      {
        lable: ' Cachar ',
        value: ' Cachar ',
      },
      {
        lable: ' Cachar Hills ',
        value: ' Cachar Hills ',
      },
      {
        lable: ' Darrang ',
        value: ' Darrang ',
      },
      {
        lable: ' Dhakuakhana ',
        value: ' Dhakuakhana ',
      },
      {
        lable: ' Dhemaji ',
        value: ' Dhemaji ',
      },
      {
        lable: ' Dhubri ',
        value: ' Dhubri ',
      },
      {
        lable: ' Dibrugarh ',
        value: ' Dibrugarh ',
      },
      {
        lable: ' Digboi ',
        value: ' Digboi ',
      },
      {
        lable: ' Diphu ',
        value: ' Diphu ',
      },
      {
        lable: ' Goalpara ',
        value: ' Goalpara ',
      },
      {
        lable: ' Gohpur ',
        value: ' Gohpur ',
      },
      {
        lable: ' Golaghat ',
        value: ' Golaghat ',
      },
      {
        lable: ' Guwahati ',
        value: ' Guwahati ',
      },
      {
        lable: ' Hailakandi ',
        value: ' Hailakandi ',
      },
      {
        lable: ' Hajo ',
        value: ' Hajo ',
      },
      {
        lable: ' Halflong ',
        value: ' Halflong ',
      },
      {
        lable: ' Hojai ',
        value: ' Hojai ',
      },
      {
        lable: ' Howraghat ',
        value: ' Howraghat ',
      },
      {
        lable: ' Jorhat ',
        value: ' Jorhat ',
      },
      {
        lable: ' Kamrup ',
        value: ' Kamrup ',
      },
      {
        lable: ' Karbi Anglong ',
        value: ' Karbi Anglong ',
      },
      {
        lable: ' Karimganj ',
        value: ' Karimganj ',
      },
      {
        lable: ' Kokarajhar ',
        value: ' Kokarajhar ',
      },
      {
        lable: ' Kokrajhar ',
        value: ' Kokrajhar ',
      },
      {
        lable: ' Lakhimpur ',
        value: ' Lakhimpur ',
      },
      {
        lable: ' Maibong ',
        value: ' Maibong ',
      },
      {
        lable: ' Majuli ',
        value: ' Majuli ',
      },
      {
        lable: ' Mangaldoi ',
        value: ' Mangaldoi ',
      },
      {
        lable: ' Mariani ',
        value: ' Mariani ',
      },
      {
        lable: ' Marigaon ',
        value: ' Marigaon ',
      },
      {
        lable: ' Moranhat ',
        value: ' Moranhat ',
      },
      {
        lable: ' Morigaon ',
        value: ' Morigaon ',
      },
      {
        lable: ' Nagaon ',
        value: ' Nagaon ',
      },
      {
        lable: ' Nalbari ',
        value: ' Nalbari ',
      },
      {
        lable: ' Rangapara ',
        value: ' Rangapara ',
      },
      {
        lable: ' Sadiya ',
        value: ' Sadiya ',
      },
      {
        lable: ' Sibsagar ',
        value: ' Sibsagar ',
      },
      {
        lable: ' Silchar ',
        value: ' Silchar ',
      },
      {
        lable: ' Sivasagar ',
        value: ' Sivasagar ',
      },
      {
        lable: ' Sonitpur ',
        value: ' Sonitpur ',
      },
      {
        lable: ' Tarabarihat ',
        value: ' Tarabarihat ',
      },
      {
        lable: ' Tezpur ',
        value: ' Tezpur ',
      },
      {
        lable: ' Tinsukia ',
        value: ' Tinsukia ',
      },
      {
        lable: ' Udalgiri ',
        value: ' Udalgiri ',
      },
      {
        lable: ' Udalguri ',
        value: ' Udalguri ',
      },
      {
        lable: ' UdarbondhBarpeta',
        value: ' UdarbondhBarpeta',
      },
    ],
    [
      {
        lable: ' Adhaura ',
        value: ' Adhaura ',
      },
      {
        lable: ' Amarpur ',
        value: ' Amarpur ',
      },
      {
        lable: ' Araria ',
        value: ' Araria ',
      },
      {
        lable: ' Areraj ',
        value: ' Areraj ',
      },
      {
        lable: ' Arrah ',
        value: ' Arrah ',
      },
      {
        lable: ' Arwal ',
        value: ' Arwal ',
      },
      {
        lable: ' Aurangabad ',
        value: ' Aurangabad ',
      },
      {
        lable: ' Bagaha ',
        value: ' Bagaha ',
      },
      {
        lable: ' Banka ',
        value: ' Banka ',
      },
      {
        lable: ' Banmankhi ',
        value: ' Banmankhi ',
      },
      {
        lable: ' Barachakia ',
        value: ' Barachakia ',
      },
      {
        lable: ' Barauni ',
        value: ' Barauni ',
      },
      {
        lable: ' Barh ',
        value: ' Barh ',
      },
      {
        lable: ' Barosi ',
        value: ' Barosi ',
      },
      {
        lable: ' Begusarai ',
        value: ' Begusarai ',
      },
      {
        lable: ' Benipatti ',
        value: ' Benipatti ',
      },
      {
        lable: ' Benipur ',
        value: ' Benipur ',
      },
      {
        lable: ' Bettiah ',
        value: ' Bettiah ',
      },
      {
        lable: ' Bhabhua ',
        value: ' Bhabhua ',
      },
      {
        lable: ' Bhagalpur ',
        value: ' Bhagalpur ',
      },
      {
        lable: ' Bhojpur ',
        value: ' Bhojpur ',
      },
      {
        lable: ' Bidupur ',
        value: ' Bidupur ',
      },
      {
        lable: ' Biharsharif ',
        value: ' Biharsharif ',
      },
      {
        lable: ' Bikram ',
        value: ' Bikram ',
      },
      {
        lable: ' Bikramganj ',
        value: ' Bikramganj ',
      },
      {
        lable: ' Birpur ',
        value: ' Birpur ',
      },
      {
        lable: ' Buxar ',
        value: ' Buxar ',
      },
      {
        lable: ' Chakai ',
        value: ' Chakai ',
      },
      {
        lable: ' Champaran ',
        value: ' Champaran ',
      },
      {
        lable: ' Chapara ',
        value: ' Chapara ',
      },
      {
        lable: ' Dalsinghsarai ',
        value: ' Dalsinghsarai ',
      },
      {
        lable: ' Danapur ',
        value: ' Danapur ',
      },
      {
        lable: ' Darbhanga ',
        value: ' Darbhanga ',
      },
      {
        lable: ' Daudnagar ',
        value: ' Daudnagar ',
      },
      {
        lable: ' Dhaka ',
        value: ' Dhaka ',
      },
      {
        lable: ' Dhamdaha ',
        value: ' Dhamdaha ',
      },
      {
        lable: ' Dumraon ',
        value: ' Dumraon ',
      },
      {
        lable: ' Ekma ',
        value: ' Ekma ',
      },
      {
        lable: ' Forbesganj ',
        value: ' Forbesganj ',
      },
      {
        lable: ' Gaya ',
        value: ' Gaya ',
      },
      {
        lable: ' Gogri ',
        value: ' Gogri ',
      },
      {
        lable: ' Gopalganj ',
        value: ' Gopalganj ',
      },
      {
        lable: ' H.Kharagpur ',
        value: ' H.Kharagpur ',
      },
      {
        lable: ' Hajipur ',
        value: ' Hajipur ',
      },
      {
        lable: ' Hathua ',
        value: ' Hathua ',
      },
      {
        lable: ' Hilsa ',
        value: ' Hilsa ',
      },
      {
        lable: ' Imamganj ',
        value: ' Imamganj ',
      },
      {
        lable: ' Jahanabad ',
        value: ' Jahanabad ',
      },
      {
        lable: ' Jainagar ',
        value: ' Jainagar ',
      },
      {
        lable: ' Jamshedpur ',
        value: ' Jamshedpur ',
      },
      {
        lable: ' Jamui ',
        value: ' Jamui ',
      },
      {
        lable: ' Jehanabad ',
        value: ' Jehanabad ',
      },
      {
        lable: ' Jhajha ',
        value: ' Jhajha ',
      },
      {
        lable: ' Jhanjharpur ',
        value: ' Jhanjharpur ',
      },
      {
        lable: ' Kahalgaon ',
        value: ' Kahalgaon ',
      },
      {
        lable: ' Kaimur (Bhabua) ',
        value: ' Kaimur (Bhabua) ',
      },
      {
        lable: ' Katihar ',
        value: ' Katihar ',
      },
      {
        lable: ' Katoria ',
        value: ' Katoria ',
      },
      {
        lable: ' Khagaria ',
        value: ' Khagaria ',
      },
      {
        lable: ' Kishanganj ',
        value: ' Kishanganj ',
      },
      {
        lable: ' Korha ',
        value: ' Korha ',
      },
      {
        lable: ' Lakhisarai ',
        value: ' Lakhisarai ',
      },
      {
        lable: ' Madhepura ',
        value: ' Madhepura ',
      },
      {
        lable: ' Madhubani ',
        value: ' Madhubani ',
      },
      {
        lable: ' Maharajganj ',
        value: ' Maharajganj ',
      },
      {
        lable: ' Mahua ',
        value: ' Mahua ',
      },
      {
        lable: ' Mairwa ',
        value: ' Mairwa ',
      },
      {
        lable: ' Mallehpur ',
        value: ' Mallehpur ',
      },
      {
        lable: ' Masrakh ',
        value: ' Masrakh ',
      },
      {
        lable: ' Mohania ',
        value: ' Mohania ',
      },
      {
        lable: ' Monghyr ',
        value: ' Monghyr ',
      },
      {
        lable: ' Motihari ',
        value: ' Motihari ',
      },
      {
        lable: ' Motipur ',
        value: ' Motipur ',
      },
      {
        lable: ' Munger ',
        value: ' Munger ',
      },
      {
        lable: ' Muzaffarpur ',
        value: ' Muzaffarpur ',
      },
      {
        lable: ' Nabinagar ',
        value: ' Nabinagar ',
      },
      {
        lable: ' Nalanda ',
        value: ' Nalanda ',
      },
      {
        lable: ' Narkatiaganj ',
        value: ' Narkatiaganj ',
      },
      {
        lable: ' Naugachia ',
        value: ' Naugachia ',
      },
      {
        lable: ' Nawada ',
        value: ' Nawada ',
      },
      {
        lable: ' Pakribarwan ',
        value: ' Pakribarwan ',
      },
      {
        lable: ' Pakridayal ',
        value: ' Pakridayal ',
      },
      {
        lable: ' Patna ',
        value: ' Patna ',
      },
      {
        lable: ' Phulparas ',
        value: ' Phulparas ',
      },
      {
        lable: ' Piro ',
        value: ' Piro ',
      },
      {
        lable: ' Pupri ',
        value: ' Pupri ',
      },
      {
        lable: ' Purena ',
        value: ' Purena ',
      },
      {
        lable: ' Purnia ',
        value: ' Purnia ',
      },
      {
        lable: ' Rafiganj ',
        value: ' Rafiganj ',
      },
      {
        lable: ' Rajauli ',
        value: ' Rajauli ',
      },
      {
        lable: ' Ramnagar ',
        value: ' Ramnagar ',
      },
      {
        lable: ' Raniganj ',
        value: ' Raniganj ',
      },
      {
        lable: ' Raxaul ',
        value: ' Raxaul ',
      },
      {
        lable: ' Rohtas ',
        value: ' Rohtas ',
      },
      {
        lable: ' Rosera ',
        value: ' Rosera ',
      },
      {
        lable: ' S.Bakhtiarpur ',
        value: ' S.Bakhtiarpur ',
      },
      {
        lable: ' Saharsa ',
        value: ' Saharsa ',
      },
      {
        lable: ' Samastipur ',
        value: ' Samastipur ',
      },
      {
        lable: ' Saran ',
        value: ' Saran ',
      },
      {
        lable: ' Sasaram ',
        value: ' Sasaram ',
      },
      {
        lable: ' Seikhpura ',
        value: ' Seikhpura ',
      },
      {
        lable: ' Sheikhpura ',
        value: ' Sheikhpura ',
      },
      {
        lable: ' Sheohar ',
        value: ' Sheohar ',
      },
      {
        lable: ' Sherghati ',
        value: ' Sherghati ',
      },
      {
        lable: ' Sidhawalia ',
        value: ' Sidhawalia ',
      },
      {
        lable: ' Singhwara ',
        value: ' Singhwara ',
      },
      {
        lable: ' Sitamarhi ',
        value: ' Sitamarhi ',
      },
      {
        lable: ' Siwan ',
        value: ' Siwan ',
      },
      {
        lable: ' Sonepur ',
        value: ' Sonepur ',
      },
      {
        lable: ' Supaul ',
        value: ' Supaul ',
      },
      {
        lable: ' Thakurganj ',
        value: ' Thakurganj ',
      },
      {
        lable: ' Triveniganj ',
        value: ' Triveniganj ',
      },
      {
        lable: ' Udakishanganj ',
        value: ' Udakishanganj ',
      },
      {
        lable: ' Vaishali ',
        value: ' Vaishali ',
      },
      {
        lable: ' Wazirganj',
        value: ' Wazirganj',
      },
    ],
    [
      {
        lable: ' Chandigarh ',
        value: ' Chandigarh ',
      },
      {
        lable: ' Mani Marja',
        value: ' Mani Marja',
      },
    ],
    [
      {
        lable: ' Ambikapur ',
        value: ' Ambikapur ',
      },
      {
        lable: ' Antagarh ',
        value: ' Antagarh ',
      },
      {
        lable: ' Arang ',
        value: ' Arang ',
      },
      {
        lable: ' Bacheli ',
        value: ' Bacheli ',
      },
      {
        lable: ' Bagbahera ',
        value: ' Bagbahera ',
      },
      {
        lable: ' Bagicha ',
        value: ' Bagicha ',
      },
      {
        lable: ' Baikunthpur ',
        value: ' Baikunthpur ',
      },
      {
        lable: ' Balod ',
        value: ' Balod ',
      },
      {
        lable: ' Balodabazar ',
        value: ' Balodabazar ',
      },
      {
        lable: ' Balrampur ',
        value: ' Balrampur ',
      },
      {
        lable: ' Barpalli ',
        value: ' Barpalli ',
      },
      {
        lable: ' Basana ',
        value: ' Basana ',
      },
      {
        lable: ' Bastanar ',
        value: ' Bastanar ',
      },
      {
        lable: ' Bastar ',
        value: ' Bastar ',
      },
      {
        lable: ' Bderajpur ',
        value: ' Bderajpur ',
      },
      {
        lable: ' Bemetara ',
        value: ' Bemetara ',
      },
      {
        lable: ' Berla ',
        value: ' Berla ',
      },
      {
        lable: ' Bhairongarh ',
        value: ' Bhairongarh ',
      },
      {
        lable: ' Bhanupratappur ',
        value: ' Bhanupratappur ',
      },
      {
        lable: ' Bharathpur ',
        value: ' Bharathpur ',
      },
      {
        lable: ' Bhatapara ',
        value: ' Bhatapara ',
      },
      {
        lable: ' Bhilai ',
        value: ' Bhilai ',
      },
      {
        lable: ' Bhilaigarh ',
        value: ' Bhilaigarh ',
      },
      {
        lable: ' Bhopalpatnam ',
        value: ' Bhopalpatnam ',
      },
      {
        lable: ' Bijapur ',
        value: ' Bijapur ',
      },
      {
        lable: ' Bilaspur ',
        value: ' Bilaspur ',
      },
      {
        lable: ' Bodla ',
        value: ' Bodla ',
      },
      {
        lable: ' Bokaband ',
        value: ' Bokaband ',
      },
      {
        lable: ' Chandipara ',
        value: ' Chandipara ',
      },
      {
        lable: ' Chhinagarh ',
        value: ' Chhinagarh ',
      },
      {
        lable: ' Chhuriakala ',
        value: ' Chhuriakala ',
      },
      {
        lable: ' Chingmut ',
        value: ' Chingmut ',
      },
      {
        lable: ' Chuikhadan ',
        value: ' Chuikhadan ',
      },
      {
        lable: ' Dabhara ',
        value: ' Dabhara ',
      },
      {
        lable: ' Dallirajhara ',
        value: ' Dallirajhara ',
      },
      {
        lable: ' Dantewada ',
        value: ' Dantewada ',
      },
      {
        lable: ' Deobhog ',
        value: ' Deobhog ',
      },
      {
        lable: ' Dhamda ',
        value: ' Dhamda ',
      },
      {
        lable: ' Dhamtari ',
        value: ' Dhamtari ',
      },
      {
        lable: ' Dharamjaigarh ',
        value: ' Dharamjaigarh ',
      },
      {
        lable: ' Dongargarh ',
        value: ' Dongargarh ',
      },
      {
        lable: ' Durg ',
        value: ' Durg ',
      },
      {
        lable: ' Durgakondal ',
        value: ' Durgakondal ',
      },
      {
        lable: ' Fingeshwar ',
        value: ' Fingeshwar ',
      },
      {
        lable: ' Gariaband ',
        value: ' Gariaband ',
      },
      {
        lable: ' Garpa ',
        value: ' Garpa ',
      },
      {
        lable: ' Gharghoda ',
        value: ' Gharghoda ',
      },
      {
        lable: ' Gogunda ',
        value: ' Gogunda ',
      },
      {
        lable: ' Ilamidi ',
        value: ' Ilamidi ',
      },
      {
        lable: ' Jagdalpur ',
        value: ' Jagdalpur ',
      },
      {
        lable: ' Janjgir ',
        value: ' Janjgir ',
      },
      {
        lable: ' Janjgir-Champa ',
        value: ' Janjgir-Champa ',
      },
      {
        lable: ' Jarwa ',
        value: ' Jarwa ',
      },
      {
        lable: ' Jashpur ',
        value: ' Jashpur ',
      },
      {
        lable: ' Jashpurnagar ',
        value: ' Jashpurnagar ',
      },
      {
        lable: ' Kabirdham-Kawardha ',
        value: ' Kabirdham-Kawardha ',
      },
      {
        lable: ' Kanker ',
        value: ' Kanker ',
      },
      {
        lable: ' Kasdol ',
        value: ' Kasdol ',
      },
      {
        lable: ' Kathdol ',
        value: ' Kathdol ',
      },
      {
        lable: ' Kathghora ',
        value: ' Kathghora ',
      },
      {
        lable: ' Kawardha ',
        value: ' Kawardha ',
      },
      {
        lable: ' Keskal ',
        value: ' Keskal ',
      },
      {
        lable: ' Khairgarh ',
        value: ' Khairgarh ',
      },
      {
        lable: ' Kondagaon ',
        value: ' Kondagaon ',
      },
      {
        lable: ' Konta ',
        value: ' Konta ',
      },
      {
        lable: ' Korba ',
        value: ' Korba ',
      },
      {
        lable: ' Korea ',
        value: ' Korea ',
      },
      {
        lable: ' Kota ',
        value: ' Kota ',
      },
      {
        lable: ' Koyelibeda ',
        value: ' Koyelibeda ',
      },
      {
        lable: ' Kuakunda ',
        value: ' Kuakunda ',
      },
      {
        lable: ' Kunkuri ',
        value: ' Kunkuri ',
      },
      {
        lable: ' Kurud ',
        value: ' Kurud ',
      },
      {
        lable: ' Lohadigundah ',
        value: ' Lohadigundah ',
      },
      {
        lable: ' Lormi ',
        value: ' Lormi ',
      },
      {
        lable: ' Luckwada ',
        value: ' Luckwada ',
      },
      {
        lable: ' Mahasamund ',
        value: ' Mahasamund ',
      },
      {
        lable: ' Makodi ',
        value: ' Makodi ',
      },
      {
        lable: ' Manendragarh ',
        value: ' Manendragarh ',
      },
      {
        lable: ' Manpur ',
        value: ' Manpur ',
      },
      {
        lable: ' Marwahi ',
        value: ' Marwahi ',
      },
      {
        lable: ' Mohla ',
        value: ' Mohla ',
      },
      {
        lable: ' Mungeli ',
        value: ' Mungeli ',
      },
      {
        lable: ' Nagri ',
        value: ' Nagri ',
      },
      {
        lable: ' Narainpur ',
        value: ' Narainpur ',
      },
      {
        lable: ' Narayanpur ',
        value: ' Narayanpur ',
      },
      {
        lable: ' Neora ',
        value: ' Neora ',
      },
      {
        lable: ' Netanar ',
        value: ' Netanar ',
      },
      {
        lable: ' Odgi ',
        value: ' Odgi ',
      },
      {
        lable: ' Padamkot ',
        value: ' Padamkot ',
      },
      {
        lable: ' Pakhanjur ',
        value: ' Pakhanjur ',
      },
      {
        lable: ' Pali ',
        value: ' Pali ',
      },
      {
        lable: ' Pandaria ',
        value: ' Pandaria ',
      },
      {
        lable: ' Pandishankar ',
        value: ' Pandishankar ',
      },
      {
        lable: ' Parasgaon ',
        value: ' Parasgaon ',
      },
      {
        lable: ' Pasan ',
        value: ' Pasan ',
      },
      {
        lable: ' Patan ',
        value: ' Patan ',
      },
      {
        lable: ' Pathalgaon ',
        value: ' Pathalgaon ',
      },
      {
        lable: ' Pendra ',
        value: ' Pendra ',
      },
      {
        lable: ' Pratappur ',
        value: ' Pratappur ',
      },
      {
        lable: ' Premnagar ',
        value: ' Premnagar ',
      },
      {
        lable: ' Raigarh ',
        value: ' Raigarh ',
      },
      {
        lable: ' Raipur ',
        value: ' Raipur ',
      },
      {
        lable: ' Rajnandgaon ',
        value: ' Rajnandgaon ',
      },
      {
        lable: ' Rajpur ',
        value: ' Rajpur ',
      },
      {
        lable: ' Ramchandrapur ',
        value: ' Ramchandrapur ',
      },
      {
        lable: ' Saraipali ',
        value: ' Saraipali ',
      },
      {
        lable: ' Saranggarh ',
        value: ' Saranggarh ',
      },
      {
        lable: ' Sarona ',
        value: ' Sarona ',
      },
      {
        lable: ' Semaria ',
        value: ' Semaria ',
      },
      {
        lable: ' Shakti ',
        value: ' Shakti ',
      },
      {
        lable: ' Sitapur ',
        value: ' Sitapur ',
      },
      {
        lable: ' Sukma ',
        value: ' Sukma ',
      },
      {
        lable: ' Surajpur ',
        value: ' Surajpur ',
      },
      {
        lable: ' Surguja ',
        value: ' Surguja ',
      },
      {
        lable: ' Tapkara ',
        value: ' Tapkara ',
      },
      {
        lable: ' Toynar ',
        value: ' Toynar ',
      },
      {
        lable: ' Udaipur ',
        value: ' Udaipur ',
      },
      {
        lable: ' Uproda ',
        value: ' Uproda ',
      },
      {
        lable: ' Wadrainagar',
        value: ' Wadrainagar',
      },
    ],
    [
      {
        lable: ' Amal ',
        value: ' Amal ',
      },
      {
        lable: ' Amli ',
        value: ' Amli ',
      },
      {
        lable: ' Bedpa ',
        value: ' Bedpa ',
      },
      {
        lable: ' Chikhli ',
        value: ' Chikhli ',
      },
      {
        lable: ' Dadra & Nagar Haveli ',
        value: ' Dadra & Nagar Haveli ',
      },
      {
        lable: ' Dahikhed ',
        value: ' Dahikhed ',
      },
      {
        lable: ' Dolara ',
        value: ' Dolara ',
      },
      {
        lable: ' Galonda ',
        value: ' Galonda ',
      },
      {
        lable: ' Kanadi ',
        value: ' Kanadi ',
      },
      {
        lable: ' Karchond ',
        value: ' Karchond ',
      },
      {
        lable: ' Khadoli ',
        value: ' Khadoli ',
      },
      {
        lable: ' Kharadpada ',
        value: ' Kharadpada ',
      },
      {
        lable: ' Kherabari ',
        value: ' Kherabari ',
      },
      {
        lable: ' Kherdi ',
        value: ' Kherdi ',
      },
      {
        lable: ' Kothar ',
        value: ' Kothar ',
      },
      {
        lable: ' Luari ',
        value: ' Luari ',
      },
      {
        lable: ' Mashat ',
        value: ' Mashat ',
      },
      {
        lable: ' Rakholi ',
        value: ' Rakholi ',
      },
      {
        lable: ' Rudana ',
        value: ' Rudana ',
      },
      {
        lable: ' Saili ',
        value: ' Saili ',
      },
      {
        lable: ' Sili ',
        value: ' Sili ',
      },
      {
        lable: ' Silvassa ',
        value: ' Silvassa ',
      },
      {
        lable: ' Sindavni ',
        value: ' Sindavni ',
      },
      {
        lable: ' Udva ',
        value: ' Udva ',
      },
      {
        lable: ' Umbarkoi ',
        value: ' Umbarkoi ',
      },
      {
        lable: ' Vansda ',
        value: ' Vansda ',
      },
      {
        lable: ' Vasona ',
        value: ' Vasona ',
      },
      {
        lable: ' Velugam ',
        value: ' Velugam ',
      },
    ],
    [
      {
        lable: ' Brancavare ',
        value: ' Brancavare ',
      },
      {
        lable: ' Dagasi ',
        value: ' Dagasi ',
      },
      {
        lable: ' Daman ',
        value: ' Daman ',
      },
      {
        lable: ' Diu ',
        value: ' Diu ',
      },
      {
        lable: ' Magarvara ',
        value: ' Magarvara ',
      },
      {
        lable: ' Nagwa ',
        value: ' Nagwa ',
      },
      {
        lable: ' Pariali ',
        value: ' Pariali ',
      },
      {
        lable: ' Passo Covo ',
        value: ' Passo Covo ',
      },
    ],
    [
      {
        lable: ' Central Delhi ',
        value: ' Central Delhi ',
      },
      {
        lable: ' East Delhi ',
        value: ' East Delhi ',
      },
      {
        lable: ' New Delhi ',
        value: ' New Delhi ',
      },
      {
        lable: ' North Delhi ',
        value: ' North Delhi ',
      },
      {
        lable: ' North East Delhi ',
        value: ' North East Delhi ',
      },
      {
        lable: ' North West Delhi ',
        value: ' North West Delhi ',
      },
      {
        lable: ' South Delhi ',
        value: ' South Delhi ',
      },
      {
        lable: ' South West Delhi ',
        value: ' South West Delhi ',
      },
      {
        lable: ' West Delhi ',
        value: ' West Delhi ',
      },
    ],
    [
      {
        lable: ' Canacona ',
        value: ' Canacona ',
      },
      {
        lable: ' Candolim ',
        value: ' Candolim ',
      },
      {
        lable: ' Chinchinim ',
        value: ' Chinchinim ',
      },
      {
        lable: ' Cortalim ',
        value: ' Cortalim ',
      },
      {
        lable: ' Goa ',
        value: ' Goa ',
      },
      {
        lable: ' Jua ',
        value: ' Jua ',
      },
      {
        lable: ' Madgaon ',
        value: ' Madgaon ',
      },
      {
        lable: ' Mahem ',
        value: ' Mahem ',
      },
      {
        lable: ' Mapuca ',
        value: ' Mapuca ',
      },
      {
        lable: ' Marmagao ',
        value: ' Marmagao ',
      },
      {
        lable: ' Panji ',
        value: ' Panji ',
      },
      {
        lable: ' Ponda ',
        value: ' Ponda ',
      },
      {
        lable: ' Sanvordem ',
        value: ' Sanvordem ',
      },
      {
        lable: ' Terekhol ',
        value: ' Terekhol ',
      },
    ],
    [
      {
        lable: ' Ahmedabad ',
        value: ' Ahmedabad ',
      },
      {
        lable: ' Ahwa ',
        value: ' Ahwa ',
      },
      {
        lable: ' Amod ',
        value: ' Amod ',
      },
      {
        lable: ' Amreli ',
        value: ' Amreli ',
      },
      {
        lable: ' Anand ',
        value: ' Anand ',
      },
      {
        lable: ' Anjar ',
        value: ' Anjar ',
      },
      {
        lable: ' Ankaleshwar ',
        value: ' Ankaleshwar ',
      },
      {
        lable: ' Babra ',
        value: ' Babra ',
      },
      {
        lable: ' Balasinor ',
        value: ' Balasinor ',
      },
      {
        lable: ' Banaskantha ',
        value: ' Banaskantha ',
      },
      {
        lable: ' Bansada ',
        value: ' Bansada ',
      },
      {
        lable: ' Bardoli ',
        value: ' Bardoli ',
      },
      {
        lable: ' Bareja ',
        value: ' Bareja ',
      },
      {
        lable: ' Baroda ',
        value: ' Baroda ',
      },
      {
        lable: ' Barwala ',
        value: ' Barwala ',
      },
      {
        lable: ' Bayad ',
        value: ' Bayad ',
      },
      {
        lable: ' Bhachav ',
        value: ' Bhachav ',
      },
      {
        lable: ' Bhanvad ',
        value: ' Bhanvad ',
      },
      {
        lable: ' Bharuch ',
        value: ' Bharuch ',
      },
      {
        lable: ' Bhavnagar ',
        value: ' Bhavnagar ',
      },
      {
        lable: ' Bhiloda ',
        value: ' Bhiloda ',
      },
      {
        lable: ' Bhuj ',
        value: ' Bhuj ',
      },
      {
        lable: ' Billimora ',
        value: ' Billimora ',
      },
      {
        lable: ' Borsad ',
        value: ' Borsad ',
      },
      {
        lable: ' Botad ',
        value: ' Botad ',
      },
      {
        lable: ' Chanasma ',
        value: ' Chanasma ',
      },
      {
        lable: ' Chhota Udaipur ',
        value: ' Chhota Udaipur ',
      },
      {
        lable: ' Chotila ',
        value: ' Chotila ',
      },
      {
        lable: ' Dabhoi ',
        value: ' Dabhoi ',
      },
      {
        lable: ' Dahod ',
        value: ' Dahod ',
      },
      {
        lable: ' Damnagar ',
        value: ' Damnagar ',
      },
      {
        lable: ' Dang ',
        value: ' Dang ',
      },
      {
        lable: ' Danta ',
        value: ' Danta ',
      },
      {
        lable: ' Dasada ',
        value: ' Dasada ',
      },
      {
        lable: ' Dediapada ',
        value: ' Dediapada ',
      },
      {
        lable: ' Deesa ',
        value: ' Deesa ',
      },
      {
        lable: ' Dehgam ',
        value: ' Dehgam ',
      },
      {
        lable: ' Deodar ',
        value: ' Deodar ',
      },
      {
        lable: ' Devgadhbaria ',
        value: ' Devgadhbaria ',
      },
      {
        lable: ' Dhandhuka ',
        value: ' Dhandhuka ',
      },
      {
        lable: ' Dhanera ',
        value: ' Dhanera ',
      },
      {
        lable: ' Dharampur ',
        value: ' Dharampur ',
      },
      {
        lable: ' Dhari ',
        value: ' Dhari ',
      },
      {
        lable: ' Dholka ',
        value: ' Dholka ',
      },
      {
        lable: ' Dhoraji ',
        value: ' Dhoraji ',
      },
      {
        lable: ' Dhrangadhra ',
        value: ' Dhrangadhra ',
      },
      {
        lable: ' Dhrol ',
        value: ' Dhrol ',
      },
      {
        lable: ' Dwarka ',
        value: ' Dwarka ',
      },
      {
        lable: ' Fortsongadh ',
        value: ' Fortsongadh ',
      },
      {
        lable: ' Gadhada ',
        value: ' Gadhada ',
      },
      {
        lable: ' Gandhi Nagar ',
        value: ' Gandhi Nagar ',
      },
      {
        lable: ' Gariadhar ',
        value: ' Gariadhar ',
      },
      {
        lable: ' Godhra ',
        value: ' Godhra ',
      },
      {
        lable: ' Gogodar ',
        value: ' Gogodar ',
      },
      {
        lable: ' Gondal ',
        value: ' Gondal ',
      },
      {
        lable: ' Halol ',
        value: ' Halol ',
      },
      {
        lable: ' Halvad ',
        value: ' Halvad ',
      },
      {
        lable: ' Harij ',
        value: ' Harij ',
      },
      {
        lable: ' Himatnagar ',
        value: ' Himatnagar ',
      },
      {
        lable: ' Idar ',
        value: ' Idar ',
      },
      {
        lable: ' Jambusar ',
        value: ' Jambusar ',
      },
      {
        lable: ' Jamjodhpur ',
        value: ' Jamjodhpur ',
      },
      {
        lable: ' Jamkalyanpur ',
        value: ' Jamkalyanpur ',
      },
      {
        lable: ' Jamnagar ',
        value: ' Jamnagar ',
      },
      {
        lable: ' Jasdan ',
        value: ' Jasdan ',
      },
      {
        lable: ' Jetpur ',
        value: ' Jetpur ',
      },
      {
        lable: ' Jhagadia ',
        value: ' Jhagadia ',
      },
      {
        lable: ' Jhalod ',
        value: ' Jhalod ',
      },
      {
        lable: ' Jodia ',
        value: ' Jodia ',
      },
      {
        lable: ' Junagadh ',
        value: ' Junagadh ',
      },
      {
        lable: ' Junagarh ',
        value: ' Junagarh ',
      },
      {
        lable: ' Kalawad ',
        value: ' Kalawad ',
      },
      {
        lable: ' Kalol ',
        value: ' Kalol ',
      },
      {
        lable: ' Kapad Wanj ',
        value: ' Kapad Wanj ',
      },
      {
        lable: ' Keshod ',
        value: ' Keshod ',
      },
      {
        lable: ' Khambat ',
        value: ' Khambat ',
      },
      {
        lable: ' Khambhalia ',
        value: ' Khambhalia ',
      },
      {
        lable: ' Khavda ',
        value: ' Khavda ',
      },
      {
        lable: ' Kheda ',
        value: ' Kheda ',
      },
      {
        lable: ' Khedbrahma ',
        value: ' Khedbrahma ',
      },
      {
        lable: ' Kheralu ',
        value: ' Kheralu ',
      },
      {
        lable: ' Kodinar ',
        value: ' Kodinar ',
      },
      {
        lable: ' Kotdasanghani ',
        value: ' Kotdasanghani ',
      },
      {
        lable: ' Kunkawav ',
        value: ' Kunkawav ',
      },
      {
        lable: ' Kutch ',
        value: ' Kutch ',
      },
      {
        lable: ' Kutchmandvi ',
        value: ' Kutchmandvi ',
      },
      {
        lable: ' Kutiyana ',
        value: ' Kutiyana ',
      },
      {
        lable: ' Lakhpat ',
        value: ' Lakhpat ',
      },
      {
        lable: ' Lakhtar ',
        value: ' Lakhtar ',
      },
      {
        lable: ' Lalpur ',
        value: ' Lalpur ',
      },
      {
        lable: ' Limbdi ',
        value: ' Limbdi ',
      },
      {
        lable: ' Limkheda ',
        value: ' Limkheda ',
      },
      {
        lable: ' Lunavada ',
        value: ' Lunavada ',
      },
      {
        lable: ' M.M.Mangrol ',
        value: ' M.M.Mangrol ',
      },
      {
        lable: ' Mahuva ',
        value: ' Mahuva ',
      },
      {
        lable: ' Malia-Hatina ',
        value: ' Malia-Hatina ',
      },
      {
        lable: ' Maliya ',
        value: ' Maliya ',
      },
      {
        lable: ' Malpur ',
        value: ' Malpur ',
      },
      {
        lable: ' Manavadar ',
        value: ' Manavadar ',
      },
      {
        lable: ' Mandvi ',
        value: ' Mandvi ',
      },
      {
        lable: ' Mangrol ',
        value: ' Mangrol ',
      },
      {
        lable: ' Mehmedabad ',
        value: ' Mehmedabad ',
      },
      {
        lable: ' Mehsana ',
        value: ' Mehsana ',
      },
      {
        lable: ' Miyagam ',
        value: ' Miyagam ',
      },
      {
        lable: ' Modasa ',
        value: ' Modasa ',
      },
      {
        lable: ' Morvi ',
        value: ' Morvi ',
      },
      {
        lable: ' Muli ',
        value: ' Muli ',
      },
      {
        lable: ' Mundra ',
        value: ' Mundra ',
      },
      {
        lable: ' Nadiad ',
        value: ' Nadiad ',
      },
      {
        lable: ' Nakhatrana ',
        value: ' Nakhatrana ',
      },
      {
        lable: ' Nalia ',
        value: ' Nalia ',
      },
      {
        lable: ' Narmada ',
        value: ' Narmada ',
      },
      {
        lable: ' Naswadi ',
        value: ' Naswadi ',
      },
      {
        lable: ' Navasari ',
        value: ' Navasari ',
      },
      {
        lable: ' Nizar ',
        value: ' Nizar ',
      },
      {
        lable: ' Okha ',
        value: ' Okha ',
      },
      {
        lable: ' Paddhari ',
        value: ' Paddhari ',
      },
      {
        lable: ' Padra ',
        value: ' Padra ',
      },
      {
        lable: ' Palanpur ',
        value: ' Palanpur ',
      },
      {
        lable: ' Palitana ',
        value: ' Palitana ',
      },
      {
        lable: ' Panchmahals ',
        value: ' Panchmahals ',
      },
      {
        lable: ' Patan ',
        value: ' Patan ',
      },
      {
        lable: ' Pavijetpur ',
        value: ' Pavijetpur ',
      },
      {
        lable: ' Porbandar ',
        value: ' Porbandar ',
      },
      {
        lable: ' Prantij ',
        value: ' Prantij ',
      },
      {
        lable: ' Radhanpur ',
        value: ' Radhanpur ',
      },
      {
        lable: ' Rahpar ',
        value: ' Rahpar ',
      },
      {
        lable: ' Rajaula ',
        value: ' Rajaula ',
      },
      {
        lable: ' Rajkot ',
        value: ' Rajkot ',
      },
      {
        lable: ' Rajpipla ',
        value: ' Rajpipla ',
      },
      {
        lable: ' Ranavav ',
        value: ' Ranavav ',
      },
      {
        lable: ' Sabarkantha ',
        value: ' Sabarkantha ',
      },
      {
        lable: ' Sanand ',
        value: ' Sanand ',
      },
      {
        lable: ' Sankheda ',
        value: ' Sankheda ',
      },
      {
        lable: ' Santalpur ',
        value: ' Santalpur ',
      },
      {
        lable: ' Santrampur ',
        value: ' Santrampur ',
      },
      {
        lable: ' Savarkundla ',
        value: ' Savarkundla ',
      },
      {
        lable: ' Savli ',
        value: ' Savli ',
      },
      {
        lable: ' Sayan ',
        value: ' Sayan ',
      },
      {
        lable: ' Sayla ',
        value: ' Sayla ',
      },
      {
        lable: ' Shehra ',
        value: ' Shehra ',
      },
      {
        lable: ' Sidhpur ',
        value: ' Sidhpur ',
      },
      {
        lable: ' Sihor ',
        value: ' Sihor ',
      },
      {
        lable: ' Sojitra ',
        value: ' Sojitra ',
      },
      {
        lable: ' Sumrasar ',
        value: ' Sumrasar ',
      },
      {
        lable: ' Surat ',
        value: ' Surat ',
      },
      {
        lable: ' Surendranagar ',
        value: ' Surendranagar ',
      },
      {
        lable: ' Talaja ',
        value: ' Talaja ',
      },
      {
        lable: ' Thara ',
        value: ' Thara ',
      },
      {
        lable: ' Tharad ',
        value: ' Tharad ',
      },
      {
        lable: ' Thasra ',
        value: ' Thasra ',
      },
      {
        lable: ' Una-Diu ',
        value: ' Una-Diu ',
      },
      {
        lable: ' Upleta ',
        value: ' Upleta ',
      },
      {
        lable: ' Vadgam ',
        value: ' Vadgam ',
      },
      {
        lable: ' Vadodara ',
        value: ' Vadodara ',
      },
      {
        lable: ' Valia ',
        value: ' Valia ',
      },
      {
        lable: ' Vallabhipur ',
        value: ' Vallabhipur ',
      },
      {
        lable: ' Valod ',
        value: ' Valod ',
      },
      {
        lable: ' Valsad ',
        value: ' Valsad ',
      },
      {
        lable: ' Vanthali ',
        value: ' Vanthali ',
      },
      {
        lable: ' Vapi ',
        value: ' Vapi ',
      },
      {
        lable: ' Vav ',
        value: ' Vav ',
      },
      {
        lable: ' Veraval ',
        value: ' Veraval ',
      },
      {
        lable: ' Vijapur ',
        value: ' Vijapur ',
      },
      {
        lable: ' Viramgam ',
        value: ' Viramgam ',
      },
      {
        lable: ' Visavadar ',
        value: ' Visavadar ',
      },
      {
        lable: ' Visnagar ',
        value: ' Visnagar ',
      },
      {
        lable: ' Vyara ',
        value: ' Vyara ',
      },
      {
        lable: ' Waghodia ',
        value: ' Waghodia ',
      },
      {
        lable: ' Wankaner ',
        value: ' Wankaner ',
      },
    ],
    [
      {
        lable: ' Adampur Mandi ',
        value: ' Adampur Mandi ',
      },
      {
        lable: ' Ambala ',
        value: ' Ambala ',
      },
      {
        lable: ' Assandh ',
        value: ' Assandh ',
      },
      {
        lable: ' Bahadurgarh ',
        value: ' Bahadurgarh ',
      },
      {
        lable: ' Barara ',
        value: ' Barara ',
      },
      {
        lable: ' Barwala ',
        value: ' Barwala ',
      },
      {
        lable: ' Bawal ',
        value: ' Bawal ',
      },
      {
        lable: ' Bawanikhera ',
        value: ' Bawanikhera ',
      },
      {
        lable: ' Bhiwani ',
        value: ' Bhiwani ',
      },
      {
        lable: ' Charkhidadri ',
        value: ' Charkhidadri ',
      },
      {
        lable: ' Cheeka ',
        value: ' Cheeka ',
      },
      {
        lable: ' Chhachrauli ',
        value: ' Chhachrauli ',
      },
      {
        lable: ' Dabwali ',
        value: ' Dabwali ',
      },
      {
        lable: ' Ellenabad ',
        value: ' Ellenabad ',
      },
      {
        lable: ' Faridabad ',
        value: ' Faridabad ',
      },
      {
        lable: ' Fatehabad ',
        value: ' Fatehabad ',
      },
      {
        lable: ' Ferojpur Jhirka ',
        value: ' Ferojpur Jhirka ',
      },
      {
        lable: ' Gharaunda ',
        value: ' Gharaunda ',
      },
      {
        lable: ' Gohana ',
        value: ' Gohana ',
      },
      {
        lable: ' Gurgaon ',
        value: ' Gurgaon ',
      },
      {
        lable: ' Hansi ',
        value: ' Hansi ',
      },
      {
        lable: ' Hisar ',
        value: ' Hisar ',
      },
      {
        lable: ' Jagadhari ',
        value: ' Jagadhari ',
      },
      {
        lable: ' Jatusana ',
        value: ' Jatusana ',
      },
      {
        lable: ' Jhajjar ',
        value: ' Jhajjar ',
      },
      {
        lable: ' Jind ',
        value: ' Jind ',
      },
      {
        lable: ' Julana ',
        value: ' Julana ',
      },
      {
        lable: ' Kaithal ',
        value: ' Kaithal ',
      },
      {
        lable: ' Kalanaur ',
        value: ' Kalanaur ',
      },
      {
        lable: ' Kalanwali ',
        value: ' Kalanwali ',
      },
      {
        lable: ' Kalka ',
        value: ' Kalka ',
      },
      {
        lable: ' Karnal ',
        value: ' Karnal ',
      },
      {
        lable: ' Kosli ',
        value: ' Kosli ',
      },
      {
        lable: ' Kurukshetra ',
        value: ' Kurukshetra ',
      },
      {
        lable: ' Loharu ',
        value: ' Loharu ',
      },
      {
        lable: ' Mahendragarh ',
        value: ' Mahendragarh ',
      },
      {
        lable: ' Meham ',
        value: ' Meham ',
      },
      {
        lable: ' Mewat ',
        value: ' Mewat ',
      },
      {
        lable: ' Mohindergarh ',
        value: ' Mohindergarh ',
      },
      {
        lable: ' Naraingarh ',
        value: ' Naraingarh ',
      },
      {
        lable: ' Narnaul ',
        value: ' Narnaul ',
      },
      {
        lable: ' Narwana ',
        value: ' Narwana ',
      },
      {
        lable: ' Nilokheri ',
        value: ' Nilokheri ',
      },
      {
        lable: ' Nuh ',
        value: ' Nuh ',
      },
      {
        lable: ' Palwal ',
        value: ' Palwal ',
      },
      {
        lable: ' Panchkula ',
        value: ' Panchkula ',
      },
      {
        lable: ' Panipat ',
        value: ' Panipat ',
      },
      {
        lable: ' Pehowa ',
        value: ' Pehowa ',
      },
      {
        lable: ' Ratia ',
        value: ' Ratia ',
      },
      {
        lable: ' Rewari ',
        value: ' Rewari ',
      },
      {
        lable: ' Rohtak ',
        value: ' Rohtak ',
      },
      {
        lable: ' Safidon ',
        value: ' Safidon ',
      },
      {
        lable: ' Sirsa ',
        value: ' Sirsa ',
      },
      {
        lable: ' Siwani ',
        value: ' Siwani ',
      },
      {
        lable: ' Sonipat ',
        value: ' Sonipat ',
      },
      {
        lable: ' Tohana ',
        value: ' Tohana ',
      },
      {
        lable: ' Tohsam ',
        value: ' Tohsam ',
      },
      {
        lable: ' Yamunanagar ',
        value: ' Yamunanagar ',
      },
    ],
    [
      {
        lable: ' Amb ',
        value: ' Amb ',
      },
      {
        lable: ' Arki ',
        value: ' Arki ',
      },
      {
        lable: ' Banjar ',
        value: ' Banjar ',
      },
      {
        lable: ' Bharmour ',
        value: ' Bharmour ',
      },
      {
        lable: ' Bilaspur ',
        value: ' Bilaspur ',
      },
      {
        lable: ' Chamba ',
        value: ' Chamba ',
      },
      {
        lable: ' Churah ',
        value: ' Churah ',
      },
      {
        lable: ' Dalhousie ',
        value: ' Dalhousie ',
      },
      {
        lable: ' Dehra Gopipur ',
        value: ' Dehra Gopipur ',
      },
      {
        lable: ' Hamirpur ',
        value: ' Hamirpur ',
      },
      {
        lable: ' Jogindernagar ',
        value: ' Jogindernagar ',
      },
      {
        lable: ' Kalpa ',
        value: ' Kalpa ',
      },
      {
        lable: ' Kangra ',
        value: ' Kangra ',
      },
      {
        lable: ' Kinnaur ',
        value: ' Kinnaur ',
      },
      {
        lable: ' Kullu ',
        value: ' Kullu ',
      },
      {
        lable: ' Lahaul ',
        value: ' Lahaul ',
      },
      {
        lable: ' Mandi ',
        value: ' Mandi ',
      },
      {
        lable: ' Nahan ',
        value: ' Nahan ',
      },
      {
        lable: ' Nalagarh ',
        value: ' Nalagarh ',
      },
      {
        lable: ' Nirmand ',
        value: ' Nirmand ',
      },
      {
        lable: ' Nurpur ',
        value: ' Nurpur ',
      },
      {
        lable: ' Palampur ',
        value: ' Palampur ',
      },
      {
        lable: ' Pangi ',
        value: ' Pangi ',
      },
      {
        lable: ' Paonta ',
        value: ' Paonta ',
      },
      {
        lable: ' Pooh ',
        value: ' Pooh ',
      },
      {
        lable: ' Rajgarh ',
        value: ' Rajgarh ',
      },
      {
        lable: ' Rampur Bushahar ',
        value: ' Rampur Bushahar ',
      },
      {
        lable: ' Rohru ',
        value: ' Rohru ',
      },
      {
        lable: ' Shimla ',
        value: ' Shimla ',
      },
      {
        lable: ' Sirmaur ',
        value: ' Sirmaur ',
      },
      {
        lable: ' Solan ',
        value: ' Solan ',
      },
      {
        lable: ' Spiti ',
        value: ' Spiti ',
      },
      {
        lable: ' Sundernagar ',
        value: ' Sundernagar ',
      },
      {
        lable: ' Theog ',
        value: ' Theog ',
      },
      {
        lable: ' Udaipur ',
        value: ' Udaipur ',
      },
      {
        lable: ' Una',
        value: ' Una',
      },
    ],
    [
      {
        lable: ' Akhnoor ',
        value: ' Akhnoor ',
      },
      {
        lable: ' Anantnag ',
        value: ' Anantnag ',
      },
      {
        lable: ' Badgam ',
        value: ' Badgam ',
      },
      {
        lable: ' Bandipur ',
        value: ' Bandipur ',
      },
      {
        lable: ' Baramulla ',
        value: ' Baramulla ',
      },
      {
        lable: ' Basholi ',
        value: ' Basholi ',
      },
      {
        lable: ' Bedarwah ',
        value: ' Bedarwah ',
      },
      {
        lable: ' Budgam ',
        value: ' Budgam ',
      },
      {
        lable: ' Doda ',
        value: ' Doda ',
      },
      {
        lable: ' Gulmarg ',
        value: ' Gulmarg ',
      },
      {
        lable: ' Jammu ',
        value: ' Jammu ',
      },
      {
        lable: ' Kalakot ',
        value: ' Kalakot ',
      },
      {
        lable: ' Kargil ',
        value: ' Kargil ',
      },
      {
        lable: ' Karnah ',
        value: ' Karnah ',
      },
      {
        lable: ' Kathua ',
        value: ' Kathua ',
      },
      {
        lable: ' Kishtwar ',
        value: ' Kishtwar ',
      },
      {
        lable: ' Kulgam ',
        value: ' Kulgam ',
      },
      {
        lable: ' Kupwara ',
        value: ' Kupwara ',
      },
      {
        lable: ' Leh ',
        value: ' Leh ',
      },
      {
        lable: ' Mahore ',
        value: ' Mahore ',
      },
      {
        lable: ' Nagrota ',
        value: ' Nagrota ',
      },
      {
        lable: ' Nobra ',
        value: ' Nobra ',
      },
      {
        lable: ' Nowshera ',
        value: ' Nowshera ',
      },
      {
        lable: ' Nyoma ',
        value: ' Nyoma ',
      },
      {
        lable: ' Padam ',
        value: ' Padam ',
      },
      {
        lable: ' Pahalgam ',
        value: ' Pahalgam ',
      },
      {
        lable: ' Patnitop ',
        value: ' Patnitop ',
      },
      {
        lable: ' Poonch ',
        value: ' Poonch ',
      },
      {
        lable: ' Pulwama ',
        value: ' Pulwama ',
      },
      {
        lable: ' Rajouri ',
        value: ' Rajouri ',
      },
      {
        lable: ' Ramban ',
        value: ' Ramban ',
      },
      {
        lable: ' Ramnagar ',
        value: ' Ramnagar ',
      },
      {
        lable: ' Reasi ',
        value: ' Reasi ',
      },
      {
        lable: ' Samba ',
        value: ' Samba ',
      },
      {
        lable: ' Srinagar ',
        value: ' Srinagar ',
      },
      {
        lable: ' Udhampur ',
        value: ' Udhampur ',
      },
      {
        lable: ' Vaishno Devi ',
        value: ' Vaishno Devi ',
      },
    ],
    [
      {
        lable: ' Bagodar ',
        value: ' Bagodar ',
      },
      {
        lable: ' Baharagora ',
        value: ' Baharagora ',
      },
      {
        lable: ' Balumath ',
        value: ' Balumath ',
      },
      {
        lable: ' Barhi ',
        value: ' Barhi ',
      },
      {
        lable: ' Barkagaon ',
        value: ' Barkagaon ',
      },
      {
        lable: ' Barwadih ',
        value: ' Barwadih ',
      },
      {
        lable: ' Basia ',
        value: ' Basia ',
      },
      {
        lable: ' Bermo ',
        value: ' Bermo ',
      },
      {
        lable: ' Bhandaria ',
        value: ' Bhandaria ',
      },
      {
        lable: ' Bhawanathpur ',
        value: ' Bhawanathpur ',
      },
      {
        lable: ' Bishrampur ',
        value: ' Bishrampur ',
      },
      {
        lable: ' Bokaro ',
        value: ' Bokaro ',
      },
      {
        lable: ' Bolwa ',
        value: ' Bolwa ',
      },
      {
        lable: ' Bundu ',
        value: ' Bundu ',
      },
      {
        lable: ' Chaibasa ',
        value: ' Chaibasa ',
      },
      {
        lable: ' Chainpur ',
        value: ' Chainpur ',
      },
      {
        lable: ' Chakardharpur ',
        value: ' Chakardharpur ',
      },
      {
        lable: ' Chandil ',
        value: ' Chandil ',
      },
      {
        lable: ' Chatra ',
        value: ' Chatra ',
      },
      {
        lable: ' Chavparan ',
        value: ' Chavparan ',
      },
      {
        lable: ' Daltonganj ',
        value: ' Daltonganj ',
      },
      {
        lable: ' Deoghar ',
        value: ' Deoghar ',
      },
      {
        lable: ' Dhanbad ',
        value: ' Dhanbad ',
      },
      {
        lable: ' Dumka ',
        value: ' Dumka ',
      },
      {
        lable: ' Dumri ',
        value: ' Dumri ',
      },
      {
        lable: ' Garhwa ',
        value: ' Garhwa ',
      },
      {
        lable: ' Garu ',
        value: ' Garu ',
      },
      {
        lable: ' Ghaghra ',
        value: ' Ghaghra ',
      },
      {
        lable: ' Ghatsila ',
        value: ' Ghatsila ',
      },
      {
        lable: ' Giridih ',
        value: ' Giridih ',
      },
      {
        lable: ' Godda ',
        value: ' Godda ',
      },
      {
        lable: ' Gomia ',
        value: ' Gomia ',
      },
      {
        lable: ' Govindpur ',
        value: ' Govindpur ',
      },
      {
        lable: ' Gumla ',
        value: ' Gumla ',
      },
      {
        lable: ' Hazaribagh ',
        value: ' Hazaribagh ',
      },
      {
        lable: ' Hunterganj ',
        value: ' Hunterganj ',
      },
      {
        lable: ' Ichak ',
        value: ' Ichak ',
      },
      {
        lable: ' Itki ',
        value: ' Itki ',
      },
      {
        lable: ' Jagarnathpur ',
        value: ' Jagarnathpur ',
      },
      {
        lable: ' Jamshedpur ',
        value: ' Jamshedpur ',
      },
      {
        lable: ' Jamtara ',
        value: ' Jamtara ',
      },
      {
        lable: ' Japla ',
        value: ' Japla ',
      },
      {
        lable: ' Jharmundi ',
        value: ' Jharmundi ',
      },
      {
        lable: ' Jhinkpani ',
        value: ' Jhinkpani ',
      },
      {
        lable: ' Jhumaritalaiya ',
        value: ' Jhumaritalaiya ',
      },
      {
        lable: ' Kathikund ',
        value: ' Kathikund ',
      },
      {
        lable: ' Kharsawa ',
        value: ' Kharsawa ',
      },
      {
        lable: ' Khunti ',
        value: ' Khunti ',
      },
      {
        lable: ' Koderma ',
        value: ' Koderma ',
      },
      {
        lable: ' Kolebira ',
        value: ' Kolebira ',
      },
      {
        lable: ' Latehar ',
        value: ' Latehar ',
      },
      {
        lable: ' Lohardaga ',
        value: ' Lohardaga ',
      },
      {
        lable: ' Madhupur ',
        value: ' Madhupur ',
      },
      {
        lable: ' Mahagama ',
        value: ' Mahagama ',
      },
      {
        lable: ' Maheshpur Raj ',
        value: ' Maheshpur Raj ',
      },
      {
        lable: ' Mandar ',
        value: ' Mandar ',
      },
      {
        lable: ' Mandu ',
        value: ' Mandu ',
      },
      {
        lable: ' Manoharpur ',
        value: ' Manoharpur ',
      },
      {
        lable: ' Muri ',
        value: ' Muri ',
      },
      {
        lable: ' Nagarutatri ',
        value: ' Nagarutatri ',
      },
      {
        lable: ' Nala ',
        value: ' Nala ',
      },
      {
        lable: ' Noamundi ',
        value: ' Noamundi ',
      },
      {
        lable: ' Pakur ',
        value: ' Pakur ',
      },
      {
        lable: ' Palamu ',
        value: ' Palamu ',
      },
      {
        lable: ' Palkot ',
        value: ' Palkot ',
      },
      {
        lable: ' Patan ',
        value: ' Patan ',
      },
      {
        lable: ' Rajdhanwar ',
        value: ' Rajdhanwar ',
      },
      {
        lable: ' Rajmahal ',
        value: ' Rajmahal ',
      },
      {
        lable: ' Ramgarh ',
        value: ' Ramgarh ',
      },
      {
        lable: ' Ranchi ',
        value: ' Ranchi ',
      },
      {
        lable: ' Sahibganj ',
        value: ' Sahibganj ',
      },
      {
        lable: ' Saraikela ',
        value: ' Saraikela ',
      },
      {
        lable: ' Simaria ',
        value: ' Simaria ',
      },
      {
        lable: ' Simdega ',
        value: ' Simdega ',
      },
      {
        lable: ' Singhbhum ',
        value: ' Singhbhum ',
      },
      {
        lable: ' Tisri ',
        value: ' Tisri ',
      },
      {
        lable: ' Torpa ',
        value: ' Torpa ',
      },
    ],
    [
      {
        lable: ' Afzalpur ',
        value: ' Afzalpur ',
      },
      {
        lable: ' Ainapur ',
        value: ' Ainapur ',
      },
      {
        lable: ' Aland ',
        value: ' Aland ',
      },
      {
        lable: ' Alur ',
        value: ' Alur ',
      },
      {
        lable: ' Anekal ',
        value: ' Anekal ',
      },
      {
        lable: ' Ankola ',
        value: ' Ankola ',
      },
      {
        lable: ' Arsikere ',
        value: ' Arsikere ',
      },
      {
        lable: ' Athani ',
        value: ' Athani ',
      },
      {
        lable: ' Aurad ',
        value: ' Aurad ',
      },
      {
        lable: ' Bableshwar ',
        value: ' Bableshwar ',
      },
      {
        lable: ' Badami ',
        value: ' Badami ',
      },
      {
        lable: ' Bagalkot ',
        value: ' Bagalkot ',
      },
      {
        lable: ' Bagepalli ',
        value: ' Bagepalli ',
      },
      {
        lable: ' Bailhongal ',
        value: ' Bailhongal ',
      },
      {
        lable: ' Bangalore ',
        value: ' Bangalore ',
      },
      {
        lable: ' Bangalore Rural ',
        value: ' Bangalore Rural ',
      },
      {
        lable: ' Bangarpet ',
        value: ' Bangarpet ',
      },
      {
        lable: ' Bantwal ',
        value: ' Bantwal ',
      },
      {
        lable: ' Basavakalyan ',
        value: ' Basavakalyan ',
      },
      {
        lable: ' Basavanabagewadi ',
        value: ' Basavanabagewadi ',
      },
      {
        lable: ' Basavapatna ',
        value: ' Basavapatna ',
      },
      {
        lable: ' Belgaum ',
        value: ' Belgaum ',
      },
      {
        lable: ' Bellary ',
        value: ' Bellary ',
      },
      {
        lable: ' Belthangady ',
        value: ' Belthangady ',
      },
      {
        lable: ' Belur ',
        value: ' Belur ',
      },
      {
        lable: ' Bhadravati ',
        value: ' Bhadravati ',
      },
      {
        lable: ' Bhalki ',
        value: ' Bhalki ',
      },
      {
        lable: ' Bhatkal ',
        value: ' Bhatkal ',
      },
      {
        lable: ' Bidar ',
        value: ' Bidar ',
      },
      {
        lable: ' Bijapur ',
        value: ' Bijapur ',
      },
      {
        lable: ' Biligi ',
        value: ' Biligi ',
      },
      {
        lable: ' Chadchan ',
        value: ' Chadchan ',
      },
      {
        lable: ' Challakere ',
        value: ' Challakere ',
      },
      {
        lable: ' Chamrajnagar ',
        value: ' Chamrajnagar ',
      },
      {
        lable: ' Channagiri ',
        value: ' Channagiri ',
      },
      {
        lable: ' Channapatna ',
        value: ' Channapatna ',
      },
      {
        lable: ' Channarayapatna ',
        value: ' Channarayapatna ',
      },
      {
        lable: ' Chickmagalur ',
        value: ' Chickmagalur ',
      },
      {
        lable: ' Chikballapur ',
        value: ' Chikballapur ',
      },
      {
        lable: ' Chikkaballapur ',
        value: ' Chikkaballapur ',
      },
      {
        lable: ' Chikkanayakanahalli ',
        value: ' Chikkanayakanahalli ',
      },
      {
        lable: ' Chikkodi ',
        value: ' Chikkodi ',
      },
      {
        lable: ' Chikmagalur ',
        value: ' Chikmagalur ',
      },
      {
        lable: ' Chincholi ',
        value: ' Chincholi ',
      },
      {
        lable: ' Chintamani ',
        value: ' Chintamani ',
      },
      {
        lable: ' Chitradurga ',
        value: ' Chitradurga ',
      },
      {
        lable: ' Chittapur ',
        value: ' Chittapur ',
      },
      {
        lable: ' Cowdahalli ',
        value: ' Cowdahalli ',
      },
      {
        lable: ' Davanagere ',
        value: ' Davanagere ',
      },
      {
        lable: ' Deodurga ',
        value: ' Deodurga ',
      },
      {
        lable: ' Devangere ',
        value: ' Devangere ',
      },
      {
        lable: ' Devarahippargi ',
        value: ' Devarahippargi ',
      },
      {
        lable: ' Dharwad ',
        value: ' Dharwad ',
      },
      {
        lable: ' Doddaballapur ',
        value: ' Doddaballapur ',
      },
      {
        lable: ' Gadag ',
        value: ' Gadag ',
      },
      {
        lable: ' Gangavathi ',
        value: ' Gangavathi ',
      },
      {
        lable: ' Gokak ',
        value: ' Gokak ',
      },
      {
        lable: ' Gowribdanpur ',
        value: ' Gowribdanpur ',
      },
      {
        lable: ' Gubbi ',
        value: ' Gubbi ',
      },
      {
        lable: ' Gulbarga ',
        value: ' Gulbarga ',
      },
      {
        lable: ' Gundlupet ',
        value: ' Gundlupet ',
      },
      {
        lable: ' H.B.Halli ',
        value: ' H.B.Halli ',
      },
      {
        lable: ' H.D. Kote ',
        value: ' H.D. Kote ',
      },
      {
        lable: ' Haliyal ',
        value: ' Haliyal ',
      },
      {
        lable: ' Hampi ',
        value: ' Hampi ',
      },
      {
        lable: ' Hangal ',
        value: ' Hangal ',
      },
      {
        lable: ' Harapanahalli ',
        value: ' Harapanahalli ',
      },
      {
        lable: ' Hassan ',
        value: ' Hassan ',
      },
      {
        lable: ' Haveri ',
        value: ' Haveri ',
      },
      {
        lable: ' Hebri ',
        value: ' Hebri ',
      },
      {
        lable: ' Hirekerur ',
        value: ' Hirekerur ',
      },
      {
        lable: ' Hiriyur ',
        value: ' Hiriyur ',
      },
      {
        lable: ' Holalkere ',
        value: ' Holalkere ',
      },
      {
        lable: ' Holenarsipur ',
        value: ' Holenarsipur ',
      },
      {
        lable: ' Honnali ',
        value: ' Honnali ',
      },
      {
        lable: ' Honnavar ',
        value: ' Honnavar ',
      },
      {
        lable: ' Hosadurga ',
        value: ' Hosadurga ',
      },
      {
        lable: ' Hosakote ',
        value: ' Hosakote ',
      },
      {
        lable: ' Hosanagara ',
        value: ' Hosanagara ',
      },
      {
        lable: ' Hospet ',
        value: ' Hospet ',
      },
      {
        lable: ' Hubli ',
        value: ' Hubli ',
      },
      {
        lable: ' Hukkeri ',
        value: ' Hukkeri ',
      },
      {
        lable: ' Humnabad ',
        value: ' Humnabad ',
      },
      {
        lable: ' Hungund ',
        value: ' Hungund ',
      },
      {
        lable: ' Hunsagi ',
        value: ' Hunsagi ',
      },
      {
        lable: ' Hunsur ',
        value: ' Hunsur ',
      },
      {
        lable: ' Huvinahadagali ',
        value: ' Huvinahadagali ',
      },
      {
        lable: ' Indi ',
        value: ' Indi ',
      },
      {
        lable: ' Jagalur ',
        value: ' Jagalur ',
      },
      {
        lable: ' Jamkhandi ',
        value: ' Jamkhandi ',
      },
      {
        lable: ' Jewargi ',
        value: ' Jewargi ',
      },
      {
        lable: ' Joida ',
        value: ' Joida ',
      },
      {
        lable: ' K.R. Nagar ',
        value: ' K.R. Nagar ',
      },
      {
        lable: ' Kadur ',
        value: ' Kadur ',
      },
      {
        lable: ' Kalghatagi ',
        value: ' Kalghatagi ',
      },
      {
        lable: ' Kamalapur ',
        value: ' Kamalapur ',
      },
      {
        lable: ' Kanakapura ',
        value: ' Kanakapura ',
      },
      {
        lable: ' Kannada ',
        value: ' Kannada ',
      },
      {
        lable: ' Kargal ',
        value: ' Kargal ',
      },
      {
        lable: ' Karkala ',
        value: ' Karkala ',
      },
      {
        lable: ' Karwar ',
        value: ' Karwar ',
      },
      {
        lable: ' Khanapur ',
        value: ' Khanapur ',
      },
      {
        lable: ' Kodagu ',
        value: ' Kodagu ',
      },
      {
        lable: ' Kolar ',
        value: ' Kolar ',
      },
      {
        lable: ' Kollegal ',
        value: ' Kollegal ',
      },
      {
        lable: ' Koppa ',
        value: ' Koppa ',
      },
      {
        lable: ' Koppal ',
        value: ' Koppal ',
      },
      {
        lable: ' Koratageri ',
        value: ' Koratageri ',
      },
      {
        lable: ' Krishnarajapet ',
        value: ' Krishnarajapet ',
      },
      {
        lable: ' Kudligi ',
        value: ' Kudligi ',
      },
      {
        lable: ' Kumta ',
        value: ' Kumta ',
      },
      {
        lable: ' Kundapur ',
        value: ' Kundapur ',
      },
      {
        lable: ' Kundgol ',
        value: ' Kundgol ',
      },
      {
        lable: ' Kunigal ',
        value: ' Kunigal ',
      },
      {
        lable: ' Kurugodu ',
        value: ' Kurugodu ',
      },
      {
        lable: ' Kustagi ',
        value: ' Kustagi ',
      },
      {
        lable: ' Lingsugur ',
        value: ' Lingsugur ',
      },
      {
        lable: ' Madikeri ',
        value: ' Madikeri ',
      },
      {
        lable: ' Madugiri ',
        value: ' Madugiri ',
      },
      {
        lable: ' Malavalli ',
        value: ' Malavalli ',
      },
      {
        lable: ' Malur ',
        value: ' Malur ',
      },
      {
        lable: ' Mandya ',
        value: ' Mandya ',
      },
      {
        lable: ' Mangalore ',
        value: ' Mangalore ',
      },
      {
        lable: ' Manipal ',
        value: ' Manipal ',
      },
      {
        lable: ' Manvi ',
        value: ' Manvi ',
      },
      {
        lable: ' Mashal ',
        value: ' Mashal ',
      },
      {
        lable: ' Molkalmuru ',
        value: ' Molkalmuru ',
      },
      {
        lable: ' Mudalgi ',
        value: ' Mudalgi ',
      },
      {
        lable: ' Muddebihal ',
        value: ' Muddebihal ',
      },
      {
        lable: ' Mudhol ',
        value: ' Mudhol ',
      },
      {
        lable: ' Mudigere ',
        value: ' Mudigere ',
      },
      {
        lable: ' Mulbagal ',
        value: ' Mulbagal ',
      },
      {
        lable: ' Mundagod ',
        value: ' Mundagod ',
      },
      {
        lable: ' Mundargi ',
        value: ' Mundargi ',
      },
      {
        lable: ' Murugod ',
        value: ' Murugod ',
      },
      {
        lable: ' Mysore ',
        value: ' Mysore ',
      },
      {
        lable: ' Nagamangala ',
        value: ' Nagamangala ',
      },
      {
        lable: ' Nanjangud ',
        value: ' Nanjangud ',
      },
      {
        lable: ' Nargund ',
        value: ' Nargund ',
      },
      {
        lable: ' Narsimrajapur ',
        value: ' Narsimrajapur ',
      },
      {
        lable: ' Navalgund ',
        value: ' Navalgund ',
      },
      {
        lable: ' Nelamangala ',
        value: ' Nelamangala ',
      },
      {
        lable: ' Nimburga ',
        value: ' Nimburga ',
      },
      {
        lable: ' Pandavapura ',
        value: ' Pandavapura ',
      },
      {
        lable: ' Pavagada ',
        value: ' Pavagada ',
      },
      {
        lable: ' Puttur ',
        value: ' Puttur ',
      },
      {
        lable: ' Raibag ',
        value: ' Raibag ',
      },
      {
        lable: ' Raichur ',
        value: ' Raichur ',
      },
      {
        lable: ' Ramdurg ',
        value: ' Ramdurg ',
      },
      {
        lable: ' Ranebennur ',
        value: ' Ranebennur ',
      },
      {
        lable: ' Ron ',
        value: ' Ron ',
      },
      {
        lable: ' Sagar ',
        value: ' Sagar ',
      },
      {
        lable: ' Sakleshpur ',
        value: ' Sakleshpur ',
      },
      {
        lable: ' Salkani ',
        value: ' Salkani ',
      },
      {
        lable: ' Sandur ',
        value: ' Sandur ',
      },
      {
        lable: ' Saundatti ',
        value: ' Saundatti ',
      },
      {
        lable: ' Savanur ',
        value: ' Savanur ',
      },
      {
        lable: ' Sedam ',
        value: ' Sedam ',
      },
      {
        lable: ' Shahapur ',
        value: ' Shahapur ',
      },
      {
        lable: ' Shankarnarayana ',
        value: ' Shankarnarayana ',
      },
      {
        lable: ' Shikaripura ',
        value: ' Shikaripura ',
      },
      {
        lable: ' Shimoga ',
        value: ' Shimoga ',
      },
      {
        lable: ' Shirahatti ',
        value: ' Shirahatti ',
      },
      {
        lable: ' Shorapur ',
        value: ' Shorapur ',
      },
      {
        lable: ' Siddapur ',
        value: ' Siddapur ',
      },
      {
        lable: ' Sidlaghatta ',
        value: ' Sidlaghatta ',
      },
      {
        lable: ' Sindagi ',
        value: ' Sindagi ',
      },
      {
        lable: ' Sindhanur ',
        value: ' Sindhanur ',
      },
      {
        lable: ' Sira ',
        value: ' Sira ',
      },
      {
        lable: ' Sirsi ',
        value: ' Sirsi ',
      },
      {
        lable: ' Siruguppa ',
        value: ' Siruguppa ',
      },
      {
        lable: ' Somwarpet ',
        value: ' Somwarpet ',
      },
      {
        lable: ' Sorab ',
        value: ' Sorab ',
      },
      {
        lable: ' Sringeri ',
        value: ' Sringeri ',
      },
      {
        lable: ' Sriniwaspur ',
        value: ' Sriniwaspur ',
      },
      {
        lable: ' Srirangapatna ',
        value: ' Srirangapatna ',
      },
      {
        lable: ' Sullia ',
        value: ' Sullia ',
      },
      {
        lable: ' T. Narsipur ',
        value: ' T. Narsipur ',
      },
      {
        lable: ' Tallak ',
        value: ' Tallak ',
      },
      {
        lable: ' Tarikere ',
        value: ' Tarikere ',
      },
      {
        lable: ' Telgi ',
        value: ' Telgi ',
      },
      {
        lable: ' Thirthahalli ',
        value: ' Thirthahalli ',
      },
      {
        lable: ' Tiptur ',
        value: ' Tiptur ',
      },
      {
        lable: ' Tumkur ',
        value: ' Tumkur ',
      },
      {
        lable: ' Turuvekere ',
        value: ' Turuvekere ',
      },
      {
        lable: ' Udupi ',
        value: ' Udupi ',
      },
      {
        lable: ' Virajpet ',
        value: ' Virajpet ',
      },
      {
        lable: ' Wadi ',
        value: ' Wadi ',
      },
      {
        lable: ' Yadgiri ',
        value: ' Yadgiri ',
      },
      {
        lable: ' Yelburga ',
        value: ' Yelburga ',
      },
      {
        lable: ' Yellapur ',
        value: ' Yellapur ',
      },
    ],
    [
      {
        lable: ' Adimaly ',
        value: ' Adimaly ',
      },
      {
        lable: ' Adoor ',
        value: ' Adoor ',
      },
      {
        lable: ' Agathy ',
        value: ' Agathy ',
      },
      {
        lable: ' Alappuzha ',
        value: ' Alappuzha ',
      },
      {
        lable: ' Alathur ',
        value: ' Alathur ',
      },
      {
        lable: ' Alleppey ',
        value: ' Alleppey ',
      },
      {
        lable: ' Alwaye ',
        value: ' Alwaye ',
      },
      {
        lable: ' Amini ',
        value: ' Amini ',
      },
      {
        lable: ' Androth ',
        value: ' Androth ',
      },
      {
        lable: ' Attingal ',
        value: ' Attingal ',
      },
      {
        lable: ' Badagara ',
        value: ' Badagara ',
      },
      {
        lable: ' Bitra ',
        value: ' Bitra ',
      },
      {
        lable: ' Calicut ',
        value: ' Calicut ',
      },
      {
        lable: ' Cannanore ',
        value: ' Cannanore ',
      },
      {
        lable: ' Chetlet ',
        value: ' Chetlet ',
      },
      {
        lable: ' Ernakulam ',
        value: ' Ernakulam ',
      },
      {
        lable: ' Idukki ',
        value: ' Idukki ',
      },
      {
        lable: ' Irinjalakuda ',
        value: ' Irinjalakuda ',
      },
      {
        lable: ' Kadamath ',
        value: ' Kadamath ',
      },
      {
        lable: ' Kalpeni ',
        value: ' Kalpeni ',
      },
      {
        lable: ' Kalpetta ',
        value: ' Kalpetta ',
      },
      {
        lable: ' Kanhangad ',
        value: ' Kanhangad ',
      },
      {
        lable: ' Kanjirapally ',
        value: ' Kanjirapally ',
      },
      {
        lable: ' Kannur ',
        value: ' Kannur ',
      },
      {
        lable: ' Karungapally ',
        value: ' Karungapally ',
      },
      {
        lable: ' Kasargode ',
        value: ' Kasargode ',
      },
      {
        lable: ' Kavarathy ',
        value: ' Kavarathy ',
      },
      {
        lable: ' Kiltan ',
        value: ' Kiltan ',
      },
      {
        lable: ' Kochi ',
        value: ' Kochi ',
      },
      {
        lable: ' Koduvayur ',
        value: ' Koduvayur ',
      },
      {
        lable: ' Kollam ',
        value: ' Kollam ',
      },
      {
        lable: ' Kottayam ',
        value: ' Kottayam ',
      },
      {
        lable: ' Kovalam ',
        value: ' Kovalam ',
      },
      {
        lable: ' Kozhikode ',
        value: ' Kozhikode ',
      },
      {
        lable: ' Kunnamkulam ',
        value: ' Kunnamkulam ',
      },
      {
        lable: ' Malappuram ',
        value: ' Malappuram ',
      },
      {
        lable: ' Mananthodi ',
        value: ' Mananthodi ',
      },
      {
        lable: ' Manjeri ',
        value: ' Manjeri ',
      },
      {
        lable: ' Mannarghat ',
        value: ' Mannarghat ',
      },
      {
        lable: ' Mavelikkara ',
        value: ' Mavelikkara ',
      },
      {
        lable: ' Minicoy ',
        value: ' Minicoy ',
      },
      {
        lable: ' Munnar ',
        value: ' Munnar ',
      },
      {
        lable: ' Muvattupuzha ',
        value: ' Muvattupuzha ',
      },
      {
        lable: ' Nedumandad ',
        value: ' Nedumandad ',
      },
      {
        lable: ' Nedumgandam ',
        value: ' Nedumgandam ',
      },
      {
        lable: ' Nilambur ',
        value: ' Nilambur ',
      },
      {
        lable: ' Palai ',
        value: ' Palai ',
      },
      {
        lable: ' Palakkad ',
        value: ' Palakkad ',
      },
      {
        lable: ' Palghat ',
        value: ' Palghat ',
      },
      {
        lable: ' Pathaanamthitta ',
        value: ' Pathaanamthitta ',
      },
      {
        lable: ' Pathanamthitta ',
        value: ' Pathanamthitta ',
      },
      {
        lable: ' Payyanur ',
        value: ' Payyanur ',
      },
      {
        lable: ' Peermedu ',
        value: ' Peermedu ',
      },
      {
        lable: ' Perinthalmanna ',
        value: ' Perinthalmanna ',
      },
      {
        lable: ' Perumbavoor ',
        value: ' Perumbavoor ',
      },
      {
        lable: ' Punalur ',
        value: ' Punalur ',
      },
      {
        lable: ' Quilon ',
        value: ' Quilon ',
      },
      {
        lable: ' Ranni ',
        value: ' Ranni ',
      },
      {
        lable: ' Shertallai ',
        value: ' Shertallai ',
      },
      {
        lable: ' Shoranur ',
        value: ' Shoranur ',
      },
      {
        lable: ' Taliparamba ',
        value: ' Taliparamba ',
      },
      {
        lable: ' Tellicherry ',
        value: ' Tellicherry ',
      },
      {
        lable: ' Thiruvananthapuram ',
        value: ' Thiruvananthapuram ',
      },
      {
        lable: ' Thodupuzha ',
        value: ' Thodupuzha ',
      },
      {
        lable: ' Thrissur ',
        value: ' Thrissur ',
      },
      {
        lable: ' Tirur ',
        value: ' Tirur ',
      },
      {
        lable: ' Tiruvalla ',
        value: ' Tiruvalla ',
      },
      {
        lable: ' Trichur ',
        value: ' Trichur ',
      },
      {
        lable: ' Trivandrum ',
        value: ' Trivandrum ',
      },
      {
        lable: ' Uppala ',
        value: ' Uppala ',
      },
      {
        lable: ' Vadakkanchery ',
        value: ' Vadakkanchery ',
      },
      {
        lable: ' Vikom ',
        value: ' Vikom ',
      },
      {
        lable: ' Wayanad ',
        value: ' Wayanad ',
      },
    ],
    [
      {
        lable: ' Agatti Island ',
        value: ' Agatti Island ',
      },
      {
        lable: ' Bingaram Island ',
        value: ' Bingaram Island ',
      },
      {
        lable: ' Bitra Island ',
        value: ' Bitra Island ',
      },
      {
        lable: ' Chetlat Island ',
        value: ' Chetlat Island ',
      },
      {
        lable: ' Kadmat Island ',
        value: ' Kadmat Island ',
      },
      {
        lable: ' Kalpeni Island ',
        value: ' Kalpeni Island ',
      },
      {
        lable: ' Kavaratti Island ',
        value: ' Kavaratti Island ',
      },
      {
        lable: ' Kiltan Island ',
        value: ' Kiltan Island ',
      },
      {
        lable: ' Lakshadweep Sea ',
        value: ' Lakshadweep Sea ',
      },
      {
        lable: ' Minicoy Island ',
        value: ' Minicoy Island ',
      },
      {
        lable: ' North Island ',
        value: ' North Island ',
      },
      {
        lable: ' South Island ',
        value: ' South Island ',
      },
    ],
    [
      {
        lable: ' Agar ',
        value: ' Agar ',
      },
      {
        lable: ' Ajaigarh ',
        value: ' Ajaigarh ',
      },
      {
        lable: ' Alirajpur ',
        value: ' Alirajpur ',
      },
      {
        lable: ' Amarpatan ',
        value: ' Amarpatan ',
      },
      {
        lable: ' Amarwada ',
        value: ' Amarwada ',
      },
      {
        lable: ' Ambah ',
        value: ' Ambah ',
      },
      {
        lable: ' Anuppur ',
        value: ' Anuppur ',
      },
      {
        lable: ' Arone ',
        value: ' Arone ',
      },
      {
        lable: ' Ashoknagar ',
        value: ' Ashoknagar ',
      },
      {
        lable: ' Ashta ',
        value: ' Ashta ',
      },
      {
        lable: ' Atner ',
        value: ' Atner ',
      },
      {
        lable: ' Babaichichli ',
        value: ' Babaichichli ',
      },
      {
        lable: ' Badamalhera ',
        value: ' Badamalhera ',
      },
      {
        lable: ' Badarwsas ',
        value: ' Badarwsas ',
      },
      {
        lable: ' Badnagar ',
        value: ' Badnagar ',
      },
      {
        lable: ' Badnawar ',
        value: ' Badnawar ',
      },
      {
        lable: ' Badwani ',
        value: ' Badwani ',
      },
      {
        lable: ' Bagli ',
        value: ' Bagli ',
      },
      {
        lable: ' Baihar ',
        value: ' Baihar ',
      },
      {
        lable: ' Balaghat ',
        value: ' Balaghat ',
      },
      {
        lable: ' Baldeogarh ',
        value: ' Baldeogarh ',
      },
      {
        lable: ' Baldi ',
        value: ' Baldi ',
      },
      {
        lable: ' Bamori ',
        value: ' Bamori ',
      },
      {
        lable: ' Banda ',
        value: ' Banda ',
      },
      {
        lable: ' Bandhavgarh ',
        value: ' Bandhavgarh ',
      },
      {
        lable: ' Bareli ',
        value: ' Bareli ',
      },
      {
        lable: ' Baroda ',
        value: ' Baroda ',
      },
      {
        lable: ' Barwaha ',
        value: ' Barwaha ',
      },
      {
        lable: ' Barwani ',
        value: ' Barwani ',
      },
      {
        lable: ' Batkakhapa ',
        value: ' Batkakhapa ',
      },
      {
        lable: ' Begamganj ',
        value: ' Begamganj ',
      },
      {
        lable: ' Beohari ',
        value: ' Beohari ',
      },
      {
        lable: ' Berasia ',
        value: ' Berasia ',
      },
      {
        lable: ' Berchha ',
        value: ' Berchha ',
      },
      {
        lable: ' Betul ',
        value: ' Betul ',
      },
      {
        lable: ' Bhainsdehi ',
        value: ' Bhainsdehi ',
      },
      {
        lable: ' Bhander ',
        value: ' Bhander ',
      },
      {
        lable: ' Bhanpura ',
        value: ' Bhanpura ',
      },
      {
        lable: ' Bhikangaon ',
        value: ' Bhikangaon ',
      },
      {
        lable: ' Bhimpur ',
        value: ' Bhimpur ',
      },
      {
        lable: ' Bhind ',
        value: ' Bhind ',
      },
      {
        lable: ' Bhitarwar ',
        value: ' Bhitarwar ',
      },
      {
        lable: ' Bhopal ',
        value: ' Bhopal ',
      },
      {
        lable: ' Biaora ',
        value: ' Biaora ',
      },
      {
        lable: ' Bijadandi ',
        value: ' Bijadandi ',
      },
      {
        lable: ' Bijawar ',
        value: ' Bijawar ',
      },
      {
        lable: ' Bijaypur ',
        value: ' Bijaypur ',
      },
      {
        lable: ' Bina ',
        value: ' Bina ',
      },
      {
        lable: ' Birsa ',
        value: ' Birsa ',
      },
      {
        lable: ' Birsinghpur ',
        value: ' Birsinghpur ',
      },
      {
        lable: ' Budhni ',
        value: ' Budhni ',
      },
      {
        lable: ' Burhanpur ',
        value: ' Burhanpur ',
      },
      {
        lable: ' Buxwaha ',
        value: ' Buxwaha ',
      },
      {
        lable: ' Chachaura ',
        value: ' Chachaura ',
      },
      {
        lable: ' Chanderi ',
        value: ' Chanderi ',
      },
      {
        lable: ' Chaurai ',
        value: ' Chaurai ',
      },
      {
        lable: ' Chhapara ',
        value: ' Chhapara ',
      },
      {
        lable: ' Chhatarpur ',
        value: ' Chhatarpur ',
      },
      {
        lable: ' Chhindwara ',
        value: ' Chhindwara ',
      },
      {
        lable: ' Chicholi ',
        value: ' Chicholi ',
      },
      {
        lable: ' Chitrangi ',
        value: ' Chitrangi ',
      },
      {
        lable: ' Churhat ',
        value: ' Churhat ',
      },
      {
        lable: ' Dabra ',
        value: ' Dabra ',
      },
      {
        lable: ' Damoh ',
        value: ' Damoh ',
      },
      {
        lable: ' Datia ',
        value: ' Datia ',
      },
      {
        lable: ' Deori ',
        value: ' Deori ',
      },
      {
        lable: ' Deosar ',
        value: ' Deosar ',
      },
      {
        lable: ' Depalpur ',
        value: ' Depalpur ',
      },
      {
        lable: ' Dewas ',
        value: ' Dewas ',
      },
      {
        lable: ' Dhar ',
        value: ' Dhar ',
      },
      {
        lable: ' Dharampuri ',
        value: ' Dharampuri ',
      },
      {
        lable: ' Dindori ',
        value: ' Dindori ',
      },
      {
        lable: ' Gadarwara ',
        value: ' Gadarwara ',
      },
      {
        lable: ' Gairatganj ',
        value: ' Gairatganj ',
      },
      {
        lable: ' Ganjbasoda ',
        value: ' Ganjbasoda ',
      },
      {
        lable: ' Garoth ',
        value: ' Garoth ',
      },
      {
        lable: ' Ghansour ',
        value: ' Ghansour ',
      },
      {
        lable: ' Ghatia ',
        value: ' Ghatia ',
      },
      {
        lable: ' Ghatigaon ',
        value: ' Ghatigaon ',
      },
      {
        lable: ' Ghorandogri ',
        value: ' Ghorandogri ',
      },
      {
        lable: ' Ghughari ',
        value: ' Ghughari ',
      },
      {
        lable: ' Gogaon ',
        value: ' Gogaon ',
      },
      {
        lable: ' Gohad ',
        value: ' Gohad ',
      },
      {
        lable: ' Goharganj ',
        value: ' Goharganj ',
      },
      {
        lable: ' Gopalganj ',
        value: ' Gopalganj ',
      },
      {
        lable: ' Gotegaon ',
        value: ' Gotegaon ',
      },
      {
        lable: ' Gourihar ',
        value: ' Gourihar ',
      },
      {
        lable: ' Guna ',
        value: ' Guna ',
      },
      {
        lable: ' Gunnore ',
        value: ' Gunnore ',
      },
      {
        lable: ' Gwalior ',
        value: ' Gwalior ',
      },
      {
        lable: ' Gyraspur ',
        value: ' Gyraspur ',
      },
      {
        lable: ' Hanumana ',
        value: ' Hanumana ',
      },
      {
        lable: ' Harda ',
        value: ' Harda ',
      },
      {
        lable: ' Harrai ',
        value: ' Harrai ',
      },
      {
        lable: ' Harsud ',
        value: ' Harsud ',
      },
      {
        lable: ' Hatta ',
        value: ' Hatta ',
      },
      {
        lable: ' Hoshangabad ',
        value: ' Hoshangabad ',
      },
      {
        lable: ' Ichhawar ',
        value: ' Ichhawar ',
      },
      {
        lable: ' Indore ',
        value: ' Indore ',
      },
      {
        lable: ' Isagarh ',
        value: ' Isagarh ',
      },
      {
        lable: ' Itarsi ',
        value: ' Itarsi ',
      },
      {
        lable: ' Jabalpur ',
        value: ' Jabalpur ',
      },
      {
        lable: ' Jabera ',
        value: ' Jabera ',
      },
      {
        lable: ' Jagdalpur ',
        value: ' Jagdalpur ',
      },
      {
        lable: ' Jaisinghnagar ',
        value: ' Jaisinghnagar ',
      },
      {
        lable: ' Jaithari ',
        value: ' Jaithari ',
      },
      {
        lable: ' Jaitpur ',
        value: ' Jaitpur ',
      },
      {
        lable: ' Jaitwara ',
        value: ' Jaitwara ',
      },
      {
        lable: ' Jamai ',
        value: ' Jamai ',
      },
      {
        lable: ' Jaora ',
        value: ' Jaora ',
      },
      {
        lable: ' Jatara ',
        value: ' Jatara ',
      },
      {
        lable: ' Jawad ',
        value: ' Jawad ',
      },
      {
        lable: ' Jhabua ',
        value: ' Jhabua ',
      },
      {
        lable: ' Jobat ',
        value: ' Jobat ',
      },
      {
        lable: ' Jora ',
        value: ' Jora ',
      },
      {
        lable: ' Kakaiya ',
        value: ' Kakaiya ',
      },
      {
        lable: ' Kannod ',
        value: ' Kannod ',
      },
      {
        lable: ' Kannodi ',
        value: ' Kannodi ',
      },
      {
        lable: ' Karanjia ',
        value: ' Karanjia ',
      },
      {
        lable: ' Kareli ',
        value: ' Kareli ',
      },
      {
        lable: ' Karera ',
        value: ' Karera ',
      },
      {
        lable: ' Karhal ',
        value: ' Karhal ',
      },
      {
        lable: ' Karpa ',
        value: ' Karpa ',
      },
      {
        lable: ' Kasrawad ',
        value: ' Kasrawad ',
      },
      {
        lable: ' Katangi ',
        value: ' Katangi ',
      },
      {
        lable: ' Katni ',
        value: ' Katni ',
      },
      {
        lable: ' Keolari ',
        value: ' Keolari ',
      },
      {
        lable: ' Khachrod ',
        value: ' Khachrod ',
      },
      {
        lable: ' Khajuraho ',
        value: ' Khajuraho ',
      },
      {
        lable: ' Khakner ',
        value: ' Khakner ',
      },
      {
        lable: ' Khalwa ',
        value: ' Khalwa ',
      },
      {
        lable: ' Khandwa ',
        value: ' Khandwa ',
      },
      {
        lable: ' Khaniadhana ',
        value: ' Khaniadhana ',
      },
      {
        lable: ' Khargone ',
        value: ' Khargone ',
      },
      {
        lable: ' Khategaon ',
        value: ' Khategaon ',
      },
      {
        lable: ' Khetia ',
        value: ' Khetia ',
      },
      {
        lable: ' Khilchipur ',
        value: ' Khilchipur ',
      },
      {
        lable: ' Khirkiya ',
        value: ' Khirkiya ',
      },
      {
        lable: ' Khurai ',
        value: ' Khurai ',
      },
      {
        lable: ' Kolaras ',
        value: ' Kolaras ',
      },
      {
        lable: ' Kotma ',
        value: ' Kotma ',
      },
      {
        lable: ' Kukshi ',
        value: ' Kukshi ',
      },
      {
        lable: ' Kundam ',
        value: ' Kundam ',
      },
      {
        lable: ' Kurwai ',
        value: ' Kurwai ',
      },
      {
        lable: ' Kusmi ',
        value: ' Kusmi ',
      },
      {
        lable: ' Laher ',
        value: ' Laher ',
      },
      {
        lable: ' Lakhnadon ',
        value: ' Lakhnadon ',
      },
      {
        lable: ' Lamta ',
        value: ' Lamta ',
      },
      {
        lable: ' Lanji ',
        value: ' Lanji ',
      },
      {
        lable: ' Lateri ',
        value: ' Lateri ',
      },
      {
        lable: ' Laundi ',
        value: ' Laundi ',
      },
      {
        lable: ' Maheshwar ',
        value: ' Maheshwar ',
      },
      {
        lable: ' Mahidpurcity ',
        value: ' Mahidpurcity ',
      },
      {
        lable: ' Maihar ',
        value: ' Maihar ',
      },
      {
        lable: ' Majhagwan ',
        value: ' Majhagwan ',
      },
      {
        lable: ' Majholi ',
        value: ' Majholi ',
      },
      {
        lable: ' Malhargarh ',
        value: ' Malhargarh ',
      },
      {
        lable: ' Manasa ',
        value: ' Manasa ',
      },
      {
        lable: ' Manawar ',
        value: ' Manawar ',
      },
      {
        lable: ' Mandla ',
        value: ' Mandla ',
      },
      {
        lable: ' Mandsaur ',
        value: ' Mandsaur ',
      },
      {
        lable: ' Manpur ',
        value: ' Manpur ',
      },
      {
        lable: ' Mauganj ',
        value: ' Mauganj ',
      },
      {
        lable: ' Mawai ',
        value: ' Mawai ',
      },
      {
        lable: ' Mehgaon ',
        value: ' Mehgaon ',
      },
      {
        lable: ' Mhow ',
        value: ' Mhow ',
      },
      {
        lable: ' Morena ',
        value: ' Morena ',
      },
      {
        lable: ' Multai ',
        value: ' Multai ',
      },
      {
        lable: ' Mungaoli ',
        value: ' Mungaoli ',
      },
      {
        lable: ' Nagod ',
        value: ' Nagod ',
      },
      {
        lable: ' Nainpur ',
        value: ' Nainpur ',
      },
      {
        lable: ' Narsingarh ',
        value: ' Narsingarh ',
      },
      {
        lable: ' Narsinghpur ',
        value: ' Narsinghpur ',
      },
      {
        lable: ' Narwar ',
        value: ' Narwar ',
      },
      {
        lable: ' Nasrullaganj ',
        value: ' Nasrullaganj ',
      },
      {
        lable: ' Nateran ',
        value: ' Nateran ',
      },
      {
        lable: ' Neemuch ',
        value: ' Neemuch ',
      },
      {
        lable: ' Niwari ',
        value: ' Niwari ',
      },
      {
        lable: ' Niwas ',
        value: ' Niwas ',
      },
      {
        lable: ' Nowgaon ',
        value: ' Nowgaon ',
      },
      {
        lable: ' Pachmarhi ',
        value: ' Pachmarhi ',
      },
      {
        lable: ' Pandhana ',
        value: ' Pandhana ',
      },
      {
        lable: ' Pandhurna ',
        value: ' Pandhurna ',
      },
      {
        lable: ' Panna ',
        value: ' Panna ',
      },
      {
        lable: ' Parasia ',
        value: ' Parasia ',
      },
      {
        lable: ' Patan ',
        value: ' Patan ',
      },
      {
        lable: ' Patera ',
        value: ' Patera ',
      },
      {
        lable: ' Patharia ',
        value: ' Patharia ',
      },
      {
        lable: ' Pawai ',
        value: ' Pawai ',
      },
      {
        lable: ' Petlawad ',
        value: ' Petlawad ',
      },
      {
        lable: ' Pichhore ',
        value: ' Pichhore ',
      },
      {
        lable: ' Piparia ',
        value: ' Piparia ',
      },
      {
        lable: ' Pohari ',
        value: ' Pohari ',
      },
      {
        lable: ' Prabhapattan ',
        value: ' Prabhapattan ',
      },
      {
        lable: ' Punasa ',
        value: ' Punasa ',
      },
      {
        lable: ' Pushprajgarh ',
        value: ' Pushprajgarh ',
      },
      {
        lable: ' Raghogarh ',
        value: ' Raghogarh ',
      },
      {
        lable: ' Raghunathpur ',
        value: ' Raghunathpur ',
      },
      {
        lable: ' Rahatgarh ',
        value: ' Rahatgarh ',
      },
      {
        lable: ' Raisen ',
        value: ' Raisen ',
      },
      {
        lable: ' Rajgarh ',
        value: ' Rajgarh ',
      },
      {
        lable: ' Rajpur ',
        value: ' Rajpur ',
      },
      {
        lable: ' Ratlam ',
        value: ' Ratlam ',
      },
      {
        lable: ' Rehli ',
        value: ' Rehli ',
      },
      {
        lable: ' Rewa ',
        value: ' Rewa ',
      },
      {
        lable: ' Sabalgarh ',
        value: ' Sabalgarh ',
      },
      {
        lable: ' Sagar ',
        value: ' Sagar ',
      },
      {
        lable: ' Sailana ',
        value: ' Sailana ',
      },
      {
        lable: ' Sanwer ',
        value: ' Sanwer ',
      },
      {
        lable: ' Sarangpur ',
        value: ' Sarangpur ',
      },
      {
        lable: ' Sardarpur ',
        value: ' Sardarpur ',
      },
      {
        lable: ' Satna ',
        value: ' Satna ',
      },
      {
        lable: ' Saunsar ',
        value: ' Saunsar ',
      },
      {
        lable: ' Sehore ',
        value: ' Sehore ',
      },
      {
        lable: ' Sendhwa ',
        value: ' Sendhwa ',
      },
      {
        lable: ' Seondha ',
        value: ' Seondha ',
      },
      {
        lable: ' Seoni ',
        value: ' Seoni ',
      },
      {
        lable: ' Seonimalwa ',
        value: ' Seonimalwa ',
      },
      {
        lable: ' Shahdol ',
        value: ' Shahdol ',
      },
      {
        lable: ' Shahnagar ',
        value: ' Shahnagar ',
      },
      {
        lable: ' Shahpur ',
        value: ' Shahpur ',
      },
      {
        lable: ' Shajapur ',
        value: ' Shajapur ',
      },
      {
        lable: ' Sheopur ',
        value: ' Sheopur ',
      },
      {
        lable: ' Sheopurkalan ',
        value: ' Sheopurkalan ',
      },
      {
        lable: ' Shivpuri ',
        value: ' Shivpuri ',
      },
      {
        lable: ' Shujalpur ',
        value: ' Shujalpur ',
      },
      {
        lable: ' Sidhi ',
        value: ' Sidhi ',
      },
      {
        lable: ' Sihora ',
        value: ' Sihora ',
      },
      {
        lable: ' Silwani ',
        value: ' Silwani ',
      },
      {
        lable: ' Singrauli ',
        value: ' Singrauli ',
      },
      {
        lable: ' Sirmour ',
        value: ' Sirmour ',
      },
      {
        lable: ' Sironj ',
        value: ' Sironj ',
      },
      {
        lable: ' Sitamau ',
        value: ' Sitamau ',
      },
      {
        lable: ' Sohagpur ',
        value: ' Sohagpur ',
      },
      {
        lable: ' Sondhwa ',
        value: ' Sondhwa ',
      },
      {
        lable: ' Sonkatch ',
        value: ' Sonkatch ',
      },
      {
        lable: ' Susner ',
        value: ' Susner ',
      },
      {
        lable: ' Tamia ',
        value: ' Tamia ',
      },
      {
        lable: ' Tarana ',
        value: ' Tarana ',
      },
      {
        lable: ' Tendukheda ',
        value: ' Tendukheda ',
      },
      {
        lable: ' Teonthar ',
        value: ' Teonthar ',
      },
      {
        lable: ' Thandla ',
        value: ' Thandla ',
      },
      {
        lable: ' Tikamgarh ',
        value: ' Tikamgarh ',
      },
      {
        lable: ' Timarani ',
        value: ' Timarani ',
      },
      {
        lable: ' Udaipura ',
        value: ' Udaipura ',
      },
      {
        lable: ' Ujjain ',
        value: ' Ujjain ',
      },
      {
        lable: ' Umaria ',
        value: ' Umaria ',
      },
      {
        lable: ' Umariapan ',
        value: ' Umariapan ',
      },
      {
        lable: ' Vidisha ',
        value: ' Vidisha ',
      },
      {
        lable: ' Vijayraghogarh ',
        value: ' Vijayraghogarh ',
      },
      {
        lable: ' Waraseoni ',
        value: ' Waraseoni ',
      },
      {
        lable: ' Zhirnia ',
        value: ' Zhirnia ',
      },
    ],
    [
      {
        lable: ' Achalpur ',
        value: ' Achalpur ',
      },
      {
        lable: ' Aheri ',
        value: ' Aheri ',
      },
      {
        lable: ' Ahmednagar ',
        value: ' Ahmednagar ',
      },
      {
        lable: ' Ahmedpur ',
        value: ' Ahmedpur ',
      },
      {
        lable: ' Ajara ',
        value: ' Ajara ',
      },
      {
        lable: ' Akkalkot ',
        value: ' Akkalkot ',
      },
      {
        lable: ' Akola ',
        value: ' Akola ',
      },
      {
        lable: ' Akole ',
        value: ' Akole ',
      },
      {
        lable: ' Akot ',
        value: ' Akot ',
      },
      {
        lable: ' Alibagh ',
        value: ' Alibagh ',
      },
      {
        lable: ' Amagaon ',
        value: ' Amagaon ',
      },
      {
        lable: ' Amalner ',
        value: ' Amalner ',
      },
      {
        lable: ' Ambad ',
        value: ' Ambad ',
      },
      {
        lable: ' Ambejogai ',
        value: ' Ambejogai ',
      },
      {
        lable: ' Amravati ',
        value: ' Amravati ',
      },
      {
        lable: ' Arjuni Merogaon ',
        value: ' Arjuni Merogaon ',
      },
      {
        lable: ' Arvi ',
        value: ' Arvi ',
      },
      {
        lable: ' Ashti ',
        value: ' Ashti ',
      },
      {
        lable: ' Atpadi ',
        value: ' Atpadi ',
      },
      {
        lable: ' Aurangabad ',
        value: ' Aurangabad ',
      },
      {
        lable: ' Ausa ',
        value: ' Ausa ',
      },
      {
        lable: ' Babhulgaon ',
        value: ' Babhulgaon ',
      },
      {
        lable: ' Balapur ',
        value: ' Balapur ',
      },
      {
        lable: ' Baramati ',
        value: ' Baramati ',
      },
      {
        lable: ' Barshi Takli ',
        value: ' Barshi Takli ',
      },
      {
        lable: ' Barsi ',
        value: ' Barsi ',
      },
      {
        lable: ' Basmatnagar ',
        value: ' Basmatnagar ',
      },
      {
        lable: ' Bassein ',
        value: ' Bassein ',
      },
      {
        lable: ' Beed ',
        value: ' Beed ',
      },
      {
        lable: ' Bhadrawati ',
        value: ' Bhadrawati ',
      },
      {
        lable: ' Bhamregadh ',
        value: ' Bhamregadh ',
      },
      {
        lable: ' Bhandara ',
        value: ' Bhandara ',
      },
      {
        lable: ' Bhir ',
        value: ' Bhir ',
      },
      {
        lable: ' Bhiwandi ',
        value: ' Bhiwandi ',
      },
      {
        lable: ' Bhiwapur ',
        value: ' Bhiwapur ',
      },
      {
        lable: ' Bhokar ',
        value: ' Bhokar ',
      },
      {
        lable: ' Bhokardan ',
        value: ' Bhokardan ',
      },
      {
        lable: ' Bhoom ',
        value: ' Bhoom ',
      },
      {
        lable: ' Bhor ',
        value: ' Bhor ',
      },
      {
        lable: ' Bhudargad ',
        value: ' Bhudargad ',
      },
      {
        lable: ' Bhusawal ',
        value: ' Bhusawal ',
      },
      {
        lable: ' Billoli ',
        value: ' Billoli ',
      },
      {
        lable: ' Brahmapuri ',
        value: ' Brahmapuri ',
      },
      {
        lable: ' Buldhana ',
        value: ' Buldhana ',
      },
      {
        lable: ' Butibori ',
        value: ' Butibori ',
      },
      {
        lable: ' Chalisgaon ',
        value: ' Chalisgaon ',
      },
      {
        lable: ' Chamorshi ',
        value: ' Chamorshi ',
      },
      {
        lable: ' Chandgad ',
        value: ' Chandgad ',
      },
      {
        lable: ' Chandrapur ',
        value: ' Chandrapur ',
      },
      {
        lable: ' Chandur ',
        value: ' Chandur ',
      },
      {
        lable: ' Chanwad ',
        value: ' Chanwad ',
      },
      {
        lable: ' Chhikaldara ',
        value: ' Chhikaldara ',
      },
      {
        lable: ' Chikhali ',
        value: ' Chikhali ',
      },
      {
        lable: ' Chinchwad ',
        value: ' Chinchwad ',
      },
      {
        lable: ' Chiplun ',
        value: ' Chiplun ',
      },
      {
        lable: ' Chopda ',
        value: ' Chopda ',
      },
      {
        lable: ' Chumur ',
        value: ' Chumur ',
      },
      {
        lable: ' Dahanu ',
        value: ' Dahanu ',
      },
      {
        lable: ' Dapoli ',
        value: ' Dapoli ',
      },
      {
        lable: ' Darwaha ',
        value: ' Darwaha ',
      },
      {
        lable: ' Daryapur ',
        value: ' Daryapur ',
      },
      {
        lable: ' Daund ',
        value: ' Daund ',
      },
      {
        lable: ' Degloor ',
        value: ' Degloor ',
      },
      {
        lable: ' Delhi Tanda ',
        value: ' Delhi Tanda ',
      },
      {
        lable: ' Deogad ',
        value: ' Deogad ',
      },
      {
        lable: ' Deolgaonraja ',
        value: ' Deolgaonraja ',
      },
      {
        lable: ' Deori ',
        value: ' Deori ',
      },
      {
        lable: ' Desaiganj ',
        value: ' Desaiganj ',
      },
      {
        lable: ' Dhadgaon ',
        value: ' Dhadgaon ',
      },
      {
        lable: ' Dhanora ',
        value: ' Dhanora ',
      },
      {
        lable: ' Dharani ',
        value: ' Dharani ',
      },
      {
        lable: ' Dhiwadi ',
        value: ' Dhiwadi ',
      },
      {
        lable: ' Dhule ',
        value: ' Dhule ',
      },
      {
        lable: ' Dhulia ',
        value: ' Dhulia ',
      },
      {
        lable: ' Digras ',
        value: ' Digras ',
      },
      {
        lable: ' Dindori ',
        value: ' Dindori ',
      },
      {
        lable: ' Edalabad ',
        value: ' Edalabad ',
      },
      {
        lable: ' Erandul ',
        value: ' Erandul ',
      },
      {
        lable: ' Etapalli ',
        value: ' Etapalli ',
      },
      {
        lable: ' Gadhchiroli ',
        value: ' Gadhchiroli ',
      },
      {
        lable: ' Gadhinglaj ',
        value: ' Gadhinglaj ',
      },
      {
        lable: ' Gaganbavada ',
        value: ' Gaganbavada ',
      },
      {
        lable: ' Gangakhed ',
        value: ' Gangakhed ',
      },
      {
        lable: ' Gangapur ',
        value: ' Gangapur ',
      },
      {
        lable: ' Gevrai ',
        value: ' Gevrai ',
      },
      {
        lable: ' Ghatanji ',
        value: ' Ghatanji ',
      },
      {
        lable: ' Golegaon ',
        value: ' Golegaon ',
      },
      {
        lable: ' Gondia ',
        value: ' Gondia ',
      },
      {
        lable: ' Gondpipri ',
        value: ' Gondpipri ',
      },
      {
        lable: ' Goregaon ',
        value: ' Goregaon ',
      },
      {
        lable: ' Guhagar ',
        value: ' Guhagar ',
      },
      {
        lable: ' Hadgaon ',
        value: ' Hadgaon ',
      },
      {
        lable: ' Hatkangale ',
        value: ' Hatkangale ',
      },
      {
        lable: ' Hinganghat ',
        value: ' Hinganghat ',
      },
      {
        lable: ' Hingoli ',
        value: ' Hingoli ',
      },
      {
        lable: ' Hingua ',
        value: ' Hingua ',
      },
      {
        lable: ' Igatpuri ',
        value: ' Igatpuri ',
      },
      {
        lable: ' Indapur ',
        value: ' Indapur ',
      },
      {
        lable: ' Islampur ',
        value: ' Islampur ',
      },
      {
        lable: ' Jalgaon ',
        value: ' Jalgaon ',
      },
      {
        lable: ' Jalna ',
        value: ' Jalna ',
      },
      {
        lable: ' Jamkhed ',
        value: ' Jamkhed ',
      },
      {
        lable: ' Jamner ',
        value: ' Jamner ',
      },
      {
        lable: ' Jath ',
        value: ' Jath ',
      },
      {
        lable: ' Jawahar ',
        value: ' Jawahar ',
      },
      {
        lable: ' Jintdor ',
        value: ' Jintdor ',
      },
      {
        lable: ' Junnar ',
        value: ' Junnar ',
      },
      {
        lable: ' Kagal ',
        value: ' Kagal ',
      },
      {
        lable: ' Kaij ',
        value: ' Kaij ',
      },
      {
        lable: ' Kalamb ',
        value: ' Kalamb ',
      },
      {
        lable: ' Kalamnuri ',
        value: ' Kalamnuri ',
      },
      {
        lable: ' Kallam ',
        value: ' Kallam ',
      },
      {
        lable: ' Kalmeshwar ',
        value: ' Kalmeshwar ',
      },
      {
        lable: ' Kalwan ',
        value: ' Kalwan ',
      },
      {
        lable: ' Kalyan ',
        value: ' Kalyan ',
      },
      {
        lable: ' Kamptee ',
        value: ' Kamptee ',
      },
      {
        lable: ' Kandhar ',
        value: ' Kandhar ',
      },
      {
        lable: ' Kankavali ',
        value: ' Kankavali ',
      },
      {
        lable: ' Kannad ',
        value: ' Kannad ',
      },
      {
        lable: ' Karad ',
        value: ' Karad ',
      },
      {
        lable: ' Karjat ',
        value: ' Karjat ',
      },
      {
        lable: ' Karmala ',
        value: ' Karmala ',
      },
      {
        lable: ' Katol ',
        value: ' Katol ',
      },
      {
        lable: ' Kavathemankal ',
        value: ' Kavathemankal ',
      },
      {
        lable: ' Kedgaon ',
        value: ' Kedgaon ',
      },
      {
        lable: ' Khadakwasala ',
        value: ' Khadakwasala ',
      },
      {
        lable: ' Khamgaon ',
        value: ' Khamgaon ',
      },
      {
        lable: ' Khed ',
        value: ' Khed ',
      },
      {
        lable: ' Khopoli ',
        value: ' Khopoli ',
      },
      {
        lable: ' Khultabad ',
        value: ' Khultabad ',
      },
      {
        lable: ' Kinwat ',
        value: ' Kinwat ',
      },
      {
        lable: ' Kolhapur ',
        value: ' Kolhapur ',
      },
      {
        lable: ' Kopargaon ',
        value: ' Kopargaon ',
      },
      {
        lable: ' Koregaon ',
        value: ' Koregaon ',
      },
      {
        lable: ' Kudal ',
        value: ' Kudal ',
      },
      {
        lable: ' Kuhi ',
        value: ' Kuhi ',
      },
      {
        lable: ' Kurkheda ',
        value: ' Kurkheda ',
      },
      {
        lable: ' Kusumba ',
        value: ' Kusumba ',
      },
      {
        lable: ' Lakhandur ',
        value: ' Lakhandur ',
      },
      {
        lable: ' Langa ',
        value: ' Langa ',
      },
      {
        lable: ' Latur ',
        value: ' Latur ',
      },
      {
        lable: ' Lonar ',
        value: ' Lonar ',
      },
      {
        lable: ' Lonavala ',
        value: ' Lonavala ',
      },
      {
        lable: ' Madangad ',
        value: ' Madangad ',
      },
      {
        lable: ' Madha ',
        value: ' Madha ',
      },
      {
        lable: ' Mahabaleshwar ',
        value: ' Mahabaleshwar ',
      },
      {
        lable: ' Mahad ',
        value: ' Mahad ',
      },
      {
        lable: ' Mahagaon ',
        value: ' Mahagaon ',
      },
      {
        lable: ' Mahasala ',
        value: ' Mahasala ',
      },
      {
        lable: ' Mahaswad ',
        value: ' Mahaswad ',
      },
      {
        lable: ' Malegaon ',
        value: ' Malegaon ',
      },
      {
        lable: ' Malgaon ',
        value: ' Malgaon ',
      },
      {
        lable: ' Malgund ',
        value: ' Malgund ',
      },
      {
        lable: ' Malkapur ',
        value: ' Malkapur ',
      },
      {
        lable: ' Malsuras ',
        value: ' Malsuras ',
      },
      {
        lable: ' Malwan ',
        value: ' Malwan ',
      },
      {
        lable: ' Mancher ',
        value: ' Mancher ',
      },
      {
        lable: ' Mangalwedha ',
        value: ' Mangalwedha ',
      },
      {
        lable: ' Mangaon ',
        value: ' Mangaon ',
      },
      {
        lable: ' Mangrulpur ',
        value: ' Mangrulpur ',
      },
      {
        lable: ' Manjalegaon ',
        value: ' Manjalegaon ',
      },
      {
        lable: ' Manmad ',
        value: ' Manmad ',
      },
      {
        lable: ' Maregaon ',
        value: ' Maregaon ',
      },
      {
        lable: ' Mehda ',
        value: ' Mehda ',
      },
      {
        lable: ' Mekhar ',
        value: ' Mekhar ',
      },
      {
        lable: ' Mohadi ',
        value: ' Mohadi ',
      },
      {
        lable: ' Mohol ',
        value: ' Mohol ',
      },
      {
        lable: ' Mokhada ',
        value: ' Mokhada ',
      },
      {
        lable: ' Morshi ',
        value: ' Morshi ',
      },
      {
        lable: ' Mouda ',
        value: ' Mouda ',
      },
      {
        lable: ' Mukhed ',
        value: ' Mukhed ',
      },
      {
        lable: ' Mul ',
        value: ' Mul ',
      },
      {
        lable: ' Mumbai ',
        value: ' Mumbai ',
      },
      {
        lable: ' Murbad ',
        value: ' Murbad ',
      },
      {
        lable: ' Murtizapur ',
        value: ' Murtizapur ',
      },
      {
        lable: ' Murud ',
        value: ' Murud ',
      },
      {
        lable: ' Nagbhir ',
        value: ' Nagbhir ',
      },
      {
        lable: ' Nagpur ',
        value: ' Nagpur ',
      },
      {
        lable: ' Nahavara ',
        value: ' Nahavara ',
      },
      {
        lable: ' Nanded ',
        value: ' Nanded ',
      },
      {
        lable: ' Nandgaon ',
        value: ' Nandgaon ',
      },
      {
        lable: ' Nandnva ',
        value: ' Nandnva ',
      },
      {
        lable: ' Nandurbar ',
        value: ' Nandurbar ',
      },
      {
        lable: ' Narkhed ',
        value: ' Narkhed ',
      },
      {
        lable: ' Nashik ',
        value: ' Nashik ',
      },
      {
        lable: ' Navapur ',
        value: ' Navapur ',
      },
      {
        lable: ' Ner ',
        value: ' Ner ',
      },
      {
        lable: ' Newasa ',
        value: ' Newasa ',
      },
      {
        lable: ' Nilanga ',
        value: ' Nilanga ',
      },
      {
        lable: ' Niphad ',
        value: ' Niphad ',
      },
      {
        lable: ' Omerga ',
        value: ' Omerga ',
      },
      {
        lable: ' Osmanabad ',
        value: ' Osmanabad ',
      },
      {
        lable: ' Pachora ',
        value: ' Pachora ',
      },
      {
        lable: ' Paithan ',
        value: ' Paithan ',
      },
      {
        lable: ' Palghar ',
        value: ' Palghar ',
      },
      {
        lable: ' Pali ',
        value: ' Pali ',
      },
      {
        lable: ' Pandharkawada ',
        value: ' Pandharkawada ',
      },
      {
        lable: ' Pandharpur ',
        value: ' Pandharpur ',
      },
      {
        lable: ' Panhala ',
        value: ' Panhala ',
      },
      {
        lable: ' Paranda ',
        value: ' Paranda ',
      },
      {
        lable: ' Parbhani ',
        value: ' Parbhani ',
      },
      {
        lable: ' Parner ',
        value: ' Parner ',
      },
      {
        lable: ' Parola ',
        value: ' Parola ',
      },
      {
        lable: ' Parseoni ',
        value: ' Parseoni ',
      },
      {
        lable: ' Partur ',
        value: ' Partur ',
      },
      {
        lable: ' Patan ',
        value: ' Patan ',
      },
      {
        lable: ' Pathardi ',
        value: ' Pathardi ',
      },
      {
        lable: ' Pathari ',
        value: ' Pathari ',
      },
      {
        lable: ' Patoda ',
        value: ' Patoda ',
      },
      {
        lable: ' Pauni ',
        value: ' Pauni ',
      },
      {
        lable: ' Peint ',
        value: ' Peint ',
      },
      {
        lable: ' Pen ',
        value: ' Pen ',
      },
      {
        lable: ' Phaltan ',
        value: ' Phaltan ',
      },
      {
        lable: ' Pimpalner ',
        value: ' Pimpalner ',
      },
      {
        lable: ' Pirangut ',
        value: ' Pirangut ',
      },
      {
        lable: ' Poladpur ',
        value: ' Poladpur ',
      },
      {
        lable: ' Pune ',
        value: ' Pune ',
      },
      {
        lable: ' Pusad ',
        value: ' Pusad ',
      },
      {
        lable: ' Pusegaon ',
        value: ' Pusegaon ',
      },
      {
        lable: ' Radhanagar ',
        value: ' Radhanagar ',
      },
      {
        lable: ' Rahuri ',
        value: ' Rahuri ',
      },
      {
        lable: ' Raigad ',
        value: ' Raigad ',
      },
      {
        lable: ' Rajapur ',
        value: ' Rajapur ',
      },
      {
        lable: ' Rajgurunagar ',
        value: ' Rajgurunagar ',
      },
      {
        lable: ' Rajura ',
        value: ' Rajura ',
      },
      {
        lable: ' Ralegaon ',
        value: ' Ralegaon ',
      },
      {
        lable: ' Ramtek ',
        value: ' Ramtek ',
      },
      {
        lable: ' Ratnagiri ',
        value: ' Ratnagiri ',
      },
      {
        lable: ' Raver ',
        value: ' Raver ',
      },
      {
        lable: ' Risod ',
        value: ' Risod ',
      },
      {
        lable: ' Roha ',
        value: ' Roha ',
      },
      {
        lable: ' Sakarwadi ',
        value: ' Sakarwadi ',
      },
      {
        lable: ' Sakoli ',
        value: ' Sakoli ',
      },
      {
        lable: ' Sakri ',
        value: ' Sakri ',
      },
      {
        lable: ' Salekasa ',
        value: ' Salekasa ',
      },
      {
        lable: ' Samudrapur ',
        value: ' Samudrapur ',
      },
      {
        lable: ' Sangamner ',
        value: ' Sangamner ',
      },
      {
        lable: ' Sanganeshwar ',
        value: ' Sanganeshwar ',
      },
      {
        lable: ' Sangli ',
        value: ' Sangli ',
      },
      {
        lable: ' Sangola ',
        value: ' Sangola ',
      },
      {
        lable: ' Sanguem ',
        value: ' Sanguem ',
      },
      {
        lable: ' Saoner ',
        value: ' Saoner ',
      },
      {
        lable: ' Saswad ',
        value: ' Saswad ',
      },
      {
        lable: ' Satana ',
        value: ' Satana ',
      },
      {
        lable: ' Satara ',
        value: ' Satara ',
      },
      {
        lable: ' Sawantwadi ',
        value: ' Sawantwadi ',
      },
      {
        lable: ' Seloo ',
        value: ' Seloo ',
      },
      {
        lable: ' Shahada ',
        value: ' Shahada ',
      },
      {
        lable: ' Shahapur ',
        value: ' Shahapur ',
      },
      {
        lable: ' Shahuwadi ',
        value: ' Shahuwadi ',
      },
      {
        lable: ' Shevgaon ',
        value: ' Shevgaon ',
      },
      {
        lable: ' Shirala ',
        value: ' Shirala ',
      },
      {
        lable: ' Shirol ',
        value: ' Shirol ',
      },
      {
        lable: ' Shirpur ',
        value: ' Shirpur ',
      },
      {
        lable: ' Shirur ',
        value: ' Shirur ',
      },
      {
        lable: ' Shirwal ',
        value: ' Shirwal ',
      },
      {
        lable: ' Sholapur ',
        value: ' Sholapur ',
      },
      {
        lable: ' Shri Rampur ',
        value: ' Shri Rampur ',
      },
      {
        lable: ' Shrigonda ',
        value: ' Shrigonda ',
      },
      {
        lable: ' Shrivardhan ',
        value: ' Shrivardhan ',
      },
      {
        lable: ' Sillod ',
        value: ' Sillod ',
      },
      {
        lable: ' Sinderwahi ',
        value: ' Sinderwahi ',
      },
      {
        lable: ' Sindhudurg ',
        value: ' Sindhudurg ',
      },
      {
        lable: ' Sindkheda ',
        value: ' Sindkheda ',
      },
      {
        lable: ' Sindkhedaraja ',
        value: ' Sindkhedaraja ',
      },
      {
        lable: ' Sinnar ',
        value: ' Sinnar ',
      },
      {
        lable: ' Sironcha ',
        value: ' Sironcha ',
      },
      {
        lable: ' Soyegaon ',
        value: ' Soyegaon ',
      },
      {
        lable: ' Surgena ',
        value: ' Surgena ',
      },
      {
        lable: ' Talasari ',
        value: ' Talasari ',
      },
      {
        lable: ' Talegaon S.Ji Pant ',
        value: ' Talegaon S.Ji Pant ',
      },
      {
        lable: ' Taloda ',
        value: ' Taloda ',
      },
      {
        lable: ' Tasgaon ',
        value: ' Tasgaon ',
      },
      {
        lable: ' Thane ',
        value: ' Thane ',
      },
      {
        lable: ' Tirora ',
        value: ' Tirora ',
      },
      {
        lable: ' Tiwasa ',
        value: ' Tiwasa ',
      },
      {
        lable: ' Trimbak ',
        value: ' Trimbak ',
      },
      {
        lable: ' Tuljapur ',
        value: ' Tuljapur ',
      },
      {
        lable: ' Tumsar ',
        value: ' Tumsar ',
      },
      {
        lable: ' Udgir ',
        value: ' Udgir ',
      },
      {
        lable: ' Umarkhed ',
        value: ' Umarkhed ',
      },
      {
        lable: ' Umrane ',
        value: ' Umrane ',
      },
      {
        lable: ' Umrer ',
        value: ' Umrer ',
      },
      {
        lable: ' Urlikanchan ',
        value: ' Urlikanchan ',
      },
      {
        lable: ' Vaduj ',
        value: ' Vaduj ',
      },
      {
        lable: ' Velhe ',
        value: ' Velhe ',
      },
      {
        lable: ' Vengurla ',
        value: ' Vengurla ',
      },
      {
        lable: ' Vijapur ',
        value: ' Vijapur ',
      },
      {
        lable: ' Vita ',
        value: ' Vita ',
      },
      {
        lable: ' Wada ',
        value: ' Wada ',
      },
      {
        lable: ' Wai ',
        value: ' Wai ',
      },
      {
        lable: ' Walchandnagar ',
        value: ' Walchandnagar ',
      },
      {
        lable: ' Wani ',
        value: ' Wani ',
      },
      {
        lable: ' Wardha ',
        value: ' Wardha ',
      },
      {
        lable: ' Warlydwarud ',
        value: ' Warlydwarud ',
      },
      {
        lable: ' Warora ',
        value: ' Warora ',
      },
      {
        lable: ' Washim ',
        value: ' Washim ',
      },
      {
        lable: ' Wathar ',
        value: ' Wathar ',
      },
      {
        lable: ' Yavatmal ',
        value: ' Yavatmal ',
      },
      {
        lable: ' Yawal ',
        value: ' Yawal ',
      },
      {
        lable: ' Yeola ',
        value: ' Yeola ',
      },
      {
        lable: ' Yeotmal ',
        value: ' Yeotmal ',
      },
    ],
    [
      {
        lable: ' Bishnupur ',
        value: ' Bishnupur ',
      },
      {
        lable: ' Chakpikarong ',
        value: ' Chakpikarong ',
      },
      {
        lable: ' Chandel ',
        value: ' Chandel ',
      },
      {
        lable: ' Chattrik ',
        value: ' Chattrik ',
      },
      {
        lable: ' Churachandpur ',
        value: ' Churachandpur ',
      },
      {
        lable: ' Imphal ',
        value: ' Imphal ',
      },
      {
        lable: ' Jiribam ',
        value: ' Jiribam ',
      },
      {
        lable: ' Kakching ',
        value: ' Kakching ',
      },
      {
        lable: ' Kalapahar ',
        value: ' Kalapahar ',
      },
      {
        lable: ' Mao ',
        value: ' Mao ',
      },
      {
        lable: ' Mulam ',
        value: ' Mulam ',
      },
      {
        lable: ' Parbung ',
        value: ' Parbung ',
      },
      {
        lable: ' Sadarhills ',
        value: ' Sadarhills ',
      },
      {
        lable: ' Saibom ',
        value: ' Saibom ',
      },
      {
        lable: ' Sempang ',
        value: ' Sempang ',
      },
      {
        lable: ' Senapati ',
        value: ' Senapati ',
      },
      {
        lable: ' Sochumer ',
        value: ' Sochumer ',
      },
      {
        lable: ' Taloulong ',
        value: ' Taloulong ',
      },
      {
        lable: ' Tamenglong ',
        value: ' Tamenglong ',
      },
      {
        lable: ' Thinghat ',
        value: ' Thinghat ',
      },
      {
        lable: ' Thoubal ',
        value: ' Thoubal ',
      },
      {
        lable: ' Ukhrul ',
        value: ' Ukhrul ',
      },
    ],
    [
      {
        lable: ' Amlaren ',
        value: ' Amlaren ',
      },
      {
        lable: ' Baghmara ',
        value: ' Baghmara ',
      },
      {
        lable: ' Cherrapunjee ',
        value: ' Cherrapunjee ',
      },
      {
        lable: ' Dadengiri ',
        value: ' Dadengiri ',
      },
      {
        lable: ' Garo Hills ',
        value: ' Garo Hills ',
      },
      {
        lable: ' Jaintia Hills ',
        value: ' Jaintia Hills ',
      },
      {
        lable: ' Jowai ',
        value: ' Jowai ',
      },
      {
        lable: ' Khasi Hills ',
        value: ' Khasi Hills ',
      },
      {
        lable: ' Khliehriat ',
        value: ' Khliehriat ',
      },
      {
        lable: ' Mariang ',
        value: ' Mariang ',
      },
      {
        lable: ' Mawkyrwat ',
        value: ' Mawkyrwat ',
      },
      {
        lable: ' Nongpoh ',
        value: ' Nongpoh ',
      },
      {
        lable: ' Nongstoin ',
        value: ' Nongstoin ',
      },
      {
        lable: ' Resubelpara ',
        value: ' Resubelpara ',
      },
      {
        lable: ' Ri Bhoi ',
        value: ' Ri Bhoi ',
      },
      {
        lable: ' Shillong ',
        value: ' Shillong ',
      },
      {
        lable: ' Tura ',
        value: ' Tura ',
      },
      {
        lable: ' Williamnagar',
        value: ' Williamnagar',
      },
    ],
    [
      {
        lable: ' Aizawl ',
        value: ' Aizawl ',
      },
      {
        lable: ' Champhai ',
        value: ' Champhai ',
      },
      {
        lable: ' Demagiri ',
        value: ' Demagiri ',
      },
      {
        lable: ' Kolasib ',
        value: ' Kolasib ',
      },
      {
        lable: ' Lawngtlai ',
        value: ' Lawngtlai ',
      },
      {
        lable: ' Lunglei ',
        value: ' Lunglei ',
      },
      {
        lable: ' Mamit ',
        value: ' Mamit ',
      },
      {
        lable: ' Saiha ',
        value: ' Saiha ',
      },
      {
        lable: ' Serchhip',
        value: ' Serchhip',
      },
    ],
    [
      {
        lable: ' Dimapur ',
        value: ' Dimapur ',
      },
      {
        lable: ' Jalukie ',
        value: ' Jalukie ',
      },
      {
        lable: ' Kiphire ',
        value: ' Kiphire ',
      },
      {
        lable: ' Kohima ',
        value: ' Kohima ',
      },
      {
        lable: ' Mokokchung ',
        value: ' Mokokchung ',
      },
      {
        lable: ' Mon ',
        value: ' Mon ',
      },
      {
        lable: ' Phek ',
        value: ' Phek ',
      },
      {
        lable: ' Tuensang ',
        value: ' Tuensang ',
      },
      {
        lable: ' Wokha ',
        value: ' Wokha ',
      },
      {
        lable: ' Zunheboto ',
        value: ' Zunheboto ',
      },
    ],
    [
      {
        lable: ' Anandapur ',
        value: ' Anandapur ',
      },
      {
        lable: ' Angul ',
        value: ' Angul ',
      },
      {
        lable: ' Anugul ',
        value: ' Anugul ',
      },
      {
        lable: ' Aska ',
        value: ' Aska ',
      },
      {
        lable: ' Athgarh ',
        value: ' Athgarh ',
      },
      {
        lable: ' Athmallik ',
        value: ' Athmallik ',
      },
      {
        lable: ' Attabira ',
        value: ' Attabira ',
      },
      {
        lable: ' Bagdihi ',
        value: ' Bagdihi ',
      },
      {
        lable: ' Balangir ',
        value: ' Balangir ',
      },
      {
        lable: ' Balasore ',
        value: ' Balasore ',
      },
      {
        lable: ' Baleswar ',
        value: ' Baleswar ',
      },
      {
        lable: ' Baliguda ',
        value: ' Baliguda ',
      },
      {
        lable: ' Balugaon ',
        value: ' Balugaon ',
      },
      {
        lable: ' Banaigarh ',
        value: ' Banaigarh ',
      },
      {
        lable: ' Bangiriposi ',
        value: ' Bangiriposi ',
      },
      {
        lable: ' Barbil ',
        value: ' Barbil ',
      },
      {
        lable: ' Bargarh ',
        value: ' Bargarh ',
      },
      {
        lable: ' Baripada ',
        value: ' Baripada ',
      },
      {
        lable: ' Barkot ',
        value: ' Barkot ',
      },
      {
        lable: ' Basta ',
        value: ' Basta ',
      },
      {
        lable: ' Berhampur ',
        value: ' Berhampur ',
      },
      {
        lable: ' Betanati ',
        value: ' Betanati ',
      },
      {
        lable: ' Bhadrak ',
        value: ' Bhadrak ',
      },
      {
        lable: ' Bhanjanagar ',
        value: ' Bhanjanagar ',
      },
      {
        lable: ' Bhawanipatna ',
        value: ' Bhawanipatna ',
      },
      {
        lable: ' Bhubaneswar ',
        value: ' Bhubaneswar ',
      },
      {
        lable: ' Birmaharajpur ',
        value: ' Birmaharajpur ',
      },
      {
        lable: ' Bisam Cuttack ',
        value: ' Bisam Cuttack ',
      },
      {
        lable: ' Boriguma ',
        value: ' Boriguma ',
      },
      {
        lable: ' Boudh ',
        value: ' Boudh ',
      },
      {
        lable: ' Buguda ',
        value: ' Buguda ',
      },
      {
        lable: ' Chandbali ',
        value: ' Chandbali ',
      },
      {
        lable: ' Chhatrapur ',
        value: ' Chhatrapur ',
      },
      {
        lable: ' Chhendipada ',
        value: ' Chhendipada ',
      },
      {
        lable: ' Cuttack ',
        value: ' Cuttack ',
      },
      {
        lable: ' Daringbadi ',
        value: ' Daringbadi ',
      },
      {
        lable: ' Daspalla ',
        value: ' Daspalla ',
      },
      {
        lable: ' Deodgarh ',
        value: ' Deodgarh ',
      },
      {
        lable: ' Deogarh ',
        value: ' Deogarh ',
      },
      {
        lable: ' Dhanmandal ',
        value: ' Dhanmandal ',
      },
      {
        lable: ' Dharamgarh ',
        value: ' Dharamgarh ',
      },
      {
        lable: ' Dhenkanal ',
        value: ' Dhenkanal ',
      },
      {
        lable: ' Digapahandi ',
        value: ' Digapahandi ',
      },
      {
        lable: ' Dunguripali ',
        value: ' Dunguripali ',
      },
      {
        lable: ' G. Udayagiri ',
        value: ' G. Udayagiri ',
      },
      {
        lable: ' Gajapati ',
        value: ' Gajapati ',
      },
      {
        lable: ' Ganjam ',
        value: ' Ganjam ',
      },
      {
        lable: ' Ghatgaon ',
        value: ' Ghatgaon ',
      },
      {
        lable: ' Gudari ',
        value: ' Gudari ',
      },
      {
        lable: ' Gunupur ',
        value: ' Gunupur ',
      },
      {
        lable: ' Hemgiri ',
        value: ' Hemgiri ',
      },
      {
        lable: ' Hindol ',
        value: ' Hindol ',
      },
      {
        lable: ' Jagatsinghapur ',
        value: ' Jagatsinghapur ',
      },
      {
        lable: ' Jajpur ',
        value: ' Jajpur ',
      },
      {
        lable: ' Jamankira ',
        value: ' Jamankira ',
      },
      {
        lable: ' Jashipur ',
        value: ' Jashipur ',
      },
      {
        lable: ' Jayapatna ',
        value: ' Jayapatna ',
      },
      {
        lable: ' Jeypur ',
        value: ' Jeypur ',
      },
      {
        lable: ' Jharigan ',
        value: ' Jharigan ',
      },
      {
        lable: ' Jharsuguda ',
        value: ' Jharsuguda ',
      },
      {
        lable: ' Jujumura ',
        value: ' Jujumura ',
      },
      {
        lable: ' Kalahandi ',
        value: ' Kalahandi ',
      },
      {
        lable: ' Kalimela ',
        value: ' Kalimela ',
      },
      {
        lable: ' Kamakhyanagar ',
        value: ' Kamakhyanagar ',
      },
      {
        lable: ' Kandhamal ',
        value: ' Kandhamal ',
      },
      {
        lable: ' Kantabhanji ',
        value: ' Kantabhanji ',
      },
      {
        lable: ' Kantamal ',
        value: ' Kantamal ',
      },
      {
        lable: ' Karanjia ',
        value: ' Karanjia ',
      },
      {
        lable: ' Kashipur ',
        value: ' Kashipur ',
      },
      {
        lable: ' Kendrapara ',
        value: ' Kendrapara ',
      },
      {
        lable: ' Kendujhar ',
        value: ' Kendujhar ',
      },
      {
        lable: ' Keonjhar ',
        value: ' Keonjhar ',
      },
      {
        lable: ' Khalikote ',
        value: ' Khalikote ',
      },
      {
        lable: ' Khordha ',
        value: ' Khordha ',
      },
      {
        lable: ' Khurda ',
        value: ' Khurda ',
      },
      {
        lable: ' Komana ',
        value: ' Komana ',
      },
      {
        lable: ' Koraput ',
        value: ' Koraput ',
      },
      {
        lable: ' Kotagarh ',
        value: ' Kotagarh ',
      },
      {
        lable: ' Kuchinda ',
        value: ' Kuchinda ',
      },
      {
        lable: ' Lahunipara ',
        value: ' Lahunipara ',
      },
      {
        lable: ' Laxmipur ',
        value: ' Laxmipur ',
      },
      {
        lable: ' M. Rampur ',
        value: ' M. Rampur ',
      },
      {
        lable: ' Malkangiri ',
        value: ' Malkangiri ',
      },
      {
        lable: ' Mathili ',
        value: ' Mathili ',
      },
      {
        lable: ' Mayurbhanj ',
        value: ' Mayurbhanj ',
      },
      {
        lable: ' Mohana ',
        value: ' Mohana ',
      },
      {
        lable: ' Motu ',
        value: ' Motu ',
      },
      {
        lable: ' Nabarangapur ',
        value: ' Nabarangapur ',
      },
      {
        lable: ' Naktideul ',
        value: ' Naktideul ',
      },
      {
        lable: ' Nandapur ',
        value: ' Nandapur ',
      },
      {
        lable: ' Narlaroad ',
        value: ' Narlaroad ',
      },
      {
        lable: ' Narsinghpur ',
        value: ' Narsinghpur ',
      },
      {
        lable: ' Nayagarh ',
        value: ' Nayagarh ',
      },
      {
        lable: ' Nimapara ',
        value: ' Nimapara ',
      },
      {
        lable: ' Nowparatan ',
        value: ' Nowparatan ',
      },
      {
        lable: ' Nowrangapur ',
        value: ' Nowrangapur ',
      },
      {
        lable: ' Nuapada ',
        value: ' Nuapada ',
      },
      {
        lable: ' Padampur ',
        value: ' Padampur ',
      },
      {
        lable: ' Paikamal ',
        value: ' Paikamal ',
      },
      {
        lable: ' Palla Hara ',
        value: ' Palla Hara ',
      },
      {
        lable: ' Papadhandi ',
        value: ' Papadhandi ',
      },
      {
        lable: ' Parajang ',
        value: ' Parajang ',
      },
      {
        lable: ' Pardip ',
        value: ' Pardip ',
      },
      {
        lable: ' Parlakhemundi ',
        value: ' Parlakhemundi ',
      },
      {
        lable: ' Patnagarh ',
        value: ' Patnagarh ',
      },
      {
        lable: ' Pattamundai ',
        value: ' Pattamundai ',
      },
      {
        lable: ' Phiringia ',
        value: ' Phiringia ',
      },
      {
        lable: ' Phulbani ',
        value: ' Phulbani ',
      },
      {
        lable: ' Puri ',
        value: ' Puri ',
      },
      {
        lable: ' Puruna Katak ',
        value: ' Puruna Katak ',
      },
      {
        lable: ' R. Udayigiri ',
        value: ' R. Udayigiri ',
      },
      {
        lable: ' Rairakhol ',
        value: ' Rairakhol ',
      },
      {
        lable: ' Rairangpur ',
        value: ' Rairangpur ',
      },
      {
        lable: ' Rajgangpur ',
        value: ' Rajgangpur ',
      },
      {
        lable: ' Rajkhariar ',
        value: ' Rajkhariar ',
      },
      {
        lable: ' Rayagada ',
        value: ' Rayagada ',
      },
      {
        lable: ' Rourkela ',
        value: ' Rourkela ',
      },
      {
        lable: ' Sambalpur ',
        value: ' Sambalpur ',
      },
      {
        lable: ' Sohela ',
        value: ' Sohela ',
      },
      {
        lable: ' Sonapur ',
        value: ' Sonapur ',
      },
      {
        lable: ' Soro ',
        value: ' Soro ',
      },
      {
        lable: ' Subarnapur ',
        value: ' Subarnapur ',
      },
      {
        lable: ' Sunabeda ',
        value: ' Sunabeda ',
      },
      {
        lable: ' Sundergarh ',
        value: ' Sundergarh ',
      },
      {
        lable: ' Surada ',
        value: ' Surada ',
      },
      {
        lable: ' T. Rampur ',
        value: ' T. Rampur ',
      },
      {
        lable: ' Talcher ',
        value: ' Talcher ',
      },
      {
        lable: ' Telkoi ',
        value: ' Telkoi ',
      },
      {
        lable: ' Titlagarh ',
        value: ' Titlagarh ',
      },
      {
        lable: ' Tumudibandha ',
        value: ' Tumudibandha ',
      },
      {
        lable: ' Udala ',
        value: ' Udala ',
      },
      {
        lable: ' Umerkote ',
        value: ' Umerkote ',
      },
    ],
    [
      {
        lable: ' Bahur ',
        value: ' Bahur ',
      },
      {
        lable: ' Karaikal ',
        value: ' Karaikal ',
      },
      {
        lable: ' Mahe ',
        value: ' Mahe ',
      },
      {
        lable: ' Pondicherry ',
        value: ' Pondicherry ',
      },
      {
        lable: ' Purnankuppam ',
        value: ' Purnankuppam ',
      },
      {
        lable: ' Valudavur ',
        value: ' Valudavur ',
      },
      {
        lable: ' Villianur ',
        value: ' Villianur ',
      },
      {
        lable: ' Yanam ',
        value: ' Yanam ',
      },
    ],
    [
      {
        lable: ' Abohar ',
        value: ' Abohar ',
      },
      {
        lable: ' Ajnala ',
        value: ' Ajnala ',
      },
      {
        lable: ' Amritsar ',
        value: ' Amritsar ',
      },
      {
        lable: ' Balachaur ',
        value: ' Balachaur ',
      },
      {
        lable: ' Barnala ',
        value: ' Barnala ',
      },
      {
        lable: ' Batala ',
        value: ' Batala ',
      },
      {
        lable: ' Bathinda ',
        value: ' Bathinda ',
      },
      {
        lable: ' Chandigarh ',
        value: ' Chandigarh ',
      },
      {
        lable: ' Dasua ',
        value: ' Dasua ',
      },
      {
        lable: ' Dinanagar ',
        value: ' Dinanagar ',
      },
      {
        lable: ' Faridkot ',
        value: ' Faridkot ',
      },
      {
        lable: ' Fatehgarh Sahib ',
        value: ' Fatehgarh Sahib ',
      },
      {
        lable: ' Fazilka ',
        value: ' Fazilka ',
      },
      {
        lable: ' Ferozepur ',
        value: ' Ferozepur ',
      },
      {
        lable: ' Garhashanker ',
        value: ' Garhashanker ',
      },
      {
        lable: ' Goindwal ',
        value: ' Goindwal ',
      },
      {
        lable: ' Gurdaspur ',
        value: ' Gurdaspur ',
      },
      {
        lable: ' Guruharsahai ',
        value: ' Guruharsahai ',
      },
      {
        lable: ' Hoshiarpur ',
        value: ' Hoshiarpur ',
      },
      {
        lable: ' Jagraon ',
        value: ' Jagraon ',
      },
      {
        lable: ' Jalandhar ',
        value: ' Jalandhar ',
      },
      {
        lable: ' Jugial ',
        value: ' Jugial ',
      },
      {
        lable: ' Kapurthala ',
        value: ' Kapurthala ',
      },
      {
        lable: ' Kharar ',
        value: ' Kharar ',
      },
      {
        lable: ' Kotkapura ',
        value: ' Kotkapura ',
      },
      {
        lable: ' Ludhiana ',
        value: ' Ludhiana ',
      },
      {
        lable: ' Malaut ',
        value: ' Malaut ',
      },
      {
        lable: ' Malerkotla ',
        value: ' Malerkotla ',
      },
      {
        lable: ' Mansa ',
        value: ' Mansa ',
      },
      {
        lable: ' Moga ',
        value: ' Moga ',
      },
      {
        lable: ' Muktasar ',
        value: ' Muktasar ',
      },
      {
        lable: ' Nabha ',
        value: ' Nabha ',
      },
      {
        lable: ' Nakodar ',
        value: ' Nakodar ',
      },
      {
        lable: ' Nangal ',
        value: ' Nangal ',
      },
      {
        lable: ' Nawanshahar ',
        value: ' Nawanshahar ',
      },
      {
        lable: ' Nawanshahr ',
        value: ' Nawanshahr ',
      },
      {
        lable: ' Pathankot ',
        value: ' Pathankot ',
      },
      {
        lable: ' Patiala ',
        value: ' Patiala ',
      },
      {
        lable: ' Patti ',
        value: ' Patti ',
      },
      {
        lable: ' Phagwara ',
        value: ' Phagwara ',
      },
      {
        lable: ' Phillaur ',
        value: ' Phillaur ',
      },
      {
        lable: ' Phulmandi ',
        value: ' Phulmandi ',
      },
      {
        lable: ' Quadian ',
        value: ' Quadian ',
      },
      {
        lable: ' Rajpura ',
        value: ' Rajpura ',
      },
      {
        lable: ' Raman ',
        value: ' Raman ',
      },
      {
        lable: ' Rayya ',
        value: ' Rayya ',
      },
      {
        lable: ' Ropar ',
        value: ' Ropar ',
      },
      {
        lable: ' Rupnagar ',
        value: ' Rupnagar ',
      },
      {
        lable: ' Samana ',
        value: ' Samana ',
      },
      {
        lable: ' Samrala ',
        value: ' Samrala ',
      },
      {
        lable: ' Sangrur ',
        value: ' Sangrur ',
      },
      {
        lable: ' Sardulgarh ',
        value: ' Sardulgarh ',
      },
      {
        lable: ' Sarhind ',
        value: ' Sarhind ',
      },
      {
        lable: ' SAS Nagar ',
        value: ' SAS Nagar ',
      },
      {
        lable: ' Sultanpur Lodhi ',
        value: ' Sultanpur Lodhi ',
      },
      {
        lable: ' Sunam ',
        value: ' Sunam ',
      },
      {
        lable: ' Tanda Urmar ',
        value: ' Tanda Urmar ',
      },
      {
        lable: ' Tarn Taran ',
        value: ' Tarn Taran ',
      },
      {
        lable: ' Zira ',
        value: ' Zira ',
      },
    ],
    [
      {
        lable: ' Abu Road ',
        value: ' Abu Road ',
      },
      {
        lable: ' Ahore ',
        value: ' Ahore ',
      },
      {
        lable: ' Ajmer ',
        value: ' Ajmer ',
      },
      {
        lable: ' Aklera ',
        value: ' Aklera ',
      },
      {
        lable: ' Alwar ',
        value: ' Alwar ',
      },
      {
        lable: ' Amber ',
        value: ' Amber ',
      },
      {
        lable: ' Amet ',
        value: ' Amet ',
      },
      {
        lable: ' Anupgarh ',
        value: ' Anupgarh ',
      },
      {
        lable: ' Asind ',
        value: ' Asind ',
      },
      {
        lable: ' Aspur ',
        value: ' Aspur ',
      },
      {
        lable: ' Atru ',
        value: ' Atru ',
      },
      {
        lable: ' Bagidora ',
        value: ' Bagidora ',
      },
      {
        lable: ' Bali ',
        value: ' Bali ',
      },
      {
        lable: ' Bamanwas ',
        value: ' Bamanwas ',
      },
      {
        lable: ' Banera ',
        value: ' Banera ',
      },
      {
        lable: ' Bansur ',
        value: ' Bansur ',
      },
      {
        lable: ' Banswara ',
        value: ' Banswara ',
      },
      {
        lable: ' Baran ',
        value: ' Baran ',
      },
      {
        lable: ' Bari ',
        value: ' Bari ',
      },
      {
        lable: ' Barisadri ',
        value: ' Barisadri ',
      },
      {
        lable: ' Barmer ',
        value: ' Barmer ',
      },
      {
        lable: ' Baseri ',
        value: ' Baseri ',
      },
      {
        lable: ' Bassi ',
        value: ' Bassi ',
      },
      {
        lable: ' Baswa ',
        value: ' Baswa ',
      },
      {
        lable: ' Bayana ',
        value: ' Bayana ',
      },
      {
        lable: ' Beawar ',
        value: ' Beawar ',
      },
      {
        lable: ' Begun ',
        value: ' Begun ',
      },
      {
        lable: ' Behror ',
        value: ' Behror ',
      },
      {
        lable: ' Bhadra ',
        value: ' Bhadra ',
      },
      {
        lable: ' Bharatpur ',
        value: ' Bharatpur ',
      },
      {
        lable: ' Bhilwara ',
        value: ' Bhilwara ',
      },
      {
        lable: ' Bhim ',
        value: ' Bhim ',
      },
      {
        lable: ' Bhinmal ',
        value: ' Bhinmal ',
      },
      {
        lable: ' Bikaner ',
        value: ' Bikaner ',
      },
      {
        lable: ' Bilara ',
        value: ' Bilara ',
      },
      {
        lable: ' Bundi ',
        value: ' Bundi ',
      },
      {
        lable: ' Chhabra ',
        value: ' Chhabra ',
      },
      {
        lable: ' Chhipaborad ',
        value: ' Chhipaborad ',
      },
      {
        lable: ' Chirawa ',
        value: ' Chirawa ',
      },
      {
        lable: ' Chittorgarh ',
        value: ' Chittorgarh ',
      },
      {
        lable: ' Chohtan ',
        value: ' Chohtan ',
      },
      {
        lable: ' Churu ',
        value: ' Churu ',
      },
      {
        lable: ' Dantaramgarh ',
        value: ' Dantaramgarh ',
      },
      {
        lable: ' Dausa ',
        value: ' Dausa ',
      },
      {
        lable: ' Deedwana ',
        value: ' Deedwana ',
      },
      {
        lable: ' Deeg ',
        value: ' Deeg ',
      },
      {
        lable: ' Degana ',
        value: ' Degana ',
      },
      {
        lable: ' Deogarh ',
        value: ' Deogarh ',
      },
      {
        lable: ' Deoli ',
        value: ' Deoli ',
      },
      {
        lable: ' Desuri ',
        value: ' Desuri ',
      },
      {
        lable: ' Dhariawad ',
        value: ' Dhariawad ',
      },
      {
        lable: ' Dholpur ',
        value: ' Dholpur ',
      },
      {
        lable: ' Digod ',
        value: ' Digod ',
      },
      {
        lable: ' Dudu ',
        value: ' Dudu ',
      },
      {
        lable: ' Dungarpur ',
        value: ' Dungarpur ',
      },
      {
        lable: ' Dungla ',
        value: ' Dungla ',
      },
      {
        lable: ' Fatehpur ',
        value: ' Fatehpur ',
      },
      {
        lable: ' Gangapur ',
        value: ' Gangapur ',
      },
      {
        lable: ' Gangdhar ',
        value: ' Gangdhar ',
      },
      {
        lable: ' Gerhi ',
        value: ' Gerhi ',
      },
      {
        lable: ' Ghatol ',
        value: ' Ghatol ',
      },
      {
        lable: ' Girwa ',
        value: ' Girwa ',
      },
      {
        lable: ' Gogunda ',
        value: ' Gogunda ',
      },
      {
        lable: ' Hanumangarh ',
        value: ' Hanumangarh ',
      },
      {
        lable: ' Hindaun ',
        value: ' Hindaun ',
      },
      {
        lable: ' Hindoli ',
        value: ' Hindoli ',
      },
      {
        lable: ' Hurda ',
        value: ' Hurda ',
      },
      {
        lable: ' Jahazpur ',
        value: ' Jahazpur ',
      },
      {
        lable: ' Jaipur ',
        value: ' Jaipur ',
      },
      {
        lable: ' Jaisalmer ',
        value: ' Jaisalmer ',
      },
      {
        lable: ' Jalore ',
        value: ' Jalore ',
      },
      {
        lable: ' Jhalawar ',
        value: ' Jhalawar ',
      },
      {
        lable: ' Jhunjhunu ',
        value: ' Jhunjhunu ',
      },
      {
        lable: ' Jodhpur ',
        value: ' Jodhpur ',
      },
      {
        lable: ' Kaman ',
        value: ' Kaman ',
      },
      {
        lable: ' Kapasan ',
        value: ' Kapasan ',
      },
      {
        lable: ' Karauli ',
        value: ' Karauli ',
      },
      {
        lable: ' Kekri ',
        value: ' Kekri ',
      },
      {
        lable: ' Keshoraipatan ',
        value: ' Keshoraipatan ',
      },
      {
        lable: ' Khandar ',
        value: ' Khandar ',
      },
      {
        lable: ' Kherwara ',
        value: ' Kherwara ',
      },
      {
        lable: ' Khetri ',
        value: ' Khetri ',
      },
      {
        lable: ' Kishanganj ',
        value: ' Kishanganj ',
      },
      {
        lable: ' Kishangarh ',
        value: ' Kishangarh ',
      },
      {
        lable: ' Kishangarhbas ',
        value: ' Kishangarhbas ',
      },
      {
        lable: ' Kolayat ',
        value: ' Kolayat ',
      },
      {
        lable: ' Kota ',
        value: ' Kota ',
      },
      {
        lable: ' Kotputli ',
        value: ' Kotputli ',
      },
      {
        lable: ' Kotra ',
        value: ' Kotra ',
      },
      {
        lable: ' Kotri ',
        value: ' Kotri ',
      },
      {
        lable: ' Kumbalgarh ',
        value: ' Kumbalgarh ',
      },
      {
        lable: ' Kushalgarh ',
        value: ' Kushalgarh ',
      },
      {
        lable: ' Ladnun ',
        value: ' Ladnun ',
      },
      {
        lable: ' Ladpura ',
        value: ' Ladpura ',
      },
      {
        lable: ' Lalsot ',
        value: ' Lalsot ',
      },
      {
        lable: ' Laxmangarh ',
        value: ' Laxmangarh ',
      },
      {
        lable: ' Lunkaransar ',
        value: ' Lunkaransar ',
      },
      {
        lable: ' Mahuwa ',
        value: ' Mahuwa ',
      },
      {
        lable: ' Malpura ',
        value: ' Malpura ',
      },
      {
        lable: ' Malvi ',
        value: ' Malvi ',
      },
      {
        lable: ' Mandal ',
        value: ' Mandal ',
      },
      {
        lable: ' Mandalgarh ',
        value: ' Mandalgarh ',
      },
      {
        lable: ' Mandawar ',
        value: ' Mandawar ',
      },
      {
        lable: ' Mangrol ',
        value: ' Mangrol ',
      },
      {
        lable: ' Marwar-Jn ',
        value: ' Marwar-Jn ',
      },
      {
        lable: ' Merta ',
        value: ' Merta ',
      },
      {
        lable: ' Nadbai ',
        value: ' Nadbai ',
      },
      {
        lable: ' Nagaur ',
        value: ' Nagaur ',
      },
      {
        lable: ' Nainwa ',
        value: ' Nainwa ',
      },
      {
        lable: ' Nasirabad ',
        value: ' Nasirabad ',
      },
      {
        lable: ' Nathdwara ',
        value: ' Nathdwara ',
      },
      {
        lable: ' Nawa ',
        value: ' Nawa ',
      },
      {
        lable: ' Neem Ka Thana ',
        value: ' Neem Ka Thana ',
      },
      {
        lable: ' Newai ',
        value: ' Newai ',
      },
      {
        lable: ' Nimbahera ',
        value: ' Nimbahera ',
      },
      {
        lable: ' Nohar ',
        value: ' Nohar ',
      },
      {
        lable: ' Nokha ',
        value: ' Nokha ',
      },
      {
        lable: ' Onli ',
        value: ' Onli ',
      },
      {
        lable: ' Osian ',
        value: ' Osian ',
      },
      {
        lable: ' Pachpadara ',
        value: ' Pachpadara ',
      },
      {
        lable: ' Pachpahar ',
        value: ' Pachpahar ',
      },
      {
        lable: ' Padampur ',
        value: ' Padampur ',
      },
      {
        lable: ' Pali ',
        value: ' Pali ',
      },
      {
        lable: ' Parbatsar ',
        value: ' Parbatsar ',
      },
      {
        lable: ' Phagi ',
        value: ' Phagi ',
      },
      {
        lable: ' Phalodi ',
        value: ' Phalodi ',
      },
      {
        lable: ' Pilani ',
        value: ' Pilani ',
      },
      {
        lable: ' Pindwara ',
        value: ' Pindwara ',
      },
      {
        lable: ' Pipalda ',
        value: ' Pipalda ',
      },
      {
        lable: ' Pirawa ',
        value: ' Pirawa ',
      },
      {
        lable: ' Pokaran ',
        value: ' Pokaran ',
      },
      {
        lable: ' Pratapgarh ',
        value: ' Pratapgarh ',
      },
      {
        lable: ' Raipur ',
        value: ' Raipur ',
      },
      {
        lable: ' Raisinghnagar ',
        value: ' Raisinghnagar ',
      },
      {
        lable: ' Rajgarh ',
        value: ' Rajgarh ',
      },
      {
        lable: ' Rajsamand ',
        value: ' Rajsamand ',
      },
      {
        lable: ' Ramganj Mandi ',
        value: ' Ramganj Mandi ',
      },
      {
        lable: ' Ramgarh ',
        value: ' Ramgarh ',
      },
      {
        lable: ' Rashmi ',
        value: ' Rashmi ',
      },
      {
        lable: ' Ratangarh ',
        value: ' Ratangarh ',
      },
      {
        lable: ' Reodar ',
        value: ' Reodar ',
      },
      {
        lable: ' Rupbas ',
        value: ' Rupbas ',
      },
      {
        lable: ' Sadulshahar ',
        value: ' Sadulshahar ',
      },
      {
        lable: ' Sagwara ',
        value: ' Sagwara ',
      },
      {
        lable: ' Sahabad ',
        value: ' Sahabad ',
      },
      {
        lable: ' Salumber ',
        value: ' Salumber ',
      },
      {
        lable: ' Sanchore ',
        value: ' Sanchore ',
      },
      {
        lable: ' Sangaria ',
        value: ' Sangaria ',
      },
      {
        lable: ' Sangod ',
        value: ' Sangod ',
      },
      {
        lable: ' Sapotra ',
        value: ' Sapotra ',
      },
      {
        lable: ' Sarada ',
        value: ' Sarada ',
      },
      {
        lable: ' Sardarshahar ',
        value: ' Sardarshahar ',
      },
      {
        lable: ' Sarwar ',
        value: ' Sarwar ',
      },
      {
        lable: ' Sawai Madhopur ',
        value: ' Sawai Madhopur ',
      },
      {
        lable: ' Shahapura ',
        value: ' Shahapura ',
      },
      {
        lable: ' Sheo ',
        value: ' Sheo ',
      },
      {
        lable: ' Sheoganj ',
        value: ' Sheoganj ',
      },
      {
        lable: ' Shergarh ',
        value: ' Shergarh ',
      },
      {
        lable: ' Sikar ',
        value: ' Sikar ',
      },
      {
        lable: ' Sirohi ',
        value: ' Sirohi ',
      },
      {
        lable: ' Siwana ',
        value: ' Siwana ',
      },
      {
        lable: ' Sojat ',
        value: ' Sojat ',
      },
      {
        lable: ' Sri Dungargarh ',
        value: ' Sri Dungargarh ',
      },
      {
        lable: ' Sri Ganganagar ',
        value: ' Sri Ganganagar ',
      },
      {
        lable: ' Sri Karanpur ',
        value: ' Sri Karanpur ',
      },
      {
        lable: ' Sri Madhopur ',
        value: ' Sri Madhopur ',
      },
      {
        lable: ' Sujangarh ',
        value: ' Sujangarh ',
      },
      {
        lable: ' Taranagar ',
        value: ' Taranagar ',
      },
      {
        lable: ' Thanaghazi ',
        value: ' Thanaghazi ',
      },
      {
        lable: ' Tibbi ',
        value: ' Tibbi ',
      },
      {
        lable: ' Tijara ',
        value: ' Tijara ',
      },
      {
        lable: ' Todaraisingh ',
        value: ' Todaraisingh ',
      },
      {
        lable: ' Tonk ',
        value: ' Tonk ',
      },
      {
        lable: ' Udaipur ',
        value: ' Udaipur ',
      },
      {
        lable: ' Udaipurwati ',
        value: ' Udaipurwati ',
      },
      {
        lable: ' Uniayara ',
        value: ' Uniayara ',
      },
      {
        lable: ' Vallabhnagar ',
        value: ' Vallabhnagar ',
      },
      {
        lable: ' Viratnagar ',
        value: ' Viratnagar ',
      },
    ],
    [
      {
        lable: ' Barmiak ',
        value: ' Barmiak ',
      },
      {
        lable: ' Be ',
        value: ' Be ',
      },
      {
        lable: ' Bhurtuk ',
        value: ' Bhurtuk ',
      },
      {
        lable: ' Chhubakha ',
        value: ' Chhubakha ',
      },
      {
        lable: ' Chidam ',
        value: ' Chidam ',
      },
      {
        lable: ' Chubha ',
        value: ' Chubha ',
      },
      {
        lable: ' Chumikteng ',
        value: ' Chumikteng ',
      },
      {
        lable: ' Dentam ',
        value: ' Dentam ',
      },
      {
        lable: ' Dikchu ',
        value: ' Dikchu ',
      },
      {
        lable: ' Dzongri ',
        value: ' Dzongri ',
      },
      {
        lable: ' Gangtok ',
        value: ' Gangtok ',
      },
      {
        lable: ' Gauzing ',
        value: ' Gauzing ',
      },
      {
        lable: ' Gyalshing ',
        value: ' Gyalshing ',
      },
      {
        lable: ' Hema ',
        value: ' Hema ',
      },
      {
        lable: ' Kerung ',
        value: ' Kerung ',
      },
      {
        lable: ' Lachen ',
        value: ' Lachen ',
      },
      {
        lable: ' Lachung ',
        value: ' Lachung ',
      },
      {
        lable: ' Lema ',
        value: ' Lema ',
      },
      {
        lable: ' Lingtam ',
        value: ' Lingtam ',
      },
      {
        lable: ' Lungthu ',
        value: ' Lungthu ',
      },
      {
        lable: ' Mangan ',
        value: ' Mangan ',
      },
      {
        lable: ' Namchi ',
        value: ' Namchi ',
      },
      {
        lable: ' Namthang ',
        value: ' Namthang ',
      },
      {
        lable: ' Nanga ',
        value: ' Nanga ',
      },
      {
        lable: ' Nantang ',
        value: ' Nantang ',
      },
      {
        lable: ' Naya Bazar ',
        value: ' Naya Bazar ',
      },
      {
        lable: ' Padamachen ',
        value: ' Padamachen ',
      },
      {
        lable: ' Pakhyong ',
        value: ' Pakhyong ',
      },
      {
        lable: ' Pemayangtse ',
        value: ' Pemayangtse ',
      },
      {
        lable: ' Phensang ',
        value: ' Phensang ',
      },
      {
        lable: ' Rangli ',
        value: ' Rangli ',
      },
      {
        lable: ' Rinchingpong ',
        value: ' Rinchingpong ',
      },
      {
        lable: ' Sakyong ',
        value: ' Sakyong ',
      },
      {
        lable: ' Samdong ',
        value: ' Samdong ',
      },
      {
        lable: ' Singtam ',
        value: ' Singtam ',
      },
      {
        lable: ' Siniolchu ',
        value: ' Siniolchu ',
      },
      {
        lable: ' Sombari ',
        value: ' Sombari ',
      },
      {
        lable: ' Soreng ',
        value: ' Soreng ',
      },
      {
        lable: ' Sosing ',
        value: ' Sosing ',
      },
      {
        lable: ' Tekhug ',
        value: ' Tekhug ',
      },
      {
        lable: ' Temi ',
        value: ' Temi ',
      },
      {
        lable: ' Tsetang ',
        value: ' Tsetang ',
      },
      {
        lable: ' Tsomgo ',
        value: ' Tsomgo ',
      },
      {
        lable: ' Tumlong ',
        value: ' Tumlong ',
      },
      {
        lable: ' Yangang ',
        value: ' Yangang ',
      },
      {
        lable: ' Yumtang ',
        value: ' Yumtang ',
      },
    ],
    [
      {
        lable: ' Ambasamudram ',
        value: ' Ambasamudram ',
      },
      {
        lable: ' Anamali ',
        value: ' Anamali ',
      },
      {
        lable: ' Arakandanallur ',
        value: ' Arakandanallur ',
      },
      {
        lable: ' Arantangi ',
        value: ' Arantangi ',
      },
      {
        lable: ' Aravakurichi ',
        value: ' Aravakurichi ',
      },
      {
        lable: ' Ariyalur ',
        value: ' Ariyalur ',
      },
      {
        lable: ' Arkonam ',
        value: ' Arkonam ',
      },
      {
        lable: ' Arni ',
        value: ' Arni ',
      },
      {
        lable: ' Aruppukottai ',
        value: ' Aruppukottai ',
      },
      {
        lable: ' Attur ',
        value: ' Attur ',
      },
      {
        lable: ' Avanashi ',
        value: ' Avanashi ',
      },
      {
        lable: ' Batlagundu ',
        value: ' Batlagundu ',
      },
      {
        lable: ' Bhavani ',
        value: ' Bhavani ',
      },
      {
        lable: ' Chengalpattu ',
        value: ' Chengalpattu ',
      },
      {
        lable: ' Chengam ',
        value: ' Chengam ',
      },
      {
        lable: ' Chennai ',
        value: ' Chennai ',
      },
      {
        lable: ' Chidambaram ',
        value: ' Chidambaram ',
      },
      {
        lable: ' Chingleput ',
        value: ' Chingleput ',
      },
      {
        lable: ' Coimbatore ',
        value: ' Coimbatore ',
      },
      {
        lable: ' Courtallam ',
        value: ' Courtallam ',
      },
      {
        lable: ' Cuddalore ',
        value: ' Cuddalore ',
      },
      {
        lable: ' Cumbum ',
        value: ' Cumbum ',
      },
      {
        lable: ' Denkanikoitah ',
        value: ' Denkanikoitah ',
      },
      {
        lable: ' Devakottai ',
        value: ' Devakottai ',
      },
      {
        lable: ' Dharampuram ',
        value: ' Dharampuram ',
      },
      {
        lable: ' Dharmapuri ',
        value: ' Dharmapuri ',
      },
      {
        lable: ' Dindigul ',
        value: ' Dindigul ',
      },
      {
        lable: ' Erode ',
        value: ' Erode ',
      },
      {
        lable: ' Gingee ',
        value: ' Gingee ',
      },
      {
        lable: ' Gobichettipalayam ',
        value: ' Gobichettipalayam ',
      },
      {
        lable: ' Gudalur ',
        value: ' Gudalur ',
      },
      {
        lable: ' Gudiyatham ',
        value: ' Gudiyatham ',
      },
      {
        lable: ' Harur ',
        value: ' Harur ',
      },
      {
        lable: ' Hosur ',
        value: ' Hosur ',
      },
      {
        lable: ' Jayamkondan ',
        value: ' Jayamkondan ',
      },
      {
        lable: ' Kallkurichi ',
        value: ' Kallkurichi ',
      },
      {
        lable: ' Kanchipuram ',
        value: ' Kanchipuram ',
      },
      {
        lable: ' Kangayam ',
        value: ' Kangayam ',
      },
      {
        lable: ' Kanyakumari ',
        value: ' Kanyakumari ',
      },
      {
        lable: ' Karaikal ',
        value: ' Karaikal ',
      },
      {
        lable: ' Karaikudi ',
        value: ' Karaikudi ',
      },
      {
        lable: ' Karur ',
        value: ' Karur ',
      },
      {
        lable: ' Keeranur ',
        value: ' Keeranur ',
      },
      {
        lable: ' Kodaikanal ',
        value: ' Kodaikanal ',
      },
      {
        lable: ' Kodumudi ',
        value: ' Kodumudi ',
      },
      {
        lable: ' Kotagiri ',
        value: ' Kotagiri ',
      },
      {
        lable: ' Kovilpatti ',
        value: ' Kovilpatti ',
      },
      {
        lable: ' Krishnagiri ',
        value: ' Krishnagiri ',
      },
      {
        lable: ' Kulithalai ',
        value: ' Kulithalai ',
      },
      {
        lable: ' Kumbakonam ',
        value: ' Kumbakonam ',
      },
      {
        lable: ' Kuzhithurai ',
        value: ' Kuzhithurai ',
      },
      {
        lable: ' Madurai ',
        value: ' Madurai ',
      },
      {
        lable: ' Madurantgam ',
        value: ' Madurantgam ',
      },
      {
        lable: ' Manamadurai ',
        value: ' Manamadurai ',
      },
      {
        lable: ' Manaparai ',
        value: ' Manaparai ',
      },
      {
        lable: ' Mannargudi ',
        value: ' Mannargudi ',
      },
      {
        lable: ' Mayiladuthurai ',
        value: ' Mayiladuthurai ',
      },
      {
        lable: ' Mayiladutjurai ',
        value: ' Mayiladutjurai ',
      },
      {
        lable: ' Mettupalayam ',
        value: ' Mettupalayam ',
      },
      {
        lable: ' Metturdam ',
        value: ' Metturdam ',
      },
      {
        lable: ' Mudukulathur ',
        value: ' Mudukulathur ',
      },
      {
        lable: ' Mulanur ',
        value: ' Mulanur ',
      },
      {
        lable: ' Musiri ',
        value: ' Musiri ',
      },
      {
        lable: ' Nagapattinam ',
        value: ' Nagapattinam ',
      },
      {
        lable: ' Nagarcoil ',
        value: ' Nagarcoil ',
      },
      {
        lable: ' Namakkal ',
        value: ' Namakkal ',
      },
      {
        lable: ' Nanguneri ',
        value: ' Nanguneri ',
      },
      {
        lable: ' Natham ',
        value: ' Natham ',
      },
      {
        lable: ' Neyveli ',
        value: ' Neyveli ',
      },
      {
        lable: ' Nilgiris ',
        value: ' Nilgiris ',
      },
      {
        lable: ' Oddanchatram ',
        value: ' Oddanchatram ',
      },
      {
        lable: ' Omalpur ',
        value: ' Omalpur ',
      },
      {
        lable: ' Ootacamund ',
        value: ' Ootacamund ',
      },
      {
        lable: ' Ooty ',
        value: ' Ooty ',
      },
      {
        lable: ' Orathanad ',
        value: ' Orathanad ',
      },
      {
        lable: ' Palacode ',
        value: ' Palacode ',
      },
      {
        lable: ' Palani ',
        value: ' Palani ',
      },
      {
        lable: ' Palladum ',
        value: ' Palladum ',
      },
      {
        lable: ' Papanasam ',
        value: ' Papanasam ',
      },
      {
        lable: ' Paramakudi ',
        value: ' Paramakudi ',
      },
      {
        lable: ' Pattukottai ',
        value: ' Pattukottai ',
      },
      {
        lable: ' Perambalur ',
        value: ' Perambalur ',
      },
      {
        lable: ' Perundurai ',
        value: ' Perundurai ',
      },
      {
        lable: ' Pollachi ',
        value: ' Pollachi ',
      },
      {
        lable: ' Polur ',
        value: ' Polur ',
      },
      {
        lable: ' Pondicherry ',
        value: ' Pondicherry ',
      },
      {
        lable: ' Ponnamaravathi ',
        value: ' Ponnamaravathi ',
      },
      {
        lable: ' Ponneri ',
        value: ' Ponneri ',
      },
      {
        lable: ' Pudukkottai ',
        value: ' Pudukkottai ',
      },
      {
        lable: ' Rajapalayam ',
        value: ' Rajapalayam ',
      },
      {
        lable: ' Ramanathapuram ',
        value: ' Ramanathapuram ',
      },
      {
        lable: ' Rameshwaram ',
        value: ' Rameshwaram ',
      },
      {
        lable: ' Ranipet ',
        value: ' Ranipet ',
      },
      {
        lable: ' Rasipuram ',
        value: ' Rasipuram ',
      },
      {
        lable: ' Salem ',
        value: ' Salem ',
      },
      {
        lable: ' Sankagiri ',
        value: ' Sankagiri ',
      },
      {
        lable: ' Sankaran ',
        value: ' Sankaran ',
      },
      {
        lable: ' Sathiyamangalam ',
        value: ' Sathiyamangalam ',
      },
      {
        lable: ' Sivaganga ',
        value: ' Sivaganga ',
      },
      {
        lable: ' Sivakasi ',
        value: ' Sivakasi ',
      },
      {
        lable: ' Sriperumpudur ',
        value: ' Sriperumpudur ',
      },
      {
        lable: ' Srivaikundam ',
        value: ' Srivaikundam ',
      },
      {
        lable: ' Tenkasi ',
        value: ' Tenkasi ',
      },
      {
        lable: ' Thanjavur ',
        value: ' Thanjavur ',
      },
      {
        lable: ' Theni ',
        value: ' Theni ',
      },
      {
        lable: ' Thirumanglam ',
        value: ' Thirumanglam ',
      },
      {
        lable: ' Thiruraipoondi ',
        value: ' Thiruraipoondi ',
      },
      {
        lable: ' Thoothukudi ',
        value: ' Thoothukudi ',
      },
      {
        lable: ' Thuraiyure ',
        value: ' Thuraiyure ',
      },
      {
        lable: ' Tindivanam ',
        value: ' Tindivanam ',
      },
      {
        lable: ' Tiruchendur ',
        value: ' Tiruchendur ',
      },
      {
        lable: ' Tiruchengode ',
        value: ' Tiruchengode ',
      },
      {
        lable: ' Tiruchirappalli ',
        value: ' Tiruchirappalli ',
      },
      {
        lable: ' Tirunelvelli ',
        value: ' Tirunelvelli ',
      },
      {
        lable: ' Tirupathur ',
        value: ' Tirupathur ',
      },
      {
        lable: ' Tirupur ',
        value: ' Tirupur ',
      },
      {
        lable: ' Tiruttani ',
        value: ' Tiruttani ',
      },
      {
        lable: ' Tiruvallur ',
        value: ' Tiruvallur ',
      },
      {
        lable: ' Tiruvannamalai ',
        value: ' Tiruvannamalai ',
      },
      {
        lable: ' Tiruvarur ',
        value: ' Tiruvarur ',
      },
      {
        lable: ' Tiruvellore ',
        value: ' Tiruvellore ',
      },
      {
        lable: ' Tiruvettipuram ',
        value: ' Tiruvettipuram ',
      },
      {
        lable: ' Trichy ',
        value: ' Trichy ',
      },
      {
        lable: ' Tuticorin ',
        value: ' Tuticorin ',
      },
      {
        lable: ' Udumalpet ',
        value: ' Udumalpet ',
      },
      {
        lable: ' Ulundurpet ',
        value: ' Ulundurpet ',
      },
      {
        lable: ' Usiliampatti ',
        value: ' Usiliampatti ',
      },
      {
        lable: ' Uthangarai ',
        value: ' Uthangarai ',
      },
      {
        lable: ' Valapady ',
        value: ' Valapady ',
      },
      {
        lable: ' Valliyoor ',
        value: ' Valliyoor ',
      },
      {
        lable: ' Vaniyambadi ',
        value: ' Vaniyambadi ',
      },
      {
        lable: ' Vedasandur ',
        value: ' Vedasandur ',
      },
      {
        lable: ' Vellore ',
        value: ' Vellore ',
      },
      {
        lable: ' Velur ',
        value: ' Velur ',
      },
      {
        lable: ' Vilathikulam ',
        value: ' Vilathikulam ',
      },
      {
        lable: ' Villupuram ',
        value: ' Villupuram ',
      },
      {
        lable: ' Virudhachalam ',
        value: ' Virudhachalam ',
      },
      {
        lable: ' Virudhunagar ',
        value: ' Virudhunagar ',
      },
      {
        lable: ' Wandiwash ',
        value: ' Wandiwash ',
      },
      {
        lable: ' Yercaud ',
        value: ' Yercaud ',
      },
    ],
    [
      {
        lable: ' Agartala ',
        value: ' Agartala ',
      },
      {
        lable: ' Ambasa ',
        value: ' Ambasa ',
      },
      {
        lable: ' Bampurbari ',
        value: ' Bampurbari ',
      },
      {
        lable: ' Belonia ',
        value: ' Belonia ',
      },
      {
        lable: ' Dhalai ',
        value: ' Dhalai ',
      },
      {
        lable: ' Dharam Nagar ',
        value: ' Dharam Nagar ',
      },
      {
        lable: ' Kailashahar ',
        value: ' Kailashahar ',
      },
      {
        lable: ' Kamal Krishnabari ',
        value: ' Kamal Krishnabari ',
      },
      {
        lable: ' Khopaiyapara ',
        value: ' Khopaiyapara ',
      },
      {
        lable: ' Khowai ',
        value: ' Khowai ',
      },
      {
        lable: ' Phuldungsei ',
        value: ' Phuldungsei ',
      },
      {
        lable: ' Radha Kishore Pur ',
        value: ' Radha Kishore Pur ',
      },
      {
        lable: ' Tripura ',
        value: ' Tripura ',
      },
    ],
    [
      {
        lable: ' Achhnera ',
        value: ' Achhnera ',
      },
      {
        lable: ' Agra ',
        value: ' Agra ',
      },
      {
        lable: ' Akbarpur ',
        value: ' Akbarpur ',
      },
      {
        lable: ' Aliganj ',
        value: ' Aliganj ',
      },
      {
        lable: ' Aligarh ',
        value: ' Aligarh ',
      },
      {
        lable: ' Allahabad ',
        value: ' Allahabad ',
      },
      {
        lable: ' Ambedkar Nagar ',
        value: ' Ambedkar Nagar ',
      },
      {
        lable: ' Amethi ',
        value: ' Amethi ',
      },
      {
        lable: ' Amiliya ',
        value: ' Amiliya ',
      },
      {
        lable: ' Amroha ',
        value: ' Amroha ',
      },
      {
        lable: ' Anola ',
        value: ' Anola ',
      },
      {
        lable: ' Atrauli ',
        value: ' Atrauli ',
      },
      {
        lable: ' Auraiya ',
        value: ' Auraiya ',
      },
      {
        lable: ' Azamgarh ',
        value: ' Azamgarh ',
      },
      {
        lable: ' Baberu ',
        value: ' Baberu ',
      },
      {
        lable: ' Badaun ',
        value: ' Badaun ',
      },
      {
        lable: ' Baghpat ',
        value: ' Baghpat ',
      },
      {
        lable: ' Bagpat ',
        value: ' Bagpat ',
      },
      {
        lable: ' Baheri ',
        value: ' Baheri ',
      },
      {
        lable: ' Bahraich ',
        value: ' Bahraich ',
      },
      {
        lable: ' Ballia ',
        value: ' Ballia ',
      },
      {
        lable: ' Balrampur ',
        value: ' Balrampur ',
      },
      {
        lable: ' Banda ',
        value: ' Banda ',
      },
      {
        lable: ' Bansdeeh ',
        value: ' Bansdeeh ',
      },
      {
        lable: ' Bansgaon ',
        value: ' Bansgaon ',
      },
      {
        lable: ' Bansi ',
        value: ' Bansi ',
      },
      {
        lable: ' Barabanki ',
        value: ' Barabanki ',
      },
      {
        lable: ' Bareilly ',
        value: ' Bareilly ',
      },
      {
        lable: ' Basti ',
        value: ' Basti ',
      },
      {
        lable: ' Bhadohi ',
        value: ' Bhadohi ',
      },
      {
        lable: ' Bharthana ',
        value: ' Bharthana ',
      },
      {
        lable: ' Bharwari ',
        value: ' Bharwari ',
      },
      {
        lable: ' Bhogaon ',
        value: ' Bhogaon ',
      },
      {
        lable: ' Bhognipur ',
        value: ' Bhognipur ',
      },
      {
        lable: ' Bidhuna ',
        value: ' Bidhuna ',
      },
      {
        lable: ' Bijnore ',
        value: ' Bijnore ',
      },
      {
        lable: ' Bikapur ',
        value: ' Bikapur ',
      },
      {
        lable: ' Bilari ',
        value: ' Bilari ',
      },
      {
        lable: ' Bilgram ',
        value: ' Bilgram ',
      },
      {
        lable: ' Bilhaur ',
        value: ' Bilhaur ',
      },
      {
        lable: ' Bindki ',
        value: ' Bindki ',
      },
      {
        lable: ' Bisalpur ',
        value: ' Bisalpur ',
      },
      {
        lable: ' Bisauli ',
        value: ' Bisauli ',
      },
      {
        lable: ' Biswan ',
        value: ' Biswan ',
      },
      {
        lable: ' Budaun ',
        value: ' Budaun ',
      },
      {
        lable: ' Budhana ',
        value: ' Budhana ',
      },
      {
        lable: ' Bulandshahar ',
        value: ' Bulandshahar ',
      },
      {
        lable: ' Bulandshahr ',
        value: ' Bulandshahr ',
      },
      {
        lable: ' Capianganj ',
        value: ' Capianganj ',
      },
      {
        lable: ' Chakia ',
        value: ' Chakia ',
      },
      {
        lable: ' Chandauli ',
        value: ' Chandauli ',
      },
      {
        lable: ' Charkhari ',
        value: ' Charkhari ',
      },
      {
        lable: ' Chhata ',
        value: ' Chhata ',
      },
      {
        lable: ' Chhibramau ',
        value: ' Chhibramau ',
      },
      {
        lable: ' Chirgaon ',
        value: ' Chirgaon ',
      },
      {
        lable: ' Chitrakoot ',
        value: ' Chitrakoot ',
      },
      {
        lable: ' Chunur ',
        value: ' Chunur ',
      },
      {
        lable: ' Dadri ',
        value: ' Dadri ',
      },
      {
        lable: ' Dalmau ',
        value: ' Dalmau ',
      },
      {
        lable: ' Dataganj ',
        value: ' Dataganj ',
      },
      {
        lable: ' Debai ',
        value: ' Debai ',
      },
      {
        lable: ' Deoband ',
        value: ' Deoband ',
      },
      {
        lable: ' Deoria ',
        value: ' Deoria ',
      },
      {
        lable: ' Derapur ',
        value: ' Derapur ',
      },
      {
        lable: ' Dhampur ',
        value: ' Dhampur ',
      },
      {
        lable: ' Domariyaganj ',
        value: ' Domariyaganj ',
      },
      {
        lable: ' Dudhi ',
        value: ' Dudhi ',
      },
      {
        lable: ' Etah ',
        value: ' Etah ',
      },
      {
        lable: ' Etawah ',
        value: ' Etawah ',
      },
      {
        lable: ' Faizabad ',
        value: ' Faizabad ',
      },
      {
        lable: ' Farrukhabad ',
        value: ' Farrukhabad ',
      },
      {
        lable: ' Fatehpur ',
        value: ' Fatehpur ',
      },
      {
        lable: ' Firozabad ',
        value: ' Firozabad ',
      },
      {
        lable: ' Garauth ',
        value: ' Garauth ',
      },
      {
        lable: ' Garhmukteshwar ',
        value: ' Garhmukteshwar ',
      },
      {
        lable: ' Gautam Buddha Nagar ',
        value: ' Gautam Buddha Nagar ',
      },
      {
        lable: ' Ghatampur ',
        value: ' Ghatampur ',
      },
      {
        lable: ' Ghaziabad ',
        value: ' Ghaziabad ',
      },
      {
        lable: ' Ghazipur ',
        value: ' Ghazipur ',
      },
      {
        lable: ' Ghosi ',
        value: ' Ghosi ',
      },
      {
        lable: ' Gonda ',
        value: ' Gonda ',
      },
      {
        lable: ' Gorakhpur ',
        value: ' Gorakhpur ',
      },
      {
        lable: ' Gunnaur ',
        value: ' Gunnaur ',
      },
      {
        lable: ' Haidergarh ',
        value: ' Haidergarh ',
      },
      {
        lable: ' Hamirpur ',
        value: ' Hamirpur ',
      },
      {
        lable: ' Hapur ',
        value: ' Hapur ',
      },
      {
        lable: ' Hardoi ',
        value: ' Hardoi ',
      },
      {
        lable: ' Harraiya ',
        value: ' Harraiya ',
      },
      {
        lable: ' Hasanganj ',
        value: ' Hasanganj ',
      },
      {
        lable: ' Hasanpur ',
        value: ' Hasanpur ',
      },
      {
        lable: ' Hathras ',
        value: ' Hathras ',
      },
      {
        lable: ' Jalalabad ',
        value: ' Jalalabad ',
      },
      {
        lable: ' Jalaun ',
        value: ' Jalaun ',
      },
      {
        lable: ' Jalesar ',
        value: ' Jalesar ',
      },
      {
        lable: ' Jansath ',
        value: ' Jansath ',
      },
      {
        lable: ' Jarar ',
        value: ' Jarar ',
      },
      {
        lable: ' Jasrana ',
        value: ' Jasrana ',
      },
      {
        lable: ' Jaunpur ',
        value: ' Jaunpur ',
      },
      {
        lable: ' Jhansi ',
        value: ' Jhansi ',
      },
      {
        lable: ' Jyotiba Phule Nagar ',
        value: ' Jyotiba Phule Nagar ',
      },
      {
        lable: ' Kadipur ',
        value: ' Kadipur ',
      },
      {
        lable: ' Kaimganj ',
        value: ' Kaimganj ',
      },
      {
        lable: ' Kairana ',
        value: ' Kairana ',
      },
      {
        lable: ' Kaisarganj ',
        value: ' Kaisarganj ',
      },
      {
        lable: ' Kalpi ',
        value: ' Kalpi ',
      },
      {
        lable: ' Kannauj ',
        value: ' Kannauj ',
      },
      {
        lable: ' Kanpur ',
        value: ' Kanpur ',
      },
      {
        lable: ' Karchhana ',
        value: ' Karchhana ',
      },
      {
        lable: ' Karhal ',
        value: ' Karhal ',
      },
      {
        lable: ' Karvi ',
        value: ' Karvi ',
      },
      {
        lable: ' Kasganj ',
        value: ' Kasganj ',
      },
      {
        lable: ' Kaushambi ',
        value: ' Kaushambi ',
      },
      {
        lable: ' Kerakat ',
        value: ' Kerakat ',
      },
      {
        lable: ' Khaga ',
        value: ' Khaga ',
      },
      {
        lable: ' Khair ',
        value: ' Khair ',
      },
      {
        lable: ' Khalilabad ',
        value: ' Khalilabad ',
      },
      {
        lable: ' Kheri ',
        value: ' Kheri ',
      },
      {
        lable: ' Konch ',
        value: ' Konch ',
      },
      {
        lable: ' Kumaon ',
        value: ' Kumaon ',
      },
      {
        lable: ' Kunda ',
        value: ' Kunda ',
      },
      {
        lable: ' Kushinagar ',
        value: ' Kushinagar ',
      },
      {
        lable: ' Lalganj ',
        value: ' Lalganj ',
      },
      {
        lable: ' Lalitpur ',
        value: ' Lalitpur ',
      },
      {
        lable: ' Lucknow ',
        value: ' Lucknow ',
      },
      {
        lable: ' Machlishahar ',
        value: ' Machlishahar ',
      },
      {
        lable: ' Maharajganj ',
        value: ' Maharajganj ',
      },
      {
        lable: ' Mahoba ',
        value: ' Mahoba ',
      },
      {
        lable: ' Mainpuri ',
        value: ' Mainpuri ',
      },
      {
        lable: ' Malihabad ',
        value: ' Malihabad ',
      },
      {
        lable: ' Mariyahu ',
        value: ' Mariyahu ',
      },
      {
        lable: ' Math ',
        value: ' Math ',
      },
      {
        lable: ' Mathura ',
        value: ' Mathura ',
      },
      {
        lable: ' Mau ',
        value: ' Mau ',
      },
      {
        lable: ' Maudaha ',
        value: ' Maudaha ',
      },
      {
        lable: ' Maunathbhanjan ',
        value: ' Maunathbhanjan ',
      },
      {
        lable: ' Mauranipur ',
        value: ' Mauranipur ',
      },
      {
        lable: ' Mawana ',
        value: ' Mawana ',
      },
      {
        lable: ' Meerut ',
        value: ' Meerut ',
      },
      {
        lable: ' Mehraun ',
        value: ' Mehraun ',
      },
      {
        lable: ' Meja ',
        value: ' Meja ',
      },
      {
        lable: ' Mirzapur ',
        value: ' Mirzapur ',
      },
      {
        lable: ' Misrikh ',
        value: ' Misrikh ',
      },
      {
        lable: ' Modinagar ',
        value: ' Modinagar ',
      },
      {
        lable: ' Mohamdabad ',
        value: ' Mohamdabad ',
      },
      {
        lable: ' Mohamdi ',
        value: ' Mohamdi ',
      },
      {
        lable: ' Moradabad ',
        value: ' Moradabad ',
      },
      {
        lable: ' Musafirkhana ',
        value: ' Musafirkhana ',
      },
      {
        lable: ' Muzaffarnagar ',
        value: ' Muzaffarnagar ',
      },
      {
        lable: ' Nagina ',
        value: ' Nagina ',
      },
      {
        lable: ' Najibabad ',
        value: ' Najibabad ',
      },
      {
        lable: ' Nakur ',
        value: ' Nakur ',
      },
      {
        lable: ' Nanpara ',
        value: ' Nanpara ',
      },
      {
        lable: ' Naraini ',
        value: ' Naraini ',
      },
      {
        lable: ' Naugarh ',
        value: ' Naugarh ',
      },
      {
        lable: ' Nawabganj ',
        value: ' Nawabganj ',
      },
      {
        lable: ' Nighasan ',
        value: ' Nighasan ',
      },
      {
        lable: ' Noida ',
        value: ' Noida ',
      },
      {
        lable: ' Orai ',
        value: ' Orai ',
      },
      {
        lable: ' Padrauna ',
        value: ' Padrauna ',
      },
      {
        lable: ' Pahasu ',
        value: ' Pahasu ',
      },
      {
        lable: ' Patti ',
        value: ' Patti ',
      },
      {
        lable: ' Pharenda ',
        value: ' Pharenda ',
      },
      {
        lable: ' Phoolpur ',
        value: ' Phoolpur ',
      },
      {
        lable: ' Phulpur ',
        value: ' Phulpur ',
      },
      {
        lable: ' Pilibhit ',
        value: ' Pilibhit ',
      },
      {
        lable: ' Pitamberpur ',
        value: ' Pitamberpur ',
      },
      {
        lable: ' Powayan ',
        value: ' Powayan ',
      },
      {
        lable: ' Pratapgarh ',
        value: ' Pratapgarh ',
      },
      {
        lable: ' Puranpur ',
        value: ' Puranpur ',
      },
      {
        lable: ' Purwa ',
        value: ' Purwa ',
      },
      {
        lable: ' Raibareli ',
        value: ' Raibareli ',
      },
      {
        lable: ' Rampur ',
        value: ' Rampur ',
      },
      {
        lable: ' Ramsanehi Ghat ',
        value: ' Ramsanehi Ghat ',
      },
      {
        lable: ' Rasara ',
        value: ' Rasara ',
      },
      {
        lable: ' Rath ',
        value: ' Rath ',
      },
      {
        lable: ' Robertsganj ',
        value: ' Robertsganj ',
      },
      {
        lable: ' Sadabad ',
        value: ' Sadabad ',
      },
      {
        lable: ' Safipur ',
        value: ' Safipur ',
      },
      {
        lable: ' Sagri ',
        value: ' Sagri ',
      },
      {
        lable: ' Saharanpur ',
        value: ' Saharanpur ',
      },
      {
        lable: ' Sahaswan ',
        value: ' Sahaswan ',
      },
      {
        lable: ' Sahjahanpur ',
        value: ' Sahjahanpur ',
      },
      {
        lable: ' Saidpur ',
        value: ' Saidpur ',
      },
      {
        lable: ' Salempur ',
        value: ' Salempur ',
      },
      {
        lable: ' Salon ',
        value: ' Salon ',
      },
      {
        lable: ' Sambhal ',
        value: ' Sambhal ',
      },
      {
        lable: ' Sandila ',
        value: ' Sandila ',
      },
      {
        lable: ' Sant Kabir Nagar ',
        value: ' Sant Kabir Nagar ',
      },
      {
        lable: ' Sant Ravidas Nagar ',
        value: ' Sant Ravidas Nagar ',
      },
      {
        lable: ' Sardhana ',
        value: ' Sardhana ',
      },
      {
        lable: ' Shahabad ',
        value: ' Shahabad ',
      },
      {
        lable: ' Shahganj ',
        value: ' Shahganj ',
      },
      {
        lable: ' Shahjahanpur ',
        value: ' Shahjahanpur ',
      },
      {
        lable: ' Shikohabad ',
        value: ' Shikohabad ',
      },
      {
        lable: ' Shravasti ',
        value: ' Shravasti ',
      },
      {
        lable: ' Siddharthnagar ',
        value: ' Siddharthnagar ',
      },
      {
        lable: ' Sidhauli ',
        value: ' Sidhauli ',
      },
      {
        lable: ' Sikandra Rao ',
        value: ' Sikandra Rao ',
      },
      {
        lable: ' Sikandrabad ',
        value: ' Sikandrabad ',
      },
      {
        lable: ' Sitapur ',
        value: ' Sitapur ',
      },
      {
        lable: ' Siyana ',
        value: ' Siyana ',
      },
      {
        lable: ' Sonbhadra ',
        value: ' Sonbhadra ',
      },
      {
        lable: ' Soraon ',
        value: ' Soraon ',
      },
      {
        lable: ' Sultanpur ',
        value: ' Sultanpur ',
      },
      {
        lable: ' Tanda ',
        value: ' Tanda ',
      },
      {
        lable: ' Tarabganj ',
        value: ' Tarabganj ',
      },
      {
        lable: ' Tilhar ',
        value: ' Tilhar ',
      },
      {
        lable: ' Unnao ',
        value: ' Unnao ',
      },
      {
        lable: ' Utraula ',
        value: ' Utraula ',
      },
      {
        lable: ' Varanasi ',
        value: ' Varanasi ',
      },
      {
        lable: ' Zamania ',
        value: ' Zamania ',
      },
    ],
    [
      {
        lable: ' Almora ',
        value: ' Almora ',
      },
      {
        lable: ' Bageshwar ',
        value: ' Bageshwar ',
      },
      {
        lable: ' Bhatwari ',
        value: ' Bhatwari ',
      },
      {
        lable: ' Chakrata ',
        value: ' Chakrata ',
      },
      {
        lable: ' Chamoli ',
        value: ' Chamoli ',
      },
      {
        lable: ' Champawat ',
        value: ' Champawat ',
      },
      {
        lable: ' Dehradun ',
        value: ' Dehradun ',
      },
      {
        lable: ' Deoprayag ',
        value: ' Deoprayag ',
      },
      {
        lable: ' Dharchula ',
        value: ' Dharchula ',
      },
      {
        lable: ' Dunda ',
        value: ' Dunda ',
      },
      {
        lable: ' Haldwani ',
        value: ' Haldwani ',
      },
      {
        lable: ' Haridwar ',
        value: ' Haridwar ',
      },
      {
        lable: ' Joshimath ',
        value: ' Joshimath ',
      },
      {
        lable: ' Karan Prayag ',
        value: ' Karan Prayag ',
      },
      {
        lable: ' Kashipur ',
        value: ' Kashipur ',
      },
      {
        lable: ' Khatima ',
        value: ' Khatima ',
      },
      {
        lable: ' Kichha ',
        value: ' Kichha ',
      },
      {
        lable: ' Lansdown ',
        value: ' Lansdown ',
      },
      {
        lable: ' Munsiari ',
        value: ' Munsiari ',
      },
      {
        lable: ' Mussoorie ',
        value: ' Mussoorie ',
      },
      {
        lable: ' Nainital ',
        value: ' Nainital ',
      },
      {
        lable: ' Pantnagar ',
        value: ' Pantnagar ',
      },
      {
        lable: ' Partapnagar ',
        value: ' Partapnagar ',
      },
      {
        lable: ' Pauri Garhwal ',
        value: ' Pauri Garhwal ',
      },
      {
        lable: ' Pithoragarh ',
        value: ' Pithoragarh ',
      },
      {
        lable: ' Purola ',
        value: ' Purola ',
      },
      {
        lable: ' Rajgarh ',
        value: ' Rajgarh ',
      },
      {
        lable: ' Ranikhet ',
        value: ' Ranikhet ',
      },
      {
        lable: ' Roorkee ',
        value: ' Roorkee ',
      },
      {
        lable: ' Rudraprayag ',
        value: ' Rudraprayag ',
      },
      {
        lable: ' Tehri Garhwal ',
        value: ' Tehri Garhwal ',
      },
      {
        lable: ' Udham Singh Nagar ',
        value: ' Udham Singh Nagar ',
      },
      {
        lable: ' Ukhimath ',
        value: ' Ukhimath ',
      },
      {
        lable: ' Uttarkashi ',
        value: ' Uttarkashi ',
      },
    ],
    [
      {
        lable: ' Adra ',
        value: ' Adra ',
      },
      {
        lable: ' Alipurduar ',
        value: ' Alipurduar ',
      },
      {
        lable: ' Amlagora ',
        value: ' Amlagora ',
      },
      {
        lable: ' Arambagh ',
        value: ' Arambagh ',
      },
      {
        lable: ' Asansol ',
        value: ' Asansol ',
      },
      {
        lable: ' Balurghat ',
        value: ' Balurghat ',
      },
      {
        lable: ' Bankura ',
        value: ' Bankura ',
      },
      {
        lable: ' Bardhaman ',
        value: ' Bardhaman ',
      },
      {
        lable: ' Basirhat ',
        value: ' Basirhat ',
      },
      {
        lable: ' Berhampur ',
        value: ' Berhampur ',
      },
      {
        lable: ' Bethuadahari ',
        value: ' Bethuadahari ',
      },
      {
        lable: ' Birbhum ',
        value: ' Birbhum ',
      },
      {
        lable: ' Birpara ',
        value: ' Birpara ',
      },
      {
        lable: ' Bishanpur ',
        value: ' Bishanpur ',
      },
      {
        lable: ' Bolpur ',
        value: ' Bolpur ',
      },
      {
        lable: ' Bongoan ',
        value: ' Bongoan ',
      },
      {
        lable: ' Bulbulchandi ',
        value: ' Bulbulchandi ',
      },
      {
        lable: ' Burdwan ',
        value: ' Burdwan ',
      },
      {
        lable: ' Calcutta ',
        value: ' Calcutta ',
      },
      {
        lable: ' Canning ',
        value: ' Canning ',
      },
      {
        lable: ' Champadanga ',
        value: ' Champadanga ',
      },
      {
        lable: ' Contai ',
        value: ' Contai ',
      },
      {
        lable: ' Cooch Behar ',
        value: ' Cooch Behar ',
      },
      {
        lable: ' Daimond Harbour ',
        value: ' Daimond Harbour ',
      },
      {
        lable: ' Dalkhola ',
        value: ' Dalkhola ',
      },
      {
        lable: ' Dantan ',
        value: ' Dantan ',
      },
      {
        lable: ' Darjeeling ',
        value: ' Darjeeling ',
      },
      {
        lable: ' Dhaniakhali ',
        value: ' Dhaniakhali ',
      },
      {
        lable: ' Dhuliyan ',
        value: ' Dhuliyan ',
      },
      {
        lable: ' Dinajpur ',
        value: ' Dinajpur ',
      },
      {
        lable: ' Dinhata ',
        value: ' Dinhata ',
      },
      {
        lable: ' Durgapur ',
        value: ' Durgapur ',
      },
      {
        lable: ' Gangajalghati ',
        value: ' Gangajalghati ',
      },
      {
        lable: ' Gangarampur ',
        value: ' Gangarampur ',
      },
      {
        lable: ' Ghatal ',
        value: ' Ghatal ',
      },
      {
        lable: ' Guskara ',
        value: ' Guskara ',
      },
      {
        lable: ' Habra ',
        value: ' Habra ',
      },
      {
        lable: ' Haldia ',
        value: ' Haldia ',
      },
      {
        lable: ' Harirampur ',
        value: ' Harirampur ',
      },
      {
        lable: ' Harishchandrapur ',
        value: ' Harishchandrapur ',
      },
      {
        lable: ' Hooghly ',
        value: ' Hooghly ',
      },
      {
        lable: ' Howrah ',
        value: ' Howrah ',
      },
      {
        lable: ' Islampur ',
        value: ' Islampur ',
      },
      {
        lable: ' Jagatballavpur ',
        value: ' Jagatballavpur ',
      },
      {
        lable: ' Jalpaiguri ',
        value: ' Jalpaiguri ',
      },
      {
        lable: ' Jhalda ',
        value: ' Jhalda ',
      },
      {
        lable: ' Jhargram ',
        value: ' Jhargram ',
      },
      {
        lable: ' Kakdwip ',
        value: ' Kakdwip ',
      },
      {
        lable: ' Kalchini ',
        value: ' Kalchini ',
      },
      {
        lable: ' Kalimpong ',
        value: ' Kalimpong ',
      },
      {
        lable: ' Kalna ',
        value: ' Kalna ',
      },
      {
        lable: ' Kandi ',
        value: ' Kandi ',
      },
      {
        lable: ' Karimpur ',
        value: ' Karimpur ',
      },
      {
        lable: ' Katwa ',
        value: ' Katwa ',
      },
      {
        lable: ' Kharagpur ',
        value: ' Kharagpur ',
      },
      {
        lable: ' Khatra ',
        value: ' Khatra ',
      },
      {
        lable: ' Krishnanagar ',
        value: ' Krishnanagar ',
      },
      {
        lable: ' Mal Bazar ',
        value: ' Mal Bazar ',
      },
      {
        lable: ' Malda ',
        value: ' Malda ',
      },
      {
        lable: ' Manbazar ',
        value: ' Manbazar ',
      },
      {
        lable: ' Mathabhanga ',
        value: ' Mathabhanga ',
      },
      {
        lable: ' Medinipur ',
        value: ' Medinipur ',
      },
      {
        lable: ' Mekhliganj ',
        value: ' Mekhliganj ',
      },
      {
        lable: ' Mirzapur ',
        value: ' Mirzapur ',
      },
      {
        lable: ' Murshidabad ',
        value: ' Murshidabad ',
      },
      {
        lable: ' Nadia ',
        value: ' Nadia ',
      },
      {
        lable: ' Nagarakata ',
        value: ' Nagarakata ',
      },
      {
        lable: ' Nalhati ',
        value: ' Nalhati ',
      },
      {
        lable: ' Nayagarh ',
        value: ' Nayagarh ',
      },
      {
        lable: ' Parganas ',
        value: ' Parganas ',
      },
      {
        lable: ' Purulia ',
        value: ' Purulia ',
      },
      {
        lable: ' Raiganj ',
        value: ' Raiganj ',
      },
      {
        lable: ' Rampur Hat ',
        value: ' Rampur Hat ',
      },
      {
        lable: ' Ranaghat ',
        value: ' Ranaghat ',
      },
      {
        lable: ' Seharabazar ',
        value: ' Seharabazar ',
      },
      {
        lable: ' Siliguri ',
        value: ' Siliguri ',
      },
      {
        lable: ' Suri ',
        value: ' Suri ',
      },
      {
        lable: ' Takipur ',
        value: ' Takipur ',
      },
      {
        lable: ' Tamluk',
        value: ' Tamluk',
      },
    ],
  ];

  const isEmail = value => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleStateChange = (index, stateValue) => {
    setSelectedState(stateValue.value);
    setCitiesForSelectedState(city[index]); // Set city options based on selected state
    setSelectedCity(''); // Reset selected city when state changes
  };

  const handleCitySelect = selectedItem => {
    setSelectedCity(selectedItem.value); // Set the selected city value
    console.log('City selected:', selectedItem.value); // Log the selected city
  };

  // const handleStateChange = (index, stateValue) => {
  //   setSelectedState(stateValue.value);

  //   // Flatten the selected state's cities array
  //   const selectedCities = city[index].flat();

  //   setCitiesForSelectedState(selectedCities);
  //   setSelectedCity('');
  // };

  // const handleStateChange = (index, stateValue) => {
  //   setSelectedState(stateValue.value);
  //   const selectedCities = city[index]; // Make sure this is the correct reference
  //   setCitiesForSelectedState(selectedCities);
  //   setSelectedCity('');
  //   console.log(selectedCities); // Log to check if cities are being set correctly
  // };
  const generateDocumentId = () => {
    const timestamp = Date.now();
    return `${timestamp}`;
  };

  const validateForm = () => {
    if (!selectedTitle) {
      console.log('Title is required.');
      return false;
    }
    if (!name) {
      console.log('Name is required.');
      return false;
    }
    if (!surname) {
      console.log('Surname is required.');
      return false;
    }
    if (!mobileNumber) {
      console.log('Mobile Number is required.');
      return false;
    }
    if (!address) {
      console.log('Address is required.');
      return false;
    }
    if (!selectedState) {
      console.log('State selection is required.');
      return false;
    }
    if (!selectedCity) {
      console.log('City selection is required.');
      return false;
    }
    if (!pincode) {
      console.log('Pincode is required.');
      return false;
    }
    if (!cityArea) {
      console.log('City Area is required.');
      return false;
    }
    // Add more validations as necessary
    console.log('Form is valid.');
    return true;
  };

  //Example: Call validateForm whenever an input field changes
  useEffect(() => {
    let formIsValid = true; // Assume form is valid unless a check fails

    if (!selectedTitle) {
      console.log('Title is required.');
      formIsValid = false;
    }
    if (!name) {
      console.log('Name is required.');
      formIsValid = false;
    }
    if (!surname) {
      console.log('Surname is required.');
      formIsValid = false;
    }
    if (!mobileNumber) {
      console.log('Mobile Number is required.');
      formIsValid = false;
    }
    if (!address) {
      console.log('Address is required.');
      formIsValid = false;
    }
    if (!selectedState) {
      console.log('State selection is required.');
      formIsValid = false;
    }
    if (!selectedCity) {
      console.log('City selection is required.');
      formIsValid = false;
    }
    if (!pincode) {
      console.log('Pincode is required.');
      formIsValid = false;
    }
    if (!cityArea) {
      console.log('City Area is required.');
      formIsValid = false;
    }
    if (!selectedProduct) {
      console.log('Product selection is required.');
      formIsValid = false;
    }
    if (!productSerialNumber) {
      console.log('Product Serial Number is required.');
      formIsValid = false;
    }
    if (!serviceAssistanceRequiredFor) {
      console.log('Service Assistance description is required.');
      formIsValid = false;
    }
    if (!selectedCallType) {
      console.log('Call Type selection is required.');
      formIsValid = false;
    }

    if (formIsValid) {
      console.log('Form is valid and ready to proceed.');
    }
  }, [
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
    productSerialNumber,
    serviceAssistanceRequiredFor,
    selectedCallType,
  ]);

  const clickNext = () => {
    if (selectedTitle == undefined || selectedTitle == null) {
      alert('Please select a title');
      return;
    }
    if (name == '') {
      alert('Enter Name');
      return;
    }
    if (surname == '') {
      alert('Enter surname');
      return;
    }
    if (mobileNumber == '') {
      alert('Enter mobile number');
      return;
    }
    if (address == '') {
      alert('Enter Address');
      return;
    }
    if (selectedState == undefined || selectedState == null) {
      alert('Please Select a state');
      return;
    }
    if (selectedCity == undefined || selectedCity == null) {
      alert('Please select a city');
      return;
    }
    if (pincode == '') {
      alert('Please enter Pincode');
      return;
    }
    if (cityArea == '') {
      alert('Please enter City Area / Closest Loction ');
      return;
    }

    // if (!EMAIL_REGEX.test(email)) {
    //   alert('Please enter a valid email');
    //   return;
    // }
    if (selectedProduct == undefined || selectedProduct == null) {
      alert('Please select a Product');
      return;
    }
    if (productSerialNumber == '') {
      alert('enter product serial number');
      return;
    }
    if (serviceAssistanceRequiredFor == '') {
      alert('Enter service /assistance reuired for');
      return;
    }
    if (selectedCallType == undefined || selectedCallType == null) {
      alert('please select a Call Type ');
      return;
    }
    const documentId = generateDocumentId();

    navigation.navigate('OnlineServiceRequest', {
      ...props,
      documentId,
      selectedTitle,
      name,
      surname,
      mobileNumber,
      address,
      selectedState,
      selectedCity,
      citiesForSelectedState,
      pincode,
      cityArea,
      alternateNumber,
      email,
      selectedProduct,
      productSubCategory,
      productSerialNumber,
      serviceAssistanceRequiredFor,
      selectedCallType,
    });
  };

  useEffect(() => {
    if (selectedTitle) {
      console.log('Title is selected:', selectedTitle);
    } else {
      console.log('No title selected');
    }
  }, [selectedTitle]);

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
      if (/^\d+$/.test(processedValue)) {
        setMobileNumber(processedValue);
        setEmail('');
      } else {
        setEmail(processedValue);
        setMobileNumber('');
      }
    };

    fetchValue();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      <View>
        <InsideHeader
          title="Online Service Request"
          onBackPress={() => navigation.goBack()} // Set your back action here
        />
      </View>
      <View style={{padding: 15}}>
        <Text style={{fontSize: 16, colorscan: '#838383',fontFamily:GEGBodyCopy}}>
          Kindly fill in the details and your call will be booked. We value your
          feedback. *All fields are mandatory
        </Text>
      </View>
      <View style={{padding: 10}}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 10,
          }}>
          {verified ? (
            isEmail(verified) ? (
              <Text
                numberOfLines={2}
                style={{
                  fontFamily:GEGBold,
                  color: '#525968',
                  fontSize: width > 768 ? 24 : 18, // Larger font size for iPad
                  flex: 1, // Allow text to wrap within available space
                  // marginRight: 5,
                }}>
                Email ID - {verified}
              </Text>
            ) : (
              <Text
                numberOfLines={2}
                style={{
                  fontFamily:GEGBold,
                  color: '#525968',
                  fontSize: width > 768 ? 24 : 18, // Larger font size for iPad
                  flex: 1, // Allow text to wrap within available space
                  // marginRight: 5,
                }}>
                Mobile Number - {verified}
              </Text>
            )
          ) : null}

          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                fontFamily:GEGBold,
                color: '#8BBD54',
                fontSize: width > 768 ? 24 : 18,
              }}>
              Verified
            </Text>
          </View>
        </View>
      </View>
      <ScrollView style={{width: '100%'}}>
        <View
          style={{
            padding: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: width > 768 ? '15%' : '25%',
              borderWidth: 1,
              borderRadius: 9,
              borderColor: '#CECECE',
            }}>
            {/* <Dropdown
              style={{padding: 15, height: 60}}
              data={title}
              labelField="label"
              valueField="value"
              placeholder="Title"
              value={selectedTitle}
              onChange={item => {
                setSelectedTitle(item.value);
              }}
              selectedTextStyle={{color: '#000', fontSize: 16}}
              placeholderStyle={{color: '#000', fontSize: 16}}
              containerStyle={{
                justifyContent: 'center',
                padding: 10,
              }}
            /> */}
            <SelectDropdown
              data={title}
              onSelect={(selectedItem, index) => {
                setSelectedTitle(selectedItem.value);
              }}
              defaultButtonText="Title"
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.label;
              }}
              rowTextForSelection={(item, index) => {
                return item.label;
              }}
              buttonStyle={{
                padding: 10,
                height: 50,
                width: '100%', // Ensures the dropdown covers the width of the container
                backgroundColor: '#FFF', // Optional background color
                borderRadius: 5, // Optional border radius
                borderColor: '#ccc', // Optional border color
                borderWidth: 1, // Optional border width
              }}
              buttonTextStyle={{
                color: '#000',
                fontSize: 16,
                textAlign: 'left', // Align text to the left for a dropdown look
              }}
              dropdownStyle={{
                marginTop: 5, // Space between button and dropdown
                borderRadius: 5,
              }}
              rowTextStyle={{
                color: '#000',
                fontSize: 16,
              }}
              selectedRowStyle={{
                backgroundColor: '#f0f0f0', // Optional selected row background
              }}
            />
          </View>

          <View
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              padding: 5,
              borderRadius: 9,
              borderColor: '#CECECE',
              marginRight: 10,
              width: width > 768 ? '82%' : '70%',
            }}>
            <TextInput
              style={{
                height: 40,
                fontSize: 16,
                color: '#000',
                // backgroundColor: '#F5F5F5',
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
              placeholder="Name*"
              maxLength={40}
              // onChangeText={value => setName(value.trimStart())}

              placeholderTextColor="#BABABA"
            />
          </View>
        </View>
        <View style={{padding: 10}}>
          <View
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              padding: 5,
              borderRadius: 9,
              borderColor: '#CECECE',
              marginHorizontal: 5,
              // marginRight: 10, // Add margin to the right
            }}>
            <TextInput
              style={{
                height: 40,
                fontSize: 16,
                color: '#000',
                flex: 1,
                // Custom styles for text input
                // backgroundColor: '#F5F5F5', // Light background for better readability
                paddingHorizontal: 10, // Add padding inside the text input
                borderRadius: 5,
              }}
              placeholder="Surname*"
              maxLength={40}
              placeholderTextColor="#BABABA"
              onChangeText={value => setSurname(value)}
            />
          </View>
        </View>

        <View style={{padding: 10}}>
          <View
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              padding: 5,
              borderRadius: 9,
              borderColor: '#CECECE',
              marginHorizontal: 5,
              // marginRight: 10, // Add margin to the right
            }}>
            <TextInput
              style={{
                height: 40,
                fontSize: 16,
                color: '#000',
                flex: 1,
                // Custom styles for text input
                // backgroundColor: '#F5F5F5', // Light background for better readability
                paddingHorizontal: 10, // Add padding inside the text input
                borderRadius: 5,
              }}
              placeholder="Mobile Number*"
              maxLength={10}
              value={mobileNumber}
              editable={isEmail(verified)}
              placeholderTextColor="#BABABA"
              onChangeText={value => setMobileNumber(value)}
            />
          </View>
        </View>
        <View style={{padding: 10}}>
          <View
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              padding: 10,
              borderRadius: 9,
              borderColor: '#CECECE',
              marginHorizontal: 5,
              // marginRight: 10,
            }}>
            <TextInput
              placeholder="Address*"
              multiline={true}
              placeholderTextColor="#BABABA"
              onChangeText={value => setAddress(value)}
              style={{
                height: 120, // Increase the height for a larger text area
                fontSize: 16,
                color: '#000',
                flex: 1,
                // backgroundColor: '#F5F5F5', // Light background for better readability
                paddingHorizontal: 10, // Add padding inside the text input
                borderRadius: 5,
                textAlignVertical: 'top',
              }}
            />
          </View>
        </View>
        <View style={{padding: 10}}>
          <View
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              padding: 5,
              borderRadius: 9,
              borderColor: '#CECECE',
              // marginRight: 10,
              marginHorizontal: 5,
            }}>
            {/* <Dropdown
              style={{padding: 10}}
              data={state}
              labelField="label"
              valueField="value"
              placeholder="State"
              value={selectedState}
              onChange={item => {
                handleStateChange(state.indexOf(item), item);
              }}
              selectedTextStyle={{color: '#000', fontSize: 16}}
              placeholderStyle={{color: '#000', fontSize: 16}}
              containerStyle={{
                justifyContent: 'center',
                padding: 10,
              }}
            /> */}
            <SelectDropdown
              data={state}
              defaultButtonText={'Select State'}
              onSelect={(selectedItem, index) => {
                handleStateChange(index, selectedItem);
              }}
              buttonTextAfterSelection={selectedItem => {
                return selectedItem.label; // Assuming label is the property you want to show
              }}
              rowTextForSelection={item => {
                return item.label; // Assuming label is the property for display
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={[
                styles.dropdown1BtnTxtStyle,
                {textAlign: 'left'},
              ]}
              renderDropdownIcon={isOpened => (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#444'}
                  size={18}
                />
              )}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>
        </View>
        {selectedState ? (
          <View style={{padding: 10}}>
            <View
              style={{
                paddingHorizontal: 10,
                borderWidth: 1,
                padding: 5,
                borderRadius: 9,
                borderColor: '#CECECE',
                marginHorizontal: 5,
                // backgroundColor:"red"
                // marginRight: 10,
              }}>
              {/* <Dropdown
                style={{padding: 10}}
                data={citiesForSelectedState}
                labelField="lable"
                valueField="value"
                placeholder="Select a city"
                value={selectedCity}
                onChange={item => {
                  setSelectedCity(item.value);
                }}
                selectedTextStyle={{color: '#000', fontSize: 16}}
                placeholderStyle={{color: '#000', fontSize: 16}}
                containerStyle={{justifyContent: 'center', padding: 10}}
              /> */}
              {/* <SelectDropdown
                data={citiesForSelectedState}
                defaultButtonText={'Select City'}
                // onSelect={(selectedItem, index) => {
                //   setSelectedCity(selectedItem.value);
                // }}
                onSelect={(selectedItem, index) => {
                  handleStateChange(index, selectedItem);
                  console.log(selectedItem);

                }}
                buttonTextAfterSelection={(selectedItem) => {
                  return selectedItem.lable; // Assuming label is the property you want to show
                }}
                rowTextForSelection={(item) => {
                  return item.lable; // Assuming label is the property for display
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => (
                  <FontAwesome
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={'#444'}
                    size={18}
                  />
                )}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
              /> */}
              <SelectDropdown
                data={citiesForSelectedState}
                defaultButtonText={'Select City'}
                onSelect={(selectedItem, index) => {
                  handleCitySelect(selectedItem); // Set the city on selection
                }}
                buttonTextAfterSelection={selectedItem => {
                  return selectedItem.lable; // Display city label after selection
                }}
                rowTextForSelection={item => {
                  return item.lable; // Show city labels in the dropdown list
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={[
                  styles.dropdown1BtnTxtStyle,
                  {textAlign: 'left'},
                ]}
                renderDropdownIcon={isOpened => (
                  <FontAwesome
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={'#444'}
                    size={18}
                  />
                )}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
              />
            </View>
          </View>
        ) : (
          ''
        )}
        <View style={{padding: 10}}>
          <View
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              padding: 5,
              borderRadius: 9,
              borderColor: '#CECECE',
              // marginRight: 10, // Add margin to the right
            }}>
            <TextInput
              style={{
                height: 40,
                fontSize: 16,
                color: '#000',
                flex: 1,
                // Custom styles for text input
                // backgroundColor: '#F5F5F5', // Light background for better readability
                paddingHorizontal: 10, // Add padding inside the text input
                borderRadius: 5,
              }}
              placeholder="Pincode*"
              maxLength={6}
              placeholderTextColor="#BABABA"
              onChangeText={value => {
                setPinCode(value);
              }}
            />
          </View>
        </View>
        <View style={{padding: 10}}>
          <View
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              padding: 5,
              borderRadius: 9,
              borderColor: '#CECECE',
              // marginRight: 10, // Add margin to the right
            }}>
            <TextInput
              style={{
                height: 40,
                fontSize: 16,
                color: '#000',
                flex: 1,
                // Custom styles for text input
                // backgroundColor: '#F5F5F5', // Light background for better readability
                paddingHorizontal: 10, // Add padding inside the text input
                borderRadius: 5,
              }}
              placeholder="City Area/ Closest Location*"
              maxLength={40}
              placeholderTextColor="#BABABA"
              onChangeText={value => setCityArea(value)}
            />
          </View>
        </View>
        <View style={{padding: 10}}>
          <View
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              padding: 5,
              borderRadius: 9,
              borderColor: '#CECECE',
              marginRight: 10, // Add margin to the right
            }}>
            <TextInput
              style={{
                height: 40,
                fontSize: 16,
                color: '#000',
                flex: 1,
                // Custom styles for text input
                // backgroundColor: '#F5F5F5', // Light background for better readability
                paddingHorizontal: 10, // Add padding inside the text input
                borderRadius: 5,
              }}
              placeholder="Alternate Mobile Number (other)"
              maxLength={10}
              placeholderTextColor="#BABABA"
              onChangeText={value => setAlternateNumber(value)}
            />
          </View>
        </View>
        <View style={{padding: 10}}>
          <View
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              padding: 5,
              borderRadius: 9,
              borderColor: '#CECECE',
              marginRight: 10, // Add margin to the right
            }}>
            <TextInput
              style={{
                height: 40,
                fontSize: 16,
                color: '#000',
                flex: 1,
                // Custom styles for text input
                // backgroundColor: '#F5F5F5', // Light background for better readability
                paddingHorizontal: 10, // Add padding inside the text input
                borderRadius: 5,
              }}
              placeholder="Email ID"
              value={email}
              editable={!isEmail(verified)}
              maxLength={40}
              placeholderTextColor="#BABABA"
              onChangeText={value => {
                setEmail(value);
              }}
            />
          </View>
        </View>

        <View style={{padding: 10}}>
          <View
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              padding: 5,
              borderRadius: 9,
              borderColor: '#CECECE',
              marginRight: 10, // Add margin to the right
            }}>
            {/* <Dropdown
              style={{ padding: 10 }}
              data={product}
              labelField="label"
              valueField="value"
              placeholder="Product*"
              value={selectedProduct}
              onChange={item => {
                setSelectedProduct(item.value);
              }}
              selectedTextStyle={{ color: '#000', fontSize: 16 }}
              placeholderStyle={{ color: '#000', fontSize: 16 }}
              containerStyle={{
                justifyContent: 'center',
                padding: 10,
              }}
            /> */}
            <SelectDropdown
              data={product}
              defaultButtonText="Product*"
              onSelect={selectedItem => {
                setSelectedProduct(selectedItem.value);
              }}
              buttonTextAfterSelection={selectedItem => {
                return selectedItem.label; // Display the selected product label
              }}
              rowTextForSelection={item => {
                return item.label; // Display product label in dropdown rows
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={[
                styles.dropdown1BtnTxtStyle,
                {textAlign: 'left'},
              ]}
              renderDropdownIcon={isOpened => (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color="#444"
                  size={18}
                />
              )}
              dropdownIconPosition="right"
              dropdownStyle={styles.dropdownStyle} // Dropdown styling
              rowStyle={styles.rowStyle} // Row styling
              rowTextStyle={styles.rowTextStyle} // Row text styling
            />
          </View>
        </View>
        <View style={{padding: 10}}>
          <View
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              padding: 5,
              borderRadius: 9,
              borderColor: '#CECECE',
              marginRight: 10, // Add margin to the right
            }}>
            <TextInput
              style={{
                height: 40,
                fontSize: 16,
                color: '#000',
                flex: 1,
                // Custom styles for text input
                // backgroundColor: '#F5F5F5', // Light background for better readability
                paddingHorizontal: 10, // Add padding inside the text input
                borderRadius: 5,
              }}
              placeholder="Product Sub Category"
              maxLength={100}
              placeholderTextColor="#BABABA"
              onChangeText={value => {
                setProductSubCategory(value);
              }}
            />
          </View>
        </View>
        <View style={{padding: 10}}>
          <View
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              padding: 5,
              borderRadius: 9,
              borderColor: '#CECECE',
              marginRight: 10, // Add margin to the right
            }}>
            <TextInput
              style={{
                height: 40,
                fontSize: 16,
                color: '#000',
                flex: 1,
                // Custom styles for text input
                // backgroundColor: '#F5F5F5', // Light background for better readability
                paddingHorizontal: 10, // Add padding inside the text input
                borderRadius: 5,
              }}
              placeholder="Product Serial Number*"
              maxLength={50}
              placeholderTextColor="#BABABA"
              onChangeText={value => {
                setProductSerialNumber(value);
              }}
            />
          </View>
        </View>
        <View style={{padding: 10}}>
          <View
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              padding: 5,
              borderRadius: 9,
              borderColor: '#CECECE',
              marginRight: 10, // Add margin to the right
            }}>
            <TextInput
              style={{
                height: 40,
                fontSize: 16,
                color: '#000',
                flex: 1,
                // Custom styles for text input
                // backgroundColor: '#F5F5F5', // Light background for better readability
                paddingHorizontal: 10, // Add padding inside the text input
                borderRadius: 5,
              }}
              placeholder="Service/ Assistance required for*"
              maxLength={50}
              placeholderTextColor="#BABABA"
              onChangeText={value => setServiceAssistanceRequiredFor(value)}
            />
          </View>
        </View>
        <View style={{padding: 10}}>
          <View
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              padding: 5,
              borderRadius: 9,
              borderColor: '#CECECE',
              marginRight: 10, // Add margin to the right
            }}>
            {/* <Dropdown
              style={{ padding: 10 }}
              data={callType}
              labelField="label"
              valueField="value"
              placeholder="Call Type*"
              value={selectedCallType}
              onChange={item => {
                setSelectedCallType(item.value);
              }}
              selectedTextStyle={{ color: '#000', fontSize: 16 }}
              placeholderStyle={{ color: '#000', fontSize: 16 }}
              containerStyle={{
                // backgroundColor: 'red',
                justifyContent: 'center',
                // width: '100%',
                padding: 10,
              }}
            /> */}
            <SelectDropdown
              data={callType}
              defaultButtonText={'Call Type*'}
              onSelect={selectedItem => {
                setSelectedCallType(selectedItem.value);
                console.log(selectedItem.value, '....eeeee');
                // Assuming value is the property to store
              }}
              buttonTextAfterSelection={selectedItem => {
                return selectedItem.label; // Adjust based on your call type object
              }}
              rowTextForSelection={item => {
                return item.label; // Adjust based on your call type object
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={[
                styles.dropdown1BtnTxtStyle,
                {textAlign: 'left'},
              ]}
              renderDropdownIcon={isOpened => (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#444'}
                  size={18}
                />
              )}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
          </View>
        </View>
        <View style={{padding: 15, marginBottom: 20}}>
          <Pressable
            onPress={async () => {
              clickNext();
              // navigation.navigate('OnlineServiceRequest', {...props ,selectedTitle,name,surname,mobileNumber,address,selectedState,selectedCity,citiesForSelectedState,pincode,cityArea,alternateNumber,email,selectedProduct,productSubCategory,productSerialNumber,serviceAssistanceRequiredFor,selectedCallType});
            }}
            style={{
              backgroundColor: '#810055',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 25,
              alignItems: 'center',
              height: 55,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily:GEGBold,
                color: '#fff',
                textAlign: 'center',
                top: 5,
              }}>
              Next
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewServiceRequest;

const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    borderColor: '#CECECE', // Set a border color
    width: '100%',
    padding: 5,
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
