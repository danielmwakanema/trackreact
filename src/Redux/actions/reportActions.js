import TraccarAPI from "../../lib/TraccarAPI";

import {
  FETCH_SUMMARY_REPORT_SUCCESS,
  FETCH_TRIP_REPORT_SUCCESS,
  FETCH_STOP_REPORT_SUCCESS,
  FETCH_EVENT_REPORT_SUCCESS,
  RESET_REPORTS
} from "./actionTypes";

import { requestFailed } from "./genericActions";

const cred = state =>
  Object.assign({}, { email: state.User.email, password: state.User.password });

const fetchTripReportSuccess = payload => {
  return { type: FETCH_TRIP_REPORT_SUCCESS, payload }
}

const fetchSummaryReportSuccess = payload => {
  return { type: FETCH_SUMMARY_REPORT_SUCCESS, payload };
};

const fetchStopReportSuccess = payload => {
  return { type: FETCH_STOP_REPORT_SUCCESS, payload };
};

const fetchEventReportSuccess = (report, devices) => {
  return { type: FETCH_EVENT_REPORT_SUCCESS, payload: { report, devices } };
};

const resetReportsCreator = () => {
  return { type: RESET_REPORTS };
};

const ACTION_REDUCER_MAP = {
  'trips': fetchTripReportSuccess,
  'summary': fetchSummaryReportSuccess,
  'stops': fetchStopReportSuccess,
  'events': fetchEventReportSuccess
}

export const fetchReport = (ids, type, startDate, endDate, isGroup = false) => {
  const key = isGroup ? 'groupId' : 'deviceId';
  const requestString = ids.reduce(
    (acc, val, index) => index === 0 ? `${key}=${val}` : `${acc}&${key}=${val}`,
    ""
  );
  return (dispatch, getState) => {
    const client = TraccarAPI(cred(getState()));
    client
      .get(`/reports/${type}?${requestString}&from=${startDate}&to=${endDate}`)
      .then(res => {
        const devices = getState().Device.devices;
        dispatch(ACTION_REDUCER_MAP[type](res.data, devices));
      })
      .catch(error => dispatch(requestFailed(error)));
  };
};

export const resetReports = () => {
  return dispatch => dispatch(resetReportsCreator());
};
