import azure.functions as func
import logging
import json

def main(req: func.HttpRequest, outputDocument: func.Out[func.Document], actions: func.Out[str]) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a crete-offer request.')

    allowed_keys = ["id", "farmerId", "lat", "lng", "price", "type", "items", "description", "pictureUrl"]
    new_offer = {k: req.get_json()[k] for k in allowed_keys if k in req.get_json()}

    if req:
        outputDocument.set(func.Document.from_dict(new_offer))
        actions.set(json.dumps({
        'actionName': 'sendToAll',
        'data': new_offer,
        'dataType': 'text'
    }))
        return func.HttpResponse(f"Offer {new_offer} successfully created!")
    else:
        return func.HttpResponse(
                    "Please pass a JSON with the new offer in the request body",
                    status_code=400
                )