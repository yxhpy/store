<template>
  <div class="page-layout">
    <van-nav-bar
      :title="title"
      :left-text="showBack ? '返回' : ''"
      :left-arrow="showBack"
      @click-left="onClickLeft"
    >
      <template #right>
        <slot name="nav-right"></slot>
      </template>
    </van-nav-bar>
    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  showBack: {
    type: Boolean,
    default: true
  }
})

const router = useRouter()

const onClickLeft = () => {
  if (props.showBack) {
    router.back()
  }
}
</script>

<style scoped>
.page-layout {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-bottom: 50px;
}

.page-content {
  padding: 16px;
}

:deep(.van-nav-bar) {
  background-color: transparent;
}

:deep(.van-nav-bar__title) {
  color: #333;
  font-size: 18px;
}

:deep(.van-nav-bar__text) {
  color: #333;
}

:deep(.van-icon) {
  color: #333;
}
</style>