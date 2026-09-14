# 项目介绍

## 工程组织

前后端放在**同一个仓库的两个独立工程**中，**不是 monorepo**：

```
nestjs-admin-template
├── admin/                  # 前端工程（Vue 3 + Element Plus + Vite 8）
├── server/                 # 后端工程（NestJS 11 + TypeORM + MySQL + Redis）
├── docs/                   # 项目辅助文档
├── init.sql                # 数据库初始化脚本（建表 + 种子数据）
├── docker-compose.yml      # 一键编排：NestJS + MySQL + Redis
├── Dockerfile.server       # 后端多阶段构建镜像
├── prettier.config.cjs     # 前后端共用的格式化配置
└── AGENTS.md               # AI 辅助开发协作规范
```

- 根目录**没有** `package.json`，两个工程各自 `pnpm install`，互不干扰
- 两个工程各有独立的 `package.json`、`pnpm-lock.yaml` 与 `pnpm-workspace.yaml`（内含镜像源配置）
- 可以单独构建、单独部署，也可以用根目录 Dockerfile / compose 一并交付
- 根目录共用一份 `prettier.config.cjs`，保证前后端代码风格统一

## 技术架构

```
浏览器
  │  Nginx 反向代理 /api
  ▼
NestJS 11（server）                      Vue 3 + Vite 8（admin）
  ├─ Guard    JWT 鉴权 / 权限码校验        ├─ Pinia 状态管理
  ├─ Interceptor 日志 / 响应缓存 / 防重提交 ├─ Vue Router 动态路由
  ├─ Module   system / monitor / auth      ├─ Element Plus 按需导入
  ├─ TypeORM  实体映射 MySQL 8             ├─ UnoCSS + SCSS 主题
  ├─ ioredis  缓存 / 会话 / BullMQ 队列     └─ ECharts 图表
  └─ Winston  按日滚动文件日志
```

## 前端目录结构

```
admin/src
├── main.ts                  # 入口：styles → plugins → directives → store → router
├── App.vue
├── defaultSettings.ts       # 布局默认配置（侧边栏、主题等）
├── api/                     # 请求层，文件名约定 *.request.ts
│   ├── auth.request.ts
│   ├── common/upload.request.ts
│   ├── monitor/             # 服务监控 / 缓存 / 任务 / 日志 / 在线用户
│   └── system/              # 用户 / 角色 / 菜单 / 部门 / 字典 / 文件
├── assets/
│   ├── images/
│   └── svg-icons/           # 本地 SVG 图标（雪碧图自动注册）
├── components/              # 全局通用组件（详见「组件文档」）
├── directives/              # 自定义指令（v-permissions 等）
├── hooks/                   # useDict / useTheme / useResize 等组合式函数
├── layout/                  # 后台整体布局（Navbar / Sidebar / TagsView / AppMain）
├── plugins/                 # 插件注册（全局组件等）
├── router/
│   ├── index.ts             # createRouter + 守卫挂载
│   ├── router.constant.ts   # 路由常量与白名单
│   ├── router.guard.ts      # 全局前置守卫：token → getInfo → 动态路由
│   ├── router.helper.ts     # 后端菜单递归建树 + 动态组件加载
│   └── modules/static.route.ts  # 静态路由（login / 404 等）
├── store/modules/           # app / permission / setting / tags-view / user
├── styles/                  # 全局样式与 Element Plus 主题定制
└── types/                   # 类型定义（api/ 与请求层一一对应）
```

## 后端目录结构

```
server/src
├── main.ts                  # 启动入口：Helmet、全局前缀、静态资源、优雅关闭
├── app.module.ts            # 根模块
├── configuration.ts         # 集中读取环境变量配置（server/redis/database/jwt）
├── common/                  # 公共层
│   ├── class/               # AjaxResult 统一响应封装
│   ├── constant/            # 常量（配置键、字典、业务类型等）
│   ├── decorator/           # 自定义装饰器（详见「后台手册」）
│   ├── dto/                 # 公共 DTO（分页参数等）
│   ├── entities/            # 公共实体（BaseEntity 等）
│   ├── exception/           # 业务异常
│   ├── filter/              # 全局异常过滤器
│   ├── guard/               # JWT 鉴权 / 权限码 / 角色守卫
│   ├── interceptor/         # 响应转换 / 操作日志 / 响应缓存 / 防重提交
│   ├── middleware/          # 中间件
│   ├── module/              # 数据库 / Redis / 队列等公共模块
│   └── pipe/                # 参数校验管道
├── modules/
│   ├── auth/                # 登录认证：验证码、JWT 签发与校验
│   ├── system/              # 用户 / 角色 / 菜单 / 部门 / 字典 / 文件
│   ├── monitor/             # 服务监控 / 缓存监控 / 健康检查 / 在线用户
│   │                        # 定时任务及执行日志 / 操作日志 / 登录日志
│   ├── common/              # 通用能力（文件上传等）
│   └── dashboard/           # 首页看板数据
├── shared/                  # 跨模块共享
├── types/                   # 类型定义
└── utils/                   # 工具函数（密码加密、IP 归属地解析等）
```

## 后端模块说明

| 模块      | 职责                                                         |
| --------- | ------------------------------------------------------------ |
| `auth`    | 图形验证码生成校验、账号密码登录、JWT 签发与刷新             |
| `system`  | 用户、角色、菜单、部门、字典、文件六大核心管理模块           |
| `monitor` | 服务监控、缓存监控、健康检查、在线用户、定时任务、操作/登录日志 |
| `common`  | 文件上传（单文件 / 分片 / 秒传 / 断点续传）等通用能力        |
| `dashboard` | 首页看板统计数据                                           |

## 认证机制

- 登录采用 **JWT + 图形验证码**，密码使用 **Argon2** 加密存储
- 认证基于 **Passport 策略模式**，职责分离，便于扩展新的登录方式
- 访问令牌有效期由 `JWT_EXPIRES_IN` 控制（默认 1800 秒），会话状态存于 Redis，支持在线用户查看与强制下线
- 公开路由（登录、验证码、健康探针等）使用 `@Public()` 装饰器跳过鉴权
