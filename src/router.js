import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import GifSingle from './views/GifSingle.vue'
import AuthorPage from './views/AuthorPage.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Home
    },
    {
      path: '/gif/:id',
      name: 'gif-single',
      component: GifSingle
    },
    {
      path: '/author/:gifId',
      name: AuthorPage,
      component: AuthorPage
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: "*",
      redirect: {name: 'home'}
    }
  ],
  mode: 'history'
})
