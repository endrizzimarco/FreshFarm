<script setup>
import axios from 'axios'
import { onBeforeMount, ref } from 'vue'

const emit = defineEmits(['closed'])
const emitClosed = () => emit('closed')

const props = defineProps({
  title: String,
  price: Number
})

const image = ref('')

onBeforeMount(async () => {
  image.value = await getImage()
})
const getImage = async () => {
  let res = await axios.get('https://dog.ceo/api/breeds/image/random')
  return res.data.message
}
</script>

<template lang="pug"> 
span.font-semibold {{ props.title }} 
span.float-right £{{ price.toFixed(2) }}
img(width="100", height="100" :src="image")
.text-center
  button.bg-blue-500.p-1.text-white.mt-1.rounded.w-full.shadow-xl.cursor-pointer#popupbtn(@click='emitClosed') VIEW DETAILS
</template>
