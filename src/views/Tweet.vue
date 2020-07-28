<template>
  <div class="container">
    <Navbar />
    <div class="center-area" style="width: 33rem;">
      <TweetCardDetail :initial-tweet="tweet" />
      <Spinner v-if="isLoading" />
      <template v-else>
        <!-- 回覆留言區 -->
        <RepliedCards v-for="replied in replieds" :key="replied.id" :initial-replied="replied" />
        <div v-if="!hasReplied" class="noReply">此推文還沒有人留言唷</div>
      </template>
    </div>
    <RepliedModal :tweet="tweet" @after-create-replied="afterCreateReplied" />
    <MostFollowerUserRecommend />
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import TweetCardDetail from "./../components/TweetCardDetail";
import RepliedCards from "./../components/RepliedCards";
import RepliedModal from "./../components/RepliedModal";
import MostFollowerUserRecommend from "./../components/MostFollowerUserRecommend";
import Spinner from "./../components/Spinner";
import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    Navbar,
    TweetCardDetail,
    RepliedCards,
    RepliedModal,
    MostFollowerUserRecommend,
    Spinner,
  },
  data() {
    return {
      tweet: {
        id: -1,
        description: "",
        commentCount: 0,
        likeCount: 0,
        isLikedByLoginUser: false,
        createdAt: "",
        updatedAt: "",
        User: {
          id: -1,
          name: "",
          avatar: "",
          account: "",
        },
      },
      replieds: [],
      hasReplied: true,
      isLoading: true,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const { id } = this.$route.params;
    console.log("id", id);
    this.fetchTweet(id);
    this.fetchReplies(id);
  },
  methods: {
    async fetchTweet(tweetId) {
      try {
        const { data } = await tweetsAPI.getTweet({ tweetId });
        const {
          id,
          description,
          commentCount,
          likeCount,
          isLikedByLoginUser,
          createdAt,
          User,
        } = data;
        this.tweet = {
          id,
          description,
          commentCount,
          likeCount,
          isLikedByLoginUser,
          createdAt,
          User,
        };

        if (data.status === "error") {
          throw new Error(data.message);
        }
        console.log("tweet", data);
      } catch (error) {
        console.log(error.message);
        Toast.fire({
          icon: "error",
          title: "無法取得該推文資料，請稍後再試",
        });
      }
    },
    async fetchReplies(tweetId) {
      try {
        const { data } = await tweetsAPI.getTweetReplies({ tweetId });
        this.replieds = data;
        if (data.status === "error") {
          throw new Error(data.message);
        }
        if (data.message === "推文尚未有任何回覆") {
          this.hasReplied = false;
        }
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error.message);
        Toast.fire({
          icon: "error",
          title: "無法取得該留言資料，請稍後再試",
        });
      }
    },
    afterCreateReplied(payload) {
      const { text } = payload;
      this.replieds.unshift({
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
          account: this.currentUser.account,
          avatar: this.currentUser.avatar,
        },
        comment: text,
        createdAt: new Date(),
      });
    },
  },
};
</script>

<style scoped>
.noReply {
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--form-text-color);
  margin: 2rem;
}
</style>