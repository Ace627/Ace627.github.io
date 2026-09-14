# 常见问题

## 为什么前后端放在同一仓库但不是 monorepo

项目将 `admin/`（Vue 3 前端）和 `server/`（NestJS 后端）放在同一个仓库，但**没有**使用 pnpm workspace 联动：根目录没有 `package.json`，两个工程各有自己的 `package.json`、`pnpm-lock.yaml` 与 `pnpm-workspace.yaml`。这样带来的好处：

- **互不干扰**：两个工程独立安装依赖、独立构建、独立部署，一边升级依赖不影响另一边
- **职责清晰**：前端与后端各自维护自己的依赖版本，锁文件互不污染
- **风格统一**：根目录共用一份 `prettier.config.cjs`，前后端代码风格保持一致
- **对 AI 辅助开发友好**：同仓库让 AI 工具能获取完整项目上下文（统一的目录结构、一致的代码规范），跨模块分析与全栈代码生成更精准

## pnpm install 时提示拦截了构建脚本怎么办

pnpm v10 默认拦截依赖包的安装（postinstall）脚本。本项目的密码加密库 `argon2` 自带预编译产物，即使构建脚本被拦截也不影响运行，忽略警告即可。如确需放行，按 pnpm 提示在 `pnpm-workspace.yaml` 中配置 `onlyBuiltDependencies` 白名单。

## 如何新增系统图标

- 从 [iconfont](https://www.iconfont.cn/) 选择并下载 SVG 图标
- 重命名为大驼峰格式（如 `User.svg`），放入 `src/assets/svg-icons`
- 在 `admin` 目录下执行 `pnpm clean:svg` 清理冗余属性并压缩
- 刷新浏览器（若图标空白，刷新即可，无需重启项目）
- 使用 `<SvgIcon name="User" />` 组件显示图标

## 如何新增全局组件

- 创建组件文件 `src/components/MyComponent/index.vue`
- 如需类型定义，创建 `src/components/MyComponent/types.ts`
- 有类型时，在 `src/types/index.ts` 中统一导出类型
- 在 `src/plugins/modules/global-component.ts` 中注册全局组件
- 之后即可在任意页面直接使用 `<MyComponent />`

## 如何使用组件缓存

在 Vue 动态路由场景下，动态加载的组件没有静态 name，导致 KeepAlive 无法正确匹配组件实例，缓存机制随之失效。传统做法是在每个动态页面中手动编写 `defineOptions({ name: 'xxx' })`，但动态路由页面数量多，一旦遗漏某个页面就会导致该页面缓存失效，维护成本极高。针对这一痛点，我们采用在组件加载阶段自动注入 name 的方案：通过 `upperFirst` 和 `camelCase` 自动将路由路径转换为 PascalCase 组件名，并在异步加载完成后注入到 `comp.default.name` 上，使 KeepAlive 能准确识别并缓存每个动态页面。由此所有动态页面无需手动编写 `defineOptions`，只有少数静态路由（如 404）才需手动设置 name，大幅降低维护成本。

## 数据库想重新初始化怎么办

- **Docker 部署**：执行 `docker compose down -v` 删除数据卷，再 `docker compose up -d --build`，MySQL 首次启动会重新导入 `init.sql`
- **本地开发**：在 `server` 目录执行 `pnpm db:init --force`（`init.sql` 自带 `DROP TABLE IF EXISTS`，会清空同名表，务必先备份）

## 宝塔的 Docker 容器编排怎么写

- `docker-compose.yml` 去掉 `build` 配置项，改用已推送的镜像即可
- 然后按照 `.env.example`（后端）与仓库根 `.env` 说明配置环境变量
- 最后启动容器即可

## 忘记 admin 密码怎么办

数据库中密码使用 Argon2 加密存储，无法直接查看。可在数据库中把 `sys_user` 表 `admin` 用户的密码字段更新为其他已知账号的密文，或删除该用户后重新初始化数据库恢复默认账号。
