import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/PlannerShell.vue'),
    },
    {
      path: '/to-do',
      name: 'todo',
      component: () => import('@/views/ToDo.vue'),
    },
  ],
})

export default router
