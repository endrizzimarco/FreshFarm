import azure.functions as func
import logging
import json

def main(req: func.HttpRequest, outputDocument: func.Out[func.Document], newOffers: func.Out[str]) -> func.HttpResponse:
     logging.info('Python HTTP trigger function processed a request.')

     name = req.params.get('name')
     if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

     if name:
        outputDocument.set(func.Document.from_dict({"id": name, "farmerId": name}))
        newOffers.set(json.dumps({
        'actionName': 'newOffer',
        'data': 'Hello',
        'dataType': 'text'
    }))
        return func.HttpResponse(f"Hello {name}!")
     else:
        return func.HttpResponse(
                    "Please pass a name on the query string or in the request body",
                    status_code=400
                )