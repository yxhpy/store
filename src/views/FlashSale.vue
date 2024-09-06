<template>
  <page-layout title="限时抢购">
    <van-count-down :time="timeRemaining" class="countdown">
      <template #default="timeData">
        <span class="countdown-item">{{ timeData.hours }}</span>
        <span class="countdown-colon">:</span>
        <span class="countdown-item">{{ timeData.minutes }}</span>
        <span class="countdown-colon">:</span>
        <span class="countdown-item">{{ timeData.seconds }}</span>
      </template>
    </van-count-down>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-card
          v-for="item in flashSaleItems"
          :key="item.id"
          :price="item.salePrice"
          :origin-price="item.originalPrice"
          :title="item.name"
          :thumb="item.image"
        >
          <template #tags>
            <van-tag type="danger">限时特惠</van-tag>
          </template>
          <template #footer>
            <van-button size="small" type="danger" :disabled="item.stock <= 0" @click="buyNow(item)">
              {{ item.stock > 0 ? '立即抢购' : '已售罄' }}
            </van-button>
          </template>
        </van-card>
      </van-list>
    </van-pull-refresh>

    <van-dialog v-model:show="showBuyConfirm" title="确认购买" :show-cancel-button="true" @confirm="confirmPurchase">
      <div class="buy-confirm-content">
        <p>商品：{{ selectedItem?.name }}</p>
        <p>价格：¥{{ selectedItem?.salePrice }}</p>
      </div>
    </van-dialog>
  </page-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { showToast } from 'vant'
import PageLayout from '../components/PageLayout.vue'

const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const timeRemaining = ref(2 * 60 * 60 * 1000) // 2小时
const flashSaleItems = ref([])
const showBuyConfirm = ref(false)
const selectedItem = ref(null)

let timer

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  clearInterval(timer)
})

const startTimer = () => {
  timer = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value -= 1000
    } else {
      clearInterval(timer)
      showToast('限时抢购已结束')
    }
  }, 1000)
}

const onLoad = () => {
  // 模拟加载数据
  setTimeout(() => {
    if (refreshing.value) {
      flashSaleItems.value = []
      refreshing.value = false
    }
    for (let i = 0; i < 10; i++) {
      const item = {
        id: flashSaleItems.value.length + 1,
        name: `限时特惠商品${flashSaleItems.value.length + 1}`,
        salePrice: (Math.random() * 50 + 10).toFixed(2),
        originalPrice: (Math.random() * 100 + 50).toFixed(2),
        image: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/100/100`,
        stock: Math.floor(Math.random() * 10)
      }
      flashSaleItems.value.push(item)
    }
    loading.value = false
    if (flashSaleItems.value.length >= 30) {
      finished.value = true
    }
  }, 1000)
}

const onRefresh = () => {
  finished.value = false
  loading.value = true
  onLoad()
}

const buyNow = (item) => {
  selectedItem.value = item
  showBuyConfirm.value = true
}

const confirmPurchase = () => {
  if (selectedItem.value) {
    if (selectedItem.value.stock > 0) {
      selectedItem.value.stock--
      showToast('购买成功！')
    } else {
      showToast('抱歉，商品已售罄')
    }
  }
}
</script>

<style scoped>
.countdown {
  text-align: center;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
}

.countdown-item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #f44;
  border-radius: 2px;
}

.countdown-colon {
  display: inline-block;
  margin: 0 4px;
  color: #f44;
}

.van-card {
  margin-bottom: 10px;
}

.buy-confirm-content {
  padding: 20px;
  text-align: center;
}
</style>