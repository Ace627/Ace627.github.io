<template>
  <div class="flex-center overflow-hidden h-[--ap-navbar-height]">
    <router-link key="expand" to="/" class="flex-center wh-full">
      <img v-if="logoImg" :src="logoImg" class="wh-32px" alt="logo" draggable="false" />
      <h1 v-if="appStore.isDesktop" class="app-logo-text">{{ VITE_APP_TITLE }}</h1>
    </router-link>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppLogo' })
import logoImg from '@/assets/images/logo.png'

const appStore = useAppStore()
const { VITE_APP_TITLE } = useEnv()
</script>

<style lang="scss" scoped>
.app-logo-text {
  white-space: nowrap;
  font-weight: bold;
  font-size: var(--el-font-size-large);
  color: var(--el-text-color-primary);
  letter-spacing: 1px;
}
</style>
