<template>
  <div class="splash-screen">
    <van-image
      width="150"
      height="150"
      :src="logoUrl"
      class="logo"
    />
    <h1 class="app-name">校园外卖</h1>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// 使用相对路径导入
import logoImage from '../assets/logo.png';

const logoUrl = ref(logoImage);
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1989fa;
  z-index: 9999;
}

.logo {
  animation: pulse 2s infinite;
}

.app-name {
  color: white;
  font-size: 24px;
  margin-top: 20px;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>