<template>
  <div id="tweet-create-modal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img :src="user.avatar" />
          <form @submit.stop.prevent="handleSubmit">
            <textarea
              v-model="text"
              class="form-control"
              rows="3"
              placeholder="有什麼新鮮事？"
              maxlength="140"
            />
            <div>
              <button
                class="mb-3 action bottom-text-big"
                :disabled="isProcessing"
                type="submit"
              >{{ isProcessing ? '處理中...' : '推文'}}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  data () {
    return {
      user: {
        id: -1,
        avatar: ''
      },
      text: '',
      isProcessing: false
    }
  },
  created (){
    this.fetchUser()
  },
  methods: {
    fetchUser () {
      const response = dummyData
      this.user.id = response.User.id
      this.user.avatar = response.User.avatar
    },
    async handleSubmit () {
      try {
        // const { data } = await commentsAPI.create({ restaurantId: this.restaurantId, text: this.text })
        this.isProcessing = true
        const data = {
          status: 'success'
        }
        if (data.status !== 'success') {
          throw Error(data.message)
        }
        this.$emit('after-create-tweet', {
          restaurantId: data.restaurantId,
          text: this.text
        })
        this.text = '' // 將表單內的資料清空
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法新增評論，請稍後再試'
        })
      } 
    }
  }
  
}
</script>

<style scoped>
.modal-body {
  display: flex;
  flex-direction: row;
}
.modal-body img{
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin: 0.3rem;
}
form {
  display: flex; 
  width: 100%;
  flex-direction: row;
}
textarea {
  resize: none;
  border: transparent;
}
.modal-body button {
  width: max-content;
  margin-top: 100%;
}
</style>