<template>
  <van-tabs v-model:active="activeCategory" sticky>
    <van-tab v-for="category in categories" :key="category.id" :title="category.name">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <menu-item-card
          v-for="item in category.items"
          :key="item.id"
          :item="item"
          @add-to-cart="addToCart"
        />
      </van-list>
    </van-tab>
  </van-tabs>
</template>

<script setup>
import { ref } from 'vue'
import MenuItemCard from './MenuItemCard.vue'

const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['add-to-cart'])

const activeCategory = ref(0)
const loading = ref(false)
const finished = ref(false)

const onLoad = () => {
  // 这里可以实现加载更多数据的逻辑
  // 模拟异步加载
  setTimeout(() => {
    // 如果没有更多数据了，将 finished 设置为 true
    finished.value = true
    loading.value = false
  }, 1000)
}

const addToCart = (item) => {
  emit('add-to-cart', item)
}
</script>