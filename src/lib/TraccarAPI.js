import Axios from 'axios'

export default Axios.create({
  baseURL: `${process.env.REACT_APP_TRACCAR_PROTOCOL}://${process.env.REACT_APP_TRACCAR_HOST}:${process.env.REACT_APP_TRACCAR_PORT}`
})