import { defineStore, acceptHMRUpdate } from 'pinia'
import { userAPI } from 'boot/axios'

export const useUserStore = defineStore('userFunctions', {
  state: () => ({
    user_coords: {},
    offers: [],
    filteredOffers: [],
    filtered: false,
    waiting: false,
    activeFilters: { maxPrice: null, type: null, maxRadius: null, lat: null, lng: null }
  }),

  actions: {
    async initLiveUpdates() {
      let offers = (await userAPI.get('read-offers')).data
      this.offers.push(...offers)

      let websockets = (await userAPI.get('offers-pubsub')).data
      let ws1 = new WebSocket(websockets.added.url)
      let ws2 = new WebSocket(websockets.deleted.url)

      ws1.onopen = () => console.log('connected to add updates')
      ws2.onopen = () => console.log('connected to delete updates')

      ws1.onmessage = event => {
        this.offers.push(JSON.parse(event.data))
        console.log('added ' + event.data)
      }

      ws2.onmessage = event => {
        console.log(event.data)
        this.waiting = false
        this.offers.find((offer, index) => {
          if (offer.id === event.data) {
            this.offers.splice(index, 1)
          }
        })
      }
    },

    async filterOn(params) {
      this.filteredOffers = (await userAPI.get('filter-offers', { params })).data
      this.activeFilters = params
    },

    async clearFilters() {
      this.activeFilters = {}
    },

    async purchaseOffer(params) {
      let result = (await userAPI.post('push_orders', params)).data
      console.log(result)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
