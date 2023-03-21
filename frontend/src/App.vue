<script setup>
import { defineComponent } from 'vue'
import { useAuthStore } from 'stores/auth.js'
import { useFunctionsStore } from 'stores/functions.js'
import { onMounted } from 'vue'

const store = useAuthStore()
onMounted(async () => {
  await store.handleRedirectPromise()
  store.initAuth()
  useFunctionsStore().liveUpdates()
})
</script>

<template>
  <router-view />
</template>
