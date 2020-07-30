<template>
  <div class="container">
    <AdminNavbar :initial-now-page="nowPage"/>
    <div class="center  center-area" >
      <div class="Users">
        <div class="header-text">
          <p class="header-name pl-3">使用者列表</p>
        </div>
      </div>
      <Spinner v-if="isLoading" />
      <div class="user-cards " v-else>
        <AdminUserCards 
          v-for="User in Users" 
          :key="User.id" 
          :initial-user="User" 
          @after-delete-User="afterDeleteUser"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "./../components/AdminNavbar";
import AdminUserCards from "./../components/AdminUserCards";
import Spinner from "./../components/Spinner";
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'



export default {
  components: {
    AdminNavbar,
    AdminUserCards,
    Spinner
  },
  data() {
    return {
      Users: [],
      nowPage: 'users',
      isLoading: true,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const {data} = await adminAPI.getUsers()
        this.Users = data
        this.Users = this.Users.sort((a, b) => {
          return b.tweetCount - a.tweetCount
        })
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          titlw: '無法取得使用者資訊，請稍後再試'
        })
      }
    },
    afterDeleteUser (UserId) {
      this.Users = this.Users.filter(
        User => User.id !== UserId
      )
    }
  }
};
</script>

<style scoped>
.header-text {
  border-bottom: 1px solid var(--border-light-grey);
  width: 100%;
  height: 100%;
  line-height: 3.4375rem;
}
.header-name {
  font-weight: 500;
  font-size: 1.125rem;
  padding-left: 0.3rem;
}
.user-cards{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr))
}
</style>