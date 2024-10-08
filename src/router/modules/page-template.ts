import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

export default {
  path: '/PageTemplate',
  name: 'PageTemplate',
  component: Layout,
  meta: { title: '页面模板', icon: 'Copyright', alwaysShow: true },
  children: [
    {
      path: 'LoginTemplate01',
      name: 'LoginTemplate01',
      component: () => import('@/views/PageTemplate/LoginTemplate01/index.vue'),
      meta: { title: '登录模板01', icon: 'Coupon' },
    },
    {
      path: 'LoginTemplate02',
      name: 'LoginTemplate02',
      component: () => import('@/views/PageTemplate/LoginTemplate02/index.vue'),
      meta: { title: '登录模板02', icon: 'Coupon' },
    },
    {
      path: 'LoginTemplate03',
      name: 'LoginTemplate03',
      component: () => import('@/views/PageTemplate/LoginTemplate03/index.vue'),
      meta: { title: '登录模板03', icon: 'Coupon' },
    },
  ],
} as RouteRecordRaw
