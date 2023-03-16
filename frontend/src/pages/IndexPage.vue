<template>
  <q-page class="flex flex-center">
    <div id="map" class="window-height window-width"></div>
  </q-page>
</template>

<script>
import mapboxgl from 'mapbox-gl'

export default {
  mounted() {
    mapboxgl.accessToken = import.meta.env.VITE_MAP_API_KEY

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-0.5608289, 51.2426316], // University of Surrey
      zoom: 12
    })

    // Add the missing image to the map
    map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', function (error, image) {
      if (error) throw error
      map.addImage('rectangle-yellow-6', image)
      // Create the marker using the new image
      const marker = new mapboxgl.Marker({
        color: 'yellow',
        scale: 0.5,
        // Use the new image for the marker
        icon: 'rectangle-yellow-6'
      })
        .setLngLat([-0.5608289, 51.2426316])
        .addTo(map)

      // Create a popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setText('pop up')
      // Assign the popup to the marker
      marker.setPopup(popup)
      // Show the popup when the marker is clicked
      marker.on('click', function () {
        marker.togglePopup()
      })
    })
  }
}
</script>
