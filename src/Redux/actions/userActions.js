import TraccarAPI from "../../lib/TraccarAPI";
import { LOGIN_FAILED, LOGIN_SUCCESS } from "./actionTypes";

const loginFailed = () => {
  return {
    type: LOGIN_FAILED,
    errorMessage: "There was a problem logging you in."
  };
};

const loginSuccess = payload => {
  return {
    type: LOGIN_SUCCESS,
    payload: payload
  };
};

export const login = payload => {
  return dispatch => {
    const client = TraccarAPI();
    const params = new URLSearchParams(
      `email=${payload.email}&password=${payload.password}`
    );
    client
      .post("/session", params)
      .then(res => {
        dispatch(loginSuccess({ email: payload.email, password: payload.password, id: res.data.id }));
      })
      .catch(error => {
        console.error(error);
        dispatch(loginFailed());
      });
  };
};
