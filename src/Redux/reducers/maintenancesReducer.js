import {
  ADD_MAINTENANCE_SUCCESS,
  ADD_MAINTENANCE_FAILED,
  GET_USER_MAINTENANCES_SUCCESS,
  GET_USER_MAINTENANCES_FAILED,
  RESET_USER_MAINTENANCES_LIST
} from "../actions/actionTypes";

const init = {
  maintenance: null,
  maintenances: []
};

export default (state = init, action) => {
  switch (action.type) {
    case ADD_MAINTENANCE_SUCCESS:
      return Object.assign({}, state);
    case ADD_MAINTENANCE_FAILED:
      return Object.assign({}, state);
    case GET_USER_MAINTENANCES_SUCCESS:
      return Object.assign({}, state, action.payload);
    case GET_USER_MAINTENANCES_FAILED:
      return Object.assign({}, state);
    case RESET_USER_MAINTENANCES_LIST:
      return Object.assign({}, state, { maintenances: [] });
    default:
      return state;
  }
};
