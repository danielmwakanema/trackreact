import TraccarAPI from "../../lib/TraccarAPI";

import {
  FETCH_SUMMARY_REPORT_SUCCESS,
  FETCH_TRIP_REPORT_SUCCESS,
  FETCH_STOP_REPORT_SUCCESS,
  FETCH_REPORT_FAILED,
  RESET_REPORTS
} from "./actionTypes";

const fetchTripReportSuccess = payload => {
  return { type: FETCH_TRIP_REPORT_SUCCESS, payload }
}

const fetchSummaryReportSuccess = payload => {
  return { type: FETCH_SUMMARY_REPORT_SUCCESS, payload };
};

const fetchStopReportSuccess = payload => {
  return { type: FETCH_STOP_REPORT_SUCCESS, payload };
};

const fetchReportFailed = () => {
  return { type: FETCH_REPORT_FAILED };
};

const resetReportsCreator = () => {
  return { type: RESET_REPORTS };
};

const ACTION_REDUCER_MAP = {
  'trips': fetchTripReportSuccess,
  'summary': fetchSummaryReportSuccess,
  'stops': fetchStopReportSuccess
}

export const fetchReport = (ids = [], type = "", startDate, endDate, isGroup = false) => {
  const key = isGroup ? 'groupId' : 'deviceId';
  const requestString = ids.reduce(
    (acc, val, index) => index === 0 ? `${key}=${val}` : `${acc}&${key}=${val}`,
    ""
  );
  return (dispatch, getState) => {
    const client = TraccarAPI({
      email: getState().User.email,
      password: getState().User.password
    });
    client
      .get(`/reports/${type}?${requestString}&from=${startDate}&to=${endDate}`)
      .then(res => {
        dispatch(ACTION_REDUCER_MAP[type](res.data));
      })
      .catch(() => {dispatch(fetchReportFailed())});
  };
};

export const resetReports = () => {
  return dispatch => dispatch(resetReportsCreator())
}
