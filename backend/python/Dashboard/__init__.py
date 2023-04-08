import logging
import azure.functions as func
from azure.cosmos import CosmosClient

def main(req: func.HttpRequest) -> func.HttpResponse:
    # Initialize the Cosmos DB client
    endpoint = 'https://myaccount.documents.azure.com:443/'
    key = 'mykey'
    client = CosmosClient(endpoint, key)

    # Get a reference to the sales container
    database_name = 'mydatabase'
    container_name = 'mycontainer'
    database = client.get_database_client(database_name)
    container = database.get_container_client(container_name)

    # Execute a query to retrieve sales data
    query = 'SELECT * FROM Sales'
    items = container.query_items(query, enable_cross_partition_query=True)

    # Format the sales data as needed
    sales_data_formatted = []
    for item in items:
        sale = {
            'id': item['id'],
            'date': item['date'],
            'product': item['product'],
            'quantity': item['quantity'],
            'price': item['price'],
            'total': item['total']
        }
        sales_data_formatted.append(sale)

    # Return the formatted sales data as a JSON response
    return func.HttpResponse(sales_data_formatted)
