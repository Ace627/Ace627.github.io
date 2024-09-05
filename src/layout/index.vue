<template>
  <div class="layout-top">
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
import { AppMain, Navbar } from './components'

const settingStore = useSettingStore()
</script>

<style lang="scss" scoped>
.layout-top {
  position: relative;
  width: 100%;
  height: 100%;
}
.layout-top .fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  transition: width var(--el-transition-duration);
}

.layout-top .main-container {
  position: relative;
  height: 100%;
}

.layout-top .app-main {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.layout-top .fixed-header + .app-main {
  padding-top: var(--ap-header-height);
}

.navbar {
  height: var(--ap-navbar-height);
  background-color: rgba($color: #fff, $alpha: 0.6);
  backdrop-filter: blur(4px);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
</style>
