import { defineStore, acceptHMRUpdate } from 'pinia'
import { useAuthStore } from './auth.js'
import { api } from 'boot/axios'

export const useFunctionsStore = defineStore('functions', {
  state: () => ({}),
  getters: {},

  actions: {
    async test() {
      const response = await api.get('/farmers/python-test', {
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
      const response = await api.get('/farmers/python-test-2', {
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
      console.log(res)

      let res2 = await (await fetch(`https://python3-functions.azurewebsites.net/api/offers-pubsub`)).json()
      console.log(res2)
      let ws1 = new WebSocket(res2.added.url)
      let ws2 = new WebSocket(res2.deleted.url)

      ws1.onopen = () => console.log('connected to add updates')
      ws2.onopen = () => console.log('connected to delete updates')

      ws1.onmessage = event => {
        console.log('added ' + event.data)
      }

      ws2.onmessage = event => {
        console.log('deleted' + event.data)
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFunctionsStore, import.meta.hot))
}
