<script setup>
import { createApp, ref, onMounted, watch, watchEffect } from 'vue'
import mapboxgl from 'mapbox-gl'
import OfferPopup from 'components/OfferPopup.vue'
import OfferFilterForm from 'components/OfferFilterForm.vue'
import OfferDetails from 'components/OfferDetails.vue'
import { useUserStore } from 'src/stores/user-functions'
import { useQuasar } from 'quasar'

mapboxgl.accessToken = import.meta.env.VITE_MAP_API_KEY
const store = useUserStore()

var markers = []
var filteredMarkers = []

const map = ref(null)
onMounted(async () => {
  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-0.5608289, 51.2426316], // University of Surrey
    zoom: 12
  })
  useUserStore().initLiveUpdates()
  getLocation()
})

const detailsOffer = ref(null)
const showOffer = ref(false)
const filtering = ref(false)
const maxPriceFilter = ref(null)
const $q = useQuasar()

const filterOffers = maxPrice => {
  console.log('Filtering with max Price: ' + maxPrice)
  filtering.value = false
  maxPriceFilter.value = null
}

const offerAccepted = () => {
  showOffer.value = false
  $q.notify({
    message: 'Order placed!',
    progress: true,
    color: 'green-4',
    textColor: 'white',
    icon: 'check_circle',
    position: 'top',
    actions: [
            {
              label: '✕',
              color: 'white'
            }
          ]
  })
}

var popup_component = null
const createMarker = offer => {
  const el = document.createElement('div')
  el.style = 'background-size: cover; width: 50px; height: 50px; cursor: pointer;'
  el.className = offer.type
  el.id = offer.id
  const marker = new mapboxgl.Marker(el)

  // Create a popup and add it to the marker.
  let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`<div id="popup"></div>`)
  popup.on('open', () => {
    popup_component = createApp(OfferPopup, { title: offer.title, price: offer.price })
    popup_component.mount(`#popup`)
    document.getElementById('popupbtn').addEventListener('click', () => {
      detailsOffer.value = offer
      showOffer.value = true
      document.getElementsByClassName('mapboxgl-popup-close-button')[0].click()
    })
  })
  popup.on('close', () => popup_component && popup_component.unmount())
  return marker.setPopup(popup)
}

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => (store.user_coords = { lat: position.coords.latitude, lng: position.coords.longitude })
    )
  } else {
    console.log('Geolocation is not supported by this browser.')
  }
}

const flyToUser = () => {
  map.value.flyTo({ center: new mapboxgl.LngLat(store.user_coords.lng, store.user_coords.lat), zoom: 12 })
}

watch(
  store.offers,
  () => {
    let oldValues = markers.length
    let newValues = store.offers.length

    if (oldValues > newValues) {
      // removed

      let diff = markers.filter(x => !store.offers.map(o => o.id).includes(x._element.id))
      diff[0].remove()
    } else if (newValues > oldValues) {
      // added
      let newOffers = store.offers.filter(x => !markers.includes(x))
      newOffers.forEach(offer => {
        markers.push(createMarker(offer).setLngLat([offer.lng, offer.lat]).addTo(map.value))
      })
    }
  },
  // { immediate: true }
)

watchEffect(() => {
  if (filteredMarkers) {
    filteredMarkers.forEach(marker => marker.remove())
    filteredMarkers = []
  }

  if (store.activeFilters.maxPrice || store.activeFilters.type || store.activeFilters.maxRadius) {
    markers.forEach(marker => marker.remove())
    store.filteredOffers.forEach(offer => {
      const m = createMarker(offer).setLngLat([offer.lng, offer.lat])
      filteredMarkers.push(m)
      m.addTo(map.value)
    }) ?? []
  } else {
    markers.forEach(marker => marker.addTo(map.value))
  }
})
</script>

<template lang="pug">
q-page.flex.flex-column.h-max.scroll
  #map.window-width

  img(
    width= "200",
    src='~/assets/logo.png',
    style="position: absolute; left: 1em; top: 0em"
  )

  q-btn(
    @click='filtering = true',
    fab,
    color='teal-14',
    icon='filter_alt',
    style='position: absolute; right: 2.7em; bottom: 9em'
  )
  q-dialog(v-model="filtering")
    OfferFilterForm(@submitted='filtering=false')

  q-dialog(v-model="showOffer")
    OfferDetails(:offer="detailsOffer" @submitted='offerAccepted')
  q-btn(
    @click='flyToUser()',
    fab,
    color='grey-10',
    icon='my_location',
    style='position: absolute; right: 2.7em; bottom: 4em'
  )
</template>

<style>
.Dairy {
  background-image: url('https://img.icons8.com/plasticine/100/null/milk-bottle.png');
}

.Eggs {
  background-image: url('https://img.icons8.com/plasticine/100/null/eggs.png');
}

.Meat {
  background-image: url('https://img.icons8.com/plasticine/100/null/steak-rare.png');
}

.Grain {
  background-image: url('https://img.icons8.com/plasticine/100/null/wheat.png');
}

.Fruit {
  background-image: url('https://img.icons8.com/plasticine/100/null/strawberry.png');
}

.Veggies {
  background-image: url('https://img.icons8.com/plasticine/100/null/carrot.png');
}

.Other {
  background-image: url('https://img.icons8.com/plasticine/100/null/paper-bag-with-seeds.png');
}
</style>
