<template>
  <page-layout title="消息中心">
    <van-tabs v-model:active="activeTab" sticky>
      <van-tab v-for="tab in tabs" :key="tab.name" :title="tab.title">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell-group inset v-for="message in filteredMessages" :key="message.id" class="message-item">
              <van-cell :title="message.title" :label="message.time" :value="message.status" @click="showMessageDetails(message)" />
            </van-cell-group>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

    <van-dialog v-model:show="showDetails" :title="selectedMessage?.title" class="message-details-dialog">
      <div class="message-content" v-if="selectedMessage">
        <p>{{ selectedMessage.content }}</p>
        <p class="message-time">{{ selectedMessage.time }}</p>
      </div>
    </van-dialog>
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
const showDetails = ref(false)
const selectedMessage = ref(null)

const tabs = [
  { name: 'all', title: '全部' },
  { name: 'system', title: '系统通知' },
  { name: 'order', title: '订单消息' },
  { name: 'promotion', title: '优惠活动' }
]

const messages = ref([
  { id: 1, type: 'system', title: '系统维护通知', content: '系统将于今晚22:00-24:00进行维护升级，期间可能影响使用，敬请谅解。', time: '2023-05-20 15:30', status: '未读' },
  { id: 2, type: 'order', title: '订单已发货', content: '您的订单202305200001已发货，预计3天内送达。', time: '2023-05-20 10:15', status: '已读' },
  { id: 3, type: 'promotion', title: '618大促即将开始', content: '618大促将于6月1日开始，多重优惠等你来抢！', time: '2023-05-19 18:00', status: '未读' },
  // 添加更多模拟消息...
])

const filteredMessages = computed(() => {
  if (tabs[activeTab.value].name === 'all') {
    return messages.value
  }
  return messages.value.filter(message => message.type === tabs[activeTab.value].name)
})

const onLoad = () => {
  // 模拟加载更多消息
  setTimeout(() => {
    if (refreshing.value) {
      messages.value = []
      refreshing.value = false
    }
    for (let i = 0; i < 10; i++) {
      const newMessage = {
        id: messages.value.length + 1,
        type: ['system', 'order', 'promotion'][Math.floor(Math.random() * 3)],
        title: `模拟消息${messages.value.length + 1}`,
        content: `这是一条模拟消息内容${messages.value.length + 1}`,
        time: new Date().toLocaleString(),
        status: Math.random() > 0.5 ? '已读' : '未读'
      }
      messages.value.push(newMessage)
    }
    loading.value = false
    if (messages.value.length >= 40) {
      finished.value = true
    }
  }, 1000)
}

const onRefresh = () => {
  finished.value = false
  loading.value = true
  onLoad()
}

const showMessageDetails = (message) => {
  selectedMessage.value = message
  showDetails.value = true
  if (message.status === '未读') {
    message.status = '已读'
    // 这里应该调用API更新消息状态
    showToast('消息已标记为已读')
  }
}
</script>

<style scoped>
.message-item {
  margin-bottom: 10px;
}

.message-details-dialog {
  max-height: 80vh;
  overflow-y: auto;
}

.message-content {
  padding: 20px;
  text-align: left;
}

.message-time {
  text-align: right;
  color: #999;
  font-size: 12px;
  margin-top: 10px;
}

.van-pull-refresh {
  min-height: calc(100vh - 44px - 44px);
}
</style>