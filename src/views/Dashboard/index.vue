<template>
  <div class="app-content">
    <div class="list" v-for="(item, index) in webs" :key="index">
      <div class="list__title" @dblclick="downloadDatabase">{{ item.type }}</div>
      <AutoWrapList :min-width="150" :gap="16">
        <el-tooltip v-for="(v, i) in item.children" :key="i" placement="top-start" :show-after="200">
          <template #content>
            <div class="max-w-320px break-all text-justify">{{ v.desc }}</div>
          </template>
          <el-link class="list__item" :href="v.link" target="_blank">
            <el-image :src="v.icon" lazy class="wh-20px mx-8px">
              <template #error> <el-image :src="logo" class="wh-20px" /> </template>
            </el-image>
            <span>{{ v.title }}</span>
          </el-link>
        </el-tooltip>
      </AutoWrapList>
    </div>

    <!-- <p v-for="(item, index) in 999" :key="index">{{ item }}</p> -->
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })
import webs from '@/assets/database/webs.json'
import logo from '@/assets/images/logo.png'
import { linkDownload } from '@/utils/download'

function downloadDatabase() {
  const blob = new Blob([JSON.stringify(webs, null, '  ')], { type: 'application/json' })
  const tempURL = URL.createObjectURL(blob)
  linkDownload(tempURL, '常用网址合集')
  URL.revokeObjectURL(tempURL)
}
</script>

<style lang="scss" scoped>
.app-content {
  min-height: 100%;
}
.list {
  width: 960px;
  max-width: 100%;
  margin: 0 auto;

  &__title {
    margin-bottom: 16px;
    padding: 4px 0 4px 10px;
    font-size: var(--el-font-size-large);
    letter-spacing: 2px;
    border-radius: 4px 4px;
    text-align: center;
    color: var(--el-text-color-primary);
    background-color: var(--el-color-info-light-5);
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }

  &__item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: var(--el-component-size);
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    transition: all 0.16s;
    &:hover {
      color: var(--el-color-primary);
    }
  }
  + .list {
    margin-top: 16px;
  }
}
</style>
