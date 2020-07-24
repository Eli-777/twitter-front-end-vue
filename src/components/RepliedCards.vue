<template>
  <div class="tweetcard">
    <router-link :to="{name: 'user-tweets', params: {id:tweets.user.id}}">
      <img 
        class="tweetcard-avator" 
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
      <div class="tweetcard-content">{{tweets.comment}}</div>
      <div class="tweetcard-icon">
        <button type="button">
          <img src="./../assets/tweet.png" alt />
        </button>
        {{tweets.commentCount}}
        <button type="button" v-if="!tweets.isLiked" @click.stop.prevent="addLike">
          <img src="./../assets/like.png" alt />
        </button>
        <button type="button" v-else @click.stop.prevent="deleteLike">
          <img src="./../assets/heart-red.png" alt />
        </button>
        {{tweets.likeCount}}
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";

export default {
  mixins: [fromNowFilter],
  props: {
    initialReplied: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tweets: this.initialReplied
    };
  },
  watch: {
    initialReplied(newValue) {
      this.tweets = newValue;
    }
  },
  created() {},
  methods: {
    addLike () {
      this.tweets.isLiked = true
      this.tweets.likeCount = this.tweets.likeCount +1 
    },
    deleteLike () {
      this.tweets.isLiked = false
      this.tweets.likeCount = this.tweets.likeCount -1 
    }
  }
};
</script>

<style scoped>
.tweetcard {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-light-grey);
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
</style>