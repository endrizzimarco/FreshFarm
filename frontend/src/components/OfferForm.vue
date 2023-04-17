<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import axios from 'axios'
import { useAuthStore } from 'src/stores/auth'
import { useFarmerStore } from 'src/stores/farmer-functions'
import { getOfferIcon } from 'boot/utils'

const emit = defineEmits(['submitted'])

const OfferForm = ref()
const $q = useQuasar()

const submitted = ref(false)

const offerData = reactive({
  title: '',
  price: 0.0,
  type: 'Dairy',
  description: '',
  location: ''
})

const validateOffer = () => {
  OfferForm.value.validate().then(async success => {
    if (success) {
      submitted.value = true
      let coords = await geocodeLocation()
      let requestBody = {
        title: offerData.title,
        price: offerData.price,
        type: offerData.type,
        lng: coords[0],
        lat: coords[1],
        description: offerData.description,
        farmerId: useAuthStore().userID
      }
      const response = await useFarmerStore().createOffer(requestBody)
      if (response.status === 200) {
        $q.notify({
          progress: true,
          position: 'top',
          type: 'positive',
          message: `Offer ${offerData.title} created`,
          actions: [
            {
              label: '✕',
              color: 'white'
            }
          ]
        })
        offerData.title = ''
        offerData.price = 0.0
        offerData.type = 'Dairy'
        offerData.description = ''
        offerData.location = ''
        submitted.value = false
        emit('submitted')
      } else {
        $q.notify({ progress: true, position: 'top', type: 'negative', message: 'Offer creation failed' })
      }
      console.log(response.data)
    }
  })
}

let geocodeLocation = async () => {
  let response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${offerData.location}.json`, {
    params: {
      access_token: import.meta.env.VITE_MAP_API_KEY,
      country: 'gb',
      types: 'address',
      limit: 1
    }
  })
  return response.data.features[0].center
}

onMounted(() => {
  mapboxsearch.autofill({
    accessToken: import.meta.env.VITE_MAP_API_KEY,
    options: {
      country: 'gb',
      limit: 5,
      types: 'address',
      proximity: 'ip',
      autocomplete: true,
      fuzzyMatch: true,
      language: 'en'
    }
  })
})
</script>

<template lang="pug">
q-card.full-width
  //- 'Create Offer' Header
  q-card-section.bg-blue-grey-1(style='padding: 8px')
    span.text-subtitle1.text-weight-light.text-blue-grey-10.q-ml-sm Create your produce offer
    q-chip.float-right(
      @click='validateOffer()',
      clickable,
      color='primary',
      text-color='white',
      style='margin-top: -1px'

    ) 
      q-icon.mr-1.text-xl(v-if='!submitted', name='done')
      q-spinner-pie.mr-2.text-lg(v-else)
      span Submit Offer
  //- 'Create Offer' Form
  q-form.q-pa-md(ref='OfferForm', data-cy='OfferForm' greedy autofocus)
    //- Offer title field
    .row
      q-input.full-width(
        v-model='offerData.title',
        :dense='true',
        :rules='[val => (val !== null && val !== "") || "Please insert a name for the offer."]',
        lazy-rules,
        rounded,
        outlined,
        label='Title',
        placeholder='Milk and eggs'
      )
        template(v-slot:before)
          span.text-subtitle1.text-blue-grey-10 Offer title:&nbsp&nbsp

    //- Offer Price field
    .row
      q-input(
        v-model.number="offerData.price",
        :dense='true'
        lazy-rules,
        :rules='[val => (val !== null && val !== "" && val != 0) || "Please insert a price for the offer."]',
        outlined,
        rounded,
        type="number"
          )
            template(v-slot:prepend)
              q-icon(name="attach_money")
            template(v-slot:before)
              span.text-subtitle1.text-blue-grey-10 Offer price:&nbsp&nbsp

    //- Pickup location field
    span.text-subtitle1.text-blue-grey-10 Pickup location:
    q-input.full-width(
      v-model='offerData.location',
      :dense='true',
      :rules='[val => (val !== null && val !== "") || "Please select a location for pickup."]',
      lazy-rules,
      label='Search addresses',
      rounded,
      autocomplete='address-line1',
      outlined,
    )
      template(v-slot:prepend)
        q-icon(name='place')
      template(v-slot:no-option)
        q-item
          q-item-section.text-grey No results

    //- Offer Type field
    .text-subtitle1.text-blue-grey-10.py-2 Choose a type of Offer:
    .row.q-pb-md.justify-around
      div.text-center(v-for='offerType in ["Dairy", "Eggs", "Meat", "Grain", "Fruit", "Veggies", "Other"]')
        img.cursor-pointer.q-pa-xs.w-16(
          :src='getOfferIcon(offerType)',
          @click='offerData.type = offerType' 
          :style='offerData.type == offerType ? "box-shadow: 0 0 1pt 2pt #0080ff; border-radius: 30%" : ""'
        )
        span.text-xs.text-blue-grey-10.text-center {{offerType}}

    //- Offer details field
    .row
      span.text-subtitle1.text-blue-grey-10 Details:
      q-input.full-width(
        rounded,
        outlined,
        autogrow,
        :rules='[val => (val !== null && val !== "") || "Please enter a description for the offer."]',
        lazy-rules,
        type='textarea',
        v-model='offerData.description',
        placeholder='Selling 6 eggs and 1 pint of milk...',
        :dense='true'
      )
</template>
