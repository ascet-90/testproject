import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import GifSingle from './views/GifSingle.vue'
import AuthorPage from './views/AuthorPage.vue'

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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: "*",
      redirect: {name: 'home'}
    }
  ],
  mode: 'history'
})
