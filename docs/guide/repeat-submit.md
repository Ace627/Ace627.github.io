# 防重复提交

按钮连点、网络重试、刷新重发都会让同一写操作到达后端多次，靠前端 loading 只能缓解不能根治。模板在守卫层提供声明式防重：接口方法标注 `@RepeatSubmit`，窗口期内内容相同的请求直接驳回，业务代码零侵入。参考实现：登录接口。

## @RepeatSubmit 装饰器

标注在需要防重的接口方法上：

```typescript
/** 用户登录 */
@Public()
@RepeatSubmit()
@Post('login')
public login(@Body() loginDto: LoginDto, @Req() request: ExpressRequest) {
  return this.authService.login(loginDto, request)
}
```

参数说明：

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `interval` | `number` | `5` | 防重窗口，单位秒 |
| `message` | `string` | 数据正在处理中，请勿重复提交 | 命中防重时的提示消息 |

自定义示例：

```typescript
@RepeatSubmit({ interval: 10, message: '请求处理中，请稍候' })
```

## 判定规则

防重键由「请求方法 + 请求路径 + 请求内容」共同决定，只有内容也相同的请求才被判定为重复：

- 同一接口同一内容，窗口期内重复到达 → 驳回，返回 `message` 提示，状态码 400
- 同一接口不同内容，如修改了表单再提交，正常放行，不误伤连续编辑场景
- 窗口期过后再次提交 → 正常放行，Redis 键到期自动清理

## 实现机制

防重由 `RepeatSubmitGuard` 完成，在 `app.module.ts` 中以 `APP_GUARD` 全局注册，位于权限守卫之后：

- **无注解即跳过**：`Reflector` 读取方法上的 `@RepeatSubmit` 元数据，未标注的接口直接放行
- **内容指纹**：对请求的 params、query、body 做稳定序列化后取 MD5，与请求方法、路径共同拼出 Redis 键。稳定序列化保证对象键排序后输出确定，同一内容的两次请求指纹一致
- **序列化兼容**：`FormData` 递归转普通对象后参与计算，文件以其元数据参与指纹；`Date` 转 ISO 格式、`BigInt` 转字符串、循环引用标记为 `[Circular]`，任何请求形态都能安全生成键
- **先查后写**：Redis 中键已存在即驳回；首次请求写入键并设置与 `interval` 一致的过期时间，到期自动放行，无需业务清理

## 注意事项

- 适用于有副作用的写接口，查询接口无需防重
- multipart 上传接口不要挂 `@RepeatSubmit`：表单标识与文件流内容不一致，会造成误判
- 防重是短期窗口去重，业务上的幂等诉求如按唯一键去重仍由业务层保证
