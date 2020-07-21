<template>
  <div class="container">
    <Navbar :initial-now-page="nowPage" />
    <UserCard :user="User"/>
    <!-- modal 編輯使用者資料 -->
    <UserPageEdit :user="User" @after-submit="handleAfterSubmit"/>
    

  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import UserCard from "./../components/UserCard"
import UserPageEdit from "./../components/UserPageEdit"
import { Toast } from './../utils/helpers'

const dummyData = {
  'User': {
    "id": 1,
    "account": "使用者帳號",
    "name": "使用者姓名",
    "email": "使用者的電子信箱",
    "introduction": "使用者的自介",
    "avatar": "https://i.imgur.com/Q14p2le.jpg",
    "backgroundImage": "https://loremflickr.com/320/240/restaurant,food/?random=16.407932234411838",
    "followingCount": '12',
    "followerCount": '20',
    "tweetCount": '10',
    "isAdmin": false,
    "created_at": "2009-10-31T01:48:52Z",
    "updated_at": "2009-10-31T01:48:52Z"
  }
}



export default {
  components: {
    Navbar,
    UserCard,
    UserPageEdit,
  },
  data () {
    return {
      User: {},
      isProcessing: false,
      nowPage: 'profile'
    }
  },
  created () {
    this.fetchFeeds()
  },
  methods: {
    async fetchFeeds () {
      try {
        // const response = dummyData
        // const { user } = response.User
        console.log('user',dummyData)
        this.User = dummyData.User
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    },
    async handleAfterSubmit (formData) {
      try {
        this.isProcessing = true
        console.log('formdata',formData)
        // const { data } = await adminAPI.restaurants.update({ 
        //   restaurantId: this.restaurant.id, formData 
        // })

        // if (data.status !== 'success') {
        //   throw new Error(data.message)
        // }
        Toast.fire({
          icon: 'success',
          title: '更新成功'
        })

        this.$router.push({ name: 'user-tweets' })
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法更新個人資料，請稍後再試'
        })
      }
    },
  }
}
</script>