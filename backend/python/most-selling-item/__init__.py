import azure.functions as func
from azure.cosmos import CosmosClient

def main(req: func.HttpRequest) -> func.HttpResponse:
    # Define your Cosmos DB endpoint, key, and database and container names
    endpoint = 'https://freshfarmdb.documents.azure.com:443/'
    key = '4g8dCbTnj1b3PPEVdmbEDmrCahKDYW1xvdlBnZQhL5Szl1tkRCUEUzH4IDgLP2dyIh4VyUQXtM1fACDbEEKA5A=='
    database_name = 'FreshFarmDB'
    container_name = 'Sales'

    # Create a Cosmos DB client and retrieve the data using a SQL query
    client = CosmosClient(endpoint, key)
    container = client.get_database_client(database_name).get_container_client(container_name)
    query = "SELECT c.type, SUM(c.price) AS total_price FROM c GROUP BY c.type"
    items = list(container.query_items(query=query, enable_cross_partition_query=True))

    # Return the results as a JSON response
    return func.HttpResponse(body=str(items), mimetype="application/json")
