<template>
  <Sidebar class="sidebar-container" />

  <!-- mobile 端侧边栏遮罩层 -->
  <div v-if="appStore.isMobile && appStore.sidebar.opened" class="drawer-bg" @click="appStore.closeSidebar(false)"></div>

  <div class="main-container">
    <header :class="{ 'fixed-header': settingStore.fixedHeader }">
      <Navbar />
    </header>

    <AppMain />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'LayoutClassic' })
import { AppMain, Navbar, Sidebar } from '@/layout/components'

const appStore = useAppStore()
const settingStore = useSettingStore()
</script>

<style lang="scss" scoped></style>
