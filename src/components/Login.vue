<template>
  <div class="form-width col-10 col-sm-6">
    <div class="text-center mb-4">
      <img class="icon" src="./../../public/acIcon@2x.png" />
      <h1 class="title">{{!isAdmin ? '登入 Alphitter' : '後台登入' }}</h1>
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

    <div class="form-label-group text-center mb-4">
      <label class="input-title" for="password">密碼</label>
      <input
        id="password"
        v-model="password"
        name="password"
        type="password"
        placeholder
        autocomplete="current-password"
        required
      />
    </div>

    <button
      class="mb-5 action bottom-text-big"
      :disabled="isProcessing"
      type="submit"
      @click.stop.prevent="handleSubmit"
    >{{ isProcessing ? '登錄中...' : '登入'}}</button>

    <div class="router text-center mb-3">
      <p>
        <router-link v-if="!isAdmin" to="/signup">註冊 Alphitter．</router-link>
        <router-link v-if="!isAdmin" to="/admin/signin" >後台登入</router-link>
        <router-link v-else to="/signin" >前台登入</router-link>
      </p>
    </div>

    <p class="mt-5 mb-3 text-muted text-center">&copy; 2020</p>
  </div>
</template>

<script>
export default {
  props:{
    isAdmin: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      account: '',
      password: '',
      isProcessing: false,
    }
  },
  methods: {
    handleSubmit () {
      const data = JSON.stringify({
        account: this.account,
        password: this.password
      })

      // TODO: 向後端驗證使用者登入資訊是否合法
      console.log('data', data)
      if (this.isAdmin) return this.$router.push("/admin/tweets")
      return this.$router.push("/users/tweets")
    }
  }
}
</script>

<style scoped>
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
.router {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
