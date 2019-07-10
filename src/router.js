import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'
import Map from './views/MapView.vue'
import MyEtag from './views/MyEtag.vue'

Vue.use(Router)

export default new Router({
  base: 'portal_vue',
  routes: [
    {
      path: '/',
      name: 'about',
      component: About
    },
    {
      path: '/map',
      name: 'map',
      component: Map
    },
    {
      path: '/myetag',
      name: 'myetag',
      component: MyEtag
    }
  ]
})
