<template>
  <aside>
    <AppLogo v-if="settingStore.layout === 'classic'" />

    <el-menu :class="menuClass" :popperClass :defaultActive :collapse unique-opened :mode v-bind="$attrs" :collapse-transition="false">
      <SidebarItem v-for="(route, index) in routeList" :key="index" :item="route" :basePath="route.path" />
    </el-menu>
  </aside>
</template>

<script setup lang="ts">
defineOptions({ name: 'Sidebar' })
import { AppLogo } from '..'
import SidebarItem from './SidebarItem.vue'

const props = defineProps({
  mode: { type: String as PropType<'horizontal' | 'vertical'>, default: 'vertical' },
})

/** 读取 Pinia 仓库 */
const appStore = useAppStore()
const settingStore = useSettingStore()
// const permissionStore = usePermission()
/** 构建路由和路由器 */
const route = useRoute()
const router = useRouter()

const menuClass = computed(() => `layout-${settingStore.layout}-menu custom-menu`)
const popperClass = computed(() => `layout-${settingStore.layout}-menu-popper custom-menu-popper`)
/** 计算当前侧边栏的开关状态 */
const collapse = computed(() => !appStore.sidebar.opened)
/** 计算当前激活路径 */
const defaultActive: ComputedRef<string> = computed(() => route.meta.activeMenu ?? route.path)
/** 计算当前路由表 */
// const routeList = computed(() => permissionStore.routes)
const routeList = computed(() => router.options.routes)
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
  width: 100%;
  min-height: 100%;
}

:deep(.el-menu--vertical .el-menu-item.is-active) {
  background-color: var(--el-color-primary-light-9);
}

:deep(.el-menu--horizontal > .el-sub-menu .el-sub-menu__title) {
  border: none;
  padding-right: calc(var(--el-menu-icon-width));
}
</style>
