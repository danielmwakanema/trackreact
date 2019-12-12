import {
  FETCH_TRIP_REPORT_SUCCESS,
  FETCH_SUMMARY_REPORT_SUCCESS,
  FETCH_STOP_REPORT_SUCCESS,
  FETCH_EVENT_REPORT_SUCCESS,
  FETCH_REPORT_FAILED,
  RESET_REPORTS
} from "../actions/actionTypes";

import TripReportMarshall from "../../marshalls/TripReportMarshal";
import SummaryReportMarshall from "../../marshalls/SummaryReportMarshal";
import StopReportMarshall from "../../marshalls/StopReportMarshall";
import EventReportMarshall from "../../marshalls/EventReportMarshall";

const init = {
  report: [],
  tripReport: null,
  summaryReport: null,
  stopReport: null,
  eventReport: null
};

export default (state = init, action) => {
  switch (action.type) {
    case FETCH_TRIP_REPORT_SUCCESS:
      return Object.assign({}, state, {
        report: action.payload,
        tripReport: TripReportMarshall(action.payload).generateMarshall()
      });
    case FETCH_SUMMARY_REPORT_SUCCESS:
      return Object.assign({}, state, {
        report: action.payload,
        summaryReport: SummaryReportMarshall(action.payload).generateMarshall()
      });
    case FETCH_STOP_REPORT_SUCCESS:
      return Object.assign({}, state, {
        report: action.payload,
        stopReport: StopReportMarshall(action.payload).generateMarshall()
      });
    case FETCH_EVENT_REPORT_SUCCESS:
      return Object.assign({}, state, {
        report: action.payload.report,
        eventReport: EventReportMarshall(
          action.payload.report,
          action.payload.devices
        ).generateMarshall()
      });
    case FETCH_REPORT_FAILED:
      return Object.assign({}, state);
    case RESET_REPORTS:
      return Object.assign({}, state, {
        report: [],
        tripReport: null,
        summaryReport: null,
        stopReport: null,
        eventReport: null
      });
    default:
      return Object.assign({}, state);
  }
};
