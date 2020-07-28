<template>
  <div class="right-area col-3 pt-3">
    <div class="card" style="width: 18rem;">
      <div class="card-header">跟隨誰</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="user in users" :key="user.id">
          <img class="card-avator" :src=" user.avator | emptyImage" />
          <div class="card-text">
            {{user.name}}
            <br />
            <span>{{user.account}}</span>
          </div>
          <div class="card-button-area">
            <button
              class="card-button isFollowed"
              v-if="user.isFollowed"
              @click.stop.prevent="deleteFollow(user.id)"
            >正在跟隨</button>
            <button class="card-button" v-else @click.stop.prevent="addFollow(user.id)">跟隨</button>
          </div>
        </li>
      </ul>
      <div class="card-footer text-muted"  v-if="isShowAll" @click="fetchMostFollowerUser(10)">顯示更多</div>
      <div class="card-footer text-muted" v-else @click="fetchMostFollowerUser(5)">顯示更少</div>
    </div>
  </div>
</template>
<script>
import { emptyImageFilter } from "./../utils/mixins";
import { Toast } from './../utils/helpers'

const dummyData = [
  {
    id: 1,
    account: "使用者帳號",
    name: "使用者姓名",
    email: "使用者的電子信箱",
    password: "使用者的登入密碼",
    introduction: "使用者的自介",
    avator: "",
    backgroundImage: "http://example.com/backgroundImage/1",
    isAdmin: false,
    tweetCount: 30,
    likeCount: 40,
    followerCount: 999,
    followingCount: 25,
    isFollowed: true,
    created_at: "2009-10-31T01:48:52Z",
    updated_at: "2009-10-31T01:48:52Z"
  },
  {
    id: 2,
    account: "使用者帳號2",
    name: "使用者姓名2",
    email: "使用者的電子信箱",
    password: "使用者的登入密碼",
    introduction: "使用者的自介",
    avator: "",
    backgroundImage: "http://example.com/backgroundImage/1",
    isAdmin: false,
    tweetCount: 30,
    likeCount: 40,
    followerCount: 20,
    followingCount: 25,
    isFollowed: false,
    created_at: "2009-10-31T01:48:52Z",
    updated_at: "2009-10-31T01:48:52Z"
  },
  {
    id: 3,
    account: "使用者帳號3",
    name: "使用者姓名3",
    email: "使用者的電子信箱",
    password: "使用者的登入密碼",
    introduction: "使用者的自介",
    avator: "",
    backgroundImage: "http://example.com/backgroundImage/1",
    isAdmin: false,
    tweetCount: 30,
    likeCount: 40,
    followerCount: 15,
    followingCount: 25,
    isFollowed: false,
    created_at: "2009-10-31T01:48:52Z",
    updated_at: "2009-10-31T01:48:52Z"
  },
  {
    id: 4,
    account: "使用者帳號4",
    name: "使用者姓名4",
    email: "使用者的電子信箱",
    password: "使用者的登入密碼",
    introduction: "使用者的自介",
    avator: "",
    backgroundImage: "http://example.com/backgroundImage/1",
    isAdmin: false,
    tweetCount: 30,
    likeCount: 40,
    followerCount: 90,
    followingCount: 25,
    isFollowed: false,
    created_at: "2009-10-31T01:48:52Z",
    updated_at: "2009-10-31T01:48:52Z"
  },
  {
    id: 5,
    account: "使用者帳號5",
    name: "使用者姓名5",
    email: "使用者的電子信箱",
    password: "使用者的登入密碼",
    introduction: "使用者的自介",
    avator: "",
    backgroundImage: "http://example.com/backgroundImage/1",
    isAdmin: false,
    tweetCount: 30,
    likeCount: 40,
    followerCount: 55,
    followingCount: 25,
    isFollowed: false,
    created_at: "2009-10-31T01:48:52Z",
    updated_at: "2009-10-31T01:48:52Z"
  },
  {
    id: 6,
    account: "使用者帳號6",
    name: "使用者姓名6",
    email: "使用者的電子信箱",
    password: "使用者的登入密碼",
    introduction: "使用者的自介",
    avator: "",
    backgroundImage: "http://example.com/backgroundImage/1",
    isAdmin: false,
    tweetCount: 30,
    likeCount: 40,
    followerCount: 44,
    followingCount: 25,
    isFollowed: false,
    created_at: "2009-10-31T01:48:52Z",
    updated_at: "2009-10-31T01:48:52Z"
  },
  {
    id: 7,
    account: "使用者帳號7",
    name: "使用者姓名7",
    email: "使用者的電子信箱",
    password: "使用者的登入密碼",
    introduction: "使用者的自介",
    avator: "",
    backgroundImage: "http://example.com/backgroundImage/1",
    isAdmin: false,
    tweetCount: 30,
    likeCount: 40,
    followerCount: 83,
    followingCount: 25,
    isFollowed: false,
    created_at: "2009-10-31T01:48:52Z",
    updated_at: "2009-10-31T01:48:52Z"
  },
  {
    id: 8,
    account: "使用者帳號8",
    name: "使用者姓名8",
    email: "使用者的電子信箱",
    password: "使用者的登入密碼",
    introduction: "使用者的自介",
    avator: "",
    backgroundImage: "http://example.com/backgroundImage/1",
    isAdmin: false,
    tweetCount: 30,
    likeCount: 40,
    followerCount: 36,
    followingCount: 25,
    isFollowed: false,
    created_at: "2009-10-31T01:48:52Z",
    updated_at: "2009-10-31T01:48:52Z"
  },
  {
    id: 9,
    account: "使用者帳號9",
    name: "使用者姓名9",
    email: "使用者的電子信箱",
    password: "使用者的登入密碼",
    introduction: "使用者的自介",
    avator: "",
    backgroundImage: "http://example.com/backgroundImage/1",
    isAdmin: false,
    tweetCount: 30,
    likeCount: 40,
    followerCount: 134,
    followingCount: 25,
    isFollowed: false,
    created_at: "2009-10-31T01:48:52Z",
    updated_at: "2009-10-31T01:48:52Z"
  },
  {
    id: 10,
    account: "使用者帳號10",
    name: "使用者姓名10",
    email: "使用者的電子信箱",
    password: "使用者的登入密碼",
    introduction: "使用者的自介",
    avator: "",
    backgroundImage: "http://example.com/backgroundImage/1",
    isAdmin: false,
    tweetCount: 30,
    likeCount: 40,
    followerCount: 32,
    followingCount: 25,
    isFollowed: false,
    created_at: "2009-10-31T01:48:52Z",
    updated_at: "2009-10-31T01:48:52Z"
  },
  {
    id: 11,
    account: "使用者帳號11",
    name: "使用者姓名11",
    email: "使用者的電子信箱",
    password: "使用者的登入密碼",
    introduction: "使用者的自介",
    avator: "",
    backgroundImage: "http://example.com/backgroundImage/1",
    isAdmin: false,
    tweetCount: 30,
    likeCount: 40,
    followerCount: 1,
    followingCount: 25,
    isFollowed: false,
    created_at: "2009-10-31T01:48:52Z",
    updated_at: "2009-10-31T01:48:52Z"
  }
];

