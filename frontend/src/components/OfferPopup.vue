<script setup>
import { onBeforeMount, ref } from 'vue'
import { getOfferImg } from 'boot/utils'
const emit = defineEmits(['closed'])
const emitClosed = () => emit('closed')

const props = defineProps({
  title: String,
  price: Number,
  type: String,
})

const image = ref('')

onBeforeMount(async () => {
  image.value = getOfferImg(props.type)
})

</script>

<template lang="pug">
span.font-semibold {{ props.title }}
span.float-right £{{ price.toFixed(2) }}
img(width="100", height="100" :src="image")
.text-center
  button.bg-blue-500.p-1.text-white.mt-1.rounded.w-full.shadow-xl.cursor-pointer#popupbtn(@click='emitClosed') VIEW DETAILS
</template>
