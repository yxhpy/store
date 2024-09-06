<template>
  <page-layout title="菜单" :show-back="false">
    <template #nav-right>
      <van-icon name="search" size="18" @click="showSearch = true" />
    </template>
    <van-popup v-model:show="showSearch" position="top" :style="{ height: '100%' }">
      <menu-search @search="onSearch" @close="showSearch = false" />
    </van-popup>
    <menu-categories
      :categories="categories"
      @add-to-cart="addToCart"
    />
  </page-layout>
</template>

<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'
import { useCartStore } from '../store/cart'
import PageLayout from '../components/PageLayout.vue'
import MenuSearch from '../components/MenuSearch.vue'
import MenuCategories from '../components/MenuCategories.vue'
import { menuMockData } from '../utils/mockData'

const cartStore = useCartStore()
const showSearch = ref(false)

const categories = ref(menuMockData.categories)

const onSearch = (value) => {
  console.log('搜索:', value)
  showSearch.value = false
  // 这里可以实现搜索逻辑
}

const addToCart = (item) => {
  cartStore.addItem(item)
  showToast(`已将 ${item.name} 加入购物车`)
}
</script>