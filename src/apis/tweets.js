import { apiHelper } from './../utils/helpers'

export default {
  getFeeds () {
    return apiHelper.get('/api/tweets')
  },
  create ({description}) {
    return apiHelper.post('/api/tweets', { description })
  }
}