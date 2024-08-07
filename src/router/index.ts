import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { warning } from '@/utils/Message'
import i18n from '@/locales'

const { t } = i18n.global

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/user/nav/HomeViews.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/admin/LoginViews.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/home',
      component: () => import('@/views/admin/ManageContainer.vue'),
      children: [
        {
          path: '/admin/home',
          name: 'adminHome',
          component: () => import('@/views/admin/nav/HomeViews.vue')
        },
        {
          path: '/admin/navigation',
          name: 'adminNav',
          component: () => import('@/views/admin/nav/NavViews.vue')
        },
        {
          path: '/admin/category',
          name: 'adminCategory',
          component: () => import('@/views/admin/nav/CategoryViews.vue')
        },
        {
          path: '/admin/tag',
          name: 'adminTag',
          component: () => import('@/views/admin/nav/TagViews.vue')
        },
        {
          path: '/admin/user',
          name: 'adminUser',
          component: () => import('@/views/admin/nav/UserViews.vue')
        },
        {
          path: '/admin/search',
          name: 'adminSearch',
          component: () => import('@/views/admin/search/SearchViews.vue')
        },
        {
          path: '/admin/searchCategory',
          name: 'adminSearchCategory',
          component: () => import('@/views/admin/search/SearchCategoryViews.vue')
        }
      ]
    }
  ]
})

// 导航守卫
router.beforeEach((to) => {
  if (!to.path.startsWith('/admin')) return true

  const { token, temp_token } = useUserStore()
  if (token || temp_token) {
    return true
  } else {
    //未登录
    warning(t('error.not_login'))
    return {
      name: 'login',
      query: { redirect: to.name?.toString() }
    }
  }
})

export default router
