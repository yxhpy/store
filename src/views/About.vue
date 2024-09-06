<template>
  <page-layout title="关于我们">
    <div class="about-content">
      <van-image
        class="logo"
        width="120"
        height="120"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/logo.png"
      />
      <h1 class="app-name">校园外卖 App</h1>
      <p class="version">版本 1.0.0</p>

      <van-cell-group inset class="info-group">
        <van-cell title="公司简介" is-link @click="showCompanyInfo" />
        <van-cell title="服务协议" is-link @click="showServiceAgreement" />
        <van-cell title="隐私政策" is-link @click="showPrivacyPolicy" />
        <van-cell title="联系我们" is-link @click="showContactInfo" />
      </van-cell-group>

      <van-button class="check-update-btn" type="primary" block @click="checkUpdate">检查更新</van-button>
    </div>

    <van-popup v-model:show="showPopup" class="info-popup">
      <h2>{{ popupTitle }}</h2>
      <p>{{ popupContent }}</p>
    </van-popup>
  </page-layout>
</template>

<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'
import PageLayout from '../components/PageLayout.vue'

const showPopup = ref(false)
const popupTitle = ref('')
const popupContent = ref('')

const showInfo = (title, content) => {
  popupTitle.value = title
  popupContent.value = content
  showPopup.value = true
}

const showCompanyInfo = () => {
  showInfo('公司简介', '我们是一家专注于校园外卖服务的科技公司，致力于为大学生提供便捷、高效的餐饮解决方案。')
}

const showServiceAgreement = () => {
  showInfo('服务协议', '本协议是用户与校园外卖 App 之间关于使用本软件服务的法律协议。使用本服务即表示您同意本协议的所有条款。')
}

const showPrivacyPolicy = () => {
  showInfo('隐私政策', '我们非常重视您的隐私保护，承诺对您的个人信息进行严格保密。我们只会在提供服务所必需的范围内使用您的信息。')
}

const showContactInfo = () => {
  showInfo('联系我们', '客服电话：400-123-4567\n邮箱：support@campustakeout.com\n地址：杭州市西湖区文三路 188 号')
}

const checkUpdate = () => {
  showToast('正在检查更新...')
  setTimeout(() => {
    showToast('当前已是最新版本')
  }, 2000)
}
</script>

<style scoped>
.about-content {
  padding: 20px;
  text-align: center;
}

.logo {
  margin-bottom: 20px;
}

.app-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.version {
  color: #999;
  margin-bottom: 30px;
}

.info-group {
  margin-bottom: 30px;
}

.check-update-btn {
  margin-top: 20px;
}

.info-popup {
  padding: 20px;
  max-width: 300px;
}

.info-popup h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.info-popup p {
  font-size: 14px;
  line-height: 1.5;
}
</style>