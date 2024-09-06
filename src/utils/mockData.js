// 首页数据
export const homeMockData = {
  banners: [
    { image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: '美食盛宴', subtitle: '品味校园美食', link: '/new-products' },
    { image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: '限时优惠', subtitle: '大牌折扣享不停', link: '/promotions' },
  ],
  quickActions: [
    { icon: 'fire-o', text: '热销榜单', link: '/hot-sales', bgColor: '#FFE1E1', iconColor: '#FF4D4F' },
    { icon: 'coupon-o', text: '优惠券', link: '/coupons', bgColor: '#E6F7FF', iconColor: '#1890FF' },
    { icon: 'clock-o', text: '限时抢购', link: '/flash-sale', bgColor: '#FFF7E6', iconColor: '#FFA940' },
    { icon: 'like-o', text: '我的收藏', link: '/favorites', bgColor: '#F6FFED', iconColor: '#52C41A' },
  ],
  recommendedItems: [
    { id: 1, name: '香辣鸡腿堡', price: '15.00', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: '口感鲜嫩，香辣可口', tag: '热销' },
    { id: 2, name: '双层芝士牛肉堡', price: '20.00', image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', description: '双层牛肉，双倍满足', tag: '新品' },
  ],
  promotions: [
    { id: 1, title: '新生特惠', description: '新生专享7折优惠', icon: 'gift-o', bgColor: '#E6F7FF', iconColor: '#1890FF' },
    { id: 2, title: '满30减5', description: '满30元立减5元', icon: 'cash-back-record', bgColor: '#FFF7E6', iconColor: '#FFA940' },
  ],
}

// 菜单页数据
export const menuMockData = {
  categories: [
    {
      id: 1,
      name: '主食',
      items: [
        { id: 101, name: '黄金炒饭', price: '18.00', description: '精选大米，黄金比例', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', spicy: false, vegetarian: false },
        { id: 102, name: '麻辣香锅', price: '38.00', description: '麻辣鲜香，回味无穷', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', spicy: true, vegetarian: false },
        { id: 103, name: '素菜炒面', price: '22.00', description: '爽口健康，清淡可口', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', spicy: false, vegetarian: true },
      ]
    },
    {
      id: 2,
      name: '小吃',
      items: [
        { id: 201, name: '鸡米花', price: '12.00', description: '外酥里嫩，香辣可口', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', spicy: true, vegetarian: false },
        { id: 202, name: '薯条', price: '8.00', description: '金黄酥脆，美味不腻', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', spicy: false, vegetarian: true },
      ]
    },
    {
      id: 3,
      name: '饮品',
      items: [
        { id: 301, name: '珍珠奶茶', price: '15.00', description: '香浓丝滑，珍珠Q弹', image: 'https://images.unsplash.com/photo-1558857563-9be41b67907c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', spicy: false, vegetarian: true },
        { id: 302, name: '鲜榨橙汁', price: '13.00', description: '鲜榨现做，维C补充', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', spicy: false, vegetarian: true },
      ]
    }
  ]
}

// 购物车页面数据
export const cartMockData = {
  items: [
    { id: 101, name: '黄金炒饭', price: '18.00', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', quantity: 1 },
    { id: 201, name: '鸡米花', price: '12.00', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', quantity: 2 },
    { id: 301, name: '珍珠奶茶', price: '15.00', image: 'https://images.unsplash.com/photo-1558857563-9be41b67907c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', quantity: 1 },
  ]
}