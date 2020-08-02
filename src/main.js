import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/application.css'
import store from './store'
// import VueSocketIO from 'vue-socket.io'
// import SocketIO from "socket.io-client"


// const tokenInLocalStorage = window.localStorage.getItem('token');
// console.log('token',tokenInLocalStorage)

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO('http://3b086c99eff5.ngrok.io',{ query: `token=${tokenInLocalStorage}`}),
//   vuex: {
//     store,
//     actionPrefix: 'SOCKET_',
//     mutationPrefix: 'SOCKET_'
//   },
//   options: { path: "/chatroom" }
// }))



// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO('http://localhost:4000/'),
//   vuex: {
//     store,
//     actionPrefix: 'SOCKET_',
//     mutationPrefix: 'SOCKET_'
//   }
// }))

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO('http://b195c310421c.ngrok.io/chats'),
//   vuex: {
//     store,
//     actionPrefix: 'SOCKET_',
//     mutationPrefix: 'SOCKET_'
//   }
// }))






// 讓瀏覽器的全域環境可以使用到 $
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

