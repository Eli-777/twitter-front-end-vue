<template>
  <nav class="left-area sidebar col-3">
    <div class="sidebar__icon">
      <router-link to="/">
        <img src="./../assets/Icon@2x.png" class="icon" />
      </router-link>
    </div>
    <div class="sidebar__menu">
      <router-link :to="{name: 'users-tweets'}">
        <div
          class="sidebar__menu__link"
          :class="{sidebarMenuLinkActive: isHome}"
          @click="showLight('home')"
        >
          <img class="img-icon" :src="homeImg" alt="home" />
          首頁
        </div>
      </router-link>
      <router-link :to="{name: 'user-profile'}">
        <div
          class="sidebar__menu__link"
          :class="{sidebarMenuLinkActive: isUser}"
          @click="showLight('profile')"
        >
          <img class="img-icon" :src="userImg" alt="user" />
          個人資料
        </div>
      </router-link>
      <router-link :to="{name: 'user-edit' }">
        <div
          class="sidebar__menu__link"
          :class="{sidebarMenuLinkActive: isSetting}"
          @click="showLight('setting')"
        >
          <img class="img-icon" :src="settingImg" alt="setting" />
          設定
        </div>
      </router-link>
      <button
        class="mb-5 action bottom-text-big"
        data-toggle="modal"
        data-target="#tweet-create-modal"
      >推文</button>
    </div>
    <div class="sidebar__logout">
      <button type="button" class="sidebar__logout--link" @click="logout">
        <img class="sidebar__logout-icon img-icon" src="./../assets/logout.png" alt="logout" />
        <p>登出</p>
      </button>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    initialNowPage: {
      typr: Object,
      require: true,
    },
  },
  data() {
    return {
      img: {
        isHome: require("@/assets/home-orange.png"),
        isNotHome: require("@/assets/home-black.png"),
        isUser: require("@/assets/user-orange.png"),
        isNotUser: require("@/assets/user-black.png"),
        isSetting: require("@/assets/setting-orange.png"),
        isNotSetting: require("@/assets/setting-black.png"),
      },
      homeImg: require("@/assets/home-orange.png"),
      userImg: require("@/assets/user-black.png"),
      settingImg: require("@/assets/setting-black.png"),
      nowPage: "home",
      isHome: true,
      isUser: false,
      isSetting: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.showLight(this.initialNowPage);
  },
  methods: {
    showLight(slect) {
      this.nowPage = slect;
      if (this.nowPage === "home") {
        this.isHome = true;
        this.isUser = false;
        this.isSetting = false;
        this.homeImg = this.img.isHome;
        this.userImg = this.img.isNotUser;
        this.settingImg = this.img.isNotSetting;
      } else if (this.nowPage === "profile") {
        this.isHome = false;
        this.isUser = true;
        this.isSetting = false;
        this.homeImg = this.img.isNotHome;
        this.userImg = this.img.isUser;
        this.settingImg = this.img.isNotSetting;
      } else if (this.nowPage === "setting") {
        this.isHome = false;
        this.isUser = false;
        this.isSetting = true;
        this.homeImg = this.img.isNotHome;
        this.userImg = this.img.isNotUser;
        this.settingImg = this.img.isSetting;
      }
    },
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/signin");
    },
  },
};
</script>

<style scoped>
.sidebar {
  display: flex;
  position: fixed;
  flex-direction: column;
  width: 210px;
  height: 100%;
  /* border-right: 1px solid var(--border-light-grey); */
  padding: 30px 10px;
}

.sidebar__icon {
  margin-bottom: 20px;
  display: block;
  padding: 0 0.625rem;
}
.sidebar .sidebar__menu__link {
  display: block;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.sidebar__logout {
  position: absolute;
  bottom: 20px;
  width: 100%;
}

.sidebar__logout--link {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: var(--black);
  font-weight: bold;
  font-size: 18px;
  width: 100px;
  background-color: transparent;
  border: none;
}

.sidebarMenuLinkActive {
  color: var(--orange);
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}
.img-icon {
  width: 1.25rem;
  height: 1.25rem;
}

button {
  width: 100%;
  height: 2.81rem;
}
</style>