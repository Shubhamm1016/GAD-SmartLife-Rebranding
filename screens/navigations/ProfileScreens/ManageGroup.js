import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GetGroupNameAPI, GroupName, NodeGroup} from '../../../Context/API';
import {useIsFocused} from '@react-navigation/native';
import InsideHeader from '../../../comman-compnent/InsideHeader';

function ManageGroup(props) {
  const {navigation} = props;
  const isFocused = useIsFocused();
  // console.log(props, 'props manage');
  const [groupData, setGroupData] = useState([]);
  console.log(groupData, 'groupData');
  const [groupName, setGroupName] = useState([]);
  console.log(groupName, 'groupName');
  // console.log(nodeid, 'nodeidnodeidnodeid');
  console.log(groupName, '..........');
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const findGroup = async () => {
    console.log('hello');
    let token = await AsyncStorage.getItem('AccessToken');
    console.log(token, 'tokentoken');
    try {
      let response = await NodeGroup(token);
      setGroupData([]);
      setGroupData(response.data.groups.reverse());
      console.log(response.data.groups, ';;;;;;;;;;;');
      const data = response.data.groups;
      const node_ID = data.map(item => [item.nodes]).flat();
      console.log(node_ID, 'node_IDnode_ID');
      // const getApplianceNamesFromNodeIds = async (node_ID, token) => {
      //   const loadNames = async ids => {
      //     console.log(ids, 'ids.length');
      //     if (ids && Array.isArray(ids)) {
      //       console.log(ids.length, 'ids.length');
      //       if (ids.length === 1) {
      //         try {
      //           let response = await GetGroupNameAPI(token, ids[0]);
      //           console.log(response.data.AC.Name, 'response.data');
      //           return response.data.AC.Name; // Assuming this is the name you want to return
      //         } catch (err) {
      //           console.log(err);
      //           throw new Error('Failed to fetch name for node ID: ' + ids[0]);
      //         }
      //       } else {
      //         const arr = await Promise.all(
      //           ids.map(async item => {
      //             try {
      //               let response = await GetGroupNameAPI(token, item);
      //               return response.data.AC.Name; // Assuming this is the name you want to return
      //             } catch (err) {
      //               console.log(err);
      //               return null; // Handle error case appropriately
      //             }
      //           }),
      //         );
      //         console.log(arr, 'arr');
      //         return arr.join(', ');
      //       }
      //       // Rest of your code
      //     } else {
      //       console.log('ids is undefined or not an array');
      //       // Handle this case appropriately, for example:
      //       return null;
      //     }
      //     return;
      //   };

      //   return Promise.all(node_ID.map(async item => loadNames(item)));
      // };
      const getApplianceNamesFromNodeIds = async (node_ID, token) => {
        const loadNames = async ids => {
          console.log(ids, 'ids.length');
          if (ids && Array.isArray(ids)) {
            console.log(ids.length, 'ids.length');
            if (ids.length === 1) {
              try {
                let response = await GetGroupNameAPI(token, ids[0]);
                console.log(response.data, '========');
                let name = getNameFromResponse(response.data); // Helper function to get the name
                console.log(name, 'response.data');
                return name;
              } catch (err) {
                console.log(err);
                throw new Error('Failed to fetch name for node ID: ' + ids[0]);
              }
            } else {
              const arr = await Promise.all(
                ids.map(async item => {
                  try {
                    let response = await GetGroupNameAPI(token, item);
                    return getNameFromResponse(response.data); // Helper function to get the name
                  } catch (err) {
                    console.log(err);
                    return null; // Handle error case appropriately
                  }
                }),
              );
              console.log(arr, 'arr');
              return arr.filter(name => name !== null).join(', '); // Filter out null values and join names
            }
          } else {
            console.log('ids is undefined or not an array');
            // Handle this case appropriately, for example:
            return null;
          }
        };

        return Promise.all(node_ID.map(async item => loadNames(item)));
      };

      // Helper function to extract the name based on the appliance type
      const getNameFromResponse = data => {
        if (data.AC) {
          return data.AC.Name;
        } else if (data.WM) {
          return data.WM.Name;
        } else if (data.Refrigerator) {
          return data.Refrigerator.Name;
        } else {
          return 'Unknown Appliance'; // Fallback if no matching type found
        }
      };
      (async () => {
        try {
          const token = await AsyncStorage.getItem('AccessToken');
          console.log(token, 'tokentoken');
          const namesData = await getApplianceNamesFromNodeIds(node_ID, token);
          console.log(namesData, 'namesData');
          // setGroupName([]);
          setGroupName(namesData);
        } catch (error) {
          console.error('Error:', error);
        }
      })();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching data starts
        if (isFocused) {
          await findGroup();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false when fetching data is done (whether successful or not)
      }
    };

    fetchData();
  }, [isFocused]);

  const pullme = React.useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      findGroup();
      setRefresh(false);
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: 'red',
          justifyContent: 'space-between',
        }}>
        <View>
          <InsideHeader
            title="Manage Groups"
            onBackPress={() => navigation.goBack()} // Set your back action here
          />
        </View>
        <Pressable
          style={{
            // backgroundColor: 'red',
            height: 50,
            width: 50,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.navigate('ManageCreateGroupScreen', {
              setHideRemove: true,
            });
          }}>
          <AntDesign
            name="plus"
            width={20}
            height={20}
            color="#810055"
            size={20}
          />
        </Pressable>
      </View>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#810055" />
        </View>
      ) : (
        <View style={styles.container}>
          {/* <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'space-between',
                marginTop: 12,
                marginBottom: 15,
              }}>
              <AntDesign
                onPress={() => navigation.goBack()}
                name="arrowleft"
                size={24}
                color="black"
              />
 
              <View
                style={{
                  flex: 1,
                  marginStart: 10,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '500',
                    justifyContent: 'center',
                  }}>
                  Manage Group
                </Text>
              </View>
 
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ManageCreateGroupScreen', {
                    setHideRemove: true,
                  });
                }}>
                <AntDesign
                  name="plus"
                  width={20}
                  height={20}
                  color="#64bbf5"
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View> */}
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={() => pullme()} />
            }
            showsVerticalScrollIndicator={false}>
            {groupData.length > 0 ? (
              groupData.map((ele, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => {
                    console.log('hello');
                    navigation.navigate('ManageCreateGroupScreen', {
                      setHideRemove: false,
                      group_id: ele.group_id,
                      group_name: ele.group_name,
                      selectGroupName: groupName[idx],
                    });
                  }}
                  style={{
                    justifyContent: 'space-between',
                    // marginTop:10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: 'gray',
                    borderRadius: 8,
                    borderWidth: 0.4,
                    paddingStart: 6,
                    paddingEnd: 12,
                    marginTop: 10,
                    paddingVertical: 10,
                  }}>
                  <View>
                    <Text style={{color: '#000', fontSize: 16}}>
                      {ele.group_name ? ele.group_name : 'Group Name'}
                    </Text>
                    {/* {[].length > 0 ? (
                      [].map((el, idx) => ( */}
                    <Text key={idx} style={{color: '#000', fontSize: 14}}>
                      {groupName[idx]}
                    </Text>
                    {/* ))
                    ) : (
                      <View style={styles.layout}>
                        <Text>No Group Name</Text>
                      </View>
                    )} */}
                  </View>
                  <View>
                    <AntDesign
                      name="right"
                      width={20}
                      height={20}
                      color="#000"
                      size={20}
                    />
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.layout}>
                <Text>No Group Created</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

export default ManageGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // padding: 24,
    paddingHorizontal: 10,
    // paddingVertical: 15,
  },
  text: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 28,
  },
  layout: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    // width:'100%',
    // height:100
  },
});
