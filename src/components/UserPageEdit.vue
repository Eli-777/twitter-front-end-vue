<template>
  <div id="user-edit-modal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">編輯個人資料</h5>

         

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.stop.prevent="handleSubmit">
             <button
              class="mb-3 action bottom-text-big"
              :disabled="isProcessing"
              type="submit"
            >{{ isProcessing ? '處理中...' : '儲存'}}</button>
            <div class="form-group">
              <img :src="backgroundImage" alt="backgroundImage" width="100%" height="150px"/>
              <input
                id="backgroundImage"
                type="file"
                name="backgroundImage"
                accept="image/*"
                class="form-control-file"
                @change="handleFileChangeBImg"
              />
            </div>
            <div class="form-group">
              <img :src="avatar" alt="avatar" width="100px" height="100px"/>
              <input
                id="avatar"
                type="file"
                name="avatar"
                accept="image/*"
                class="form-control-file"
                @change="handleFileChangePImg"
              />
            </div>
    
            <div class="form-label-group text-center mb-3">
              <label class="input-title" for="account">名稱</label>
              <input
                id="name"
                v-model="name"
                name="name"
                type="text"
                placeholder
                autocomplete="name"
                maxlength="50"
                required
              />
            </div>
            <div class="form-label-group text-center mb-3">
              <label class="input-title" for="account">自我介紹</label>
              <input
                id="introduction"
                v-model="introduction"
                name="introduction"
                type="text"
                placeholder
                autocomplete="introduction"
                maxlength="160"
                required
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from './../utils/helpers'
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      name: "",
      introduction: "",
      avatar: "",
      backgroundImage: "",
      isProcessing: false
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      // console.log('fetchUser id:', UserId)
      // todo: 串接使用者 API
      this.name = this.user.name;
      this.introduction = this.user.introduction;
      this.avatar = this.user.avatar;
      this.backgroundImage = this.user.backgroundImage;
    },
    handleFileChangeBImg(e) {
      // const files = e.target.files; // = filefist
      const {files} = e.target
      console.log("files", files);
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.backgroundImage = "";
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0]);
        this.backgroundImage = imageURL;
      }
    },
    handleFileChangePImg(e) {
      // const files = e.target.files; // = filefist
      const {files} = e.target
      console.log("files", files);
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.avatar = "";
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0]);
        this.avatar = imageURL;
      }
    },
    handleSubmit(e) {
      if (!this.name) {
        Toast.fire({
          icon: 'error',
          title: '請填寫名稱'
        })
        return
      }

      const form = e.target; // <form></form>
      const formData = new FormData(form);
      this.$emit('after-submit', formData)
    }
  }
};
</script>