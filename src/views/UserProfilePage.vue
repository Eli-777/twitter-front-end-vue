<template>
  <div class="container">
    <Navbar :initial-now-page="nowPage" />
    <CurrentUserCard :initial-user="User" :key="componentKey" />
    <MostFollowerUserRecommend @after-add-follow-user="afteraddFollowUser" @after-delete-follow-user="afterdeleteFollowUser"/>
    <!-- modal 編輯使用者資料 -->
    <UserPageEdit
      :initial-user="User"
      :initial-is-processing="isProcessing"
      @after-submit="handleAfterSubmit"
    />

    <TweetCreate @after-create-tweet="afterCreateTweet" />
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import CurrentUserCard from "./../components/CurrentUserCard";
import UserPageEdit from "./../components/UserPageEdit";
import TweetCreate from "./../components/TweetCreate";
import MostFollowerUserRecommend from "./../components/MostFollowerUserRecommend";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
import $ from "jquery";

export default {
  components: {
    Navbar,
    CurrentUserCard,
    UserPageEdit,
    TweetCreate,
    MostFollowerUserRecommend,
  },
  data() {
    return {
      User: {},
      isProcessing: false,
      nowPage: "profile",
      isLoading: true,
      componentKey: 0,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const userId = this.currentUser.id;
        const { data } = await usersAPI.get({ userId });
        console.log('isdata',data)
        this.User = data;
      } catch (error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試",
        });
      }
    },
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true;
        console.log("formdata", formData);
        for (let [name, value] of formData.entries()) {
          console.log(name + ": " + value);
        }

        const { data } = await usersAPI.updateProfile({
          userId: this.currentUser.id,
          formData,
        });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        console.log("updata", data);
        Toast.fire({
          icon: "success",
          title: "更新成功",
        });
        $("#user-edit-modal").modal("hide");
        this.fetchUser();
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法更新個人資料，請稍後再試",
        });
      }
    },
    afterCreateTweet() {
      this.componentKey += 1;  
    },
    afteraddFollowUser() {
      this.User.followingCount += 1
    },
    afterdeleteFollowUser() {
      this.User.followingCount -= 1
    }
  },
};
</script>
