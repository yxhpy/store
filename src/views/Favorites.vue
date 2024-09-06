<template>
  <page-layout title="我的收藏">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-swipe-cell v-for="item in favoriteItems" :key="item.id">
          <van-card
            :price="item.price"
            :title="item.name"
            :thumb="item.image"
            :desc="item.description"
            @click="goToProductDetail(item)"
          >
            <template #tags>
              <van-tag plain type="danger">收藏</van-tag>
            </template>
            <template #footer>
              <van-button size="mini" @click.stop="addToCart(item)">加入购物车</van-button>
            </template>
          </van-card>
          <template #right>
            <van-button square text="取消收藏" type="danger" class="delete-button" @click="removeFavorite(item)" />
          </template>
        </van-swipe-cell>
      </van-list>
    </van-pull-refresh>

    <van-empty v-if="favoriteItems.length === 0" description="暂无收藏商品" />
  </page-layout>
</template>

<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'
import PageLayout from '../components/PageLayout.vue'
import { useCartStore } from '../store/cart'

const router = useRouter()
const cartStore = useCartStore()
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const favoriteItems = ref([])

const onLoad = () => {
  // 模拟加载数据
  setTimeout(() => {
    if (refreshing.value) {
      favoriteItems.value = []
      refreshing.value = false
    }
    for (let i = 0; i < 10; i++) {
      const item = {
        id: favoriteItems.value.length + 1,
        name: `收藏商品${favoriteItems.value.length + 1}`,
        price: (Math.random() * 100 + 10).toFixed(2),
        description: `这是收藏商品${favoriteItems.value.length + 1}的描述`,
        image: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/100/100`,
      }
      favoriteItems.value.push(item)
    }
    loading.value = false
    if (favoriteItems.value.length >= 30) {
      finished.value = true
    }
  }, 1000)
}

const onRefresh = () => {
  finished.value = false
  loading.value = true
  onLoad()
}

const addToCart = (item) => {
  cartStore.addItem(item)
  showToast(`已将 ${item.name} 加入购物车`)
}

const removeFavorite = (item) => {
  const index = favoriteItems.value.findIndex(i => i.id === item.id)
  if (index !== -1) {
    favoriteItems.value.splice(index, 1)
    showToast('已取消收藏')
  }
}

const goToProductDetail = (item) => {
  router.push({ path: `/product/${item.id}` })
}
</script>

<style scoped>
.van-swipe-cell {
  margin-bottom: 10px;
}

.delete-button {
  height: 100%;
}

.van-card {
  background-color: #fff;
}

.van-pull-refresh {
  min-height: calc(100vh - 46px);
}

.van-card {
  cursor: pointer;
}
</style>