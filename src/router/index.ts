import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginViews.vue')
        }
    ]
})

// 导航守卫
router.beforeEach(to => {
    console.log(to.path)

    return true
})

export default router
