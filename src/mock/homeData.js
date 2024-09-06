export const mockHomeData = {
  username: '张三',
  bannerImages: [
    'https://img01.yzcdn.cn/vant/apple-1.jpg',
    'https://img01.yzcdn.cn/vant/apple-2.jpg',
    'https://img01.yzcdn.cn/vant/apple-3.jpg',
  ],
  categories: [
    { id: 1, name: '早餐', icon: 'coffee-o' },
    { id: 2, name: '午餐', icon: 'shop-o' },
    { id: 3, name: '晚餐', icon: 'food-o' },
    { id: 4, name: '小吃', icon: 'ice-cream-o' },
  ],
  recommendedItems: [
    { id: 1, name: '香辣鸡腿堡', price: '15.00', image: 'https://img.yzcdn.cn/vant/ipad.jpeg', description: '口感鲜嫩,香辣可口' },
    { id: 2, name: '双层芝士牛肉堡', price: '20.00', image: 'https://img.yzcdn.cn/vant/ipad.jpeg', description: '双层牛肉,双倍满足' },
    { id: 3, name: '黄金炸鸡', price: '18.00', image: 'https://img.yzcdn.cn/vant/ipad.jpeg', description: '外酥里嫩,香气四溢' },
    { id: 4, name: '鱼香肉丝盖饭', price: '22.00', image: 'https://img.yzcdn.cn/vant/ipad.jpeg', description: '经典川菜,回味无穷' },
  ],
  availableCoupons: [
    { id: 1, condition: '满30元可用', value: 5, name: '5元优惠券', description: '全场通用' },
    { id: 2, condition: '满50元可用', value: 10, name: '10元优惠券', description: '仅限午餐使用' },
    { id: 3, condition: '满100元可用', value: 20, name: '20元优惠券', description: '仅限晚餐使用' },
  ],
  recentOrders: [
    { id: 1, title: '香辣鸡腿堡 x 2', status: '已完成', time: '2023-09-05 12:30' },
    { id: 2, title: '双层芝士牛肉堡 x 1', status: '配送中', time: '2023-09-06 18:45' },
    { id: 3, title: '黄金炸鸡 x 3', status: '已下单', time: '2023-09-06 20:15' },
  ],
  schoolNotices: [
    '今日特价：所有饮品8折优惠！',
    '新品上市：芒果千层蛋糕，限时特惠！',
    '周末活动：满100减20，快来选购吧！',
  ]
};