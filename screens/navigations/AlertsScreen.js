import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {NodeDetails, sharingrequest} from '../../Context/API';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {UserContext} from '../../Context/UserContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AlertsDeviceList from '../../components/AlertsDeviceList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const groupByName = data => {
  const groupedData = {};

  data.forEach(item => {
    if (!groupedData[item.name]) {
      groupedData[item.name] = {
        ...item,
        times: [item.time],
        ids: [item.id],
        mins: [item.mins], // Store as an array
        power: [item.power], // Store as an array
        respon: [item.respon], // Store as an array
      };
    } else {
      groupedData[item.name].times.push(item.time);
      groupedData[item.name].ids.push(item.id);
      groupedData[item.name].mins.push(item.mins);
      groupedData[item.name].power.push(item.power);
      groupedData[item.name].respon.push(item.respon);
    }
  });

  return Object.values(groupedData).map(group => ({
    ...group,
    id: group.ids.join('-'), // Combine IDs for uniqueness
  }));
};
const renderDevicesItem = (itsemData, props) => {
  console.log(itsemData.item, 'itsemData.item.power');
  return (
    <AlertsDeviceList
      {...props}
      key={itsemData.item.id}
      device={itsemData.item.name}
      offline={itsemData.item.title}
      toggle={itsemData.item.respon}
      power={itsemData.item.power}
      date={itsemData.item.times}
      day={itsemData.item.day}
      id={itsemData.item.ids}
      tem={itsemData.item.tem}
      nodeid={itsemData.item.nodeid}
      mins={itsemData.item.mins}
      days={itsemData.item.days}
    />
  );
};

