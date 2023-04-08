import logging
import azure.functions as func
from azure.cosmos import CosmosClient

def main(req: func.HttpRequest) -> func.HttpResponse:
    # Initialize the Cosmos DB client
    endpoint = 'https://freshfarmdb.documents.azure.com:443/'
    key = '4g8dCbTnj1b3PPEVdmbEDmrCahKDYW1xvdlBnZQhL5Szl1tkRCUEUzH4IDgLP2dyIh4VyUQXtM1fACDbEEKA5A=='
    client = CosmosClient(endpoint, key)

    # Get a reference to the sales container
    database_name = 'FreshFarmDB'
    container_name = 'Sales'
    database = client.get_database_client(database_name)
    container = database.get_container_client(container_name)

    # Execute a query to retrieve sales data
    query = 'SELECT * FROM c'
    items = container.query_items(query, enable_cross_partition_query=True)

    # Format the sales data as needed
    sales_data_formatted = []
    for item in items:
        sale = {
            'farmerId': item['farmerId'],
            'customerName': item['customerName'],
            'type': item['type'],
            'collectionTime': item['collectionTime'],
            'price': item['price'],
        }
        sales_data_formatted.append(sale)

    # Return the formatted sales data as a JSON response
    return func.HttpResponse(sales_data_formatted)
