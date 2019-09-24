import {
  ADD_DEVICE_SUCCESS,
  ADD_DEVICE_FAILED,
  GET_USER_DEVICES_SUCCESS,
  GET_USER_DEVICES_FAILED,
  RESET_USER_DEVICES_LIST
} from "../actions/actionTypes";

const init = {
  device: null,
  devices: []
};

export default (state = init, action) => {
  switch (action.type) {
    case ADD_DEVICE_SUCCESS:
      return Object.assign({}, state);
    case ADD_DEVICE_FAILED:
      return Object.assign({}, state);
    case GET_USER_DEVICES_SUCCESS:
      return Object.assign({}, state, action.payload);
    case GET_USER_DEVICES_FAILED:
      return Object.assign({}, state);
    case RESET_USER_DEVICES_LIST:
      return Object.assign({}, state, { devices: [] });
    default:
      return state;
  }
};
