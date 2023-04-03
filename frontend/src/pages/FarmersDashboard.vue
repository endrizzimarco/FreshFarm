<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Map and Weather Widgets -->
      <div class="col-md-3 bg-light h-100">
        <div class="h-25">
          <div id="map" style="height: 100%"></div>
        </div>
        <div class="h-50">
          <div class="card h-100 mb-3">
            <div class="card-header bg-secondary text-white">
              <h3 class="h5 mb-0">Weather Today</h3>
            </div>
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <div class="display-4 font-weight-bold text-primary">22°C</div>
              <p class="mt-3">Partly Cloudy</p>
            </div>
          </div>
        </div>
        <div class="h-25">
          <div class="card h-100 mb-3">
            <div class="card-header bg-secondary text-white">
              <h3 class="h5 mb-0">Weather This Week</h3>
            </div>
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
        <div class="row">
          <div class="col-md-6">
            <div class="card mb-3">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div class="d-flex flex-column">
                  <h3 class="h5 mb-0">Leases</h3>
                  <div class="progress my-2">
                    <div
                      class="progress-bar bg-danger"
                      role="progressbar"
                      style="width: 70%"
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div class="display-4 font-weight-bold text-primary">22°C</div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-3">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div class="d-flex flex-column">
                  <h3 class="h5 mb-0">Offers</h3>
                  <div class="progress my-2">
                    <div
                      class="progress-bar bg-primary"
                      role="progressbar"
                      style="width: 54%"
                      aria-valuenow="54"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div class="display-4 font-weight-bold text-primary">54%</div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-3">
              <div class="card-body">
                <h3 class="h5 mb-0">Sales</h3>
                <div class="d-flex align-items-center justify-content-center h-100">
                  <canvas id="rainfall-chart" style="height: 150px"></canvas>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-3">
              <div class="card-body">
                <h3 class="h5 mb-0">Another Container</h3>
                <div class="d-flex align-items-center justify-content-center h-100">
                  <canvas id="crop-yield-chart" style="height: 150px"></canvas>
                </div>
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
      center: [-0.118092, 51.509865],
      zoom: 12
    })
  }
}
</script>
