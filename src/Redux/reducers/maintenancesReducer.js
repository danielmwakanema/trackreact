import {
  GET_USER_MAINTENANCES_SUCCESS,
  RESET_USER_MAINTENANCES_LIST
} from "../actions/actionTypes";

const init = {
  maintenance: null,
  maintenances: []
};

export default (state = init, action) => {
  switch (action.type) {
    case GET_USER_MAINTENANCES_SUCCESS:
      return Object.assign({}, state, action.payload);
    case RESET_USER_MAINTENANCES_LIST:
      return Object.assign({}, state, { maintenances: [] });
    default:
      return state;
  }
};
