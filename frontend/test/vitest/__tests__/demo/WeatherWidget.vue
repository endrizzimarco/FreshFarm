<template lang="pug">
q-card.p-2
  q-card-section
    p.text-lg.font-semibold.text-gray-200 {{fullWeatherForecast?.location.name}} &nbsp;
      q-icon(name="near_me")
    .float-left 
      p.text-sm.pt-1 Currently
      p.text-xl {{fullWeatherForecast?.current.temp_c}}°
    .float-right
      p.text-sm {{fullWeatherForecast?.current.condition.text}}
      q-icon(:name="'img:'+currentWeatherIcon" style="font-size: 2em") 
  br
  q-card-section
    .row.pt-2
      .col.text-center(v-for='h in nextSixHoursFcast' :key='h.time')
        p.text-xs {{h.time.split(' ')[1]}}
        q-icon(:name="'img:'+h.condition.icon" style="font-size: 2em")
        p.text-sm {{h.temp_c}}°

    p.text-sm.pt-5 Next 5 days
    .row
      .col.text-center(v-for='d in nextFiveDaysFcast' :key='d.date')
        p.text-xs.pt-2 {{new Date(d.date).toLocaleString('default', {day: 'numeric', month: 'short'})}}   
        q-icon.pt-1(:name="'img:'+d.day.condition.icon" style="font-size: 2em")
        p.text.ml-1 {{d.day.avgtemp_c}}°
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import { useUserStore } from 'src/stores/user-functions'

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000)
  return this
}

const weatherForecast = ref()
const fullWeatherForecast = ref()
const currentWeatherIcon = ref()
const currentHour = new Date().getHours()

const nextSixHoursFcast = computed(() => {
  //get the integer value of the current and next 5 hours
  if (fullWeatherForecast.value === undefined) return []

  let fcast = []
  let forecastDayIndex = 0
  for (let i = 0; i < 6; i++) {
    const hour = new Date().addHours(i).getHours()
    if (hour === 0) {
      forecastDayIndex++
    }
    fcast.push(fullWeatherForecast.value.forecast.forecastday[forecastDayIndex].hour[hour])
  }
  return fcast
})

const nextFiveDaysFcast = computed(() => {
  //get the integer value of the current and next 5 hours
  if (fullWeatherForecast.value === undefined) return []
  return fullWeatherForecast.value.forecast.forecastday.slice(1, 6)
})

onMounted(async () => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  const userStore = useUserStore()
  const city = 'New York'
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${userStore.user_coords.lat},${userStore.user_coords.lng}&days=6`

  const response = await axios.get(url)
  fullWeatherForecast.value = response.data
  currentWeatherIcon.value = response.data.current.condition.icon
})
</script>

<style scoped>
.weather-card__date {
  font-size: 10px;
  font-weight: bold;
}

.weather-card__temp {
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
}
</style>
