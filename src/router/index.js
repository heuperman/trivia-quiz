import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import('../views/QuestionsView.vue')
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('../views/ResultView.vue')
    }
  ]
})

export default router
