import azure.functions as func
import logging
import json

def main(req: func.HttpRequest, outputDocument: func.Out[func.Document], actions: func.Out[str]) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a create-offer request.')

    allowed_keys = ["id", "farmerId", "lat", "lng", "price", "type", "items", "description", "pictureUrl"]
    req_body = req.get_json()
    new_offer = {k: req_body[k] for k in allowed_keys if k in req_body}
    logging.info(f"New offer: {new_offer}")

    if req:
        outputDocument.set(func.Document.from_dict(new_offer))
        actions.set(json.dumps({
        'actionName': 'sendToAll',
        'data': json.dumps(new_offer),
        'dataType': 'text'
    }))
        return func.HttpResponse(f"Offer {new_offer} successfully created!")
    else:
        return func.HttpResponse(
                    "Please pass a JSON with the new offer in the request body",
                    status_code=400
                )