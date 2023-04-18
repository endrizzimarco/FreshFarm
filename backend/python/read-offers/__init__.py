import azure.functions as func
import logging
import json


def main(req: func.HttpRequest, doc:func.DocumentList) -> func.HttpResponse:
    offers_json = []
    for offer in doc:
        offers_json.append({
            "id": offer.get('id'),
            "title": offer.get('title'),
            "farmerId": offer.get('farmerId'),
            "lat": offer.get('lat'),
            "lng": offer.get('lng'),
            "price": offer.get('price'),
            "type": offer.get('type'),
            "items": offer.get('items'),
            "description": offer.get('description'),
            "pictureUrl": offer.get('pictureUrl'),
        })

    return func.HttpResponse(
            json.dumps(offers_json),
            status_code=200,
            mimetype="application/json")