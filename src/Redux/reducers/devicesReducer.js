import uuid from 'uuid/v1';

import {
  GET_USER_DEVICES_SUCCESS,
  RESET_USER_DEVICES_LIST,
  GET_DEVICE_TRIPS_SUCCESS
} from "../actions/actionTypes";

const init = {
  devices: [],
  deviceTrips: []
};

export default (state = init, action) => {
  switch (action.type) {
    case GET_USER_DEVICES_SUCCESS:
      return Object.assign({}, state, action.payload);
    case RESET_USER_DEVICES_LIST:
      return Object.assign({}, state, { devices: [] });
    case GET_DEVICE_TRIPS_SUCCESS:
      return Object.assign({}, state, { deviceTrips: action.payload.map(trip => Object.assign({}, trip, { id: uuid() })) })
    default:
      return state;
  }
};
