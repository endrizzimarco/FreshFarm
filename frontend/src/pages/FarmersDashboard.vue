<template>
  <q-table
    :data="salesData"
    :columns="columns"
    v-model:pagination="pagination"
    :rows-per-page-options="[10, 25, 50, 100]"
  />
</template>

<script>
export default {
  name: 'SalesTable',
  data() {
    return {
      salesData: [],
      pagination: {
        rowsPerPage: 10
      },
      columns: [
        {
          name: 'farmerId',
          label: 'Farmer ID',
          align: 'left',
          field: 'farmerId'
        },
        {
          name: 'customerName',
          label: 'Customer Name',
          align: 'left',
          field: 'customerName'
        },
        {
          name: 'type',
          label: 'Type',
          align: 'left',
          field: 'type'
        },
        {
          name: 'collectionTime',
          label: 'Collection Time',
          align: 'left',
          field: 'collectionTime'
        },
        {
          name: 'price',
          label: 'Price',
          align: 'left',
          field: 'price'
        }
      ]
    }
  },
  mounted() {
    this.fetchSalesData()
  },
  methods: {
    async fetchSalesData() {
      try {
        const response = await fetch('/api/get-sales-data')
        const data = await response.json()
        this.salesData = data
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
