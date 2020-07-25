import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
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
        const { currentUser } = this.state
        const userId = currentUser.id
        const {data} = await usersAPI.get({userId})
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        const { id, name, email, isAdmin } = data
        commit('setCurrentUser', {
          id,
          name,
          email,
          isAdmin
        })
        return true
      } catch (error) {
        // console.error(error.message)
        console.error('can not fetch user information')
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})
