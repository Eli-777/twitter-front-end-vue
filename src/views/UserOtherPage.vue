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
            >推文</router-link
          >
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
            >推文和回覆</router-link
          >
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
            >喜歡的內容</router-link
          >
        </li>
      </ul>
      <Spinner v-if="isLoading" />
      <template v-else>
        <!-- 推文 -->
        <div class="tweet-cards" v-if="nowPage === 'userTweet'">
          <TweetCards
            v-for="tweet in userTweets"
            :key="tweet.id"
            :initial-user-tweet="tweet"
            @after-add-like="afterAddLike"
            @after-delete-like="afterDeleteLike"
          />
        </div>
        <div v-if="(nowPage === 'userTweet' && userTweets.length === 0 && !isFirstLoad)"  class="nodata-sign">使用者尚無推文</div>
        <div class="tweet-cards" v-if="nowPage === 'replied'">
          <RepliedLikedTweetCards
            v-for="tweet in replieds"
            :key="tweet.id"
            :initial-user-tweet="tweet"
            @after-add-like="afterAddLike"
            @after-delete-like="afterDeleteLike"
          />
        </div>
        <div v-if="(nowPage === 'replied' && replieds.length === 0)"  class="nodata-sign">使用者尚無回覆</div>
        <div class="tweet-cards" v-if="(nowPage === 'liked' && likeds.length > 0)">
          <RepliedLikedTweetCards
            v-for="tweet in likeds"
            :key="tweet.id"
            :initial-user-tweet="tweet"
            @after-add-like="afterAddLike"
            @after-delete-like="afterDeleteLike"
          />
        </div>
        <div v-if="(nowPage === 'liked' && likeds.length === 0)" class="nodata-sign">使用者尚無按讚</div>
      </template>
    </div>

    <MostFollowerUserRecommend @after-add-follow-user="afteraddFollowUser" @after-delete-follow-user="afterdeleteFollowUser"/>
    <!-- modal 編輯使用者資料 -->
    <UserPageEdit
      :initial-user="User"
      :initial-is-processing="isProcessing"
      @after-submit="handleAfterSubmit"
    />

    <TweetCreate @after-create-tweet="afterCreateTweet" />
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import UserCard from "./../components/UserCard";
import TweetCards from "./../components/TweetCards";
import TweetCreate from "./../components/TweetCreate";
import UserPageEdit from "./../components/UserPageEdit";
import Spinner from "./../components/Spinner";
import MostFollowerUserRecommend from "./../components/MostFollowerUserRecommend";
import RepliedLikedTweetCards from "./../components/RepliedLikedTweetCards";
import usersAPI from "./../apis/users";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";
import $ from "jquery";

export default {
  components: {
    Navbar,
    UserCard,
    TweetCards,
    TweetCreate,
    UserPageEdit,
    MostFollowerUserRecommend,
    Spinner,
    RepliedLikedTweetCards
  },
  data() {
    return {
      User: {},
      isProcessing: false,
      nowPage: "userTweet",
      tweets: [],
      userTweets: [],
      replieds: [],
      likeds: [],
      isLoading: true,
      isFirstLoad: true,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
    this.fetchUserTweets(id);
    this.fetchUserRepliedTweets(id);
    this.fetchUserLikedTweets(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params;
    this.fetchUser(userId);
    this.fetchUserTweets(userId);
    this.fetchUserRepliedTweets(userId);
    this.fetchUserLikedTweets(userId);
    next();
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await usersAPI.get({ userId });
        console.log("user", data);
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
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.userTweets = data;
        this.userTweets = this.userTweets.sort((a, b) => {
          a = new Date(a.createdAt);
          b = new Date(b.createdAt);
          return b - a;
        });
        this.isLoading = false;
        this.isFirstLoad = false
      } catch (error) {
        this.isLoading = false;
        console.log(error.message);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者推文，請稍後再試",
        });
      }
    },
    async fetchUserRepliedTweets(userId) {
      try {
        const { data } = await usersAPI.getRepliedTweets({ userId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        if (data.message === "使用者尚未回覆任何推文") {
          return
        }
        console.log("replied", data);
        this.replieds = data;
        this.replieds = this.replieds.sort((a, b) => {
          a = new Date(a.createdAt);
          b = new Date(b.createdAt);
          return b - a;
        });
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error.message);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者回覆過的推文，請稍後再試",
        });
      }
    },
    async fetchUserLikedTweets(userId) {
      try {
        console.log("liked", data);
        const { data } = await usersAPI.getLikedTweets({ userId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        console.log("liked", data);
        if (data.message === "使用者尚未按任何推文讚") {
          this.likeds = []
          return
        }
        this.likeds = data;
        this.likeds = this.likeds.sort((a, b) => {
          a = new Date(a.createdAt);
          b = new Date(b.createdAt);
          return b - a;
        });
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error.message);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者回覆過的推文，請稍後再試",
        });
      }
    },
    showtweets(page) {
      this.nowPage = page;

    },
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true;
        console.log("formdata", formData);
        for (let [name, value] of formData.entries()) {
          console.log(name + ": " + value);
        }

        const { data } = await usersAPI.updateProfile({
          userId: this.currentUser.id,
          formData,
        });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        console.log("updata", data);
        Toast.fire({
          icon: "success",
          title: "更新成功",
        });
        $("#user-edit-modal").modal("hide");
        this.fetchUser(this.currentUser.id);
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法更新個人資料，請稍後再試",
        });
      }
    },
    afterAddLike () {
      const { id } = this.$route.params;
      this.fetchUser(id);
      this.fetchUserTweets(id);
      this.fetchUserRepliedTweets(id);
      this.fetchUserLikedTweets(id);

    },
    afterDeleteLike () {
      const { id } = this.$route.params;
      this.fetchUser(id);
      this.fetchUserTweets(id);
      this.fetchUserRepliedTweets(id);
      this.fetchUserLikedTweets(id);
    },
    afterCreateTweet() {
      const { id } = this.$route.params;
      this.fetchUserTweets(id);  
    },
    afteraddFollowUser() {
      this.User.followerCount += 1
    },
    afterdeleteFollowUser() {
      this.User.followerCount -= 1
    }
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
