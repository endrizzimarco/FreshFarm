<script setup>
import { createApp, ref, onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import OfferPopup from 'components/OfferPopup.vue'
import OfferFilterForm from 'components/OfferFilterForm.vue'

mapboxgl.accessToken = import.meta.env.VITE_MAP_API_KEY

const map = ref(null)
onMounted(() => {
  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-0.5608289, 51.2426316], // University of Surrey
    zoom: 12
  })
  createMarker('veggies', 'MY DAWG').setLngLat([-0.5608289, 51.2426316]).addTo(map.value)
  createMarker('other', 'MY G').setLngLat([-0.5499989, 51.2536315]).addTo(map.value)
})

const filtering = ref(false)
const maxPriceFilter = ref(null)

const filterOffers = maxPrice => {
  console.log('Filtering with max Price: ' + maxPrice)
  filtering.value = false
  maxPriceFilter.value = null
}

var popup_component = null
const createMarker = (type, text) => {
  const el = document.createElement('div')
  el.style = 'background-size: cover; width: 50px; height: 50px; cursor: pointer;'
  el.className = type

  const marker = new mapboxgl.Marker(el)

  // Create a popup and add it to the marker.
  let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`<div id="popup"></div>`)
  popup.on('open', () => {
    popup_component = createApp(OfferPopup, { text })
    popup_component.mount(`#popup`)
  })
  popup.on('close', () => popup_component && popup_component.unmount())

  return marker.setPopup(popup)
}

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    console.log('Geolocation is not supported by this browser.')
  }
}

const showPosition = position => {
  map.value.flyTo({ center: new mapboxgl.LngLat(position.coords.longitude, position.coords.latitude) })
}
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
    style='position: absolute; right: 2.6em; bottom: 9em'
  )
  q-dialog(v-model="filtering")
    OfferFilterForm    

  q-btn(
    @click='getLocation()',
    fab,
    color='grey-10',
    icon='my_location',
    style='position: absolute; right: 2.6em; bottom: 4em'
  )
</template>

<style>
.dairy {
  background-image: url('https://img.icons8.com/plasticine/100/null/milk-bottle.png');
}

.eggs {
  background-image: url('https://img.icons8.com/plasticine/100/null/eggs.png');
}

.meat {
  background-image: url('https://img.icons8.com/plasticine/100/null/steak-rare.png');
}

.grain {
  background-image: url('https://img.icons8.com/plasticine/100/null/wheat.png');
}

.fruit {
  background-image: url('https://img.icons8.com/plasticine/100/null/strawberry.png');
}

.veggies {
  background-image: url('https://img.icons8.com/plasticine/100/null/carrot.png');
}

.other {
  background-image: url('https://img.icons8.com/plasticine/100/null/paper-bag-with-seeds.png');
}
</style>
