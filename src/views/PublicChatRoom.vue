<template>
  <div>
    <ul>
      <li>
        <h4>
          message
          <span>-- name</span>
        </h4>
      </li>
    </ul>
    <input type="text" placeholder="訊息" />
    <input type="text" placeholder="姓名" />
    <button @click="test1">送出</button>
  </div>
</template>

<script>
//import io from 'socket.io-client';

export default {
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    customEmit: function (data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)',
        data
      );
    },
    hello123: function (obj) {
      console.log('yo~',obj)
    }

  },
  data() {
    return {
      messages: [],
      temp: {},
      socket: null,
    };
  },
  mounted() {
    //socket = io("http://localhost:4000")
    console.log("this=", this);
    this.$socket.emit("sendMessage", {
      name: "majer",
      message: "hello everyone",
    });
    this.sockets.subscribe("allMessage", function (obj) {
      // this.messages = obj
      console.log(5678, obj);
    });

    this.$socket.on("hello123", function (obj) {
      // this.messages = obj
      console.log(5678, obj);
    });
  },
  methods: {
    test1() {
      console.log("hell0");
      this.$socket.emit("sendMessage", {
        name: "majer",
        message: "hello everyone",
      });
    },
  },
};
</script>