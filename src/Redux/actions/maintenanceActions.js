import TraccarAPI from "../../lib/TraccarAPI";
import {
  GET_USER_MAINTENANCES_SUCCESS,
  RESET_USER_MAINTENANCES_LIST
} from "../actions/actionTypes";

import { requestSuccess, requestFailed } from "./genericActions";

const cred = state =>
  Object.assign({}, { email: state.User.email, password: state.User.password });

const getUserMaintenancesSuccess = payload => {
  return {
    type: GET_USER_MAINTENANCES_SUCCESS,
    payload: { maintenances: payload }
  };
};

export const resetUserMaintenancesList = () => {
  return { type: RESET_USER_MAINTENANCES_LIST };
};

export const addMaintenance = payload => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState()));
    client
      .post("/maintenance", payload)
      .then(() => dispatch(requestSuccess()))
      .catch(error => requestFailed(error));
  };
};

export const userMaintenances = () => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState()));
    client
      .get(`/maintenance?userId=${getState().User.id}`)
      .then(res => dispatch(getUserMaintenancesSuccess(res.data)))
      .catch(error => requestFailed(error));
  };
};
