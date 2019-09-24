import TraccarAPI from "../../lib/TraccarAPI";
import {
  ADD_MAINTENANCE_SUCCESS,
  ADD_MAINTENANCE_FAILED,
  GET_USER_MAINTENANCES_SUCCESS,
  GET_USER_MAINTENANCES_FAILED,
  RESET_USER_MAINTENANCES_LIST
} from "../actions/actionTypes";

const addMaintenanceFailed = () => {
  return {
    type: ADD_MAINTENANCE_FAILED,
    errorMessage: "There was an error adding the device."
  };
};

const addMaintenanceSuccess = () => {
  return { type: ADD_MAINTENANCE_SUCCESS };
};

const getUserMaintenancesSuccess = payload => {
  return { type: GET_USER_MAINTENANCES_SUCCESS, payload: { maintenances: payload } };
};

const getUserMaintenancesFailed = () => {
  return { type: GET_USER_MAINTENANCES_FAILED };
};

export const addMaintenance = payload => {
  return (dispatch, getState) => {
    const client = TraccarAPI({
      email: getState().User.email,
      password: getState().User.password
    });
    client
      .post("/maintenance", payload)
      .then(res => {
        dispatch(addMaintenanceSuccess());
      })
      .catch(error => {
        console.error(error);
        dispatch(addMaintenanceFailed());
      });
  };
};

export const userMaintenances = () => {
  return (dispatch, getState) => {
    const client = TraccarAPI({
      email: getState().User.email,
      password: getState().User.password
    });
    client
      .get(`/maintenance?userId=${getState().User.id}`)
      .then(res => {
        dispatch(getUserMaintenancesSuccess(res.data));
      })
      .catch(error => {
        console.error(error);
        dispatch(getUserMaintenancesFailed());
      });
  };
};

export const resetUserMaintenancesList = () => {
  return { type: RESET_USER_MAINTENANCES_LIST };
};