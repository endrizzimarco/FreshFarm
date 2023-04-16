<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 bg-light h-100">
        <q-card class="map-card">
          <q-card-section>
            <div id="map" style="height: 200px"></div>
          </q-card-section>
        </q-card>
        <q-card class="h-50">
          <q-card-section class="mt-3 my-styles">☀️ Weather Forecast</q-card-section>
          <q-card-section>
            <div class="d-flex justify-content-center align-items-center">
              <div class="weather-cards row">
                <div v-for="day in weatherForecast" :key="day.date" class="weather-card col">
                  <div class="weather-card__date">{{ day.day }}</div>
                  <div class="weather-card__temp">{{ day.temp }}</div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <br />
        <!-- <q-card class="h-25">
          <q-card-section class="mt-3 my-styles">🛰️ Weather This Week</q-card-section>
          <q-card-section>
            <q-table
              :data="weatherForecast"
              :columns="weatherColumns"
              row-key="date"
              :hide-bottom="true"
              :grid="$q.screen.gt.xs"
            ></q-table>
          </q-card-section>
        </q-card> -->
      </div>
      <!-- Widgets -->
      <div class="col-md-9">
        <h2 class="mb-4" style="font-weight: bold; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 48px">
          &nbsp;&nbsp;📊 Farmers Dashboard
        </h2>
        <div class="row">
          <div class="col-md-6">
            <q-card class="mb-3 border">
              <q-card-section>
                <div class="text-h4">&nbsp;Top 10 Orders</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-6">
            <q-card class="mb-3 border">
              <q-card-section>
                <div class="text-h4">&nbsp;Top 10 Selling Items</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-6">
            <q-card class="mb-3 border">
              <q-card-section>
                <div class="text-h4">&nbsp;Total Revenue</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-6">
            <q-card class="mb-3 border">
              <q-card-section>
                <div class="text-h4">&nbsp;Average Time of Sales</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'

export default {
  name: 'FarmersDashboard',
  data() {
    return {
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
    const apiKey = '9a4d1285248745b1b38134758230504'
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

    mapboxgl.accessToken =
      'pk.eyJ1IjoiYWJkdWxsYWh6YWhpZDEwIiwiYSI6ImNsZjJ5M3UybzBuYWczc256MXdpMGZkMGsifQ.sUQa5jZuO5tn1Nnbjw6CLw'
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.985664, 40.748817],
      zoom: 12
    })
  }
}
</script>
