import { apiHelper } from './../utils/helpers'

export default {
  getUsers () {
    return apiHelper.get('/api/admin/users')
  },
  getTweets () {
    return apiHelper.get('/api/admin/tweets')
  },
  deleteTweet ({tweetId}) {
    return apiHelper.delete(`/api/admin/tweets/${tweetId}`)
  }
}