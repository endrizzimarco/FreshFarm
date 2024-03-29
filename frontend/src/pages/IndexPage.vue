<script setup>
import { createApp, ref, onMounted, watch } from 'vue'
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
  // mount all offers to map
  store.offers.forEach(offer => {
    const marker = createMarker(offer)
    markers.push(marker)
    marker.addTo(map.value)
  })
})

const detailsOffer = ref(null)
const showOffer = ref(false)
const filtering = ref(false)
const maxPriceFilter = ref(null)
const $q = useQuasar()

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
    popup_component = createApp(OfferPopup, { title: offer.title, price: offer.price, type: offer.type })
    popup_component.mount(`#popup`)
    document.getElementById('popupbtn').addEventListener('click', () => {
      detailsOffer.value = offer
      showOffer.value = true
      document.getElementsByClassName('mapboxgl-popup-close-button')[0].click()
    })
  })
  popup.on('close', () => popup_component && popup_component.unmount())
  return marker.setPopup(popup).setLngLat([offer.lng, offer.lat])
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

watch(store.latestChange, () => {
  if (store.latestChange.type === 'add') {
    const marker = createMarker(store.latestChange.offer)
    markers.push(marker)
    marker.addTo(map.value)
    if(store.latestChange.shouldNotify){
      $q.notify({
        message: `A new offer was added to the map!`,
        progress: true,
        color: 'blue-4',
        textColor: 'white',
        icon: 'info',
        position: 'top',
        actions: [
          {
            label: '✕',
            color: 'white'
          }
        ]
      })
    }
  } else if (store.latestChange.type === 'delete') {
    let markerToRemove = markers.find(m => m._element.id === store.latestChange.offer.id)
    if (markerToRemove) {
      markers.splice(markers.indexOf(markerToRemove), 1)
      markerToRemove.remove()
    }
  }
})

watch(store.activeFilters, () => {
  if (filteredMarkers) {
    filteredMarkers.forEach(marker => marker.remove())
    filteredMarkers = []
  }

  if (store.activeFilters.maxPrice || store.activeFilters.type || store.activeFilters.maxRadius) {
    markers.forEach(marker => marker.remove())
    store.filteredOffers.forEach(offer => {
      const m = createMarker(offer)
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
    style="position: absolute; left: 1em; top: 0em",
    alt='logo'
  )

  q-btn(
    @click='filtering = true',
    fab,
    color='teal-14',
    icon='filter_alt',
    style='position: absolute; right: 2.7em; bottom: 9em'
    aria-label="filter offers"
  )
  q-dialog(v-model="filtering")
    OfferFilterForm(@submitted='filtering = false')

  q-dialog(v-model="showOffer")
    OfferDetails(:offer="detailsOffer" @submitted='offerAccepted')
  q-btn(
    @click='flyToUser()',
    fab,
    color='grey-10',
    icon='my_location',
    style='position: absolute; right: 2.7em; bottom: 4em'
    aria-label="center location"
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
