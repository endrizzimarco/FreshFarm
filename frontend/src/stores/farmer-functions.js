import { defineStore, acceptHMRUpdate } from 'pinia'
import { useAuthStore } from './auth.js'
import { farmerAPI } from 'boot/axios'

export const useFarmerStore = defineStore('farmerFunctions', {
  state: () => ({
    dashboardData: {
      total_month_revenue: 0,
      total_sales: 0,
      total_customers: 0,
      average_sale_value: 0,
      this_month_sales: [],
      uncollected_sales: [],
      total_revenue_by_type: {},
      revenue_by_customerName: {}
    }
  }),
  getters: {},

  actions: {
    async createOffer(params) {
      const headers = {
        Authorization: `Bearer ${await useAuthStore().getToken()}`
      }
      const response = await farmerAPI.post('create-offer', params, {
        headers: headers
      })
      return response
    },

    async getDashboardData() {
      const headers = {
        Authorization: `Bearer ${await useAuthStore().getToken()}`
      }
      const response = await farmerAPI.get('Dashboard', {
        params: { farmerId: useAuthStore().userID },
        headers: headers
      })
      this.dashboardData = response.data
      return response.data
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFarmerStore, import.meta.hot))
}
