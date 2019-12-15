import {
  GET_USER_DRIVERS_SUCCESS,
  RESET_USER_DRIVERS_LIST
} from "../actions/actionTypes";

const init = {
  driver: null,
  drivers: []
};

export default (state = init, action) => {
  switch (action.type) {
    case GET_USER_DRIVERS_SUCCESS:
      return Object.assign({}, state, action.payload);
    case RESET_USER_DRIVERS_LIST:
      return Object.assign({}, state, { drivers: [] });
    default:
      return state;
  }
};
