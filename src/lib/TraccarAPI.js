import Axios from 'axios';
import Config from '../config/traccar.json';

/**
 * Function to create Traccar API instance
 * @param {Object|null} credentials
 * @return {Object}
 */
export default (credentials = null) => {
  const requestParams = { baseURL: `${Config.protocol}://${Config.host}:${Config.port}/api` }
  if (credentials) requestParams.headers = { Authorization: `Basic ${btoa(`${credentials.email}:${credentials.password}`)}`} 
  return Axios.create(requestParams)
}