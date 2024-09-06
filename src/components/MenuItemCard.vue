<template>
  <van-card
    :price="item.price"
    :title="item.name"
    :thumb="item.image"
  >
    <template #desc>
      <div>{{ item.description }}</div>
    </template>
    <template #tags>
      <van-tag plain type="danger" v-if="item.spicy">辣</van-tag>
      <van-tag plain type="primary" v-if="item.vegetarian">素食</van-tag>
    </template>
    <template #footer>
      <van-button size="small" type="primary" @click="addToCart">加入购物车</van-button>
    </template>
  </van-card>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-to-cart'])

const addToCart = () => {
  emit('add-to-cart', props.item)
}
</script>

<style scoped>
.van-card {
  background-color: #fff;
  margin-bottom: 10px;
}

.van-tag {
  margin-right: 5px;
}
</style>