import {
  FETCH_DEVICE_REPORT_SUCCESS,
  FETCH_DEVICE_REPORT_FAILED,
  FETCH_GROUP_REPORT_SUCCESS,
  FETCH_GROUP_REPORT_FAILED,
} from "../actions/actionTypes";

import DeviceReportMarshall from "../../marshalls/DeviceReportMarshal";
import GroupReportMarshall from "../../marshalls/GroupReportMarshal";

const init = {
  groupReport: [],
  deviceReport: [],
  parsedReport: null,
  parsedGroupReport: null
};

export default (state = init, action) => {
  switch (action.type) {
    case FETCH_DEVICE_REPORT_SUCCESS:
      return Object.assign({}, state, { deviceReport: action.payload, parsedReport: DeviceReportMarshall(action.payload).generateMarshall() })
    case FETCH_DEVICE_REPORT_FAILED:
      return Object.assign({}, state);
    case FETCH_GROUP_REPORT_SUCCESS:
      return Object.assign({}, state, { groupReport: action.payload, parsedGroupReport: GroupReportMarshall(action.payload).generateMarshall() });
    case FETCH_GROUP_REPORT_FAILED:
      return Object.assign({}, state);
    default:
      return Object.assign({}, state);
  }
};
