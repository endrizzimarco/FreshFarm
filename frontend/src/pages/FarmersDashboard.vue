<template lang="pug">
.container-fluid
  q-btn(@click="router.push('/')" rounded='' label='Back to map' color='grey-10' icon='arrow_back' style='position: absolute; left: 2em; top: 3em; z-index: 1')
  .row
    .col-md-3.bg-light.h-100
      q-card.map-card
        q-card-section
          #map(style='height: 200px')
      q-card.h-50
        q-card-section.mt-3.my-styles &#x2600;&#xFE0F; Weather Forecast
        q-card-section
          .d-flex.justify-content-center.align-items-center
            .weather-cards.row
              .weather-card.col(v-for='day in weatherForecast' :key='day.date')
                .weather-card__date {{ day.day }}
                .weather-card__temp {{ day.temp }}

    //- Widgets
    .col-md-9
      h2.mb-4(style="font-weight: bold; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 48px")
        | &#x1F4CA; Farmers Dashboard
      .row
        .col-md-6
          q-card.mb-3.border
            q-card-section
              .text-h4 &nbsp;Top 10 Orders
        .col-md-6
          q-card.mb-3.border
            q-card-section
              .text-h4 &nbsp;Top 10 Selling Items
        .col-md-6
          q-card.mb-3.border
            q-card-section
              .text-h4 &nbsp;Total Revenue
        .col-md-6
          q-card.mb-3.border
            q-card-section
              .text-h4 &nbsp;Average Time of Sales
</template>

<script>
import mapboxgl from 'mapbox-gl'
import { useRouter } from 'vue-router'
export default {
  name: 'FarmersDashboard',
  data() {
    return {
      router: useRouter(),
      weatherForecast: [],
      weatherColumns: [
        {
          name: 'day',
          required: true,
          label: 'Day',
          align: 'left',
          field: row => row.day
        },
        {
          name: 'temp',
          required: true,
          label: 'Temperature',
          align: 'left',
          field: row => row.temp
        },
        {
          name: 'description',
          required: true,
          label: 'Description',
          align: 'left',
          field: row => row.description
        }
      ]
    }
  },
  mounted() {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const city = 'New York'
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.weatherForecast = data.forecast.forecastday.map(day => {
          return {
            day: day.date,
            temp: `${day.day.avgtemp_c}°C`,
            description: day.day.condition.text
          }
        })
      })
      .catch(error => console.error(error))

    mapboxgl.accessToken = import.meta.env.VITE_MAP_API_KEY
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.985664, 40.748817],
      zoom: 12
    })
  }
}
</script>

<style>
/* .card {
  border: 1px solid #ccc;
} */
.my-styles {
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Helvetica Neue', sans-serif;
}
.weather-card {
  width: 60px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: black;
  background-color: #f6ff00;
  border: 2px solid #f6ff00;
}

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
