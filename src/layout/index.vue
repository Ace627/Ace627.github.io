<template>
  <div class="layout-top clearFix" :class="classes">
    <Sidebar v-if="appStore.isMobile" />

    <!-- mobile 端侧边栏遮罩层 -->
    <div v-if="appStore.isMobile && appStore.sidebar.opened" class="drawer-bg" @click="appStore.closeSidebar(false)"></div>

    <el-container>
      <el-header :class="{ 'fixed-header': settingStore.fixedHeader }" class="p-none">
        <Navbar />
      </el-header>

      <AppMain />
    </el-container>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
import { AppMain, Navbar, Sidebar } from './components'

/** Layout 布局响应式 */
useResize()

/** 读取 Pinia 仓库 */
const appStore = useAppStore()
const settingStore = useSettingStore()
console.log('appStore: ', appStore)

/** 用来添加到根组件的动态类的集合 */
const classes = computed(() => [
  appStore.device,
  { 'open-sidebar': appStore.sidebar.opened },
  { 'hide-sidebar': !appStore.sidebar.opened },
  { withoutAnimation: appStore.sidebar.withoutAnimation },
])
</script>

<style lang="scss" scoped>
.layout-top {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 左侧边栏抽屉背景遮罩 */
.layout-top .drawer-bg {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: var(--el-overlay-color-lighter);
  overflow: hidden;
}

/* 侧边栏默认样式 */
.layout-top .sidebar-container {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1001;
  width: var(--ap-sidebar-width);
  height: 100%;
  color: var(--ap-text-color-sidebar);
  background-color: var(--ap-bg-color-sidebar, #262935);
  transition: width var(--el-transition-duration);
  backdrop-filter: blur(8px);
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  overflow: hidden;
}

/* 内容区固定头部的基础样式 */
.layout-top .fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  transition: width var(--el-transition-duration);
}

/* 主体内容区基础样式 */
.layout-top .app-main {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.layout-top .fixed-header + .app-main {
  padding-top: var(--ap-header-height);
}

/* 移动端模式 && 侧栏折叠 */
.layout-top.hide-sidebar.mobile .sidebar-container {
  width: 0;
  pointer-events: none;
}

/* 防止移动端侧栏遮罩层出来后 依旧可以滚动页面的问题 */
.layout-top.mobile.open-sidebar {
  position: fixed;
  top: 0;
}

/* 移除侧栏和主容器的过渡效果 */
.layout-top.withoutAnimation .sidebar-container,
.layout-top.withoutAnimation .main-container {
  transition: none;
}
</style>
