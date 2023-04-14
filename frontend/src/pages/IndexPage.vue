<script setup>
import { onMounted, h, ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import OfferForm from 'components/OfferForm.vue'

mapboxgl.accessToken = import.meta.env.VITE_MAP_API_KEY

onMounted(() => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-0.5608289, 51.2426316], // University of Surrey
    zoom: 12
  })
  createMarker('spongebob', 'HELLO').setLngLat([-0.5608289, 51.2426316]).addTo(map)
})

const filtering = ref(false)
const maxPriceFilter = ref(null)

const filterOffers = maxPrice => {
  console.log('Filtering with max Price: ' + maxPrice)
  filtering.value = false
  maxPriceFilter.value = null
}

const createMarker = (type, text) => {
  const el = document.createElement('div')
  el.style = 'background-size: cover; width: 50px; height: 50px; cursor: pointer;'

  switch (type) {
    case 'spongebob':
      el.className = 'spongebob'
      break
    case 'patrick':
      el.className = 'patrick'
      break
    default:
      el.className = 'spongebob'
  }
  const marker = new mapboxgl.Marker(el)
  const OfferFormInstance = h(OfferForm)

  // Create a popup and add it to the marker.
  marker.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<div id="popup-content"></div>`))
  marker.on('click', () => {
    this.togglePopup
    OfferFormInstance.mount('#popup-content')
  })

  return marker
}

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    console.log('Geolocation is not supported by this browser.')
  }
}

const showPosition = position => {
  console.log('Latitude: ' + position.coords.latitude + 'Longitude: ' + position.coords.longitude)
}
</script>

<template lang="pug">
q-page.flex.flex-column.h-max
  #map.window-height.window-width.z-0
  q-btn(
    @click='filtering=true',
    fab,
    color='grey-10',
    icon='filter_list',
    style='position: absolute; right: 2em; bottom: 12em; z-index: 1'
  )
  q-dialog(v-model="filtering")
    q-card
      q-card-section
        q-input(
          v-model.number="maxPriceFilter",
          label="Maximum Price",
          outlined,
          type="number"
        )
          template(v-slot:prepend)
            q-icon(name="attach_money")
      q-card-actions
        q-btn(
          label="Cancel",
          color="primary",
          flat,
          @click="filtering = false"
        )
        q-btn(
          label="Apply",
          color="primary",
          flat,
          @click="filterOffers(maxPriceFilter)"
        )

  q-btn(
    @click='getLocation()',
    fab,
    color='grey-10',
    icon='my_location',
    style='position: absolute; right: 2em; bottom: 6em; z-index: 1'
  )
</template>

<style>
.spongebob {
  background-image: url('https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png');
}

.patrick {
  background-image: url('https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/800px-Patrick_Star.svg.png');
}
</style>
