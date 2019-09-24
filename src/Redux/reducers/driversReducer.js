import {
  ADD_DRIVER_SUCCESS,
  ADD_DRIVER_FAILED,
  GET_USER_DRIVERS_SUCCESS,
  GET_USER_DRIVERS_FAILED,
  RESET_USER_DRIVERS_LIST
} from "../actions/actionTypes";

const init = {
  driver: null,
  drivers: []
};

export default (state = init, action) => {
  switch (action.type) {
    case ADD_DRIVER_SUCCESS:
      return Object.assign({}, state);
    case ADD_DRIVER_FAILED:
      return Object.assign({}, state);
    case GET_USER_DRIVERS_SUCCESS:
      return Object.assign({}, state, action.payload);
    case GET_USER_DRIVERS_FAILED:
      return Object.assign({}, state);
    case RESET_USER_DRIVERS_LIST:
      return Object.assign({}, state, { drivers: [] });
    default:
      return state;
  }
};
