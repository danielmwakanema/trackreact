import TraccarAPI from "../../lib/TraccarAPI";
import {
  ADD_DEVICE_SUCCESS,
  ADD_DEVICE_FAILED,
  GET_USER_DEVICES_SUCCESS,
  GET_USER_DEVICES_FAILED,
  RESET_USER_DEVICES_LIST,
  VIEW_DEVICE_SUCCESS,
  VIEW_DEVICE_FAILED,
  UPDATE_DEVICE_SUCCESS,
  UPDATE_DEVICE_FAILED
} from "./actionTypes";

import { showNotification } from "./notificationActions";


const addDeviceSuccess = () => {
  return { type: ADD_DEVICE_SUCCESS };
};

const addDeviceFailed = () => {
  return { type: ADD_DEVICE_FAILED };
};

const updateDeviceSuccess = () => {
  return { type: UPDATE_DEVICE_SUCCESS };
};

const updateDeviceFailed = () => {
  return { type: UPDATE_DEVICE_FAILED };
};


const viewDeviceSuccess = payload => {
  return { type: VIEW_DEVICE_SUCCESS, payload: { device: payload } };
};

const viewDeviceFailed = () => {
  return { type: VIEW_DEVICE_FAILED };
}

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
        dispatch(showNotification({ title: "Information", message: "Device added." }));
        dispatch(addDeviceSuccess());
      })
      .catch(error => {
        console.error(error);
        dispatch(addDeviceFailed());
      });
  };
};

export const updateDevice = payload => {
  return (dispatch, getState) => {
    const client = TraccarAPI({
      email: getState().User.email,
      password: getState().User.password
    });
    client
      .put(`/devices/${payload.id}`, payload)
      .then(res => {
        dispatch(updateDeviceSuccess());
      })
      .catch(error => {
        console.error(error);
        dispatch(updateDeviceFailed());
      });
  };
};

export const viewDevice = deviceId => {
  return (dispatch, getState) => {
    const client = TraccarAPI({
      email: getState().User.email,
      password: getState().User.password
    });
    client
      .get(`/devices/${deviceId}`)
      .then(res => {
        dispatch(viewDeviceSuccess());
      })
      .catch(error => {
        console.error(error);
        dispatch(viewDeviceFailed());
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
