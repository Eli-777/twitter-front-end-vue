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
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'



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
    async fetchTweets() {
      try {
        const { data } = await adminAPI.getTweets()
        console.log('admintweet',data)
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.tweets = data;
        this.tweets = this.tweets.sort((a, b) => {
          a = new Date(a.created_at)
          b = new Date(b.created_at)
          return b - a
        })
      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法取得推文資訊，請稍後再試'
        })
      }
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