<template lang="pug">
q-card.full-width
  //- 'Create Offer' Header
  q-card-section.bg-blue-grey-1(style='padding: 8px')
    span.text-subtitle1.text-weight-light.text-blue-grey-10.q-ml-sm Create your produce offer
    q-chip.float-right(
      @click='validateEvent()',
      clickable,
      color='primary',
      text-color='white',
      icon='done',
      style='margin-top: -1px'
    ) Submit Offer
  form
    input(name='address', placeholder='Address', type='text', autocomplete='address-line1')
  //- 'Create Offer' Form
  q-form.q-pa-md(ref='eventForm', data-cy='eventForm')
    //- Offer name field
    .row
      q-input.full-width(
        v-model='offerData.name',
        :dense='true',
        :rules='[val => (val !== null && val !== "") || "Please insert a name for the offer."]',
        lazy-rules,
        rounded,
        outlined,
        label='Title',
        placeholder='Milk and eggs'
      )
        template(v-slot:before)
          span.text-subtitle1.text-blue-grey-10 Offer name:&nbsp&nbsp

    //- Offer Price field
    .row.pb-2
      q-input(
            v-model.number="offerData.cost",
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

    //- Offer Type field
    .text-subtitle1.text-blue-grey-10.py-2 Choose a type of Offer:
    .row.q-pb-md.justify-around
      div.text-center(v-for='eventType in ["Dairy", "Eggs", "Meat", "Grain", "Veggies", "Other"]')
        img.cursor-pointer.q-pa-xs.w-16(
          ,
          @click='offerData.type = eventType',
          :src='getEventIcon(eventType)',
          :style='offerData.type == eventType ? "box-shadow: 0 0 1pt 2pt #0080ff; border-radius: 30%" : ""'
        )
        span.text-xs.text-blue-grey-10.text-center {{eventType}}

    //- Pickup location field
    span.text-subtitle1.text-blue-grey-10 Pickup location:
    q-select.full-width(
      v-model='location',
      @input-value='setUserInput',
      :options='placesOptions',
      :dense='true',
      :rules='[val => (val !== null && val !== "") || "Please select a location for pickup."]',
      lazy-rules,
      label='Search addresses',
      rounded,
      autocomplete = 'address-line1',
      outlined,
      use-input,
      input-debounce='0',
      emit-value,
      map-options
    )
      template(v-slot:prepend)
        q-icon(name='place')
      template(v-slot:no-option)
        q-item
          q-item-section.text-grey No results

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
        v-model='offerData.details',
        placeholder='Selling 6 eggs and 1 gallon of milk...',
        :dense='true'
      )
</template>

<script>
export default {
  emits: ['submitted'],
  data() {
    return {
      offerData: {
        name: '',
        cost: 0.0,
        type: 'Dairy',
        details: ''
      },
      location: '',
      userInput: 'a',
      service: null,
      searchResults: []
    }
  },
  methods: {
    validateEvent() {
      this.$refs.eventForm.validate().then(success => {
        if (success) {
          console.log('Form is valid')

          // Turn place name into coordinates to save in db
          // this.geocodeLocation() TODO:
        }
      })
    },
    submitEvent(results, status) {
      if (status == 'OK') {
        // TODO: should call function new-offers function
        this.offerData['lat'] = results[0].geometry.location.lat()
        this.offerData['lng'] = results[0].geometry.location.lng()
        this.offerData['friends'] = this.friendsObject // turn array into object
        this.offerData['timestamp'] = Date.now() // add timestamp
        // Save offerData object under events node in db
        this.firebaseSubmitEvent(this.offerData)
        this.$emit('submitted')
      } else {
        console.log('Geocode was not successful for the following reason: ' + status)
      }
    },
    placesGetPredictions() {
      this.service.getPlacePredictions(
        {
          input: this.userInput,
          location: new google.maps.LatLng(this.center),
          radius: 5000
        },
        this.savePredictions
      )
    },
    savePredictions(predictions, status) {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.searchResults = []
        return
      }
      this.searchResults = predictions
    },
    geocodeLocation() {
      // TODO: can't use maps?
      var geocoder = new google.maps.Geocoder()
      geocoder.geocode({ placeId: this.location }, this.submitEvent)
    },
    getEventIcon(eventType) {
      switch (eventType) {
        case 'Dairy':
          return 'https://img.icons8.com/3d-fluency/94/null/milk-bottle.png'
        case 'Eggs':
          return 'https://img.icons8.com/3d-fluency/94/null/sunny-side-up-eggs.png'
        case 'Meat':
          return 'https://img.icons8.com/3d-fluency/94/null/steak.png'
        case 'Grain':
          return 'https://img.icons8.com/3d-fluency/94/null/corn.png'
        case 'Veggies':
          return 'https://img.icons8.com/3d-fluency/94/null/tomato.png'
        case 'Other':
          return 'https://img.icons8.com/3d-fluency/94/null/farmer-female.png'
      }
    },
    setUserInput(val) {
      this.userInput = val
    },

    mounted() {
      this.service = document
        .getElementById('search-js')
        .onload(() => mapboxsearch.autofill({ accessToken: import.meta.env.VITE_MAP_API_KEY }))
    }
  }
}
</script>
