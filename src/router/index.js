import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import StartMessagePage from '../views/StartMessagePage.vue'
import AboutPage from '../views/AboutPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/start-message',
    name: 'start-message',
    component: StartMessagePage
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
