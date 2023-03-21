import azure.functions as func
import logging
import json

def main(req: func.HttpRequest, outputDocument: func.Out[func.Document], actions: func.Out[str]) -> func.HttpResponse:
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
        outputDocument.set(func.Document.from_dict({"farmerId": name}))
        actions.set(json.dumps({
        'actionName': 'sendToAll',
        'data': name,
        'dataType': 'text'
    }))
        return func.HttpResponse(f"Hello {name}!")
     else:
        return func.HttpResponse(
                    "Please pass a name on the query string or in the request body",
                    status_code=400
                )