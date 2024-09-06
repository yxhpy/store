<template>
  <page-layout title="首页" :show-back="false">
    <template #nav-right>
      <van-icon name="chat-o" size="18" @click="onClickRight" />
    </template>
    <!-- 搜索栏 -->
    <div class="search-container">
      <van-search v-model="searchValue" placeholder="搜索你想要的美食" shape="round" background="transparent" @search="onSearch">
        <template #left-icon>
          <van-icon name="search" size="18" color="#fff" />
        </template>
      </van-search>
    </div>

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in banners" :key="index">
        <div class="banner-item" :style="{ backgroundImage: `url(${item.image})` }" @click="onBannerClick(item)">
          <div class="banner-content">
            <h2>{{ item.title }}</h2>
            <p>{{ item.subtitle }}</p>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>

    <!-- 快捷功能区 -->
    <div class="quick-actions">
      <div v-for="(item, index) in quickActions" :key="index" class="quick-action-item" @click="onQuickActionClick(item)">
        <div class="icon-wrapper" :style="{ backgroundColor: item.bgColor }">
          <van-icon :name="item.icon" :color="item.iconColor" />
        </div>
        <span>{{ item.text }}</span>
      </div>
    </div>

    <!-- 今日推荐 -->
    <div class="section">
      <h2 class="section-title">今日推荐</h2>
      <div class="recommended-items">
        <div v-for="(item, index) in recommendedItems" :key="index" class="recommended-item" @click="onItemClick(item)">
          <div class="item-image-container">
            <img :src="item.image" :alt="item.name" class="item-image">
            <div class="item-tag" v-if="item.tag">{{ item.tag }}</div>
          </div>
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p class="item-description">{{ item.description }}</p>
            <div class="item-price-row">
              <span class="item-price">¥{{ item.price }}</span>
              <van-button size="small" type="primary" @click.stop="addToCart(item)">加入购物车</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 优惠活动 -->
    <div class="section">
      <h2 class="section-title">优惠活动</h2>
      <div class="promotions">
        <div v-for="(item, index) in promotions" :key="index" class="promotion-item" @click="onPromotionClick(item)">
          <div class="promotion-icon" :style="{ backgroundColor: item.bgColor }">
            <van-icon :name="item.icon" :color="item.iconColor" />
          </div>
          <div class="promotion-info">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
  </page-layout>
</template>

<script setup>
import { ref, onMounted, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showDialog } from 'vant'
import { useCartStore } from '../store/cart'
import PageLayout from '../components/PageLayout.vue'
import { homeMockData } from '../utils/mockData'

const router = useRouter()
const searchValue = ref('')
const cartStore = useCartStore()

const banners = ref(homeMockData.banners)
const quickActions = ref([
  { icon: 'fire-o', text: '热销榜单', link: '/hot-sales', bgColor: '#FFE1E1', iconColor: '#FF4D4F' },
  { icon: 'coupon-o', text: '优惠券', link: '/coupons', bgColor: '#E6F7FF', iconColor: '#1890FF' },
  { icon: 'clock-o', text: '限时抢购', link: '/flash-sale', bgColor: '#FFF7E6', iconColor: '#FFA940' },
  { icon: 'like-o', text: '我的收藏', link: '/favorites', bgColor: '#F6FFED', iconColor: '#52C41A' },
])
const recommendedItems = ref(homeMockData.recommendedItems)
const promotions = ref(homeMockData.promotions)

onMounted(() => {
  console.log('Home component mounted')
  // 这里可以添加数据获取逻辑
})

onErrorCaptured((err, instance, info) => {
  console.error('Error captured:', err, instance, info)
  // 这里可以添加错误处理逻辑，比如显示一个默认图片
  return false // 防止错误继续传播
})

const onClickLeft = () => {
  showDialog({ title: '切换校区', message: '该功能正在开发中' })
}

const onClickRight = () => {
  router.push('/messages')
}

const onSearch = (value) => {
  console.log('搜索:', value)
  router.push({ path: '/search', query: { keyword: value } })
}

const onBannerClick = (item) => {
  router.push(item.link)
}

const onQuickActionClick = (item) => {
  router.push(item.link)
}

const onItemClick = (item) => {
  router.push({ path: `/product/${item.id}` })
}

const addToCart = (item) => {
  cartStore.addItem(item)
  showToast(`已将 ${item.name} 加入购物车`)
}

const onPromotionClick = (item) => {
  router.push({ path: `/promotion/${item.id}` })
}
</script>

<style scoped>
.home {
  background-color: #f8f8f8;
  min-height: 100vh;
}

.custom-nav-bar {
  background-color: transparent;
}

.location-text {
  font-size: 14px;
  margin-left: 5px;
}

.search-container {
  padding: 10px 15px;
  background: linear-gradient(135deg, #4a90e2, #5ca0f2);
}

.my-swipe {
  height: 200px;
  border-radius: 0 0 20px 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.banner-item {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 20px;
}

.banner-content {
  color: white;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
}

.banner-content h2 {
  font-size: 24px;
  margin: 0;
}

.banner-content p {
  font-size: 16px;
  margin: 5px 0 0;
}

.quick-actions {
  display: flex;
  justify-content: space-around;
  padding: 20px 15px;
  background-color: white;
  box-shadow: 0 2px 12px rgba(100, 100, 100, 0.1);
  border-radius: 20px;
  margin: -20px 15px 0;
  position: relative;
  z-index: 1;
}

.quick-action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  transition: transform 0.3s ease;
}

.icon-wrapper:hover {
  transform: scale(1.1);
}

.icon-wrapper .van-icon {
  font-size: 24px;
}

.section {
  margin-top: 30px;
  padding: 0 15px;
}

.section-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
  position: relative;
  padding-left: 15px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 20px;
  background-color: #4a90e2;
  border-radius: 2px;
}

.recommended-items {
  display: flex;
  overflow-x: auto;
  padding-bottom: 15px;
  scroll-snap-type: x mandatory;
}

.recommended-item {
  flex: 0 0 auto;
  width: 250px;
  margin-right: 15px;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  scroll-snap-align: start;
  transition: transform 0.3s ease;
}

.recommended-item:hover {
  transform: translateY(-5px);
}

.item-image-container {
  position: relative;
}

.item-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.item-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 77, 79, 0.9);
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.item-info {
  padding: 12px;
}

.item-info h3 {
  margin: 0 0 5px;
  font-size: 16px;
}

.item-description {
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
}

.item-price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-price {
  font-size: 18px;
  font-weight: bold;
  color: #f44;
}

.promotions {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.promotion-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.3s ease;
}

.promotion-item:hover {
  background-color: #f9f9f9;
}

.promotion-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.promotion-icon .van-icon {
  font-size: 20px;
}

.promotion-info {
  flex: 1;
}

.promotion-info h3 {
  margin: 0 0 5px;
  font-size: 16px;
}

.promotion-info p {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.van-button--primary {
  background-color: #4a90e2;
  border-color: #4a90e2;
}

/* 添加一些动画效果 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.home > * {
  animation: fadeIn 0.5s ease-out;
}

.recommended-items::-webkit-scrollbar {
  display: none;
}

.recommended-items {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>