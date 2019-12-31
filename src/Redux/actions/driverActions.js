import TraccarAPI from "../../lib/TraccarAPI";
import {
  GET_USER_DRIVERS_SUCCESS,
  RESET_USER_DRIVERS_LIST,
  SET_DRIVER
} from "./actionTypes";

import { requestSuccess, requestFailed } from "./genericActions";

const cred = state =>
  Object.assign({}, { email: state.email, password: state.password });

const getUserDriversSuccess = drivers => {
  return { type: GET_USER_DRIVERS_SUCCESS, payload: { drivers: drivers } };
};

export const resetUserDriversList = () => {
  return { type: RESET_USER_DRIVERS_LIST };
};

export const addDriver = payload => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState().User));
    client
      .post("/drivers", payload)
      .then(() => dispatch(requestSuccess()))
      .catch(error => dispatch(requestFailed(error)));
  };
};

export const updateDriver = (id, payload) => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState().User));
    client
      .put(`/drivers/${id}`, payload)
      .then(() => dispatch(requestSuccess()))
      .catch(error => dispatch(requestFailed(error)));
  }
};

export const deleteDriver = id => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState().User));
    client
      .delete(`/drivers/${id}`)
      .then(() => dispatch(requestSuccess()))
      .catch(error => dispatch(requestFailed(error)));
  }
};

export const setDriver = payload => ({ type: SET_DRIVER, payload });

export const userDrivers = () => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState().User));
    client
      .get(`/drivers?userId=${getState().User.id}`)
      .then(res => dispatch(getUserDriversSuccess(res.data)))
      .catch(error => dispatch(requestFailed(error)));
  };
};
