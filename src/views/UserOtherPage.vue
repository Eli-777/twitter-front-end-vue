<template>
  <div class="container">
    <Navbar />
    <div class="center-area" style="width: 33rem;">
      <UserCard :initial-user="User" />
      <ul class="nav nav-pills" id="nav-tab" role="tablist">
        <li class="nav-item" @click="showtweets('userTweet')">
          <router-link
            class="nav-link active"
            to="#"
            data-toggle="tab"
            href="#nav-home"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >推文</router-link>
        </li>
        <li class="nav-item" @click="showtweets('replied')">
          <router-link
            class="nav-link"
            data-toggle="tab"
            href="#nav-profile"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
            to="#"
          >推文和回覆</router-link>
        </li>
        <li class="nav-item" @click="showtweets('liked')">
          <router-link
            class="nav-link"
            data-toggle="tab"
            href="#nav-contact"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
            to="#"
          >喜歡的內容</router-link>
        </li>
      </ul>
      <!-- 推文 -->
      <div class="tweet-cards" v-if="nowPage==='userTweet'">
        <TweetCards v-for="tweet in userTweets" :key="tweet.id" :initial-user-tweet="tweet" />
      </div>
    </div>

    <MostFollowerUserRecommend />
    <!-- modal 編輯使用者資料 -->
    <UserPageEdit :initial-user="User" @after-submit="handleAfterSubmit" />

    <TweetCreate />
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import UserCard from "./../components/UserCard";
import TweetCards from "./../components/TweetCards";
import TweetCreate from "./../components/TweetCreate";
import UserPageEdit from "./../components/UserPageEdit";
import MostFollowerUserRecommend from "./../components/MostFollowerUserRecommend";
import { Toast } from "./../utils/helpers";
import usersAPI from "./../apis/users";

export default {
  components: {
    Navbar,
    UserCard,
    TweetCards,
    TweetCreate,
    UserPageEdit,
    MostFollowerUserRecommend,
  },
  data() {
    return {
      User: {},
      isProcessing: false,
      nowPage: "userTweet",
      tweets: [],
      userTweets: [],
      replied: [],
      liked: [],
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
    this.fetchUserTweets(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params;
    this.fetchUser(userId);
    this.fetchUserTweets(userId);
    next();
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await usersAPI.get({ userId });
        console.log('user',data)
        this.User = data;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
    async fetchUserTweets(userId) {
      try {
        const { data } = await usersAPI.getUserTweets({ userId });
        this.userTweets = data;
      } catch (error) {
        console.log(error.message);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者推文，請稍後再試",
        });
      }
    },
    showtweets(page) {
      this.nowPage = page;
      if (page === "userTweet") {
        this.tweets = this.userTweets;
      } else if (page === "replied") {
        this.tweets = this.replied;
      } else if (page === "liked") {
        this.tweets = this.liked;
      }
    },
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true;
        console.log("formdata", formData);
        for (let [name, value] of formData.entries()) {
          console.log(name + ": " + value);
        }
        // const { data } = await adminAPI.restaurants.update({
        //   restaurantId: this.restaurant.id, formData
        // })

        // if (data.status !== 'success') {
        //   throw new Error(data.message)
        // }
        Toast.fire({
          icon: "success",
          title: "更新成功",
        });
        // this.$router.push({ name: 'user-tweets' })
      } catch (error) {
        this.isProcessing = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法更新個人資料，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.nav-item .active {
  background: transparent;
  color: var(--orange);
  border-bottom: 2px solid var(--orange);
  border-radius: 0;
}
</style>