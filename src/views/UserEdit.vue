<template>
  <div class="container">
    <Navbar :initial-now-page="nowPage"/>
    <form class="w-100">
      <div class="form-width col-12 ">
        <div class="form-title  mt-4">
          <h3 class="title">帳戶設定</h3>
        </div>

        <div class="form-label-group text-center mb-3">
          <label class="input-title" for="account">帳號</label>
          <input
            id="account"
            v-model="User.account"
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
            v-model="User.name"
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
            v-model="User.email"
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
            v-model="User.password"
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
            v-model="User.passwordCheck"
            name="passwordCheck"
            type="password"
            placeholder
            autocomplete="new-password"
            required
          />
        </div>

        <button
          class="submit-button mb-3 action bottom-text-big"
          :disabled="isProcessing"
          type="submit"
          @click.stop.prevent="handleSubmit"
        >
          {{ isProcessing ? '處理中...' : '儲存'}}
        </button>


      </div>
    </form>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import { Toast } from "./../utils/helpers"

const dummyData = {
  'User': {
    'id': 1,
    'account': '@root',
    'name': 'root',
    'email': 'root@example.com',
    'password': '$2a$10$OJ3jR93XlEMrQtYMWO',
    'isAdmin': true,
    'image': 'https://i.imgur.com/58ImzMM.png',
    'createdAt': '2019-07-30T16:24:54.983Z',
    'updatedAt': '2019-08-01T10:33:51.095Z',
  }
}

export default {
  components: {
    Navbar
  },
  data () {
    return {
      User: {
        id: -1,
        account: '',
        name: '',
        email: '',
        password: '',
        passwordCheck: '',
      },
      isProcessing: false,
      nowPage: 'setting'
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchUser(id)
  },
  methods: {
    fetchUser (UserId) {
      console.log('fetchUser id:', UserId)
      // todo: 串接使用者 API
      const { User } = dummyData
      this.User = {
        ...this.User,
        id: User.id,
        account: User.account,
        name: User.name,
        email: User.email,
        password: User.password,
        passwordCheck: User.password
      }
    },
    async handleSubmit () {
      try {
        this.isProcessing = true
        if (!this.User.account || !this.User.name || !this.User.email || !this.User.password || !this.User.passwordCheck) {
          Toast.fire({
            icon: 'error',
            title: '請確認已填寫所有欄位'
          })
          this.isProcessing = false
          return
        } else if (this.User.password !== this.User.passwordCheck ) {
          Toast.fire({
            icon: 'error',
            title: '兩次輸入密碼不同'
          })
          this.isProcessing = false
          this.User.passwordCheck = ''
          return
        } 
        const data = JSON.stringify({
          account: this.User.account,
          name: this.User.name,
          email: this.User.email,
          password: this.User.password,
          passwordCheck: this.User.passwordCheck
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
          title: '儲存成功！'
        })

        this.$router.push({name: 'user-tweets'})
      } catch (error) {
        this.isProcessing = false
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法修改帳號，請稍後再試'
        })
      }
    }
  }
};
</script>

<style scoped>
.form-title {
  margin-bottom: 40px;
  border-bottom: 1px solid var(--border-light-grey);
}
input {
  width: 100%;
}

.submit-button {
  position: absolute;
  right: 15px;
}
</style>