<template lang="pug">
.dashboard.h-full(v-if="!this.loading")
  q-btn.backbutton-gradient(@click="router.push('/')" rounded='' label='Back to map' icon='arrow_back' style='position: absolute; left: 2em; top: 1.7em; z-index: 1')
  h1.text-2xl.font-semibold.pb-5.text-center {{ this.username }}'s {{  this.month }} Dashboard
  .grid.grid-cols-12.grid-rows-2.gap-3
    //- ===================
    //- ---- TOP SIDE ----
    //- ===================

    //- Weather
    .col-span-3.row-span-2
      WeatherWidget

    //- Total Payments
    .col-span-3.row-span-1
      TotalCard(
        color='orange',
        icon='payments',
        :value='"£"+farmerStore.dashboardData.total_month_revenue.toFixed(2)',
        text='Total Revenue'
      )

    //- Total Sales
    .col-span-3.row-span-1
      TotalCard(
        color='green',
        icon='store',
        :value='farmerStore.dashboardData.total_sales',
        text='Total Sales'
      )

    //- Total Customers
    .col-span-3.row-span-1.col-start-4.row-start-2
      TotalCard(
        color='blue',
        icon='face',
        :value='farmerStore.dashboardData.total_customers',
        text='Total Customers'
      )

    //- Total Customers
    .col-span-3.row-span-1.col-start-7.row-start-2
      TotalCard(
        color='purple',
        icon='currency_pound',
        :value='"£"+farmerStore.dashboardData.average_sale_value.toFixed(2)',
        text='Avg Sale Value'
      )

    //- Top 4 Customers
    .col-span-3.row-span-2.flex
      q-card.p-4.flex-grow
        .title TOP {{ Object.entries(farmerStore.dashboardData.revenue_by_customerName).slice(0,4).length }} CUSTOMERS
        .subtext.pb-5 for the month of {{ this.month }}
        q-list(bordered class="rounded-borders" style="max-width: 1000px")
          q-item.mb-1(clickable v-ripple v-for="obj in Object.entries(farmerStore.dashboardData.revenue_by_customerName).slice(0,4)" :key="obj")
            q-item-section(avatar)
              q-avatar
                img(:src="`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${obj[0]}`")
            q-item-section
              q-item-label(lines="1") {{  obj[0] }}
              p(caption lines="2").subtext £{{ obj[1].toFixed(2) }}

    //- =====================
    //- ---- BOTTOM SIDE ----
    //- =====================

    //- Line Chart
    .col-span-6
      q-card.p-4
        .title Monthly Revenue
        .subtext for the past 12 months
        Line(:options="chartOptions" :data="lineData")

    //- Table
    .col-span-4
      q-card.h-full
        q-table(title="Orders", :rows='this.farmerStore.dashboardData.this_month_sales' :columns='columns')
          template(v-slot:body-cell-status="props")
            q-td(:props="props")
              q-badge(v-if="props.row.collected == true" color="purple") Yes
              q-badge(v-else color="red-5") No
          template(v-slot:body-cell-type="props")
            q-td(:props="props")
              q-badge(:color="getChipColor(props.row.type)" ) {{ props.row.type }}

    //- Pie Chart
    .col-span-2
      q-card.p-4.h-full
        .title Revenue by Type
        .subtext.pb-3 for the month of {{ this.month }}
        Doughnut.mt-10(:options="chartOptions" :data="pieData")
</template>

<script>
import { Doughnut, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js'
import { useRouter } from 'vue-router'
import WeatherWidget from 'src/components/WeatherWidget.vue'
import TotalCard from 'src/components/TotalCard.vue'
import axios from 'axios'
import { useFarmerStore } from 'src/stores/farmer-functions'
import { useAuthStore } from 'src/stores/auth'
import { useUserStore } from 'src/stores/user-functions'
import { getChipColor } from 'boot/utils'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Filler
)

export default {
  name: 'FarmersDashboard',
  components: { Doughnut, Line, WeatherWidget, TotalCard }, // eslint-disable-line
  data() {
    return {
      username: useAuthStore().username,
      farmerStore: useFarmerStore(),
      userStore: useUserStore(),
      month: new Date().toLocaleString('default', { month: 'long' }),
      loading: true,
      dashboardData: {
        total_month_revenue: 0,
        total_sales: 0,
        total_customers: 0,
        average_sale_value: 0,
        this_month_sales: [],
        uncollected_sales: [],
        total_revenue_by_type: {},
        revenue_by_customerName: {}
      },
      router: useRouter(),
      weatherForecast: [],
      lineData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Sales',
            backgroundColor: '#f87979',
            borderColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      },
      chartOptions: {
        responsive: true
      },
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
      ],
      columns: [
        {
          name: 'title',
          required: true,
          label: 'Title',
          align: 'left',
          field: 'title'
        },
        {
          name: 'price',
          label: 'Price',
          required: true,
          sortable: true,
          field: 'price',
          format: val => `£${val.toFixed(2)}`
        },
        {
          name: 'type',
          label: 'Type',
          required: true,
          sortable: true,
          field: 'type'
        },

        {
          name: 'customer',
          label: 'Customer',
          required: true,
          field: 'customerName'
        },
        {
          name: 'status',
          label: 'Collected',
          required: true,
          field: 'collected'
        },
        {
          name: 'date',
          label: 'Date of sale',
          required: true,
          field: 'timeOfSale',
          format: val => `${val.split(' ')[0]}`
        }
      ]
    }
  },
  methods: {
    getChipColor
  },
  computed: {
    pieData() {
      return {
        labels: Object.keys(this.farmerStore.dashboardData.revenue_by_type),
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            data: Object.values(this.farmerStore.dashboardData.revenue_by_type)
          }
        ],
        hoverOffset: 4
      }
    }
  },
  async mounted() {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const city = 'New York'
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`

    axios
      .get(url)
      .then(response => {
        this.weatherForecast = response.data.forecast.forecastday.map(day => {
          return {
            day: day.date,
            temp: `${day.day.avgtemp_c}°C`,
            description: day.day.condition.text
          }
        })
      })
      .catch(error => console.error(error))

    await this.farmerStore.getDashboardData()
    this.loading = false
  }
}
</script>

<style scoped>
q-icon {
  font-size: 3em;
}

.q-layout {
  background-color: #111827;
}
.dashboard {
  font-family: Lexend, sans-serif;
  background-color: #111827;
  color: #e5e7eb;
  padding: 2em;
}

.q-table__container {
  font-family: Lexend, sans-serif;
  background-color: #1f2937;
  color: #e5e7eb;
}

.q-table__title {
  @apply text-xl font-semibold text-gray-200 !important;
}

.q-card {
  background-color: #1f2937;
  border-color: #38414e;
  @apply rounded-lg shadow-2xl border;
}

.q-item {
  padding: 0px;
}
.q-card__section--vert {
  padding: 13px;
}

.title {
  @apply text-xl font-semibold text-gray-200;
}
.subtext {
  @apply text-gray-400 font-normal;
}
</style>
