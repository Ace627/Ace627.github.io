<template>
  <div class="login-container c-#262626">
    <div class="left flex-1 flex flex-col items-center pt-134px">
      <img src="@/assets/images/logo.png" alt="logo" draggable="false" class="wh-100px" />
      <div class="fw-800 text-36px mt-60px">{{ VITE_APP_TITLE }}</div>
    </div>

    <div class="right pl-77px">
      <h3 class="fw-700 text-28px mt-166px mb-80px">您好，欢迎登录！</h3>

      <el-form class="login-form" ref="loginFormRef" :rules="loginRules" :model="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入账号">
            <template #prefix> <IconFont :size="18" name="User" /> </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" show-password placeholder="请输入密码">
            <template #prefix> <IconFont :size="18" name="Lock" /> </template>
          </el-input>
        </el-form-item>
        <el-form-item class="mt-90px">
          <el-button @click.prevent="handleLogin">
            <span>{{ loading ? `登录中...` : `登录` }}</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'LoginTemplate03' })
import { useTemplateRef } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const { VITE_APP_TITLE } = useEnv()

/** 登录按钮 Loading */
const loading = ref<boolean>(false)
/** 登录表单实例 */
const loginFormRef = useTemplateRef<FormInstance>('loginFormRef')
/** 登录表单数据 */
const loginForm = ref<LoginEntity.LoginForm>({} as LoginEntity.LoginForm)
/** 登录表单数据的校验规则 */
const loginRules: FormRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
  captcha: [{ required: true, trigger: 'change', message: '请输入验证码' }],
}

/** 处理登录按钮的回调 */
async function handleLogin() {
  try {
    loading.value = true
    await loginFormRef.value?.validate()
    // await userStore.login(loginForm.value)
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log('error: ', error)
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/bg-image-05.png');
  background-size: cover;
  .right {
    width: 550px;
    height: 100%;
    background-color: #fff;
  }
  .login-form {
    width: 396px;
    .el-form-item {
      margin-bottom: 20px;
    }
    .el-input {
      --el-input-height: 56px;
      --el-input-bg-color: #f5f7f9;
      :deep(.el-input__wrapper) {
        box-shadow: none;
      }
    }
    .el-button {
      width: 100%;
      height: 60px;
      font-size: 20px;
      letter-spacing: 4px;
      color: #fff;
      border-radius: 10px;
      background-image: linear-gradient(220.55deg, #867ee6 15.27%, #4a86ff 49.16%);
      transition: all var(--el-transition-duration-fast);
      &:hover {
        background-image: linear-gradient(220.55deg, #4a86ff 15.27%, #867ee6 49.16%);
      }
    }
  }
}
</style>
