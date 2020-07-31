<template>
  <form @submit.stop.prevent="handleSubmit">
    <div id="user-edit-modal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-header-left">
              <button
                type="button"
                class="button-x modal-title"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h5 class="modal-title ml-4">編輯個人資料</h5>
            </div>
            <button
              class="m-2 mr-3 action bottom-text-big modal-title"
              :disabled="isProcessing"
              type="submit"
            >{{ isProcessing ? '處理中...' : '儲存'}}</button>
          </div>
          <div class="modal-body">
            <div class="form-group image-input cover-input">
              <i class="material-icons cover-icon">camera_enhance </i>
              <img
                :src="user.cover | emptyImage"
                class="cover-image"
                alt="cover-image"
                width="100%"
                height="150px"
              />
              <input
                id="backgroundImage"
                type="file"
                name="cover"
                accept="image/*"
                class="form-control-file cover-image-input"
                @change="handleFileChangeBImg"
              />
            </div>
            <div class="form-group image-input">
              <div class="avatar-input"></div>
              <i class="material-icons avatar-icon">camera_enhance</i>
              <img
                :src="user.avatar | emptyImage"
                class="avatar-image"
                alt="avatar"
                width="100px"
                height="100px"
              />
              <input
                id="avatar"
                type="file"
                name="avatar"
                accept="image/*"
                class="form-control-file avatar-image-input"
                @change="handleFileChangePImg"
              />
            </div>
            <div class="user-input">
              <div class="form-label-group text-center mb-3">
                <label class="input-title" for="name">名稱</label>
                <input
                  id="name"
                  v-model="user.name"
                  name="name"
                  type="text"
                  placeholder
                  autocomplete="name"
                  maxlength="50"
                  required
                />
              </div>
              <div class="form-label-group text-center">
                <label class="input-title" for="introduction">自我介紹</label>
                <textarea
                  id="introduction"
                  v-model="user.introduction"
                  name="introduction"
                  type="text"
                  placeholder
                  autocomplete="introduction"
                  maxlength="160"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { Toast } from "./../utils/helpers";
import { emptyImageFilter } from "./../utils/mixins";
export default {
  mixins: [emptyImageFilter],
  props: {
    initialUser: {
      type: Object,
      default: () => ({
        name: "",
        introduction: "",
        avatar: "",
        cover: "",
      }),
    },
    initialIsProcessing: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      user: {
        name: "",
        introduction: "",
        avatar: "",
        cover: "",
      },
      isProcessing: false,
    };
  },
  watch: {
    initialUser(newValue) {
      this.user = {
        ...this.user,
        ...newValue,
      };
    },
    initialIsProcessing(newValue) {
      this.isProcessing = newValue;
    },
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.user.name = this.initialUser.name;
      this.user.introduction = this.initialUser.introduction;
      this.user.avatar = this.initialUser.avatar;
      this.user.cover = this.initialUser.cover;
    },
    handleFileChangeBImg(e) {
      // const files = e.target.files; // = filefist
      const { files } = e.target;
      console.log("files", files);
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.user.cover = "";
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0]);
        this.user.cover = imageURL;
      }
    },
    handleFileChangePImg(e) {
      // const files = e.target.files; // = filefist
      const { files } = e.target;
      console.log("files", files);
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.user.avatar = "";
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0]);
        this.user.avatar = imageURL;
      }
    },
    handleSubmit(e) {
      if (!this.user.name) {
        Toast.fire({
          icon: "error",
          title: "請填寫名稱",
        });
      }

      const form = e.target; // <form></form>
      const formData = new FormData(form);
      this.$emit("after-submit", formData);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
.material-icons { 
  color: rgb(129, 126, 126); 
  position: absolute;
  z-index: 10;
  
}
.cover-icon {
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.avatar-icon {
  left: 43px;
  transform: translateY(-50%) translateX(5%);
}
.cover-image, .avatar-image {
  opacity: 0.5;
}
.cover-input, .avatar-input {
  background: white;
}
.avatar-image-input:hover, .cover-image-input {
  cursor: pointer;
}
.avatar-input {
  position: absolute;
  top: 0;
  z-index: -1;
}
.button-x {
  margin-left: 10px;
}

.modal-header {
  align-items: center;
  padding: 0;
}
.modal-header-left {
  display: flex;
}
.image-input {
  position: relative;
  z-index: 99;
}

.cover-image,
.cover-image-input {
  height: 150px;
}
.cover-image-input {
  position: absolute;
  border: none;
  top: 0;
  z-index: 999;
}

.avatar-image,
.avatar-image-input,
.avatar-input {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  border: 4px solid #ffffff;
  transform: translateY(-50%) translateX(5%);
}
.avatar-image-input {
  position: absolute;
  top: 0;
  z-index: 990;
}
input[type="file"] {
  opacity: 0;
}

#introduction,
#name {
  width: 100%;
}
.user-input {
  z-index: 999;
}

#introduction {
  height: 150px;
  border: 0;
  border-bottom: var(--form-text-color) 2px solid;
  border-radius: 0.25rem;
  background-color: var(--form-background-color);
  color: var(--form-text-color);
  padding-left: 4.375rem;
  resize: none;
}
.user-input {
  position: relative;
  top: -60px;
  height: 170px;
}
</style>