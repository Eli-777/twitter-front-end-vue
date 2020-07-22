<template>
  <router-link :to="{name: 'tweet', params: {id:tweets.id}}">
    <div class="tweetcard">
      <router-link :to="{name: 'user-tweets', params: {id:tweets.id}}">
        <img class="tweetcard-avator" 
          :src="tweets.user.avator" 
          width="50rem" 
          height="50rem" 
        />
      </router-link>
      <div class="tweetcard-right">
        <div class="tweetcard-title">
          {{tweets.user.name}}
          <span class="tweetcard-account">
            {{tweets.user.account}}
            ．{{tweets.created_at | fromNow}}
          </span>
        </div>
        <div class="tweetcard-content">{{tweets.description}}</div>
        <div class="tweetcard-icon">
          <button type="button" data-toggle="modal" data-target="#tweet-replied-modal">
            <img src="./../assets/tweet.png" alt />
          </button>
          {{tweets.commentCount}}
          <button type="button">
            <img src="./../assets/like.png" alt />
          </button>
          {{tweets.likeCount}}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";

export default {
  mixins: [fromNowFilter],
  props: {
    initialUserTweet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tweets: this.initialUserTweet
    };
  },
  watch: {
    initialUserTweet(newValue) {
      this.tweet = newValue;
    }
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
.tweetcard {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-light-grey);
}
.tweetcard-avator {
  border-radius: 50%;
  margin: 1rem;
}
.tweetcard-account {
  color: var(--form-text-color);
}
.tweetcard-icon button {
  background-color: white;
  border: none;
  outline: none;
}
.tweetcard-icon button img {
  width: 1rem;
  height: 1rem;
}
.tweetcard-icon {
  color: var(--twitter-post-text-color-grey)
}
</style>