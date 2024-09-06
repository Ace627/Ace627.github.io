<template>
  <div @click="emits('toggleClick')">
    <IconFont name="Fold" :size="24" v-if="isExpand" />
    <IconFont name="Expand" :size="24" v-else />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Hamburger' })

const emits = defineEmits(['toggleClick'])
const isExpand = computed(() => useAppStore().sidebar.opened)
</script>

<style lang="scss" scoped>
.hide-sidebar .hamburger-icon {
  transform: rotate(180deg) !important;
}
</style>
