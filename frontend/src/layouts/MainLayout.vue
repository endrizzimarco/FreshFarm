<script setup>
import OfferForm from 'components/OfferForm.vue'
import { useAuthStore } from 'stores/auth.js'
import { useUserStore } from 'src/stores/user-functions.js'
import { useFunctionsStore } from 'src/stores/functions.js'
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const store = useAuthStore()
const leftDrawerOpen = ref(false)

const confirmLogout = ref(false)
const offerForm = ref(false)
const newOffer = ref(false)

const showMenu = grid => {
  $q.bottomSheet({
    message: 'Hello, Dipshit',
    grid,
    dark: true,
    style: 'width: 30000px;',

    actions: [
      {
        label: 'Drive',
        img: 'https://cdn.quasar.dev/img/logo_drive_128px.png',
        id: 'drive'
      },
      {
        label: 'Keep',
        img: 'https://cdn.quasar.dev/img/logo_keep_128px.png',
        id: 'keep'
      },
      {
        label: 'Google Hangouts',
        img: 'https://cdn.quasar.dev/img/logo_hangouts_128px.png',
        id: 'calendar'
      },
      {
        label: 'Calendar',
        img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png',
        id: 'calendar'
      }
    ]
  })
    .onOk(action => {
      console.log('Action chosen:', action.id)
    })
    .onCancel(() => {
      console.log('Dismissed')
    })
    .onDismiss(() => {
      console.log('I am triggered on both OK and Cancel')
    })
}
</script>

<template lang="pug">
q-layout(view='lHh Lpr lFf')
  q-dialog(v-model='offerForm')
    OfferForm(@submitted='offerForm = false') 
  q-page-container
    router-view
    q-page-sticky(position='bottom' :offset='[18, 36]')
      div(v-if='store.isAuthenticated')
        q-btn(@click='showMenu(true)' fab color='blue' icon='expand_less' direction='up' data-cy='centerBtn' style='bottom: 1em;')
        q-fab(vertical-actions-align='left' color='red-5' icon='logout' data-cy='centerBtn' direction='right' style='position: absolute; left: 1em; bottom: 0em;')
          q-fab-action(@click='store.signOut' color='red' icon='logout' label='Confirm logout')
      q-btn(v-else @click="store.signIn" fab color='blue' icon='login' style='position: absolute; left: 1em; bottom: 0em;')
</template>
