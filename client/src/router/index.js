import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/Index'
import Login from '@/components/Login'
import Tasks from '@/components/Tasks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: App
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks
    }
  ]
})
