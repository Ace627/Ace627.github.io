<template>
  <!-- Config Provider 全局配置 -->
  <!-- https://element-plus.org/zh-CN/component/config-provider.html -->
  <ElConfigProvider :locale="zhCn">
    <RouterView />
  </ElConfigProvider>
</template>

<script setup lang="ts">
defineOptions({ name: 'App' })
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

/** Layout 布局响应式 */
useResize()
</script>

<style lang="scss" scoped></style>
