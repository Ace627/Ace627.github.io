<template>
  <div class="app-content">
    <div class="list" v-for="(item, index) in webs" :key="index">
      <div class="list__title">{{ item.type }}</div>
      <ApWrapList :min-width="150" :gap="16">
        <el-link class="list__item w-full" :href="v.link" target="_blank" v-for="(v, i) in item.children" :key="i">
          {{ v.title }}
        </el-link>
      </ApWrapList>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'App' })
import webs from '@/assets/database/webs.json'
</script>

<style lang="scss" scoped>
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
    background-color: #ccc;
  }

  &__item {
    display: flex;
    justify-content: center;
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
