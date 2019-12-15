import { LOGIN_SUCCESS, RESET_CREDENTIALS } from "../actions/actionTypes";

const init = {
  id: null,
  email: "",
  password: ""
};

export default (state = init, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, action.payload);
    case RESET_CREDENTIALS:
      return Object.assign({}, state, { id: null, email: "", password: "" })
    default:
      return state;
  }
};
