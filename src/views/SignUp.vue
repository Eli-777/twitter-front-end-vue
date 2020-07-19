<template>
  <div class="container py-5">
    <form class="w-100">
      <div class="form-width col-10 col-sm-6">
        <div class="text-center mb-4">
          <img class="icon" src="./../../public/acIcon@2x.png" />
          <h1 class="title">建立你的帳號</h1>
        </div>

        <div class="form-label-group text-center mb-3">
          <label class="input-title" for="account">帳號</label>
          <input
            id="account"
            v-model="account"
            name="account"
            type="text"
            placeholder
            autocomplete="account"
            required
            autofocus
          />
        </div>

        <div class="form-label-group text-center mb-3">
          <label class="input-title" for="account">名稱</label>
          <input
            id="name"
            v-model="name"
            name="name"
            type="text"
            placeholder
            autocomplete="name"
            required
          />
        </div>

        <div class="form-label-group text-center mb-3">
          <label class="input-title" for="account">Email</label>
          <input
            id="email"
            v-model="email"
            name="email"
            type="email"
            placeholder
            autocomplete="email"
            required
          />
        </div>

        <div class="form-label-group text-center mb-3">
          <label class="input-title" for="account">密碼</label>
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            placeholder
            autocomplete="new-password"
            required
          />
        </div>

        <div class="form-label-group text-center mb-4">
          <label class="input-title" for="password">密碼確認</label>
          <input
            id="password-check"
            v-model="passwordCheck"
            name="passwordCheck"
            type="password"
            placeholder
            autocomplete="new-password"
            required
          />
        </div>

        <button
          class="mb-3 action bottom-text-big"
          :disabled="isProcessing"
          type="submit"
          @click.stop.prevent="handleSubmit"
        >{{ isProcessing ? '處理中...' : '註冊'}}</button>

        <div class="router text-center mb-3">
          <p>
            <router-link  to="/signin">取消</router-link>
          </p>
        </div>

        <p class="mt-5 mb-3 text-muted text-center">&copy; 2020</p>
      </div>
    </form>
  </div>
</template>


<script>
import { Toast } from './../utils/helpers'

export default {
  data () {
    return {
      account: '',
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit () {
      try {
        this.isProcessing = true
        if (!this.account || !this.name || !this.email || !this.password || !this.passwordCheck) {
          Toast.fire({
            icon: 'error',
            title: '請確認已填寫所有欄位'
          })
          this.isProcessing = false
          return
        } else if (this.password !== this.passwordCheck ) {
          Toast.fire({
            icon: 'error',
            title: '兩次輸入密碼不同'
          })
          this.isProcessing = false
          this.passwordCheck = ''
          return
        } 
        const data = JSON.stringify({
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck
        })

        // TODO: 向後端驗證使用者登入資訊是否合法
        console.log('data', data)
        /* const {data} = await authorizationAPI.signUp({ 
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck
         }) */

        // if (data.status !== 'success'){
        //   throw new Error(data.message)
        // }

        Toast.fire({
          icon: 'success',
          title: '註冊成功！'
        })

        this.$router.push('/signin')
      } catch (error) {
        this.isProcessing = false
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法新增帳號，請稍後再試'
        })
      }
    }
  }
}
</script>


<style scoped>
form {
  display: flex;
  flex-flow: column;
  align-items: center;
}
.icon {
  width: 40px;
  height: 40px;
  margin-bottom: 1.875rem;
}
.title {
  font-weight: 1.4375rem;
  font-weight: bold;
  margin-bottom: 1.25rem;
}
input {
  width: 100%;
}
button {
  width: 100%;
  height: 3.125rem;
}


</style>