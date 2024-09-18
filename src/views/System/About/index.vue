<template>
  <div class="app-content">
    <div class="flex-center text-20px">本站已稳定运行了：{{ diffTime }}</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'About' })

const createTime = '2024-09-04 10:50:57'
const diffTime = ref<string>()

function addZero(count: number) {
  return count.toString().padStart(2, '0')
}
// 将毫秒转换为 年/月/日/小时/分钟/秒 格式
const formatTime = (milliseconds: number): string => {
  const secondsTotal = Math.floor(milliseconds / 1000) // 转换为秒
  const days = Math.floor((secondsTotal % (30 * 24 * 60 * 60)) / (24 * 60 * 60)) // 1天 = 24小时
  const hours = Math.floor((secondsTotal % (24 * 60 * 60)) / 3600) // 1小时 = 3600秒
  const minutes = Math.floor((secondsTotal % (60 * 60)) / 60) // 1分钟 = 60秒
  const seconds = secondsTotal % 60 // 剩余的秒数
  return `${addZero(days)}天${addZero(hours)}时${addZero(minutes)}分${addZero(seconds)}秒`
}
function getDiffTimestamp() {
  diffTime.value = formatTime(Date.now() - new Date(createTime).getTime())
  window.requestAnimationFrame(getDiffTimestamp)
}

getDiffTimestamp()
</script>

<style lang="scss" scoped></style>
