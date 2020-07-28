<template>
  <div>
    <div class="header">
      <button type="button" class="header-button" @click="$router.back()">&larr;</button>
      <div class="header-text m-3">
        <p class="header-name">{{user.name}}</p>
        <p class="header-userTweets">{{user.tweetCount}}推文</p>
      </div>
    </div>
    <img :src=" user.cover | emptyImage" class="card-img-top backgroundImage" height="150px" />
    <div class="card-body">
      <img :src=" user.avatar | emptyImage" class="card-img-avatar" height="140px" width="140px" />
      <div class="card-body-button">
        <button
          v-if="currentUser.id === this.user.id"
          class="btn edit-profile-button"
          data-toggle="modal"
          data-target="#user-edit-modal"
        >編輯個人資料</button>
        <button class="button-transparent" v-else>
          <img src="./../assets/messege-button@2x.png" />
        </button>
        <button
          v-if="user.isBelled && !(currentUser.id === this.user.id)"
          class="button-transparent-active"
          @click.stop.prevent="deleteBell"
        >
          <img src="./../assets/isbell.png" />
        </button>
        <button
          v-if="!user.isBelled &&!(currentUser.id === this.user.id)"
          class="button-transparent"
          @click.stop.prevent="addBell"
        >
          <img src="./../assets/notbell.png" />
        </button>
        <button
          v-if="!user.isFollowed && !(currentUser.id === this.user.id)"
          class="btn button-follow"
          @click.stop.prevent="addFollow(user.id)"
        >跟隨</button>
        <button
          v-if="user.isFollowed && !(currentUser.id === this.user.id)"
          class="btn button-following"
          @click.stop.prevent="deleteFollow(user.id)"
        >正在跟隨</button>
      </div>
      <div class="card-body-text">
        <h5 class="card-body-name">{{user.name}}</h5>
        <p class="card-body-account">{{user.account}}</p>
        <p class="card-body-introduction">{{user.introduction}}</p>
      </div>
      <div class="card-body-follow">
        <router-link :to="{ name: 'user-following', params :{ id: $route.params.id}}">
          {{user.followingCount}} 個
          <span>跟隨中</span>
        </router-link>
        <router-link :to="{ name: 'user-follower', params :{ id: $route.params.id}}">
          {{user.followerCount}} 位
          <span>跟隨者</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import usersAPI from "./../apis/users";
import { emptyImageFilter } from "./../utils/mixins";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
import usersAPI from "./../apis/users";

export default {
  mixins: [emptyImageFilter],
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: {},
    };
  },
  watch: {
    initialUser(newValue) {
      this.user = {
        ...this.user,
        ...newValue,
      };
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.fetchUser();
    // const { id } = this.$route.params;
    // this.fetchUserTweets(id);
  },
  methods: {
    async fetchUser() {
      this.user = this.initialUser;
    },
    // async fetchUserTweets(userId) {
    //   try {
    //     const { data } = await usersAPI.getUserTweets({ userId });
    //     this.tweets = data;
    //     this.userTweets = data;
    //   } catch (error) {
    //     console.log(error.message);
    //     Toast.fire({
    //       icon: "error",
    //       title: "無法取得使用者推文，請稍後再試",
    //     });
    //   }
    // },
    async addFollow(userId) {
      try {
        const id = userId.toString()
        const {data} = await usersAPI.addFollowing({id})
        if ( data.status !== 'success') {
          throw new Error(data.message)
        }
        this.user = {
          ...this.user,
          isFollowed: true,
          followerCount: this.user.followerCount + 1
        };
      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    },
    async deleteFollow(userId) {
      try {
        const {data} = await usersAPI. deleteFollowing({userId})
        if ( data.status === 'error') {
          throw new Error(data.message)
        }
        if ( data.status === 'success') {
          Toast.fire({
          icon: 'success',
          title: '取消追蹤！'
        })
        }
        this.user = {
          ...this.user,
          isFollowed: false,
          followerCount: this.user.followerCount - 1
        };
      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法取消追蹤使用者稍後再試'
        })
      }
    },
    addBell() {
      this.user = {
        ...this.user,
        isBelled: true,
      };
    },
    deleteBell() {
      this.user = {
        ...this.user,
        isBelled: false,
      };
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
  font-size: 1.125rem;
  line-height: 1.125rem;
  font-weight: 900;
}
.header .header-userTweets {
  font-size: 0.8125rem;
  line-height: 0.8125rem;
  font-weight: 500;
  color: var(--form-text-color);
}
.card-img-top {
  border-radius: 0;
}
.card-body {
  position: relative;
  padding: 0 20px;
}
.card-img-avatar {
  border-radius: 100%;
  border: 4px solid #ffffff;
  position: absolute;
  transform: translateY(-50%);
  z-index: 999;
}
.card-body-text {
  padding-top: 30px;
}
.card-body-account {
  color: var(--form-text-color);
}
.card-body-button {
  display: flex;
  justify-content: flex-end;
  padding-top: 5px;
}
.card-body-button button {
  margin-left: 5px;
}
.edit-profile-button,
.button-follow,
.button-following {
  color: var(--orange);
  border-color: var(--orange);
  border-radius: 50px;
  background-color: transparent;
  box-shadow: none;
}
.edit-profile-button:hover,
.edit-profile-button:active,
.button-following {
  background: var(--orange) !important;
  color: var(--form-background-color);
}

.card-body-follow {
  display: flex;
  margin: 0.3rem 0;
}
.card-body-follow span {
  color: var(--form-text-color);
  margin-right: 1.2rem;
}
</style>