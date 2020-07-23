<template>
  <div class="container">
    <AdminNavbar />
    <div class="center  center-area" >
      <div class="tweets">
        <div class="header-text">
          <p class="header-name pl-3">推文清單</p>
        </div>
      </div>
      <AdminTweetCards 
        v-for="tweet in tweets" 
        :key="tweet.id" 
        :initial-user-tweet="tweet" 
        @after-delete-tweet="afterDeleteTweet"
      />
    </div>
  </div>
</template>

<script>
import AdminNavbar from "./../components/AdminNavbar";
import AdminTweetCards from "./../components/AdminTweetCards";

const dummyData2 = [
  {
    id: 1,
    UserId: 1,
    description: "貼文內容",
    commentCount: 10,
    likeCount: 20,
    created_at: "2009-10-31T01:48:52Z",
    updated_at: "2009-10-31T01:48:52Z",
    user: {
      id: 1,
      account: "使用者帳號",
      name: "使用者姓名",
      email: "使用者的電子信箱",
      password: "使用者的登入密碼",
      introduction: "使用者的自介",
      avator: "https://i.imgur.com/Q14p2le.jpg",
      backgroundImage:
        "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      isAdmin: false,
      tweetCount: 30,
      followerCount: 10,
      followingCount: 25,
      created_at: "2009-10-31T01:48:52Z",
      updated_at: "2009-10-31T01:48:52Z"
    }
  },
  {
    id: 2,
    UserId: 2,
    description: "貼文內容",
    commentCount: 20,
    likeCount: 30,
    created_at: "2020-10-31T01:48:52Z",
    updated_at: "2020-10-31T01:48:52Z",
    user: {
      id: 1,
      account: "使用者帳號2",
      name: "使用者姓名2",
      email: "使用者的電子信箱2",
      password: "使用者的登入密碼2",
      introduction: "使用者的自介2",
      avator: "https://i.imgur.com/Q14p2le.jpg",
      backgroundImage:
        "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      isAdmin: false,
      tweetCount: 50,
      followerCount: 60,
      followingCount: 27,
      created_at: "2019-10-31T01:48:52Z",
      updated_at: "2019-10-31T01:48:52Z"
    }
  },
  {
    id: 3,
    UserId: 3,
    description: "貼文內容",
    commentCount: 10,
    likeCount: 20,
    created_at: "2009-10-31T01:48:52Z",
    updated_at: "2009-10-31T01:48:52Z",
    user: {
      id: 1,
      account: "使用者帳號",
      name: "使用者姓名",
      email: "使用者的電子信箱",
      password: "使用者的登入密碼",
      introduction: "使用者的自介",
      avator: "https://i.imgur.com/Q14p2le.jpg",
      backgroundImage:
        "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      isAdmin: false,
      tweetCount: 30,
      followerCount: 10,
      followingCount: 25,
      created_at: "2009-10-31T01:48:52Z",
      updated_at: "2009-10-31T01:48:52Z"
    }
  },
  {
    id: 4,
    UserId: 4,
    description: "貼文內容",
    commentCount: 20,
    likeCount: 30,
    created_at: "2020-10-31T01:48:52Z",
    updated_at: "2020-10-31T01:48:52Z",
    user: {
      id: 1,
      account: "使用者帳號2",
      name: "使用者姓名2",
      email: "使用者的電子信箱2",
      password: "使用者的登入密碼2",
      introduction: "使用者的自介2",
      avator: "https://i.imgur.com/Q14p2le.jpg",
      backgroundImage:
        "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      isAdmin: false,
      tweetCount: 50,
      followerCount: 60,
      followingCount: 27,
      created_at: "2019-10-31T01:48:52Z",
      updated_at: "2019-10-31T01:48:52Z"
    }
  },
  {
    id: 5,
    UserId: 5,
    description: "貼文內容",
    commentCount: 10,
    likeCount: 20,
    created_at: "2009-10-31T01:48:52Z",
    updated_at: "2009-10-31T01:48:52Z",
    user: {
      id: 1,
      account: "使用者帳號",
      name: "使用者姓名",
      email: "使用者的電子信箱",
      password: "使用者的登入密碼",
      introduction: "使用者的自介",
      avator: "https://i.imgur.com/Q14p2le.jpg",
      backgroundImage:
        "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      isAdmin: false,
      tweetCount: 30,
      followerCount: 10,
      followingCount: 25,
      created_at: "2009-10-31T01:48:52Z",
      updated_at: "2009-10-31T01:48:52Z"
    }
  },
  {
    id: 6,
    UserId: 6,
    description: "貼文內容",
    commentCount: 20,
    likeCount: 30,
    created_at: "2020-10-31T01:48:52Z",
    updated_at: "2020-10-31T01:48:52Z",
    user: {
      id: 1,
      account: "使用者帳號2",
      name: "使用者姓名2",
      email: "使用者的電子信箱2",
      password: "使用者的登入密碼2",
      introduction: "使用者的自介2",
      avator: "https://i.imgur.com/Q14p2le.jpg",
      backgroundImage:
        "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      isAdmin: false,
      tweetCount: 50,
      followerCount: 60,
      followingCount: 27,
      created_at: "2019-10-31T01:48:52Z",
      updated_at: "2019-10-31T01:48:52Z"
    }
  },
  {
    id: 7,
    UserId: 7,
    description: "貼文內容",
    commentCount: 10,
    likeCount: 20,
    created_at: "2009-10-31T01:48:52Z",
    updated_at: "2009-10-31T01:48:52Z",
    user: {
      id: 1,
      account: "使用者帳號",
      name: "使用者姓名",
      email: "使用者的電子信箱",
      password: "使用者的登入密碼",
      introduction: "使用者的自介",
      avator: "https://i.imgur.com/Q14p2le.jpg",
      backgroundImage:
        "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      isAdmin: false,
      tweetCount: 30,
      followerCount: 10,
      followingCount: 25,
      created_at: "2009-10-31T01:48:52Z",
      updated_at: "2009-10-31T01:48:52Z"
    }
  },
  {
    id: 8,
    UserId: 8,
    description: "貼文內容",
    commentCount: 20,
    likeCount: 30,
    created_at: "2020-10-31T01:48:52Z",
    updated_at: "2020-10-31T01:48:52Z",
    user: {
      id: 1,
      account: "使用者帳號2",
      name: "使用者姓名2",
      email: "使用者的電子信箱2",
      password: "使用者的登入密碼2",
      introduction: "使用者的自介2",
      avator: "https://i.imgur.com/Q14p2le.jpg",
      backgroundImage:
        "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      isAdmin: false,
      tweetCount: 50,
      followerCount: 60,
      followingCount: 27,
      created_at: "2019-10-31T01:48:52Z",
      updated_at: "2019-10-31T01:48:52Z"
    }
  },
  {
    id: 9,
    UserId: 9,
    description: "貼文內容",
    commentCount: 10,
    likeCount: 20,
    created_at: "2009-10-31T01:48:52Z",
    updated_at: "2009-10-31T01:48:52Z",
    user: {
      id: 1,
      account: "使用者帳號",
      name: "使用者姓名",
      email: "使用者的電子信箱",
      password: "使用者的登入密碼",
      introduction: "使用者的自介",
      avator: "https://i.imgur.com/Q14p2le.jpg",
      backgroundImage:
        "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      isAdmin: false,
      tweetCount: 30,
      followerCount: 10,
      followingCount: 25,
      created_at: "2009-10-31T01:48:52Z",
      updated_at: "2009-10-31T01:48:52Z"
    }
  },
  {
    id: 10,
    UserId: 10,
    description: "貼文內容",
    commentCount: 20,
    likeCount: 30,
    created_at: "2020-10-31T01:48:52Z",
    updated_at: "2020-10-31T01:48:52Z",
    user: {
      id: 1,
      account: "使用者帳號2",
      name: "使用者姓名2",
      email: "使用者的電子信箱2",
      password: "使用者的登入密碼2",
      introduction: "使用者的自介2",
      avator: "https://i.imgur.com/Q14p2le.jpg",
      backgroundImage:
        "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
      isAdmin: false,
      tweetCount: 50,
      followerCount: 60,
      followingCount: 27,
      created_at: "2019-10-31T01:48:52Z",
      updated_at: "2019-10-31T01:48:52Z"
    }
  }
];

export default {
  components: {
    AdminNavbar,
    AdminTweetCards
  },
  data() {
    return {
      tweets: []
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    fetchTweets() {
      this.tweets = dummyData2;
      this.tweets = this.tweets.sort((a, b) => {
        a = new Date(a.created_at)
        b = new Date(b.created_at)
        return b - a
      })
    },
    afterDeleteTweet (tweetId) {
      this.tweets = this.tweets.filter(
        tweet => tweet.id !== tweetId
      )
    }
  }
};
</script>

<style scoped>
.header-text {
  border-bottom: 1px solid var(--border-light-grey);
  width: 100%;
  height: 100%;
  line-height: 3.4375rem;
}
.header-name {
  font-weight: 500;
  font-size: 1.125rem;
  padding-left: 0.3rem;
}
</style>