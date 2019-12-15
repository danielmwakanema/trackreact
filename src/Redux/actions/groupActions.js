import TraccarAPI from "../../lib/TraccarAPI";
import { GET_USER_GROUPS_SUCCESS, RESET_USER_GROUPS_LIST } from "./actionTypes";

import { requestSuccess, requestFailed } from "./genericActions";

const cred = state =>
  Object.assign({}, { email: state.User.email, password: state.User.password });

const getUserGroupsSuccess = payload => {
  return { type: GET_USER_GROUPS_SUCCESS, payload };
};

export const resetUserGroupsList = () => {
  return { type: RESET_USER_GROUPS_LIST };
};

export const addGroup = payload => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState()));
    client
      .post("/groups", payload)
      .then(() => dispatch(requestSuccess()))
      .catch(error => requestFailed(error));
  };
};

export const userGroups = () => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState()));
    client
      .get(`/groups?userId=${getState().User.id}`)
      .then(res => dispatch(getUserGroupsSuccess(res.data)))
      .catch(error => dispatch(requestFailed(error)));
  };
};
