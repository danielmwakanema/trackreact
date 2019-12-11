import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "./actionTypes";

export const showNotification = payload => {
  return { type: SHOW_NOTIFICATION, payload };
};

export const hideNotification = () => {
  return { type: HIDE_NOTIFICATION };
};
