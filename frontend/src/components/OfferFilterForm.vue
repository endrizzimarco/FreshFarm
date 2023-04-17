<script setup>
import { reactive, computed, defineEmits, ref } from 'vue'
import { useUserStore } from 'src/stores/user-functions'
import { getOfferIcon } from 'boot/utils'

const emit = defineEmits(['submitted'])
const store = useUserStore()
const filterData = reactive(JSON.parse(JSON.stringify(store.activeFilters)))
const spin = ref(false)
const radiusText = computed(() => {
  if (filterData.maxRadius == null || filterData.maxRadius == 0) {
    return ''
  } else {
    return filterData.maxRadius == 1 ? `${filterData.maxRadius} mile` : `${filterData.maxRadius} miles`
  }
})

const submitFilter = async () => {
  spin.value = true
  // If maxRadius is set but lat or lng is missing, add user coordinates
  if (filterData.maxRadius && (!filterData.lat || !filterData.lng)) {
    filterData.lat = store.user_coords.lat
    filterData.lng = store.user_coords.lng
  }

  // If any of the filters are set, apply them to the store
  if (filterData.maxRadius || filterData.maxPrice || filterData.type) {
    await store.filterOn(filterData)
  }
  spin.value = false
  emit('submitted')
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
        v-model.number="filterData.maxPrice",
        dense
        outlined,
        rounded,
        type="number"
          )
          template(v-slot:prepend)
            q-icon(name="currency_pound")
          template(v-slot:before)
            span.text-subtitle1.text-blue-grey-10 Max Price:&nbsp&nbsp

    q-separator.my-5
    //- Offer Radius field
    .grid.grid-cols-12.pt-1
      .col-span-3.flex.items-center
        span.text-subtitle1.text-blue-grey-10 Radius:&nbsp; {{ radiusText ? radiusText : 'Infinite' }}
      .col-span-9
        q-slider.mt-2.px-5(v-model.number="filterData.maxRadius" :min="0.5" :max="10" :step="0.5"  )

    q-separator.my-5
    //- Offer Type field
    .text-subtitle1.text-blue-grey-10.py-2 Filter by type:
    .row.q-pb-md.justify-around
      div.text-center(
        v-for='offerType in ["Dairy", "Eggs", "Meat", "Grain", "Fruit", "Veggies", "Other"]'
      )
        img.cursor-pointer.q-pa-xs.w-16(
          @click='filterData.type = offerType'
          :src='getOfferIcon(offerType)',
          :style='filterData.type == offerType ? "box-shadow: 0 0 1pt 2pt #0080ff; border-radius: 30%" : ""'
        )
        span.text-xs.text-blue-grey-10.text-center {{offerType}}

    //- Submit Filter action
    q-card-actions(align="right").pt3
      q-btn(v-close-popup flat color="red-6" label="Clear" @click="store.clearFilters()")
      q-btn(:loading='spin' flat color="primary" label="Apply" @click="submitFilter()")
        template(v-slot:loading)
          q-spinner-tail.on-left
</template>
