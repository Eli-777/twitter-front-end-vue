<template>
  <nav class="sidebar col-3">
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
        推文清單
      </div>
      <div class="sidebar__menu__link" :class="{sidebarMenuLinkActive: isUser}" @click="showLight('users')">
        <img
          class="img-icon"
          :src="userImg"
          alt="user"
        />
        使用者列表
      </div>
      <div class="sidebar__menu__link" :class="{sidebarMenuLinkActive: isSetting}" @click="showLight('setting')">
        <img
          class="img-icon"
          :src="settingImg"
          alt="setting"
        />
        設定   
      </div>
    </div>
    <div class="sidebar__logout">
        <router-link to="/" class="sidebar__logout--link">
          <img class="sidebar__logout-icon img-icon" src="./../assets/logout.png" alt="logout">
          <p>登出</p>
        </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    initialNowPage: {
      typr: Object,
      require: true
    }
  },
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
      nowPage: 'home',
      isHome: true,
      isUser: false,
      isSetting: false
    }
  },
  created () {
    this.showLight(this.initialNowPage)
  },
  methods: {
    showLight (slect) {
      this.nowPage = slect
      if (this.nowPage === 'home'){
        this.isHome = true
        this.isUser = false
        this.isSetting = false
        this.homeImg = this.img.isHome
        this.userImg = this.img.isNotUser
        this.settingImg = this.img.isNotSetting
        this.$router.push('/admin/tweets')
      } else if (this.nowPage === 'users') {
        this.isHome = false
        this.isUser = true
        this.isSetting = false
        this.homeImg = this.img.isNotHome
        this.userImg = this.img.isUser
        this.settingImg = this.img.isNotSetting
        this.$router.push('/admin/users')
      } else if (this.nowPage === 'setting') {
        this.isHome = false
        this.isUser = false
        this.isSetting = true
        this.homeImg = this.img.isNotHome
        this.userImg = this.img.isNotUser
        this.settingImg = this.img.isSetting
        this.$router.push('/admin/edit')
      }
      
    }
  }
}
</script>

<style scoped>


.sidebar {
  display: flex;
  position: fixed;
  flex-direction: column;
  width: 210px;
  height: 100%;
  border-right: 1px solid var(--border-light-grey);
  padding: 30px 10px;
}

.sidebar__icon {
  margin-bottom: 20px;
  display: block;
  padding: 0 .625rem;
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




</style>