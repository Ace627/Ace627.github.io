import type { DefaultTheme } from 'vitepress'

// https://vitepress.dev/zh/reference/default-theme-sidebar
// 对象写法是多侧边栏模式 https://vitepress.dev/zh/reference/default-theme-sidebar#multiple-sidebars
export const sidebar: DefaultTheme.Sidebar = {
  '/guide/': [
    {
      text: '文档',
      items: [
        { text: '简介', link: '/guide/introduction' },
        { text: '环境部署', link: '/guide/quick-start' },
        { text: '项目介绍', link: '/guide/project' },
        {
          text: '前端手册',
          link: '/guide/frontend',
          items: [
            { text: '提示弹窗', link: '/guide/tip-modal' },
            { text: '本地缓存', link: '/guide/storage-cache' },
            { text: '图标使用', link: '/guide/svg-icon' },
          ],
        },
        {
          text: '后台手册',
          link: '/guide/backend',
          items: [
            { text: '增删改查', link: '/guide/crud' },
            { text: '异常处理', link: '/guide/exception' },
            { text: '参数验证', link: '/guide/validation' },
          ],
        },
        { text: '组件文档', link: '/guide/components' },
        { text: '更新日志', link: '/guide/changelog' },
      ],
    },
    {
      text: '其它',
      items: [
        { text: '常见问题', link: '/guide/faq' },
        { text: '常用脚本', link: '/guide/scripts' },
        { text: '捐赠支持', link: '/guide/donate' },
      ],
    },
  ],
}
