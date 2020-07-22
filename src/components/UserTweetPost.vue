<template>
  <div class="header">
    <div class="header-text mr-3 mt-3 mb-3">
      <p class="header-name">首頁</p>
    </div>

    <div class="card">
      <img :src="user.avatar" />
      <form @submit.stop.prevent="handleSubmit">
        <textarea 
          v-model="text"
          class="form-control" 
          rows="3" 
          placeholder="有什麼新鮮事？" 
          maxlength="160"
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

export default {
  props: {
    user: { 
      type: Object,
      required: true
    }
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
/* .header {
  position: fixed;
  height: 170px;
  z-index: 999;
} */
.header-name{
  font-weight: 500;
}
.card {
  display: flex;
  flex-direction: row;
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
  border: transparent;
}
.card button {
  width: max-content;
  margin-top: 100%;
}
</style>