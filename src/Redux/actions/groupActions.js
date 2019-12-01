import TraccarAPI from "../../lib/TraccarAPI";
import {
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAILED,
  GET_USER_GROUPS_SUCCESS,
  GET_USER_GROUPS_FAILED,
  RESET_USER_GROUPS_LIST
} from "./actionTypes";

const addGroupFailed = () => {
  return {
    type: ADD_GROUP_FAILED,
    errorMessage: "There was an error adding the device."
  };
};

const addGroupSuccess = () => {
  return { type: ADD_GROUP_SUCCESS };
};

const getUserGroupsSuccess = payload => {
  return { type: GET_USER_GROUPS_SUCCESS, payload };
};

const getUserGroupsFailed = () => {
  return { type: GET_USER_GROUPS_FAILED };
};

export const addGroup = payload => {
  return (dispatch, getState) => {
    const client = TraccarAPI({
      email: getState().User.email,
      password: getState().User.password
    });
    client
      .post("/groups", payload)
      .then(res => {
        dispatch(addGroupSuccess());
      })
      .catch(error => {
        console.error(error);
        dispatch(addGroupFailed());
      });
  };
};

export const userGroups = () => {
  return (dispatch, getState) => {
    const client = TraccarAPI({
      email: getState().User.email,
      password: getState().User.password
    });
    client
      .get(`/groups?userId=${getState().User.id}`)
      .then(res => {
        dispatch(getUserGroupsSuccess(res.data));
      })
      .catch(error => {
        console.error(error);
        dispatch(getUserGroupsFailed());
      });
  };
};

export const resetUserGroupsList = () => {
  return { type: RESET_USER_GROUPS_LIST };
};
