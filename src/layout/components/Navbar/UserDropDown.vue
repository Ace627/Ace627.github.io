<template>
  <el-dropdown>
    <div class="flex-center">
      <el-avatar :src="userStore.avatar" :size="36" alt="avatar" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <IconFont name="VSCode" />
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Ace627/ace627.github.io">查看源码</a>
        </el-dropdown-item>

        <el-dropdown-item @click="userStore.logout()">
          <IconFont name="SwitchButton" />
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
defineOptions({ name: 'UserDropDown' })

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.el-tooltip__trigger {
  &:focus-visible {
    outline: none;
  }
}
</style>
