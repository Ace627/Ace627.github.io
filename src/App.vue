<template>
  <h1>欢迎来到我的朝花夕拾</h1>

  <div class="mb-4">
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
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
