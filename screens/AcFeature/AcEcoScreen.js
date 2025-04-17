import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {
  DeleteAceptingData,
  DeletePandingData,
  pendingOrDeclined,
  secondaryAceptedData,
  shareDeviceBy,
  shareDeviceContol,
} from '../../Context/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HardResetModule from './HardResetModule';
import RemoveModule from './RemoveModule';
import {GEGBold, GEGHeadline} from '../../comman-compnent/FontFamily';
import InsideHeader from '../../comman-compnent/InsideHeader';

const AcEcoScreen = props => {
  const {navigation} = props;
  const {id, key, uname, role} = props.route.params;

  let nodeid = id;
  let devicename = uname;
  const AC = 'AC';
  const WM = 'WM';
  const getImageSource = () => {
    switch (key) {
      case AC:
        return require('../../assets/acimg.png');
      case WM:
        return require('../../assets/washingmashine/wmashine.png');

      default:
        return require('../../assets/RefImage/RefImage.png');
    }
  };
  const [openModel, setOpenModal] = React.useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setopen = () => {
    setOpenModal(true);
  };

  // function renderModal() {
  //   return (
  //     <Modal visible={openModel} aninmationType="slider" transparent={true}>
  //       <View
  //         style={{
  //           flex: 1,
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           backgroundColor: 'transparent',
  //           // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //         }}>
  //         <View
  //           style={{
  //             backgroundColor: '#F1F1ED',
  //             paddingHorizontal: 15,
  //             paddingVertical: 15,
  //             width: '90%',
  //             borderRadius: 10,
  //             height: 160,
  //           }}>
  //           <Text
  //             style={{
  //               fontSize: 16,
  //               color: '#2B2F3B',
  //               fontWeight: 'bold',
  //             }}>
  //             Share with
  //           </Text>
  //           <TextInput
  //             style={{
  //               height: 45,
  //               paddingHorizontal: 10,
  //               paddingVertical: 10,
  //               marginHorizontal: 10,
  //               marginVertical: 10,
  //               backgroundColor: 'white',
  //               padding: 10,
  //               borderWidth: 1,
  //               borderRadius: 8,
  //               borderColor: '#9c9a9a',
  //             }}
  //             placeholder="Enter Mobile number"
  //             placeholderTextColor="#333333"
  //             onChangeText={value => setUsername(value)}
  //           />
  //           <View
  //             style={{
  //               flexDirection: 'row',
  //               justifyContent: 'flex-end',
  //               alignItems: 'center',
  //               paddingHorizontal: 8,
  //             }}>
  //             <TouchableOpacity onPress={() => setOpenModal(false)}>
  //               <View
  //                 style={{
  //                   elevation: 8,
  //                   borderRadius: 8,
  //                   paddingVertical: 10,
  //                   paddingHorizontal: 12,
  //                   width: 85,
  //                   marginEnd: 8,
  //                   backgroundColor: '#810055',
  //                 }}>
  //                 <Text
  //                   style={{
  //                     fontSize: 16,
  //                     color: '#fff',
  //                     fontWeight: 'bold',
  //                     alignSelf: 'center',
  //                   }}>
  //                   Cancel
  //                 </Text>
  //               </View>
  //             </TouchableOpacity>

  //             <TouchableOpacity
  //               onPress={() => {
  //                 shareDeviceToOtherUser();
  //               }}>
  //               <View
  //                 style={{
  //                   elevation: 8,
  //                   borderRadius: 8,
  //                   paddingVertical: 10,
  //                   paddingHorizontal: 12,
  //                   width: 85,
  //                   backgroundColor: '#810055',
  //                 }}>
  //                 <Text
  //                   style={{
  //                     fontSize: 16,
  //                     color: '#fff',
  //                     fontWeight: 'bold',
  //                     alignSelf: 'center',
  //                   }}>
  //                   Share
  //                 </Text>
  //               </View>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </View>
  //     </Modal>
  //   );
  // }


  function renderModal() {
    return (
      <Modal visible={openModel} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Share with</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Mobile number"
              placeholderTextColor="#333"
              onChangeText={value => setUsername(value)}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => setOpenModal(false)} style={styles.button}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={shareDeviceToOtherUser} style={styles.button}>
                <Text style={styles.buttonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const MOBILE_REGEX = /^\+91[0-9]{10}$/;
  const shareDeviceToOtherUser = async () => {
    let emails;
    const isnum = /^\d+$/.test(username.trim());
    if (isnum) {
      emails = '+91' + username.trim();
    } else {
      emails = username.trim().toLowerCase();
    }

    if (emails == '') {
      alert('Please Provide valid user credentials');
      setIsLoading(false); // Hide the loader
      return;
    }
    if (
      emails === '' ||
      (!EMAIL_REGEX.test(emails) && !MOBILE_REGEX.test(emails))
    ) {
      alert('Please Provide vaild email');
      return;
    }

    let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await shareDeviceContol(token, nodeid, emails, devicename);

      setOpenModal(false);
      setUsername('');
      PendingAcceptance();
    } catch (err) {
      alert(err.response.data.description);
    } finally {
      setIsLoading(false);
    }
  };

  const [selectedId, setSelectedId] = useState('');

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const [alldata, setAllData] = useState([]);

  const filteredNotifications = alldata.filter(
    notification => notification.request_status === 'pending',
  );

  const [sharedBy, setSharedBy] = useState([]);
  const [secondaryAcceptedBy, setSecondaryAcceptedBy] = useState([]);
  const [nodeID, setNodeId] = useState([]);
  const transformedData = secondaryAcceptedBy.map((email, index) => ({
    id: `unique_${index}`,
    email: email,
  }));

  const fetchSharedBy = async nodeid => {
    const token = await AsyncStorage.getItem('AccessToken');
    try {
      const response = await shareDeviceBy(token, nodeid);

      if (!response || !response.data || !response.data.node_sharing) {
        console.error('Response or its properties are undefined or null.');
        return;
      }
      const nodeSharingData = response.data.node_sharing[0];
      const sources = nodeSharingData.sources;

      if (
        Array.isArray(sources) &&
        sources.length > 0 &&
        sources[0] === 'NODE'
      ) {
        setSharedBy(nodeSharingData.users.primary);
      } else {
        console.log(
          'Source is not NODE or sources are missing/empty',
          'alert hai ',
        );
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };

  const acceptaItem = async nodeid => {
    const token = await AsyncStorage.getItem('AccessToken');
    try {
      const response = await secondaryAceptedData(token, nodeid);
      if (!response || !response.data || !response.data.node_sharing) {
        console.error('Response or its properties are undefined or null.');
        return;
      }
      const nodeSharingData = response.data.node_sharing;
      let nodeID = response.data.node_sharing[0].node_id;
      if (nodeSharingData && nodeSharingData.length > 0) {
        const emailAddresses = [];

        nodeSharingData.forEach(sharing => {
          const {users} = sharing;
          const userNames = users.secondary;

          if (userNames && Array.isArray(userNames)) {
            userNames.forEach(email => {
              emailAddresses.push(email);
            });
          }
        });
        setSecondaryAcceptedBy(emailAddresses);
        setNodeId(nodeID);
      } else {
        console.log('No node sharing data available.');
      }
    } catch (err) {
      console.log(err.response.data.description);
    }
  };

  const PendingAcceptance = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      setAllData([]);

      if (!token) {
        throw new Error('Access token not found');
      }
      const response = await pendingOrDeclined(token);

      let i = 0;

      while (i < response.data.sharing_requests.length) {
        let request_id = response.data.sharing_requests[i].request_id;
        let request_status = response.data.sharing_requests[i].request_status;
        let user_name = response.data.sharing_requests[i].user_name;
        let node_id = response.data.sharing_requests[i].node_ids;
        let obj = {
          request_id,
          request_status,
          user_name,
          node_id,
        };
        setAllData(prev => [...prev, obj]);
        i++;
      }
    } catch (error) {
      console.error(error.response.data.description);
    } finally {
      setIsLoading(false);
    }
  };

  // const deletePandingData = async request_id => {
  //   setIsLoading(true); // Set isLoading to true to display the loader
  //   let token = await AsyncStorage.getItem('AccessToken');

  //   try {
  //     let response = await DeletePandingData(token, request_id);

  //     setAllData([]);
  //   } catch (err) {
  //     alert(err.response.data.description);
  //   } finally {
  //     setIsLoading(false); // Hide the loader whether the request succeeded or failed
  //   }
  // };

  const deletePandingData = async request_id => {
    setIsLoading(true); // Set isLoading to true to display the loader
    let token = await AsyncStorage.getItem('AccessToken');

    try {
      let response = await DeletePandingData(token, request_id);

      // After deletion, filter the data to remove the item with the matching request_id
      setAllData(prevData =>
        prevData.filter(item => item.request_id !== request_id),
      );
    } catch (err) {
      alert(err.response.data.description);
    } finally {
      setIsLoading(false); // Hide the loader whether the request succeeded or failed
    }
  };
  const deleteAccteptingData = async (email, nodeid) => {
    let token = await AsyncStorage.getItem('AccessToken');

    try {
      let response = await DeleteAceptingData(token, email, nodeid);

      setSecondaryAcceptedBy([]);
    } catch (err) {
      alert(err.response.data.description);
    }
  };

  // const Item = ({item}) => (
  //   <View
  //     style={{
  //       height: 60,
  //       marginTop: 10,
  //       backgroundColor: '#fff',
  //       padding: 15,
  //       borderWidth: 1,
  //       borderRadius: 10,
  //       borderColor: '#ccc',
  //       justifyContent: 'center',
  //       shadowColor: 'rgba(0, 0, 0, 0.2)',
  //       shadowOffset: {
  //         width: 0,
  //         height: 2,
  //       },
  //       shadowOpacity: 0.8,
  //       shadowRadius: 4,
  //       elevation: 8,
  //     }}>
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         justifyContent: 'space-between',
  //         alignItems: 'center',
  //       }}>
  //       <View>
  //         <Text
  //           style={{
  //             color: '#999C9F',
  //             fontSize: 15,
  //             fontFamily:GEGBold
  //           }}>
  //           {item.user_name}
  //         </Text>
  //         <Text style={{color: '#000'}}>Expires in 7 days </Text>
  //       </View>
  //       <TouchableOpacity
  //         onPress={() => deletePandingData(item.request_id)} // Pass the request_id directly
  //         style={{alignItems: 'center', justifyContent: 'center'}}>
  //         <Entypo
  //           name="cross"
  //           color="#2B2F3B"
  //           width={45}
  //           height={45}
  //           size={20}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );

  const Item = ({item}) => (
    <View
      style={{
        height: 60,
        marginTop: 10,
        backgroundColor: '#fff',
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 8,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text
            style={{
              color: '#999C9F',
              fontSize: 15,
              fontFamily: GEGBold,
            }}>
            {item.user_name}
          </Text>
          <Text style={{color: '#000'}}>Expires in 7 days </Text>
        </View>
        <TouchableOpacity
          onPress={() => deletePandingData(item.request_id)} // Pass the request_id directly
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <Entypo
            name="cross"
            color="#2B2F3B"
            width={45}
            height={45}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ItemAcepted = ({item, nodeid}) => (
    <View
      style={{
        // height: 60,
        marginTop: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 3,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text
            style={{
              color: '#999C9F',
              fontSize: 12,
              fontWeight: 'bold',
            }}>
            {item.email}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => deleteAccteptingData(item.email, nodeID)}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <Entypo
            name="cross"
            color="#999C9F"
            width={45}
            height={45}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  useEffect(() => {
    PendingAcceptance();
    fetchSharedBy(nodeid);
    acceptaItem(nodeid);
  }, [nodeid]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <View style={styles.layoutTop}>
          {/* <Pressable
            style={{
              height: 50,
              // backgroundColor: 'red',
              width: 50,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </Pressable>

          <View style={styles.textLayout}>
            <Text style={styles.textStyle}>Share Device</Text>
          </View> */}
          <View>
            <InsideHeader
              title="Share Device"
              onBackPress={() => navigation.goBack()} // Set your back action here
            />
          </View>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 12,
          }}>
          <Image
            style={styles.image}
            // source={require('../../assets/acimg.png')}
            source={getImageSource()}
          />
          <Text style={styles.text}>{devicename}</Text>
        </View>

        <View style={{marginTop: 32, marginHorizontal: 28}}>
          {filteredNotifications.length > 0 &&
          filteredNotifications[0].node_id.includes(nodeid) ? (
            <View>
              <View>
                <View>
                  <Text style={styles.textColor}>Shared with</Text>
                </View>
                <View>
                  <FlatList
                    data={transformedData}
                    renderItem={({item}) => (
                      <ItemAcepted
                        item={item}
                        someUniqueIdentifier={item.id}
                        nodeid={nodeid}
                      />
                    )}
                    keyExtractor={item => item.id}
                  />
                </View>
                <TouchableOpacity style={styles.layoutmenu} onPress={setopen}>
                  <Text style={styles.textBlue}>
                    Share access to your friends & family
                  </Text>
                  <AntDesign name="right" color="#000" width={20} height={20} />
                </TouchableOpacity>
              </View>
              <Text style={styles.textColor}>Pending for acceptance</Text>
              <FlatList
                data={filteredNotifications}
                renderItem={renderItem}
                keyExtractor={item => item.someUniqueIdentifier}
                extraData={selectedId}
              />
            </View>
          ) : (
            <View>
              {sharedBy && sharedBy.length > 0 ? (
                <View>
                  <Text style={styles.textColor}>Shared by</Text>
                  <View style={{marginTop: 20}}>
                    <Text style={{color: '#525968'}}>{sharedBy[0]}</Text>
                  </View>
                </View>
              ) : (
                <>
                  <View>
                    <View>
                      <Text style={styles.textColor}>Shared with</Text>
                    </View>

                    <FlatList
                      data={transformedData}
                      renderItem={({item}) => (
                        <ItemAcepted
                          item={item}
                          someUniqueIdentifier={item.id}
                        />
                      )}
                      keyExtractor={item => item.id}
                    />

                    <TouchableOpacity
                      style={styles.layoutmenu}
                      onPress={setopen}>
                      <Text style={styles.textBlue}>
                        Share access to your friends & family
                      </Text>
                      <AntDesign
                        name="right"
                        color="#000"
                        width={20}
                        height={20}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          )}
        </View>
        {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#810055" />
          </View>
        ) : (
          ''
        )}

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 14,
            alignItems:'center',
            // marginHorizontal: 28,
          }}>
        
          <RemoveModule
            nodeid={nodeid}
            {...props}
            key={`remove_${key}`}
            role={`hardreset_${role}`}
          />
          <HardResetModule
            nodeid={nodeid}
            {...props}
            key={`hardreset_${key}`}
          />
        </View>

        {renderModal()}
      </View>
    </SafeAreaView>
  );
};

export default AcEcoScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginTop: 32,
  },
  layoutTop: {
    flexDirection: 'row',

    marginTop: 12,
  },
  textLayout: {
    flex: 1,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#2B2F3B',
    fontFamily: GEGHeadline,
    marginTop: 6,
  },
  textColor: {
    fontSize: 14,
    color: 'black',
    marginTop: 26,
  },
  textBlue: {
    fontSize: 14,
    color: '#810055',
    fontWeight: 'bold',
  },
  layoutmenu: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appButtonContainer: {
    elevation: 2,
    marginTop: 14,
    marginStart: 12,
    marginEnd: 12,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 160,
  },
  appButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    alignSelf: 'center',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.4)', // dimmed background
    // paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#F1F1ED',
    borderRadius: 10,
    width: '100%',
    maxWidth: 400,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    color: '#2B2F3B',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 45,
    backgroundColor: 'white',
    borderColor: '#9c9a9a',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // gap: 20,
  },
  button: {
    backgroundColor: '#810055',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 85,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
