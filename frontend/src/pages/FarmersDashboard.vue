<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1>Welcome to your Farmer's Dashboard!</h1>
      <p>Here you can view and manage your farm's data and settings.</p>
      <q-card>
        <q-card-section>
          <h2>Recent Activity</h2>
          <p>No recent activity to display.</p>
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section>
          <h2>Crop Yield</h2>
          <q-img
            src="https://cdn.pixabay.com/photo/2018/08/14/16/06/vegetables-3603008_960_720.jpg"
            class="q-pa-md"
            alt="Crop Yield"
          />
          <q-chart :options="chartOptions" :data="chartData" type="line" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { Line } from 'vue-chartjs'
export default {
  name: 'FarmersDashboard',
  extends: Line,
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Crop Yield by Month'
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'month'
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Month'
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 1000
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Yield (kg)'
              }
            }
          ]
        }
      },
      chartData: {
        datasets: [
          {
            label: 'Carrots',
            borderColor: '#2196f3',
            fill: false,
            data: [
              { x: '2022-01-01', y: 500 },
              { x: '2022-02-01', y: 550 },
              { x: '2022-03-01', y: 600 },
              { x: '2022-04-01', y: 700 },
              { x: '2022-05-01', y: 800 },
              { x: '2022-06-01', y: 900 },
              { x: '2022-07-01', y: 1000 },
              { x: '2022-08-01', y: 950 },
              { x: '2022-09-01', y: 800 },
              { x: '2022-10-01', y: 600 },
              { x: '2022-11-01', y: 550 },
              { x: '2022-12-01', y: 500 }
            ]
          }
        ]
      }
    }
  }
}
</script>
