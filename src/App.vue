<!--

This is the main page for the application.

-->
<template>
  <div id="app">
    <b-container fluid>
      <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">{{ title }}</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <LoginStatus/>
          </b-navbar-nav>

        </b-collapse>

      </b-navbar>
      <b-card no-body class="mh-100">
        <b-tabs card>
          <b-tab title="About" active class="mh-100">
            <about/>
          </b-tab>
          <b-tab title="Map" @click="resizeMap" style="height: 500px;">
            <mapview ref="MapView"></mapview>
          </b-tab>
          <b-tab title="My ETAG Data" v-if="user.loggedIn">
            <myetag/>
          </b-tab>
          <!--<b-tab title="Profile" v-if="user.loggedIn">
            <profile/>
          </b-tab>-->
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginStatus from '@/components/LoginStatus.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import About from '@/views/About'
import Mapview from '@/views/MapView'
import Myetag from '@/views/MyEtag'
import Profile from '@/views/Profile'
export default {
  computed: mapState([
    'title',
    'user'
  ]),
  components: {
    LoginStatus,
    About,
    Mapview,
    Myetag,
    Profile
  },
  methods: {
    ...mapMutations([
      'SET_CSRF_TOKEN',
      'GET_ANIMALS',
      'GET_LOCATIONS',
      'GET_TAGS'
    ]),
    ...mapActions([
      'set_csrf_token',
      'get_animals',
      'get_locations',
      'get_tags',
      'log_in'
    ]),
    resizeMap () {
      // This is a fix to redraw the leaflet map
      setTimeout(() => {
        console.log(this.$refs.MapView)
        this.$refs.MapView.resizeMap()
      }, 0)
    }
  },
  mounted() {
    this.set_csrf_token()
    this.log_in()
    this.get_animals()
    this.get_locations()
    this.get_tags()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
