import {
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAILED,
  GET_USER_GROUPS_SUCCESS,
  GET_USER_GROUPS_FAILED,
  RESET_USER_GROUPS_LIST
} from "../actions/actionTypes";

const init = {
  group: null,
  groups: []
};

export default (state = init, action) => {
  switch (action.type) {
    case ADD_GROUP_SUCCESS:
      return Object.assign({}, state);
    case ADD_GROUP_FAILED:
      return Object.assign({}, state);
    case GET_USER_GROUPS_SUCCESS:
      return Object.assign({}, state, { groups: action.payload });
    case GET_USER_GROUPS_FAILED:
      return Object.assign({}, state);
    case RESET_USER_GROUPS_LIST:
      return Object.assign({}, state, { groups: [] });
    default:
      return state;
  }
};
