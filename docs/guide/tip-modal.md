# 提示弹窗

`TipModal` 对象用于做消息提示、弹出提示、通知提醒、二次确认、输入弹窗、遮罩层等，它定义在 `src/utils/tip-modal.ts` 文件中，基于 Element Plus 的 `ElMessage` / `ElMessageBox` / `ElNotification` / `ElLoading` 封装，有如下方法：

| 分类   | 方法                                                             |
| ------ | ---------------------------------------------------------------- |
| 消息提示 | `msg` `msgError` `msgSuccess` `msgWarning`                       |
| 弹出提示 | `alert` `alertError` `alertSuccess` `alertWarning`               |
| 通知提示 | `notify` `notifyError` `notifySuccess` `notifyWarning`           |
| 确认窗体 | `confirm` `prompt`                                               |
| 遮罩层 | `showLoading` `hideLoading`                                      |

## 消息提示

提供默认、错误、成功和警告等反馈信息，基于 `ElMessage` 封装。

```ts
import { TipModal } from '@/utils'

TipModal.msg('默认反馈')
TipModal.msgError('错误反馈')
TipModal.msgSuccess('成功反馈')
TipModal.msgWarning('警告反馈')
```

所有 `msg` 系列方法均支持传入 `ElMessage` 原有配置项：

```ts
TipModal.msgSuccess('成功反馈', { duration: 2000 })
```

## 弹出提示

提供默认、错误、成功和警告等提示信息，基于 `ElMessageBox.alert` 封装。标题固定为「系统提示」，确认按钮为「知道了」，均支持通过 `config` 覆盖。

```ts
TipModal.alert('默认提示')
TipModal.alertError('错误提示')
TipModal.alertSuccess('成功提示')
TipModal.alertWarning('警告提示')
```

## 通知提示

提供默认、错误、成功和警告等通知信息，基于 `ElNotification` 封装，标题默认为「系统提示」，支持传入 `ElNotification` 原有配置项。

```ts
TipModal.notify('默认通知')
TipModal.notifyError('错误通知')
TipModal.notifySuccess('成功通知')
TipModal.notifyWarning('警告通知')

// 自定义标题与持续时间
TipModal.notifySuccess('导出完成', { title: '系统通知', duration: 5000 })
```

## 确认窗体

提供二次确认弹窗，基于 `ElMessageBox.confirm` 封装。返回 `{ confirm, cancel }` 结构，取消时内部已捕获异常，不会产生未处理的 `Promise` 拒绝。

```ts
const { cancel } = await TipModal.confirm('确定要删除选中的数据吗？')
if (cancel) return TipModal.msg('操作取消')

TipModal.msgSuccess('删除成功')
```

## 提交内容

提供输入弹窗，基于 `ElMessageBox.prompt` 封装。返回 `{ confirm, cancel, value }` 结构，`value` 为用户输入的内容。

```ts
const { confirm, value } = await TipModal.prompt('请输入文件夹名称')
if (confirm) TipModal.msgSuccess(`创建成功：${value}`)
```

## 遮罩层

提供全屏加载动画，`showLoading` 打开遮罩层，`hideLoading` 关闭遮罩层，内部基于 `ElLoading.service` 封装并持有唯一实例。

```ts
// 打开遮罩层
TipModal.showLoading('正在导出数据，请稍候...')

// 关闭遮罩层
TipModal.hideLoading()
```

:::: tip
`confirm` / `prompt` / `alert` 系列方法均可透传 `ElMessageBoxOptions` 原有配置项（如自定义标题、按钮文案），不传时使用项目统一的默认样式。
::::
