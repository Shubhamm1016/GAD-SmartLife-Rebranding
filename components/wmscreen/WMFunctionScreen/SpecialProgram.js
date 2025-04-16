import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  FlatList,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {switchButton} from '../../../Context/API';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Jeanes/ Denim',
    program: 12,
    Description:
      'Gentle yet through wash which preserves fabric strength and color of jeans/denims',
    wash: 'Strong wash',
    rinse: '2 rinse',
    spin_time: '7 min',
    temprature: 'Normal',
    image: require('../../../assets/washingmashine/WM11.png'),
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Cotton',
    program: 13,
    Description:
      'Thorough hot water wash that effectively clean and preserve everyday cotton fabrics',
    wash: 'Soft wash',
    rinse: '2 rinse',
    spin_time: '5 min',
    temprature: '40 Degree',
    image: require('../../../assets/washingmashine/WM12.png'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Comfort wear',
    program: 14,
    Description:
      'A comfort wear that maintains softness and longevity of relaxed fabrics',
    wash: '	Normal wash',
    rinse: '2 rinse',
    spin_time: '5 min',
    temprature: 'Normal',
    image: require('../../../assets/washingmashine/WM13.png'),
  },
  {
    id: '58694a0f-d3a1-471f-bd96-145571e29d72',
    title: 'Silk/Synthetic',
    program: 15,
    Description:
      'A specialized mode for a delicate wash that protects smooth texture and prevents damage to sensitive fabrics',
    wash: 'Soft wash',
    rinse: '2 rinse',
    spin_time: '3 min',
    temprature: 'Normal',
    image: require('../../../assets/washingmashine/WM14.png'),
  },
  {
    id: '58694a0f-3da1-741f-bd96-145571e29d72',
    title: 'Sport Wear',
    program: 16,
    Description:
      'Carefully engineered wash that removes odors and sweat while preserving the fabric elasticity',
    wash: 'Normal wash',
    rinse: '2 rinse',
    spin_time: '5 min',
    temprature: 'Normal',
    image: require('../../../assets/washingmashine/WM15.png'),
  },
  {
    id: '58694a0f-3da1-741f-bd69-415571e29d72',
    title: 'Inner wear',
    program: 17,
    Description:
      'Soft wash that protects soft fabric and maintain shape for better comfort',
    wash: 'Soft wash',
    rinse: '2 rinse',
    spin_time: '4 min',
    temprature: 'Normal',
    image: require('../../../assets/washingmashine/WM16.png'),
  },
  {
    id: '58694a0f-3da1-741f-bd69-144571e29d72',
    title: 'ECO wash',
    program: 18,
    Description:
      'Highly energy efficient cold wash that conserves water while effectively cleaning every day laundry',
    wash: 'Special wash',
    rinse: '1 rinse',
    spin_time: '6 min',
    temprature: 'Normal',
    image: require('../../../assets/washingmashine/WM17.png'),
  },
];

const Item = ({item, program, waterLevel, start, id, navigation, setState,route}) => {
  console.log(item.program, 'program mil gya hai ');
  // console.log(item.timeinhr,"...........timeinhrtimeinhrtimeinhrtimeinhr");

  const selectProgram = async (program, state, id) => {
    console.log(program, state, id, 'Starting wash cycle');
    let token = await AsyncStorage.getItem('AccessToken');
    const key = 'program';
    const switchData = program;

    try {
      let response = await switchButton(state, token, id, switchData, key);
      console.log(response.data, 'response');
      setState(prevState => ({
        ...prevState,
        [key]: switchData,
      }));
    } catch (err) {
      console.log(err.response?.data, 'Error during switch button');
    }
  };


  const handlePress = () => {
    const program = item.program;
    console.log(start,"start");
    if(start){

      navigation.navigate('SpecialProgramStart', {
        programData: item,
        program,
        waterLevel,
        start,
        id,
        setState,
      });
    }else{
      selectProgram(program, 'WM', id);
      navigation.navigate('SpecialProgramStart', {
        programData: item,
        program,
        waterLevel,
        start,
        id,
        setState,
      });
    }
// if(!start){
//   // selectProgram(program, 'WM', id);
//   navigation.navigate('SpecialProgramStart', {
//     programData: item,
//     program,
//     waterLevel,
//     start,
//     id,
//     setState,
//   });
// }
  
  };
  return (
    <View
      style={{
        backgroundColor: '#fff',
        //   padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      }}>
      <Pressable onPress={handlePress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 16, fontWeight: '500', color: '#525968'}}>
            <Image
              source={item.image}
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                marginRight: 10,
              }}
            />
            {item.title}{' '}
          </Text>
          {program === item.program ? (
            <AntDesign name="checkcircle" size={20} color="#4BB6E8" />
          ) : (
            <AntDesign name="right" size={20} color="#CECECE" />
          )}
        </View>
      </Pressable>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#CECECE',
          marginVertical: 20,
        }}
      />
    </View>
  );
};

const SpecialProgram = props => {
  const {navigation} = props;
  const {program, waterLevel, start, setState, id} = props.route.params;
  // console.log(props.route, 'dataaaaa');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </Pressable>

        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              fontWeight: '500',
            }}>
            Special Program
          </Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 10}}>
        {/* <View style={{padding: 15}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              fontStyle: 'italic',
            }}>
            Select Programs
          </Text>
        </View> */}
        {/* <FlatList
          data={DATA}
          renderItem={({item}) => <Item item={item} navigation={navigation} />}
          keyExtractor={item => item.id}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        /> */}
        <FlatList
          data={DATA}
          renderItem={({item}) => (
            <Item
              item={item}
              navigation={navigation}
              program={program}
              waterLevel={waterLevel}
              start={start}
              setState={setState}
              id={id}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        />

        <View style={{}}>
          <Text>
          Once you select a new program, after starting the new program existing program gets replace.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SpecialProgram;
