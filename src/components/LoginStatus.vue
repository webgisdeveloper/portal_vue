<template>
  <div class="loginStatus">
    <div v-if="user.loggedIn">
      {{ user.username }}
      Profile
      <!--<a href="/api/api-auth/logout/?next=/portal_vue/#">Signout</a>-->
      <button @click='logout()'>Signout</button>
    </div>
    <div v-else>
      <!--<a href="/api/api-auth/login/?next=/portal_vue/#">Login</a>-->
      <button @click='login()'>Login</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'LoginStatus',
  computed: mapState([
    'user'
  ]),
  methods: {
    ...mapMutations([
      'LOG_IN',
      'LOG_OUT'
    ]),
    ...mapActions([
      'log_in',
      'log_out'
    ]),
    login () {
      // console.log('login method')
      this.log_in()
    },
    logout () {
      // console.log('logout method')
      this.log_out()
    }
  }
}
</script>
