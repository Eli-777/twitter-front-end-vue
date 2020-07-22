<template>
  <div class="center-area col-6" style="width: 18rem;">
    <div class="header">
      <button type="button" class="header-button" @click="$router.back()">&larr;</button>
      <div class="header-text m-3">
        <p class="header-name">{{user.name}}</p>
        <p class="header-userTweets">{{user.tweetCount}}推文</p>
      </div>
    </div>
    <img 
      :src=" user.backgroundImage | emptyImage" 
      class="card-img-top backgroundImage"  
      height="150px" 
    />
    <div class="card-body">
      <img 
        :src=" user.avatar | emptyImage" 
        class="card-img-avatar"  
        height="140px" 
        width="140px" 
      />
      <button  
        class="btn btn-outline-primary edit-profile-button" 
        data-toggle="modal" 
        data-target="#user-edit-modal"
      >
        編輯個人資料
      </button>
      <div class="card-body-text">
        <h5 class="card-body-name">{{user.name}}</h5>
        <p class="card-body-account">{{user.account}}</p>
        <p
          class="card-body-introduction"
        >{{user.introduction}}</p>
      </div>
      <div class="card-body-follow">
        <router-link :to="{ name: 'user-following', params :{ id: user.id}}">
          {{user.followingCount}} 個
          <span>跟隨中</span>
        </router-link>
        <router-link :to="{ name: 'user-follower', params :{ id: user.id}}">
          {{user.followerCount}} 位
          <span>跟隨者</span>
        </router-link>
      </div>
    </div>

    <ul class="nav nav-pills" id="nav-tab" role="tablist">
      <li class="nav-item" @click="showtweets('userTweet')">
        <router-link class=" nav-link active" to="#" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true" >推文</router-link>
      </li>
      <li class="nav-item" @click="showtweets('replied')">
        <router-link class="nav-link" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false" to="#" >推文和回覆</router-link>
      </li>
      <li class="nav-item" @click="showtweets('liked')">
        <router-link class="nav-link" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false" to="#" >喜歡的內容</router-link>
      </li>
    </ul>
    <!-- 推文 -->
    <div class="tweet-cards">
      <TweetCards 
        v-for="tweet in tweets"
        :key="tweet.id"
        :initial-user-tweet="tweet"
      />
    </div>
  </div>

</template>

<script>
import TweetCards from "./../components/TweetCards"
import { emptyImageFilter } from "./../utils/mixins";

const dummyData = [
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
];

export default {
  mixins: [emptyImageFilter],
  components: {
    TweetCards
  },
  props: {
    user:{
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tweets: [],
      userTweets: [],
      replied: [],
      liked: [],
      nowPage: 'userTweet'
    }
  },
  created () {
    this.fetchUserTweets()
    this.showtweets(this.nowPage)
  },
  methods: {
    fetchUserTweets () {
      const response = dummyData
      this.userTweets = response
    },
    showtweets(page) {
      this.nowPage = page;
      
      if (page === 'userTweet') {
        this.tweets = this.userTweets
      } else if (page === 'replied') {
        this.tweets = this.replied
      } else if (page === 'liked') {
        this.tweets = this.liked
      }
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
}

.header-button {
  border: none;
  outline: none;
  background-color: white;
}

.header .header-name {
  font-size: 1.1875rem;
  line-height: 1.1878rem;
  font-weight: 900;
}
.header .header-userTweets {
  font-size: 0.8125rem;
  line-height: 0.8125rem;
  font-weight: 500;
  color: var(--form-text-color);
}
.card-body {
  position: relative;
  padding: 0 20px;
}
.card-img-avatar {
  border-radius: 100%;
  border: 4px solid #ffffff;
  position: absolute;
  transform: translateY(-50%);
  z-index: 999;
}
.card-body-text {
  padding-top: 75px;
}
.edit-profile-button {
  position: absolute;
  right: 10px;
  top: 10px;
  color: var(--orange);
  border-color: var(--orange);
  border-radius: 100px;
}
.edit-profile-button:hover, .edit-profile-button:active {
  background: var(--orange) !important;
  color: var(--form-background-color);
}

.card-body-follow {
  display: flex;
  margin: 1rem 0;
}
.card-body-follow span {
  color: var(--form-text-color);
  margin-right: 1.2rem;
}


.nav-item .active {
  background: var(--form-background-color);
  color: var(--orange);
  
}
.tweet-cards{
  max-height: 50%;
}
</style>