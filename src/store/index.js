import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: '',
      name: '',
      email: '',
      avatar: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    },
    revokeAuthentication (state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser ({commit}) {
      try {
        const tokenInLocalStorage =localStorage.getItem('token')
        let payload = tokenInLocalStorage.split('.').slice(1,2)
        let decodedData = window.atob(payload);
        let payloadObject = JSON.parse(decodedData)
        let userId = payloadObject.id

        const {data} = await usersAPI.get({userId})
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        console.log('current',data)
        const { id, name, email, isAdmin, avatar, account } = data
        commit('setCurrentUser', {
          id,
          name,
          email,
          isAdmin,
          avatar,
          account
        })
        return true
      } catch (error) {
        console.error('can not fetch user information')
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})
