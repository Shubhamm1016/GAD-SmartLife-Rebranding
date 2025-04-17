import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import CheckBox from './CheckBox';

const AddMoreDevicesList = props => {
  const [value, setValue] = useState(false);
  console.log(value, 'value');
  const [type, setType] = useState(props.Type);
  const selectedId = type;
  const AC = 'AC';
  const WM = 'WM';
  const getImageSource = () => {
    switch (selectedId) {
      case AC:
        return require('../assets/acimg.png');
      case WM:
        return require('../assets/washingmashine/wmashine.png');

      default:
        return require('../assets/RefImage/RefQRScaner.png');
    }
  };
  const handleCheckBoxPress = () => {
    // Toggle the local state value
    setValue(!value);
    // Call the parent component's onCheckBoxPress
    if (typeof props.onCheckBoxPress === 'function') {
      props.onCheckBoxPress(props.device, props.node_id, props.Name);
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 12,
        width: '49%',
        marginBottom: 10,
        marginHorizontal: 2,
      }}>
      <View style={{flexDirection: 'column'}}>
        <View>
          {/* <Image
            style={{width: 100, height: 40, resizeMode: 'contain'}}
            source={require('../assets/acimg.png')}
          /> */}
          <Image
            style={{width: 100, height: 40, resizeMode: 'contain'}}
            source={getImageSource()}
          />
        </View>

        <View style={{}}>
          <Text style={{fontSize: 13, color: '#000'}}>{props.device}</Text>
        </View>
      </View>
      <View>
        <CheckBox onPress={handleCheckBoxPress} title="add" isChecked={value} />
      </View>
    </View>
  );
};

export default AddMoreDevicesList;
