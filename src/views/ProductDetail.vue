<template>
  <page-layout :title="food ? food.name : '商品详情'">
    <template v-if="loading">
      <van-loading type="spinner" vertical>加载中...</van-loading>
    </template>
    <template v-else-if="food">
      <van-image
        width="100%"
        height="200"
        :src="food.image"
        :alt="food.name"
        class="food-image"
      />

      <div class="food-info">
        <h1 class="food-name">{{ food.name }}</h1>
        <p class="food-price">¥{{ food.price }}</p>
        <div class="food-tags">
          <van-tag plain type="danger" v-if="food.isSpicy">辣</van-tag>
          <van-tag plain type="success" v-if="food.isVegetarian">素食</van-tag>
          <van-tag plain type="primary" v-if="food.isRecommended">推荐</van-tag>
        </div>
        <p class="food-description">{{ food.description }}</p>
      </div>

      <van-divider />

      <div class="food-details">
        <van-cell-group>
          <van-cell title="食堂" :value="food.canteen" />
          <van-cell title="窗口" :value="food.stall" />
          <van-cell title="供应时间" :value="food.availableTime" />
          <van-cell title="月销量" :value="`${food.monthlySales}份`" />
        </van-cell-group>
      </div>

      <van-divider />

      <div class="food-reviews">
        <h2>评价 ({{ food.reviews.length }})</h2>
        <van-list>
          <van-cell v-for="review in food.reviews" :key="review.id">
            <template #title>
              <div class="review-header">
                <span>{{ review.username }}</span>
                <van-rate :value="review.rating" readonly allow-half />
              </div>
            </template>
            <template #label>
              <div class="review-content">{{ review.content }}</div>
              <div class="review-time">{{ review.time }}</div>
            </template>
          </van-cell>
        </van-list>
      </div>

      <div class="bottom-placeholder"></div>

      <div class="food-actions">
        <van-button icon="star-o" type="default" @click="toggleFavorite">{{ isFavorite ? '已收藏' : '收藏' }}</van-button>
        <van-button type="warning" @click="addToCart">加入购物车</van-button>
        <van-button type="danger" @click="buyNow">立即购买</van-button>
      </div>
    </template>
    <template v-else>
      <van-empty description="商品信息加载失败" />
    </template>
  </page-layout>

  <van-action-sheet v-model:show="showPurchaseOptions" title="购买选项">
    <div class="purchase-options">
      <van-stepper v-model="quantity" :min="1" :max="food?.stock || 1" />
      <van-button type="danger" block @click="confirmPurchase">确认购买</van-button>
    </div>
  </van-action-sheet>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import PageLayout from '../components/PageLayout.vue'
import { useCartStore } from '../store/cart'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const food = ref(null)
const quantity = ref(1)
const showPurchaseOptions = ref(false)
const isFavorite = ref(false)
const loading = ref(true)

onMounted(async () => {
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 这里应该从API获取食品详情，现在我们用模拟数据
    food.value = {
      id: route.params.id,
      name: '香辣鸡腿堡',
      price: '15.00',
      description: '新鲜鸡腿肉，秘制香辣酱料，口感鲜嫩多汁。',
      image: 'https://picsum.photos/id/1/400/400',
      isSpicy: true,
      isVegetarian: false,
      isRecommended: true,
      canteen: '第一食堂',
      stall: '快餐窗口',
      availableTime: '10:30 - 20:00',
      monthlySales: 500,
      stock: 50,
      reviews: [
        { id: 1, username: '张三', rating: 4.5, content: '味道不错，分量足，下次还会再买。', time: '2023-05-20 12:30' },
        { id: 2, username: '李四', rating: 5, content: '很好吃，辣度刚好，推荐！', time: '2023-05-19 18:45' },
      ]
    }
  } catch (error) {
    console.error('Failed to load food details:', error)
    showToast('加载商品信息失败，请稍后重试')
  } finally {
    loading.value = false
  }
})

const addToCart = () => {
  if (food.value) {
    cartStore.addItem({ ...food.value, quantity: 1 })
    showToast('已加入购物车')
  }
}

const buyNow = () => {
  showPurchaseOptions.value = true
}

const confirmPurchase = () => {
  showPurchaseOptions.value = false
  showToast(`购买成功：${quantity.value}份`)
  router.push('/orders')
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  showToast(isFavorite.value ? '已加入收藏' : '已取消收藏')
}
</script>

<style scoped>
.food-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.food-info {
  padding: 16px;
  background-color: #fff;
}

.food-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}

.food-price {
  font-size: 18px;
  color: #f44;
  margin-bottom: 8px;
}

.food-tags {
  margin-bottom: 8px;
}

.food-tags .van-tag {
  margin-right: 5px;
}

.food-description {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.food-details {
  margin-top: 16px;
}

.food-reviews {
  padding: 16px;
}

.food-reviews h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-content {
  margin-top: 5px;
}

.review-time {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.bottom-placeholder {
  height: 60px;
}

.food-actions {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  padding: 10px 16px;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.food-actions .van-button {
  flex: 1;
  margin: 0 5px;
}

.purchase-options {
  padding: 16px;
}

.purchase-options .van-stepper {
  margin-bottom: 16px;
}

.van-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>