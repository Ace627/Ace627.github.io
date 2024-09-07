<template>
  <!-- 超链接添加 rel="noopener noreferrer" 来防止钓鱼网站，因为它获取的 window.opener 的值为 null -->
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener noreferrer">
    <slot></slot>
  </a>
  <router-link v-else :to="to">
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
defineOptions({ name: 'SidebarItemLink' })
import { isExternal } from '@/utils/validate'

defineProps({ to: { type: String, required: true } })
</script>

<style lang="scss" scoped></style>
