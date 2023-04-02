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
          <div class="card-header bg-secondary text-white">
            <h3 class="mb-0">Weather Info</h3>
          </div>
          <div class="card-body">
            <div id="map" style="height: 200px"></div>
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
                  <div class="progress">
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
                  <h3 class="mb-0">Offers</h3>
                  <div class="progress">
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
                <h3 class="mb-0">Sales</h3>
                <div class="d-flex align-items-center justify-content-center h-100">
                  <canvas id="rainfall-chart" style="height: 150px"></canvas>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-3">
              <div class="card-body">
                <h3 class="mb-0">Another Container</h3>
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

<!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.min.js"></script>
<script src="https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.js"></script> -->

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
