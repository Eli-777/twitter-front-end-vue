import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from './../views/NotFound.vue'
import SignIn from './../views/SignIn.vue'
import AdminSignIn from './../views/AdminSignIn.vue'
import UserTweets from './../views/UserTweets.vue'
import AdminTweets from './../views/AdminTweets.vue'
import store from './../store/index'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/users/tweets',
    name: 'users-tweets',
    component: UserTweets
  },
  {
    path: '/users/:id/edit',
    name: 'user-edit',
    component: () => import('../views/UserEdit.vue')
  },
  {
    path: '/users/:id/tweets',
    name: 'user-tweets',
    component: () => import('../views/UserProfilePage.vue')
  },
  {
    path: '/users/:id/follower',
    name: 'user-follower',
    component: () => import('../views/UserFollower.vue')
  },
  {
    path: '/users/:id/following',
    name: 'user-following',
    component: () => import('../views/UserFollowing.vue')
  },
  {
    path: '/tweets/:id',
    name: 'tweet',
    component: () => import('../views/Tweet.vue')
  },
  {
    path: '/admin/signin',
    name: 'admin-sign-in',
    component: AdminSignIn
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: AdminTweets
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUserList.vue')
  },
  {
    path: '/admin/edit',
    name: 'admin-edit',
    component: () => import('../views/AdminUserEdit.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach( async(to, from, next) => {
  // const token = localStorage.getItem('token')
  // let isAuthenticated = false

  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  // 比較 localStorage 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ['sign-up', 'sign-in']
  
  // 如果 token 無效則轉址到登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }
  // 如果 token 有效則轉址到首頁
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/users/tweets')
    return
  }
  next()
})

export default router
