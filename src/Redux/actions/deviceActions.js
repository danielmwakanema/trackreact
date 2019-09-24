import TraccarAPI from "../../lib/TraccarAPI";
import {
  ADD_DEVICE_SUCCESS,
  ADD_DEVICE_FAILED,
  GET_USER_DEVICES_SUCCESS,
  GET_USER_DEVICES_FAILED,
  RESET_USER_DEVICES_LIST
} from "./actionTypes";

const addDeviceFailed = () => {
  return {
    type: ADD_DEVICE_FAILED,
    errorMessage: "There was an error adding the device."
  };
};

const addDeviceSuccess = () => {
  return { type: ADD_DEVICE_SUCCESS };
};

const getUserDevicesSuccess = payload => {
  return { type: GET_USER_DEVICES_SUCCESS, payload: { devices: payload } };
};

const getUserDevicesFailed = () => {
  return { type: GET_USER_DEVICES_FAILED };
};

export const addDevice = payload => {
  return (dispatch, getState) => {
    const client = TraccarAPI({
      email: getState().User.email,
      password: getState().User.password
    });
    client
      .post("/devices", payload)
      .then(res => {
        dispatch(addDeviceSuccess());
      })
      .catch(error => {
        console.error(error);
        dispatch(addDeviceFailed());
      });
  };
};

export const userDevices = () => {
  return (dispatch, getState) => {
    const client = TraccarAPI({
      email: getState().User.email,
      password: getState().User.password
    });
    client
      .get(`/devices?userId=${getState().User.id}`)
      .then(res => {
        dispatch(getUserDevicesSuccess(res.data));
      })
      .catch(error => {
        console.error(error);
        dispatch(getUserDevicesFailed());
      });
  };
};

export const resetUserDevicesList = () => {
  return { type: RESET_USER_DEVICES_LIST };
};
