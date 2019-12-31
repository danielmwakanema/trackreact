import { LOGIN_SUCCESS, RESET_CREDENTIALS, GET_USERS_SUCCESS, SET_USER } from "../actions/actionTypes";

const init = {
  id: null,
  email: "",
  password: "",
  users: [],
  user: null
};

export default (state = init, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, action.payload);
    case GET_USERS_SUCCESS:
      return Object.assign({}, state, { users: action.payload });
    case SET_USER:
      return Object.assign({}, state, { user: action.payload });
    case RESET_CREDENTIALS:
      return Object.assign({}, state, { id: null, email: "", password: "" });
    default:
      return state;
  }
};
