<script setup>
import { ref, reactive, computed } from 'vue'
import { useQuasar } from 'quasar'
import axios from 'axios'
import { useAuthStore } from 'src/stores/auth'
import { userAPI } from 'boot/axios'

const emit = defineEmits(['submitted'])

const OfferForm = ref()
const $q = useQuasar()

const filterRequest = reactive({
  maxPrice: null,
  type: '',
  radius: 10
})

const radiusText = computed(() => {
  if (filterRequest.radius == null || filterRequest.radius == 0) {
    return ''
  } else {
    return filterRequest.radius == 1 ? `${filterRequest.radius} mile` : `${filterRequest.radius} miles`
  }
})

const submitFilter = () => {
  console.log(`Filtering with: `, filterRequest)
}

const getOfferIcon = offerType => {
  switch (offerType) {
    case 'Dairy':
      return 'https://img.icons8.com/plasticine/100/null/milk-bottle.png'
    case 'Eggs':
      return 'https://img.icons8.com/plasticine/100/null/eggs.png'
    case 'Meat':
      return 'https://img.icons8.com/plasticine/100/null/steak-rare.png'
    case 'Grain':
      return 'https://img.icons8.com/plasticine/100/null/wheat.png'
    case 'Fruit':
      return 'https://img.icons8.com/plasticine/100/null/strawberry.png'
    case 'Veggies':
      return 'https://img.icons8.com/plasticine/100/null/carrot.png'
    case 'Other':
      return 'https://img.icons8.com/plasticine/100/null/paper-bag-with-seeds.png'
  }
}
</script>

<template lang="pug">
q-card.full-width
  //- 'Create Offer' Header
  q-card-section.bg-blue-grey-1(style='padding: 8px')
    span.text-subtitle1.text-weight-light.text-blue-grey-10.q-ml-sm Filter the Offers
  //- 'Create Offer' Form
  q-form.q-pa-md(ref='OfferFilterForm', data-cy='OfferFilterForm' greedy autofocus)
    //- Offer MaxPrice field
    .row
      q-input(
        v-model.number="filterRequest.maxPrice",
        :dense='true'
        outlined,
        rounded,
        type="number"
          )
            template(v-slot:prepend)
              q-icon(name="attach_money")
            template(v-slot:before)
              span.text-subtitle1.text-blue-grey-10 Max Price:&nbsp&nbsp 

    q-separator.my-5
    //- Offer Radius field
    .grid.grid-cols-12.pt-1
      .col-span-3.flex.items-center
        span.text-subtitle1.text-blue-grey-10 Radius:&nbsp {{ radiusText }}
      .col-span-9
        q-slider.mt-2.px-5(v-model.number="filterRequest.radius" :min="0.5" :max="10" :step="0.5"  )

    q-separator.my-5
    //- Offer Type field
    .text-subtitle1.text-blue-grey-10.py-2 Filter by type:
    .row.q-pb-md.justify-around
      div.text-center(
        v-for='offerType in ["Dairy", "Eggs", "Meat", "Grain", "Fruit", "Veggies", "Other"]'
      )
        img.cursor-pointer.q-pa-xs.w-16(
          @click='filterRequest.type = offerType' 
          :src='getOfferIcon(offerType)',
          :style='filterRequest.type == offerType ? "box-shadow: 0 0 1pt 2pt #0080ff; border-radius: 30%" : ""'
        )
        span.text-xs.text-blue-grey-10.text-center {{offerType}}

    //- Submit Filter action
    q-card-actions(align="right").pt3
      q-btn(v-close-popup flat color="primary" label="Apply" @click="submitFilter(filterRequest)")
      
</template>
