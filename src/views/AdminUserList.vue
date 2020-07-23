<template>
  <div class="container">
    <AdminNavbar :initial-now-page="nowPage"/>
    <div class="center  center-area" >
      <div class="Users">
        <div class="header-text">
          <p class="header-name pl-3">使用者列表</p>
        </div>
      </div>
      <div class="user-cards ">
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

const dummyData = [
  {
    "id": 1,
    "account": "使用者帳號",
    "name": "使用者姓名",
    "email": "使用者的電子信箱",
    "introduction": "使用者的自介",
    "avatar": "https://i.imgur.com/Q14p2le.jpg",
    "backgroundImage": "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
    "followingCount": '12',
    "followerCount": '20',
    "tweetCount": '19',
    "likeCount": 40,
    "isAdmin": false,
    "created_at": "2009-10-31T01:48:52Z",
    "updated_at": "2009-10-31T01:48:52Z"
  },
  {
    "id": 2,
    "account": "使用者帳號2",
    "name": "使用者姓名2",
    "email": "使用者的電子信箱",
    "introduction": "使用者的自介",
    "avatar": "https://i.imgur.com/Q14p2le.jpg",
    "backgroundImage": "",
    "followingCount": '12',
    "followerCount": '20',
    "tweetCount": '10',
    "likeCount": 40,
    "isAdmin": false,
    "created_at": "2009-10-31T01:48:52Z",
    "updated_at": "2009-10-31T01:48:52Z"
  },
  {
    "id": 3,
    "account": "使用者帳號3",
    "name": "使用者姓名3",
    "email": "使用者的電子信箱",
    "introduction": "使用者的自介",
    "avatar": "",
    "backgroundImage": "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
    "followingCount": '12',
    "followerCount": '20',
    "tweetCount": '50',
    "likeCount": 40,
    "isAdmin": false,
    "created_at": "2009-10-31T01:48:52Z",
    "updated_at": "2009-10-31T01:48:52Z"
  },
  {
    "id": 4,
    "account": "使用者帳號4",
    "name": "使用者姓名4",
    "email": "使用者的電子信箱",
    "introduction": "使用者的自介",
    "avatar": "https://i.imgur.com/Q14p2le.jpg",
    "backgroundImage": "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
    "followingCount": '12',
    "followerCount": '20',
    "tweetCount": '10',
    "likeCount": 40,
    "isAdmin": false,
    "created_at": "2009-10-31T01:48:52Z",
    "updated_at": "2009-10-31T01:48:52Z"
  },
  {
    "id": 5,
    "account": "使用者帳號5",
    "name": "使用者姓名5",
    "email": "使用者的電子信箱",
    "introduction": "使用者的自介",
    "avatar": "https://i.imgur.com/Q14p2le.jpg",
    "backgroundImage": "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
    "followingCount": '12',
    "followerCount": '20',
    "tweetCount": '10',
    "likeCount": 0,
    "isAdmin": false,
    "created_at": "2009-10-31T01:48:52Z",
    "updated_at": "2009-10-31T01:48:52Z"
  },
  {
    "id": 6,
    "account": "使用者帳號6",
    "name": "使用者姓名6",
    "email": "使用者的電子信箱",
    "introduction": "使用者的自介",
    "avatar": "https://i.imgur.com/Q14p2le.jpg",
    "backgroundImage": "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
    "followingCount": '12',
    "followerCount": '20',
    "tweetCount": '2',
    "likeCount": 40,
    "isAdmin": false,
    "created_at": "2009-10-31T01:48:52Z",
    "updated_at": "2009-10-31T01:48:52Z"
  }
  
]

export default {
  components: {
    AdminNavbar,
    AdminUserCards
  },
  data() {
    return {
      Users: [],
      nowPage: 'users'
    };
  },
  created() {
    this.fetchUsers();
    console.log(this.Users)
  },
  methods: {
    fetchUsers() {
      this.Users = dummyData;
      this.Users = this.Users.sort((a, b) => {
        return b.tweetCount - a.tweetCount
      })
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
  grid-template-columns: 25% 25% 25% 25%;
}
</style>