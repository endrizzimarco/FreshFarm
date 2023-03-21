import azure.functions as func
import logging

app = func.FunctionApp()

@app.cosmos_db_output(arg_name="outputDocument", database_name="FreshFarmDB", collection_name="Offers" connection_string_setting="CosmosDbConnectionString")
def main(req: func.HttpRequest, outputDocument: func.Out[func.Document]) -> func.HttpResponse:
     logging.info('Python HTTP trigger function processed a request.')
     logging.info('Python Cosmos DB trigger function processed a request.')
     name = req.params.get('name')
     if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

     if name:
        outputDocument.set(func.Document.from_dict({"id": name}))
        return func.HttpResponse(f"Hello {name}!")
     else:
        return func.HttpResponse(
                    "Please pass a name on the query string or in the request body",
                    status_code=400
                )