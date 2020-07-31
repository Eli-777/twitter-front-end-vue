<template>
  <router-link :to="{name: 'tweet', params: {id:tweet.id}}">
    <div class="tweetcard">
      <router-link :to="{name: 'user-tweets', params: {id:tweet.User.userId}}">
        <img
          class="tweetcard-avatar"
          :src="tweet.User.avatar | emptyImage"
          width="50rem"
          height="50rem"
        />
      </router-link>
      <div class="tweetcard-right">
        <div class="tweetcard-title">
          {{tweet.User.name}}
          <span class="tweetcard-account">
            @{{tweet.User.account}}
            ．{{tweet.createdAt | fromNow}}
          </span>
        </div>
        <div class="tweetcard-content">{{tweet.description}}</div>
        <div class="tweetcard-icon">
          <router-link to>
            <button
              type="button"
              class="tweet-button"
              data-toggle="modal"
              data-target="#tweet-replied-modal"
              @click="handleSubmit"
            >
              <img src="./../assets/tweet.png" alt />
            </button>
            {{tweet.commentCount}}
          </router-link>
          <button type="button" v-if="!tweet.isLikedByLoginUser" :disabled="isProcessing" @click.stop.prevent="addLike(tweet.id)">
            <img src="./../assets/like.png" alt />
          </button>
          <button type="button" v-else :disabled="isProcessing" @click.stop.prevent="deleteLike(tweet.id)">
            <img src="./../assets/heart-red.png" alt />
          </button>
          {{tweet.likeCount}}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";
import { emptyImageFilter } from "./../utils/mixins";
import { Toast } from './../utils/helpers'
import usersAPI from './../apis/users'

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
      tweet: {},
      isProcessing: false
    };
  },
  watch: {
    initialUserTweet(newValue) {
      this.tweet = {
        ...this.initialUserTweet,
        ...newValue,
      };
    },
  },
  created() {
    this.fetchTweet();
  },
  methods: {
    fetchTweet() {
      const data = this.initialUserTweet;
      const {
        id,
        User,
        createdAt,
        description,
        commentCount,
        likeCount,
        isLikedByLoginUser,
      } = data;
      const { id: userId, avatar, name, account } = User;
      this.tweet = {
        id,
        User,
        createdAt,
        description,
        commentCount,
        likeCount,
        isLikedByLoginUser,
      };
      this.tweet.User = {
        userId,
        avatar,
        name,
        account,
      };
    },
    async addLike(tweetId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.addliked({tweetId})
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.tweet.isLikedByLoginUser = true;
        this.tweet.likeCount = this.tweet.likeCount + 1;
        this.$emit("after-add-like", tweetId);
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法對推文按讚，請稍後再試'
        })
      }
    },
    async deleteLike(tweetId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.deleteliked({tweetId})
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.tweet.isLikedByLoginUser = false;
        this.tweet.likeCount = this.tweet.likeCount - 1;
        this.$emit("after-delete-like", tweetId);
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法對推文取消按讚，請稍後再試'
        })
      }
      
    },
    handleSubmit() {
      this.$emit("after-click-tweet", {
        tweet: this.tweet,
      });
    },
  },
};
</script>

<style scoped>
.tweetcard {
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid var(--border-light-grey);
}
.tweetcard:first-child {
  border-top: 1px solid var(--border-light-grey);
}
.tweetcard-avatar {
  border-radius: 50%;
  margin: 1rem;
  margin-top: 0.5rem;
}
.tweetcard-account {
  color: var(--form-text-color);
}
.tweetcard-icon button {
  background-color: white;
  border: none;
  outline: none;
}
.tweet-button {
  padding-left: 0;
}
.tweetcard-icon button img {
  width: 1rem;
  height: 1rem;
}
.tweetcard-icon, 
.tweetcard-icon a {
  color: var(--twitter-post-text-color-grey);
}

.tweetcard-right {
  margin-top: 0.2rem;
}

.tweetcard-content {
  white-space: pre-wrap;
  word-break: break-all;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  display: -webkit-box;
}
</style>