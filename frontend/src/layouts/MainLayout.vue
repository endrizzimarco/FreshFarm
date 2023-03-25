<script setup>
import EssentialLink from 'components/EssentialLink.vue'
import { useAuthStore } from 'stores/auth.js'
import { useFunctionsStore } from 'src/stores/functions'
import { ref } from 'vue'

const essentialLinks = [
  {
    title: 'Home',
    caption: 'FreshFarm Home page',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Farmers Dashboard',
    caption: 'View your farm dashboard',
    icon: 'dashboard',
    link: 'farmers-dashboard'
  }
]

const store = useAuthStore()
const functionsStore = useFunctionsStore()
const leftDrawerOpen = ref(false)
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-toolbar-title @click="$router.push('/')" class="cursor-pointer"> FreshFarm </q-toolbar-title>
        <q-btn v-if="!store.isAuthenticated" color="primary" label="Sign in" @click="store.signIn" />
        <q-btn v-else color="primary" label="Sign out" @click="store.signOut" />
        <q-btn color="secondary" label="Test Function" @click="functionsStore.test" />
        <q-btn color="secondary" label="Test Function 2" @click="functionsStore.test2" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
