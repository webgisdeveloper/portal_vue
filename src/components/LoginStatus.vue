<template>
  <div class="loginStatus">
    <b-nav-item-dropdown right v-if="user.loggedIn">
      <template slot="button-content">
        <em>{{ user.username }}</em>
      </template>
      <!--<b-dropdown-item><Profile/></b-dropdown-item>-->
      <!--<a href="/api/api-auth/logout/?next=/portal_vue/#">Signout</a>-->
      <b-dropdown-item  @click='logout()'>Signout</b-dropdown-item>
    </b-nav-item-dropdown>
    <div v-else>
      <!--<a href="/api/api-auth/login/?next=/portal_vue/#">Login</a>-->
      <a @click="login()">Login</a>
      <Login/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Login from '@/components/Login.vue'

export default {
  name: 'LoginStatus',
  computed: mapState([
    'user'
  ]),
  components: {
    Login
  },
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
