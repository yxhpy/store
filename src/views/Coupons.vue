<template>
  <page-layout title="我的优惠券">
    <van-tabs v-model:active="activeTab" sticky>
      <van-tab v-for="tab in tabs" :key="tab.name" :title="tab.title">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-coupon-cell
              v-for="coupon in filteredCoupons"
              :key="coupon.id"
              :coupon="coupon"
              :chosen="chosenCoupon && chosenCoupon.id === coupon.id"
              @click="showCouponDetail(coupon)"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

    <van-popup v-model:show="showDetail" position="bottom" round>
      <van-coupon-list
        :coupons="[selectedCoupon]"
        :show-close-button="false"
        :show-exchange-bar="false"
        :style="{ height: 'auto' }"
        @change="closeCouponDetail"
      />
    </van-popup>
  </page-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import PageLayout from '../components/PageLayout.vue'

const activeTab = ref(0)
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const showDetail = ref(false)
const selectedCoupon = ref(null)
const chosenCoupon = ref(null)

const tabs = [
  { name: 'available', title: '可使用' },
  { name: 'used', title: '已使用' },
  { name: 'expired', title: '已过期' },
]

const coupons = ref([])

const filteredCoupons = computed(() => {
  return coupons.value.filter(coupon => {
    if (tabs[activeTab.value].name === 'available') {
      return !coupon.valueDesc.includes('已使用') && !coupon.valueDesc.includes('已过期')
    } else if (tabs[activeTab.value].name === 'used') {
      return coupon.valueDesc.includes('已使用')
    } else {
      return coupon.valueDesc.includes('已过期')
    }
  })
})

const onLoad = () => {
  // 模拟加载数据
  setTimeout(() => {
    if (refreshing.value) {
      coupons.value = []
      refreshing.value = false
    }
    for (let i = 0; i < 10; i++) {
      const coupon = {
        id: coupons.value.length + 1,
        condition: `满${Math.floor(Math.random() * 100 + 50)}元可用`,
        description: '仅可用于指定商品',
        value: Math.floor(Math.random() * 50 + 10),
        valueDesc: ['', '已使用', '已过期'][Math.floor(Math.random() * 3)],
        unitDesc: '元',
        startAt: Date.now(),
        endAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
        reason: '',
      }
      coupons.value.push(coupon)
    }
    loading.value = false
    if (coupons.value.length >= 30) {
      finished.value = true
    }
  }, 1000)
}

const onRefresh = () => {
  finished.value = false
  loading.value = true
  onLoad()
}

const showCouponDetail = (coupon) => {
  selectedCoupon.value = coupon
  showDetail.value = true
}

const closeCouponDetail = () => {
  showDetail.value = false
}

</script>

<style scoped>
.van-coupon-cell {
  margin-bottom: 10px;
}

.van-pull-refresh {
  min-height: calc(100vh - 44px - 44px);
}
</style>