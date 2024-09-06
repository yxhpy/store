<template>
  <page-layout :title="`搜索结果: ${keyword}`">
    <van-search
      v-model="keyword"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />

    <van-dropdown-menu>
      <van-dropdown-item v-model="sortBy" :options="sortOptions" />
      <van-dropdown-item v-model="filterBy" :options="filterOptions" />
    </van-dropdown-menu>

    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group inset v-for="item in searchResults" :key="item.id" class="search-result-item">
        <van-card
          :price="item.price"
          :title="item.name"
          :thumb="item.image"
          @click="goToProductDetail(item)"
        >
          <template #desc>
            <div>{{ item.description }}</div>
            <div>月售 {{ item.monthlySales }} | 好评率 {{ item.rating }}%</div>
          </template>
          <template #tags>
            <van-tag plain type="danger" v-if="item.isSpicy">辣</van-tag>
            <van-tag plain type="success" v-if="item.isVegetarian">素食</van-tag>
          </template>
          <template #footer>
            <van-button size="mini" type="primary" @click.stop="addToCart(item)">加入购物车</van-button>
          </template>
        </van-card>
      </van-cell-group>
    </van-list>

    <van-empty v-if="searchResults.length === 0" description="暂无搜索结果" />
  </page-layout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import PageLayout from '../components/PageLayout.vue'
import { useCartStore } from '../store/cart'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const keyword = ref('')
const loading = ref(false)
const finished = ref(false)
const searchResults = ref([])
const sortBy = ref('default')
const filterBy = ref('all')

const sortOptions = [
  { text: '默认排序', value: 'default' },
  { text: '销量优先', value: 'sales' },
  { text: '价格从低到高', value: 'priceAsc' },
  { text: '价格从高到低', value: 'priceDesc' },
]

const filterOptions = [
  { text: '全部', value: 'all' },
  { text: '辣', value: 'spicy' },
  { text: '素食', value: 'vegetarian' },
]

onMounted(() => {
  keyword.value = route.query.keyword || ''
  performSearch()
})

watch(() => route.query.keyword, (newKeyword) => {
  keyword.value = newKeyword || ''
  performSearch()
})

const performSearch = () => {
  // 重置搜索结果和状态
  searchResults.value = []
  finished.value = false
  loading.value = true
  onLoad()
}

const onLoad = () => {
  // 模拟API调用
  setTimeout(() => {
    const newResults = Array.from({ length: 10 }, (_, index) => ({
      id: searchResults.value.length + index + 1,
      name: `搜索结果 ${searchResults.value.length + index + 1}`,
      price: (Math.random() * 50 + 10).toFixed(2),
      description: `这是搜索结果 ${searchResults.value.length + index + 1} 的描述`,
      image: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/100/100`,
      monthlySales: Math.floor(Math.random() * 1000),
      rating: Math.floor(Math.random() * 20 + 80),
      isSpicy: Math.random() > 0.5,
      isVegetarian: Math.random() > 0.7,
    }))

    searchResults.value.push(...newResults)
    loading.value = false

    if (searchResults.value.length >= 30) {
      finished.value = true
    }
  }, 1000)
}

const onSearch = () => {
  router.push({ path: '/search', query: { keyword: keyword.value } })
}

const onCancel = () => {
  router.go(-1)
}

const goToProductDetail = (item) => {
  router.push({ path: `/product/${item.id}` })
}

const addToCart = (item) => {
  cartStore.addItem(item)
  showToast(`已将 ${item.name} 加入购物车`)
}

// 监听排序和筛选变化
watch([sortBy, filterBy], () => {
  // 在实际应用中，这里应该重新请求后端API
  // 现在我们只是简单地重新加载数据
  performSearch()
})
</script>

<style scoped>
.search-result-item {
  margin-bottom: 10px;
}

.van-dropdown-menu {
  margin-bottom: 10px;
}
</style>