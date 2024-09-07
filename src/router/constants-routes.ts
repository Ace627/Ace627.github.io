import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

/** 常驻路由 除了 redirect/403/404/login 等隐藏页面，其它页面建议设置 Name 属性 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    meta: { title: '登录', hidden: true },
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(`@/views/Dashboard/index.vue`),
        meta: { title: '首页', icon: 'Home' },
      },
    ],
  },

  // {
  //   path: '/External',
  //   name: 'External',
  //   component: Layout,
  //   meta: { title: '外链', alwaysShow: true },
  //   children: [
  //     {
  //       path: 'https://code.visualstudio.com/#alt-downloads',
  //       name: 'Visual Studio Code',
  //       component: () => {},
  //       meta: { title: 'Visual Studio Code' },
  //     },
  //   ],
  // },

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
