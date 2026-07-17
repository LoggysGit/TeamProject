import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/AuthorizationView.vue'
import ProfileView from '../views/ProfileView.vue'
import TeamlistView from '../views/TeamlistView.vue'
import CompetitionsView from '../views/CompetitionsView.vue'
import ContactView from '../views/ContactsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/teamlist',
      name: 'teamlist',
      component: TeamlistView
    },
    {
      path: '/competitions',
      name: 'competitions',
      component: CompetitionsView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactView
    }
  ]
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('user_token') 

    if (to.meta.requiresAuth && !isAuthenticated) { next({ name: 'login' }) } 
    else { next() }
})

export default router