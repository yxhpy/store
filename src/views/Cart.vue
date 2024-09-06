<template>
  <page-layout title="购物车" :show-back="false">
    <div v-if="cartItems.length === 0" class="empty-cart">
      <van-empty description="购物车是空的" />
      <van-button type="primary" block @click="goToMenu">去逛逛</van-button>
    </div>
    <template v-else>
      <div class="cart-items">
        <van-swipe-cell v-for="item in cartItems" :key="item.id">
          <van-card
            :price="item.price"
            :title="item.name"
            :thumb="item.image"
            :class="{ 'cart-item-card': true, 'cart-item-removing': removingItemId === item.id }"
          >
            <template #desc>
              <div class="item-description">{{ item.description }}</div>
            </template>
            <template #num>
              <van-stepper v-model="item.quantity" @change="updateQuantity(item)" />
            </template>
          </van-card>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="removeItem(item)" />
          </template>
        </van-swipe-cell>
      </div>
      <div class="cart-summary" v-if="cartItems.length > 0">
        <div class="summary-item">
          <span>小计</span>
          <span>¥{{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-item discount" v-if="discount > 0">
          <span>优惠</span>
          <span>-¥{{ discount.toFixed(2) }}</span>
        </div>
      </div>
      <div class="cart-footer">
        <div class="total-price">
          总计: <span class="price">¥{{ totalPrice.toFixed(2) }}</span>
        </div>
        <van-button type="primary" block @click="showCheckoutDialog" :loading="isCheckingOut">
          结算 ({{ totalItems }} 件)
        </van-button>
      </div>
    </template>
  </page-layout>

  <van-dialog v-model:show="checkoutDialogVisible" title="确认订单" :show-cancel-button="true" @confirm="checkout">
    <div class="checkout-dialog-content">
      <p>共 {{ totalItems }} 件商品</p>
      <p>总计: ¥{{ totalPrice.toFixed(2) }}</p>
    </div>
  </van-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../store/cart'
import { showToast } from 'vant'
import PageLayout from '../components/PageLayout.vue'
import { cartMockData } from '../utils/mockData'

const router = useRouter()
const cartStore = useCartStore()

const removingItemId = ref(null)
const checkoutDialogVisible = ref(false)
const isCheckingOut = ref(false)

// 使用模拟数据初始化购物车
const initializeCart = () => {
  cartMockData.items.forEach(item => {
    cartStore.addItem(item, item.quantity)
  })
}

// 在组件挂载时初始化购物车
onMounted(() => {
  if (cartStore.items.length === 0) {
    initializeCart()
  }
})

const cartItems = computed(() => cartStore.items)
const subtotal = computed(() => cartStore.subtotal || 0)
const discount = computed(() => cartStore.discount || 0)
const totalPrice = computed(() => cartStore.totalPrice || 0)
const totalItems = computed(() => cartStore.totalItems || 0)

const updateQuantity = (item) => {
  cartStore.updateItemQuantity(item.id, item.quantity)
}

const removeItem = async (item) => {
  removingItemId.value = item.id
  await new Promise(resolve => setTimeout(resolve, 300)) // 等待动画完成
  cartStore.removeItem(item.id)
  removingItemId.value = null
  showToast('商品已从购物车中移除')
}

const showCheckoutDialog = () => {
  checkoutDialogVisible.value = true
}

const checkout = async () => {
  isCheckingOut.value = true
  // 模拟结算过程
  await new Promise(resolve => setTimeout(resolve, 1500))
  isCheckingOut.value = false
  cartStore.clearCart()
  showToast({
    message: '订单已提交',
    type: 'success'
  })
  router.push('/orders')
}

const goToMenu = () => {
  router.push('/menu')
}
</script>

<style scoped>
.empty-cart {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.empty-cart .van-button {
  margin-top: 20px;
  width: 200px;
}

.cart-items {
  margin-bottom: 120px;
}

.cart-item-card {
  background-color: #fff;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.cart-item-removing {
  opacity: 0;
  transform: translateX(-100%);
}

.item-description {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.cart-summary {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.summary-item.discount {
  color: #ff5722;
}

.cart-footer {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 10px 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.total-price {
  font-size: 16px;
  margin-bottom: 10px;
}

.total-price .price {
  font-size: 20px;
  font-weight: bold;
  color: #ff5722;
}

.delete-button {
  height: 100%;
}

.checkout-dialog-content {
  padding: 20px;
  text-align: center;
}

/* 添加一些动画效果 */
.cart-item-card {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.van-button--primary {
  background-color: #1989fa;
  border-color: #1989fa;
}

.van-button--primary:active {
  background-color: #0e5aa7;
  border-color: #0e5aa7;
}
</style>