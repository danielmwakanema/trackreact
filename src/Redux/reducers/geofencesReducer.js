import {
  GET_USER_GEOFENCES_SUCCESS,
  RESET_USER_GEOFENCES_LIST
} from "../actions/actionTypes";

const init = {
  geofence: null,
  geofences: []
};

export default (state = init, action) => {
  switch (action.type) {
    case GET_USER_GEOFENCES_SUCCESS:
      return Object.assign({}, state, action.payload);
    case RESET_USER_GEOFENCES_LIST:
      return Object.assign({}, state, { geofences: [] });
    default:
      return state;
  }
};
