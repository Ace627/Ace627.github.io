<template>
  <div class="login-container relative wh-full c-white bg-cover">
    <div class="absolute pos-left-25px pos-top-20px font-bold text-size-25px">{{ VITE_APP_TITLE }}</div>
    <div class="login-desc">
      <p>体验数据一触即达</p>
      <p>决策云图一览无余</p>
    </div>

    <el-form class="login-form">
      <h3 class="login-title"><span>WELCOME</span>欢迎登录</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="账号">
          <template #prefix> <IconFont name="User" /> </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" show-password placeholder="密码">
          <template #prefix> <IconFont name="Lock" /> </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha" v-if="captchaEnabled">
        <div class="flex items-center w-full">
          <el-input v-model="loginForm.captcha" placeholder="请输入验证码">
            <template #prefix> <IconFont name="Guard" /> </template>
          </el-input>
          <img :src="captchaURL ?? defaultCaptcha" alt="captcha" class="cursor-pointer ml-10px" draggable="false" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button :loading type="primary" class="w-full" size="large" @click.prevent="handleLogin">
          <span>{{ loading ? `登录中...` : `登录` }}</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'LoginTemplate02' })
import Cookies from 'js-cookie'
import { useTemplateRef } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import defaultCaptcha from '@/assets/images/no-captcha.png'

const { VITE_APP_TITLE } = useEnv()
const userStore = useUserStore()
/** 登录表单实例 */
const loginFormRef = useTemplateRef<FormInstance>('loginFormRef')
/** 登录按钮 Loading */
const loading = ref<boolean>(false)
/** 验证码开关 */
const captchaEnabled = ref<boolean>(true)
/** 验证码图片地址 */
const captchaURL = ref<string>()
/** 登录表单数据 */
const loginForm = ref<LoginEntity.LoginForm>({} as LoginEntity.LoginForm)
/** 登录表单数据的校验规则 */
const loginRules: FormRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
  code: [{ required: true, trigger: 'change', message: '请输入验证码' }],
}

/** 处理登录按钮的回调 */
async function handleLogin() {
  try {
    loading.value = true
    await loginFormRef.value?.validate()
    // await userStore.login(loginForm.value)
    handleRememberMe()
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log('error: ', error)
  }
}

/** 处理记住登录数据的操作 */
function handleRememberMe() {
  if (loginForm.value.rememberMe) {
    Cookies.set('username', loginForm.value.username)
    Cookies.set('password', loginForm.value.password)
    Cookies.set('rememberMe', loginForm.value.rememberMe ? '1' : '0')
  } else {
    Cookies.remove('username')
    Cookies.remove('password')
    Cookies.remove('rememberMe')
  }
}
function getCookie() {
  const username = Cookies.get('username')
  const password = Cookies.get('password')
  const rememberMe = Cookies.get('rememberMe') === '1' ? true : false
  loginForm.value.username = username === undefined ? loginForm.value.username : username
  loginForm.value.password = password === undefined ? loginForm.value.password : password
  loginForm.value.rememberMe = rememberMe
}

getCookie()
</script>

<style lang="scss" scoped>
.login-container {
  background-image: url('@/assets/images/bg-image-04.png');
  .login-desc {
    position: absolute;
    left: 40px;
    bottom: 40px;
    font-size: 24px;
    color: #b8c3d9;
    text-transform: uppercase;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    p ~ p {
      margin-top: 1em;
    }
  }
  .login-form {
    float: right;
    width: 408px;
    min-width: 260px;
    margin-top: 300px;
    margin-right: 200px;
    padding: 20px 30px;
    background-color: rgba(245, 246, 247, 0.75);
    box-shadow: -2px -2px 4px rgba(255, 255, 255, 0.9), 0px 5px 20px 5px rgba(15, 21, 51, 0.1), inset -1px 1px 1px rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(136px);
    border-radius: 10px;
    .login-title {
      font-size: 18px;
      color: #000000;
      margin-bottom: 20px;
      span {
        color: #2b65d9;
        margin-right: 10px;
      }
    }
    .el-button {
      width: 100%;
      height: 42px;
      margin-top: 16px;
      font-size: 16px;
      border: none;
      border-radius: 10px;
      color: #2b65d9;
      letter-spacing: 2px;
      background-color: #f5f6f7;
      box-shadow: -2px -2px 4px rgba(255, 255, 255, 0.9), 0px 1px 2px rgba(15, 21, 51, 0.1), inset -1px 1px 1px rgba(255, 255, 255, 0.8);
    }
  }
}
.el-input {
  --el-input-height: 40px;
}
:deep(.el-input__wrapper) {
  height: 40px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: inset 0px 1px 3px rgba(15, 21, 51, 0.1);
}
</style>
