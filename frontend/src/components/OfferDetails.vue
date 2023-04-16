<template lang="pug">
q-card.my-card(flat)
  //- Will be offer pictureUrl
  q-img(src='https://cdn.quasar.dev/img/chicken-salad.jpg')
  q-card-section
    q-btn.absolute(fab color='primary' @click="sendDirections()" icon='directions' style='top: 0; right: 12px; transform: translateY(-50%);')
    .row.items-center
      .col.text-h6.ellipsis Offer Title
    .row.items-center
      .col.text-caption.text-grey.ellipsis {{address}} 
    .row.items-center
      .col.text-subtitle2.text-grey.ellipsis £ {{offer.price.toFixed(2)}}
        q-chip.ms-5(size="sm" :color="getChipColor(offer.type)" text-color="white" :label="offer.type")
  q-card-section
    .details(v-if='offer.description')
      .row.items-center.q-pt-none
        .col.text-subtitle1 Details:
      .row.items-center.q-pt-none
        .description(v-if='seeMoreActive') 
          .col.text-subtitle1.text-grey {{offer.description}}
          .col.text-right.text-grey.cursor-pointer(@click="seeMoreActive = false") See less
        .description(v-else)
          .col.text-subtitle1.text-grey {{offer.description.slice(0, 100)}}...
          .col.text-right.text-grey.cursor-pointer(@click="seeMoreActive = true") See more
  q-separator
  q-card-actions(align="right")
    q-btn(flat color="red-5" label="Close" v-close-popup)
    q-btn(flat color='primary' label="Purchase" v-close-popup @click="geocodeOfferCoords()")

</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const props = defineProps(['offer', 'pictureUrl'])

const address = ref('')
const seeMoreActive = ref(false)

const getChipColor = type => {
  switch (type) {
    case 'Dairy':
      return 'blue-4'
    case 'Eggs':
      return 'orange-3'
    case 'Meat':
      return 'red-9'
    case 'Grain':
      return 'amber'
    case 'Fruit':
      return 'red-6'
    case 'Veggies':
      return 'green'
    case 'other':
      return 'grey'
    default:
      return 'grey'
  }
}

const getUserCoords = async () => {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        error => {
          reject(error)
        }
      )
    })
  } else {
    return new Promise((resolve, reject) => {
      reject('Geolocation is not supported by this browser.')
    })
  }
}

let geocodeOfferAddress = async () => {
  let response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${props.offer.lng},${props.offer.lat}.json`,
    {
      params: {
        access_token: import.meta.env.VITE_MAP_API_KEY,
        country: 'gb',
        types: 'address',
        limit: 1
      }
    }
  )
  console.log(response.data.features[0].place_name)
  return `${response.data.features[0].text}, ${response.data.features[0].context[1].text}, ${response.data.features[0].context[0].text}`
}

const sendDirections = async () => {
  const coords = await getUserCoords()
  window.open(
    `https://www.google.com/maps/dir/?api=1&origin=${coords.lat},${coords.lng}&destination=${props.offer.lat},${props.offer.lng}&travelmode=driving`,
    '_blank'
  )
}

onMounted(async () => {
  address.value = await geocodeOfferAddress()
  const coords = await getUserCoords()
  console.log(coords)
})
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 300px;
}
.description {
  inline-size: 250px;
  overflow-wrap: break-word;
  hyphens: auto;
}
</style>
