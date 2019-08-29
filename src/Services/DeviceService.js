export default class {
  constructor (instance) {
    this.instance = instance
  }

  async all () {
    try {
      const res = await this.instance.get('/devices/', { headers: { Authorization: `Basic ${btoa('admin:admin')}`} })
      return res.data
    } catch(e) {
      console.error(e)
      return false
    }
  }

  async get (id) {
    try {
      const res = await this.instance.get(`/devices/${id}`)
      return res.data
    } catch(e) {
      console.error(e)
      return false
    }
  }
}