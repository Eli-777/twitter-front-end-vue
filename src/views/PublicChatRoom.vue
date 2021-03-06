<template>
  <div class="container">
    <Navbar :initial-now-page="nowPage" />
    <div class="center-area chat-person">
      <h5 class="title">上線使用者({{onlineUsers.length}})</h5>
      <div class="chat-person-area">
        <ul>
          <li class="chat-person-block" v-for="onlineUser in onlineUsers" :key="onlineUser.id">
            <img class="chat-person-avatar" :src="onlineUser.avatar | emptyImage" />
            <p class="chat-person-name">{{onlineUser.name}}</p>
            <p class="chat-person-account">@{{onlineUser.account}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="right-area chat-room">
      <h5 class="title">公開聊天室</h5>
      <!-- <div class="chat-room-scroll"> -->
      <div class="chat-room-message" @scroll="detect">
        <ul>
          <li
            v-for="message in messages"
            :key="message.messageId"
            :class="{myMessage: message.id === currentUser.id, otherMessage: message.id !== currentUser.id}"
          >
            <div class="talk-line" v-if="!message.isUserLoginLogout">
              <img
                class="chat-room-message-avatar"
                :src="message.avatar | emptyImage "
                v-if="message.id !== currentUser.id"
              />
              <div
                class="chat-room-message-name"
                v-if="message.id !== currentUser.id"
              >{{message.name}}</div>
              <div class="talk">{{message.content}}</div>
            </div>
            <p class="time" v-if="!message.isUserLoginLogout">{{message.time | fromNow}}</p>
            <div class="login-logout-area">
              <p class="login-logout" v-if="message.isUserLoginLogout">{{message.name}}</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- </div> -->
      <div class="chat-room-type-area">
        <textarea
          class="chat-room-type-input"
          v-model="temp.content"
          type="text"
          placeholder="輸入訊息..."
        />
        <button type="button" class="chat-room-type-button" @click="messageOut">
          <span class="material-icons">send</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import moment from "moment";
import { emptyImageFilter } from "./../utils/mixins";
import { mapState } from "vuex";


import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";
import Vue from "vue";
const tokenInLocalStorage = window.localStorage.getItem("token");
console.log("token", tokenInLocalStorage);

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO("https://simple-twitter-jez.herokuapp.com/", {
      query: `token=${tokenInLocalStorage}`,
    }),
    vuex: {
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
    options: { path: "/chatroom" },
  })
);

