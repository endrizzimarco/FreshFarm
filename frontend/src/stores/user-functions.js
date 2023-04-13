import { defineStore, acceptHMRUpdate } from 'pinia'
import { useAuthStore } from './auth.js'
import { userAPI } from 'boot/axios'

export const useUserStore = defineStore('userFunctions', {
  state: () => ({}),
  getters: {},

  actions: {
    async test() {
      const response = await userAPI.get('create-offer', {
        params: {
          name: 'TESTING'
        }
      })
      console.log('response: ', response.data)
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

    async initLiveUpdates() {
      let offers = (await userAPI.get('read-offers')).data
      console.log(offers)

      let websockets = (await userAPI.get('offers-pubsub')).data
      let ws1 = new WebSocket(websockets.added.url)
      let ws2 = new WebSocket(websockets.deleted.url)

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
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
