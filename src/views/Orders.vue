<template>
  <page-layout title="我的订单" :show-back="false">
    <van-tabs v-model:active="activeTab" sticky @change="handleTabChange">
      <van-tab v-for="tab in tabs" :key="tab.name" :title="tab.title">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell-group inset v-for="order in filteredOrders" :key="order.id" class="order-item">
              <van-cell :title="'订单号: ' + order.id" :value="order.status" />
              <van-card
                v-for="item in order.items"
                :key="item.id"
                :num="item.quantity"
                :price="item.price"
                :title="item.name"
                :thumb="item.image"
              />
              <van-cell title="下单时间" :value="order.orderTime" />
              <van-cell title="总价" :value="'¥' + order.totalPrice.toFixed(2)" />
              <div class="order-actions">
                <van-button size="small" @click="showOrderDetails(order)">查看详情</van-button>
                <van-button v-if="order.status === '待支付'" size="small" type="primary" @click="payOrder(order)">去支付</van-button>
                <van-button v-if="order.status === '待支付'" size="small" @click="cancelOrder(order)">取消订单</van-button>
                <van-button v-if="order.status === '已完成'" size="small" type="primary" @click="rateOrder(order)">评价</van-button>
              </div>
            </van-cell-group>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

    <van-dialog v-model:show="showDetails" title="订单详情" class="order-details-dialog">
      <template v-if="selectedOrder">
        <van-cell-group inset>
          <van-cell title="订单号" :value="selectedOrder.id" />
          <van-cell title="下单时间" :value="selectedOrder.orderTime" />
          <van-cell title="订单状态" :value="selectedOrder.status" />
          <van-cell title="总价" :value="'¥' + selectedOrder.totalPrice.toFixed(2)" />
        </van-cell-group>
        <van-cell-group inset title="商品列表">
          <van-card
            v-for="item in selectedOrder.items"
            :key="item.id"
            :num="item.quantity"
            :price="item.price"
            :title="item.name"
            :thumb="item.image"
          />
        </van-cell-group>
      </template>
    </van-dialog>

    <van-action-sheet v-model:show="showRating" title="订单评价">
      <div class="rating-content">
        <van-rate v-model="rating" :count="5" />
        <van-field
          v-model="comment"
          rows="3"
          autosize
          label="评价"
          type="textarea"
          maxlength="50"
          placeholder="请输入您的评价"
          show-word-limit
        />
        <van-button type="primary" block @click="submitRating">提交评价</van-button>
      </div>
    </van-action-sheet>

    <!-- 添加支付确认对话框 -->
    <van-dialog v-model:show="showPaymentConfirm" title="确认支付" :show-cancel-button="true" @confirm="confirmPayment">
      <div class="payment-dialog-content">
        <p>订单号: {{ selectedOrder?.id }}</p>
        <p>支付金额: ¥{{ selectedOrder?.totalPrice.toFixed(2) }}</p>
      </div>
    </van-dialog>
  </page-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { showToast, showConfirmDialog, showSuccessToast } from 'vant'
import PageLayout from '../components/PageLayout.vue'

const activeTab = ref(0)
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const showDetails = ref(false)
const selectedOrder = ref(null)
const showRating = ref(false)
const rating = ref(5)
const comment = ref('')
const showPaymentConfirm = ref(false)

const tabs = [
  { name: 'all', title: '全部' },
  { name: 'pending', title: '待支付' },
  { name: 'processing', title: '处理中' },
  { name: 'completed', title: '已完成' }
]

const orders = ref([])

const filteredOrders = computed(() => {
  if (tabs[activeTab.value].name === 'all') {
    return orders.value
  }
  return orders.value.filter(order => order.status === tabs[activeTab.value].title)
})

onMounted(() => {
  fetchOrders()
})

