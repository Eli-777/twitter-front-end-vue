<template>
  <div class="container py-5">
    <form class="w-100">
      <Login :is-admin="isAdmin"/>
    </form>
  </div>
</template>

<script>
import Login from './../components/Login'

export default {
  components: {
    Login
  },
  data () {
    return {
      isAdmin: false,
    }
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-flow: column;
  align-items: center;
}

</style>