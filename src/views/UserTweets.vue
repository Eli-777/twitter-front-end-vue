<template>
  <div class="container"> 
    <Navbar />
    <div class="center scrollbar col-6 center-area" style="width: 18rem;">
      <UserTweetPost 
        :user="user"
        @after-create-tweet="afterCreateTweet"
      />
      <div class="tweet-cards ">
        <TweetCards 
          v-for="tweet in tweets"
          :key="tweet.id"
          :initial-user-tweet="tweet"
        />
      </div>
    </div>

    <MostFollowerUserRecommend />
    
    <TweetCreate />
    <RepliedModal />
  </div>

</template>



<script>
import Navbar from './../components/Navbar'
import UserTweetPost from './../components/UserTweetPost'
import TweetCards from './../components/TweetCards'
import MostFollowerUserRecommend from './../components/MostFollowerUserRecommend'
import TweetCreate from './../components/TweetCreate'
import RepliedModal from './../components/RepliedModal'


const dummyData = {
  'User': {
    "id": 1,
    "account": "使用者帳號",
    "name": "使用者姓名",
    "email": "使用者的電子信箱",
    "introduction": "使用者的自介",
    "avatar": "https://i.imgur.com/Q14p2le.jpg",
    "backgroundImage": "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
    "followingCount": '12',
    "followerCount": '20',
    "tweetCount": '10',
    "isAdmin": false,
    "created_at": "2009-10-31T01:48:52Z",
    "updated_at": "2009-10-31T01:48:52Z"
  }
}

