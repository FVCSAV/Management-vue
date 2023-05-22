import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect:"/login",
      component: ()=> import("@/layout/Layout.vue"),
      children:[
        {
          path: 'user',
          name: 'user',
          component: ()=> import("@/views/User.vue"),
        },{
          path: '/person',
          name: 'person',
          component: ()=> import("@/views/Person.vue")
        },{
          path: '/book',
          name: 'book',
          component: ()=> import("@/views/Book.vue")
        }
      ]
    },{
      path: '/login',
      name: 'login',
      component: ()=> import("@/views/Login.vue")
    },{
      path: '/register',
      name: 'register',
      component: ()=> import("@/views/Register.vue")
    }
  ]
})

export default router
