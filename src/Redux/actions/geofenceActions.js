import TraccarAPI from "../../lib/TraccarAPI";
import {
  ADD_GEOFENCE_SUCCESS,
  ADD_GEOFENCE_FAILED,
  GET_USER_GEOFENCES_SUCCESS,
  GET_USER_GEOFENCES_FAILED,
  RESET_USER_GEOFENCES_LIST
} from "./actionTypes";

const addGeofenceFailed = () => {
  return {
    type: ADD_GEOFENCE_FAILED,
    errorMessage: "There was an error adding the geofence."
  };
};

const addGeofenceSuccess = () => {
  return { type: ADD_GEOFENCE_SUCCESS };
};

const getUserGeofencesSuccess = payload => {
  return { type: GET_USER_GEOFENCES_SUCCESS, payload: { geofences: payload } };
};

const getUserGeofencesFailed = () => {
  return { type: GET_USER_GEOFENCES_FAILED };
};

export const addGeofence = payload => {
  return (dispatch, getState) => {
    const client = TraccarAPI({
      email: getState().User.email,
      password: getState().User.password
    });
    client
      .post("/geofences", payload)
      .then(res => {
        dispatch(addGeofenceSuccess());
      })
      .catch(error => {
        console.error(error);
        dispatch(addGeofenceFailed());
      });
  };
};

export const userGeofences = () => {
  return (dispatch, getState) => {
    const client = TraccarAPI({
      email: getState().User.email,
      password: getState().User.password
    });
    client
      .get(`/geofences?userId=${getState().User.id}`)
      .then(res => {
        dispatch(getUserGeofencesSuccess(res.data));
      })
      .catch(error => {
        console.error(error);
        dispatch(getUserGeofencesFailed());
      });
  };
};

export const resetUserGeofencesList = () => {
  return { type: RESET_USER_GEOFENCES_LIST };
};
