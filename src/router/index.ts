import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AdminPage from '../views/AdminPage.vue'
import PrivacyPage from '../views/PrivacyPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyPage
    }
  ],
  scrollBehavior(to, _, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router