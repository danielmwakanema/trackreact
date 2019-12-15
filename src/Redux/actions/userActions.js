import TraccarAPI from "../../lib/TraccarAPI";
import { LOGIN_SUCCESS, RESET_CREDENTIALS } from "./actionTypes";

import { requestFailed } from "./genericActions";

const loginSuccess = payload => {
  return { type: LOGIN_SUCCESS, payload };
};

export const resetCredentials = () => {
  return { type: RESET_CREDENTIALS }
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
