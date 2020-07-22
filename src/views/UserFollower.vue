<template>
  <div class="container">
    <Navbar />
    <UserFollowerCards 
      :initial-followers="followers"
    />
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import UserFollowerCards from "./../components/UserFollowerCards";

const dummyData = [
   {
     "id": 1,
     "followerId": 2,
     "followingId": 11,
     "created_at": "2009-10-31T01:48:52Z",
     "updated_at": "2009-10-31T01:48:52Z",
     "isFollowed": true,
     "follower": {
       "id": 2,
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
   },
   {
    "id": 2,
     "followerId": 3,
     "followingId": 11,
     "created_at": "2009-10-31T01:48:52Z",
     "updated_at": "2009-10-31T01:48:52Z",
     "isFollowed": false,
     "follower": {
       "id": 2,
       "account": "使用者帳號2",
       "name": "使用者姓名2",
       "email": "使用者的電子信箱",
       "password": "使用者的登入密碼",
       "introduction": "使用者的自介使用者的自介使用者的自介使用者的自介使用者的自介使用者的自介使用者的自介使用者的自介使用者的自介使用者的自介使用者的自介使用者的自介",
       "avator": "",
       "backgroundImage": "http://example.com/backgroundImage/1",
       "isAdmin": false,
       "tweetCount": 30,
       "likeCount": 40,
       "followerCount": 10,
       "followingCount": 25,
       "created_at": "2009-10-31T01:48:52Z",
       "updated_at": "2009-10-31T01:48:52Z"
     }
   },
 ]





export default {
  components: {
    Navbar,
    UserFollowerCards
  },
  data () {
    return {
      followers: [],
    }
  },
  created (){
    this.fetchFollower()
  },
  methods: {
    fetchFollower () {
      const data = dummyData
      this.followers = data
    },
  }
}
</script>