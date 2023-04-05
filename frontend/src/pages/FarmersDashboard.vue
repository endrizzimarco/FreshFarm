<template>
  <div class="container-fluid" style="background-color: #fce9d9">
    <div class="row">
      <div class="col-md-3 bg-light h-100">
        <div class="card-body mt-0">
          <div id="map" style="height: 200px"></div>
        </div>
        <div class="h-50">
          <div class="card h-100">
            <!-- <h3 class="h5 mb-0">Weather Today</h3> -->
            <p class="mt-3 my-styles">&nbsp;☀️ Weather Today</p>
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <div class="display-4 font-weight-bold text-primary">22°C</div>
              <p class="mt-3">Partly Cloudy</p>
            </div>
          </div>
        </div>
        <div class="h-25">
          <div class="card h-100 mb-3">
            <p class="mt-3 my-styles">&nbsp;🛰️ Weather This Week</p>
            <div class="card-body p-0">
              <table class="table table-striped table-borderless m-0">
                <tbody>
                  <tr>
                    <td>Monday</td>
                    <td>19°C</td>
                    <td>Mostly Cloudy</td>
                  </tr>
                  <tr>
                    <td>Tuesday</td>
                    <td>21°C</td>
                    <td>Partly Cloudy</td>
                  </tr>
                  <tr>
                    <td>Wednesday</td>
                    <td>23°C</td>
                    <td>Sunny</td>
                  </tr>
                  <tr>
                    <td>Thursday</td>
                    <td>20°C</td>
                    <td>Partly Cloudy</td>
                  </tr>
                  <tr>
                    <td>Friday</td>
                    <td>18°C</td>
                    <td>Mostly Cloudy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- Widgets -->
      <div class="col-md-9">
        <h2 class="mb-4" style="font-weight: bold; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 48px">
          &nbsp;&nbsp;📊 Dashboard
        </h2>
        <div class="row">
          <div class="col-md-6">
            <div class="card mb-3 border">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div class="d-flex flex-column">
                  <h3
                    class="h5 mb-0"
                    style="font-weight: bold; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 36px"
                  >
                    &nbsp;Leases
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-3 border">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div class="d-flex flex-column">
                  <h3
                    class="h5 mb-0"
                    style="font-weight: bold; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 36px"
                  >
                    &nbsp;Offers
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-3 border">
              <div class="card-body">
                <h3
                  class="h5 mb-0"
                  style="font-weight: bold; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 36px"
                >
                  &nbsp;Sales
                </h3>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-3 border">
              <div class="card-body">
                <h3
                  class="h5 mb-0"
                  style="font-weight: bold; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 36px"
                >
                  &nbsp;Another Container
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken =
  'pk.eyJ1IjoiYWJkdWxsYWh6YWhpZDEwIiwiYSI6ImNsZjJ5M3UybzBuYWczc256MXdpMGZkMGsifQ.sUQa5jZuO5tn1Nnbjw6CLw'
export default {
  name: 'FarmersDashboard',
  mounted() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-0.5608289, 51.2426316],
      zoom: 12
    })
  }
}
</script>
