<template>
  <template v-if="!item.meta?.hidden">
    <!-- 只有一个菜单需要展示的情况 -->
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <SidebarItemLink v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
          <IconFont class="el-icon" v-if="theOnlyOneChild.meta && theOnlyOneChild.meta.icon" :name="theOnlyOneChild.meta.icon" />
          <template v-if="theOnlyOneChild.meta.title" #title>
            <span class="title">{{ theOnlyOneChild.meta.title }}</span>
          </template>
        </el-menu-item>
      </SidebarItemLink>
    </template>

    <!-- 需要作为折叠菜单展示的情况 -->
    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template #title>
        <IconFont class="el-icon" v-if="item.meta && item.meta.icon" :name="item.meta.icon" />
        <span v-if="item.meta?.title" class="title">{{ item.meta.title }}</span>
      </template>
      <template v-if="item.children">
        <SidebarItem v-for="(child, index) in item.children" :key="index" :item="child" :basePath="resolvePath(child.path)" />
      </template>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
defineOptions({ name: 'SidebarItem' })
import path from 'path-browserify'
import type { RouteRecordRaw } from 'vue-router'
import { isExternal } from '@/utils/validate'
import SidebarItemLink from './SidebarItemLink.vue'

/** 接受父组件传递的属性 */
const props = defineProps({
  item: { type: Object as PropType<RouteRecordRaw>, required: true },
  basePath: { type: String as PropType<string>, required: true },
})

/** 计算是否需要一直展示根路由 */
const alwaysShowRootMenu = computed(() => props.item.meta?.alwaysShow)
/** 计算需要展示的子菜单数量 */
const showingChildNumber = computed(() => (props.item.children ? props.item.children.filter((item) => !item.meta?.hidden).length : 0))
/** 重组只需要展示的一个菜单 */
const theOnlyOneChild = computed(() => {
  if (showingChildNumber.value > 1) return null
  if (props.item.children) for (const child of props.item.children) if (!child.meta || !child.meta.hidden) return child
  // If there is no children, return itself with path removed,
  // because this.basePath already contains item's path information
  // 如果没有 children，返回其自身，并移除置空路径；因为基础路径已经包含它的路径信息
  return { ...props.item, path: '' }
})

/** 拼接路径 */
function resolvePath(routePath: string) {
  if (isExternal(routePath)) return routePath
  if (isExternal(props.basePath)) return props.basePath
  return path.resolve(props.basePath, routePath)
}
</script>

<style lang="scss" scoped>
.open-sidebar .el-icon.iconfont {
  margin-right: 4px;
}
</style>
