<template>
  <van-search
    v-model="searchValue"
    placeholder="搜索菜品"
    @search="onSearch"
  />
</template>

<script setup>
import { ref } from 'vue'

const searchValue = ref('')
const emit = defineEmits(['search'])

const onSearch = (value) => {
  emit('search', value)
}
</script>