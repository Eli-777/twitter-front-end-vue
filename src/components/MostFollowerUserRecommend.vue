<template>
  <div class="right-area col-3 pt-3">
    <div class="card" style="width: 18rem;">
      <div class="card-header">跟隨誰</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="user in users" :key="user.id">
          <router-link :to="{ name: 'user-tweets', params: { id: user.id } }">
            <img class="card-avatar" :src="user.avatar | emptyImage" />
          </router-link>
          <div class="card-text">
            {{ user.name }}
            <br />
            <span>@{{ user.account }}</span>
          </div>
          <div class="card-button-area">
            <button
              class="card-button isFollowed"
              v-if="user.isFollowedByLoginUser && !(currentUser.id === user.id)"
              @click.stop.prevent="deleteFollow(user.id)"
            >
              正在跟隨
            </button>
            <button
              class="card-button"
              v-else-if="!user.isFollowedByLoginUser && !(currentUser.id === user.id)"
              @click.stop.prevent="addFollow(user.id)"
            >
              跟隨
            </button>
          </div>
        </li>
      </ul>
      <div
        class="card-footer text-muted"
        v-if="isShowAll"
        @click="fetchMostFollowerUser(10)"
      >
        顯示更多
      </div>
      <div
        class="card-footer text-muted"
        v-else
        @click="fetchMostFollowerUser(5)"
      >
        顯示更少
      </div>
    </div>
  </div>
</template>
<script>
import usersAPI from "./../apis/users";
import { emptyImageFilter } from "./../utils/mixins";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";



export default {
  mixins: [emptyImageFilter],
  data() {
    return {
      users: [],
      isShowAll: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.fetchMostFollowerUser(5);
  },
  methods: {
    async fetchMostFollowerUser(userNumber) {
      try {
        const { data } = await usersAPI.getTopFollower();
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.users = data
          .sort((a, b) => {
            return b.followerCount - a.followerCount;
          })
          .slice(0, userNumber);
        this.isShowAll = !this.isShowAll;
      } catch (error) {
        console.log(error.message);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資訊，請稍後再試",
        });
      }
    },
    async addFollow(userId) {
      try {
        const id = userId.toString()
        const {data} = await usersAPI.addFollowing({id})
        if ( data.status !== 'success') {
          throw new Error(data.message)
        }
        this.users = this.users.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowedByLoginUser: true,
            };
          }
          return user;
        });
        this.$emit('after-add-follow-user')
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
        const {data} = await usersAPI.deleteFollowing({userId})
        if ( data.status !== 'success') {
          throw new Error(data.message)
        }
        this.users = this.users.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowedByLoginUser: false,
            };
          }
          return user;
        });
        this.$emit('after-delete-follow-user')
      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    },
  },
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
.card-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.card-text {
  font-size: 0.875rem;
  width: 100%;
  padding-left: .5rem;
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
