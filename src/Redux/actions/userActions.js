import { ADD_USER, REMOVE_USER, SET_USER_CREDENTIALS } from './actionTypes';

const addUser = (payload) => { return { type: ADD_USER, payload: payload } }
const removeUser = (payload) => { return { type: REMOVE_USER, payload: payload } }
const setUserCredentials = (payload) => { return { type: SET_USER_CREDENTIALS, payload: payload } } 

export default {
  addUser,
  removeUser,
  setUserCredentials
}