<script setup>
import { defineComponent } from 'vue'
import { useAuthStore } from 'stores/auth.js'
import { useUserStore } from 'stores/user-functions.js'
import { onMounted } from 'vue'

const store = useAuthStore()
onMounted(async () => {
  await store.handleRedirectPromise()
  store.initAuth()
})
</script>

<template>
  <router-view />
</template>
