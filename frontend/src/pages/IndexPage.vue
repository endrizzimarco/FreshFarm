<script setup>
import { onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'

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

  // Create a popup and add it to the marker.
  marker.setPopup(new mapboxgl.Popup({ offset: 25 }).setText(text))
  marker.on('click', () => this.togglePopup)

  return marker
}
</script>

<template>
  <q-page class="flex flex-center">
    <div id="map" class="window-height window-width"></div>
  </q-page>
</template>

<style>
.spongebob {
  background-image: url('https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png');
}

.patrick {
  background-image: url('https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/800px-Patrick_Star.svg.png');
}
</style>
