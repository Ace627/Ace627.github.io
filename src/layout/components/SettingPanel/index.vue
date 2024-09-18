<template>
  <el-drawer v-model="settingStore.showSetting" :with-header="false" :size="280">
    <h3 class="drawer-title">主题风格设置</h3>

    <div class="drawer-item">
      <div class="title">布局模式</div>
      <el-select v-model="settingStore.layout">
        <el-option label="经典模式" value="classic"></el-option>
        <el-option label="顶部模式" value="top"></el-option>
      </el-select>
    </div>

    <el-divider />

    <h3 class="drawer-title">系统布局配置</h3>

    <div class="drawer-item">
      <div class="title">固定头部</div>
      <el-switch v-model="settingStore.fixedHeader" />
    </div>

    <div class="drawer-item">
      <div class="title">转场动效</div>
      <el-select v-model="settingStore.transitionName">
        <el-option label="fade-transform" value="fade-transform"></el-option>
        <el-option label="el-zoom-in-top" value="el-zoom-in-top"></el-option>
        <el-option label="el-zoom-in-bottom" value="el-zoom-in-bottom"></el-option>
        <el-option label="el-zoom-in-center" value="el-zoom-in-center"></el-option>
        <el-option label="el-fade-in" value="el-fade-in"></el-option>
        <el-option label="el-fade-in-linear" value="el-fade-in-linear"></el-option>
      </el-select>
    </div>

    <el-divider />

    <div class="flex-center">
      <el-button size="small" plain type="primary" @click="handleSaveSetting" :icon="DocumentAdd">保存配置</el-button>
      <el-button size="small" plain type="danger" @click="handleResetSetting" :icon="Refresh">重置配置</el-button>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
defineOptions({ name: 'SettingPanel' })
import { Refresh, DocumentAdd } from '@element-plus/icons-vue'

const settingStore = useSettingStore()
const { showLoading, closeLoading } = useModal()

function handleSaveSetting() {
  showLoading('正在保存到本地，请稍候...')
  settingStore.saveSetting()
  setTimeout(() => closeLoading(), 1000)
}
function handleResetSetting() {
  showLoading('正在清除设置缓存并刷新，请稍候...')
  settingStore.resetSetting()
  setTimeout(() => window.location.reload(), 1000)
}
</script>

<style lang="scss" scoped>
.drawer-title {
  margin-bottom: 12px;
  color: var(--el-text-color-primary);
  font-size: var(--el-font-size-base);
  line-height: 1.5;
}
.drawer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  .title {
    width: 100px;
  }
}
.drawer-item + .drawer-item {
  margin-top: 10px;
}

.el-divider {
  margin: 16px 0;
}
</style>
