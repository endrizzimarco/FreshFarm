import { defineStore, acceptHMRUpdate } from 'pinia'
import { useAuthStore } from './auth.js'
import axios from 'axios'

// Set config defaults for every axios call
axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT

export const useFunctionsStore = defineStore('functions', {
  state: () => ({}),
  getters: {},

  actions: {
    async test() {
      const response = await axios.get('/farmers/python-test', {
        headers: {
          Authorization: `Bearer ${await useAuthStore().getToken()}`
        },
        params: {
          name: 'TESTING'
        }
      })
      console.log(response.data)
    },
    async test2() {
      const response = await axios.get('/farmers/python-test-2', {
        headers: {
          Authorization: `Bearer ${await useAuthStore().getToken()}`
        },
        params: {
          name: 'TESTING'
        }
      })
      console.log(response.data)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
