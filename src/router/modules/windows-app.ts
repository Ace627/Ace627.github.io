import type { RouteRecordRaw } from 'vue-router'

function generateRouteRecord(path: string, title: string, icon = 'VSCode'): RouteRecordRaw {
  return { path, name: path, component: () => {}, meta: { title, icon } }
}

export default {
  path: '/WindowApp',
  name: 'WindowsApp',
  meta: { title: '电脑软件', icon: 'VSCode' },
  children: [
    generateRouteRecord('https://pc.weixin.qq.com', '微信 PC 版', 'WeChat'),
    generateRouteRecord('https://meeting.tencent.com/download', '腾讯会议', 'WeChat'),
    generateRouteRecord('https://git-scm.com/downloads', 'Git'),
    generateRouteRecord('https://code.visualstudio.com/#alt-downloads', 'VSCode'),
    generateRouteRecord('https://www.dcloud.io/hbuilderx.html', 'HBuilderX'),
    generateRouteRecord('https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html', '微信开发者工具'),
    generateRouteRecord('https://www.centbrowser.cn', '百分浏览器', 'Browser'),
    generateRouteRecord('https://www.google.cn/chrome', '谷歌浏览器', 'Browser'),
    generateRouteRecord('https://www.google.cn/chrome/?standalone=1&platform=win64', '谷歌浏览器64位', 'Browser'),
  ],
} as RouteRecordRaw
