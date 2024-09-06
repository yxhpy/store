<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar v-model="active" class="custom-tabbar" @change="onTabChange">
      <van-tabbar-item v-for="(item, index) in tabbarItems" :key="index" :icon="item.icon" :to="item.to" :badge="item.to === '/cart' ? cartItemCount : ''">
        {{ item.text }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from './store/cart'

const router = useRouter()
const route = useRoute()
const active = ref(0)
const cartStore = useCartStore()

const cartItemCount = computed(() => cartStore.totalItems || '')

const tabbarItems = [
  { icon: 'home-o', text: '首页', to: '/' },
  { icon: 'apps-o', text: '菜单', to: '/menu' },
  { icon: 'shopping-cart-o', text: '购物车', to: '/cart' },
  { icon: 'orders-o', text: '订单', to: '/orders' },
  { icon: 'user-o', text: '我的', to: '/profile' }
]

const onTabChange = (index) => {
  const targetPath = tabbarItems[index].to
  if (route.path === targetPath) {
    // 如果点击的是当前页面，则刷新该页面
    router.go(0)
  } else {
    // 否则正常导航到目标页面
    router.push(targetPath)
  }
}

// 监听路由变化，更新底部导航栏的激活状态
watch(() => route.path, (newPath) => {
  const index = tabbarItems.findIndex(item => item.to === newPath)
  if (index !== -1) {
    active.value = index
  }
})
</script>

<style>
#app {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-bottom: 50px; /* 为底部导航留出空间 */
}

.custom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.custom-tabbar .van-tabbar-item {
  color: #7d7e80;
}

.custom-tabbar .van-tabbar-item--active {
  color: #1989fa;
}

.custom-tabbar .van-icon {
  font-size: 22px;
}

.custom-tabbar .van-tabbar-item__text {
  font-size: 10px;
  margin-top: 3px;
}
</style>
