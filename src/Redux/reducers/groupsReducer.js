import {
  GET_USER_GROUPS_SUCCESS,
  RESET_USER_GROUPS_LIST
} from "../actions/actionTypes";

const init = {
  group: null,
  groups: []
};

export default (state = init, action) => {
  switch (action.type) {
    case GET_USER_GROUPS_SUCCESS:
      return Object.assign({}, state, { groups: action.payload });
    case RESET_USER_GROUPS_LIST:
      return Object.assign({}, state, { groups: [] });
    default:
      return state;
  }
};
