<template lang="pug">
q-card.my-card(flat)
  //- Will be offer pictureUrl
  q-img(src='https://cdn.quasar.dev/img/chicken-salad.jpg')
  q-card-section
    q-btn.absolute(fab color='primary' @click="sendDirections()" icon='directions' style='top: 0; right: 12px; transform: translateY(-50%);')
    .row.items-center
      .col.text-h6.ellipsis {{ offer.title }}
    .row.items-center
      .col.text-caption.text-grey.ellipsis {{address}}
    .row.items-center
      .col.text-subtitle2.text-grey.ellipsis £{{offer.price.toFixed(2)}}
        q-chip.ms-2.mb-2(size="sm" :color="getChipColor(offer.type)" text-color="white" :label="offer.type")
    q-carousel(swipeable animated v-model='slide' ref="carousel")
      q-carousel-slide(:name='1')
        q-card-section
          .details(v-if='offer.description')
            .row.items-center.q-pt-none
              .col.text-subtitle1 Details:
            .row.items-center.q-pt-none
              .description(v-if='seeMoreActive || offer.description.length <= 100')
                .col.text-subtitle1.text-grey {{offer.description}}
                .col.text-right.text-grey.cursor-pointer(v-if="offer.description.length > 100" @click="seeMoreActive = false") See less
              .description(v-else)
                .col.text-subtitle1.text-grey {{offer.description.slice(0, 100)}}...
                .col.text-right.text-grey.cursor-pointer(@click="seeMoreActive = true") See more
        q-separator
        q-card-actions(align="right")
          q-btn(flat color="red-5" label="Close" v-close-popup)
          q-btn(flat color='primary' label="Purchase" v-close-popup @click="slide=2")
      q-carousel-slide(:name='2')
        q-separator
        q-form.py-3(ref='orderForm')
          q-input(dense, filled, v-model='salesData.name', label='Name', lazy-rules, :rules="[ val => val && val.length > 0 || 'Please type something']")
          q-input(dense filled v-model='salesData.date', label='Pickup time')
            template(v-slot:prepend)
              q-icon.cursor-pointer(name='event')
                q-popup-proxy(cover='' transition-show='scale' transition-hide='scale')
                  q-date(v-model='salesData.date' today-btn mask="YYYY-MM-DD HH:mm", :options="options")
                    .row.items-center.justify-end
                      q-btn(v-close-popup='' label='Select' color='primary' flat)
            template(v-slot:append)
              q-icon.cursor-pointer(name='access_time')
                q-popup-proxy(cover='' transition-show='scale' transition-hide='scale')
                  q-time(v-model='salesData.date' mask="YYYY-MM-DD HH:mm" format24h :hour-options='[...Array(12).keys()].map(i => i + 8)' :minute-options='[0, 15, 30, 45]')
                    .row.items-center.justify-end
                      q-btn(v-close-popup='' label='Select' color='primary' flat)
        q-card-actions(align="right")
          q-btn(flat color="red-5" label="Back" @click="slide=1")
          q-btn(:loading='spin' flat color='primary' label="Finalize" @click="validateOrder")
            template(v-slot:loading)
              q-spinner-tail.on-left
</template>

<script setup>
import { ref, reactive, onMounted, defineEmits } from 'vue'
import axios from 'axios'
import { useUserStore } from 'src/stores/user-functions'
import { getChipColor } from 'boot/utils'

const emit = defineEmits(['submitted'])
const store = useUserStore()
const props = defineProps(['offer'])

// Date stuff
const options = ref([])
const getDate = () => {
  let date = new Date().toISOString().split('T')
  return `${date[0] + ' ' + date[1].slice(0, 5)}`
}

// Form stuff
const spin = ref(false)
const slide = ref(1)
const seeMoreActive = ref(false)
const orderForm = ref()

const validateOrder = async () => {
  orderForm.value.validate().then(async success => {
    if (success) {
      spin.value = true
      await store.purchaseOffer({
        customerName: salesData.name,
        collectionTime: salesData.date,
        offerId: props.offer.id,
        farmerId: props.offer.farmerId,
        title: props.offer.title
      })
      spin.value = false
      emit('submitted')
    }
  })
}
const salesData = reactive({
  name: '',
  date: getDate()
})

const address = ref('')
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
  return `${response.data.features[0].text}, ${response.data.features[0].context[1].text}, ${response.data.features[0].context[0].text}`
}

const sendDirections = async () => {
  const coords = store.user_coords
  window.open(
    `https://www.google.com/maps/dir/?api=1&origin=${coords.lat},${coords.lng}&destination=${props.offer.lat},${props.offer.lng}&travelmode=driving`,
    '_blank'
  )
}

onMounted(async () => {
  address.value = await geocodeOfferAddress()
  for (let i = 0; i < 3; i++) {
    let date = new Date()
    date.setDate(date.getDate() + i)
    options.value.push(date.toISOString().split('T')[0].replaceAll('-', '/'))
  }
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
.q-carousel__slide {
  padding: 0px;
}
.q-carousel {
  height: auto;
}
</style>
