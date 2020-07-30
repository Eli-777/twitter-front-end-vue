<template>
  <div>
    <div class="header m-3">
      <button type="button" class="header-button" @click="$router.back()">&larr;</button>
      <p class="header-text">推文</p>
    </div>

    <div class="card-body pt-2">
      <div class="card-body-user pl-3">
        <router-link :to="{name: 'user-tweets', params: {id:tweet.User.id}}">
          <img
            :src="tweet.User.avatar | emptyImage"
            class="card-img-avatar"
            height="140px"
            width="140px"
          />
        </router-link>
        <div class="card-body-username ">
          <h5 class="card-body-name">{{tweet.User.name}}</h5>
          <p class="card-body-account">@{{tweet.User.account}}</p>
        </div>
      </div>

      <p class="card-body-description pl-3">{{tweet.description}}</p>
      <p class="card-body-time pl-3">{{tweet.createdAt | fromNow }}</p>
      <div class="card-body-follow pl-3">
        {{tweet.commentCount}}
        <p>回覆</p>
        {{tweet.likeCount}}
        <p>喜歡次數</p>
      </div>
      <div class="card-icon pl-3 pb-2">
        <button type="button mr-5" data-toggle="modal" data-target="#tweet-replied-modal">
          <img src="./../assets/tweet.png" alt />
        </button>
        <button type="button" v-if="!tweet.isLikedByLoginUser" @click.stop.prevent="addLike(tweet.id)">
          <img src="./../assets/like.png" alt />
        </button>
        <button type="button" v-else @click.stop.prevent="deleteLike(tweet.id)">
          <img src="./../assets/heart-red.png" alt />
        </button>
      </div>
    </div>

    
  </div>
</template>


<script>
import { emptyImageFilter } from "./../utils/mixins";
import { fromNowFilter } from "./../utils/mixins";
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'





export default {
  mixins: [emptyImageFilter, fromNowFilter],
  props: {
    initialTweet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tweet: {
        id: -1,
        description: "",
        commentCount: 0,
        likeCount: 0,
        isLikedByLoginUser: false,
        createdAt: "",
        updatedAt: "",
        User: {
          id: -1,
          name: "",
          avatar: '',
          account: ''
        }
      },
      replieds: []
    };
  },
  watch: {
    initialTweet (newValue) {
      this.tweet = {
        ...this.tweet,
        ...newValue
      }
    }
  },
  created() {
    this.fetchTweet();
    
  },
  methods: {
    fetchTweet() {
      this.tweet = {
        ...this.tweet,
        ...this.initialTweet
      }
    },
    async addLike(tweetId) {
      try {
        const { data } = await usersAPI.addliked({tweetId})
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        console.log('add',data)
        this.tweet.isLikedByLoginUser = true;
        this.tweet.likeCount = this.tweet.likeCount + 1;
      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法對推文按讚，請稍後再試'
        })
      }
    },
    async deleteLike(tweetId) {
      try {
        const { data } = await usersAPI.deleteliked({tweetId})
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        console.log('delete',data)
        this.tweet.isLikedByLoginUser = false;
        this.tweet.likeCount = this.tweet.likeCount - 1;
      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法對推文取消按讚，請稍後再試'
        })
      }
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  font-size: 1.1875rem;
  line-height: 1.1875rem;
  font-weight: 900;
  color: var(--black);
}

.header-button {
  border: none;
  outline: none;
  background-color: white;
}

.card-body {
  padding: 0 0px;
  border-top: 1px solid var(--border-light-grey);
}

.card-body-user {
  display: flex;
  flex-direction: row;
}
.card-body-username {
  display: flex;
  flex-direction: column;
}
.card-img-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.3rem;
}
.card-body-account,
.card-body-time {
  color: var(--twitter-post-text-color-grey);
}
.card-body-text {
  padding-top: 75px;
}
.card-body-description{
  white-space: pre-wrap;
  word-break: break-all;
}

.card-body-time,
.card-body-follow {
  border-bottom: 1px solid var(--border-light-grey);
  padding: 0.5rem 0;
}

.card-body-follow {
  display: flex;
}
.card-body-follow p {
  color: var(--form-text-color);
  margin-right: 1.2rem;
}
.card-icon {
  display: flex;
  margin: 0.5rem 0;
  border-bottom: 1px solid var(--border-light-grey);
}
.card-icon button {
  background-color: white;
  border: none;
  outline: none;
  margin-right: 5rem;
}
.card-icon button img {
  width: 1rem;
  height: 1rem;
}
</style>