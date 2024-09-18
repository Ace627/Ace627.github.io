<template>
  <el-drawer v-model="settingStore.showSetting" :with-header="false" :size="260">
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
  </el-drawer>
</template>

<script setup lang="ts">
defineOptions({ name: 'SettingPanel' })

const settingStore = useSettingStore()
</script>

<style lang="scss" scoped>
.drawer-title {
  margin-bottom: 12px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 22px;
}
.drawer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  padding: 12px 0;
  .title {
    width: 100px;
  }
}
</style>