function AlertsScreen(props) {
  const {navigation, setNotificationCount} = props;
  const isFocused = useIsFocused();
  const {user} = useContext(UserContext);
  const [email, setEmail] = useState(null);
  const [shareData, setShareData] = useState([]);

  // console.log(shareData,"shareData");

  const [showNotificationData, setShowNotificationData] = useState([]); // Get the notification count

  // Whenever the notification count changes, update the tab bar badge

  const filteredNotifications = showNotificationData.filter(
    notification => notification.request_status === 'pending',
  );
  const notificationCount = filteredNotifications.length;
  const [img, setImg] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState('');

  const flitlistData = shareData => {
    const mergedData = groupByName(shareData);
    console.log(mergedData, 'all data to mergedData');
    setListData(mergedData);

  };

  // useEffect(() => {
  //   setNotificationCount(notificationCount);
  //   flitlistData(shareData);
  // }, [notificationCount, shareData]);
  useEffect(() => {
  if (isFocused) {
    setNotificationCount(notificationCount);
    flitlistData(shareData); // <-- this will now run every time screen comes into focus
  }
}, [isFocused, notificationCount, shareData]);

  const CountNotificationData = async () => {
    try {
      let token = await AsyncStorage.getItem('AccessToken');

      let response = await sharingrequest(token);

      setShowNotificationData([]);
      let i = 0;
      while (i < response.data.sharing_requests.length) {
        let email = response.data.sharing_requests[i].primary_user_name;
        let titte = response.data.sharing_requests[i].metadata.devices[0].name;
        let request_status = response.data.sharing_requests[i].request_status;
        let request_id = response.data.sharing_requests[i].request_id;
        let obj = {
          email,
          titte,
          request_status,
          request_id,
        };

        console.log(obj, 'object');
        setShowNotificationData(prev => [...prev, obj]);
        i++;
      }
    } catch (err) {
      console.log(err.response, 'err.response');
      console.log(err.response.data.description, 'error');
    }
  };

  const pullme = React.useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      notificationsData();
      setRefresh(false);
    }, 1000);
  }, []);

  const notificationsData = async () => {
    setShareData([]);
    let token = await AsyncStorage.getItem('AccessToken');
    try {
      let response = await NodeDetails(token);
      if (response.data.nodes.length == 0) return [];
      let nodeDetails = response.data.node_details;
      setShareData([]);
      let i = 0;
      while (i < nodeDetails.length) {
        let tem =
          nodeDetails[i].params.AC && nodeDetails[i].params.AC.Temperature
            ? nodeDetails[i].params.AC.Temperature
            : 'null';
        let schedules = nodeDetails[i].params.Schedule.Schedules;
        let title =
          nodeDetails[i].params.AC && nodeDetails[i].params.AC.Name
            ? nodeDetails[i].params.AC.Name
            : 'null';
        let nodeid = nodeDetails[i].config.node_id;
        for (let j = 0; j < schedules.length; j++) {
          let respon = schedules[j].enabled;
          let name = schedules[j].name;
          let power = schedules[j].action.AC.Power;
          // let power =
          //   schedules[j].action.AC && schedules[j].action.AC.Power
          //     ? schedules[j].action.AC.Power
          //     : 'null';
          let mins = schedules[j].triggers[0].m;
          let days = schedules[j].triggers[0].d;
          let id = schedules[j].id;
          function toHoursAndMinutes(totalMinutes) {
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            let hour = hours < 10 ? '0' + hours : hours;
            let minute = minutes < 10 ? '0' + minutes : minutes;

            return `${hour}:${minute}`;
          }
          let Time24to12 = toHoursAndMinutes(mins);
          const convertTime24to12 = time24h => {
            let time = time24h
              .toString()
              .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time24h];

            if (time.length > 1) {
              time = time.slice(1, -1);
              time[5] = +time[0] < 12 ? ' AM' : ' PM';
              time[0] = +time[0] % 12 || 12;
            }
            return time.join('');
          };
          function getDaysText(days) {
            let daysText = '';
            if (days === 0) {
              daysText = 'Once';
            } else {
              let daysStr = '00000000';
              let daysValue = days.toString(2);
              let daysCharValue = daysValue.split('');
              let j = 7;
              for (let i = daysCharValue.length - 1; i >= 0; i--) {
                daysStr =
                  daysStr.substring(0, j) +
                  daysCharValue[i] +
                  daysStr.substring(j + 1);
                j--;
              }

              if (daysStr === '01111111' || daysStr === '11111111') {
                daysText = 'Every Day';
              } else if (daysStr === '01100000' || daysStr === '11100000') {
                daysText = 'Weekends';
              } else if (daysStr === '00011111' || daysStr === '10011111') {
                daysText = 'Weekdays';
              } else {
                const daysNames = [
                  'Sun',
                  'Sat',
                  'Fri',
                  'Thu',
                  'Wed',
                  'Tue',
                  'Mon',
                ];
                for (let i = daysStr.length - 1; i > 0; i--) {
                  if (daysStr[i] === '1') {
                    const day = daysNames[i - 1];
                    if (daysText.length === 0) {
                      daysText = day;
                    } else {
                      daysText += ', ' + day;
                    }
                  }
                }
              }
            }
            return daysText;
          }
          let day = getDaysText(days);
          let time = convertTime24to12(Time24to12);
          let obj = {
            title,
            respon,
            name,
            time,
            day,
            id,
            nodeid,
            tem,
            mins,
            days,
            power,
          };
          console.log(obj, 'objobj ka kya karna hai ');
          setShareData(prev => [...prev, obj]);
        }

        i++;
      }
    } catch (err) {
      setShareData([]);
      console.log(err, 'eeeeee');
      console.log(err.response.data.description, 'Node Details error');
    }
  };

  const setImge = async () => {
    try {
      const date = await AsyncStorage.getItem('addImg');
      if (date) {
        setImg(JSON.parse(date));
      } else {
        // console.log('No image data found.');
        setImg({});
        // Handle the case where no image data is found in AsyncStorage
        // You can set a default image or take appropriate action
      }
    } catch (error) {
      console.error('Error retrieving image data:', error);
      // Handle any errors that occur during retrieval
    }
  };
  useEffect(() => {
    const getEmailFromStorage = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        setEmail(storedEmail);
      } catch (error) {
        console.error('Error retrieving email:', error);
      }
    };

    getEmailFromStorage();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (isFocused) {
        await notificationsData();
        await setImge();
        await CountNotificationData();
      }
      setLoading(false);
    };

    fetchData();
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.layout}>
          {/* <Image
          source={require('../../assets/UserImages.png')}
          style={{width: 66, height: 66, borderRadius: 90 / 2}}
        /> */}
          {img.uri ? (
            <Image
              source={img}
              style={{width: 66, height: 66, borderRadius: 90 / 2}}
            />
          ) : (
            <Image
              source={require('../../assets/UserImages.png')}
              style={{width: 68, height: 68, borderRadius: 68 / 2}}
            />
          )}

          <View style={styles.textLayout}>
            <Text style={styles.text}>Hey</Text>
            <Text style={styles.text}>
              {user.full_name ? user.full_name : 'user'}
            </Text>
            <Text style={styles.textgray}>{email}</Text>
          </View>

          <TouchableOpacity
            style={styles.layoutNoti}
            onPress={() => {
              // navigator.navigator('NotificationCenterScreen')
              navigation.navigate('NotificationCenterScreen');
            }}>
            <Ionicons name="notifications-outline" color="#810055" size={25} />
            {/* <NotificationIcon width={26} height={26} /> */}
            {notificationCount ? (
              <View
                style={{
                  borderRadius: 100,
                  paddingHorizontal: 5,
                  position: 'absolute',
                  backgroundColor: '#810055',
                  top: -5,
                  right: -5,
                }}>
                <Text style={{fontSize: 16, color: '#fff'}}>
                  {notificationCount}
                </Text>
              </View>
            ) : (
              ''
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.line} />
        {listData && listData.length > 0 ? (
          <FlatList
            data={listData}
            keyExtractor={item => item.id}
            renderItem={itemData => renderDevicesItem(itemData, props)}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={pullme}
                colors={['#4285f4', '#34a853', '#fbbc05', '#ea4335']} // Set the colors for the loading indicator
                progressBackgroundColor="#fff" // Set the background color behind the loading indicator
                size={Platform.OS === 'ios' ? 'large' : 'small'} // Set the size of the loading indicator
              />
            }
            showsVerticalScrollIndicator={false}
          />
        ) : loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#810055" />
          </View>
        ) : (
          <View style={styles.logo}>
            <View
              style={{
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
                height: 100,
                borderRadius: 15,
                width: '100%',
              }}>
              <Image
                style={{padding: 20, width: 140, height: 105}}
                source={require('../../assets/nodata.png')}
              />
            </View>
            {/* <Text style={styles.textTimer}>No previous timer available</Text> */}
          </View>
        )}
        {/* {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#4BB6E8" />
          </View>
        ) : (
          ''
        )} */}
      </View>
    </SafeAreaView>
  );
}

export default AlertsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 14,
    // paddingStart: 6,
    // paddingEnd: 6,
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 14,
    marginEnd: 12,
  },
  textLayout: {
    flex: 1,
    marginStart: 10,
    justifyContent: 'center',
  },
  textgray: {
    fontSize: 11,
    color: '#515152',
  },
  layoutNoti: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginVertical: 30,
  },
  text: {
    fontSize: 14,
    color: 'black',
  },
  textTimer: {
    fontSize: 14,
    color: '#810055',
    // marginTop: 18,
    fontWeight: 'bold',
    marginTop: 80,
  },

  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 0.3,
    backgroundColor: 'gray',
    marginStart: 6,
    marginEnd: 6,
    marginTop: 4,
  },
});
