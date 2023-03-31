<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="text-center mb-4">
          <h1>Dashboard</h1>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div class="card mb-3">
          <div class="card-header">
            <h3>Weather Info</h3>
          </div>
          <div class="card-body">
            <div id="map"></div>
          </div>
        </div>
      </div>

      <div class="col-lg-9 col-md-8 col-sm-6 col-xs-12">
        <div class="row">
          <div class="col-md-6">
            <div class="card mb-3">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div class="d-flex flex-column">
                  <h3 class="mb-0">Leases</h3>
                  <div class="d-flex">
                    <div class="bg-danger" style="width: 70%; height: 5px"></div>
                    <div class="bg-secondary" style="width: 30%; height: 5px"></div>
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
                  <h3 class="mb-0">Offers</h3>
                  <div class="d-flex">
                    <div class="bg-primary" style="width: 40%; height: 5px"></div>
                    <div class="bg-secondary" style="width: 60%; height: 5px"></div>
                  </div>
                </div>
                <div class="display-4 font-weight-bold text-primary">54%</div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-3">
              <div class="card-body">
                <h3 class="mb-0">Sales</h3>
                <div class="d-flex align-items-center justify-content-center h-100">
                  <canvas id="rainfall-chart"></canvas>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-3">
              <div class="card-body">
                <h3 class="mb-0">Another Container</h3>
                <div class="d-flex align-items-center justify-content-center h-100">
                  <canvas id="crop-yield-chart"></canvas>
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

<style scoped>
.container-fluid {
  background-color: #f0ead6;
}

.card-header {
  background-color: #f2f2f2;
}

.bg-primary {
  background-color: #007bff !important;
}

.bg-secondary {
  background-color: #6c757d !important;
}

.card-body {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.d-flex {
  display: flex !important;
}

.d-flex.flex-column {
  flex-direction: column !important;
}

.align-items-center {
  align-items: center !important;
}

.justify-content-center {
  justify-content: center !important;
}

.justify-content-between {
  justify-content: space-between !important;
}

.font-weight-bold {
  font-weight: bold !important;
}

.h-100 {
  height: 100% !important;
}
</style>
