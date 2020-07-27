import { apiHelper } from './../utils/helpers'

export default {
  create ({tweetId, comment}) {
    console.log(1234, comment)
    return apiHelper.post(`/api/tweets/${tweetId}/replies`, { comment })
  },
}