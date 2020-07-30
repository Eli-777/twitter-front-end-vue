<template>
  <div class="tweetcard" v-if="replied">
    <router-link :to="{name: 'user-tweets', params: {id:replied.User.id}}">
      <img 
        class="tweetcard-avatar" 
        :src="replied.User.avatar | emptyImage" 
        width="50rem" 
        height="50rem" 
      />
    </router-link>
    <div class="tweetcard-right">
      <div class="tweetcard-title">
        {{replied.User.name}}
        <span class="tweetcard-account">
          @{{replied.User.account}}
          ．{{replied.createdAt | fromNow}}
        </span>
      </div>
      <div class="tweetcard-content">{{replied.comment}}</div>
      <div class="tweetcard-icon">
        <button type="button">
          <img src="./../assets/tweet.png" alt />
        </button>
        {{replied.commentCount | numberNotNull }}
        <button type="button" v-if="!replied.isLiked" @click.stop.prevent="addLike">
          <img src="./../assets/like.png" alt />
        </button>
        <button type="button" v-else @click.stop.prevent="deleteLike">
          <img src="./../assets/heart-red.png" alt />
        </button>
        {{replied.likeCount| numberNotNull }}
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";
import { emptyImageFilter } from "./../utils/mixins";

export default {
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
    initialReplied: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      replied: {
        id: -1,
        comment: '',
        createdAt: '',
        likedCount: 0,
        isLiked: false,
        User: {
          id: -1,
          name: '',
          account: '',
          avatar: '',

        }

      }
    };
  },
  watch: {
    initialReplied(newValue) {
      this.replied = {
        ...this.replied,
        ...newValue
      }
    }
  },
  created() {
    this.replied = this.initialReplied
  },
  methods: {
    addLike () {
      console.log(3343,this.initialReplied)
      this.replied.isLiked = true
      this.replied.likeCount = this.replied.likedCount +1 
    },
    deleteLike () {
      this.replied.isLiked = false
      this.replied.likeCount = this.replied.likedCount -1 
    }
  },
  filters: {
    numberNotNull (n) {
      return n ? n:0
    }
  }
};
</script>

<style scoped>
.tweetcard {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-light-grey);
}
.tweetcard-avatar {
  border-radius: 50%;
  margin: 1rem;
}
.tweetcard-account {
  color: var(--form-text-color);
}
.tweetcard-icon button {
  background-color: white;
  border: none;
  outline: none;
}
.tweetcard-icon button img {
  width: 1rem;
  height: 1rem;
}
</style>