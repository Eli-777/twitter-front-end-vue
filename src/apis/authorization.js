import { apiHelper } from './../utils/helpers'

export default {
  signIn({ email, password }) {
    return apiHelper.post('/api/login', {
      email,
      password
    })
  },
  signUp({ account, name, email, password }){
    return apiHelper.post('/api/users', {
      account,
      name,
      email,
      password,
    })
  }
}