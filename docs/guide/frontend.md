# 前端手册

## 目录与命名约定

- 请求层放在 `src/api/`，文件名约定为 `*.request.ts`，与 `src/types/api/` 下的响应类型一一对应
- 页面级组合式逻辑优先使用 `src/hooks/` 下的既有 Hook
- 全局通用组件放在 `src/components/`，已全局注册（详见「组件文档」）
- 路径别名 `@` 指向 `src` 目录

## 请求封装

基于 axios 封装的独立请求模块，统一处理：

- **自动携带 Token**：请求拦截器从缓存读取访问令牌并注入请求头
- **统一响应处理**：响应拦截器按 `AjaxResult` 结构拆包，非 200 状态码统一提示
- **进度条联动**：`VITE_REQUEST_NPROGRESS` 开启后，请求期间顶部显示进度条
- **防重复提交**：拦截器层面前后端呼应，拦截短时间内的重复请求
- **超时控制**：`VITE_REQUEST_TIMEOUT` 全局控制（秒），`0` 表示无超时

## 动态路由与权限

登录后菜单由后端实时下发，前端动态生成路由：

1. 路由守卫（`router.guard.ts`）检查白名单 → 校验 token → 拉取用户信息与菜单
2. `router.helper.ts` 将后端扁平菜单递归建树，`import.meta.glob` 动态加载页面组件后 `addRoute` 注入
3. 侧边栏根据 `permission` store 中的路由表渲染，目录 / 菜单 / 按钮三级粒度与后端权限码一一对应
4. 路由模式由 `VITE_ROUTER_MODE` 控制（`history` / `hash`）

## 权限控制

```vue
<!-- 根据角色级进行控制 -->
<!-- 角色级适合粗粒度控制，例如某个操作区域只对管理员可见 -->
<el-link type="primary" v-permissions="['admin']">修改</el-link>

<!-- 根据按钮级进行控制 -->
<!-- 按钮级适合细粒度控制，能精确控制每个操作按钮的显隐，后端也需做对应鉴权 -->
<el-link type="primary" v-permissions="['system:role:update']">修改</el-link>
<el-link type="primary" v-permissions="['system:role:delete']">删除</el-link>
```

## Hooks

`src/hooks/` 下的组合式函数，已支持自动引入：

| Hook              | 说明                                       |
| ----------------- | ------------------------------------------ |
| `useDict`         | 按字典类型编码拉取字典数据（见下文）       |
| `useDynamicTitle` | 动态设置浏览器标题                         |
| `useProgress`     | 路由 / 请求顶部进度条控制                  |
| `useResize`       | 容器尺寸监听                               |
| `useTheme`        | 明暗主题切换                               |

## 自动导入

项目通过 `unplugin-auto-import` 与 `unplugin-vue-components` 实现自动导入，无需手动 `import`：

- Vue API：`ref`、`computed`、`watch`、`useTemplateRef` 等
- Element Plus 组件：`<el-table>`、`<el-form>` 等按需自动引入
- Store 与 Hook：`useAppStore`、`useDict` 等

## 图标使用

`SvgIcon` 组件已全局注册，基于 `vite-plugin-svg-icons` 雪碧图方案，新增图标与改色等完整说明见 [图标使用](./svg-icon)。

## 提示弹窗

`TipModal` 基于 `ElMessage` 封装，提供消息提示、通知、确认、加载等功能，完整方法说明见 [提示弹窗](./tip-modal)。

```vue
<script setup lang="ts">
import { TipModal } from '@/utils'

TipModal.msg('默认反馈')
TipModal.msgError('错误反馈')
TipModal.msgSuccess('成功反馈')
TipModal.msgWarning('警告反馈')

TipModal.notify('默认通知')
TipModal.notifyError('错误通知')
TipModal.notifySuccess('成功通知')
TipModal.notifyWarning('警告通知')

TipModal.showLoading('正在保存到本地，请稍候...')
TipModal.hideLoading()

async function confirm() {
  const { cancel } = await TipModal.confirm('确定要删除选中的数据吗？')
  if (cancel) return TipModal.msg('操作取消')
}

// 所有方法均支持传入 ElMessage 原有配置项
TipModal.msgSuccess('成功反馈', { duration: 2000 })
</script>
```

## 缓存使用

`StorageCache` 基于 `localStorage` 封装，提供带过期时间（TTL）与统一键前缀的键值存取，业务侧通过 `src/utils/cache/` 下的领域封装方法使用，完整说明见 [本地缓存](./storage-cache)。

## 字典使用

```vue
<template>
  <!-- 表格回显：DictTag 已全局注册，传入选项和值即可 -->
  <DictTag :options="sys_normal_disable" :value="row.status" />
  <!-- 下拉选择 -->
  <el-select :options="sys_normal_disable" />
  <!-- 单选组 -->
  <el-radio-group :options="sys_normal_disable" />
</template>

<script setup lang="ts">
// useDict 已支持自动引入，传入字典类型编码即可
const { sys_normal_disable, sys_user_gender } = useDict('sys_normal_disable', 'sys_user_gender')
</script>
```

## 表格使用

我们只是在完整保留 `el-table` 全部原生 API 与特性的基础上，克制地加入了 `columns` 配置化渲染和 `loading` 加载态这两项最常用的增强，其余用法与原生完全一致，零学习成本，即拿即用，用最小封装换取最高效率，坚决杜绝过度抽象。

```vue
<template>
  <ProTable ref="tableRef" :loading :data="list" :columns>
    <template #status="{ row }">
      <DictTag :options="sys_normal_disable" :value="row.status" />
    </template>
    <template #action="{ row }">
      <el-link type="primary">修改</el-link>
      <el-link type="primary">删除</el-link>
    </template>
  </ProTable>
</template>

<script setup lang="ts">
import type { ProTableColumn } from '@/types'

const tableRef = useTemplateRef('tableRef')
const loading = ref(false)
const list = ref<UserEntity[]>([])

// ProTableColumn 兼容 el-table-column 全部属性，prop 有泛型约束
const columns: ProTableColumn<UserEntity>[] = [
  { align: 'center', type: 'selection' },
  { align: 'center', type: 'index', label: '序号', width: 64 },
  { align: 'center', prop: 'username', label: '用户账号', showOverflowTooltip: true },
  { align: 'center', prop: 'status', label: '状态', slot: 'status', width: 80 },
  { align: 'center', prop: 'createTime', label: '创建时间', width: 160 },
  { align: 'center', slot: 'action', label: '操作', fixed: 'right', minWidth: 120 },
]
</script>
```
