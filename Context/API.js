import axios from 'axios';
import apiAxios from '../httpAxios';
import {
  ServiceRequestAuthorization,
  Division,
  LocationID,
  ServiceRequestChannel,
  ServiceRequestBookedFor,
  ServiceRequestBookedBy,
  Service_Request_BaseURL,
  ServiceRequestStatusBy,
  loginWithToke,
  client_id,
  redirect_uri,
} from '@env';

// create user account

export const userCreates = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.post(`user2`, {
        user_name: email,
        password: password,
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// user Creates Verfication account

export const userCreatesVerfication = async (email, verificationcode) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.post(`user2`, {
        user_name: email,
        verification_code: verificationcode,
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const mobileEndPoint = async (platform, token, deviceToken) => {
  try {
    const response = await apiAxios.post(
      'user/push_notification/mobile_platform_endpoint',
      {
        platform: platform,
        mobile_device_token: deviceToken,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return response; 
  } catch (err) {
    console.error(
      'Error sending push notification:',
      err.response ? err.response.data : err.message,
    );
    throw err; 
  }
};

// API call to delete the mobile endpoint
export const mobileDeleteEndPoint = async (
  deviceToken,
  token,
  platform_endpoint_arn,
) => {
  console.log('Request Data:');
  console.log('deviceToken:', deviceToken);
  console.log('platform_endpoint_arn:', platform_endpoint_arn);
  console.log('Authorization Token:', token);

  try {
    const response = await apiAxios.delete(
      'user/push_notification/mobile_platform_endpoint',
      {
        params: {
          mobile_device_token: deviceToken,
          endpoint: platform_endpoint_arn,
        },
        headers: {
          Authorization: token,
        },
      },
    );
    console.log('Full Response from API:', response);
    return response;
  } catch (err) {
    console.error(
      'Error during API request:',
      err.response ? err.response.data : err.message,
    );
    throw err;
  }
};

//create user Mobile number account

export const userMobileCreates = async (phone, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.post(`user2`, {
        user_name: phone,
        password: password,
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// create user Mobile number Verfication account

export const userMobileVerfication = async (phone, verificationcode) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.post(`user2`, {
        user_name: phone,

        verification_code: verificationcode,
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// user login API

export const userLogin = async (emails, trimmedPassword) => {
  // console.log(emails, password, '6666666666666666');
  // return
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.post(`login2`, {
        user_name: emails,
        password: trimmedPassword,
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// refrash accesstoken  id

export const tokenRefrash = async (username, accessToken) => {
  // console.log(username, accessToken, 'username, accessToken');
  // return
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.post(`login2`, {
        user_name: username,
        refreshtoken: accessToken,
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// user forgot API

export const userforgot = async emails => {
  // console.log(value, 'value');
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.put(`forgotpassword2`, {
        user_name: emails,
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// User Forget API verification

export const userVerification = async (emails, newpass, verification) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.put(`forgotpassword2`, {
        user_name: emails,

        password: newpass,

        verification_code: verification,
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// Get user data

export const GetUserData = async token => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.get(`user/custom_data`, {
        headers: {
          Authorization: token,
        },
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// Get node details

export const NodeDetails = async (token, node_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.get(
        `user/nodes?node_details=true&start_id=`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const FetchFilter = async (token, nodeid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.get(`user/nodes`, {
        params: {
          node_id: nodeid,
        },

        headers: {
          Authorization: token,
        },
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
// Remove timer
export const removeSetTimer = async (token, nodeid, timerId) => {
  // console.log(nodeid, timerId, 'api_call_________timer');

  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.put(
        `user/nodes/params`,

        {
          Schedule: {
            Schedules: [
              {
                id: timerId,
                operation: 'remove',
              },
            ],
          },
        },
        {
          headers: {
            Authorization: token,
          },

          params: {
            node_id: nodeid,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// alert Switch
export const AlertSwitch = async (id, token, NodeId, select) => {
  // console.log(id, token, NodeId, select, 'id, token, NodeId, select');

  try {
    const response = await apiAxios.put(
      'user/nodes/params',
      {
        Schedule: {
          Schedules: [
            {
              id: id,
              operation: select,
            },
          ],
        },
      },
      {
        headers: {
          Authorization: token,
        },
        params: {
          node_id: NodeId,
        },
      },
    );

    return response; // Resolve the Promise with the response
  } catch (err) {
    throw err; // Throw the error to reject the Promise
  }
};

// Get node details

export const manageGroup = async token => {
  // console.log(token, 'tokentokentoken');
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.get(`user/nodes`, {
        params: {
          node_details: true,
          start_id: '',
        },

        headers: {
          Authorization: token,
        },
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const FeacturAC = async (token, nodeid) => {
  // console.log(token, 'tokentokentoken');
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.get(`user/nodes`, {
        params: {
          node_id: nodeid,
        },

        headers: {
          Authorization: token,
        },
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// Power On/Off

export const switchButton = async (State, token, nodeid, switchData, key) => {
  console.log(
    State,
    token,
    nodeid,
    switchData,
    key,
    'token, nodeid, switchData',
  );
  // return
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.put(
        `user/nodes/params`,

        {
          [State]: {
            [key]: switchData,
          },
        },

        {
          headers: {
            Authorization: token,
          },

          params: {
            node_id: nodeid,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// Display

export const displayButton = async (token, nodeid, display) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.put(
        `user/nodes/params`,

        {
          AC: {
            Display: display,
          },
        },

        {
          headers: {
            Authorization: token,
          },

          params: {
            node_id: nodeid,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// Edit device name

export const EditDeviceName = async (State, token, id, textInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.put(
        `user/nodes/params`,

        {
          [State]: {
            Name: textInput,
          },
        },

        {
          headers: {
            Authorization: token,
          },

          params: {
            node_id: id,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// Feature control

export const featuresContol = async (key, token, nodeid, param, values) => {
  console.log(key, token, nodeid, param, values, ' value a rhe hai ');
  // return
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.put(
        `user/nodes/params`,
        {
          [key]: {
            [param]: values,
          },
        },
        {
          headers: {
            Authorization: token,
          },

          params: {
            node_id: nodeid,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// filter control

export const FilterControl = async (token, props, param, values) => {
  // console.log(param, 'api_data');

  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.put(
        `user/nodes/params`,

        {
          Diagnostics: {
            [param]: values,
          },
        },

        {
          headers: {
            Authorization: token,
          },

          params: {
            node_id: props,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// Mapping function
export const featuresMappingContol = async (token, nodeid, param, values) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.put(
        `user/nodes/mapping`,
        {
          node_id: nodeid,
          [param]: values,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// Delete node from group

export const deleteNodeGroupAPI = async (token, nodes, group_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.put(
        'user/node_group',

        {
          nodes: [nodes],

          operation: 'remove',
        },

        {
          headers: {
            Authorization: token,
          },

          params: {
            group_id: group_id,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

//  Check node status

export const NodeStatus = async token => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.get(`user/nodes/status`, {
        params: {
          node_id: 'VPT96MqQXvZHYcxXKF9L59',
        },

        headers: {
          Authorization: token,
        },
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

//

export const NodeParamse = async token => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.get(`user/nodes/params`, {
        params: {
          node_id: 'VPT96MqQXvZHYcxXKF9L59',
        },

        headers: {
          Authorization: token,
        },
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// GET for create ,Update & get user Device group

export const NodeGroup = async token => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.get(`user/node_group?`, {
        params: {
          node_list: true,
        },

        headers: {
          Authorization: token,
        },
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const GetGroupNameAPI = async (token, node_ID) => {
  console.log(token, node_ID, 'token,node_ID');
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.get(`user/nodes/params?`, {
        params: {
          node_id: node_ID,
        },

        headers: {
          Authorization: token,
        },
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const addGroupList = async (token, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.get(`user/node_group?node_list=true`, {
        params: {
          group_id: id,

          node_list: true,
        },

        headers: {
          Authorization: token,
        },
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
// enter Gruop name post request

export const GroupName = async (Name, node_id, token) => {
  // console.log(Name, node_id, token, 'ChangeGroupName, node_id, token');
  // return
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.post(
        `user/node_group`,

        {
          group_name: Name,
          nodes: node_id,
        },

        {
          headers: {
            Authorization: token,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const UpdateName = async (Name, id, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.put(
        `user/node_group`,
        {
          group_id: id,
          group_name: Name,
        },

        {
          headers: {
            Authorization: token,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// Group Name Update
export const UpdateGroupName = async (group_id, payload, token) => {
  console.log(group_id, payload, token, 'Payload for UpdateGroupName');

  try {
    const response = await apiAxios.put(
      `user/node_group`, // Your endpoint URL

      payload, // The payload containing the group name

      {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer token for authorization
        },
        params: {
          group_id: group_id, // Pass the group_id as a query parameter
        },
      },
    );

    return response.data; // Return the response data
  } catch (err) {
    console.error('Error updating group name:', err);
    throw err; // Throw the error for the calling function to handle
  }
};

export const UpdateGroupNames = async (group_id, payload, token) => {
  console.log(group_id, payload, token, 'Payload for UpdateGroupNames');

  try {
    const response = await apiAxios.put(
      `https://14uv336e1j.execute-api.ap-south-1.amazonaws.com/dev/v1/user/node_group`, // API URL

      payload, // Payload containing the new group name

      {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer token for authorization
        },
        params: {
          group_id: group_id, // Pass the group_id as a query parameter
        },
      },
    );

    console.log('API response:', response.data); // Log the response for debugging
    return response.data; // Return the response data
  } catch (err) {
    console.error('Error updating group name:', err);
    throw err; // Throw the error for the calling function to handle
  }
};
// remove mange Group Device

export const DeleteGroupName = async (token, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.delete(`user/node_group`, {
        params: {
          group_id: id,
        },

        headers: {
          Authorization: token,
        },
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// put nodes sharing

export const nodeSharing = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.post(`user/nodes/sharing`, {
        params: {
          node_id: 'VPT96MqQXvZHYcxXKF9L59',
        },
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// This Api will be called from the Mobile App by end user,to subscribe to push notification

export const PushNotification = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.post(
        `user/push_notification/mobile_platfrom_endpoint`,

        {
          params: {
            node_id: 'VPT96MqQXvZHYcxXKF9L59',
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// remove node mapping

export const removemapping = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.get(`user/nodes/mapping`, {
        params: {
          node_id: 'VPT96MqQXvZHYcxXKF9L59',

          secret_key: '',

          operation: '',

          tag: '',
        },
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// sharing requests API

export const sharingrequest = async token => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.get(`user/nodes/sharing/requests?`, {
        headers: {
          Authorization: token,
        },
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// sharing requests Accept  API

export const acceptrequest = async (token, request_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.put(
        `user/nodes/sharing/requests?`,
        {
          accept: true,

          request_id: request_id,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// sharing requests Accept  API

export const declinerequest = async (token, request_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.put(
        'user/nodes/sharing/requests',
        {
          accept: false,
          request_id: request_id,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// share device to users function
export const shareDeviceContol = async (token, nodeid, emails, devicename) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.put(
        `user/nodes/sharing`,
        {
          nodes: [nodeid],
          user_name: emails,
          metadata: {
            devices: [
              {
                name: devicename,
              },
            ],
          },
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

// edit profile
export const editUserProfile = async (token, formattedDate, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.put(
        'user/custom_data',

        {
          user_data: {
            value: data,
          },

          write_once_user_data: {
            value: {
              ['User created timestamp']: formattedDate,
            },
          },
        },

        {
          headers: {
            Authorization: token,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
//set Time on and off value
export const setTimeDate = async (
  name,
  tem,
  id,
  Power,
  Time,
  daysValue,
  token,
  nodeid,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.put(
        `user/nodes/params?node_id=${nodeid}`,

        {
          Schedule: {
            Schedules: [
              {
                operation: 'add',
                id: id,
                name: name,
                triggers: [
                  {
                    d: daysValue,
                    m: Time,
                  },
                ],
                action: {
                  AC: {
                    Power: Power,
                    Temperature: tem,
                  },
                },
              },
            ],
          },
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
//set Time on and off value
export const UpdateTimeDate = async (
  name,
  tem,
  id,
  Power,
  Time,
  daysValue,
  token,
  nodeid,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.put(
        `user/nodes/params?node_id=${nodeid}`,

        {
          Schedule: {
            Schedules: [
              {
                operation: 'edit',
                id: id,
                name: name,
                triggers: [
                  {
                    d: daysValue,
                    m: Time,
                  },
                ],
                action: {
                  AC: {
                    Power: Power,
                    Temperature: tem,
                  },
                },
              },
            ],
          },
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
// share with pending an Declined
export const pendingOrDeclined = async token => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.get(
        '/user/nodes/sharing/requests?primary_user=true',
        {
          headers: {
            Authorization: token,
          },
        },
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
// share by device
export const shareDeviceBy = async (token, nodeid) => {
  console.log(token, 'tokentokentokentoken');

  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.get(`user/nodes/sharing`, {
        params: {
          node_id: nodeid,
        },

        headers: {
          Authorization: token,
        },
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
// delete panding data
export const DeletePandingData = async (token, request_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.delete(`user/nodes/sharing/requests`, {
        params: {
          request_id: request_id,
        },

        headers: {
          Authorization: token,
        },
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
// delete panding data
export const DeleteAceptingData = async (token, email, nodeid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.delete(`user/nodes/sharing`, {
        params: {
          user_name: email,
          nodes: nodeid,
        },

        headers: {
          Authorization: token,
        },
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
// accept secondary data
export const secondaryAceptedData = async (token, nodeid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.get(`user/nodes/sharing`, {
        params: {
          node_id: nodeid,
        },

        headers: {
          Authorization: token,
        },
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
// First api Provisioning Step
export const FirstProvisioning = async (
  token,
  nodeid,
  secretKey,
  locaticatin,
) => {
  console.log(locaticatin, 'locaticatin a gye hai');
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.put(
        `user/nodes/mapping`,
        {
          node_id: nodeid,
          operation: 'add',
          secret_key: secretKey,

          tags: [
            'esp.city:Pirangut',
            'esp.state:Maharashtra',
            'esp.serial_num:220200789SA00002',
          ],
        },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      );

      resolve(response);
    } catch (err) {
      console.log(err.response.data);
      reject(err);
    }
  });
};
// secound api provisioning step
export const SecondProvisioning = async (token, request_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await apiAxios.get(`user/nodes/mapping`, {
        params: {
          request_id: request_id,
          user_request: true,
        },
        headers: {
          Authorization: token,
        },
      });
      resolve(response);
    } catch (err) {
      console.log(err.response.data);
      reject(err);
    }
  });
};
// third api provisioning step
export const ThirdProvisioning = async (token, nodeId) => {
  console.log(token, nodeId, 'token, nodeid');
  return new Promise(async (resolve, reject) => {
    try {
      let response = await apiAxios.get(`user/nodes`, {
        params: {
          node_id: nodeId,
          node_details: true,
          status: true,
          config: true,
          params: true,
        },
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      resolve(response);
    } catch (err) {
      console.log(err.response.data);
      reject(err);
    }
  });
};
// Fourth api provisioning
export const FourthProvisioning = async (token, nodeid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await apiAxios.get(`user/nodes/status`, {
        params: {
          node_id: nodeid,
        },
        headers: {
          Authorization: token,
        },
      });
      resolve(response);
    } catch (err) {
      console.log(err.response.data);
      reject(err);
    }
  });
};

// user/nodes/params
export const FifthProvisioning = async (token, nodeid, tz) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await apiAxios.put(
        `user/nodes/params`,
        {
          Time: {
            TZ: tz,
          },
        },
        {
          params: {
            node_id: nodeid,
          },
          headers: {
            Authorization: token,
          },
        },
      );
      resolve(response);
    } catch (err) {
      console.log(err.response.data);
      reject(err);
    }
  });
};

// use Delete to send Otp
export const SendOtpToDeleteUser = async token => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await apiAxios.delete(`user2`, {
        params: {
          request: true,
        },
        headers: {
          Authorization: token,
        },
      });
      resolve(response);
    } catch (err) {
      console.log(err.response.data);
      reject(err);
    }
  });
};

// otp Verify to delete use
export const OtpVerifyToDeleteUser = async (token, verificationcode) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await apiAxios.delete(`user2`, {
        params: {
          verification_code: verificationcode,
        },
        headers: {
          Authorization: token,
        },
      });
      resolve(response);
    } catch (err) {
      console.log(err.response.data);
      reject(err);
    }
  });
};
// login with google
export const LoginGoogle = async verificationcode => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await apiAxios.post(
        loginWithToke,
        {
          grant_type: 'authorization_code',
          client_id: client_id,
          code: verificationcode,
          redirect_uri: redirect_uri,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      resolve(response);
    } catch (err) {
      console.log(err.response.data);
      reject(err);
    }
  });
};

export const setUser_name = async token => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiAxios.get(`user2`, {
        headers: {
          Authorization: token,
        },
      });

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
// Online Service Request
export const newServiceRequest = async (
  documentId,
  selectedTitle,
  name,
  surname,
  mobileNumber,
  address,
  state,
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
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `${Service_Request_BaseURL}/serviceOrderV3/serviceRequestBookingV3`,
        {
          documentID: documentId,
          title: selectedTitle,
          customerFirstName: name,
          customerLastName: surname,
          mobileNo: mobileNumber,
          customerAddress1: address,
          customerAddress4: state,
          customerAddress3: selectedCity,
          customerPinCode: pincode,
          customerAddress2: cityArea,
          alternateNo: alternateNumber,
          customerEmail: email,
          productCategory: selectedProduct,
          productSubCategory: productSubCategory,
          productSerialNo: productSerialNumber,
          serviceRequiredFor: serviceAssistanceRequiredFor,
          serviceRequestType: selectedCallType,
          deviceMobileNo: mobileNumber,

          serviceRequestBookedBy: ServiceRequestBookedBy,
          serviceRequestBookedFor: ServiceRequestBookedFor,
          serviceRequestChannel: ServiceRequestChannel,
          locationID: LocationID,
          division: Division,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: ServiceRequestAuthorization,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
// Track service Request
export const trackServiceRequest = async (
  documentId,
  mobileNumber,
  selectedProduct,
  seviceOrderNumber,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `${Service_Request_BaseURL}/serviceOrderV2/serviceRequestStatusV2`,
        {
          documentID: documentId,
          mobileNo: mobileNumber,
          division: Division,
          productCategory: selectedProduct,
          godrejServiceRequestNo: seviceOrderNumber,
          serviceRequestStatusBy: ServiceRequestStatusBy,
          serviceRequestChannel: ServiceRequestChannel,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: ServiceRequestAuthorization,
          },
        },
      );

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
