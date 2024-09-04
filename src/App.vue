<template>
  <h1>欢迎来到我的朝花夕拾</h1>

  <div class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'App' })
</script>

<style lang="scss" scoped>
h1 {
  padding-top: 100px;
  font-size: 36px;
  text-align: center;
}
</style>
