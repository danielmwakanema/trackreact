import {
  FETCH_TRIP_REPORT_SUCCESS,
  FETCH_SUMMARY_REPORT_SUCCESS,
  FETCH_STOP_REPORT_SUCCESS,
  FETCH_REPORT_FAILED,
  RESET_REPORTS
} from "../actions/actionTypes";

import TripReportMarshall from "../../marshalls/TripReportMarshal";
import SummaryReportMarshall from "../../marshalls/SummaryReportMarshal";
import StopReportMarshall from "../../marshalls/StopReportMarshall";

const init = {
  report: [],
  tripReport: null,
  summaryReport: null,
  stopReport: null
};

export default (state = init, action) => {
  switch (action.type) {
    case FETCH_TRIP_REPORT_SUCCESS:
      return Object.assign({}, state, { report: action.payload, tripReport: TripReportMarshall(action.payload).generateMarshall() })
    case FETCH_SUMMARY_REPORT_SUCCESS:
      return Object.assign({}, state, { report: action.payload, summaryReport: SummaryReportMarshall(action.payload).generateMarshall() });
    case FETCH_STOP_REPORT_SUCCESS:
        return Object.assign({}, state, { report: action.payload, stopReport: StopReportMarshall(action.payload).generateMarshall() });
    case FETCH_REPORT_FAILED:
      return Object.assign({}, state);
    case RESET_REPORTS:
      return Object.assign({}, state, { report: [], tripReport: null, summaryReport: null, stopReport: null })
    default:
      return Object.assign({}, state);
  }
};
