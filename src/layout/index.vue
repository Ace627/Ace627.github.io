<template>
  <div class="layout-common clearFix" :class="classes">
    <LayoutClassic v-if="settingStore.layout === 'classic'" />
    <LayoutTop v-else-if="settingStore.layout === 'top'" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
import LayoutTop from './LayoutTop.vue'
import LayoutClassic from './LayoutClassic.vue'

/** 读取 Pinia 仓库 */
const appStore = useAppStore()
const settingStore = useSettingStore()

/** 用来添加到根组件的动态类的集合 */
const classes = computed(() => [
  appStore.device,
  `layout-${settingStore.layout}`,
  { 'open-sidebar': appStore.sidebar.opened },
  { 'hide-sidebar': !appStore.sidebar.opened },
  { withoutAnimation: appStore.sidebar.withoutAnimation },
])
</script>

<style lang="scss" scoped></style>
