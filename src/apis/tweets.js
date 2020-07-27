import { apiHelper } from './../utils/helpers'

export default {
  getFeeds () {
    return apiHelper.get('/api/tweets')
  },
  create ({description}) {
    return apiHelper.post('/api/tweets', { description })
  },
  getTweet ({tweetId}) {
    return apiHelper.get(`/api/tweets/${tweetId}`)
  },
  getTweetReplies ({tweetId}) {
    return apiHelper.get(`/api/tweets/${tweetId}/replies`)
  }
}