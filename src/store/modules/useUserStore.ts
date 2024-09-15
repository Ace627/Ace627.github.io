import { LoginService } from '@/api'
import { getAccessToken, removeAccessToken, setAccessToken } from '@/utils/cache/local-storage'

/** 第一个参数是该 store 的唯一 id */
export default defineStore('user', () => {
  const token = ref<string>(getAccessToken())
  const roles: string[] = []
  const permissions: string[] = []
  const avatar = ref<string>('https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80')

  /** 登录 */
  async function login(loginParams: LoginEntity.LoginForm) {
    const data = await LoginService.login(loginParams)
    token.value = data.result
    setAccessToken(data.result)
  }

  /** 退出登录 */
  async function logout(config = { confirm: true }) {
    try {
      if (config.confirm) await useModal().confirm(`确定注销并退出系统吗？`)
      await LoginService.logout()
      token.value = ''
      removeAccessToken()
      window.location.reload()
    } catch (error) {
      console.log('退出登录失败: ', error)
    }
  }

  return { token, avatar, roles, permissions, login, logout }
})
