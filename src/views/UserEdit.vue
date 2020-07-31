<template>
  <div class="container">
    <Navbar :initial-now-page="nowPage" />
    <form class="center-area w-100" @submit.stop.prevent="handleSubmit">
      <div class="form-width col-12">
        <div class="form-title mt-4">
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
          <label class="input-title" for="name">名稱</label>
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
          <label class="input-title" for="email">Email</label>
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
          <label class="input-title" for="password">密碼</label>
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
          <label class="input-title" for="password-check">密碼確認</label>
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
        >{{ isProcessing ? '處理中...' : '儲存'}}</button>
      </div>
    </form>

    <TweetCreate />
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import TweetCreate from "./../components/TweetCreate";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    Navbar,
    TweetCreate,
  },
  data() {
    return {
      User: {
        id: -1,
        account: "",
        name: "",
        email: "",
        password: "",
        passwordCheck: "",
      },
      isProcessing: false,
      nowPage: "setting",
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      const data = this.currentUser;
      this.User = {
        ...this.User,
        id: data.id,
        account: data.account,
        name: data.name,
        email: data.email,
        password: data.password,
        passwordCheck: data.password,
      };
    },
    async handleSubmit() {
      try {
        this.isProcessing = true;
        if (
          !this.User.account ||
          !this.User.name ||
          !this.User.email ||
          !this.User.password ||
          !this.User.passwordCheck
        ) {
          Toast.fire({
            icon: "error",
            title: "請確認已填寫所有欄位",
          });
          this.isProcessing = false;
          return;
        } else if (this.User.password !== this.User.passwordCheck) {
          Toast.fire({
            icon: "error",
            title: "兩次輸入密碼不同",
          });
          this.isProcessing = false;
          this.User.passwordCheck = "";
          return;
        }

        const { data } = await usersAPI.update({
          userId: this.currentUser.id,
          account: this.User.account,
          name: this.User.name,
          email: this.User.email,
          password: this.User.password,
        });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.$store.commit("setCurrentUser", {
          id: this.User.id,
          account: this.User.account,
          name: this.User.name,
          email: this.User.email,
        });

        Toast.fire({
          icon: "success",
          title: "儲存成功！",
        });
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        console.error(error.message);
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
    },
  },
};
</script>

<style scoped>
.center-area {
  border-left: 1px solid var(--border-light-grey);
}
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