export default {
  mixins: [emptyImageFilter],
  data() {
    return {
      users: [],
      isShowAll: false
    };
  },
  created() {
    this.fetchMostFollowerUser(5);
  },
  methods: {
    async fetchMostFollowerUser(userNumber) {
      try {
        const data = dummyData;
        this.users = data
          .sort((a, b) => {
            return b.followerCount - a.followerCount;
          })
          .slice(0, userNumber);
        this.isShowAll = !this.isShowAll
      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資訊，請稍後再試'
        })
      }
    },
    addFollow(userId) {
      this.users = this.users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            isFollowed: true
          };
        }
        return user;
      });
    },
    deleteFollow(userId) {
      this.users = this.users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            isFollowed: false
          };
        }
        return user;
      });
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 14px 14px 0 0;
  border: 0px;
  position: fixed;
}
.card-header {
  background-color: var(--form-background-color);
  border-radius: 14px 14px 0 0;
  font-weight: bold;
  padding: 7px 20px;
}
.card-footer {
  border-radius: 0 0 14px 14px;
  background-color: var(--form-background-color);
  color: var(--orange) !important;
  cursor: pointer;
  padding: 7px 20px;
}
.list-group-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--form-background-color);
  padding: 7px 20px;
}
.card-avator {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.card-text{
  font-size: .875rem;
}
.card-text span {
  color: var(--form-text-color);
}
.card-button-area {
  min-width: 80px;
}
.card-button {
  background-color: var(--form-background-color);
  border: 1px solid var(--orange);
  border-radius: 50px;
  color: var(--orange);
  outline: none;
  position: absolute;
  right: 1rem;
  transform: translateY(-50%);
}
.isFollowed {
  background-color: var(--orange);
  color: var(--form-background-color);
  border: 1px solid var(--orange);
  border-radius: 50px;
  outline: none;
}
</style>