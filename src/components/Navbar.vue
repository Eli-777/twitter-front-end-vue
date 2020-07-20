<template>
  <nav class="sidebar col-4">
    <div class="sidebar__icon">
      <router-link
        to="/"
      >
        <img src="./../assets/Icon@2x.png" class="icon">
      </router-link>

    </div>
    <div class="sidebar__menu">
      <div class="sidebar__menu__link" :class="{sidebarMenuLinkActive: isHome}" @click="showLight('home')">
        <img 
          class="img-icon"
          :src="homeImg"
          alt="home"
        />
        首頁
      </div>
      <div class="sidebar__menu__link" :class="{sidebarMenuLinkActive: isUser}" @click="showLight('user')">
        <img
          class="img-icon"
          :src="userImg"
          alt="user"
        />
        個人資料
      </div>
      <div class="sidebar__menu__link" :class="{sidebarMenuLinkActive: isSetting}" @click="showLight('setting')">
        <img
          class="img-icon"
          :src="settingImg"
          alt="setting"
        />
        設定
      </div>
      <button
        class="mb-5 action bottom-text-big"
        type="submit"
        @click.stop.prevent=""
      >推文</button>
    </div>
    <div class="sidebar__logout">
        <router-link to="/" class="sidebar__logout--link">
          <img src="./../assets/logout.png" alt="logout">
          <p>登出</p>
        </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      img: {
        isHome: require('@/assets/home-orange.png'),
        isNotHome: require('@/assets/home-black.png'),
        isUser: require('@/assets/user-orange.png'),
        isNotUser: require('@/assets/user-black.png'),
        isSetting: require('@/assets/setting-orange.png'),
        isNotSetting: require('@/assets/setting-black.png'),
      },
      homeImg: require('@/assets/home-orange.png'),
      userImg: require('@/assets/user-black.png'),
      settingImg: require('@/assets/setting-black.png'),
      isSlected: 'home',
      isHome: true,
      isUser: false,
      isSetting: false
    }
  },
  methods: {
    showLight (slect) {
      this.isSlected = slect
      if (this.isSlected === 'home'){
        this.isHome = true
        this.isUser = false
        this.isSetting = false
        this.homeImg = this.img.isHome
        this.userImg = this.img.isNotUser
        this.settingImg = this.img.isNotSetting
      } else if (this.isSlected === 'user') {
        this.isHome = false
        this.isUser = true
        this.isSetting = false
        this.homeImg = this.img.isNotHome
        this.userImg = this.img.isUser
        this.settingImg = this.img.isNotSetting
      } else if (this.isSlected === 'setting') {
        this.isHome = false
        this.isUser = false
        this.isSetting = true
        this.homeImg = this.img.isNotHome
        this.userImg = this.img.isNotUser
        this.settingImg = this.img.isSetting
      }
      
    }
  }
}
</script>

<style scoped>


.sidebar {
  display: flex;
  flex-direction: column;
  width: 210px;
  height: 100%;
  border: 1px solid var(--border-light-grey);
  padding: 30px 0;
}

.sidebar__icon {
  margin-bottom: 20px;
  display: block;
  padding: 0 20px;
}
.sidebar .sidebar__menu__link {
  display: block;
  padding: 20px;
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
}

.sidebarMenuLinkActive {
  color: var(--orange);
}


.icon, .img-icon {
  width: 30px;
  height: 30px;
}

button {
  width: 100%;
  height: 2.81rem;
}
</style>