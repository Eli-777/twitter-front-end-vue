<template>
  <div class="tweets">
    <div class="tweetcard">
      <img
        class="tweetcard-avator"
        :src="tweets.User.avator | emptyImage"
        width="50rem"
        height="50rem"
      />

      <div class="tweetcard-right">
        <div class="tweetcard-title">
          {{ tweets.User.name }}
          <span class="tweetcard-account">
            @{{ tweets.User.account }}
            ．{{ tweets.createdAt | fromNow }}
          </span>
        </div>
        <div class="tweetcard-content">{{ tweets.description | wordLimit }}</div>
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
  </div>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";
import { emptyImageFilter } from "./../utils/mixins";
import adminAPI from './../apis/admin'
import { Toast } from '../utils/helpers';
export default {
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
    initialUserTweet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tweets: this.initialUserTweet,
    };
  },
  methods: {
    async handleDeleteButtonClick(tweetId) {
      try{
      const { data } = await adminAPI.deleteTweet({tweetId})
      if (data.status !== 'success') {
        throw new Error(data.message)
      }
      this.$emit("after-delete-tweet", tweetId);
      } catch (error) {
          console.log(error.message)
          Toast.fire({
            icon: 'error',
            title: '無法刪除此筆推文，請稍後再試'
          })
        }
    },
  },
  filters: {
    wordLimit (totalWord) {
      const word = totalWord.substring(0,50) 
      if (totalWord.length > 50){
        return word+'...'
      }
      return word
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
.tweetcard-right {
  width: 100%;
  margin-right: 5rem;
}
.tweetcard-content {
  width: 100%;
  white-space: pre-wrap;
  word-break: break-all;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
}
.tweetcard-icon {
  position: absolute;
  right: 2rem;
}
</style>
