<script setup>
import { ref, onMounted } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { msalInstance } from 'src/boot/msal'

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

const leftDrawerOpen = ref(false)
const isAuthenticated = ref(false)

const checkAuthenticated = () => {
  const accounts = msalInstance.getAllAccounts()
  isAuthenticated.value = accounts?.length > 0
}
const signIn = async () => {
  try {
    const loginRequest = { scopes: [] }
    const loginResponse = await msalInstance.loginPopup(loginRequest)
    isAuthenticated.value = !!loginResponse.account
  } catch (err) {
    // reset password flow
    if (err.errorMessage && err.errorMessage.indexOf('AADB2C90118') > -1) {
      try {
        const passwordResetResponse = await msalInstance.loginPopup({
          authority: 'https://freshfarm3014.b2clogin.com/freshfarm3014.onmicrosoft.com/B2C_1_PasswordReset/'
        })
        isAuthenticated.value = !!passwordResetResponse.account
      } catch (passwordResetError) {
        console.error(passwordResetError)
      }
    } else {
      console.error(err)
      isAuthenticated.value = false
    }
  }
}

const signOut = async () => {
  await msalInstance.logoutPopup()
  isAuthenticated.value = false
}

onMounted(() => {
  checkAuthenticated()
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-toolbar-title> FreshFarm </q-toolbar-title>
        {{ isAuthenticated }}
        <q-btn v-if="!isAuthenticated" color="primary" label="Sign in" @click="signIn()" />
        <q-btn v-else color="primary" label="Sign out" @click="signOut()" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
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
