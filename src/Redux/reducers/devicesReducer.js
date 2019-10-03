import {
  ADD_DEVICE_SUCCESS,
  ADD_DEVICE_FAILED,
  UPDATE_DEVICE_SUCCESS,
  UPDATE_DEVICE_FAILED,
  GET_USER_DEVICES_SUCCESS,
  GET_USER_DEVICES_FAILED,
  RESET_USER_DEVICES_LIST,
  VIEW_DEVICE_SUCCESS,
  VIEW_DEVICE_FAILED
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
    case UPDATE_DEVICE_SUCCESS:
      return Object.assign({}, state);
    case UPDATE_DEVICE_FAILED:
      return Object.assign({}, state);
    case GET_USER_DEVICES_SUCCESS:
      return Object.assign({}, state, action.payload);
    case GET_USER_DEVICES_FAILED:
      return Object.assign({}, state);
    case RESET_USER_DEVICES_LIST:
      return Object.assign({}, state, { devices: [] });
    case VIEW_DEVICE_SUCCESS:
      return Object.assign({}, state, action.payload);
    case VIEW_DEVICE_FAILED:
      return Object.assign({}, state);
    default:
      return state;
  }
};
