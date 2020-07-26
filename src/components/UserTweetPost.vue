<template>
  <div class="header">
    <div class="header-text mr-3 ">
      <p class="header-name">首頁</p>
    </div>

    <div class="card">
      <img :src="currentUser.avatar | emptyImage" />
      <form @submit.stop.prevent="handleSubmit">
        <textarea 
          v-model="text"
          class="form-control " 
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
</template>

<script>
import { Toast } from './../utils/helpers'
import { emptyImageFilter } from './../utils/mixins'
import { mapState } from 'vuex'
import tweetsAPI from './../apis/tweets'

export default {
  mixins: [ emptyImageFilter ],
  computed: {
    ...mapState(['currentUser'])
  },
  data () {
    return {
      text: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit () {
      try {
        if (this.text.length > 140) {
          Toast.fire({
            icon: 'warning',
            title: '推文字數要在140以內唷'
          })
          return
        }
        if (this.text.trim().length === 0) {
          Toast.fire({
            icon: 'warning',
            title: '你的推文沒內容耶'
          })
          return
        }
        const { data } = await tweetsAPI.create({  description: this.text })
        this.isProcessing = true
        console.log('creat',data)
        if (data.status !== 'success') {
          throw Error(data.message)
        }
        this.$emit('after-create-tweet', {
          tweetId: data.id,
          description: this.text
        })
        this.text = '' // 將表單內的資料清空
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法新增推文，請稍後再試'
        })
      } 
    }
  }
}
</script>

<style scoped>
/* .header {
  position: fixed;
  width: 61.7vh;
  z-index: 999;
} */
.header-text{
  width: 100%;
  height: 100%;
  line-height: 3.4375rem;
  border-bottom: 1px solid var(--border-light-grey)
}
.header-name{
  font-weight: 500;
  font-size: 1.125rem;
  padding-left: .3rem;
}
.card {
  display: flex;
  flex-direction: row;
  border-radius: 0;
  border: 0;
  border-bottom: 1px solid var(--border-light-grey)
}
.card img {
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
  border: 0px solid transparent;
  outline: none;  
}

.card button {
  width: max-content;
  margin-top: 100%;
}
</style>