import { ADD_USER, REMOVE_USER } from './actionTypes';

const addUser = (payload) => { return { type: ADD_USER, payload: payload } }
const removeUser = (payload) => { return { type: REMOVE_USER, payload: payload } }

export default {
  addUser,
  removeUser
}