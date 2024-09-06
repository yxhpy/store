<template>
  <div class="forgot-password-container">
    <div class="forgot-password-header">
      <img src="../assets/logo.png" alt="Logo" class="logo">
      <h1>重置密码</h1>
    </div>
    <van-form @submit.prevent="onSubmit" class="forgot-password-form">
      <van-cell-group inset>
        <van-field
          v-model="email"
          name="email"
          label="邮箱"
          placeholder="请输入注册邮箱"
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
          发送重置链接
        </van-button>
      </div>
    </van-form>
    <div class="back-to-login">
      <router-link to="/login">返回登录</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const email = ref('')

const onSubmit = () => {
  console.log('Password reset request for:', email.value);
  // 这里应该调用密码重置 API
  // 模拟发送重置链接
  showToast('重置链接已发送到您的邮箱')
  setTimeout(() => {
    router.push('/login')
  }, 2000)
}
</script>

<style scoped>
.forgot-password-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.forgot-password-header {
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

.forgot-password-header h1 {
  font-size: 24px;
  color: #333;
  margin: 0;
}

.forgot-password-form {
  width: 100%;
  max-width: 350px;
}

.submit-btn {
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
  border: none;
}

.back-to-login {
  margin-top: 20px;
  font-size: 14px;
}

.back-to-login a {
  color: #1989fa;
  text-decoration: none;
  font-weight: bold;
}
</style>