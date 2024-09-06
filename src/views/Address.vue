<template>
  <page-layout title="收货地址">
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      :disabled-list="disabledList"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />

    <van-popup v-model:show="showAddressEdit" position="bottom" :style="{ height: '100%' }">
      <van-address-edit
        :address-info="currentAddress"
        :area-list="areaList"
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </van-popup>
  </page-layout>
</template>

<script setup>
import { ref } from 'vue'
import { showToast } from 'vant'
import PageLayout from '../components/PageLayout.vue'

// 删除这行
// import { areaList } from '@vant/area-data'

// 添加一个简化的 areaList 对象
const areaList = {
  province_list: {
    110000: '北京市',
    120000: '天津市',
    // ... 其他省份
  },
  city_list: {
    110100: '北京市',
    120100: '天津市',
    // ... 其他城市
  },
  county_list: {
    110101: '东城区',
    110102: '西城区',
    // ... 其他区县
  }
}

const chosenAddressId = ref('1')
const showAddressEdit = ref(false)
const currentAddress = ref({})
const searchResult = ref([])

const addressList = ref([
  {
    id: '1',
    name: '张三',
    tel: '13000000000',
    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
    isDefault: true,
  },
  {
    id: '2',
    name: '李四',
    tel: '1310000000',
    address: '浙江省杭州市拱墅区莫干山路 50 号',
  },
])

const disabledList = ref([
  {
    id: '3',
    name: '王五',
    tel: '1320000000',
    address: '浙江省杭州市滨江区江南大道 15 号',
  },
])

const onAdd = () => {
  showAddressEdit.value = true
  currentAddress.value = {}
}

const onEdit = (item, index) => {
  showAddressEdit.value = true
  currentAddress.value = item
}

const onSave = (content) => {
  showAddressEdit.value = false
  if (content.id) {
    // 编辑现有地址
    const index = addressList.value.findIndex(item => item.id === content.id)
    if (index !== -1) {
      addressList.value[index] = content
    }
  } else {
    // 添加新地址
    content.id = String(addressList.value.length + 1)
    addressList.value.push(content)
  }
  showToast('保存成功')
}

const onDelete = (content) => {
  showAddressEdit.value = false
  if (content.id) {
    const index = addressList.value.findIndex(item => item.id === content.id)
    if (index !== -1) {
      addressList.value.splice(index, 1)
    }
  }
  showToast('删除成功')
}

const onChangeDetail = (val) => {
  if (val) {
    searchResult.value = [
      {
        name: '黄龙万科中心',
        address: '杭州市西湖区',
      },
    ]
  } else {
    searchResult.value = []
  }
}
</script>

<style scoped>
.van-address-list {
  padding-bottom: 50px;
}
</style>