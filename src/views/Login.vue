<template>
  <div class="login-container">
    <div class="login-header">
      <img src="../assets/logo.png" alt="Logo" class="logo">
      <h1>校园外卖</h1>
    </div>
    <van-form @submit="onSubmit" class="login-form">
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
      </van-cell-group>
      <div class="form-actions">
        <div class="forgot-password">
          <span @click="goToForgotPassword">忘记密码？</span>
        </div>
        <van-button round block type="primary" native-type="submit" class="submit-btn">
          登录
        </van-button>
      </div>
    </van-form>
    <div class="register-link">
      还没有账号？<router-link to="/register">立即注册</router-link>
    </div>
    <div class="social-login">
      <p>使用第三方账号登录</p>
      <div class="social-icons">
        <van-icon name="wechat" size="24" color="#07C160" @click="socialLogin('wechat')" />
        <van-icon name="alipay" size="24" color="#1677FF" @click="socialLogin('alipay')" />
        <van-icon name="qq" size="24" color="#12B7F5" @click="socialLogin('qq')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showFailToast } from 'vant'

const router = useRouter()
const username = ref('')
const password = ref('')

const onSubmit = () => {
  console.log('Login attempt:', username.value, password.value);
  // 使用 mock 数据进行登录验证
  if (username.value === 'admin' && password.value === 'admin') {
    showToast('登录成功')
    localStorage.setItem('isAuthenticated', 'true')
    router.push('/')
  } else {
    showFailToast('用户名或密码错误')
  }
}

const goToForgotPassword = () => {
  router.push('/forgot-password')
}

const socialLogin = (platform) => {
  showToast(`${platform}登录功能正在开发中`)
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-20px);}
  60% {transform: translateY(-10px);}
}

.login-header h1 {
  font-size: 24px;
  color: #333;
  margin: 0;
}

.login-form {
  width: 100%;
  max-width: 350px;
}

.form-actions {
  margin-top: 16px;
}

.forgot-password {
  text-align: right;
  margin-bottom: 16px;
}

.forgot-password span {
  color: #1989fa;
  font-size: 14px;
  cursor: pointer;
}

.submit-btn {
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
  border: none;
}

.register-link {
  margin-top: 20px;
  font-size: 14px;
}

.register-link a {
  color: #1989fa;
  text-decoration: none;
  font-weight: bold;
}

.social-login {
  margin-top: 30px;
  text-align: center;
}

.social-login p {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-icons .van-icon {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.social-icons .van-icon:hover {
  transform: scale(1.2);
}
</style>