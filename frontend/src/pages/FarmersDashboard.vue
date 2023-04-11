<template>
  <q-table
    :data="sales_data_formatted"
    :columns="columns"
    v-model:pagination="pagination"
    :rows-per-page-options="[10, 25, 50, 101]"
  />
</template>

<script>
export default {
  name: 'SalesTable',
  data() {
    return {
      sales_data_formatted: [],
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
        },
        {
          name: 'id',
          label: 'ID',
          align: 'left',
          field: 'id'
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
        this.sales_data_formatted = data
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
