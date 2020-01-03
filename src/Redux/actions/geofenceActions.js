import TraccarAPI from "../../lib/TraccarAPI";
import {
  GET_USER_GEOFENCES_SUCCESS,
  RESET_USER_GEOFENCES_LIST,
  SET_GEOFENCE
} from "./actionTypes";

import { requestSuccess, requestFailed } from "./genericActions";

const cred = state =>
  Object.assign({}, { email: state.User.email, password: state.User.password });

export const resetUserGeofencesList = () => {
  return { type: RESET_USER_GEOFENCES_LIST };
};

export const setGeofence = payload => ({ type: SET_GEOFENCE, payload });

const getUserGeofencesSuccess = payload => {
  return { type: GET_USER_GEOFENCES_SUCCESS, payload: { geofences: payload } };
};

export const addGeofence = payload => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState()));
    client
      .post("/geofences", payload)
      .then(() => dispatch(requestSuccess()))
      .catch(error => dispatch(requestFailed(error)));
  };
};

export const userGeofences = () => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState()));
    client
      .get(`/geofences?userId=${getState().User.id}`)
      .then(res => dispatch(getUserGeofencesSuccess(res.data)))
      .catch(error => dispatch(requestFailed(error)));
  };
};
