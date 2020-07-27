<template>
  <div id="tweet-replied-modal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="tweet-original mb-3">
            <img :src="tweet.User.avator | emptyImage" />
            <div class="tweet-original-right">
              <p>
                {{tweet.User.name}}
                <span>{{tweet.User.account}}．{{tweet.created_at | fromNow}}</span>
              </p>
              <div class="tweet-original-right-description">
                <p>{{tweet.description}}</p>
                <p class="tweet-original-right-replyTo">
                  <span>回覆給</span>
                  {{tweet.User.account}}
                </p>
              </div>
            </div>
          </div>
          <div class="current-user">
            <img :src="currentUser.avatar | emptyImage" />
            <form @submit.stop.prevent="handleSubmit">
              <textarea
                v-model="text"
                class="form-control"
                rows="3"
                placeholder="推你的回覆？"
                maxlength="140"
              />
              <div class="reply-button">
                <button
                  class="action bottom-text-big"
                  :disabled="isProcessing"
                  type="submit"
                >{{ isProcessing ? '處理中...' : '回覆'}}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";
import { emptyImageFilter } from "./../utils/mixins";
import { mapState } from "vuex";
import { Toast } from './../utils/helpers'
import repliedsAPI from './../apis/replieds'

export default {
  mixins: [fromNowFilter, emptyImageFilter],
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      text: "",
      isProcessing: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.text.length > 140) {
          Toast.fire({
            icon: 'warning',
            title: '回覆字數要在140以內唷'
          })
          return
        }
        if (this.text.trim().length === 0) {
          Toast.fire({
            icon: 'warning',
            title: '你的回覆沒內容耶'
          })
          return
        }
        console.log("submit");
        console.log('this tweet id', this.tweet.id,'this text',this.text)
        const {data} = await repliedsAPI.create({tweetId: this.tweet.id, comment: this.text})
        if (data.status === 'error') {
          throw Error(data.message)
        }
        this.$emit("after-create-replied", {
          text: this.text,
        });
        this.text = ""; // 將表單內的資料清空
      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法回復推文，請稍後再試'
        })
      }
    },
  },
};
</script>

<style scoped>
.tweet-original,
.current-user {
  display: flex;
  flex-direction: row;
}
.tweet-original-right {
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  word-break: break-all;
}
.tweet-original img,
.current-user img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin: 0.3rem;
}

.tweet-original-right p span {
  color: var(--twitter-post-text-color-grey);
}
.tweet-original-right-replyTo {
  color: var(--orange);
  font-size: 0.8125rem;
}
.tweet-original-right-description{
  padding-left: 6px;
}
form {
  width: 100%;
}
textarea, textarea:focus {
  resize: none;
  border: transparent;
  box-shadow: none;
}
.reply-button {
  width: max-content;
  margin-left: 100%;
  transform: translateX(-100%);
}
</style>