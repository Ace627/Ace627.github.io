# 后端手册

## 统一响应结构

所有接口返回统一的 `AjaxResult` 结构，包含 `code`（HTTP 风格状态码）与 `message`（友好提示文本），业务数据以扩展字段平铺合并：

```json
// 成功响应（带数据）
{ "code": 200, "message": "请求成功", "list": [], "total": 100 }
// 失败响应
{ "code": 500, "message": "服务器内部错误" }
```

```typescript
import { AjaxResult } from '@/common'

return AjaxResult.success({ list, total }, '查询成功')
return AjaxResult.error('参数错误', 400)
```

## 鉴权与权限

- 除 `@Public()` 标记的公开路由外，所有接口默认经过 **JWT Guard** 校验登录态
- 会话状态存于 Redis，可在「在线用户」中查看活跃会话或强制下线
- 接口级权限用 `@RequirePermissions`（权限码）或 `@RequireRoles`（角色编码）声明
- 数据级权限按部门划分，由数据权限切面处理

## 装饰器 / 注解

框架内置了一套自定义装饰器，用于声明式处理鉴权、日志、缓存、限流等横切逻辑，完整清单与用法见 [装饰器 / 注解](./decorators)。
