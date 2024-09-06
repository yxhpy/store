import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import Orders from '../views/Orders.vue'
import Profile from '../views/Profile.vue'
import Address from '../views/Address.vue'
import Security from '../views/Security.vue'
import Messages from '../views/Messages.vue'
import Help from '../views/Help.vue'
import About from '../views/About.vue'
import HotSales from '../views/HotSales.vue'
import Coupons from '../views/Coupons.vue'
import FlashSale from '../views/FlashSale.vue'
import Favorites from '../views/Favorites.vue'
import Points from '../views/Points.vue'
import PromotionDetail from '../views/PromotionDetail.vue'
import GiftCards from '../views/GiftCards.vue'
import SearchResults from '../views/SearchResults.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  { path: '/cart', component: Cart },
  { path: '/product/:id', component: ProductDetail },
  // ... 其他路由
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  // ... 其他路由
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  // ... 其他路由
  {
    path: '/addresses',
    name: 'Address',
    component: Address
  },
  // ... 其他路由
  {
    path: '/security',
    name: 'Security',
    component: Security
  },
  // ... 其他路由
  {
    path: '/messages',
    name: 'Messages',
    component: Messages
  },
  // ... 其他路由
  {
    path: '/help',
    name: 'Help',
    component: Help
  },
  // ... 其他路由
  {
    path: '/about',
    name: 'About',
    component: About
  },
  // ... 其他路由
  {
    path: '/hot-sales',
    name: 'HotSales',
    component: HotSales
  },
  // ... 其他路由
  {
    path: '/coupons',
    name: 'Coupons',
    component: Coupons
  },
  // ... 其他路由
  {
    path: '/flash-sale',
    name: 'FlashSale',
    component: FlashSale
  },
  // ... 其他路由
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
  },
  // ... 其他路由
  {
    path: '/points',
    name: 'Points',
    component: Points
  },
  // ... 其他路由
  {
    path: '/promotion/:id',
    name: 'PromotionDetail',
    component: PromotionDetail
  },
  // ... 其他路由
  {
    path: '/gift-cards',
    name: 'GiftCards',
    component: GiftCards
  },
  // ... 其他路由
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults
  },
  // ... 其他路由
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router