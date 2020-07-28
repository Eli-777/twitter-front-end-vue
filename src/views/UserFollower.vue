<template>
  <div class="container">
    <Navbar />
    <div class="center-area" style="width: 33rem;">
      <div class="header">
        <button type="button" class="header-button" @click="$router.back()">&larr;</button>
        <div class="header-text m-3">
          <p class="header-name">{{user.name}}</p>
          <p class="header-userTweets">{{user.tweetCount}}推文</p>
        </div>
      </div>

      <ul class="nav nav-pills" id="nav-tab" role="tablist">
        <li class="nav-item">
          <router-link
            class="nav-link active"
            :to="{name: 'user-follower', params:{ id: user.id}}"
            data-toggle="tab"
            href="#nav-home"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >跟隨者</router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            data-toggle="tab"
            href="#nav-profile"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
            :to="{name: 'user-following', params:{ id: user.id}}"
          >正在跟隨</router-link>
        </li>
      </ul>

      <Spinner v-if="isLoading" />
      <template v-else>
        <div class="tweet-cards overflow-auto">
          <div class="tweetcard" v-for="follower in followers" :key="follower.id">
            <UserFollowerCards :initial-follower="follower" />
          </div>
        </div>
        <div v-if="!hasFollower" class="noFollower">尚無跟隨者</div>
      </template>
    </div>
    <MostFollowerUserRecommend />
    <TweetCreate />
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import UserFollowerCards from "./../components/UserFollowerCards";
import MostFollowerUserRecommend from "./../components/MostFollowerUserRecommend";
import TweetCreate from "./../components/TweetCreate";
import Spinner from "./../components/Spinner";
import { Toast } from "./../utils/helpers";
import usersAPI from "./../apis/users";

export default {
  components: {
    Navbar,
    UserFollowerCards,
    MostFollowerUserRecommend,
    TweetCreate,
    Spinner,
  },
  data() {
    return {
      user: {},
      followers: [],
      isLoading: true,
      hasFollower: true,
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUser(userId);
    this.fetchFollower(userId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params;
    this.fetchUser(userId);
    this.fetchFollower(userId);
    next();
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await usersAPI.get({ userId });
        this.user = data;
      } catch (error) {
        console.log(error.message);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者者資料，請稍後再試",
        });
      }
    },
    async fetchFollower(userId) {
      try {
        const { data } = await usersAPI.getFollower({ userId });
        this.followers = data;
        this.followers = this.followers.sort((a, b) => {
          a = new Date(a.created_at);
          b = new Date(b.created_at);
          return b - a;
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }
        if (data) {
          this.hasFollower = false;
        }
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error.message);
        Toast.fire({
          icon: "error",
          title: "無法取得正在跟隨者資料，請稍後再試",
        });
      }
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

.nav-item .active {
  background: transparent;
  color: var(--orange);
  border-bottom: 2px solid var(--orange);
  border-radius: 0;
}
.tweetcard {
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid var(--border-light-grey);
  border-top: 1px solid var(--border-light-grey);
}

.noFollower {
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--form-text-color);
  margin: 2rem;
}
</style>