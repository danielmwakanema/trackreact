import { LOGIN_SUCCESS } from '../actions/actionTypes';

const init = {
  id: null,
  email: "",
  password: ""
};

export default (state = init, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
