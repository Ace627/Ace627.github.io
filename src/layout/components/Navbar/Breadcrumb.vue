<template>
  <el-breadcrumb class="flex-center h-[--app-navbar-height]">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index === breadcrumbList.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
defineOptions({ name: 'Breadcrumb' })
import { type RouteLocationMatched, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

/** 定义响应式数据 breadcrumbList，用于存储面包屑导航信息 */
const breadcrumbList = ref<RouteLocationMatched[]>([])

/** 获取面包屑导航信息 */
function getBreadcrumbList() {
  let matched = route.matched.filter((item) => item.meta && item.meta.title)
  const first = matched[0]
  first.path.toLowerCase() !== '/dashboard' && (matched = ([{ path: '/dashboard', meta: { title: '首页' } }] as unknown as RouteLocationMatched[]).concat(matched))
  breadcrumbList.value = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}

/** 处理面包屑导航点击事件 */
function handleLink(item: RouteLocationMatched) {
  const redirect = item.redirect as string
  if (item.path.toLowerCase() === '/dashboard') return router.push({ path: item.path })
  const path = redirect ? redirect : route.matched[0].children[0].path
  router.push({ path })
}

/** 监听路由变化，更新面包屑导航信息 */
watch(
  () => route.path,
  (newPath) => {
    if (newPath.toLowerCase().startsWith('/redirect/')) return void 0
    getBreadcrumbList()
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  .no-redirect {
    color: var(--el-text-color-placeholder);
  }
  a {
    font-weight: normal;
  }
}
</style>
