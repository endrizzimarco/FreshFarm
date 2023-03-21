import azure.functions as func
import logging
import json


def main(req: func.HttpRequest, doc:func.DocumentList, connection) -> func.HttpResponse:
    offers_json = []
    for offer in doc:
        offers_json.append({
            "id": offer['id'],
        #    "name": offer['name']
        })

    return func.HttpResponse(
            json.dumps({"conn": connection, "offers": offers_json}),
            status_code=200,
            mimetype="application/json")