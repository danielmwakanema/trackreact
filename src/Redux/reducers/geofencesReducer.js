import {
  ADD_GEOFENCE_SUCCESS,
  ADD_GEOFENCE_FAILED,
  GET_USER_GEOFENCES_SUCCESS,
  GET_USER_GEOFENCES_FAILED,
  RESET_USER_GEOFENCES_LIST
} from "../actions/actionTypes";

const init = {
  geofence: null,
  geofences: []
};

export default (state = init, action) => {
  switch (action.type) {
    case ADD_GEOFENCE_SUCCESS:
      return Object.assign({}, state);
    case ADD_GEOFENCE_FAILED:
      return Object.assign({}, state);
    case GET_USER_GEOFENCES_SUCCESS:
      return Object.assign({}, state, action.payload);
    case GET_USER_GEOFENCES_FAILED:
      return Object.assign({}, state);
    case RESET_USER_GEOFENCES_LIST:
      return Object.assign({}, state, { geofences: [] });
    default:
      return state;
  }
};