export default {
  mixins: [emptyImageFilter],
  components: {
    Navbar,
  },
  sockets: {
    //建立連線時
    connect: function () {
      console.log("socket connected");
    },
    disconnect: function () {
      console.log("socket disconnected");
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  data() {
    return {
      nowPage: "chatroom",
      User: {},
      messages: [],
      onlineUsers: [],
      temp: {},
      isTop: false,
    };
  },

  mounted() {
    this.$socket.connect();

    this.$socket.emit("login", { ...this.currentUser });
 
    this.sockets.subscribe("message", function (obj) {
      console.log("收到訊息了", obj);
      let speaker = this.onlineUsers.find(
        (onlineuser) => onlineuser.id === obj.id
      );
      console.log("speaker", speaker);
      if (!speaker) {
        speaker = "";
      }
      obj = {
        ...obj,
        avatar: speaker.avatar | "",
        name: speaker.name,
      };
      this.messages.push(obj);
    });
    this.sockets.subscribe("old-message", function (objs) {
      this.messagesId += 1;
      console.log("收到舊訊息", objs);
      objs = objs.map((obj) => {
        this.messages.unshift(obj);
      });
      console.log("oldMessages=", this.messages);
    });

   
    this.sockets.subscribe("online-users", function (obj) {
      this.onlineUsers = obj;
      console.log(obj, "收到上線使用者清單", this.onlineUsers);
    });
    this.sockets.subscribe("new-user", function (obj) {
      console.log("收到上線使用者");
      obj = {
        ...obj,
        name: obj.name + " " + "上線",
        isUserLoginLogout: true,
      };
      this.messages.push(obj);
    });
    this.sockets.subscribe("logout", function (obj) {
      console.log("收到下線使用者");
      obj = {
        ...obj,
        name: obj.name + " " + "下線",
        isUserLoginLogout: true,
      };
      this.messages.push(obj);
    });
  },
  beforeDestroy() {
    this.$socket.emit("logout", { ...this.currentUser });
    this.$socket.disconnect();
    console.log("socket disconnected");
  },
  methods: {
    messageOut() {
      this.temp = {
        ...this.temp,
      };
      this.$socket.emit("send", this.temp);
      this.temp.content = "";
    },
    detect(e) {
      let intElemScrollTop = e.srcElement.scrollTop;
      let lastMessages = this.messages.slice(0, 1);
      let lastMessagesId = lastMessages[0].messageId;
      console.log("最後的訊息", lastMessages);
      console.log("最後的訊息id", lastMessagesId);

      lastMessagesId -= 1;
      if (intElemScrollTop < 10 && lastMessagesId > 0) {
        this.$socket.emit("old-message", {
          startId: lastMessagesId,
          count: 10,
        });
      }

      console.log(intElemScrollTop);
    },
  },
  filters: {
    fromNow(datetime) {
      moment.locale("zh-tw");
      return datetime ? moment(datetime).calendar() : "-";
    },
  },
};
</script>

<style scoped>
.center-area {
  width: 20rem;
}

.chat-person {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.title {
  border: 1px solid var(--border-light-grey);
  border-left: none;
  padding: 8px;
  font-size: 1rem;
  display: flex;
}
.chat-person-area {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
.chat-person-block {
  border: 1px solid var(--border-light-grey);
  border-left: none;
  border-right: none;
  display: flex;
  align-items: center;
  white-space: pre-wrap;
  word-break: break-all;
}
.chat-person-avatar {
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
}
.chat-person-name {
  font-size: 1.125rem;
  width: 3rem;
}
.chat-person-account {
  font-size: 0.8125rem;
  color: var(--twitter-post-text-color-grey);
  margin-left: -0.5rem;
}
.chat-person-avatar,
.chat-person-name,
.chat-person-account {
  margin: 0.5rem;
}

.chat-room {
  width: 100%;
  max-width: 50rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}
/* .chat-room-scroll {
  height: 100%;
  overflow-y: scroll;
} */
.chat-room-message {
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
  /* flex: 0 0 auto; */
}
.chat-room-type-area {
  border: 1px solid var(--twitter-post-text-color-grey);
}

.chat-room-message-avatar {
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  margin-left: 0.3125rem;
}
.chat-room-message-name {
  color: var(--twitter-post-text-color-grey);
  margin: 0 0 0 2px;
}

/***** 對話框設定 ******/
.otherMessage {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.otherMessage .talk-line {
  display: flex;
  align-items: flex-end !important;
  max-width: 50%;
}

.otherMessage .talk {
  background-color: var(--border-light-grey);
  border-radius: 15px 15px 15px 0;
  white-space: pre-wrap;
  word-break: break-all;
  display: flex;
  padding: 0.3rem 0.5rem;
  margin: 0 0 0px 5px;
}
.otherMessage .time {
  margin-left: 2.3125rem;
  color: var(--twitter-post-text-color-grey);
  font-size: 0.8125rem;
  margin-bottom: 5px;
}

.myMessage {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.myMessage .talk-line {
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end !important;
}

.myMessage .talk {
  color: white;
  background-color: var(--orange);
  border-radius: 15px 15px 0 15px;
  white-space: pre-wrap;
  word-break: break-all;
  display: flex;
  padding: 0.3rem 0.5rem;
  max-width: 50%;
  margin-right: 0.5rem;
}
.myMessage .time {
  display: flex;
  justify-content: flex-end !important;
  color: var(--twitter-post-text-color-grey);
  font-size: 0.8125rem;
  margin-right: 0.5rem;
}

.login-logout-area {
  width: 100%;
  display: flex;
  justify-content: center;
}
.login-logout {
  border-radius: 50px;
  padding: 0.1rem 0.6rem;
  background-color: var(--border-light-grey);
  color: var(--twitter-post-text-color-grey);
  margin: 10px;
  font-size: 0.812rem;
}
/***** 對話框設定end ******/

.chat-room-type-area {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-light-grey);
  border-left: none;
}

.chat-room-type-input {
  width: 100%;
  background-color: var(--form-background-color);
  border: 1px solid var(--border-light-grey);
  border-radius: 50px;
  padding-left: 1rem;
  margin: 10px;
  height: 30px;
  white-space: pre-wrap;
  word-break: break-all;
  resize: none;
}
.chat-room-type-button {
  padding: 0;
  border: none;
  margin: 0 0.5rem 0 0;
  background-color: transparent;
  height: 24px;
}
.material-icons {
  color: var(--orange);
}
</style>