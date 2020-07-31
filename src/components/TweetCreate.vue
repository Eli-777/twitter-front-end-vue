<template>
  <div id="tweet-create-modal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" @click="noTweet">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img :src="currentUser.avatar | emptyImage" />
          <form @submit.stop.prevent="handleSubmit">
            <textarea
              v-model="text"
              class="form-control"
              rows="3"
              placeholder="有什麼新鮮事？"
              maxlength="140"
            />
            <div>
              <button
                class="mb-3 action bottom-text-big"
                :disabled="isProcessing"
                type="submit"
              >{{ isProcessing ? '處理中...' : '推文'}}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "./../utils/helpers";
import { emptyImageFilter } from "./../utils/mixins";
import tweetsAPI from "./../apis/tweets";
import { mapState } from "vuex";
import $ from "jquery";

$("#tweet-create-modal").on("hide.bs.modal", function () {
  $(this).find('.modal-body textarea').html('')
});

export default {
  mixins: [emptyImageFilter],
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
            icon: "warning",
            title: "推文字數要在140以內唷",
          });
          return;
        }
        if (this.text.trim().length === 0) {
          Toast.fire({
            icon: "warning",
            title: "你的推文沒內容耶",
          });
          return;
        }

        const { data } = await tweetsAPI.create({ description: this.text });
        this.isProcessing = true;
        if (data.status === "success") {
          Toast.fire({
            icon: "success",
            title: "新增成功！",
          });
          $("#tweet-create-modal").modal("hide");
        }
        if (data.status !== "success") {
          throw Error(data.message);
        }
        this.$emit("after-create-tweet", {
          tweetId: data.id,
          description: this.text,
        });
        this.text = ""; // 將表單內的資料清空
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        console.error(error.message);
        Toast.fire({
          icon: "error",
          title: "無法新增評論，請稍後再試",
        });
      }
    },
    noTweet() {
      this.text = "";
    },
    clikeOutside() {},
  },
};
</script>

<style scoped>
.modal-header {
  display: flex;
  justify-content: flex-start;
}
.modal-body {
  display: flex;
  flex-direction: row;
}
.modal-body img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin: 0 0.3rem;
}
form {
  display: flex;
  width: 100%;
  flex-direction: row;
}
textarea {
  resize: none;
  border: transparent;
  box-shadow: none !important;
}
.modal-body button {
  width: max-content;
  margin-top: 100%;
}
.close span {
  color: var(--orange);
}
</style>