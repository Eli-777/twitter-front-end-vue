<template>
  <div class="center-area " style="width: 33rem;">
    <div class="header m-3">
      <button type="button" class="header-button" @click="$router.back()">&larr;</button>
      <p class="header-text">推文</p>
    </div>

    <div class="card-body pt-2">
      <div class="card-body-user pl-3">
        <router-link :to="{name: 'user-tweets', params: {id:tweet.user.id}}">
          <img
            :src="tweet.user.avator | emptyImage"
            class="card-img-avatar"
            height="140px"
            width="140px"
          />
        </router-link>
        <div class="card-body-username ">
          <h5 class="card-body-name">{{tweet.user.name}}</h5>
          <p class="card-body-account">{{tweet.user.account}}</p>
        </div>
      </div>

      <p class="card-body-description pl-3">{{tweet.description}}</p>
      <p class="card-body-time pl-3">{{tweet.created_at | fromNow }}</p>
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
        <button type="button" v-if="!tweet.isLiked" @click.stop.prevent="addLike">
          <img src="./../assets/like.png" alt />
        </button>
        <button type="button" v-else @click.stop.prevent="deleteLike">
          <img src="./../assets/heart-red.png" alt />
        </button>
      </div>
    </div>

    <!-- 回覆留言區 -->
    <RepliedCards v-for="replied in replieds" :key="replied.id" :initial-replied="replied" />
  </div>
</template>


<script>
import { emptyImageFilter } from "./../utils/mixins";
import { fromNowFilter } from "./../utils/mixins";
import RepliedCards from "./../components/RepliedCards";

const dummyData = [
  {
    id: 1,
    UserId: 1,
    TweetId: 99,
    isLiked: false,
    comment: "回覆內容",
    commentCount: 5,
    likeCount: 1,
    created_at: "2009-10-31T01:48:52Z",
    updated_at: "2009-10-31T01:48:52Z",
    user: {
      id: 1,
      account: "使用者帳號",
      name: "使用者姓名",
      email: "使用者的電子信箱",
      password: "使用者的登入密碼",
      introduction: "使用者的自介",
      avator: "https://i.imgur.com/Q14p2le.jpg",
      backgroundImage: "http://example.com/backgroundImage/1",
      isAdmin: false,
      tweetCount: 30,
      likeCount: 40,
      followerCount: 10,
      followingCount: 25,
      created_at: "2009-10-31T01:48:52Z",
      updated_at: "2009-10-31T01:48:52Z"
    }
  },
  {
    id: 2,
    UserId: 2,
    TweetId: 88,
    isLiked: false,
    comment: "回覆內容12123",
    commentCount: 4,
    likeCount: 2,
    created_at: "2009-10-31T01:48:52Z",
    updated_at: "2009-10-31T01:48:52Z",
    user: {
      id: 2,
      account: "使用者帳號2",
      name: "使用者姓名2",
      email: "使用者的電子信箱",
      password: "使用者的登入密碼",
      introduction: "使用者的自介",
      avator: "https://i.imgur.com/Q14p2le.jpg",
      backgroundImage: "http://example.com/backgroundImage/1",
      isAdmin: false,
      tweetCount: 60,
      likeCount: 80,
      followerCount: 10,
      followingCount: 25,
      created_at: "2009-10-31T01:48:52Z",
      updated_at: "2009-10-31T01:48:52Z"
    }
  }
];

export default {
  mixins: [emptyImageFilter, fromNowFilter],
  components: {
    RepliedCards
  },
  props: {
    initialTweet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tweet: {},
      replieds: []
    };
  },
  created() {
    this.fetchTweet();
  },
  methods: {
    fetchTweet() {
      const data = dummyData;
      this.tweet = this.initialTweet;
      this.replieds = data;
    },
    addLike() {
      this.tweet.isLiked = true;
    },
    deleteLike() {
      this.tweet.isLiked = false;
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
.card-body-time, {
  color: var(--twitter-post-text-color-grey);
}
.card-body-text {
  padding-top: 75px;
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