import { apiHelper } from './../utils/helpers'

export default {
  get ({ userId }) {
    return apiHelper.get(`/api/users/${userId}`)
  },
  update({ userId, account, name, email, password }){
    return apiHelper.put(`/api/users/${userId}/settings`, {account, name, email, password})
  },
  getUserTweets ({userId}) {
    return apiHelper.get(`/api/users/${userId}/tweets`)
  },
  getRepliedTweets ({userId}) {
    return apiHelper.get(`/api/users/${userId}/replied_tweets`)
  },
  getLikedTweets({ userId }) {
    return apiHelper.get(`/api/users/${userId}/likes`)
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