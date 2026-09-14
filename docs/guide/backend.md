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

## 异常处理

业务代码只负责抛出异常，兜底转换交给全局异常过滤器：`BusinessException` 承载业务校验失败，`AllExceptionsFilter` 统一捕获翻译并返回标准结构，前端拦截器自动弹错。完整链路与异常翻译规则见 [异常处理](./exception)。

## 参数验证

参数验证由全局 `ValidationPipe` + DTO 上的 `class-validator` 装饰器声明完成，非法参数在进入 Controller 前即被拦截，校验规则与异常提示的衔接见 [参数验证](./validation)。

## 鉴权与权限

- 除 `@Public()` 标记的公开路由外，所有接口默认经过 **JWT Guard** 校验登录态
- 会话状态存于 Redis，可在「在线用户」中查看活跃会话或强制下线
- 接口级权限用 `@RequirePermissions`（权限码）或 `@RequireRoles`（角色编码）声明
- 数据级权限按部门划分，由数据权限切面处理

## 增删改查

一个业务模块的增删改查 = 后端三件套（DTO 校验、Controller 端点、Service 逻辑）+ 前端三件套（请求类、列表页、编辑弹窗），分页由 `PaginationDto` + `PaginationPipe` 统一换算，完整参考实现见 [增删改查](./crud)。
