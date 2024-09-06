import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    subtotal: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    discount: () => 0, // 这里可以实现折扣逻辑
    totalPrice: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0) - state.discount
  },
  actions: {
    addItem(item, quantity = 1) {
      const existingItem = this.items.find(i => i.id === item.id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({ ...item, quantity })
      }
    },
    updateItemQuantity(itemId, quantity) {
      const item = this.items.find(i => i.id === itemId)
      if (item) {
        item.quantity = quantity
      }
    },
    removeItem(itemId) {
      const index = this.items.findIndex(i => i.id === itemId)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },
    clearCart() {
      this.items = []
    }
  }
})