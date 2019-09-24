import TraccarAPI from "../../lib/TraccarAPI";
import { ADD_DRIVER_SUCCESS, ADD_DRIVER_FAILED, GET_USER_DRIVERS_SUCCESS, GET_USER_DRIVERS_FAILED, RESET_USER_DRIVERS_LIST } from "./actionTypes";

const addDriverFailed = () => {
  return {
    type: ADD_DRIVER_FAILED,
    errorMessage: "There was an error adding the driver."
  };
};

const addDriverSuccess = () => {
  return { type: ADD_DRIVER_SUCCESS };
};

const getUserDriversSuccess = drivers => {
  return { type: GET_USER_DRIVERS_SUCCESS, payload: { drivers: drivers } }
}

const getUserDriversFailed = () => {
  return { type: GET_USER_DRIVERS_FAILED }
}

export const addDriver = payload => {
  return (dispatch, getState) => {
    const client = TraccarAPI({
      email: getState().User.email,
      password: getState().User.password
    });
    client
      .post("/drivers", payload)
      .then(res => {
        dispatch(addDriverSuccess());
      })
      .catch(error => {
        console.error(error);
        dispatch(addDriverFailed());
      });
  };
};

export const userDrivers = () => {
  return (dispatch, getState) => {
    const client = TraccarAPI({
      email: getState().User.email,
      password: getState().User.password
    });
    client
      .get(`/drivers?userId=${getState().User.id}`)
      .then(res => {
        dispatch(getUserDriversSuccess(res.data));
      })
      .catch(error => {
        console.error(error);
        dispatch(getUserDriversFailed());
      });
  };
}

export const resetUserDriversList = () => {
  return { type: RESET_USER_DRIVERS_LIST }
}
