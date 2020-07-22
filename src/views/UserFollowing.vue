<template>
  <div class="container">
    <Navbar />
    <UserFollowingCards 
      :initial-followings="followings"
    />
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import UserFollowingCards from "./../components/UserFollowingCards";



const dummydataFollowing = [
  {
     "id": 1,
     "followingId": 2,
     "followerId": 11,
     "created_at": "2009-10-31T01:48:52Z",
     "updated_at": "2009-10-31T01:48:52Z",
     "isFollowed": true,
     "following": {
       "id": 2,
       "account": "使用者帳號3",
       "name": "使用者姓名3",
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
     "followingId": 3,
     "followerId": 11,
     "created_at": "2009-10-31T01:48:52Z",
     "updated_at": "2009-10-31T01:48:52Z",
     "isFollowed": true,
     "following": {
       "id": 2,
       "account": "使用者帳號4",
       "name": "使用者姓名4",
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
    UserFollowingCards
  },
  data () {
    return {
      followings: []
    }
  },
  created (){
    this.fetchFollowing()
  },
  methods: {
    fetchFollowing () {
      const data = dummydataFollowing
      this.followings = data
    }
  }
}
</script>