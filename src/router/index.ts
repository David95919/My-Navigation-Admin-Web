import {createRouter, createWebHistory} from 'vue-router'
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/userStore";
import {warning} from "@/utils/Message";
import i18n from "@/locales";

const {t} = i18n.global


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginViews.vue')
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('@/views/UserViews.vue')
        }
    ]
})

const publicPathList: string[] = ['/login']

// 导航守卫
router.beforeEach(to => {
    //是否是公开页面
    if (publicPathList.includes(to.path)) return true

    const refs = storeToRefs(useUserStore());
    if (refs.token.value) {
        return true
    } else {
        //未登录
        warning(t('error.not_login'))
        return {
            name: 'login', query: {redirect: to.name?.toString()}
        }
    }
})

export default router
