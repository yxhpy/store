<template>
  <page-layout title="新品上市">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-card
          v-for="product in newProducts"
          :key="product.id"
          :price="product.price"
          :title="product.name"
          :thumb="product.image"
          :tag="product.tag"
          @click="goToProductDetail(product)"
        >
          <template #desc>
            <div>{{ product.description }}</div>
            <div class="product-info">
              <span>上市时间: {{ product.releaseDate }}</span>
              <van-rate :value="product.rating" readonly allow-half />
            </div>
          </template>
          <template #tags>
            <van-tag plain type="danger">新品</van-tag>
          </template>
          <template #footer>
            <van-button size="mini" type="primary" @click.stop="addToCart(product)">加入购物车</van-button>
          </template>
        </van-card>
      </van-list>
    </van-pull-refresh>
  </page-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import PageLayout from '../components/PageLayout.vue'
import { useCartStore } from '../store/cart'

const router = useRouter()
const cartStore = useCartStore()

const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const newProducts = ref([])

const onLoad = () => {
  // 模拟加载数据
  setTimeout(() => {
    if (refreshing.value) {
      newProducts.value = []
      refreshing.value = false
    }
    for (let i = 0; i < 10; i++) {
      const product = {
        id: newProducts.value.length + 1,
        name: `新品 ${newProducts.value.length + 1}`,
        price: (Math.random() * 50 + 10).toFixed(2),
        description: `这是新品 ${newProducts.value.length + 1} 的描述`,
        image: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/100/100`,
        tag: '限时优惠',
        releaseDate: new Date().toLocaleDateString(),
        rating: (Math.random() * 2 + 3).toFixed(1)
      }
      newProducts.value.push(product)
    }
    loading.value = false
    if (newProducts.value.length >= 30) {
      finished.value = true
    }
  }, 1000)
}

const onRefresh = () => {
  finished.value = false
  loading.value = true
  onLoad()
}

const goToProductDetail = (product) => {
  router.push({ path: `/product/${product.id}` })
}

const addToCart = (product) => {
  cartStore.addItem(product)
  showToast(`已将 ${product.name} 加入购物车`)
}
</script>

<style scoped>
.van-card {
  margin-bottom: 10px;
  background-color: #fff;
}

.product-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  font-size: 12px;
  color: #999;
}

.van-rate {
  font-size: 12px;
}
</style>