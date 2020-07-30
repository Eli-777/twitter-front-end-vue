<template>
  <div class="user-card">
    <div 
      class="background-Image" 
      :style="{ backgroundImage: `url(${user.cover } )`}"
      ></div>
    <div class="card-body">

       <img :src=" user.avatar | emptyImage" class="card-body-avatar" />
     
      <div class="card-body-text">
        <p class="card-body-name">{{user.name}}</p>
        <p class="card-body-account">@{{user.account}}</p>
      </div>
      <div class="card-body-icon">
          <button type="button" data-toggle="modal" data-target="#tweet-replied-modal">
            <img src="./../assets/tweet.png" alt />
          </button>
          {{user.tweetCount}}
          <button type="button">
            <img src="./../assets/like.png" alt />
          </button>
          {{user.likeCount}}
        </div>
      <div class="card-body-follow">
        
          {{user.followingCount}} 個
          <span>跟隨中</span>
      
          {{user.followerCount}} 位
          <span>跟隨者</span>

      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
export default {
  mixins: [emptyImageFilter],
  props: {
    initialUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      user: this.initialUser
    };
  },
  created () {
    this.noBackgroundImage()
  },
  methods: {
    noBackgroundImage () {
      if (!this.user.cover) {
        return this.user.cover ='https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
      } return
    }
  }
};
</script>

<style scoped>
.user-card {
  border: 1px solid var(--border-light-grey);
  border-radius: 10px;
  border-top: none;
  position: relative;
  width: 90%;
  padding: 0;
  margin: auto;
  margin-top: 1rem;
  background: var(--card-body-grey);
}
.background-Image{
  height: 8.75rem;
  width: 100%;
  background: no-repeat;
  background-size: cover;
  border-radius: 10px 10px 0 0;
}
.card-body{
  position: relative;
  padding: 0;
}
.card-body-avatar {
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  background: no-repeat;
  background-size: cover;
  position: absolute;
  left: 50%;
  top: -120%;
  transform: translateX(-50%);
  border: 2px solid white;
}
.card-body-text{
  margin-top: 4rem;
  text-align: center;
  font-size: .9375rem;
}
.card-body-name{
  font-weight: 900;
}
.card-body-account {
  color: var(--form-text-color);
}
.card-body-icon{
  text-align: center;
}
.card-body-icon button:hover{
  cursor: default;
}
.card-body-icon button {
  background-color: transparent;
  border: none;
  outline: none;
  font-size: .9375rem;
}
.card-body-icon button img {
  width: 1rem;
}
.card-body-follow {
  text-align: center;
  font-size: .875rem;
}
.card-body-follow span {
  color: var(--twitter-post-text-color-grey);
}
</style>