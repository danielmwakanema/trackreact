import Axios from 'axios';
import Config from '../config/traccar.json';

export default Axios.create({
  baseURL: `${Config.protocol}://${Config.host}:${Config.port}/api`
})