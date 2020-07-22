<template>
  <div class="col-6" style="width: 18rem;">
    <div class="header">
      <button type="button" class="header-button" @click="$router.back()">&larr;</button>
      <div class="header-text m-3">
        <p class="header-name">name</p>
        <p class="header-userTweets">25推文</p>
      </div>
    </div>

    <ul class="nav nav-pills" id="nav-tab" role="tablist">
      <li class="nav-item" >
        <router-link
          class="nav-link active"
          :to="{name: 'user-follower', params:{ id: followers[0].follower.id}}"
          data-toggle="tab"
          href="#nav-home"
          role="tab"
          aria-controls="nav-home"
          aria-selected="true"
        >跟隨者</router-link>
      </li>
      <li class="nav-item" >
        <router-link
          class="nav-link"
          data-toggle="tab"
          href="#nav-profile"
          role="tab"
          aria-controls="nav-profile"
          aria-selected="false"
          :to="{name: 'user-following', params:{ id: followers[0].follower.id}}"
        >正在跟隨</router-link>
      </li>
    </ul>

    <div class="tweet-cards overflow-auto">
      <div class="tweetcard" v-for="follower in followers" :key="follower.id">
        <router-link :to="{name: 'user-tweets', params: {id:follower.follower.id}}">
          <img
            class="tweetcard-avator"
            :src="follower.follower.avator | emptyImage"
            width="50rem"
            height="50rem"
          />
        </router-link>
        <div class="tweetcard-right mt-2 mb-2">
          <div class="tweetcard-right-top">
            <div class="tweetcard-title">
              {{follower.follower.name}}
              <br/>
              <span class="tweetcard-account">
                {{follower.follower.account}}
              </span>
            </div>
            <div class="tweetcard-icon mr-3">
              <button 
                v-if="follower.isFollowed"
                type="submit" 
                class="tweetcard-button" 
                :class="{isFollowed: follower.isFollowed}"
                @click.stop.prevent="deleteFollow(follower.follower.id)"
              >
                正在跟隨
              </button>
              <button 
                v-else
                type="submit" 
                class="tweetcard-button" 
                :class="{isFollowed: follower.isFollowed}"
                @click.stop.prevent="addFollow(follower.follower.id)"
              >
                跟隨
              </button>
            </div>
          </div>
          <div class="tweetcard-content">{{follower.follower.introduction}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";

export default {
  mixins: [emptyImageFilter],
  props: {
    initialFollowers: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      followers: [],
    };
  },
  created() {
    this.fetchFollowers()
  },
  methods: {
    fetchFollowers() {
      this.followers = this.initialFollowers;
    },
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

.nav-item .active {
  background: var(--form-background-color);
  color: var(--orange);
}


.tweetcard {
  display: flex;
  align-items: flex-start;
  border: 1px solid var(--border-light-grey);
}

.tweetcard-avator {
  border-radius: 50%;
  margin: 1rem;
}

.tweetcard-account {
  color: var(--form-text-color);
}
.tweetcard-button {
  background-color: white;
  border: 1px solid var(--orange);
  border-radius: 50px;
  color: var(--orange);
  outline: none;
}
.isFollowed {
  background-color: var(--orange);
  color: var(--form-background-color);
  border: 1px solid var(--orange);
  border-radius: 50px;
  outline: none;
}

.tweetcard-right {
  width: 100%;
}
.tweetcard-right-top{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>