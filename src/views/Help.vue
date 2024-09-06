<template>
  <page-layout title="帮助中心">
    <van-search v-model="searchValue" placeholder="搜索常见问题" @search="onSearch" />

    <van-collapse v-model="activeNames">
      <van-collapse-item
        v-for="category in faqCategories"
        :key="category.id"
        :title="category.name"
        :name="category.id"
      >
        <van-cell-group inset>
          <van-cell
            v-for="question in category.questions"
            :key="question.id"
            :title="question.title"
            is-link
            @click="showQuestionDetails(question)"
          />
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>

    <van-cell-group inset class="contact-group">
      <van-cell title="在线客服" is-link @click="startOnlineChat" />
      <van-cell title="客服热线" :value="'400-123-4567'" is-link @click="callCustomerService" />
    </van-cell-group>

    <van-action-sheet v-model:show="showQuestionSheet" :title="selectedQuestion?.title">
      <div class="question-content" v-if="selectedQuestion">
        <p>{{ selectedQuestion.answer }}</p>
      </div>
    </van-action-sheet>
  </page-layout>
</template>

<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'
import PageLayout from '../components/PageLayout.vue'

const searchValue = ref('')
const activeNames = ref(['1'])
const showQuestionSheet = ref(false)
const selectedQuestion = ref(null)

const faqCategories = ref([
  {
    id: '1',
    name: '账户相关',
    questions: [
      { id: '1-1', title: '如何注册账户？', answer: '您可以通过点击首页右上角的"注册"按钮来创建新账户。填写必要的信息后即可完成注册。' },
      { id: '1-2', title: '忘记密码怎么办？', answer: '在登录页面点击"忘记密码"，然后按照提示步骤进行密码重置。' },
    ]
  },
  {
    id: '2',
    name: '订单相关',
    questions: [
      { id: '2-1', title: '如何取消订单？', answer: '在"我的订单"页面中，找到需要取消的订单，点击"取消订单"按钮即可。请注意，部分状态的订单可能无法取消。' },
      { id: '2-2', title: '订单退款如何处理？', answer: '申请退款后，我们会在1-3个工作日内处理您的退款请求。退款金额将原路返回到您的支付账户。' },
    ]
  },
  {
    id: '3',
    name: '配送相关',
    questions: [
      { id: '3-1', title: '配送范围是多少？', answer: '我们的配送范围通常覆盖市区及周边地区。具体配送范围可在下单时查看。' },
      { id: '3-2', title: '送餐时间大约需要多久？', answer: '正常情况下，从下单到送达大约需要30-45分钟。特殊情况可能会有所延迟，请以实际配送时间为准。' },
    ]
  },
])

const onSearch = (value) => {
  showToast(`搜索：${value}`)
  // 这里应该实现搜索逻辑
}

const showQuestionDetails = (question) => {
  selectedQuestion.value = question
  showQuestionSheet.value = true
}

const startOnlineChat = () => {
  showToast('正在连接客服，请稍候...')
  // 这里应该实现在线客服聊天功能
}

const callCustomerService = () => {
  showToast('正在拨打客服热线...')
  // 这里应该实现拨打电话功能
  window.location.href = 'tel:400-123-4567'
}
</script>

<style scoped>
.contact-group {
  margin-top: 20px;
}

.question-content {
  padding: 16px;
  font-size: 14px;
  line-height: 1.5;
}

.van-search {
  padding: 10px 16px;
}

.van-collapse {
  margin-top: 10px;
}
</style>