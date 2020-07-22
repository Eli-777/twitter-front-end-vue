<template>
  <div id="tweet-replied-modal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="tweet-original mb-3">
            <img :src="tweet.user.avator | emptyImage" />
            <div class="tweet-original-right">
              <p>
                {{tweet.user.name}}   <span>{{tweet.user.account}}．{{tweet.created_at | fromNow}}</span>
              </p>
              <p>{{tweet.description}}</p>
              <p class="tweet-original-right-replyTo"><span>回覆給</span> {{tweet.user.account}}</p>
              
            </div>
          </div>
          <div class="current-user">
            <img :src="currentUser.avatar | emptyImage" />
            <form @submit.stop.prevent="handleSubmit">
              <textarea
                v-model="text"
                class="form-control"
                rows="3"
                placeholder="推你的回覆？"
                maxlength="160"
              />
              <div class="reply-button">
                <button
                  class="  action bottom-text-big"
                  :disabled="isProcessing"
                  type="submit"
                >{{ isProcessing ? '處理中...' : '回覆'}}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
import { emptyImageFilter } from './../utils/mixins'

const dummyUser = {
  currentUser: {
    id: 1,
    name: '管理者',
    email: 'root@example.com',
    avator: 'https://i.pravatar.cc/300',
    isAdmin: true
  },
  isAuthenticated: true
}

export default {
  mixins: [ fromNowFilter, emptyImageFilter ],
  props: {
    tweet:{
      type: Object,
      required: true
    }
  },
  data () {
    return {
      text: '',
      currentUser:{
        id: -1,
        avator: ''
      },
      isProcessing: false
    }
  },
  created () {
    this.fetchCurrentUser()
  },
  methods: {
    fetchCurrentUser () {
      const data = dummyUser
      this.currentUser.id = data.currentUser.id
      this.currentUser.avator = data.currentUser.avator
    },
    handleSubmit () {
      console.log('submit')
      // TODO: 向 API 發送 POST 請求
      // 伺服器新增 Comment 成功後...
      this.$emit('after-create-replied', {
        repliedId: 1, // 尚未串接 API 暫時使用隨機的 id
        tweetId: this.tweet.UserId,
        text: this.text
      })
      this.text = '' // 將表單內的資料清空
    }
  }
}
</script>

<style scoped>
.tweet-original, .current-user {
  display: flex;
  flex-direction: row;
}
.tweet-original-right{
  display: flex;
  flex-direction: column;
}
.tweet-original img, .current-user img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin: 0.3rem;
}

.tweet-original-right p span {
  color: var(--twitter-post-text-color-grey)
}
.tweet-original-right-replyTo {
  color: var(--orange);
  font-size: .8125rem;
}
form {
  width: 100%;
}
textarea {
  resize: none;
  border: transparent;
}
.reply-button{
  width: max-content;
  margin-left: 100%;
  transform: translateX(-100%);
}

</style>