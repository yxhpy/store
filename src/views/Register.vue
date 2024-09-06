<template>
  <div class="register-container">
    <div class="register-header">
      <img src="../assets/logo.png" alt="Logo" class="logo">
      <h1>注册新账号</h1>
    </div>
    <van-form @submit="onSubmit" class="register-form">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        >
          <template #left-icon>
            <van-icon name="user-o" />
          </template>
        </van-field>
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        >
          <template #left-icon>
            <van-icon name="lock" />
          </template>
        </van-field>
        <van-field
          v-model="confirmPassword"
          type="password"
          name="confirmPassword"
          label="确认密码"
          placeholder="请再次输入密码"
          :rules="[
            { required: true, message: '请确认密码' },
            { validator: validatePassword, message: '两次输入的密码不一致' }
          ]"
        >
          <template #left-icon>
            <van-icon name="passed" />
          </template>
        </van-field>
        <van-field
          v-model="email"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          :rules="[
            { required: true, message: '请填写邮箱' },
            { pattern: /.+@.+\..+/, message: '请输入有效的邮箱地址' }
          ]"
        >
          <template #left-icon>
            <van-icon name="envelop-o" />
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit" class="submit-btn">
          注册
        </van-button>
      </div>
    </van-form>
    <div class="login-link">
      已有账号？<router-link to="/login">立即登录</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const email = ref('')

const validatePassword = (value) => {
  return value === password.value
}

const onSubmit = (values) => {
  console.log('submit', values);
  // 这里应该调用注册 API
  // 模拟注册成功
  showToast('注册成功')
  router.push('/login')
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.register-header h1 {
  font-size: 24px;
  color: #333;
  margin: 0;
}

.register-form {
  width: 100%;
  max-width: 350px;
}

.submit-btn {
  background: linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);
  border: none;
}

.login-link {
  margin-top: 16px;
  font-size: 14px;
}

.login-link a {
  color: #2196F3;
  text-decoration: none;
}
</style>