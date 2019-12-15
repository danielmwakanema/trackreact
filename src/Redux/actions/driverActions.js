import TraccarAPI from "../../lib/TraccarAPI";
import {
  GET_USER_DRIVERS_SUCCESS,
  RESET_USER_DRIVERS_LIST
} from "./actionTypes";

import { requestSuccess, requestFailed } from "./genericActions";

const cred = state =>
  Object.assign({}, { email: state.User.email, password: state.User.password });

const getUserDriversSuccess = drivers => {
  return { type: GET_USER_DRIVERS_SUCCESS, payload: { drivers: drivers } };
};

export const resetUserDriversList = () => {
  return { type: RESET_USER_DRIVERS_LIST };
};

export const addDriver = payload => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState()));
    client
      .post("/drivers", payload)
      .then(() => dispatch(requestSuccess()))
      .catch(error => dispatch(requestFailed(error)));
  };
};

export const userDrivers = () => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState()));
    client
      .get(`/drivers?userId=${getState().User.id}`)
      .then(res => dispatch(getUserDriversSuccess(res.data)))
      .catch(error => dispatch(requestFailed(error)));
  };
};
