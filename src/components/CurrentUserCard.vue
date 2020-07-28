<template>
  <div class="center-area" style="width: 33rem;">
    <div class="header">
      <button type="button" class="header-button" @click="$router.back()">&larr;</button>
      <div class="header-text m-3">
        <p class="header-name">{{user.name}}</p>
        <p class="header-userTweets">{{user.tweetCount}}推文</p>
      </div>
    </div>
    <img :src=" user.cover | emptyImage" class="card-img-top backgroundImage" height="150px" />
    <div class="card-body">
      <img :src=" user.avatar | emptyImage" class="card-img-avatar" height="140px" width="140px" />
      <div class="card-body-button">
        <button
          v-if="currentUser.id === this.user.id"
          class="btn edit-profile-button"
          data-toggle="modal"
          data-target="#user-edit-modal"
        >編輯個人資料</button>
        <button class="button-transparent" v-else>
          <img src="./../assets/messege-button@2x.png" />
        </button>
        <button
          v-if="user.isBelled && !(currentUser.id === this.user.id)"
          class="button-transparent-active"
          @click.stop.prevent="deleteBell"
        >
          <img src="./../assets/isbell.png" />
        </button>
        <button
          v-if="!user.isBelled &&!(currentUser.id === this.user.id)"
          class="button-transparent"
          @click.stop.prevent="addBell"
        >
          <img src="./../assets/notbell.png" />
        </button>
        <button
          v-if="!user.isFollowed && !(currentUser.id === this.user.id)"
          class="btn button-follow"
          @click.stop.prevent="addFollow"
        >跟隨</button>
        <button
          v-if="user.isFollowed && !(currentUser.id === this.user.id)"
          class="btn button-following"
          @click.stop.prevent="deleteFollow"
        >正在跟隨</button>
      </div>
      <div class="card-body-text">
        <h5 class="card-body-name">{{user.name}}</h5>
        <p class="card-body-account">{{user.account}}</p>
        <p class="card-body-introduction">{{user.introduction}}</p>
      </div>
      <div class="card-body-follow">
        <router-link :to="{ name: 'user-following', params :{ id: currentUser.id}}">
          {{user.followingCount}} 個
          <span>跟隨中</span>
        </router-link>
        <router-link :to="{ name: 'user-follower', params :{ id: currentUser.id}}">
          {{user.followerCount}} 位
          <span>跟隨者</span>
        </router-link>
      </div>
    </div>

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
    <Spinner v-if="isLoading" />
    <template v-else>
      <!-- 推文 -->
      <div class="tweet-cards">
        <TweetCards v-for="tweet in tweets" :key="tweet.id" :initial-user-tweet="tweet" />
      </div>
    </template>
  </div>
</template>

<script>
import TweetCards from "./../components/TweetCards";
import Spinner from "./../components/Spinner";
import usersAPI from "./../apis/users";
import { emptyImageFilter } from "./../utils/mixins";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  mixins: [emptyImageFilter],
  components: {
    TweetCards,
    Spinner,
  },
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: {},
      tweets: [],
      userTweets: [],
      replied: [],
      liked: [],
      nowPage: "userTweet",
      isLoading: true,
    };
  },
  watch: {
    initialUser(newValue) {
      this.user = {
        ...this.user,
        ...newValue,
      };
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.fetchUser();
    this.fetchUserTweets();
    this.showtweets(this.nowPage);
  },
  methods: {
    async fetchUser() {
      this.user = this.initialUser;
    },
    async fetchUserTweets() {
      try {
        const userId = this.currentUser.id;
        const { data } = await usersAPI.getUserTweets({ userId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.tweets = data;
        this.userTweets = data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
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
    addFollow() {
      this.user = {
        ...this.user,
        isFollowed: true,
      };
    },
    deleteFollow() {
      this.user = {
        ...this.user,
        isFollowed: false,
      };
    },
    addBell() {
      this.user = {
        ...this.user,
        isBelled: true,
      };
    },
    deleteBell() {
      this.user = {
        ...this.user,
        isBelled: false,
      };
    },
  },
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
  font-size: 1.125rem;
  line-height: 1.125rem;
  font-weight: 900;
}
.header .header-userTweets {
  font-size: 0.8125rem;
  line-height: 0.8125rem;
  font-weight: 500;
  color: var(--form-text-color);
}
.card-img-top {
  border-radius: 0;
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
  padding-top: 30px;
}
.card-body-account {
  color: var(--form-text-color);
}
.card-body-button {
  display: flex;
  justify-content: flex-end;
  padding-top: 5px;
}
.card-body-button button {
  margin-left: 5px;
}
.edit-profile-button,
.button-follow,
.button-following {
  color: var(--orange);
  border-color: var(--orange);
  border-radius: 50px;
  background-color: transparent;
  box-shadow: none;
}
.edit-profile-button:hover,
.edit-profile-button:active,
.button-following {
  background: var(--orange) !important;
  color: var(--form-background-color);
}

.card-body-follow {
  display: flex;
  margin: 0.3rem 0;
}
.card-body-follow span {
  color: var(--form-text-color);
  margin-right: 1.2rem;
}

.nav-item .active {
  background: transparent;
  color: var(--orange);
  border-bottom: 2px solid var(--orange);
  border-radius: 0;
}
.tweet-cards {
  max-height: 50%;
}
</style>