<template>
  <page-layout title="我的礼品卡">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell-group inset v-for="card in giftCards" :key="card.id" class="gift-card-item">
          <van-card
            :desc="card.description"
            :title="card.name"
            :price="card.balance"
            currency="¥"
            :thumb="card.image"
          >
            <template #tags>
              <van-tag plain type="primary" v-if="card.isValid">有效</van-tag>
              <van-tag plain type="danger" v-else>已失效</van-tag>
            </template>
            <template #footer>
              <van-button size="mini" type="primary" @click="showCardDetails(card)">查看详情</van-button>
              <van-button size="mini" :disabled="!card.isValid" @click="useCard(card)">使用</van-button>
            </template>
          </van-card>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>

    <van-empty v-if="giftCards.length === 0" description="暂无礼品卡" />

    <div class="bottom-placeholder"></div>

    <div class="buy-button-container">
      <van-button type="primary" block class="buy-button" @click="showBuyOptions">购买礼品卡</van-button>
    </div>

    <van-action-sheet v-model:show="showDetails" :title="selectedCard?.name">
      <div class="card-details" v-if="selectedCard">
        <p>卡号：{{ selectedCard.cardNumber }}</p>
        <p>余额：¥{{ selectedCard.balance }}</p>
        <p>有效期：{{ selectedCard.validUntil }}</p>
        <p>{{ selectedCard.description }}</p>
      </div>
    </van-action-sheet>

    <van-dialog v-model:show="showBuyDialog" title="购买礼品卡" @confirm="confirmBuy">
      <van-field v-model="buyAmount" type="number" label="金额" placeholder="请输入购买金额" />
    </van-dialog>

    <van-popup v-model:show="showQRCodePopup" closeable round>
      <div class="qr-code-container">
        <img :src="qrCodeUrl" alt="Gift Card QR Code" class="qr-code-image" />
        <p>请向收银员出示此二维码</p>
      </div>
    </van-popup>
  </page-layout>
</template>

<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'
import PageLayout from '../components/PageLayout.vue'

const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const giftCards = ref([])
const showDetails = ref(false)
const selectedCard = ref(null)
const showBuyDialog = ref(false)
const buyAmount = ref('')
const showQRCodePopup = ref(false)
const qrCodeUrl = ref('')

const onLoad = () => {
  // 模拟加载数据
  setTimeout(() => {
    if (refreshing.value) {
      giftCards.value = []
      refreshing.value = false
    }
    for (let i = 0; i < 10; i++) {
      const card = {
        id: giftCards.value.length + 1,
        name: `礼品卡 ${giftCards.value.length + 1}`,
        balance: (Math.random() * 500 + 100).toFixed(2),
        description: '可用于校园内所有商铺',
        image: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/100/100`,
        isValid: Math.random() > 0.2,
        cardNumber: `GC${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        validUntil: '2024-12-31'
      }
      giftCards.value.push(card)
    }
    loading.value = false
    if (giftCards.value.length >= 30) {
      finished.value = true
    }
  }, 1000)
}

const onRefresh = () => {
  finished.value = false
  loading.value = true
  onLoad()
}

const showCardDetails = (card) => {
  selectedCard.value = card
  showDetails.value = true
}

const useCard = (card) => {
  if (!card.isValid) {
    showToast('此礼品卡已失效')
    return
  }
  // 生成二维码并显示
  qrCodeUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${card.cardNumber}`
  showQRCodePopup.value = true
}

const showBuyOptions = () => {
  showBuyDialog.value = true
}

const confirmBuy = () => {
  const amount = Number(buyAmount.value)
  if (isNaN(amount) || amount <= 0) {
    showToast('请输入有效金额')
    return
  }
  showToast(`成功购买 ¥${amount} 的礼品卡`)
  buyAmount.value = ''
  // 这里可以添加购买礼品卡的逻辑
}
</script>

<style scoped>
.gift-card-item {
  margin-bottom: 16px;
}

.bottom-placeholder {
  height: 80px; /* 为底部按钮和导航栏留出空间 */
}

.buy-button-container {
  position: fixed;
  bottom: 70px; /* 调整位置，确保在底部导航栏上方 */
  left: 16px;
  right: 16px;
  padding-bottom: 16px;
  background-color: #f8f8f8;
}

.buy-button {
  width: 100%;
}

.card-details {
  padding: 16px;
}

.card-details p {
  margin: 8px 0;
}

/* 确保内容不会被底部导航栏遮挡 */
:deep(.page-content) {
  padding-bottom: 120px;
}

.qr-code-container {
  padding: 20px;
  text-align: center;
}

.qr-code-image {
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
}
</style>