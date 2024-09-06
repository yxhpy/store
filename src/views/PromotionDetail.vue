<template>
  <page-layout :title="promotion ? promotion.title : '优惠活动详情'">
    <template v-if="loading">
      <van-loading type="spinner" vertical>加载中...</van-loading>
    </template>
    <template v-else-if="promotion">
      <div class="promotion-banner">
        <van-image
          width="100%"
          height="200"
          :src="promotion.image"
          :alt="promotion.title"
        />
      </div>

      <div class="promotion-content">
        <h1 class="promotion-title">{{ promotion.title }}</h1>
        <van-tag type="danger" v-if="promotion.isActive">进行中</van-tag>
        <van-tag type="default" v-else>已结束</van-tag>

        <div class="promotion-time">
          <van-icon name="clock-o" />
          <span>{{ promotion.startTime }} - {{ promotion.endTime }}</span>
        </div>

        <van-divider content-position="left">活动详情</van-divider>
        <p class="promotion-description">{{ promotion.description }}</p>

        <van-divider content-position="left">参与条件</van-divider>
        <ul class="promotion-conditions">
          <li v-for="(condition, index) in promotion.conditions" :key="index">
            {{ condition }}
          </li>
        </ul>

        <van-divider content-position="left">优惠内容</van-divider>
        <ul class="promotion-benefits">
          <li v-for="(benefit, index) in promotion.benefits" :key="index">
            {{ benefit }}
          </li>
        </ul>

        <van-divider content-position="left">使用说明</van-divider>
        <p class="promotion-instructions">{{ promotion.instructions }}</p>
      </div>

      <div class="promotion-action">
        <van-button type="primary" block :disabled="!promotion.isActive" @click="participatePromotion">
          {{ promotion.isActive ? '立即参与' : '活动已结束' }}
        </van-button>
      </div>
    </template>
    <template v-else>
      <van-empty description="活动信息加载失败" />
    </template>
  </page-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { showToast } from 'vant'
import PageLayout from '../components/PageLayout.vue'

const route = useRoute()
const promotion = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 这里应该从API获取优惠活动详情，现在我们用模拟数据
    promotion.value = {
      id: route.params.id,
      title: '618大促优惠活动',
      image: 'https://picsum.photos/id/1/600/200',
      isActive: true,
      startTime: '2023-06-01 00:00',
      endTime: '2023-06-18 23:59',
      description: '618大促优惠活动，全场商品低至5折，还有更多惊喜等你来！',
      conditions: [
        '活动期间内有效',
        '仅限校园内使用',
        '每人限参与一次'
      ],
      benefits: [
        '全场商品5折起',
        '满50减10',
        '满100减30',
        '新用户额外95折'
      ],
      instructions: '优惠不可叠加使用，最终解释权归商家所有。'
    }
  } catch (error) {
    console.error('Failed to load promotion details:', error)
    showToast('加载活动信息失败，请稍后重试')
  } finally {
    loading.value = false
  }
})

const participatePromotion = () => {
  showToast('成功参与活动')
  // 这里可以添加参与活动的逻辑
}
</script>

<style scoped>
.promotion-banner {
  margin-bottom: 16px;
}

.promotion-content {
  padding: 0 16px;
}

.promotion-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.promotion-time {
  display: flex;
  align-items: center;
  color: #999;
  margin-top: 8px;
}

.promotion-time .van-icon {
  margin-right: 4px;
}

.promotion-description,
.promotion-instructions {
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}

.promotion-conditions,
.promotion-benefits {
  padding-left: 20px;
  margin: 8px 0;
}

.promotion-conditions li,
.promotion-benefits li {
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}

.promotion-action {
  position: fixed;
  bottom: 16px;
  left: 16px;
  right: 16px;
}

.van-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>