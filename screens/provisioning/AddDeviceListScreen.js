import { View, Text, FlatList } from 'react-native'
import React from 'react'
// device list data
// function renderDevicesItem(itsemData) {
//   return (
//     <HomeDeviceList
//       device={itemData.item.device}
//       offline={itemData.item.offline}
//     />
//   );
// }
const AddDeviceListScreen = () => {
  return (
    <View>
      <Text style={{color:'red'}}>AddDeviceListScreen</Text>
{/* <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={renderDevicesItem}
    /> */}
    </View>
  )
}

export default AddDeviceListScreen