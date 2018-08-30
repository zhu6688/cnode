import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Articles from '../components/article'
import Detail from '../components/detail'
import User from '../components/user'
import Login from '../components/login'
export default new Router({
  routes: [
    { path:'/', component:Articles },
    { path:'/detail', component: Detail },
    { path:'/user/:name' , component:User },
    { path:'/login',component:Login,props:true,beforeEnter(to,from,next){
      localStorage.setItem('path',from.fullPath)
      next();
    }}
  ]
})
