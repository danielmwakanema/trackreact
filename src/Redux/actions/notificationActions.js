import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "./actionTypes";

export const showNotification = payload => {
  return { type: SHOW_NOTIFICATION, notification: payload };
};

export const hideNofitication = () => {
  return { type: HIDE_NOTIFICATION };
};
