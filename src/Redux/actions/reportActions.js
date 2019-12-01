import TraccarAPI from "../../lib/TraccarAPI";

import {
  FETCH_DEVICE_REPORT_SUCCESS,
  FETCH_DEVICE_REPORT_FAILED,
  FETCH_GROUP_REPORT_SUCCESS,
  FETCH_GROUP_REPORT_FAILED
} from "./actionTypes";

const fetchDeviceReportSuccess = payload => {
  return { type: FETCH_DEVICE_REPORT_SUCCESS, payload };
};

const fetchDeviceReportFailed = () => {
  return { type: FETCH_DEVICE_REPORT_FAILED };
};

const fetchGroupReportSuccess = payload => {
  return { type: FETCH_GROUP_REPORT_SUCCESS, payload };
};

const fetchGroupReportFailed = () => {
  return { type: FETCH_GROUP_REPORT_FAILED };
};

export const deviceReports = (deviceIds = [], type = "", startDate, endDate) => {
  const requestString = deviceIds.reduce(
    (acc, val, index) => index === 0 ? `deviceId=${val}` : `${acc}&deviceId=${val}`,
    ""
  );
  return (dispatch, getState) => {
    const client = TraccarAPI({
      email: getState().User.email,
      password: getState().User.password
    });
    client
      .get(`/reports/${type}?${requestString}&from=${startDate}&to=${endDate}`)
      .then(res => dispatch(fetchDeviceReportSuccess(res.data)))
      .catch(error => {dispatch(fetchDeviceReportFailed())});
  };
};

export const groupReports = (groupIds = [], type = "", startDate, endDate) => {
  const requestString = groupIds.reduce(
    (acc, val, index) => (index === 0 ? `groupId=${val}` : `${acc}&groupId=${val}`),
    ""
  );
  return (dispatch, getState) => {
    const client = TraccarAPI({
      email: getState().User.email,
      password: getState().User.password
    });
    client
      .get(`/reports/${type}?${requestString}&from=${startDate}&to=${endDate}`)
      .then(res => dispatch(fetchGroupReportSuccess(res.data)))
      .catch(error => dispatch(fetchGroupReportFailed()));
  };
};
