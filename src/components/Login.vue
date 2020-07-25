<template>
  <form class="w-100" @submit.stop.prevent="handleSubmit">
    <div class="form-width col-10 col-sm-6">
      <div class="text-center mb-4">
        <img class="icon" src="./../../public/acIcon@2x.png" />
        <h1 class="title">{{!isAdmin ? '登入 Alphitter' : '後台登入' }}</h1>
      </div>

      <div class="form-label-group text-center mb-3">
        <label class="input-title" for="email">Email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          placeholder
          autocomplete="email"
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
        
      >{{ isProcessing ? '登錄中...' : '登入'}}</button>

      <div class="router text-center mb-3">
        <p>
          <router-link v-if="!isAdmin" to="/signup">註冊 Alphitter．</router-link>
          <router-link v-if="!isAdmin" to="/admin/signin">後台登入</router-link>
          <router-link v-else to="/signin">前台登入</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2020</p>
    </div>
  </form>
</template>


<script>
import authorizationAPI from './../apis/authorization'
import { Toast } from "./../utils/helpers";

export default {
  props: {
    isAdmin: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false,
    };
  },
  methods: {
     async handleSubmit() {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請填入 email 和 password"
          })
          return
        }
        this.isProcessing = true
        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password
        })

        const { data } = response
        if (data.status !== "success") {
          throw new Error(data.message)
        }
        
        // 登入成功後就拿 token 並存入 Vuex 中
        const login = () => {
          // 將資料轉到 Vuex 中
          this.$store.commit('setCurrentUser', data.user)
          localStorage.setItem("token", data.token)
          console.log('data=',data)
        }

        //進入前台頁面並且不是管理員身份才可進入
        if (!this.isAdmin && !data.user.isAdmin) {
          login()
          this.$router.push('/users/tweets')
        } else if (this.isAdmin && data.user.isAdmin) {
          //進入後台頁面並且是管理員身份才可進入
          login()
          this.$router.push('/admin/tweets')
        } else {
          throw new Error()
        }

      } catch (error) {
        this.isProcessing = false
        this.password = "";
        Toast.fire({
          icon: "warning",
          title: "請確認您輸入了正確的帳號密碼"
        });
        this.isProcessing = false;
        console.log("error", error);

      }
    }
  }
};
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
a, a:hover {
  color: blue;
}
</style>
