<script setup>
import OfferForm from 'components/OfferForm.vue'
import { useAuthStore } from 'stores/auth.js'
import { useUserStore } from 'src/stores/user-functions.js'
import { useFunctionsStore } from 'src/stores/functions.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const store = useAuthStore()
const leftDrawerOpen = ref(false)

const confirmLogout = ref(false)
const offerForm = ref(false)
const newOffer = ref(false)

const showMenu = grid => {
  let actions = [
    {
      label: 'Github',
      img: 'https://img.icons8.com/plasticine/100/null/github-squared.png',
      id: 'github'
    },
    {
      label: 'About us',
      img: 'https://img.icons8.com/plasticine/100/null/info.png',
      id: 'about'
    }
  ]

  if (store.isAuthenticated) {
    actions.unshift(
      {
        label: 'Dashboard',
        img: 'https://img.icons8.com/plasticine/100/null/bar-chart.png',
        width: '100px',
        id: 'dashboard'
      },
      {
        label: 'Create Offer',
        img: 'https://img.icons8.com/plasticine/100/null/plus-2-math.png',
        id: 'createOffer'
      }
    )
    console.log(actions)
  }

  const username = store.username ? `, ${store.username}` : ''

  $q.bottomSheet({
    message: `Hello${username}!`,
    grid,
    dark: true,
    style: 'width: 30000px;',
    actions: actions
  })
    .onOk(action => {
      switch (action.id) {
        case 'github':
          window.open('https://github.com/endrizzimarco/FreshFarm', '_blank')
          break
        case 'about':
          router.push({ path: '/about' })
          break
        case 'dashboard':
          console.log('dashboard')
          break
        case 'createOffer':
          offerForm.value = true
          break
      }
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
    router-view(v-slot='{ Component, route }')
        transition(name='slide-fade', mode='out-in')
          keep-alive
            component(:is='Component', :key='route.path')
    q-page-sticky(position='bottom' :offset='[18, 36]')
      q-btn(@click='showMenu(true)' fab color='blue' icon='expand_less' direction='up' data-cy='centerBtn' style='bottom: 1.5em;')
      div(v-if='store.isAuthenticated')
        q-fab(vertical-actions-align='left' color='red-5' icon='logout' data-cy='centerBtn' direction='right' style='position: absolute; left: 1em; bottom: 1em;')
          q-fab-action(@click='store.signOut' color='red' icon='logout' label='Confirm logout')
      q-btn(v-else @click="store.signIn" fab color='purple-12' icon='login' style='position: absolute; left: 1em; bottom: 1em;')
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
