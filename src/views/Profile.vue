<template>
  <page-layout title="我的" :show-back="false">
    <div class="profile-header">
      <div class="avatar-container">
        <van-image
          round
          width="80"
          height="80"
          :src="userInfo.avatar"
          @click="uploadAvatar"
        />
        <van-uploader v-show="false" ref="avatarUploader" :after-read="afterRead" />
      </div>
      <div class="user-info">
        <h2>{{ userInfo.name }}</h2>
        <p>{{ userInfo.phone }}</p>
      </div>
    </div>

    <van-cell-group inset class="user-stats">
      <van-grid :column-num="4" :border="false">
        <van-grid-item icon="gold-coin-o" :text="userInfo.points + '积分'" to="/points" />
        <van-grid-item icon="coupon-o" :text="userInfo.coupons + '优惠券'" to="/coupons" />
        <van-grid-item icon="like-o" :text="userInfo.favorites + '收藏'" to="/favorites" />
        <van-grid-item icon="gift-o" :text="userInfo.gifts + '礼品卡'" to="/gift-cards" />
      </van-grid>
    </van-cell-group>

    <van-cell-group inset class="menu-list">
      <van-cell title="我的订单" is-link to="/orders" />
      <van-cell title="收货地址" is-link to="/addresses" />
      <van-cell title="账户安全" is-link to="/security" />
      <van-cell title="消息中心" is-link to="/messages" />
      <van-cell title="帮助中心" is-link to="/help" />
      <van-cell title="关于我们" is-link to="/about" />
    </van-cell-group>

    <div class="logout-button">
      <van-button block type="danger" @click="logout">退出登录</van-button>
    </div>
  </page-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showSuccessToast } from 'vant'
import PageLayout from '../components/PageLayout.vue'

const router = useRouter()
const avatarUploader = ref(null)

const userInfo = ref({
  name: '张三',
  phone: '138****8888',
  avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
  points: 1000,
  coupons: 5,
  favorites: 10,
  gifts: 2
})

const uploadAvatar = () => {
  avatarUploader.value.chooseFile()
}

const afterRead = (file) => {
  // 这里应该调用上传头像的API
  console.log('Uploading file:', file)
  showSuccessToast('头像上传成功')
  // 模拟更新头像
  userInfo.value.avatar = URL.createObjectURL(file.file)
}

const logout = () => {
  showToast('退出登录')
  // 这里应该调用登出的API，然后重定向到登录页面
  router.push('/login')
}
</script>

<style scoped>
.profile-header {
  background: linear-gradient(135deg, #4a90e2, #5ca0f2);
  padding: 20px;
  display: flex;
  align-items: center;
  color: white;
}

.avatar-container {
  margin-right: 20px;
}

.user-info h2 {
  margin: 0;
  font-size: 20px;
}

.user-info p {
  margin: 5px 0 0;
  font-size: 14px;
  opacity: 0.8;
}

.user-stats {
  margin-top: -20px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(100, 100, 100, 0.1);
}

.menu-list {
  margin-top: 20px;
}

.logout-button {
  margin-top: 20px;
  padding: 0 16px;
}

/* 添加一些动画效果 */
.profile-header, .user-stats, .menu-list, .logout-button {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.van-button--danger {
  background-color: #ee0a24;
  border-color: #ee0a24;
}

.van-button--danger:active {
  background-color: #cf0a1d;
  border-color: #cf0a1d;
}
</style>