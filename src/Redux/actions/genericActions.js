import { showNotification } from "./notificationActions";

export const requestFailed = payload => {
  return dispatch => {
    dispatch(showNotification({ title: 'Error', message: payload.message }))
  }
}

export const requestSuccess = () => {
  return dispatch => {
    dispatch(showNotification({ title: 'Information', message: 'Request successfull!' }))
  }
}