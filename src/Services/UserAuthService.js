export default class {
  constructor (instance) {
    this.instance = instance
  }

  async login (email, password) {
    try {
      const res = await this.instance.post('/session',
                                           new URLSearchParams(`email=${email}&password=${password}`))

      return res.data
    } catch (e) {
      console.error(e)
      return false
    }
  }

  async logout () {
    try {
      const res = await this.instance.delete('/session',
                                             null,
                                             { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})

      return res.status === 200
    } catch (e) {
      console.error(e)
      return false
    }
  }
}