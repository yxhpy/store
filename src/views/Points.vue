<template>
  <page-layout title="我的积分">
    <div class="points-header">
      <div class="points-balance">
        <h2>当前积分</h2>
        <p class="points-number">{{ userPoints }}</p>
      </div>
      <van-button type="primary" size="small" @click="showExchangeDialog">兑换积分</van-button>
    </div>

    <van-tabs v-model:active="activeTab" sticky>
      <van-tab title="积分明细">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="item in pointsRecords" :key="item.id" :title="item.description" :label="item.time">
            <template #right-icon>
              <span :class="{ 'points-increase': item.change > 0, 'points-decrease': item.change < 0 }">
                {{ item.change > 0 ? '+' : '' }}{{ item.change }}
              </span>
            </template>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="积分规则">
        <div class="points-rules">
          <h3>获取积分</h3>
          <p>1. 每消费1元获得1积分</p>
          <p>2. 评价订单可获得5积分</p>
          <p>3. 每日首次登录可获得2积分</p>
          <h3>使用积分</h3>
          <p>1. 100积分可兑换1元优惠券</p>
          <p>2. 积分可用于抵扣部分商品的价格</p>
          <p>3. 特定活动期间可参与积分抽奖</p>
        </div>
      </van-tab>
    </van-tabs>

    <van-dialog v-model:show="showExchange" title="兑换积分" @confirm="exchangePoints">
      <van-field v-model="exchangeAmount" type="number" label="兑换数量" placeholder="请输入要兑换的积分数量" />
    </van-dialog>
  </page-layout>
</template>

<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'
import PageLayout from '../components/PageLayout.vue'

const activeTab = ref(0)
const loading = ref(false)
const finished = ref(false)
const userPoints = ref(1000)
const pointsRecords = ref([])
const showExchange = ref(false)
const exchangeAmount = ref('')

const onLoad = () => {
  // 模拟加载数据
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      const change = Math.floor(Math.random() * 100) - 50
      pointsRecords.value.push({
        id: pointsRecords.value.length + 1,
        description: change > 0 ? '购物奖励' : '积分兑换',
        change: change,
        time: new Date().toLocaleString()
      })
    }
    loading.value = false
    if (pointsRecords.value.length >= 40) {
      finished.value = true
    }
  }, 1000)
}

const showExchangeDialog = () => {
  showExchange.value = true
}

const exchangePoints = () => {
  const amount = parseInt(exchangeAmount.value)
  if (isNaN(amount) || amount <= 0) {
    showToast('请输入有效的积分数量')
    return
  }
  if (amount > userPoints.value) {
    showToast('积分不足')
    return
  }
  userPoints.value -= amount
  showToast(`成功兑换${amount}积分`)
  exchangeAmount.value = ''
  // 这里可以添加兑换后的逻辑，比如添加一条兑换记录
  pointsRecords.value.unshift({
    id: pointsRecords.value.length + 1,
    description: '积分兑换',
    change: -amount,
    time: new Date().toLocaleString()
  })
}
</script>

<style scoped>
.points-header {
  background-color: #1989fa;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.points-balance h2 {
  font-size: 16px;
  margin: 0;
}

.points-number {
  font-size: 32px;
  font-weight: bold;
  margin: 10px 0 0;
}

.points-increase {
  color: #07c160;
}

.points-decrease {
  color: #ee0a24;
}

.points-rules {
  padding: 16px;
}

.points-rules h3 {
  margin-top: 16px;
  margin-bottom: 8px;
}

.points-rules p {
  margin: 4px 0;
  font-size: 14px;
  color: #666;
}
</style>