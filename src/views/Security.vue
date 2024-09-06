<template>
  <page-layout title="账户安全">
    <van-cell-group inset>
      <van-cell title="修改登录密码" is-link @click="showChangePasswordDialog = true" />
      <van-cell title="绑定手机号" :value="maskedPhone" is-link @click="showBindPhoneDialog = true" />
      <van-cell title="设置支付密码" :value="paymentPasswordSet ? '已设置' : '未设置'" is-link @click="showSetPaymentPasswordDialog = true" />
      <van-cell title="账户注销" is-link @click="showDeleteAccountConfirm = true" />
    </van-cell-group>

    <!-- 修改密码对话框 -->
    <van-dialog v-model:show="showChangePasswordDialog" title="修改密码" show-cancel-button @confirm="changePassword">
      <van-field v-model="oldPassword" type="password" label="旧密码" placeholder="请输入旧密码" />
      <van-field v-model="newPassword" type="password" label="新密码" placeholder="请输入新密码" />
      <van-field v-model="confirmPassword" type="password" label="确认密码" placeholder="请再次输入新密码" />
    </van-dialog>

    <!-- 绑定手机号对话框 -->
    <van-dialog v-model:show="showBindPhoneDialog" title="绑定手机号" show-cancel-button @confirm="bindPhone">
      <van-field v-model="phoneNumber" label="手机号" placeholder="请输入手机号" />
      <van-field v-model="smsCode" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small" type="primary" @click="sendSmsCode">发送验证码</van-button>
        </template>
      </van-field>
    </van-dialog>

    <!-- 设置支付密码对话框 -->
    <van-dialog v-model:show="showSetPaymentPasswordDialog" title="设置支付密码" show-cancel-button @confirm="setPaymentPassword">
      <van-field v-model="paymentPassword" type="password" label="支付密码" placeholder="请输入6位数字支付密码" />
      <van-field v-model="confirmPaymentPassword" type="password" label="确认密码" placeholder="请再次输入支付密码" />
    </van-dialog>

    <!-- 账户注销确认对话框 -->
    <van-dialog v-model:show="showDeleteAccountConfirm" title="账户注销" show-cancel-button @confirm="deleteAccount">
      <p>注销账户将删除所有个人信息，且无法恢复。确定要注销吗？</p>
    </van-dialog>
  </page-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import PageLayout from '../components/PageLayout.vue'

const showChangePasswordDialog = ref(false)
const showBindPhoneDialog = ref(false)
const showSetPaymentPasswordDialog = ref(false)
const showDeleteAccountConfirm = ref(false)

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const phoneNumber = ref('13800138000') // 模拟已绑定的手机号
const smsCode = ref('')
const paymentPassword = ref('')
const confirmPaymentPassword = ref('')
const paymentPasswordSet = ref(false)

const maskedPhone = computed(() => {
  if (phoneNumber.value) {
    return phoneNumber.value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  }
  return '未绑定'
})

const changePassword = () => {
  if (newPassword.value !== confirmPassword.value) {
    showToast('两次输入的新密码不一致')
    return
  }
  // 这里应该调用修改密码的 API
  showToast('密码修改成功')
  oldPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
}

const bindPhone = () => {
  if (smsCode.value.length !== 6) {
    showToast('请输入正确的验证码')
    return
  }
  // 这里应该调用绑定手机号的 API
  showToast('手机号绑定成功')
  phoneNumber.value = ''
  smsCode.value = ''
}

const sendSmsCode = () => {
  if (!/^1\d{10}$/.test(phoneNumber.value)) {
    showToast('请输入正确的手机号')
    return
  }
  // 这里应该调用发送短信验证码的 API
  showToast('验证码已发送')
}

const setPaymentPassword = () => {
  if (paymentPassword.value.length !== 6 || !/^\d{6}$/.test(paymentPassword.value)) {
    showToast('请输入6位数字支付密码')
    return
  }
  if (paymentPassword.value !== confirmPaymentPassword.value) {
    showToast('两次输入的支付密码不一致')
    return
  }
  // 这里应该调用设置支付密码的 API
  showToast('支付密码设置成功')
  paymentPasswordSet.value = true
  paymentPassword.value = ''
  confirmPaymentPassword.value = ''
}

const deleteAccount = () => {
  // 这里应该调用注销账户的 API
  showToast('账户已注销')
  // 注销后应该跳转到登录页面或首页
}
</script>

<style scoped>
.van-cell-group {
  margin-top: 20px;
}
</style>