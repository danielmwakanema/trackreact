import TraccarAPI from "../../lib/TraccarAPI";
import { LOGIN_SUCCESS, RESET_CREDENTIALS, GET_USERS_SUCCESS, SET_USER } from "./actionTypes";

import { requestFailed, requestSuccess } from "./genericActions";

const cred = state =>
  Object.assign({}, { email: state.email, password: state.password });

const loginSuccess = payload => {
  return { type: LOGIN_SUCCESS, payload };
};

export const resetCredentials = () => {
  return { type: RESET_CREDENTIALS };
};

const getUsersSuccess = payload => {
  return { type: GET_USERS_SUCCESS, payload };
};

export const login = payload => {
  return dispatch => {
    const client = TraccarAPI();
    const params = new URLSearchParams(
      `email=${payload.email}&password=${payload.password}`
    );
    client
      .post("/session", params)
      .then(res =>
        dispatch(
          loginSuccess({
            email: payload.email,
            password: payload.password,
            id: res.data.id
          })
        )
      )
      .catch(error => dispatch(requestFailed(error)));
  };
};

export const addUser = payload => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState().User));
    client
      .post("/users", payload)
      .then(() => dispatch(requestSuccess()))
      .catch(error => dispatch(requestFailed(error)));
  };
};

export const getUsers = () => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState().User));
    client
      .get("/users")
      .then(res => dispatch(getUsersSuccess(res.data)))
      .catch(error => dispatch(requestFailed(error)));
  };
};

export const setUser = payload => ({ type: SET_USER, payload })

export const updateUser = (id, data) => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState().User));
    client
      .put(`/users/${id}`, data)
      .then(() => dispatch(requestSuccess()))
      .catch(error => dispatch(requestFailed(error)));
  };
};

export const deleteUser = id => {
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState().User));
    client
      .delete(`/users/${id}`)
      .then(() => dispatch(requestSuccess()))
      .catch(error => dispatch(requestFailed(error)));
  };
};