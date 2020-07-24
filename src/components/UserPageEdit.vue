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
            <div class="form-group image-input">
              <img
                :src="user.backgroundImage | emptyImage"
                class="background-image"
                alt="background-image"
                width="100%"
                height="150px"
              />
              <input
                id="backgroundImage"
                type="file"
                name="backgroundImage"
                accept="image/*"
                class="form-control-file background-image-input"
                @change="handleFileChangeBImg"
              />
            </div>
            <div class="form-group image-input">
              <img
                :src="user.avatar | emptyImage"
                class="avator-image"
                alt="avatar"
                width="100px"
                height="100px"
              />
              <input
                id="avatar"
                type="file"
                name="avatar"
                accept="image/*"
                class="form-control-file avator-image-input"
                @change="handleFileChangePImg"
              />
            </div>
            <div class="user-input">
              <div class="form-label-group text-center mb-3">
                <label class="input-title" for="account">名稱</label>
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
                <label class="input-title" for="account">自我介紹</label>
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
        name: '',
        introduction: '',
        avatar: '',
        backgroundImage: '',
      })
    }
  },
  data() {
    return {
      user: {
        name: "",
        introduction: "",
        avatar: "",
        backgroundImage: "",
      },
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
      this.user.name = this.initialUser.name;
      this.user.introduction = this.initialUser.introduction;
      this.user.avatar = this.initialUser.avatar;
      this.user.backgroundImage = this.initialUser.backgroundImage;
    },
    handleFileChangeBImg(e) {
      // const files = e.target.files; // = filefist
      const { files } = e.target;
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
      const { files } = e.target;
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
          icon: "error",
          title: "請填寫名稱"
        });
      }

      const form = e.target; // <form></form>
      const formData = new FormData(form);
      this.$emit("after-submit", formData);
    }
  }
};
</script>

<style scoped>
.modal-header {
  align-items: center;
  padding: 0;
}
.modal-header-left {
  display: flex;
}
.image-input {
  position: relative;
}

.background-image,
.background-image-input {
  height: 150px;
}
.background-image-input {
  position: absolute;
  border: none;
  top: 0;
}

.avator-image,
.avator-image-input {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  border: 4px solid #ffffff;
  transform: translateY(-50%) translateX(5%);
}
.avator-image-input {
  position: absolute;
  top: 0;
}
input[type="file"] {
  opacity: 0;
}

#introduction,
#name {
  width: 100%;
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