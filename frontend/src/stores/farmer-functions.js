import { defineStore, acceptHMRUpdate } from 'pinia'
import { useAuthStore } from './auth.js'
import { farmerAPI } from 'boot/axios'

export const useFarmerStore = defineStore('farmerFunctions', {
  state: () => ({}),
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
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFarmerStore, import.meta.hot))
}
