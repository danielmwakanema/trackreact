import TraccarAPI from "../../lib/TraccarAPI";
import {
  RESET_USER_DEVICES_LIST,
  GET_USER_DEVICES_SUCCESS,
  GET_DEVICE_TRIPS_SUCCESS
} from "./actionTypes";

import { requestFailed, requestSuccess } from "./genericActions";

const cred = state =>
  Object.assign({}, { email: state.User.email, password: state.User.password });

const getUserDevicesSuccess = payload => {
  return { type: GET_USER_DEVICES_SUCCESS, payload: { devices: payload } };
};

const getDeviceTripsSuccess = payload => {
  return { type: GET_DEVICE_TRIPS_SUCCESS, payload }
}

export const resetUserDevicesList = () => {
  return { type: RESET_USER_DEVICES_LIST };
};

export const addDevice = payload => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState()));
    client
      .post("/devices", payload)
      .then(() => dispatch(requestSuccess()))
      .catch(error => dispatch(requestFailed(error)));
  };
};

export const updateDevice = payload => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState()));
    client
      .put(`/devices/${payload.id}`, payload)
      .then(() => dispatch(requestSuccess()))
      .catch(error => dispatch(requestFailed(error)));
  };
};

export const viewDevice = deviceId => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState()));
    client
      .get(`/devices/${deviceId}`)
      .then(() => {})
      .catch(error => dispatch(requestFailed(error)));
  };
};

export const userDevices = () => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState()));
    client
      .get(`/devices?userId=${getState().User.id}`)
      .then(res => dispatch(getUserDevicesSuccess(res.data)))
      .catch(error => dispatch(requestFailed(error)));
  };
};

export const deviceTrips = (id, start, end) => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState()));
    client
      .get(`/reports/trips?deviceId=${id}&from=${start}&to=${end}`)
      .then(res => dispatch(getDeviceTripsSuccess(res.data)))
      .catch(error => dispatch(requestFailed(error)));
  };
};
