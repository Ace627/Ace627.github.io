<template>
  <Sidebar v-if="appStore.isMobile" class="sidebar-container" />

  <!-- mobile 端侧边栏遮罩层 -->
  <div v-if="appStore.isMobile && appStore.sidebar.opened" class="drawer-bg" @click="appStore.closeSidebar(false)"></div>

  <el-container>
    <el-header :class="{ 'fixed-header': settingStore.fixedHeader }" class="p-none">
      <Navbar />
    </el-header>

    <AppMain />
  </el-container>
</template>

<script setup lang="ts">
defineOptions({ name: 'LayoutTop' })
import { AppMain, Navbar, Sidebar } from '@/layout/components'

const appStore = useAppStore()
const settingStore = useSettingStore()
</script>

<style lang="scss" scoped></style>
