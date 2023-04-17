<script setup>
import { onUnmounted, onBeforeMount, ref } from 'vue'
import { useAuthStore } from 'stores/auth.js'
import { useUserStore } from 'stores/user-functions.js'

var websockets = []
const userStore = useUserStore()
const store = useAuthStore()
const offersFetched = ref(false)

onBeforeMount(async () => {
  store.initAuth()
  await userStore.getOffers()
  offersFetched.value = true
  await store.handleRedirectPromise()
  websockets = await userStore.initLiveUpdates()
})

onUnmounted(() => websockets.forEach(ws => ws.close()))
</script>

<template>
  <router-view v-if="offersFetched" />
</template>
