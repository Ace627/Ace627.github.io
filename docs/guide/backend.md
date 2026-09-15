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

## 导入导出

Excel 导入导出由通用 `ExcelService` 提供：字段用 `@Excel` 装饰器声明在实体上，导出走 `StreamableFile` 文件流下载，导入只做表头强校验、字典反查与日期逆解析，业务校验与入库由调用方负责，完整接入步骤见 [导入导出](./excel)。

## 上传下载

文件能力分两层：通用上传覆盖单文件、分片、秒传与断点续传，按内容 SHA-256 寻址存储；文件管理提供目录树、上传登记、流式下载与回收站，彻底删除前按引用计数清理物理文件。完整实现说明见 [上传下载](./upload-download)。

## 系统日志

操作日志注解驱动：Controller 方法标注 `@Operlog` 后由全局拦截器自动记录模块、操作类型、请求参数、耗时、IP 归属地等信息，成功与异常都会留痕；登录日志由登录流程自动写入。装饰器用法与扩展方式见 [系统日志](./system-log)。

## 数据权限

数据权限按角色配置五档数据范围，Controller 标注 `@DataScope` 后由全局拦截器计算参数化过滤条件，`@DataScopeSql()` 注入 Service 拼进 QueryBuilder，多角色取并集，缓存缺失一律查空不放行。接入步骤见 [数据权限](./data-scope)。

## 定时任务

定时任务基于 BullMQ + Redis 界面化管理：任务代码就是一个 Service 方法，调用目标字符串由服务发现自动解析执行，支持执行一次、暂停恢复、错失补偿三策略与调度日志。接入方式见 [定时任务](./job)。

## 防重复提交

写接口标注 `@RepeatSubmit` 后，全局守卫按请求方法、路径与内容生成指纹写入 Redis，窗口期内内容相同的请求直接驳回，不同内容不受影响。参数与机制见 [防重复提交](./repeat-submit)。

## 演示模式

演示模式是一键只读开关：`.env` 开启后全局守卫拦截所有非 GET 请求，访客可正常登录与浏览，增删改操作一律驳回。开启方式与拦截规则见 [演示模式](./demo)。

## 接口限流

限流按 IP 与接口路径计数，10 秒窗口内超过 10 次即拉黑 60 秒，守卫链第一环先于鉴权生效；高频接口用 `@SkipThrottle()` 豁免。规则与调整方式见 [接口限流](./throttle)。
