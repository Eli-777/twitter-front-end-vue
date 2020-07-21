<template>
  <div class="container">
    <Navbar />
    <TweetCardDetail 
      :initial-tweet="tweet"
    />
    
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import TweetCardDetail from './../components/TweetCardDetail'

const dummyData = {
  tweet: {
    "id": 99,
    "UserId": 1,
    "isLiked": true,
    "commentCount": 20,
    "likeCount": 15,
    "description": "貼文內容",
    "created_at": "2009-10-31T01:48:52Z",
    "updated_at": "2009-10-31T01:48:52Z",
    "user": {
      "id": 1,
      "account": "使用者帳號",
      "name": "使用者姓名",
      "email": "使用者的電子信箱",
      "password": "使用者的登入密碼",
      "introduction": "使用者的自介",
      "avator": "https://i.imgur.com/Q14p2le.jpg",
      "backgroundImage": "http://example.com/backgroundImage/1",
      "isAdmin": false,
      "tweetCount": 30,
      "likeCount": 40,
      "followerCount": 10,
      "followingCount": 25,
      "created_at": "2009-10-31T01:48:52Z",
      "updated_at": "2009-10-31T01:48:52Z"
    }
  }
}


export default {
  components: {
    Navbar,
    TweetCardDetail
  },
  data () {
    return {
      tweet: {}
    }
  },
  created () {
    this.fetchTweet()
  },
  methods: {
    fetchTweet () {
      const response = dummyData.tweet
      this.tweet = response
    }
  }
  
}
</script>