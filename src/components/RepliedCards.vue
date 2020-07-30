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
        <button type="button" v-if="!replied.isLiked" @click.stop.prevent="addLike(replied.id)">
          <img src="./../assets/like.png" alt />
        </button>
        <button type="button" v-else @click.stop.prevent="deleteLike(replied.id)">
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
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

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
    console.log('inititla',this.initialReplied)
  },
  methods: {
    async addLike (replyId) {
      try {
        const {data} = await usersAPI.addReplyLiked({replyId})
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        console.log(3343,this.initialReplied)
        this.replied.isLiked = true
        this.replied.likeCount = this.replied.likedCount +1 
      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法對回覆按讚，請稍後再試'
        })
      }

    },
    async deleteLike (replyId) {
      try {
        const {data} = await usersAPI.deleteReplyLiked({replyId})
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        console.log(3343,this.initialReplied)
        this.replied.isLiked = false
        this.replied.likeCount = this.replied.likedCount -1
      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法對回覆按讚，請稍後再試'
        })
      }
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