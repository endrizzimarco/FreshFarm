import { defineStore, acceptHMRUpdate } from 'pinia'
import { useAuthStore } from './auth.js'

export const useFunctionsStore = defineStore('functions', {
  state: () => ({}),
  getters: {},

  actions: {
    async test() {
      const response = await $api.get('/farmers/python-test', {
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
      const response = await $api.get('/farmers/python-test-2', {
        headers: {
          Authorization: `Bearer ${await useAuthStore().getToken()}`
        },
        params: {
          name: 'TESTING'
        }
      })
      console.log(response.data)
    },

    async liveUpdates() {
      let res = await (await fetch(`https://python3-functions.azurewebsites.net/api/read-offers`)).json()
      let ws = new WebSocket(res.conn.url)
      console.log(res.offers)
      ws.onopen = () => console.log('connected', ws)

      ws.onmessage = event => {
        console.log(event.data)
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
