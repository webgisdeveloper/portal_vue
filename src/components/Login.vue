<template>
  <div class="login">
    <b-btn v-b-modal.modalLogin>Login</b-btn>

    <!-- Modal Component -->
    <b-modal id="modalLogin" title="Bootstrap-Vue">
      <form class="modal-content animate" v-bind:action="login_url" method="post">
        <input type='hidden' name='csrfmiddlewaretoken' v-bind:value='csrftoken' />
        <div class="container">
          <label for="username"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="username" required>

          <label for="password"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" required>

          <input type="hidden" >

          <button type="submit">Login</button>
          <!--<label>
            <input type="checkbox" checked="checked" name="remember"> Remember me
          </label>-->
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'LoginStatus',
  computed: mapState([
    'user',
    'login_url',
    'csrftoken'
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
