import { apiHelper } from './../utils/helpers'

export default {
  get ({ userId }) {
    return apiHelper.get(`/api/users/${userId}`)
  },
  getUserTweets ({userId}) {
    return apiHelper.get(`/api/users/${userId}/tweets`)
  }
}