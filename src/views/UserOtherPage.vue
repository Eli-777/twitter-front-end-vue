<template>
  <div class="container">
    <Navbar  />
    <UserCard :initial-user="User"/>
    <MostFollowerUserRecommend />
    <!-- modal 編輯使用者資料 -->
    <UserPageEdit :initial-user="User" @after-submit="handleAfterSubmit"/>
    
    <TweetCreate />
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
// import UserCard from "./../components/UserCard"
import UserCard from "./../components/UserCard"
import TweetCreate from "./../components/TweetCreate"
import UserPageEdit from "./../components/UserPageEdit"
import MostFollowerUserRecommend from './../components/MostFollowerUserRecommend' 
import { Toast } from './../utils/helpers'
import usersAPI from './../apis/users'




export default {
  components: {
    Navbar,
    UserCard,
    TweetCreate,
    UserPageEdit,
    MostFollowerUserRecommend
  },
  data () {
    return {
      User: {},
      isProcessing: false,
      nowPage: 'profile',
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchUser(id)
  },
  methods: {
    async fetchUser (userId) {
      try {
        const { data } = await usersAPI.get({userId})
        this.User = data
      
        console.log('fetchUser id:', data)

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
        for (let [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }
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
        // this.$router.push({ name: 'user-tweets' })
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