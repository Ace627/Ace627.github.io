<template>
  <div class="navbar flex items-center relative">
    <AppLogo />

    <div class="time">
      <el-text type="success">{{ time }}</el-text>
      <el-text type="primary">甲辰龙年</el-text>
      <el-text type="danger">{{ week }}</el-text>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Navbar' })
import dayjs from 'dayjs'
import { AppLogo } from '@/layout/components'

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
  margin-left: 8px;
}

.time {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  text-align: center;
}
</style>
