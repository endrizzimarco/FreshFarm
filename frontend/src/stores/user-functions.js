import { defineStore, acceptHMRUpdate } from 'pinia'
import { userAPI } from 'boot/axios'

export const useUserStore = defineStore('userFunctions', {
  state: () => ({
    user_coords: {},
    offers: [],
    filteredOffers: [],
    filtered: false,
    waiting: false,
    activeFilters: { maxPrice: null, type: null, maxRadius: null, lat: null, lng: null },
    latestChange: { offer: null, type: '' }
  }),

  actions: {
    async getOffers() {
      this.offers = (await userAPI.get('read-offers')).data
    },

    async initLiveUpdates() {
      let websockets = (await userAPI.get('offers-pubsub')).data
      let ws1 = new WebSocket(websockets.added.url)
      let ws2 = new WebSocket(websockets.deleted.url)

      ws1.onopen = () => console.log('connected to add updates')
      ws2.onopen = () => console.log('connected to delete updates')

      // ADD EVENT
      ws1.onmessage = event => {
        let newOffer = JSON.parse(event.data)
        this.offers.push(newOffer)
        Object.assign(this.latestChange, { offer: newOffer, type: 'add' })
      }

      // DELETE EVENT
      ws2.onmessage = event => {
        this.offers.find((offer, index) => {
          if (offer?.id === event.data.split(' ')[1]) {
            let deletedOffer = this.offers[index]
            this.offers.splice(index, 1)
            Object.assign(this.latestChange, { offer: deletedOffer, type: 'delete' })
          }
        })
        this.waiting = false
      }

      return [ws1, ws2]
    },

    async filterOn(params) {
      this.filteredOffers = (await userAPI.get('filter-offers', { params })).data
      Object.assign(this.activeFilters, params)
    },

    async clearFilters() {
      this.activeFilters = {}
    },

    async purchaseOffer(params) {
      let result = (await userAPI.post('push_orders', params)).data
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
