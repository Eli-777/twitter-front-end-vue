<template>
  <div class="container">
    <Navbar />
    <div class="center scrollbar center-area" style="width: 33rem;">
      <UserTweetPost @after-create-tweet="afterCreateTweet" />
      <div class="tweet-cards">
        <Spinner v-if="isLoading" />
        <template v-else>
          <TweetCards
            v-for="tweet in tweets"
            :key="tweet.id"
            :initial-user-tweet="tweet"
            @after-click-tweet="afterClickTweet"
          />
        </template>
      </div>
    </div>

    <MostFollowerUserRecommend />

    <TweetCreate @after-create-tweet="afterCreateTweet" />
    <RepliedModal :tweet="replyTweet" />
  </div>
</template>



<script>
import Navbar from "./../components/Navbar";
import UserTweetPost from "./../components/UserTweetPost";
import TweetCards from "./../components/TweetCards";
import MostFollowerUserRecommend from "./../components/MostFollowerUserRecommend";
import TweetCreate from "./../components/TweetCreate";
import RepliedModal from "./../components/RepliedModal";
import Spinner from "./../components/Spinner";
import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/mixins";
import { mapState } from "vuex";

export default {
  components: {
    Navbar,
    UserTweetPost,
    TweetCards,
    TweetCreate,
    RepliedModal,
    MostFollowerUserRecommend,
    Spinner,
  },
  data() {
    return {
      tweets: [],
      replyTweet: {},
      isLoading: true,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      try {
        const { data } = await tweetsAPI.getFeeds();
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.tweets = data;
        // const wait = await window.setTimeout(()=>this.isLoading = false, 1000);
        // console.log(wait)
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.error(error.message);
        Toast.fire({
          icon: "error",
          title: "無法取得推文資訊，請稍後再試",
        });
      }
    },
    afterCreateTweet(payload) {
      const { tweetId, description } = payload;
      console.log("payload", payload);
      this.tweets.unshift({
        id: tweetId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
          account: this.currentUser.account,
          avatar: this.currentUser.avatar,
        },
        description,
        commentCount: 0,
        islikeByUser: false,
        likeCount: 0,
        createdAt: new Date(),
      });
    },
    afterClickTweet(payload) {
      const { tweet } = payload;
      this.replyTweet = tweet;
      console.log("replyTweet", this.replyTweet);
    },
  },
};
</script>


<style scoped>
.tweet-cards {
  position: relative;
  max-height: 100%;
  /* margin-top: 170px; */
  /* overflow: scroll; */
}
</style>