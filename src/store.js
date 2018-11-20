import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'Electronic Transponder Analysis Gateway Data Portal',
    user: {
      loggedIn: false,
      username: '',
      firstname: '',
      lastname: ''
    },
    csrftoken: ''
  },
  mutations: {
    LOG_IN: (state) => {
      state.user.loggedIn = true
      state.user.username = 'admin'
      state.user.firstname = 'Admin'
      state.user.lastname = 'Admin'
    },
    LOG_OUT: (state) => {
      state.user.loggedIn = false
      state.user.username = ''
      state.user.firstname = ''
      state.user.lastname = ''
    },
    SET_CSRF_TOKEN: (state) => {
      function getCookie (cname) {
        let name = cname + '='
        let decodedCookie = decodeURIComponent(document.cookie)
        let ca = decodedCookie.split(';')
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i]
          while (c.charAt(0) === ' ') {
            c = c.substring(1)
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length)
          }
        }
        return ''
      }
      state.csrftoken = getCookie('csrftoken')
    }
  },
  actions: {
    log_in: (context) => {
      context.commit('LOG_IN')
    },
    log_out: (context) => {
      context.commit('LOG_OUT')
    },
    set_csrf_token: (context) => {
      context.commit('SET_CSRF_TOKEN')
    }
  }
})
