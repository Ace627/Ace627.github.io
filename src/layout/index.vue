<template>
  <div class="layout-top clearFix" :class="classes">
    <Sidebar v-if="appStore.isMobile" class="sidebar-container" />

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

/** 读取 Pinia 仓库 */
const appStore = useAppStore()
const settingStore = useSettingStore()

/** 用来添加到根组件的动态类的集合 */
const classes = computed(() => [
  appStore.device,
  { 'open-sidebar': appStore.sidebar.opened },
  { 'hide-sidebar': !appStore.sidebar.opened },
  { withoutAnimation: appStore.sidebar.withoutAnimation },
])
</script>

<style lang="scss" scoped></style>
