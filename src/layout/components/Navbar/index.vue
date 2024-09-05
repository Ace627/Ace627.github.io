<template>
  <div class="navbar flex-center">
    <el-text type="success">{{ time }}</el-text>
    <el-text type="primary">甲辰龙年</el-text>
    <el-text type="danger">{{ week }}</el-text>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

defineOptions({ name: 'Navbar' })

const time = ref<string>()
const week = ref<string>()

function updateTime() {
  week.value = `星期${['日', '一', '二', '三', '四', '五', '六'][dayjs().day()]}`
  time.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
  window.requestAnimationFrame(updateTime)
}

updateTime()
</script>

<style lang="scss" scoped>
.el-text + .el-text {
  margin-left: 16px;
}
</style>
