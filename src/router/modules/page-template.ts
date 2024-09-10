import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

export default {
  path: '/PageTemplate',
  name: 'PageTemplate',
  component: Layout,
  meta: { title: '页面模板', icon: 'VSCode', alwaysShow: true },
  children: [
    {
      path: 'LoginTemplate01',
      name: 'LoginTemplate01',
      component: () => import('@/views/PageTemplate/LoginTemplate01/index.vue'),
      meta: { title: '登录模板01', icon: 'Taichi' },
    },
  ],
} as RouteRecordRaw
