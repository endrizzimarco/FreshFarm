<script setup>
const props = defineProps({
  color: String,
  icon: String,
  value: [Number, String],
  text: String
})
</script>

<template lang="pug">

q-card.row.p-9
  .col.flex-auto
    .rounded-full.w-20.h-20.p-3.text-center(:class='color')
      q-icon.mt-1(:name='icon' size='xl')
  .col.mt-3.pl-7
    .row.text-2xl {{ value }}
    .row.text-gray-400.font-normal {{ text }}
</template>

<style scoped>
.blue {
  @apply bg-blue-200 text-blue-600;
}

.orange {
  @apply bg-orange-200 text-orange-600;
}

.green {
  @apply bg-green-200 text-green-600;
}

.purple {
  @apply bg-purple-200 text-purple-600;
}
</style>
