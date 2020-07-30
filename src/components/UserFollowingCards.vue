<template>
  <div class="tweetcard">
    <router-link :to="{name: 'user-tweets', params: {id:following.followingId}}">
      <img
        class="tweetcard-avatar"
        :src="following.avatar | emptyImage"
        width="50rem"
        height="50rem"
      />
    </router-link>
    <div class="tweetcard-right mt-2 mb-2">
      <div class="tweetcard-right-top">
        <div class="tweetcard-title">
          {{following.name}}
          <br />
          <span class="tweetcard-account">@{{following.account}}</span>
        </div>
        <div class="tweetcard-icon mr-3" v-if="currentUser.id !== following.followingId">
          <button
            v-if="following.isFollowedByLoginUser"
            type="submit"
            class="tweetcard-button isFollowed"
            :class="{isFollowed: following.isFollowed}"
            @click.stop.prevent="deleteFollow(following.followingId)"
          >正在跟隨</button>
          <button
            v-else
            type="submit"
            class="tweetcard-button"
            :class="{isFollowed: following.isFollowed}"
            @click.stop.prevent="addFollow(following.followingId)"
          >跟隨</button>
        </div>
      </div>
      <div class="tweetcard-content">{{following.introduction}}</div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
import { Toast } from "./../utils/helpers";
import usersAPI from "./../apis/users";
import { mapState } from 'vuex'

export default {
  mixins: [emptyImageFilter],
  props: {
    initialFollowing: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      following: {},
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    this.fetchFollowing();
  },
  methods: {
    fetchFollowing() {
      this.following = this.initialFollowing;
    },
    async addFollow(userId) {
      try {
        const id = userId.toString()
        const {data} = await usersAPI.addFollowing({id})
        if ( data.status === 'error') {
          throw new Error(data.message)
        }
        this.following = {
          ...this.following,
          isFollowedByLoginUser: true,
        };
      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法追蹤使用者稍後再試'
        })
      }
    },
    async deleteFollow(userId) {
      try {
        const {data} = await usersAPI. deleteFollowing({userId})
        if ( data.status === 'error') {
          throw new Error(data.message)
        }
        this.following = {
          ...this.following,
          isFollowedByLoginUser: false,
        };
      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法取消追蹤使用者稍後再試'
        })
      }
    },
  },
};
</script>


<style scoped>

.tweetcard {
  display: flex;
  align-items: flex-start;
  width: 100%;
}

.tweetcard-avatar {
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
.tweetcard-right-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>