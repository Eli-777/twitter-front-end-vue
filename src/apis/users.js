import { apiHelper } from './../utils/helpers'

export default {
  get ({ userId }) {
    return apiHelper.get(`/api/users/${userId}`)
  },
  getUserTweets ({userId}) {
    return apiHelper.get(`/api/users/${userId}/tweets`)
  },
  getFollowing ({userId}) {
    return apiHelper.get(`/api/users/${userId}/followings`)
  },
  getFollower ({userId}) {
    return apiHelper.get(`/api/users/${userId}/followers`)
  },
  addFollowing ({ id }) {
    return apiHelper.post('/api/followships', {id})
  },
  deleteFollowing({ userId }) {
    return apiHelper.delete(`/api/followships/${userId}`)
  },
}