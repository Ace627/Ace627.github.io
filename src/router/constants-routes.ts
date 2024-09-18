import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

const modules: Record<string, { default: RouteRecordRaw }> = import.meta.glob('./modules/*.ts', { eager: true })
const patchRoutes = Object.keys(modules).map((key) => modules[key].default)

/** 常驻路由 除了 redirect/403/404/login 等隐藏页面，其它页面建议设置 Name 属性 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    meta: { title: '登录', hidden: true },
  },

  {
    path: '/',
    component: Layout,
    redirect: '/Dashboard',
    children: [
      {
        path: 'Dashboard',
        name: 'Dashboard',
        component: () => import(`@/views/Dashboard/index.vue`),
        meta: { title: '首页', icon: 'Home' },
      },
      {
        path: 'About',
        name: 'About',
        component: () => import('@/views/System/About/index.vue'),
        meta: { title: '关于', hidden: true },
      },
    ],
  },

  ...patchRoutes,

  {
    path: '/redirect',
    component: Layout,
    meta: { title: '路由重定向', hidden: true },
    children: [{ path: '/redirect/:path(.*)', component: () => import('@/views/Redirect/index.vue') }],
  },

  // The not found page must be placed last
  {
    path: '/404',
    component: () => import('@/views/ExceptionPage/NotFound.vue'),
    meta: { title: 'NotFound', hidden: true },
    alias: '/:pathMatch(.*)*',
  },
]
