import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "../actions/actionTypes";

const init = {
  show: false,
  title: "",
  message: "",
  type: ""
};

export default (state = init, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return Object.assign({}, state, action.payload);
    case HIDE_NOTIFICATION:
      return Object.assign({}, state, { show: false });
    default:
      return Object.assign({}, state);
  }
};
