<template>
  <div class="tweets">
    <router-link :to="{name: 'tweet', params: {id:tweets.id}}">
      <div class="tweetcard">
        <router-link :to="{name: 'user-tweets', params: {id:tweets.id}}">
          <img class="tweetcard-avator" :src="tweets.user.avator" width="50rem" height="50rem" />
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
        </div>
        <div class="tweetcard-icon">
          <button 
            type="button"
            @click.stop.prevent="handleDeleteButtonClick(tweets.id)" 
          >
            &times;
          </button>
        </div>
      </div>
    </router-link>
  </div>
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
  methods:{
    handleDeleteButtonClick (tweetId) {
      // TODO: 請求 API 伺服器刪除 id 為 tweetId 的評論
      this.$emit('after-delete-tweet', tweetId)
    }
  }
};
</script>

<style scoped>
.tweetcard {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-light-grey);
  border-top: none;
  position: relative;
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
  font-size: 2rem;
}
.tweetcard-icon{
  position: absolute;
  right: 2rem;
}
</style>