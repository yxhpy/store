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
import NewProducts from '../views/NewProducts.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu,
    meta: { requiresAuth: true }
  },
  { path: '/cart', component: Cart, meta: { requiresAuth: true } },
  { path: '/product/:id', component: ProductDetail, meta: { requiresAuth: true } },
  { path: '/orders', name: 'Orders', component: Orders, meta: { requiresAuth: true } },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/addresses', name: 'Address', component: Address, meta: { requiresAuth: true } },
  { path: '/security', name: 'Security', component: Security, meta: { requiresAuth: true } },
  { path: '/messages', name: 'Messages', component: Messages, meta: { requiresAuth: true } },
  { path: '/help', name: 'Help', component: Help, meta: { requiresAuth: true } },
  { path: '/about', name: 'About', component: About, meta: { requiresAuth: true } },
  { path: '/hot-sales', name: 'HotSales', component: HotSales, meta: { requiresAuth: true } },
  { path: '/coupons', name: 'Coupons', component: Coupons, meta: { requiresAuth: true } },
  { path: '/flash-sale', name: 'FlashSale', component: FlashSale, meta: { requiresAuth: true } },
  { path: '/favorites', name: 'Favorites', component: Favorites, meta: { requiresAuth: true } },
  { path: '/points', name: 'Points', component: Points, meta: { requiresAuth: true } },
  { path: '/promotion/:id', name: 'PromotionDetail', component: PromotionDetail, meta: { requiresAuth: true } },
  { path: '/gift-cards', name: 'GiftCards', component: GiftCards, meta: { requiresAuth: true } },
  { path: '/search', name: 'SearchResults', component: SearchResults, meta: { requiresAuth: true } },
  { path: '/new-products', name: 'NewProducts', component: NewProducts, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') // 这里应该使用真实的身份验证逻辑
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router