const dummyData2 = [
  {
    'id': 1,
    'UserId': 1,
    'description': "貼文內容",
    'commentCount': 10,
    'likeCount': 20,
    'created_at': "2009-10-31T01:48:52Z",
    'updated_at': "2009-10-31T01:48:52Z",
    'user': {
      'id': 1,
      'account': "使用者帳號",
      'name': "使用者姓名",
      'email': "使用者的電子信箱",
      'password': "使用者的登入密碼",
      'introduction': "使用者的自介",
      'avator': "https://i.imgur.com/Q14p2le.jpg",
      'backgroundImage': "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      'isAdmin': false,
      'tweetCount': 30,
      'followerCount': 10,
      'followingCount': 25,
      'created_at': "2009-10-31T01:48:52Z",
      'updated_at': "2009-10-31T01:48:52Z"
    }
  },
  {
    'id': 2,
    'UserId': 2,
    'description': "貼文內容",
    'commentCount': 20,
    'likeCount': 30,
    'created_at': "2020-10-31T01:48:52Z",
    'updated_at': "2020-10-31T01:48:52Z",
    'user': {
      'id': 1,
      'account': "使用者帳號2",
      'name': "使用者姓名2",
      'email': "使用者的電子信箱2",
      'password': "使用者的登入密碼2",
      'introduction': "使用者的自介2",
      'avator': "https://i.imgur.com/Q14p2le.jpg",
      'backgroundImage': "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      'isAdmin': false,
      'tweetCount': 50,
      'followerCount': 60,
      'followingCount': 27,
      'created_at': "2019-10-31T01:48:52Z",
      'updated_at': "2019-10-31T01:48:52Z"
    }
  },
  {
    'id': 3,
    'UserId': 3,
    'description': "貼文內容",
    'commentCount': 10,
    'likeCount': 20,
    'created_at': "2009-10-31T01:48:52Z",
    'updated_at': "2009-10-31T01:48:52Z",
    'user': {
      'id': 1,
      'account': "使用者帳號",
      'name': "使用者姓名",
      'email': "使用者的電子信箱",
      'password': "使用者的登入密碼",
      'introduction': "使用者的自介",
      'avator': "https://i.imgur.com/Q14p2le.jpg",
      'backgroundImage': "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      'isAdmin': false,
      'tweetCount': 30,
      'followerCount': 10,
      'followingCount': 25,
      'created_at': "2009-10-31T01:48:52Z",
      'updated_at': "2009-10-31T01:48:52Z"
    }
  },
  {
    'id': 4,
    'UserId': 4,
    'description': "貼文內容",
    'commentCount': 20,
    'likeCount': 30,
    'created_at': "2020-10-31T01:48:52Z",
    'updated_at': "2020-10-31T01:48:52Z",
    'user': {
      'id': 1,
      'account': "使用者帳號2",
      'name': "使用者姓名2",
      'email': "使用者的電子信箱2",
      'password': "使用者的登入密碼2",
      'introduction': "使用者的自介2",
      'avator': "https://i.imgur.com/Q14p2le.jpg",
      'backgroundImage': "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      'isAdmin': false,
      'tweetCount': 50,
      'followerCount': 60,
      'followingCount': 27,
      'created_at': "2019-10-31T01:48:52Z",
      'updated_at': "2019-10-31T01:48:52Z"
    }
  },
  {
    'id': 5,
    'UserId': 5,
    'description': "貼文內容",
    'commentCount': 10,
    'likeCount': 20,
    'created_at': "2009-10-31T01:48:52Z",
    'updated_at': "2009-10-31T01:48:52Z",
    'user': {
      'id': 1,
      'account': "使用者帳號",
      'name': "使用者姓名",
      'email': "使用者的電子信箱",
      'password': "使用者的登入密碼",
      'introduction': "使用者的自介",
      'avator': "https://i.imgur.com/Q14p2le.jpg",
      'backgroundImage': "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      'isAdmin': false,
      'tweetCount': 30,
      'followerCount': 10,
      'followingCount': 25,
      'created_at': "2009-10-31T01:48:52Z",
      'updated_at': "2009-10-31T01:48:52Z"
    }
  },
  {
    'id': 6,
    'UserId': 6,
    'description': "貼文內容",
    'commentCount': 20,
    'likeCount': 30,
    'created_at': "2020-10-31T01:48:52Z",
    'updated_at': "2020-10-31T01:48:52Z",
    'user': {
      'id': 1,
      'account': "使用者帳號2",
      'name': "使用者姓名2",
      'email': "使用者的電子信箱2",
      'password': "使用者的登入密碼2",
      'introduction': "使用者的自介2",
      'avator': "https://i.imgur.com/Q14p2le.jpg",
      'backgroundImage': "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      'isAdmin': false,
      'tweetCount': 50,
      'followerCount': 60,
      'followingCount': 27,
      'created_at': "2019-10-31T01:48:52Z",
      'updated_at': "2019-10-31T01:48:52Z"
    }
  },
  {
    'id': 7,
    'UserId': 7,
    'description': "貼文內容",
    'commentCount': 10,
    'likeCount': 20,
    'created_at': "2009-10-31T01:48:52Z",
    'updated_at': "2009-10-31T01:48:52Z",
    'user': {
      'id': 1,
      'account': "使用者帳號",
      'name': "使用者姓名",
      'email': "使用者的電子信箱",
      'password': "使用者的登入密碼",
      'introduction': "使用者的自介",
      'avator': "https://i.imgur.com/Q14p2le.jpg",
      'backgroundImage': "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      'isAdmin': false,
      'tweetCount': 30,
      'followerCount': 10,
      'followingCount': 25,
      'created_at': "2009-10-31T01:48:52Z",
      'updated_at': "2009-10-31T01:48:52Z"
    }
  },
  {
    'id': 8,
    'UserId': 8,
    'description': "貼文內容",
    'commentCount': 20,
    'likeCount': 30,
    'created_at': "2020-10-31T01:48:52Z",
    'updated_at': "2020-10-31T01:48:52Z",
    'user': {
      'id': 1,
      'account': "使用者帳號2",
      'name': "使用者姓名2",
      'email': "使用者的電子信箱2",
      'password': "使用者的登入密碼2",
      'introduction': "使用者的自介2",
      'avator': "https://i.imgur.com/Q14p2le.jpg",
      'backgroundImage': "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      'isAdmin': false,
      'tweetCount': 50,
      'followerCount': 60,
      'followingCount': 27,
      'created_at': "2019-10-31T01:48:52Z",
      'updated_at': "2019-10-31T01:48:52Z"
    }
  },
  {
    'id': 9,
    'UserId': 9,
    'description': "貼文內容",
    'commentCount': 10,
    'likeCount': 20,
    'created_at': "2009-10-31T01:48:52Z",
    'updated_at': "2009-10-31T01:48:52Z",
    'user': {
      'id': 1,
      'account': "使用者帳號",
      'name': "使用者姓名",
      'email': "使用者的電子信箱",
      'password': "使用者的登入密碼",
      'introduction': "使用者的自介",
      'avator': "https://i.imgur.com/Q14p2le.jpg",
      'backgroundImage': "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      'isAdmin': false,
      'tweetCount': 30,
      'followerCount': 10,
      'followingCount': 25,
      'created_at': "2009-10-31T01:48:52Z",
      'updated_at': "2009-10-31T01:48:52Z"
    }
  },
  {
    'id': 10,
    'UserId': 10,
    'description': "貼文內容",
    'commentCount': 20,
    'likeCount': 30,
    'created_at': "2020-10-31T01:48:52Z",
    'updated_at': "2020-10-31T01:48:52Z",
    'user': {
      'id': 1,
      'account': "使用者帳號2",
      'name': "使用者姓名2",
      'email': "使用者的電子信箱2",
      'password': "使用者的登入密碼2",
      'introduction': "使用者的自介2",
      'avator': "https://i.imgur.com/Q14p2le.jpg",
      'backgroundImage': "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      'isAdmin': false,
      'tweetCount': 50,
      'followerCount': 60,
      'followingCount': 27,
      'created_at': "2019-10-31T01:48:52Z",
      'updated_at': "2019-10-31T01:48:52Z"
    }
  },
];

export default {
  components: {
    Navbar,
    UserTweetPost,
    TweetCards,
    TweetCreate,
    RepliedModal,
    MostFollowerUserRecommend
  },
  data() {
    return {
      user: {
        id: -1,
        avatar: ''
      },
      tweets: []
    }
  },
  created () {
    this.fetchUser()
  },
  methods: {
    fetchUser (){
      this.user.id = dummyData.User.id
      this.user.avatar = dummyData.User.avatar
      this.tweets = dummyData2
    },
    afterCreateTweet (payload) {
      const { commentId, restaurantId, text } = payload
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name
        },
        text,
        createdAt: new Date()
      })
    }
  }
}
</script>


<style scoped>
.tweet-cards{
  position: relative;
  max-height: 100%;
  /* margin-top: 170px; */
  /* overflow: scroll; */
}
</style>