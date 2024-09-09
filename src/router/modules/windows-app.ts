import type { RouteRecordRaw } from 'vue-router'

export default {
  path: '/WindowApp',
  name: 'WindowsApp',
  meta: { title: '电脑软件', icon: 'VSCode' },
  children: [
    {
      path: 'https://pc.weixin.qq.com',
      name: '微信 PC 版',
      component: () => {},
      meta: { title: '微信 PC 版', icon: 'WeChat' },
    },
    {
      path: 'https://code.visualstudio.com/#alt-downloads',
      name: 'VSCode',
      component: () => {},
      meta: { title: 'VSCode', icon: 'VSCode' },
    },
    {
      path: 'https://www.dcloud.io/hbuilderx.html',
      name: 'HBuilderX',
      component: () => {},
      meta: { title: 'HBuilderX', icon: 'VSCode' },
    },
    {
      path: 'https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html',
      name: '微信开发者工具',
      component: () => {},
      meta: { title: '微信开发者工具', icon: 'VSCode' },
    },
    {
      path: 'https://www.centbrowser.cn',
      name: '百分浏览器',
      component: () => {},
      meta: { title: '百分浏览器', icon: 'Browser' },
    },
    {
      path: 'https://www.google.cn/chrome',
      name: '谷歌浏览器',
      component: () => {},
      meta: { title: '谷歌浏览器', icon: 'Browser' },
    },
    {
      path: 'https://www.google.cn/chrome/?standalone=1&platform=win64',
      name: '谷歌浏览器64位',
      component: () => {},
      meta: { title: '谷歌浏览器64位', icon: 'Browser' },
    },
  ],
} as RouteRecordRaw
