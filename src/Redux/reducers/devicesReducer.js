import {
  GET_USER_DEVICES_SUCCESS,
  RESET_USER_DEVICES_LIST,
} from "../actions/actionTypes";

const init = {
  devices: []
};

export default (state = init, action) => {
  switch (action.type) {
    case GET_USER_DEVICES_SUCCESS:
      return Object.assign({}, state, action.payload);
    case RESET_USER_DEVICES_LIST:
      return Object.assign({}, state, { devices: [] });
    default:
      return state;
  }
};
