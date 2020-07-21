<template>
  <div class="col-6" style="width: 18rem;">
    <div class="header">
      <button type="button" class="header-button" @click="$router.back()">&larr;</button>
      <div class="header-text m-3">
        <p class="header-name">name</p>
        <p class="header-userTweets">25推文</p>
      </div>
    </div>
    <img :src=" user.backgroundImage | emptyImage" class="card-img-top backgroundImage" alt="..." height="150px" />
    <div class="card-body">
      <img :src=" user.avatar | emptyImage" class="card-img-avatar" alt="..." height="140px" width="140px" />
      <button  
        class="btn btn-outline-primary edit-profile-button" 
        data-toggle="modal" 
        data-target="#user-edit-modal"
      >
        編輯個人資料
      </button>
      <div class="card-body-text">
        <h5 class="card-body-name">{{user.name}}</h5>
        <p class="card-body-account">{{user.account}}</p>
        <p
          class="card-body-introduction"
        >{{user.introduction}}</p>
      </div>
      <div class="card-body-follow">
        {{user.followingCount}} 個
        <p>跟隨中</p>{{user.followerCount}} 位
        <p>跟隨者</p>
      </div>
    </div>

    <ul class="nav nav-pills mb-4">
      <li class="nav-item ">
        <router-link class="nav-link active" :to="{ name: '' }">推文</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: '' }">推文和回覆</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: '' }">喜歡的內容</router-link>
      </li>
    </ul>
  </div>

</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";

export default {
  mixins: [emptyImageFilter],
  props: {
    user:{
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
}

.header-button {
  border: none;
  outline: none;
  background-color: white;
}

.header .header-name {
  font-size: 1.1875rem;
  line-height: 1.1878rem;
  font-weight: 900;
}
.header .header-userTweets {
  font-size: 0.8125rem;
  line-height: 0.8125rem;
  font-weight: 500;
  color: var(--form-text-color);
}
.card-body {
  position: relative;
  padding: 0 20px;
}
.card-img-avatar {
  border-radius: 100%;
  border: 4px solid #ffffff;
  position: absolute;
  transform: translateY(-50%);
  z-index: 999;
}
.card-body-text {
  padding-top: 75px;
}
.edit-profile-button {
  position: absolute;
  right: 10px;
  top: 10px;
  color: var(--orange);
  border-color: var(--orange);
  border-radius: 100px;
}
.edit-profile-button:hover, .edit-profile-button:active {
  background: var(--orange) !important;
  color: var(--form-background-color);
}

.card-body-follow {
  display: flex;
  margin: 1rem 0;
}
.card-body-follow p {
  color: var(--form-text-color);
  margin-right: 1.2rem;
}


.nav-item .active {
  background: var(--form-background-color);
  color: var(--orange);
  
}
</style>