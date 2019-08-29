const init = {
  email: '',
  password: ''
}

export default (state = init, action) => {
  switch (action.type) {
    case 'SET_USER_CREDENTIALS':
      const res = state
      return Object.assign(res, action.payload)
    default:
      return state
  }
}