<template>
  <div class="login">
    <b-btn v-b-modal.modalLogin>Login</b-btn>

    <!-- Modal Component -->
    <b-modal id="modalLogin" title="Login" hide-footer="true">
      <b-form class="modal-content animate" v-bind:action="login_url" method="post">
        <input type='hidden' name='csrfmiddlewaretoken' v-bind:value='csrftoken' />
        <div class="container box">
          <b-label for="username"><b>Username</b></b-label>
          <input type="text" placeholder="Enter Username" name="username" required>

          <b-label for="password"><b>Password</b></b-label>
          <input type="password" placeholder="Enter Password" name="password" required>

          <b-button type="submit">Submit</b-button>
          <!--<b-button type="reset" @click="hideModal">Cancel</b-button>
          <label>
            <input type="checkbox" checked="checked" name="remember"> Remember me
          </label>-->
        </div>
      </b-form>
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
    },
    hideModal () {
      this.$root.$emit('bv::hide::modal','modalLogin')
    },
  }
}
</script>
<style>
  input[type=text],input[type=password],input[type=submit]{
    display:block;
    margin-bottom: 10px;
    border-radius: 2px;
    border: 1px solid rgba(0,0,0,0.2);
    padding:5px;
    box-shadow:inset rgba(38,39,42,0.09) 0 1px 4px;
    font-family:Ubuntu;
  }

  .box{
    border: 1px solid rgba(0,0,0,0.2);
    display:inline-block;
    border-radius: 2px;
    padding:50px 30px 30px;
    background-color: rgba(0,0,0,0.05);
  }
</style>