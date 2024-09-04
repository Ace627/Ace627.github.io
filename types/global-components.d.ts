export {}

declare module 'vue' {
  export interface GlobalComponents {
    ApWrapList: typeof import('../src/components/ApWrapList/index.vue')['default']
  }
}
