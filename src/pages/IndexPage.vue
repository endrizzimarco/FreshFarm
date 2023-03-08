<script setup>
import { useFunctionsStore } from 'stores/functions.js'
</script>

<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px" />
    <q-btn @click="useFunctionsStore().test()">Test</q-btn>
  </q-page>
</template>
