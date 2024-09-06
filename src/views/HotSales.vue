<template>
  <page-layout title="热销榜单">
    <van-tabs v-model:active="activeTab" sticky>
      <van-tab v-for="tab in tabs" :key="tab.name" :title="tab.title">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell-group inset v-for="(item, index) in filteredItems" :key="item.id" class="hot-item">
            <van-card
              :num="item.sales"
              :price="item.price"
              :title="item.name"
              :thumb="item.image"
            >
              <template #tags>
                <van-tag type="danger" v-if="index < 3">Top {{ index + 1 }}</van-tag>
              </template>
              <template #footer>
                <van-button size="small" type="primary" @click="addToCart(item)">加入购物车</van-button>
              </template>
            </van-card>
          </van-cell-group>
        </van-list>
      </van-tab>
    </van-tabs>
  </page-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import { useCartStore } from '../store/cart'
import PageLayout from '../components/PageLayout.vue'

const cartStore = useCartStore()
const activeTab = ref(0)
const loading = ref(false)
const finished = ref(false)

const tabs = [
  { name: 'all', title: '全部' },
  { name: 'food', title: '美食' },
  { name: 'drink', title: '饮品' },
  { name: 'snack', title: '小吃' },
]

const hotItems = ref([])

const filteredItems = computed(() => {
  if (tabs[activeTab.value].name === 'all') {
    return hotItems.value
  }
  return hotItems.value.filter(item => item.category === tabs[activeTab.value].name)
})

const onLoad = () => {
  // 模拟加载数据
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      const item = {
        id: hotItems.value.length + 1,
        name: `热销商品${hotItems.value.length + 1}`,
        price: (Math.random() * 50 + 10).toFixed(2),
        sales: Math.floor(Math.random() * 1000 + 100),
        image: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/100/100`,
        category: ['food', 'drink', 'snack'][Math.floor(Math.random() * 3)]
      }
      hotItems.value.push(item)
    }
    loading.value = false
    if (hotItems.value.length >= 30) {
      finished.value = true
    }
  }, 1000)
}

const addToCart = (item) => {
  cartStore.addItem(item)
  showToast(`已将 ${item.name} 加入购物车`)
}
</script>

<style scoped>
.hot-item {
  margin-bottom: 10px;
}

.van-card__price {
  color: #f44;
}

.van-card__num {
  color: #999;
}
</style>