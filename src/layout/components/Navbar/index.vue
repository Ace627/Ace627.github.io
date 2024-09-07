<template>
  <div class="navbar flex items-center relative">
    <!-- 侧栏折叠控制 -->
    <Hamburger class="navbar-item" v-if="appStore.isMobile" @toggleClick="appStore.toggleSidebar" />

    <!-- 系统 Logo -->
    <AppLogo />

    <!-- <div class="time">
      <el-text type="success">{{ time }}</el-text>
      <el-text type="primary">甲辰龙年</el-text>
      <el-text type="danger">{{ week }}</el-text>
    </div> -->

    <Sidebar class="ml-auto flex-1 flex justify-end" v-if="appStore.isDesktop" mode="horizontal" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Navbar' })
import dayjs from 'dayjs'
import Hamburger from './Hamburger.vue'
import { AppLogo, Sidebar } from '@/layout/components'

const appStore = useAppStore()
const time = ref<string>()
const week = ref<string>()

function updateTime() {
  week.value = `星期${['日', '一', '二', '三', '四', '五', '六'][dayjs().day()]}`
  time.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
  window.requestAnimationFrame(updateTime)
}

updateTime()
</script>

<style lang="scss" scoped>
.navbar {
  --el-menu-horizontal-height: var(--ap-navbar-height);
  --el-menu-item-height: var(--ap-navbar-height);
  --el-menu-text-color: var(--el-text-color-regular);
  // --el-menu-bg-color: transparent;
  // --el-menu-active-color: var(--ap-sidebar-active-color);
  height: var(--ap-navbar-height);
  background-color: rgba($color: #fff, $alpha: 0.6);
  backdrop-filter: blur(4px);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

/* 菜单项的通用样式 */
.navbar-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  transition: background-color var(--el-transition-duration-fast);
  &:hover {
    background-color: rgba(0, 21, 41, 0.08);
  }
}

.el-text + .el-text {
  margin-left: 8px;
}

.time {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  text-align: center;
}
</style>
