<script setup>
import {useRouter} from "vue-router";
const router = useRouter();
</script>
<template lang="pug">
q-btn(
  @click='router.push("/")',
  rounded,
  label="Back to map"
  color='grey-10',
  icon='arrow_back',
  style='position: absolute; left: 2em; top: 4em; z-index: 1'
  )

q-card
  p Somewhere on this page will be about us
</template>