const fetchOrders = () => {
  // 这里应该是从API获取订单数据，现在我们用模拟数据
  const mockOrders = [
    {
      id: '202305150001',
      status: '待支付',
      orderTime: '2023-05-15 12:30:45',
      totalPrice: 38.00,
      items: [
        { id: 101, name: '黄金炒饭', price: '18.00', image: 'https://img.example.com/fried-rice.jpg', quantity: 1 },
        { id: 201, name: '鸡米花', price: '12.00', image: 'https://img.example.com/popcorn-chicken.jpg', quantity: 2 }
      ]
    },
    {
      id: '202305140002',
      status: '已完成',
      orderTime: '2023-05-14 18:20:30',
      totalPrice: 45.00,
      items: [
        { id: 102, name: '麻辣香锅', price: '38.00', image: 'https://img.example.com/spicy-pot.jpg', quantity: 1 },
        { id: 301, name: '珍珠奶茶', price: '15.00', image: 'https://img.example.com/bubble-tea.jpg', quantity: 1 }
      ]
    },
    {
      id: '202305130003',
      status: '处理中',
      orderTime: '2023-05-13 10:15:00',
      totalPrice: 25.00,
      items: [
        { id: 401, name: '水果沙拉', price: '25.00', image: 'https://img.example.com/fruit-salad.jpg', quantity: 1 }
      ]
    }
  ]
  orders.value = mockOrders
}

const onLoad = () => {
  // 模拟加载更多订单
  setTimeout(() => {
    if (refreshing.value) {
      orders.value = []
      refreshing.value = false
    }
    fetchOrders()
    loading.value = false
    finished.value = true
  }, 1000)
}

const onRefresh = () => {
  finished.value = false
  loading.value = true
  onLoad()
}

const handleTabChange = () => {
  finished.value = false
  onLoad()
}

const showOrderDetails = (order) => {
  selectedOrder.value = order
  showDetails.value = true
}

const payOrder = (order) => {
  selectedOrder.value = order
  showPaymentConfirm.value = true
}

const confirmPayment = () => {
  // 模拟支付过程
  showToast({
    type: 'loading',
    message: '支付处理中...',
    forbidClick: true,
    duration: 2000,
  })

  // 模拟支付完成
  setTimeout(() => {
    // 更新订单状态
    const orderIndex = orders.value.findIndex(o => o.id === selectedOrder.value.id)
    if (orderIndex !== -1) {
      orders.value[orderIndex].status = '处理中'
    }

    showSuccessToast('支付成功')
    showPaymentConfirm.value = false
  }, 2000)
}

const cancelOrder = (order) => {
  showConfirmDialog({
    title: '取消订单',
    message: '确定要取消该订单吗？',
  }).then(() => {
    // 这里应该调用取消订单的API
    showToast('订单已取消')
    order.status = '已取消'
  }).catch(() => {
    // 取消操作
  })
}

const rateOrder = (order) => {
  selectedOrder.value = order
  showRating.value = true
}

const submitRating = () => {
  // 这里应该调用提交评价的API
  showToast('评价已提交')
  showRating.value = false
  rating.value = 5
  comment.value = ''
}
</script>

<style scoped>
.order-item {
  margin-bottom: 16px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(100, 100, 100, 0.1);
}

.order-actions {
  display: flex;
  justify-content: flex-end;
  padding: 10px 16px;
}

.order-actions .van-button {
  margin-left: 8px;
}

.order-details-dialog {
  max-height: 80vh;
  overflow-y: auto;
}

.rating-content {
  padding: 16px;
}

.rating-content .van-rate {
  margin-bottom: 16px;
}

.rating-content .van-field {
  margin-bottom: 16px;
}

/* 添加一些动画效果 */
.order-item {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.van-button--primary {
  background-color: #1989fa;
  border-color: #1989fa;
}

.van-button--primary:active {
  background-color: #0e5aa7;
  border-color: #0e5aa7;
}

.van-pull-refresh {
  min-height: calc(100vh - 44px - 44px);
}

.payment-dialog-content {
  padding: 20px;
  text-align: center;
}
</style>