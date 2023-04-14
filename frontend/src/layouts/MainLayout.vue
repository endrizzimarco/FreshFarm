<script setup>
import EssentialLink from 'components/EssentialLink.vue'
import OfferForm from 'components/OfferForm.vue'
import { useAuthStore } from 'stores/auth.js'
import { useUserStore } from 'src/stores/user-functions.js'
import { useFunctionsStore } from 'src/stores/functions.js'
import { ref } from 'vue'

const essentialLinks = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

const store = useAuthStore()
const leftDrawerOpen = ref(false)

const offerForm = ref(false)
const newOffer = ref(false)

const submit = () => {
  newOffer.value = false
  this.$q.notify({
    message: 'Offer Submitted',
    color: 'orange',
    actions: [
      {
        label: '✕',
        color: 'white'
      }
    ]
  })
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-toolbar-title> FreshFarm </q-toolbar-title>
        <q-btn v-if="!store.isAuthenticated" color="primary" label="Sign in" @click="store.signIn" />
        <q-btn v-else color="primary" label="Sign out" @click="store.signOut" />
        <q-btn color="secondary" label="Test Function" @click="useUserStore().test" />
        <q-btn color="secondary" label="Test Function 2" @click="useFunctionsStore().test2" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>
    <q-dialog v-model="offerForm" position="bottom">
      <OfferForm @submitted="submit" />
    </q-dialog>
    <q-page-container>
      <router-view />
      <q-page-sticky position="bottom" :offset="[18, 36]">
        <q-fab vertical-actions-align="center" color="teal-14" icon="add" direction="up" data-cy="centerBtn">
          <!-- <q-fab-action @click="offerForm = true" color="accent" icon="search" label="Filter offers" /> -->
          <q-fab-action @click="offerForm = true" color="orange" icon="soup_kitchen" label="New Offer" />
        </q-fab>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>
