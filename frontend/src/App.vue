<script setup>
import { onUnmounted, onBeforeMount, ref } from 'vue'
import { useAuthStore } from 'stores/auth.js'
import { useUserStore } from 'stores/user-functions.js'

var websockets = []
const userStore = useUserStore()
const store = useAuthStore()
const offersFetched = ref(false)

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      userStore.user_coords = { lat: position.coords.latitude, lng: position.coords.longitude }
    })
  } else {
    console.log('Geolocation is not supported by this browser.')
  }
}

onBeforeMount(async () => {
  store.initAuth()
  await userStore.getOffers()
  offersFetched.value = true
  getLocation()
  await store.handleRedirectPromise()
  websockets = await userStore.initLiveUpdates()
})

onUnmounted(() => websockets.forEach(ws => ws.close()))
</script>

<template>
  <router-view v-if="offersFetched" />
</template>
